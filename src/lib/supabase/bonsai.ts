import type { BonsaiRow, PhotoRow } from "@/integrations/supabase/domain-types";
import {
  db,
  fetchAllRows,
  rowToBonsai,
  bonsaiToRow,
  currentUserId,
  BONSAI_BUCKET,
  type Bonsai,
} from "./core";

export async function listBonsais(): Promise<Bonsai[]> {
  const rows = await fetchAllRows<BonsaiRow>((from, to) =>
    db
      .from("bonsais")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to),
  );
  return rows.map(rowToBonsai);
}

export async function getBonsai(id: string): Promise<Bonsai | undefined> {
  const { data, error } = await db.from("bonsais").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? rowToBonsai(data as BonsaiRow) : undefined;
}

export async function saveBonsai(b: Bonsai): Promise<void> {
  const uidStr = await currentUserId();
  const { error } = await db.from("bonsais").upsert({ ...bonsaiToRow(b), user_id: uidStr });
  if (error) throw error;
}

export async function deleteBonsai(id: string): Promise<void> {
  // Récupérer les chemins Storage AVANT toute suppression (même principe que
  // deletePoterie). Si le DELETE BDD échoue ensuite, on n'a pas encore touché
  // au Storage : mieux vaut des fichiers orphelins récupérables qu'une base
  // pointant vers des fichiers déjà effacés.
  const { data: photos } = await db.from("photos").select("storage_path").eq("bonsai_id", id);
  const paths =
    (photos as PhotoRow[] | null)?.map((p) => p.storage_path).filter(Boolean) ?? [];

  // La suppression du bonsaï déclenche ON DELETE CASCADE sur photos / journal /
  // rappels et ON DELETE SET NULL sur evenements.
  const { error } = await db.from("bonsais").delete().eq("id", id);
  if (error) throw error;

  // Nettoyer le Storage seulement après le succès de la suppression BDD.
  if (paths.length > 0) {
    await db.storage.from(BONSAI_BUCKET).remove(paths);
  }
}
