-- Recrée les policies INSERT Storage avec WITH CHECK correct
DROP POLICY IF EXISTS "insert_own_bonsai_photos" ON storage.objects;
DROP POLICY IF EXISTS "insert_own_poterie_photos" ON storage.objects;

CREATE POLICY "insert_own_bonsai_photos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'bonsai-photos'
    AND (storage.foldername(name))[1] = (auth.uid())::text
  );

CREATE POLICY "insert_own_poterie_photos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'poterie-photos'
    AND (storage.foldername(name))[1] = (auth.uid())::text
  );
