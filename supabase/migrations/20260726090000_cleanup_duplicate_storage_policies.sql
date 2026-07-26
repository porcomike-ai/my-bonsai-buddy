-- Nettoyage des policies Storage dupliquées sur storage.objects.
--
-- 20260701172823_88475465-e1ea-4010-b666-b63bf0301799.sql a créé
-- "bonsai-photos own read/write/update/delete" et
-- "poterie-photos own read/write/update/delete" SANS supprimer au préalable
-- les policies équivalentes posées par 20260620162342 (select/insert/update/
-- delete_own_bonsai_photos et ..._poterie_photos, cette dernière paire
-- insert re-créée par 20260627011053_fix_storage_insert_policies.sql).
--
-- Les deux jeux ont des prédicats strictement identiques
-- (auth.uid()::text = (storage.foldername(name))[1]) : aucune régression de
-- sécurité, mais chaque requête sur ces buckets évaluait deux policies
-- redondantes par opération. Le nettoyage du 05/07 (cleanup_duplicate_rls_
-- policies.sql) avait couvert les tables mais pas storage.objects — corrigé
-- ici. On garde les policies "...own read/write/update/delete" (nommage le
-- plus récent) et on supprime les 8 noms legacy.

DROP POLICY IF EXISTS "select_own_bonsai_photos" ON storage.objects;
DROP POLICY IF EXISTS "insert_own_bonsai_photos" ON storage.objects;
DROP POLICY IF EXISTS "update_own_bonsai_photos" ON storage.objects;
DROP POLICY IF EXISTS "delete_own_bonsai_photos" ON storage.objects;

DROP POLICY IF EXISTS "select_own_poterie_photos" ON storage.objects;
DROP POLICY IF EXISTS "insert_own_poterie_photos" ON storage.objects;
DROP POLICY IF EXISTS "update_own_poterie_photos" ON storage.objects;
DROP POLICY IF EXISTS "delete_own_poterie_photos" ON storage.objects;
