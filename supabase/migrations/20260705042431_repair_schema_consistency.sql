/*
# Réparation : cohérence du schéma après la reconstruction du 1er juillet

## Pourquoi cette migration
La migration `20260701172758_...` a recréé les tables `bonsais`, `poteries`,
`photos`, `journal_entries`, `rappels` et `evenements` avec un simple
`CREATE TABLE` (sans `IF NOT EXISTS`), alors que la toute première migration
(`20260620162342_...`) les créait déjà. Conséquence : rejouer l'historique
complet sur une base neuve échoue à la 4ᵉ migration ("relation already
exists"). On ne peut pas corriger une migration déjà appliquée, mais on peut
ajouter une étape de réparation qui remet n'importe quelle base — ancienne ou
neuve — dans le même état connu.

Au passage, cette reconstruction avait aussi retypé certaines colonnes de
date en `date` (sans heure) au lieu de `timestamptz` (avec heure). Comme
l'application compare des rappels et évènements à l'heure précise
(`isBefore`, `isAfter`), on remet ces colonnes en `timestamptz`.

## Idempotence
Chaque instruction ci-dessous peut être rejouée sans erreur, y compris si
elle a déjà été appliquée :
- `ALTER COLUMN ... TYPE timestamptz` sur une colonne déjà en `timestamptz`
  ne fait rien (cast vers le même type).
- `ENABLE ROW LEVEL SECURITY` sur une table où c'est déjà actif ne fait rien.
*/

-- 1. Uniformiser les colonnes de date qui doivent conserver une heure précise.
ALTER TABLE public.rappels
  ALTER COLUMN prochaine_date TYPE timestamptz USING prochaine_date::timestamptz;

ALTER TABLE public.journal_entries
  ALTER COLUMN date TYPE timestamptz USING date::timestamptz;

ALTER TABLE public.photos
  ALTER COLUMN date TYPE timestamptz USING date::timestamptz;

-- 2. S'assurer que RLS est bien active sur les 6 tables, quelle que soit
--    la migration qui les a créées à l'origine.
ALTER TABLE public.bonsais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poteries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rappels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evenements ENABLE ROW LEVEL SECURITY;
