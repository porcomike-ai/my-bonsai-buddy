-- Add notified_at field to rappels table
-- This prevents one-time reminders (without intervalle_jours) from being re-notified every 5 minutes

ALTER TABLE rappels ADD COLUMN IF NOT EXISTS notified_at timestamptz;

-- Create index for efficient querying of non-notified reminders
CREATE INDEX IF NOT EXISTS idx_rappels_notified_at ON rappels(notified_at);
