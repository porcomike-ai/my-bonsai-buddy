import type { JournalEntryRow } from "@/integrations/supabase/domain-types";
import { db, fetchAllRows, currentUserId, type JournalEntry } from "./core";

export function rowToJournal(r: JournalEntryRow): JournalEntry {
  return {
    id: r.id,
    bonsaiId: r.bonsai_id,
    type: r.type,
    date: r.date,
    notes: r.notes ?? undefined,
    rappelId: r.rappel_id ?? undefined,
  };
}

export async function listJournal(bonsaiId?: string): Promise<JournalEntry[]> {
  const rows = await fetchAllRows<JournalEntryRow>((from, to) => {
    let query = db.from("journal_entries").select("*");
    if (bonsaiId) query = query.eq("bonsai_id", bonsaiId);
    return query.order("date", { ascending: false }).range(from, to);
  });
  return rows.map(rowToJournal);
}

export async function saveJournal(e: JournalEntry): Promise<void> {
  const uidStr = await currentUserId();
  const { error } = await db.from("journal_entries").upsert({
    id: e.id,
    bonsai_id: e.bonsaiId,
    type: e.type,
    date: e.date,
    notes: e.notes ?? null,
    rappel_id: e.rappelId ?? null,
    user_id: uidStr,
  });
  if (error) throw error;
}

export async function deleteJournal(id: string): Promise<void> {
  const { error } = await db.from("journal_entries").delete().eq("id", id);
  if (error) throw error;
}
