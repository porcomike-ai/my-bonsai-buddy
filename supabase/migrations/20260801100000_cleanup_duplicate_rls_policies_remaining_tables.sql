/*
# Nettoyage : policies RLS dupliquées sur photos / journal_entries / rappels / evenements

## Pourquoi cette migration
Même situation que celle déjà corrigée pour bonsais/poteries dans
`20260705120000_cleanup_duplicate_rls_policies.sql`, mais jamais appliquée à
ces 4 tables : la migration `20260620162342_create_bonsai_studio_schema.sql`
a créé 4 policies granulaires par table (select_own_*, insert_own_*,
update_own_*, delete_own_*), puis `20260701172758_...sql` a recréé les
tables avec une policy unique `"own <table>"` (FOR ALL), sans jamais
supprimer les 4 anciennes policies granulaires.

Les deux jeux de policies coexistent donc encore sur `photos`,
`journal_entries`, `rappels` et `evenements` : Postgres évalue toutes les
policies permissives applicables à chaque INSERT/UPDATE/SELECT/DELETE
(combinées en OR), un travail redondant à chaque écriture.

## Ce que fait cette migration
Supprime les 4 anciennes policies granulaires par table **uniquement si** la
policy `FOR ALL` correspondante existe déjà (même accès exact :
`auth.uid() = user_id`). Si elle n'existe pas, on la crée avant de supprimer
les anciennes, pour ne jamais se retrouver sans policy.

## Idempotence
Chaque bloc utilise `DROP POLICY IF EXISTS` / vérifie l'existence avant de
créer, donc rejouable sans erreur sur n'importe quel état de base.
*/

-- ============================================================================
-- Table photos
-- ============================================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'photos' AND policyname = 'own photos'
  ) THEN
    CREATE POLICY "own photos" ON public.photos
      FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DROP POLICY IF EXISTS "select_own_photos" ON public.photos;
DROP POLICY IF EXISTS "insert_own_photos" ON public.photos;
DROP POLICY IF EXISTS "update_own_photos" ON public.photos;
DROP POLICY IF EXISTS "delete_own_photos" ON public.photos;

-- ============================================================================
-- Table journal_entries
-- ============================================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'journal_entries' AND policyname = 'own journal'
  ) THEN
    CREATE POLICY "own journal" ON public.journal_entries
      FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DROP POLICY IF EXISTS "select_own_journal" ON public.journal_entries;
DROP POLICY IF EXISTS "insert_own_journal" ON public.journal_entries;
DROP POLICY IF EXISTS "update_own_journal" ON public.journal_entries;
DROP POLICY IF EXISTS "delete_own_journal" ON public.journal_entries;

-- ============================================================================
-- Table rappels
-- ============================================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'rappels' AND policyname = 'own rappels'
  ) THEN
    CREATE POLICY "own rappels" ON public.rappels
      FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DROP POLICY IF EXISTS "select_own_rappels" ON public.rappels;
DROP POLICY IF EXISTS "insert_own_rappels" ON public.rappels;
DROP POLICY IF EXISTS "update_own_rappels" ON public.rappels;
DROP POLICY IF EXISTS "delete_own_rappels" ON public.rappels;

-- ============================================================================
-- Table evenements
-- ============================================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'evenements' AND policyname = 'own evenements'
  ) THEN
    CREATE POLICY "own evenements" ON public.evenements
      FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DROP POLICY IF EXISTS "select_own_evenements" ON public.evenements;
DROP POLICY IF EXISTS "insert_own_evenements" ON public.evenements;
DROP POLICY IF EXISTS "update_own_evenements" ON public.evenements;
DROP POLICY IF EXISTS "delete_own_evenements" ON public.evenements;

-- ============================================================================
-- Vérification (visible dans les logs de migration Supabase)
-- ============================================================================
DO $$
DECLARE
  photos_count int;
  journal_count int;
  rappels_count int;
  evenements_count int;
BEGIN
  SELECT count(*) INTO photos_count FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'photos';
  SELECT count(*) INTO journal_count FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'journal_entries';
  SELECT count(*) INTO rappels_count FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'rappels';
  SELECT count(*) INTO evenements_count FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'evenements';
  RAISE NOTICE 'Policies restantes après nettoyage — photos: %, journal_entries: %, rappels: %, evenements: %',
    photos_count, journal_count, rappels_count, evenements_count;
END $$;
