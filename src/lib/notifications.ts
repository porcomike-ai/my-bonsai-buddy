import { listEvenements, saveEvenement, type Evenement } from "./supabase-data";

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

function triggerTimeFor(e: Evenement): number {
  const ts = new Date(e.dateHeure).getTime();
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
  await saveEvenement({ ...e, notifiedAt: new Date().toISOString() });
}

let intervalId: ReturnType<typeof setInterval> | null = null;

async function check() {
  try {
    const now = Date.now();
    const evs = await listEvenements();
    for (const e of evs) {
      if (e.notifiedAt) continue;
      const trigger = triggerTimeFor(e);
      if (trigger <= now && new Date(e.dateHeure).getTime() + 24 * 3600_000 > now) {
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
  // Check shortly after load, then every 30s while the app is open.
  setTimeout(check, 2000);
  intervalId = setInterval(check, 30_000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") check();
  });
}
