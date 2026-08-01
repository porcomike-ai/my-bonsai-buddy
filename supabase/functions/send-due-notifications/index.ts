import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient, type SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2"
import webPush from "https://esm.sh/web-push@3.6.7"

// Appelée par pg_cron (service role). CORS minimal — pas d'origine navigateur publique.
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://xvvqffgchelmszpbdvde.supabase.co",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

/** Ne charge que les items dont la date tombe dans [now − 24h, now + 24h]. */
const LOOKBACK_MS = 24 * 3600_000
const LOOKAHEAD_MS = 24 * 3600_000

const FR_DATE: Intl.DateTimeFormatOptions = {
  timeZone: "Europe/Paris",
  dateStyle: "short",
  timeStyle: "short",
}

type PushSub = { endpoint: string; p256dh: string; auth: string; user_id: string }

function triggerTimeFor(dateHeure: string, rappelMinutes?: number | null): number {
  const ts = new Date(dateHeure).getTime()
  if (isNaN(ts)) return Infinity
  return ts - (rappelMinutes ?? 0) * 60_000
}

function isDue(dateHeure: string, now: number, rappelMinutes?: number | null): boolean {
  const eventTime = new Date(dateHeure).getTime()
  if (isNaN(eventTime)) return false
  return triggerTimeFor(dateHeure, rappelMinutes) <= now && eventTime + LOOKBACK_MS > now
}

