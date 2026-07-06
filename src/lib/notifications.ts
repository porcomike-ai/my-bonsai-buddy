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

async function fireNotification(e: Evenement) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  
  try {
    const eventDate = new Date(e.dateHeure);
    const body = e.description
      ? `${eventDate.toLocaleString("fr-FR")} — ${e.description}`
      : eventDate.toLocaleString("fr-FR");
      
    new Notification(`🌱 ${e.titre}`, {
      body,
      tag: `evenement-${e.id}`,
      icon: "/favicon.ico",
    });
  } catch {
    // ignore
  }

  // On attend la sauvegarde pour marquer comme notifié
  try {
    await saveEvenement({ ...e, notifiedAt: new Date().toISOString() });
  } catch (err) {
    console.error("Erreur lors de la sauvegarde du statut de notification", err);
  }
}

let intervalId: ReturnType<typeof setInterval> | null = null;

async function check() {
  try {
    const now = Date.now();
    const evs = await listEvenements();
    
    for (const e of evs) {
      // 1. Déjà notifié ? On ignore
      if (e.notifiedAt) continue;
      
      const trigger = triggerTimeFor(e);
      const eventTime = new Date(e.dateHeure).getTime();
      
      // 2. Conditions :
      // - Le moment du rappel est passé (trigger <= now)
      // - L'événement n'a pas plus de 24h (pour éviter les vieilles notifs au démarrage)
      if (trigger <= now && eventTime + 24 * 3600_000 > now) {
        await fireNotification(e);
      }
    }
  } catch {
    // ignore
  }
}

export function startNotificationScheduler() {
  if (typeof window === "undefined") return;
  if (intervalId) return;
  
  // Exécution initiale après 2 secondes
  setTimeout(check, 2000);
  
  // Exécution récurrente
  intervalId = setInterval(check, 30_000);
  
  // Rafraîchissement au retour sur l'onglet
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") check();
  };
  
  document.addEventListener("visibilitychange", handleVisibilityChange);
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
    console.log("Service Worker enregistré:", registration);

    // 3. S'abonner au push
    const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
    if (!vapidPublicKey) {
      console.error("VITE_VAPID_PUBLIC_KEY non défini");
      return false;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as any,
    });

    // 4. Enregistrer l'abonnement dans Supabase
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error("Utilisateur non connecté");
      return false;
    }

    const { error } = await (supabase.from("push_subscriptions" as any) as any).upsert({
      user_id: user.id,
      endpoint: subscription.endpoint,
      p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey("p256dh")!))),
      auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey("auth")!))),
    }, { onConflict: "endpoint" });

    if (error) {
      console.error("Erreur lors de l'enregistrement de l'abonnement:", error);
      return false;
    }

    console.log("Abonnement push enregistré avec succès");
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
    const { error } = await (supabase.from("push_subscriptions" as any) as any)
      .delete()
      .eq("endpoint", subscription.endpoint);

    if (error) {
      console.error("Erreur lors de la suppression de l'abonnement:", error);
      return false;
    }

    // Unsubscribe from browser
    const unsubscribed = await subscription.unsubscribe();
    console.log("Abonnement push supprimé:", unsubscribed);
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