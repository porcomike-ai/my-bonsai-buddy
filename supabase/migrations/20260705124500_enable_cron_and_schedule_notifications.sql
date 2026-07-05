-- Enable pg_cron and pg_net extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule send-due-notifications to run every 5 minutes
-- The function will be called via HTTP POST using pg_net
SELECT cron.schedule(
  'send-due-notifications-every-5-minutes',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://xvvqffgchelmszpbdvde.supabase.co/functions/v1/send-due-notifications',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.service_role_key', true),
      'Content-Type', 'application/json'
    ),
    body := '{}'::jsonb
  );
  $$
);

-- Note: The service role key should be set as a secret:
-- supabase secrets set APP_SERVICE_ROLE_KEY="your_service_role_key"
