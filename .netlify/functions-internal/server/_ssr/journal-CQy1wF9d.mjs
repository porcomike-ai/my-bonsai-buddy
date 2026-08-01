import { V as currentUserId, W as db, U as fetchAllRows } from "./router-Ct750Zk_.mjs";
function rowToJournal(r) {
  return {
    id: r.id,
    bonsaiId: r.bonsai_id,
    type: r.type,
    date: r.date,
    notes: r.notes ?? void 0,
    rappelId: r.rappel_id ?? void 0
  };
}
async function listJournal(bonsaiId) {
  const rows = await fetchAllRows((from, to) => {
    let query = db.from("journal_entries").select("*");
    if (bonsaiId) query = query.eq("bonsai_id", bonsaiId);
    return query.order("date", { ascending: false }).range(from, to);
  });
  return rows.map(rowToJournal);
}
async function saveJournal(e) {
  const uidStr = await currentUserId();
  const { error } = await db.from("journal_entries").upsert({
    id: e.id,
    bonsai_id: e.bonsaiId,
    type: e.type,
    date: e.date,
    notes: e.notes ?? null,
    rappel_id: e.rappelId ?? null,
    user_id: uidStr
  });
  if (error) throw error;
}
async function deleteJournal(id) {
  const { error } = await db.from("journal_entries").delete().eq("id", id);
  if (error) throw error;
}
export {
  deleteJournal as d,
  listJournal as l,
  saveJournal as s
};
