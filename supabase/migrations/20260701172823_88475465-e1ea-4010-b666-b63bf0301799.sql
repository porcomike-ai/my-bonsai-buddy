
CREATE POLICY "bonsai-photos own read" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'bonsai-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "bonsai-photos own write" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'bonsai-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "bonsai-photos own update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'bonsai-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "bonsai-photos own delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'bonsai-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "poterie-photos own read" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'poterie-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "poterie-photos own write" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'poterie-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "poterie-photos own update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'poterie-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "poterie-photos own delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'poterie-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
