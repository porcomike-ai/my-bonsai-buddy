/*
# Nettoyage : policies RLS dupliquées sur bonsais / poteries

## Pourquoi cette migration
La migration `20260620162342_create_bonsai_studio_schema.sql` a créé 4 policies
granulaires par table (select_own_*, insert_own_*, update_own_*, delete_own_*).
La migration `20260701172758_...sql` a ensuite recréé les tables `bonsais` et
`poteries` avec une policy unique `"own bonsais"` / `"own poteries"` (FOR ALL),
sans jamais supprimer les 4 anciennes policies granulaires.

Si les deux jeux de policies coexistent sur une base donnée, Postgres doit
évaluer TOUTES les policies permissives applicables à chaque INSERT/UPDATE/
SELECT/DELETE (elles sont combinées en OR), ce qui fait un travail redondant
à chaque écriture — notamment à chaque sauvegarde de bonsaï ou de poterie.

## Ce que fait cette migration
Supprime les 4 anciennes policies granulaires sur `bonsais` et `poteries`
**uniquement si** la policy `FOR ALL` correspondante existe déjà (elle couvre
exactement le même accès : `auth.uid() = user_id`). Si la policy FOR ALL
n'existe pas (ex: base jamais passée par la migration du 1er juillet), on la
crée avant de supprimer les anciennes, pour ne jamais se retrouver sans policy.

## Idempotence
Chaque bloc utilise `DROP POLICY IF EXISTS` / vérifie l'existence avant de
créer, donc rejouable sans erreur sur n'importe quel état de base.
*/

-- ============================================================================
-- Table bonsais
-- ============================================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'bonsais' AND policyname = 'own bonsais'
  ) THEN
    CREATE POLICY "own bonsais" ON public.bonsais
      FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DROP POLICY IF EXISTS "select_own_bonsais" ON public.bonsais;
DROP POLICY IF EXISTS "insert_own_bonsais" ON public.bonsais;
DROP POLICY IF EXISTS "update_own_bonsais" ON public.bonsais;
DROP POLICY IF EXISTS "delete_own_bonsais" ON public.bonsais;

-- ============================================================================
-- Table poteries
-- ============================================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'poteries' AND policyname = 'own poteries'
  ) THEN
    CREATE POLICY "own poteries" ON public.poteries
      FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DROP POLICY IF EXISTS "select_own_poteries" ON public.poteries;
DROP POLICY IF EXISTS "insert_own_poteries" ON public.poteries;
DROP POLICY IF EXISTS "update_own_poteries" ON public.poteries;
DROP POLICY IF EXISTS "delete_own_poteries" ON public.poteries;

-- ============================================================================
-- Vérification (visible dans les logs de migration Supabase)
-- ============================================================================
DO $$
DECLARE
  bonsais_count int;
  poteries_count int;
BEGIN
  SELECT count(*) INTO bonsais_count FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'bonsais';
  SELECT count(*) INTO poteries_count FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'poteries';
  RAISE NOTICE 'Policies restantes après nettoyage — bonsais: %, poteries: %', bonsais_count, poteries_count;
END $$;
