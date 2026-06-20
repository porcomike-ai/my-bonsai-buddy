/*
# Bonsaï Studio — Schéma multi-appareils Supabase

## Contexte
Migration depuis IndexedDB + Google Drive vers Supabase. L'app devient multi-utilisateur
authentifié (email/password) avec synchronisation temps réel entre appareils.

## Nouvelles tables (6)
1. `bonsais`   — fiches principales des arbres (style, espèce, étape, dimensions, valeur, liens)
2. `poteries`  — pots associés aux bonsaïs (dimensions, matière, origine, prix)
3. `photos`    — photos des bonsaïs (stocke le chemin Storage, pas le blob binaire)
4. `journal_entries` — historique des soins (taille, rempotage, ligature, arrosage, etc.)
5. `rappels`   — rappels de soins récurrents (prochaine date, intervalle)
6. `evenements` — évènements du calendrier (rendez-vous, expositions)

## Colonnes clés
- `user_id uuid NOT NULL DEFAULT auth.uid()` sur chaque table → isolation par utilisateur
- `id uuid PRIMARY KEY DEFAULT gen_random_uuid()` partout
- `created_at`, `updated_at` (bonsais seulement) timestamptz DEFAULT now()
- `bonsai_id`/`poterie_id` : FK avec ON DELETE CASCADE (supprimer un bonsaï supprime ses photos/journal/rappels)
- Noms de colonnes en snake_case (convention Postgres), convertis côté client

## Sécurité
- RLS activée sur chaque table
- 4 politiques par table (SELECT/INSERT/UPDATE/DELETE) restreintes à `auth.uid() = user_id`
- Storage : 2 buckets privés (bonsai-photos, poterie-photos) avec politiques par utilisateur

## Notes
- `updated_at` sur bonsais permet la sync incrémentale multi-appareils
- `photo_principale_path` dans bonsais est le storage_path de la photo principale
- Les anciens IDs IndexedDB (UUID v4) sont conservés via idempotence de upsert
*/

-- ============================================================================
-- 1. Table bonsais
-- ============================================================================
CREATE TABLE IF NOT EXISTS bonsais (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  nom text NOT NULL,
  espece text NOT NULL,
  style text NOT NULL DEFAULT 'autre',
  etape text DEFAULT 'culture',
  age_estime integer,
  date_acquisition date,
  origine text,
  hauteur_cm numeric(6,1),
  prix_achat numeric(10,2),
  valeur_estimee numeric(10,2),
  photo_principale_path text,
  poterie_id uuid,
  notes text,
  dans_collection boolean NOT NULL DEFAULT true,
  favori boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bonsais_user_id ON bonsais(user_id);
CREATE INDEX IF NOT EXISTS idx_bonsais_created_at ON bonsais(created_at DESC);

ALTER TABLE bonsais ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_bonsais" ON bonsais;
CREATE POLICY "select_own_bonsais" ON bonsais FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_bonsais" ON bonsais;
CREATE POLICY "insert_own_bonsais" ON bonsais FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_bonsais" ON bonsais;
CREATE POLICY "update_own_bonsais" ON bonsais FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_bonsais" ON bonsais;
CREATE POLICY "delete_own_bonsais" ON bonsais FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ============================================================================
-- 2. Table poteries
-- ============================================================================
CREATE TABLE IF NOT EXISTS poteries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  nom text NOT NULL,
  longueur_cm numeric(5,1),
  largeur_cm numeric(5,1),
  hauteur_cm numeric(5,1),
  forme text,
  couleur text,
  matiere text,
  artisan text,
  origine text,
  prix numeric(10,2),
  photo_path text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_poteries_user_id ON poteries(user_id);

ALTER TABLE poteries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_poteries" ON poteries;
CREATE POLICY "select_own_poteries" ON poteries FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_poteries" ON poteries;
CREATE POLICY "insert_own_poteries" ON poteries FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_poteries" ON poteries;
CREATE POLICY "update_own_poteries" ON poteries FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_poteries" ON poteries;
CREATE POLICY "delete_own_poteries" ON poteries FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Lien bonsai → poterie (ajout conditionnel pour idempotence)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'bonsais_poterie_id_fkey' AND table_name = 'bonsais'
  ) THEN
    ALTER TABLE bonsais
      ADD CONSTRAINT bonsais_poterie_id_fkey
      FOREIGN KEY (poterie_id) REFERENCES poteries(id) ON DELETE SET NULL;
  END IF;
END $$;

-- ============================================================================
-- 3. Table photos
-- ============================================================================
CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  bonsai_id uuid NOT NULL REFERENCES bonsais(id) ON DELETE CASCADE,
  storage_path text NOT NULL,
  date timestamptz NOT NULL DEFAULT now(),
  legende text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_photos_user_id ON photos(user_id);
