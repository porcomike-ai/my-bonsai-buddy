/*
# Fix mutable search_path on set_updated_at function

## Contexte
La fonction `set_updated_at()` (trigger BEFORE UPDATE sur bonsais) a un `search_path`
mutable (config `proconfig` est NULL). Cela la rend vulnérable à une attaque par
détournement de search_path : si un attaquant place un objet malveillant plus tôt
dans le chemin de recherche, il pourrait s'exécuter au lieu de la fonction attendue.

## Changement
Définit `search_path = public` sur la fonction. Comme la fonction ne fait référence
qu'à `NEW` (une variable triggrée) et n'appelle aucune fonction externe, `public` suffit.

## Notes
- RLS reste activée sur `bonsais` (aucun changement).
- Le trigger `trg_bonsais_updated_at` continue de fonctionner identiquement.
- Idempotent : `CREATE OR REPLACE FUNCTION` peut être rejoué sans erreur.
*/

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
