import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// Appelée depuis le navigateur (bonsai-photo-studio.tsx via functions.invoke
// avec un FormData). L'auth JWT utilisateur est obligatoire ; CORS ouvert
// mais protégé par le token, même pattern que send-test-push.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

const MODULE_NAME = "species-id"
// Palier gratuit Pl@ntNet documenté à 500 requêtes/jour pour une clé
// "essai" standard. On se garde une marge (400) plutôt que de coller pile
// au plafond, pour absorber un éventuel écart de fuseau horaire entre le
// "jour" compté ici (UTC, via CURRENT_DATE côté Postgres) et celui compté
// par Pl@ntNet, sans jamais se faire rejeter côté fournisseur sans préavis.
const DEFAULT_DAILY_LIMIT = 400

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

interface PlantNetSpecies {
  scientificNameWithoutAuthor: string
  scientificName: string
  commonNames: string[]
  family?: { scientificNameWithoutAuthor: string }
}

interface PlantNetResult {
  score: number
  species: PlantNetSpecies
}

interface PlantNetResponse {
  results?: PlantNetResult[]
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get("Authorization")
    if (!authHeader) {
      return json({ error: "Missing authorization header", code: "unauthorized" }, 401)
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    const plantnetApiKey = Deno.env.get("PLANTNET_API_KEY")
    const dailyLimit = Number(Deno.env.get("PLANTNET_DAILY_LIMIT") ?? DEFAULT_DAILY_LIMIT)

    if (!plantnetApiKey) {
      console.error("PLANTNET_API_KEY non configurée")
      return json({ error: "Species identification not configured", code: "not_configured" }, 500)
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      global: { headers: { Authorization: authHeader } },
    })

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      return json({ error: "Invalid user token", code: "unauthorized" }, 401)
    }

    // --- Vérification du quota AVANT tout appel à Pl@ntNet ---
    const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD (UTC)
    const { data: counterRow, error: counterError } = await supabase
      .from("ai_usage_counters")
      .select("count")
      .eq("user_id", user.id)
      .eq("module", MODULE_NAME)
      .eq("day", today)
      .maybeSingle()

    if (counterError) {
      console.error("Erreur lecture quota:", counterError)
      return json({ error: "Failed to check quota", code: "quota_check_failed" }, 500)
    }

    const currentCount = counterRow?.count ?? 0
    if (currentCount >= dailyLimit) {
      return json(
        {
          error: "Quota quotidien d'identification d'espèce atteint",
          code: "quota_exceeded",
          quotaRemaining: 0,
        },
        429,
      )
    }

    // --- Lecture de l'image envoyée par le client ---
    const incomingForm = await req.formData()
    const imageFile = incomingForm.get("image")
    if (!(imageFile instanceof File)) {
      return json({ error: "Missing image file", code: "invalid_image" }, 400)
    }
    const organ = String(incomingForm.get("organ") ?? "auto")

    // --- Appel Pl@ntNet ---
    const plantnetForm = new FormData()
    plantnetForm.append("images", imageFile, imageFile.name || "photo.jpg")
    plantnetForm.append("organs", organ)

    const plantnetUrl = `https://my-api.plantnet.org/v2/identify/all?api-key=${encodeURIComponent(plantnetApiKey)}&lang=fr&nb-results=5`

    const plantnetRes = await fetch(plantnetUrl, {
      method: "POST",
      body: plantnetForm,
    })

    // On incrémente le compteur même en cas d'échec Pl@ntNet post-envoi (une
    // requête envoyée consomme le quota côté fournisseur, qu'elle réussisse
    // ou non côté résultat), mais PAS si l'erreur est un rejet immédiat de
    // notre propre validation (déjà retourné plus haut, avant tout appel).
    const { error: upsertError } = await supabase
      .from("ai_usage_counters")
      .upsert(
        { user_id: user.id, module: MODULE_NAME, day: today, count: currentCount + 1 },
        { onConflict: "user_id,module,day" },
      )
    if (upsertError) {
      // Non bloquant : on préfère répondre à l'utilisateur plutôt que de
      // faire échouer toute la requête pour un souci de comptabilité.
      console.error("Erreur incrément quota:", upsertError)
    }

    if (!plantnetRes.ok) {
      const bodyText = await plantnetRes.text().catch(() => "")
      console.error("Pl@ntNet a répondu en erreur:", plantnetRes.status, bodyText)
      if (plantnetRes.status === 404) {
        return json(
          { error: "Aucune espèce identifiée sur cette photo", code: "no_match", quotaRemaining: dailyLimit - currentCount - 1 },
          200,
        )
      }
      return json(
        { error: "Le service d'identification a échoué", code: "provider_failed" },
        502,
      )
    }

    const data = (await plantnetRes.json()) as PlantNetResponse
    const results = (data.results ?? []).map((r) => ({
      scientificName: r.species.scientificNameWithoutAuthor,
      commonNames: r.species.commonNames ?? [],
      family: r.species.family?.scientificNameWithoutAuthor,
      confidence: r.score,
    }))

    return json({
      results,
      quotaRemaining: Math.max(0, dailyLimit - currentCount - 1),
    })
  } catch (error) {
    console.error("Error in identify-species:", error)
    return json({ error: String(error), code: "unexpected_error" }, 500)
  }
})
