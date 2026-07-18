import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import webPush from 'https://esm.sh/web-push@3.6.7'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Reuse the triggerTimeFor logic from notifications.ts
function triggerTimeFor(e: any): number {
  const ts = new Date(e.date_heure).getTime();
  if (isNaN(ts)) return Infinity;
  const minutesBefore = e.rappel_minutes ?? 0;
  return ts - minutesBefore * 60_000;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get VAPID keys from environment
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY')
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY')
    
    if (!vapidPublicKey || !vapidPrivateKey) {
      return new Response(
        JSON.stringify({ error: 'VAPID keys not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Configure web-push with VAPID keys
    webPush.setVapidDetails(
      'mailto:contact@bonsai-studio.com',
      vapidPublicKey,
      vapidPrivateKey
    )

    const now = Date.now();
    const oneDayAgo = now - 24 * 3600_000;

    // Fetch events that need notification
    const { data: events, error: eventsError } = await supabase
      .from('evenements')
      .select('*')
      .is('notified_at', null)

    if (eventsError) {
      console.error('Error fetching events:', eventsError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch events' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch reminders that need notification
    const { data: reminders, error: remindersError } = await supabase
      .from('rappels')
      .select('*')
      .eq('actif', true)
      .is('notified_at', null)

    if (remindersError) {
      console.error('Error fetching reminders:', remindersError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch reminders' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Process events
    const eventsToNotify = (events || []).filter((e: any) => {
      const trigger = triggerTimeFor(e);
      const eventTime = new Date(e.date_heure).getTime();
      return trigger <= now && eventTime + 24 * 3600_000 > now;
    });

    // Process reminders - convert to event-like structure
    // Note : user_id n'est pas encore connu ici (il dépend du bonsaï lié).
    // Il est résolu juste après via bonsaiUserIdById, pour tous les rappels
    // à notifier d'un coup plutôt qu'un par un.
    const remindersAsEvents = (reminders || []).map((r: any) => ({
      id: r.id,
      titre: r.type,
      description: r.notes || '',
      date_heure: r.prochaine_date,
      rappel_minutes: 0,
      bonsai_id: r.bonsai_id,
      user_id: null as string | null,
    }));

    const remindersToNotify = remindersAsEvents.filter((e: any) => {
      const trigger = triggerTimeFor(e);
      const eventTime = new Date(e.date_heure).getTime();
      return trigger <= now && eventTime + 24 * 3600_000 > now;
    });

    // Récupère en une seule requête le user_id de tous les bonsaïs concernés
    // (événements + rappels à notifier), au lieu d'une requête par item.
    const bonsaiIds = new Set<string>();
    for (const event of eventsToNotify) {
      if (event.bonsai_id) bonsaiIds.add(event.bonsai_id);
    }
    for (const reminder of remindersToNotify) {
      if (reminder.bonsai_id) bonsaiIds.add(reminder.bonsai_id);
    }

    const bonsaiUserIdById = new Map<string, string>();
    if (bonsaiIds.size > 0) {
      const { data: bonsaisData, error: bonsaisError } = await supabase
        .from('bonsais')
        .select('id, user_id')
        .in('id', Array.from(bonsaiIds));

      if (bonsaisError) {
        console.error('Error fetching bonsais:', bonsaisError)
        return new Response(
          JSON.stringify({ error: 'Failed to fetch bonsais' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      for (const b of bonsaisData || []) {
        if (b.user_id) bonsaiUserIdById.set(b.id, b.user_id);
      }
    }

    // Résout maintenant le user_id de chaque rappel à partir de la map.
    for (const reminder of remindersToNotify) {
      reminder.user_id = reminder.bonsai_id ? bonsaiUserIdById.get(reminder.bonsai_id) ?? null : null;
    }

    // Get user IDs for all items to notify
    const userIds = new Set<string>(bonsaiUserIdById.values());

    // Fetch all push subscriptions for these users
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

    // Group subscriptions by user_id
    const subscriptionsByUser = new Map<string, any[]>();
    for (const sub of subscriptions) {
      if (!subscriptionsByUser.has(sub.user_id)) {
        subscriptionsByUser.set(sub.user_id, []);
      }
      subscriptionsByUser.get(sub.user_id)!.push(sub);
    }

    let totalSent = 0;
    let totalFailed = 0;
    const invalidSubscriptions: string[] = [];

    // Send notifications for events
    for (const event of eventsToNotify) {
      const eventUserId: string | null = event.bonsai_id
        ? bonsaiUserIdById.get(event.bonsai_id) ?? null
        : null;

      if (!eventUserId) continue;

      const userSubscriptions = subscriptionsByUser.get(eventUserId) || [];
      
      for (const sub of userSubscriptions) {
        try {
          const eventDate = new Date(event.date_heure);
          const body = event.description
            ? `${eventDate.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })} — ${event.description}`
            : eventDate.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

          const payload = JSON.stringify({
            title: `🌱 ${event.titre}`,
            body,
            url: `/bonsai/${event.bonsai_id}`,
          });

          const pushSubscription = {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth,
            },
          }

          await webPush.sendNotification(pushSubscription, payload)
          totalSent++;
        } catch (error: any) {
          console.error('Failed to send notification:', error)
          
          // Check for 404 or 410 errors (subscription no longer valid)
          if (error.statusCode === 404 || error.statusCode === 410) {
            invalidSubscriptions.push(sub.endpoint);
          }
          totalFailed++;
        }
      }

      // Mark event as notified
      await supabase
        .from('evenements')
        .update({ notified_at: new Date().toISOString() })
        .eq('id', event.id);
    }

    // Send notifications for reminders
    for (const reminder of remindersToNotify) {
      const reminderUserId: string | null = reminder.user_id;

      if (!reminderUserId) continue;

      const userSubscriptions = subscriptionsByUser.get(reminderUserId) || [];
      
      for (const sub of userSubscriptions) {
        try {
          const reminderDate = new Date(reminder.date_heure);
          const body = reminder.notes || reminderDate.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

          const payload = JSON.stringify({
            title: `🌱 Rappel : ${reminder.titre}`,
            body,
            url: `/bonsai/${reminder.bonsai_id}`,
          });

          const pushSubscription = {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth,
            },
          }

          await webPush.sendNotification(pushSubscription, payload)
          totalSent++;
        } catch (error: any) {
          console.error('Failed to send notification:', error)
          
          // Check for 404 or 410 errors (subscription no longer valid)
          if (error.statusCode === 404 || error.statusCode === 410) {
            invalidSubscriptions.push(sub.endpoint);
          }
          totalFailed++;
        }
      }

      // Update reminder: mark as notified for one-time, or advance date for recurring
      const { data: reminderData } = await supabase
        .from('rappels')
        .select('intervalle_jours')
        .eq('id', reminder.id)
        .single();

      if (reminderData?.intervalle_jours) {
        // Recurring reminder: advance to next date
        const nextDate = new Date(reminder.date_heure);
        nextDate.setDate(nextDate.getDate() + reminderData.intervalle_jours);
        
        await supabase
          .from('rappels')
          .update({ prochaine_date: nextDate.toISOString() })
          .eq('id', reminder.id);
      } else {
        // One-time reminder: mark as notified
        await supabase
          .from('rappels')
          .update({ notified_at: new Date().toISOString() })
          .eq('id', reminder.id);
      }
    }

    // Delete invalid subscriptions
    if (invalidSubscriptions.length > 0) {
      await supabase
        .from('push_subscriptions')
        .delete()
        .in('endpoint', invalidSubscriptions);
      
      console.log(`Deleted ${invalidSubscriptions.length} invalid subscriptions`);
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
