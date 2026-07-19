import type { EvenementRow } from "@/integrations/supabase/domain-types";
import { db, fetchAllRows, currentUserId, type Evenement } from "./core";

function rowToEvenement(r: EvenementRow): Evenement {
  return {
    id: r.id,
    titre: r.titre,
    description: r.description ?? undefined,
    dateHeure: r.date_heure,
    rappelMinutes: r.rappel_minutes ?? undefined,
    notifiedAt: r.notified_at ?? undefined,
    bonsaiId: r.bonsai_id ?? undefined,
    createdAt: r.created_at,
  };
}

export async function listEvenements(): Promise<Evenement[]> {
  const rows = await fetchAllRows<EvenementRow>((from, to) =>
    db
      .from("evenements")
      .select("*")
      .order("date_heure", { ascending: true })
      .range(from, to),
  );
  return rows.map(rowToEvenement);
}

export async function saveEvenement(e: Evenement): Promise<void> {
  const uidStr = await currentUserId();
  const { error } = await db.from("evenements").upsert({
    id: e.id,
    titre: e.titre,
    description: e.description ?? null,
    date_heure: e.dateHeure,
    rappel_minutes: e.rappelMinutes ?? null,
    notified_at: e.notifiedAt ?? null,
    bonsai_id: e.bonsaiId ?? null,
    user_id: uidStr,
  });
  if (error) throw error;
}

export async function deleteEvenement(id: string): Promise<void> {
  const { error } = await db.from("evenements").delete().eq("id", id);
  if (error) throw error;
}
