
-- Allow photos to belong to either a bonsai or a poterie
ALTER TABLE public.photos ALTER COLUMN bonsai_id DROP NOT NULL;

ALTER TABLE public.photos
  ADD COLUMN IF NOT EXISTS poterie_id UUID REFERENCES public.poteries(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS photos_poterie_id_idx ON public.photos(poterie_id);

-- Exactly one of bonsai_id / poterie_id must be set
ALTER TABLE public.photos
  ADD CONSTRAINT photos_owner_check
  CHECK ((bonsai_id IS NOT NULL) <> (poterie_id IS NOT NULL));