CREATE INDEX IF NOT EXISTS idx_photos_bonsai_id ON photos(bonsai_id);
CREATE INDEX IF NOT EXISTS idx_photos_date ON photos(date DESC);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_photos" ON photos;
CREATE POLICY "select_own_photos" ON photos FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_photos" ON photos;
CREATE POLICY "insert_own_photos" ON photos FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_photos" ON photos;
CREATE POLICY "update_own_photos" ON photos FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_photos" ON photos;
CREATE POLICY "delete_own_photos" ON photos FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ============================================================================
-- 4. Table journal_entries
-- ============================================================================
CREATE TABLE IF NOT EXISTS journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  bonsai_id uuid NOT NULL REFERENCES bonsais(id) ON DELETE CASCADE,
  type text NOT NULL DEFAULT 'autre',
  date timestamptz NOT NULL DEFAULT now(),
  notes text,
  rappel_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_journal_user_id ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_bonsai_id ON journal_entries(bonsai_id);
CREATE INDEX IF NOT EXISTS idx_journal_date ON journal_entries(date DESC);

ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_journal" ON journal_entries;
CREATE POLICY "select_own_journal" ON journal_entries FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_journal" ON journal_entries;
CREATE POLICY "insert_own_journal" ON journal_entries FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_journal" ON journal_entries;
CREATE POLICY "update_own_journal" ON journal_entries FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_journal" ON journal_entries;
CREATE POLICY "delete_own_journal" ON journal_entries FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ============================================================================
-- 5. Table rappels
-- ============================================================================
CREATE TABLE IF NOT EXISTS rappels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  bonsai_id uuid NOT NULL REFERENCES bonsais(id) ON DELETE CASCADE,
  type text NOT NULL DEFAULT 'autre',
  prochaine_date timestamptz NOT NULL,
  intervalle_jours integer,
  notes text,
  actif boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rappels_user_id ON rappels(user_id);
CREATE INDEX IF NOT EXISTS idx_rappels_bonsai_id ON rappels(bonsai_id);
CREATE INDEX IF NOT EXISTS idx_rappels_prochaine_date ON rappels(prochaine_date);

ALTER TABLE rappels ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_rappels" ON rappels;
CREATE POLICY "select_own_rappels" ON rappels FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_rappels" ON rappels;
CREATE POLICY "insert_own_rappels" ON rappels FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_rappels" ON rappels;
CREATE POLICY "update_own_rappels" ON rappels FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_rappels" ON rappels;
CREATE POLICY "delete_own_rappels" ON rappels FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ============================================================================
-- 6. Table evenements
-- ============================================================================
CREATE TABLE IF NOT EXISTS evenements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  titre text NOT NULL,
  description text,
  date_heure timestamptz NOT NULL,
  rappel_minutes integer,
  notified_at timestamptz,
  bonsai_id uuid REFERENCES bonsais(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_evenements_user_id ON evenements(user_id);
CREATE INDEX IF NOT EXISTS idx_evenements_date_heure ON evenements(date_heure);

ALTER TABLE evenements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_evenements" ON evenements;
CREATE POLICY "select_own_evenements" ON evenements FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_evenements" ON evenements;
CREATE POLICY "insert_own_evenements" ON evenements FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_evenements" ON evenements;
CREATE POLICY "update_own_evenements" ON evenements FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_evenements" ON evenements;
CREATE POLICY "delete_own_evenements" ON evenements FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ============================================================================
-- 7. Trigger updated_at sur bonsais
-- ============================================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_bonsais_updated_at ON bonsais;
CREATE TRIGGER trg_bonsais_updated_at
  BEFORE UPDATE ON bonsais
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- ============================================================================
-- 8. Buckets Storage (privés, RLS sur les objets)
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('bonsai-photos', 'bonsai-photos', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('poterie-photos', 'poterie-photos', false)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "select_own_bonsai_photos" ON storage.objects;
CREATE POLICY "select_own_bonsai_photos" ON storage.objects FOR SELECT
  TO authenticated USING (
    bucket_id = 'bonsai-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "insert_own_bonsai_photos" ON storage.objects;
CREATE POLICY "insert_own_bonsai_photos" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (
    bucket_id = 'bonsai-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "update_own_bonsai_photos" ON storage.objects;
CREATE POLICY "update_own_bonsai_photos" ON storage.objects FOR UPDATE
  TO authenticated USING (
    bucket_id = 'bonsai-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "delete_own_bonsai_photos" ON storage.objects;
CREATE POLICY "delete_own_bonsai_photos" ON storage.objects FOR DELETE
  TO authenticated USING (
    bucket_id = 'bonsai-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "select_own_poterie_photos" ON storage.objects;
CREATE POLICY "select_own_poterie_photos" ON storage.objects FOR SELECT
  TO authenticated USING (
    bucket_id = 'poterie-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "insert_own_poterie_photos" ON storage.objects;
CREATE POLICY "insert_own_poterie_photos" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (
    bucket_id = 'poterie-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "update_own_poterie_photos" ON storage.objects;
CREATE POLICY "update_own_poterie_photos" ON storage.objects FOR UPDATE
  TO authenticated USING (
    bucket_id = 'poterie-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "delete_own_poterie_photos" ON storage.objects;
CREATE POLICY "delete_own_poterie_photos" ON storage.objects FOR DELETE
  TO authenticated USING (
    bucket_id = 'poterie-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
