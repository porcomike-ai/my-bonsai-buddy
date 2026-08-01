import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import webPush from "https://esm.sh/web-push@3.6.7"

// Appelée depuis le navigateur (parametres.tsx via functions.invoke).
// L'auth JWT utilisateur est obligatoire ; CORS ouvert mais protégé par le token.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get("Authorization")
    if (!authHeader) {
      return json({ error: "Missing authorization header" }, 401)
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

    // Client service-role pour les écritures (cleanup abonnements invalides).
    // getUser() valide le JWT via le header Authorization passé globalement.
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      global: { headers: { Authorization: authHeader } },
    })

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      return json({ error: "Invalid user token" }, 401)
    }

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

    const { data: subscriptions, error: subError } = await supabase
      .from("push_subscriptions")
      .select("endpoint, p256dh, auth")
      .eq("user_id", user.id)

    if (subError) {
      console.error("Error fetching subscriptions:", subError)
      return json({ error: "Failed to fetch subscriptions" }, 500)
    }

    if (!subscriptions || subscriptions.length === 0) {
      return json({ error: "No push subscriptions found for this user" }, 404)
    }

    const payload = JSON.stringify({
      title: "Test 🌱",
      body: "Ceci est une notification de test",
      url: "/",
    })

    const invalidEndpoints: string[] = []
    const results = await Promise.all(
      subscriptions.map(async (sub) => {
        try {
          await webPush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth },
            },
            payload,
          )
          return { success: true as const, endpoint: sub.endpoint }
        } catch (error: unknown) {
          const statusCode = (error as { statusCode?: number })?.statusCode
          if (statusCode === 404 || statusCode === 410) {
            invalidEndpoints.push(sub.endpoint)
          }
          console.error("Failed to send notification:", error)
          return {
            success: false as const,
            endpoint: sub.endpoint,
            error: String(error),
          }
        }
      }),
    )

    if (invalidEndpoints.length > 0) {
      const { error: delError } = await supabase
        .from("push_subscriptions")
        .delete()
        .in("endpoint", invalidEndpoints)
        .eq("user_id", user.id)
      if (delError) {
        console.error("Failed to clean invalid subscriptions:", delError)
      }
    }

    const successful = results.filter((r) => r.success).length
    const failed = results.length - successful

    return json({
      message: `Sent ${successful} notifications successfully, ${failed} failed`,
      invalidSubscriptionsRemoved: invalidEndpoints.length,
      results,
    })
  } catch (error) {
    console.error("Error in send-test-push:", error)
    return json({ error: String(error) }, 500)
  }
})
