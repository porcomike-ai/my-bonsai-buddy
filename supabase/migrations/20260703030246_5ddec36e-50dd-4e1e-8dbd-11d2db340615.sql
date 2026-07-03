-- Drop puis re-add pour garantir ON DELETE cascade / set null
ALTER TABLE public.photos DROP CONSTRAINT IF EXISTS photos_bonsai_id_fkey;
ALTER TABLE public.journal_entries DROP CONSTRAINT IF EXISTS journal_entries_bonsai_id_fkey;
ALTER TABLE public.rappels DROP CONSTRAINT IF EXISTS rappels_bonsai_id_fkey;
ALTER TABLE public.evenements DROP CONSTRAINT IF EXISTS evenements_bonsai_id_fkey;
ALTER TABLE public.bonsais DROP CONSTRAINT IF EXISTS bonsais_poterie_id_fkey;

DELETE FROM public.photos WHERE bonsai_id NOT IN (SELECT id FROM public.bonsais);
DELETE FROM public.journal_entries WHERE bonsai_id NOT IN (SELECT id FROM public.bonsais);
DELETE FROM public.rappels WHERE bonsai_id NOT IN (SELECT id FROM public.bonsais);
UPDATE public.evenements SET bonsai_id = NULL WHERE bonsai_id IS NOT NULL AND bonsai_id NOT IN (SELECT id FROM public.bonsais);
UPDATE public.bonsais SET poterie_id = NULL WHERE poterie_id IS NOT NULL AND poterie_id NOT IN (SELECT id FROM public.poteries);

ALTER TABLE public.photos ADD CONSTRAINT photos_bonsai_id_fkey
  FOREIGN KEY (bonsai_id) REFERENCES public.bonsais(id) ON DELETE CASCADE;
ALTER TABLE public.journal_entries ADD CONSTRAINT journal_entries_bonsai_id_fkey
  FOREIGN KEY (bonsai_id) REFERENCES public.bonsais(id) ON DELETE CASCADE;
ALTER TABLE public.rappels ADD CONSTRAINT rappels_bonsai_id_fkey
  FOREIGN KEY (bonsai_id) REFERENCES public.bonsais(id) ON DELETE CASCADE;
ALTER TABLE public.evenements ADD CONSTRAINT evenements_bonsai_id_fkey
  FOREIGN KEY (bonsai_id) REFERENCES public.bonsais(id) ON DELETE SET NULL;
ALTER TABLE public.bonsais ADD CONSTRAINT bonsais_poterie_id_fkey
  FOREIGN KEY (poterie_id) REFERENCES public.poteries(id) ON DELETE SET NULL;