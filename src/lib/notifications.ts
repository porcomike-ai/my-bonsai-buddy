import type { Evenement } from "./supabase-data";
import { supabase } from "@/integrations/supabase/client";

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) return "denied";
  if (Notification.permission === "default") {
    try {
      return await Notification.requestPermission();
    } catch {
      return "denied";
    }
  }
  return Notification.permission;
}

export function notificationStatus(): NotificationPermission | "unsupported" {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  return Notification.permission;
}

export function triggerTimeFor(e: Evenement): number {
  const ts = new Date(e.dateHeure).getTime();
  if (isNaN(ts)) return Infinity;
  const minutesBefore = e.rappelMinutes ?? 0;
  return ts - minutesBefore * 60_000;
}

// --- Push notifications (Service Worker) ---

export type PushSubscribeResult =
  | { ok: true }
  | { ok: false; reason: string };

/**
 * Active les notifications push.
 * Retourne un motif explicite en cas d'échec (affiché dans le toast Paramètres).
 */
export async function subscribeToPush(): Promise<PushSubscribeResult> {
  if (typeof window === "undefined") {
    return { ok: false, reason: "Environnement non navigateur" };
  }
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return {
      ok: false,
      reason: "Ce navigateur ne supporte pas les notifications push (Service Worker / Push API)",
    };
  }

  try {
    const permission = await requestNotificationPermission();
    if (permission !== "granted") {
      return {
        ok: false,
        reason:
          permission === "denied"
            ? "Permission refusée. Réactivez les notifications dans les réglages du navigateur."
            : "Permission de notification non accordée",
      };
    }

    // Enregistrement + attente que le SW soit actif (sinon pushManager.subscribe échoue).
    const registration = await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;
    // Prefer the registration that is controlling, fallback to the one we just got.
    const activeRegistration =
      (await navigator.serviceWorker.getRegistration()) ?? registration;

    const vapidPublicKey = (import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined)?.trim();
    if (!vapidPublicKey) {
      console.error(
        "VITE_VAPID_PUBLIC_KEY manquante : abonnement push impossible. " +
          "Configurer la variable sur l'environnement de déploiement (même clé publique que VAPID_PUBLIC_KEY côté Edge).",
      );
      return {
        ok: false,
        reason:
          "Clé VAPID publique absente (VITE_VAPID_PUBLIC_KEY). À configurer dans les variables d'environnement du déploiement.",
      };
    }

    let subscription: PushSubscription;
    try {
      subscription = await activeRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        // Cast : incompatibilité de types DOM/lib sans impact runtime.
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
      });
    } catch (err) {
      console.error("pushManager.subscribe failed:", err);
      const msg = err instanceof Error ? err.message : String(err);
      return {
        ok: false,
        reason: `Échec de l'abonnement navigateur : ${msg}`,
      };
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { ok: false, reason: "Utilisateur non connecté" };
    }

    const p256dhKey = subscription.getKey("p256dh");
    const authKey = subscription.getKey("auth");
    if (!p256dhKey || !authKey) {
      return { ok: false, reason: "Clés de chiffrement manquantes sur l'abonnement" };
    }

    const { error } = await supabase.from("push_subscriptions").upsert(
      {
        user_id: user.id,
        endpoint: subscription.endpoint,
        p256dh: arrayBufferToBase64(p256dhKey),
        auth: arrayBufferToBase64(authKey),
      },
      { onConflict: "endpoint" },
    );

    if (error) {
      console.error("Erreur lors de l'enregistrement de l'abonnement:", error);
      return {
        ok: false,
        reason: `Enregistrement BDD impossible : ${error.message}`,
      };
    }

    if (import.meta.env.DEV) console.log("Abonnement push enregistré avec succès");
    return { ok: true };
  } catch (error) {
    console.error("Erreur lors de l'abonnement push:", error);
    return {
      ok: false,
      reason: error instanceof Error ? error.message : String(error),
    };
  }
}

/** Compat : booléen simple pour les appelants qui n'utilisent pas le motif. */
export async function subscribeToPushSimple(): Promise<boolean> {
  const r = await subscribeToPush();
  return r.ok;
}

export async function checkPushSubscription(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) return false;

    const subscription = await registration.pushManager.getSubscription();
    return subscription !== null;
  } catch {
    return false;
  }
}

export async function unsubscribeFromPush(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) return false;

    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) return false;

    const { error } = await supabase
      .from("push_subscriptions")
      .delete()
      .eq("endpoint", subscription.endpoint);

    if (error) {
      console.error("Erreur lors de la suppression de l'abonnement:", error);
      return false;
    }

    const unsubscribed = await subscription.unsubscribe();
    if (import.meta.env.DEV) console.log("Abonnement push supprimé:", unsubscribed);
    return true;
  } catch (error) {
    console.error("Erreur lors de la désabonnement push:", error);
    return false;
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/** Encode ArrayBuffer → base64 sans spread (évite les limites d'arguments). */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary);
}
