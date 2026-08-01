import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import webPush from 'https://esm.sh/web-push@3.6.7'

// CORS restreint : cette fonction est appelée par pg_cron (service role) et
// éventuellement depuis le dashboard Supabase. Pas d'origine navigateur
// publique attendue — on n'ouvre pas '*'.
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://xvvqffgchelmszpbdvde.supabase.co',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/** Fenêtre de notification : trigger ≤ now, et l'événement/rappel n'est pas
 *  plus vieux que LOOKBACK_MS (évite de recharger tout l'historique
 *  `notified_at IS NULL`). */
const LOOKBACK_MS = 24 * 3600_000
/** Marge avant le trigger pour récupérer les items dont le rappel_minutes
 *  pousse le trigger dans le passé proche sans que date_heure soit encore
 *  entrée dans la fenêtre SQL. */
const LOOKAHEAD_MS = 24 * 3600_000

function triggerTimeFor(e: { date_heure: string; rappel_minutes?: number | null }): number {
  const ts = new Date(e.date_heure).getTime()
  if (isNaN(ts)) return Infinity
  const minutesBefore = e.rappel_minutes ?? 0
  return ts - minutesBefore * 60_000
}

function notificationUrl(bonsaiId: string | null | undefined): string {
  return bonsaiId ? `/bonsai/${bonsaiId}` : '/calendrier'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY')
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY')

    if (!vapidPublicKey || !vapidPrivateKey) {
      return new Response(
        JSON.stringify({ error: 'VAPID keys not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    webPush.setVapidDetails(
      'mailto:contact@bonsai-studio.com',
      vapidPublicKey,
      vapidPrivateKey
    )

    const now = Date.now()
    const windowStart = new Date(now - LOOKBACK_MS).toISOString()
    const windowEnd = new Date(now + LOOKAHEAD_MS).toISOString()

    // Filtre SQL : ne charge que les lignes dont la date tombe dans la fenêtre
    // [now − 24h, now + 24h], au lieu de tout l'historique non notifié.
    const { data: events, error: eventsError } = await supabase
      .from('evenements')
      .select('*')
      .is('notified_at', null)
      .gte('date_heure', windowStart)
      .lte('date_heure', windowEnd)

    if (eventsError) {
      console.error('Error fetching events:', eventsError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch events' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { data: reminders, error: remindersError } = await supabase
      .from('rappels')
      .select('*')
      .eq('actif', true)
      .is('notified_at', null)
      .gte('prochaine_date', windowStart)
      .lte('prochaine_date', windowEnd)

    if (remindersError) {
      console.error('Error fetching reminders:', remindersError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch reminders' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const eventsToNotify = (events || []).filter((e: any) => {
      const trigger = triggerTimeFor(e)
      const eventTime = new Date(e.date_heure).getTime()
      return trigger <= now && eventTime + LOOKBACK_MS > now
    })

    // user_id résolu plus bas via bonsaiUserIdById (les rappels n'ont pas
    // toujours une colonne user_id fiable selon l'historique de migrations).
    const remindersAsEvents = (reminders || []).map((r: any) => ({
      id: r.id,
      titre: r.type,
      description: r.notes || '',
      date_heure: r.prochaine_date,
      rappel_minutes: 0,
      bonsai_id: r.bonsai_id,
      intervalle_jours: r.intervalle_jours,
      notes: r.notes,
      user_id: null as string | null,
    }))

    const remindersToNotify = remindersAsEvents.filter((e: any) => {
      const trigger = triggerTimeFor(e)
      const eventTime = new Date(e.date_heure).getTime()
      return trigger <= now && eventTime + LOOKBACK_MS > now
    })

    const bonsaiIds = new Set<string>()
    for (const event of eventsToNotify) {
      if (event.bonsai_id) bonsaiIds.add(event.bonsai_id)
    }
    for (const reminder of remindersToNotify) {
      if (reminder.bonsai_id) bonsaiIds.add(reminder.bonsai_id)
    }

    const bonsaiUserIdById = new Map<string, string>()
    if (bonsaiIds.size > 0) {
      const { data: bonsaisData, error: bonsaisError } = await supabase
        .from('bonsais')
        .select('id, user_id')
        .in('id', Array.from(bonsaiIds))

      if (bonsaisError) {
        console.error('Error fetching bonsais:', bonsaisError)
        return new Response(
          JSON.stringify({ error: 'Failed to fetch bonsais' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      for (const b of bonsaisData || []) {
        if (b.user_id) bonsaiUserIdById.set(b.id, b.user_id)
      }
    }

    for (const reminder of remindersToNotify) {
      reminder.user_id = reminder.bonsai_id
        ? bonsaiUserIdById.get(reminder.bonsai_id) ?? null
        : null
    }

    const userIds = new Set<string>(bonsaiUserIdById.values())
    for (const event of eventsToNotify) {
      if (event.user_id) userIds.add(event.user_id)
    }

    // Évite .in([]) qui peut produire une requête PostgREST invalide.
    if (userIds.size === 0) {
      return new Response(
        JSON.stringify({
          message: 'Nothing to notify',
          eventsNotified: 0,
          remindersNotified: 0,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { data: subscriptions, error: subError } = await supabase
      .from('push_subscriptions')
      .select('*')
      .in('user_id', Array.from(userIds))

    if (subError) {
      console.error('Error fetching subscriptions:', subError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch subscriptions' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!subscriptions || subscriptions.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No push subscriptions found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const subscriptionsByUser = new Map<string, any[]>()
    for (const sub of subscriptions) {
      if (!subscriptionsByUser.has(sub.user_id)) {
        subscriptionsByUser.set(sub.user_id, [])
      }
      subscriptionsByUser.get(sub.user_id)!.push(sub)
    }

    let totalSent = 0
    let totalFailed = 0
    const invalidSubscriptions: string[] = []

    for (const event of eventsToNotify) {
      const eventUserId: string | null = event.user_id ?? null
      if (!eventUserId) continue

      const userSubscriptions = subscriptionsByUser.get(eventUserId) || []

      for (const sub of userSubscriptions) {
        try {
          const eventDate = new Date(event.date_heure)
          const body = event.description
            ? `${eventDate.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })} — ${event.description}`
            : eventDate.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })

          const payload = JSON.stringify({
            title: `🌱 ${event.titre}`,
            body,
            url: notificationUrl(event.bonsai_id),
          })

          await webPush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth },
            },
            payload,
          )
          totalSent++
        } catch (error: any) {
          console.error('Failed to send notification:', error)
          if (error.statusCode === 404 || error.statusCode === 410) {
            invalidSubscriptions.push(sub.endpoint)
          }
          totalFailed++
        }
      }

      await supabase
        .from('evenements')
        .update({ notified_at: new Date().toISOString() })
        .eq('id', event.id)
    }

    for (const reminder of remindersToNotify) {
      const reminderUserId: string | null = reminder.user_id
      if (!reminderUserId) continue

      const userSubscriptions = subscriptionsByUser.get(reminderUserId) || []

      for (const sub of userSubscriptions) {
        try {
          const reminderDate = new Date(reminder.date_heure)
          const body =
            reminder.notes ||
            reminderDate.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })

          const payload = JSON.stringify({
            title: `🌱 Rappel : ${reminder.titre}`,
            body,
            url: notificationUrl(reminder.bonsai_id),
          })

          await webPush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth },
            },
            payload,
          )
          totalSent++
        } catch (error: any) {
          console.error('Failed to send notification:', error)
          if (error.statusCode === 404 || error.statusCode === 410) {
            invalidSubscriptions.push(sub.endpoint)
          }
          totalFailed++
        }
      }

      if (reminder.intervalle_jours) {
        const nextDate = new Date(reminder.date_heure)
        nextDate.setDate(nextDate.getDate() + reminder.intervalle_jours)
        await supabase
          .from('rappels')
          .update({ prochaine_date: nextDate.toISOString() })
          .eq('id', reminder.id)
      } else {
        await supabase
          .from('rappels')
          .update({ notified_at: new Date().toISOString() })
          .eq('id', reminder.id)
      }
    }

    if (invalidSubscriptions.length > 0) {
      await supabase
        .from('push_subscriptions')
        .delete()
        .in('endpoint', invalidSubscriptions)
      console.log(`Deleted ${invalidSubscriptions.length} invalid subscriptions`)
    }

    return new Response(
      JSON.stringify({
        message: `Sent ${totalSent} notifications successfully, ${totalFailed} failed, ${invalidSubscriptions.length} invalid subscriptions removed`,
        eventsNotified: eventsToNotify.length,
        remindersNotified: remindersToNotify.length,
        invalidSubscriptionsRemoved: invalidSubscriptions.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in send-due-notifications:', error)
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
