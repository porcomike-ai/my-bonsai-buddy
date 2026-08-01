import type { BonsaiRow, PhotoRow } from "@/integrations/supabase/domain-types";
import {
  db,
  fetchAllRows,
  rowToBonsai,
  bonsaiToRow,
  currentUserId,
  BONSAI_BUCKET,
  cleanupStoragePaths,
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
  // 1) Lire les chemins Storage AVANT le DELETE (CASCADE efface photos).
  // 2) DELETE BDD d'abord → source de vérité cohérente pour l'UI.
  // 3) Cleanup Storage best-effort : jamais de throw (sinon message "échec"
  //    alors que le bonsaï a déjà disparu de la collection).
  const { data: photos } = await db.from("photos").select("storage_path").eq("bonsai_id", id);
  const paths =
    (photos as PhotoRow[] | null)?.map((p) => p.storage_path).filter(Boolean) ?? [];

  // ON DELETE CASCADE : photos / journal / rappels ; SET NULL : evenements.
  const { error } = await db.from("bonsais").delete().eq("id", id);
  if (error) throw error;

  await cleanupStoragePaths(BONSAI_BUCKET, paths);
}