function notificationUrl(bonsaiId: string | null | undefined): string {
  return bonsaiId ? `/bonsai/${bonsaiId}` : "/calendrier"
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

async function sendToUser(
  subs: PushSub[],
  payload: string,
  invalid: Set<string>,
): Promise<{ sent: number; failed: number }> {
  let sent = 0
  let failed = 0
  const results = await Promise.allSettled(
    subs.map((sub) =>
      webPush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload,
      ),
    ),
  )
  for (let i = 0; i < results.length; i++) {
    const r = results[i]
    if (r.status === "fulfilled") {
      sent++
      continue
    }
    failed++
    const err = r.reason as { statusCode?: number }
    if (err?.statusCode === 404 || err?.statusCode === 410) {
      invalid.add(subs[i].endpoint)
    } else {
      console.error("Failed to send notification:", r.reason)
    }
  }
  return { sent, failed }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    const supabase: SupabaseClient = createClient(supabaseUrl, supabaseServiceKey)

    const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY")
    const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")
    if (!vapidPublicKey || !vapidPrivateKey) {
      return json({ error: "VAPID keys not configured" }, 500)
    }

    webPush.setVapidDetails(
      "mailto:contact@bonsai-studio.com",
      vapidPublicKey,
      vapidPrivateKey,
    )

    const now = Date.now()
    const windowStart = new Date(now - LOOKBACK_MS).toISOString()
    const windowEnd = new Date(now + LOOKAHEAD_MS).toISOString()

    // ── 1. Fetch parallèle, colonnes strictes ──────────────────────────────
    const [eventsRes, remindersRes] = await Promise.all([
      supabase
        .from("evenements")
        .select("id, titre, description, date_heure, rappel_minutes, bonsai_id, user_id")
        .is("notified_at", null)
        .gte("date_heure", windowStart)
        .lte("date_heure", windowEnd),
      supabase
        .from("rappels")
        .select("id, type, notes, prochaine_date, intervalle_jours, bonsai_id, user_id")
        .eq("actif", true)
        .is("notified_at", null)
        .gte("prochaine_date", windowStart)
        .lte("prochaine_date", windowEnd),
    ])

    if (eventsRes.error) {
      console.error("Error fetching events:", eventsRes.error)
      return json({ error: "Failed to fetch events" }, 500)
    }
    if (remindersRes.error) {
      console.error("Error fetching reminders:", remindersRes.error)
      return json({ error: "Failed to fetch reminders" }, 500)
    }

    const eventsToNotify = (eventsRes.data || []).filter((e) =>
      isDue(e.date_heure, now, e.rappel_minutes),
    )
    const remindersToNotify = (remindersRes.data || []).filter((r) =>
      isDue(r.prochaine_date, now, 0),
    )

    if (eventsToNotify.length === 0 && remindersToNotify.length === 0) {
      return json({ message: "Nothing to notify", eventsNotified: 0, remindersNotified: 0 })
    }

    // ── 2. Résolution user_id (colonne native en priorité, bonsai en fallback) ─
    const missingBonsaiIds = new Set<string>()
    for (const e of eventsToNotify) {
      if (!e.user_id && e.bonsai_id) missingBonsaiIds.add(e.bonsai_id)
    }
    for (const r of remindersToNotify) {
      if (!r.user_id && r.bonsai_id) missingBonsaiIds.add(r.bonsai_id)
    }

    const bonsaiUserIdById = new Map<string, string>()
    if (missingBonsaiIds.size > 0) {
      const { data: bonsaisData, error: bonsaisError } = await supabase
        .from("bonsais")
        .select("id, user_id")
        .in("id", Array.from(missingBonsaiIds))

      if (bonsaisError) {
        console.error("Error fetching bonsais:", bonsaisError)
        return json({ error: "Failed to fetch bonsais" }, 500)
      }
      for (const b of bonsaisData || []) {
        if (b.user_id) bonsaiUserIdById.set(b.id, b.user_id)
      }
    }

    function resolveUserId(
      row: { user_id?: string | null; bonsai_id?: string | null },
    ): string | null {
      return row.user_id ?? (row.bonsai_id ? bonsaiUserIdById.get(row.bonsai_id) ?? null : null)
    }

    const userIds = new Set<string>()
    for (const e of eventsToNotify) {
      const uid = resolveUserId(e)
      if (uid) userIds.add(uid)
      ;(e as { _uid?: string | null })._uid = uid
    }
    for (const r of remindersToNotify) {
      const uid = resolveUserId(r)
      if (uid) userIds.add(uid)
      ;(r as { _uid?: string | null })._uid = uid
    }

    if (userIds.size === 0) {
      return json({ message: "Nothing to notify", eventsNotified: 0, remindersNotified: 0 })
    }

    // ── 3. Abonnements push ────────────────────────────────────────────────
    const { data: subscriptions, error: subError } = await supabase
      .from("push_subscriptions")
      .select("endpoint, p256dh, auth, user_id")
      .in("user_id", Array.from(userIds))

    if (subError) {
      console.error("Error fetching subscriptions:", subError)
      return json({ error: "Failed to fetch subscriptions" }, 500)
    }

    if (!subscriptions || subscriptions.length === 0) {
      return json({ message: "No push subscriptions found" })
    }

    const subscriptionsByUser = new Map<string, PushSub[]>()
    for (const sub of subscriptions as PushSub[]) {
      const list = subscriptionsByUser.get(sub.user_id)
      if (list) list.push(sub)
      else subscriptionsByUser.set(sub.user_id, [sub])
    }

    // ── 4. Envoi + marquage (push parallélisés, updates en batch) ───────────
    let totalSent = 0
    let totalFailed = 0
    const invalidEndpoints = new Set<string>()
    const markEventIds: string[] = []
    const markReminderOneShot: string[] = []
    const advanceReminders: { id: string; next: string }[] = []

    for (const event of eventsToNotify) {
      const uid = (event as { _uid?: string | null })._uid
      if (!uid) continue
      const subs = subscriptionsByUser.get(uid)
      if (subs?.length) {
        const eventDate = new Date(event.date_heure)
        const body = event.description
          ? `${eventDate.toLocaleString("fr-FR", FR_DATE)} — ${event.description}`
          : eventDate.toLocaleString("fr-FR", FR_DATE)
        const payload = JSON.stringify({
          title: `🌱 ${event.titre}`,
          body,
          url: notificationUrl(event.bonsai_id),
        })
        const { sent, failed } = await sendToUser(subs, payload, invalidEndpoints)
        totalSent += sent
        totalFailed += failed
      }
      markEventIds.push(event.id)
    }

    for (const reminder of remindersToNotify) {
      const uid = (reminder as { _uid?: string | null })._uid
      if (!uid) continue
      const subs = subscriptionsByUser.get(uid)
      if (subs?.length) {
        const reminderDate = new Date(reminder.prochaine_date)
        const body =
          reminder.notes || reminderDate.toLocaleString("fr-FR", FR_DATE)
        const payload = JSON.stringify({
          title: `🌱 Rappel : ${reminder.type}`,
          body,
          url: notificationUrl(reminder.bonsai_id),
        })
        const { sent, failed } = await sendToUser(subs, payload, invalidEndpoints)
        totalSent += sent
        totalFailed += failed
      }
      if (reminder.intervalle_jours) {
        const nextDate = new Date(reminder.prochaine_date)
        nextDate.setDate(nextDate.getDate() + reminder.intervalle_jours)
        advanceReminders.push({ id: reminder.id, next: nextDate.toISOString() })
      } else {
        markReminderOneShot.push(reminder.id)
      }
    }

    // Updates BDD en parallèle (au lieu d'1 await séquentiel par ligne).
    const nowIso = new Date().toISOString()
    const dbWrites: Promise<unknown>[] = []

    if (markEventIds.length > 0) {
      dbWrites.push(
        supabase.from("evenements").update({ notified_at: nowIso }).in("id", markEventIds),
      )
    }
    if (markReminderOneShot.length > 0) {
      dbWrites.push(
        supabase.from("rappels").update({ notified_at: nowIso }).in("id", markReminderOneShot),
      )
    }
    for (const { id, next } of advanceReminders) {
      dbWrites.push(
        supabase.from("rappels").update({ prochaine_date: next }).eq("id", id),
      )
    }
    if (invalidEndpoints.size > 0) {
      dbWrites.push(
        supabase
          .from("push_subscriptions")
          .delete()
          .in("endpoint", Array.from(invalidEndpoints)),
      )
    }

    const writeResults = await Promise.all(dbWrites)
    for (const r of writeResults) {
      const err = (r as { error?: unknown })?.error
      if (err) console.error("DB write error:", err)
    }

    if (invalidEndpoints.size > 0) {
      console.log(`Deleted ${invalidEndpoints.size} invalid subscriptions`)
    }

    return json({
      message: `Sent ${totalSent} notifications successfully, ${totalFailed} failed, ${invalidEndpoints.size} invalid subscriptions removed`,
      eventsNotified: eventsToNotify.length,
      remindersNotified: remindersToNotify.length,
      invalidSubscriptionsRemoved: invalidEndpoints.size,
    })
  } catch (error) {
    console.error("Error in send-due-notifications:", error)
    return json({ error: String(error) }, 500)
  }
})
