
CREATE TABLE public.poteries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  longueur_cm NUMERIC, largeur_cm NUMERIC, hauteur_cm NUMERIC,
  forme TEXT, couleur TEXT, matiere TEXT, artisan TEXT, origine TEXT,
  prix NUMERIC, photo_path TEXT, notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.poteries TO authenticated;
GRANT ALL ON public.poteries TO service_role;
ALTER TABLE public.poteries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own poteries" ON public.poteries FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX ON public.poteries(user_id, created_at DESC);

CREATE TABLE public.bonsais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  nom TEXT NOT NULL, espece TEXT NOT NULL, style TEXT NOT NULL, etape TEXT,
  age_estime INTEGER, date_acquisition DATE, origine TEXT,
  hauteur_cm NUMERIC, prix_achat NUMERIC, valeur_estimee NUMERIC,
  photo_principale_path TEXT,
  poterie_id UUID REFERENCES public.poteries(id) ON DELETE SET NULL,
  notes TEXT,
  dans_collection BOOLEAN NOT NULL DEFAULT true,
  favori BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bonsais TO authenticated;
GRANT ALL ON public.bonsais TO service_role;
ALTER TABLE public.bonsais ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own bonsais" ON public.bonsais FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX ON public.bonsais(user_id, created_at DESC);
CREATE INDEX ON public.bonsais(poterie_id);

CREATE TABLE public.photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  bonsai_id UUID NOT NULL REFERENCES public.bonsais(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  legende TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.photos TO authenticated;
GRANT ALL ON public.photos TO service_role;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own photos" ON public.photos FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX ON public.photos(user_id, bonsai_id, date DESC);

CREATE TABLE public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  bonsai_id UUID NOT NULL REFERENCES public.bonsais(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  rappel_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.journal_entries TO authenticated;
GRANT ALL ON public.journal_entries TO service_role;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own journal" ON public.journal_entries FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX ON public.journal_entries(user_id, bonsai_id, date DESC);

CREATE TABLE public.rappels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  bonsai_id UUID NOT NULL REFERENCES public.bonsais(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  prochaine_date DATE NOT NULL,
  intervalle_jours INTEGER,
  notes TEXT,
  actif BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rappels TO authenticated;
GRANT ALL ON public.rappels TO service_role;
ALTER TABLE public.rappels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own rappels" ON public.rappels FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX ON public.rappels(user_id, prochaine_date);

CREATE TABLE public.evenements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  titre TEXT NOT NULL,
  description TEXT,
  date_heure TIMESTAMPTZ NOT NULL,
  rappel_minutes INTEGER,
  notified_at TIMESTAMPTZ,
  bonsai_id UUID REFERENCES public.bonsais(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.evenements TO authenticated;
GRANT ALL ON public.evenements TO service_role;
ALTER TABLE public.evenements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own evenements" ON public.evenements FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX ON public.evenements(user_id, date_heure);

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TRIGGER trg_bonsais_updated BEFORE UPDATE ON public.bonsais
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_poteries_updated BEFORE UPDATE ON public.poteries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
