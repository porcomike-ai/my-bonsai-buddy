-- CORRECTIF (v2) : la migration précédente 20260706090000 était basée sur une
-- hypothèse fausse et faisait pointer le cron vers qsxlpnrqlyrfrwtmmqxf.
-- Le projet Supabase réellement utilisé en production est xvvqffgchelmszpbdvde
-- (celui du dashboard https://supabase.com/dashboard/project/xvvqffgchelmszpbdvde).
--
-- Cette migration réaffirme l'état correct : elle fonctionne que la migration
-- 20260706090000 ait été appliquée ou non (idempotente).
--
-- Si tu avais déjà supprimé/renommé le fichier 20260706090000, tu peux ignorer
-- cette précision et simplement exécuter ce fichier.

DO $$
BEGIN
  PERFORM cron.unschedule('send-due-notifications-every-5-minutes');
EXCEPTION WHEN OTHERS THEN
  -- Le job n'existe pas (jamais créé, ou déjà désinscrit) : on ignore.
  NULL;
END $$;

SELECT cron.schedule(
  'send-due-notifications-every-5-minutes',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://xvvqffgchelmszpbdvde.supabase.co/functions/v1/send-due-notifications',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'service_role_key'),
      'Content-Type', 'application/json'
    ),
    body := '{}'::jsonb
  );
  $$
);

-- Rappel : le secret Vault 'service_role_key' doit exister DANS CE PROJET
-- (xvvqffgchelmszpbdvde), pas dans qsxlpnrqlyrfrwtmmqxf. Pour vérifier :
-- select * from vault.decrypted_secrets where name = 'service_role_key';
-- Pour le créer si absent :
-- select vault.create_secret('TA_VRAIE_CLE_SERVICE_ROLE', 'service_role_key');
