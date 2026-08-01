import { V as currentUserId, W as db, U as fetchAllRows } from "./router-Ct750Zk_.mjs";
function rowToRappel(r) {
  return {
    id: r.id,
    bonsaiId: r.bonsai_id,
    type: r.type,
    prochaineDate: r.prochaine_date,
    intervalleJours: r.intervalle_jours ?? void 0,
    notes: r.notes ?? void 0,
    actif: r.actif,
    // Lecture seule : géré exclusivement par l'Edge Function
    // send-due-notifications, jamais écrit depuis l'app (voir saveRappel
    // ci-dessous, qui omet volontairement ce champ de l'upsert pour ne pas
    // écraser la valeur posée par le backend à chaque sauvegarde côté client).
    notifiedAt: r.notified_at ?? void 0
  };
}
async function listRappels(bonsaiId) {
  const rows = await fetchAllRows((from, to) => {
    let query = db.from("rappels").select("*");
    if (bonsaiId) query = query.eq("bonsai_id", bonsaiId);
    return query.order("prochaine_date", { ascending: true }).range(from, to);
  });
  return rows.map(rowToRappel);
}
async function saveRappel(r) {
  const uidStr = await currentUserId();
  const { error } = await db.from("rappels").upsert({
    id: r.id,
    bonsai_id: r.bonsaiId,
    type: r.type,
    prochaine_date: r.prochaineDate,
    intervalle_jours: r.intervalleJours ?? null,
    notes: r.notes ?? null,
    actif: r.actif,
    user_id: uidStr
  });
  if (error) throw error;
}
async function deleteRappel(id) {
  const { error } = await db.from("rappels").delete().eq("id", id);
  if (error) throw error;
}
export {
  deleteRappel as d,
  listRappels as l,
  saveRappel as s
};
