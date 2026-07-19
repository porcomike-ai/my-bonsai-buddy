import type { BonsaiRow, PhotoRow } from "@/integrations/supabase/domain-types";
import {
  db,
  fetchAllRows,
  rowToBonsai,
  bonsaiToRow,
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
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) throw new Error("Non authentifié");
  const { error } = await db.from("bonsais").upsert({ ...bonsaiToRow(b), user_id: user.id });
  if (error) throw error;
}

export async function deleteBonsai(id: string): Promise<void> {
  // Les photos sont supprimées en cascade en BDD ; on nettoie d'abord le Storage
  // pour éviter les fichiers orphelins.
  const { data: photos } = await db.from("photos").select("storage_path").eq("bonsai_id", id);
  if (photos && photos.length > 0) {
    const paths = (photos as PhotoRow[]).map((p) => p.storage_path);
    await db.storage.from(BONSAI_BUCKET).remove(paths);
  }
  // La suppression du bonsaï déclenche ON DELETE CASCADE sur photos / journal / rappels
  // et ON DELETE SET NULL sur evenements.
  const { error } = await db.from("bonsais").delete().eq("id", id);
  if (error) throw error;
}
