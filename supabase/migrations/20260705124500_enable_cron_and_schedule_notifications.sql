-- Enable pg_cron and pg_net extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Enable pgcrypto for Vault support
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Schedule send-due-notifications to run every 5 minutes
-- The function will be called via HTTP POST using pg_net
-- Service role key is retrieved from Supabase Vault
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

-- IMPORTANT: You must manually create the Vault secret with your service role key
-- Run this in the Supabase SQL Editor:
-- select vault.create_secret('YOUR_ACTUAL_SERVICE_ROLE_KEY_HERE', 'service_role_key');
--
-- Do NOT commit your actual service role key to version control.
