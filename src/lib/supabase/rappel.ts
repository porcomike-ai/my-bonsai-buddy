import type { RappelRow } from "@/integrations/supabase/domain-types";
import { db, fetchAllRows, currentUserId, type Rappel } from "./core";

export function rowToRappel(r: RappelRow): Rappel {
  return {
    id: r.id,
    bonsaiId: r.bonsai_id,
    type: r.type,
    prochaineDate: r.prochaine_date,
    intervalleJours: r.intervalle_jours ?? undefined,
    notes: r.notes ?? undefined,
    actif: r.actif,
  };
}

export async function listRappels(bonsaiId?: string): Promise<Rappel[]> {
  const rows = await fetchAllRows<RappelRow>((from, to) => {
    let query = db.from("rappels").select("*");
    if (bonsaiId) query = query.eq("bonsai_id", bonsaiId);
    return query.order("prochaine_date", { ascending: true }).range(from, to);
  });
  return rows.map(rowToRappel);
}

export async function saveRappel(r: Rappel): Promise<void> {
  const uidStr = await currentUserId();
  const { error } = await db.from("rappels").upsert({
    id: r.id,
    bonsai_id: r.bonsaiId,
    type: r.type,
    prochaine_date: r.prochaineDate,
    intervalle_jours: r.intervalleJours ?? null,
    notes: r.notes ?? null,
    actif: r.actif,
    user_id: uidStr,
  });
  if (error) throw error;
}

export async function deleteRappel(id: string): Promise<void> {
  const { error } = await db.from("rappels").delete().eq("id", id);
  if (error) throw error;
}
