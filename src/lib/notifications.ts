import { listEvenements, saveEvenement, type Evenement } from "./supabase-data";
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
  // Ajout d'une sécurité : si la date est invalide, on retourne une valeur très éloignée
  if (isNaN(ts)) return Infinity; 
  const minutesBefore = e.rappelMinutes ?? 0;
  return ts - minutesBefore * 60_000;
}

// --- Push notifications (Service Worker) ---

export async function subscribeToPush(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.warn("Service Worker ou Push API non supporté");
    return false;
  }

  try {
    // 1. Demander la permission
    const permission = await requestNotificationPermission();
    if (permission !== "granted") {
      console.warn("Permission de notification refusée");
      return false;
    }

    // 2. Enregistrer le service worker
    const registration = await navigator.serviceWorker.register("/sw.js");
    if (import.meta.env.DEV) console.log("Service Worker enregistré:", registration);

    // 3. S'abonner au push
    const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
    if (!vapidPublicKey) {
      console.error(
        "VITE_VAPID_PUBLIC_KEY n'est pas défini : impossible de s'abonner aux notifications push.",
      );
      return false;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      // Cast nécessaire : le type Uint8Array de la lib DOM utilisée par ce
      // projet est plus strict que BufferSource (incompatibilité de version
      // de types, sans conséquence à l'exécution — un Uint8Array est un
      // BufferSource valide pour l'API Push réelle du navigateur).
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
    });

    // 4. Enregistrer l'abonnement dans Supabase
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error("Utilisateur non connecté");
      return false;
    }

    const p256dhKey = subscription.getKey("p256dh");
    const authKey = subscription.getKey("auth");
    if (!p256dhKey || !authKey) {
      console.error("Clés de chiffrement manquantes sur l'abonnement push.");
      return false;
    }

    const { error } = await supabase.from("push_subscriptions").upsert({
      user_id: user.id,
      endpoint: subscription.endpoint,
      p256dh: btoa(String.fromCharCode(...new Uint8Array(p256dhKey))),
      auth: btoa(String.fromCharCode(...new Uint8Array(authKey))),
    }, { onConflict: "endpoint" });

    if (error) {
      console.error("Erreur lors de l'enregistrement de l'abonnement:", error);
      return false;
    }

    if (import.meta.env.DEV) console.log("Abonnement push enregistré avec succès");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'abonnement push:", error);
    return false;
  }
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

    // Delete from Supabase first
    const { error } = await supabase
      .from("push_subscriptions")
      .delete()
      .eq("endpoint", subscription.endpoint);

    if (error) {
      console.error("Erreur lors de la suppression de l'abonnement:", error);
      return false;
    }

    // Unsubscribe from browser
    const unsubscribed = await subscription.unsubscribe();
    if (import.meta.env.DEV) console.log("Abonnement push supprimé:", unsubscribed);
    return true;
  } catch (error) {
    console.error("Erreur lors de la désabonnement push:", error);
    return false;
  }
}

// Convertir une clé VAPID base64 URL-safe en Uint8Array
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
