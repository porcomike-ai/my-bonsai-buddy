-- Compteur d'usage quotidien pour les modules IA externes à quota gratuit
-- (Pl@ntNet pour l'identification d'espèce, Gemini pour un futur diagnostic
-- santé). Une ligne par (utilisateur, module, jour). Écrit uniquement par les
-- Edge Functions via la clé service-role — RLS sert ici de garde-fou en
-- lecture seule pour permettre à l'UI d'afficher "X restant aujourd'hui"
-- sans passer par une Edge Function dédiée juste pour ça.
CREATE TABLE IF NOT EXISTS public.ai_usage_counters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    module TEXT NOT NULL,
    day DATE NOT NULL DEFAULT CURRENT_DATE,
    count INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE (user_id, module, day)
);

ALTER TABLE public.ai_usage_counters ENABLE ROW LEVEL SECURITY;

-- Lecture seule pour l'utilisateur concerné (affichage du quota restant
-- côté client). Aucune policy INSERT/UPDATE/DELETE : ces écritures ne
-- passent que par les Edge Functions via la clé service-role, qui contourne
-- RLS — cohérent avec le pattern déjà en place pour les opérations admin
-- (voir client.server.ts).
CREATE POLICY "Users can view own ai usage counters"
    ON public.ai_usage_counters
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_ai_usage_counters_user_module_day
    ON public.ai_usage_counters(user_id, module, day);
