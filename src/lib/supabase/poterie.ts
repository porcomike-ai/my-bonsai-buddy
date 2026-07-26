import type { PoterieRow, PhotoRow } from "@/integrations/supabase/domain-types";
import {
  db,
  fetchAllRows,
  rowToPoterie,
  poterieToRow,
  rowToPhoto,
  currentUserId,
  uploadPoteriePhoto,
  uploadPoterieGalleryPhoto,
  deleteStorageObject,
  POTERIE_BUCKET,
  type Poterie,
  type Photo,
} from "./core";

export async function listPoteries(): Promise<Poterie[]> {
  const rows = await fetchAllRows<PoterieRow>((from, to) =>
    db
      .from("poteries")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to),
  );
  return rows.map(rowToPoterie);
}

export async function getPoterie(id: string): Promise<Poterie | undefined> {
  const { data, error } = await db.from("poteries").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? rowToPoterie(data as PoterieRow) : undefined;
}

/** Sauvegarde une poterie. Si `photoBlob` est fourni, l'upload vers Storage. */
export async function savePoterie(p: Poterie & { photoBlob?: Blob }): Promise<void> {
  const uidStr = await currentUserId();
  let photoPath = p.photoPath;
  if (p.photoBlob) {
    photoPath = await uploadPoteriePhoto(uidStr, p.id, p.photoBlob);
  }
  const row = poterieToRow({ ...p, photoPath });
  const { error } = await db.from("poteries").upsert({ ...row, user_id: uidStr });
  if (error) {
    if (p.photoBlob && photoPath) await deleteStorageObject(POTERIE_BUCKET, photoPath);
    throw error;
  }
}

export async function deletePoterie(id: string): Promise<void> {
  const poterie = await getPoterie(id);
  if (poterie?.photoPath) await deleteStorageObject(POTERIE_BUCKET, poterie.photoPath);
  // Supprime aussi tous les fichiers de la galerie de la poterie.
  const { data: photos } = await db.from("photos").select("storage_path").eq("poterie_id", id);
  if (photos && photos.length > 0) {
    const paths = (photos as PhotoRow[]).map((p) => p.storage_path);
    await db.storage.from(POTERIE_BUCKET).remove(paths);
  }
  // bonsais.poterie_id n'a pas de contrainte FK/CASCADE en base (colonne uuid
  // nue, voir create_bonsai_studio_schema.sql) : sans ce nettoyage explicite,
  // tout bonsaï encore "planté" dans cette poterie garderait un poterie_id
  // pointant vers une ligne supprimée. Fait avant le delete plutôt qu'après
  // pour ne pas laisser de fenêtre où la poterie est déjà partie mais les
  // bonsaïs pas encore mis à jour si une erreur survient entre les deux.
  const { error: unlinkError } = await db
    .from("bonsais")
    .update({ poterie_id: null })
    .eq("poterie_id", id);
  if (unlinkError) throw unlinkError;
  const { error } = await db.from("poteries").delete().eq("id", id);
  if (error) throw error;
}

// --- Photos de poteries (galerie) ---

export async function listPoteriePhotos(poterieId: string): Promise<Photo[]> {
  const rows = await fetchAllRows<PhotoRow>((from, to) =>
    db
      .from("photos")
      .select("*")
      .eq("poterie_id", poterieId)
      .order("date", { ascending: false })
      .range(from, to),
  );
  return rows.map(rowToPhoto);
}

/** Sauvegarde une photo de galerie pour une poterie. Retourne le storage_path. */
export async function savePoterieGalleryPhoto(photo: Photo & { blob?: Blob }): Promise<string> {
  if (!photo.blob) throw new Error("savePoterieGalleryPhoto: blob manquant");
  if (!photo.poterieId) throw new Error("savePoterieGalleryPhoto: poterieId manquant");
  const uidStr = await currentUserId();
  const path = await uploadPoterieGalleryPhoto(uidStr, photo.id, photo.poterieId, photo.blob);
  const { error } = await db.from("photos").upsert({
    id: photo.id,
    poterie_id: photo.poterieId,
    bonsai_id: null,
    storage_path: path,
    date: photo.date,
    legende: photo.legende ?? null,
    user_id: uidStr,
  });
  if (error) {
    await deleteStorageObject(POTERIE_BUCKET, path);
    throw error;
  }
  return path;
}
