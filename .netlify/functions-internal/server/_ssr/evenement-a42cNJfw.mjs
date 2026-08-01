import { V as currentUserId, W as db, U as fetchAllRows } from "./router-Ct750Zk_.mjs";
function rowToEvenement(r) {
  return {
    id: r.id,
    titre: r.titre,
    description: r.description ?? void 0,
    dateHeure: r.date_heure,
    rappelMinutes: r.rappel_minutes ?? void 0,
    notifiedAt: r.notified_at ?? void 0,
    bonsaiId: r.bonsai_id ?? void 0,
    createdAt: r.created_at
  };
}
async function listEvenements() {
  const rows = await fetchAllRows(
    (from, to) => db.from("evenements").select("*").order("date_heure", { ascending: true }).range(from, to)
  );
  return rows.map(rowToEvenement);
}
async function saveEvenement(e) {
  const uidStr = await currentUserId();
  const { error } = await db.from("evenements").upsert({
    id: e.id,
    titre: e.titre,
    description: e.description ?? null,
    date_heure: e.dateHeure,
    rappel_minutes: e.rappelMinutes ?? null,
    bonsai_id: e.bonsaiId ?? null,
    user_id: uidStr,
    ...e.notifiedAt ? { notified_at: e.notifiedAt } : {}
  });
  if (error) throw error;
}
async function updateEvenement(id, patch) {
  const { error } = await db.from("evenements").update({
    titre: patch.titre,
    description: patch.description ?? null,
    date_heure: patch.dateHeure,
    rappel_minutes: patch.rappelMinutes ?? null,
    bonsai_id: patch.bonsaiId ?? null
  }).eq("id", id);
  if (error) throw error;
}
async function deleteEvenement(id) {
  const { error } = await db.from("evenements").delete().eq("id", id);
  if (error) throw error;
}
export {
  deleteEvenement as d,
  listEvenements as l,
  saveEvenement as s,
  updateEvenement as u
};
