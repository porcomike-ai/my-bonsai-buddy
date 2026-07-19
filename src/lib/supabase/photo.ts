import type { PhotoRow } from "@/integrations/supabase/domain-types";
import {
  db,
  fetchAllRows,
  rowToPhoto,
  currentUserId,
  uploadBonsaiPhoto,
  deleteStorageObject,
  BONSAI_BUCKET,
  POTERIE_BUCKET,
  type Photo,
  type Poterie,
} from "./core";

export async function listPhotos(bonsaiId: string): Promise<Photo[]> {
  const rows = await fetchAllRows<PhotoRow>((from, to) =>
    db
      .from("photos")
      .select("*")
      .eq("bonsai_id", bonsaiId)
      .order("date", { ascending: false })
      .range(from, to),
  );
  return rows.map(rowToPhoto);
}

/**
 * Récupère toutes les photos de bonsaïs de l'utilisateur en une seule requête
 * (au lieu d'une requête par bonsaï). RLS filtre automatiquement sur le bon
 * utilisateur, pas besoin de préciser bonsai_id ici.
 */
export async function listAllPhotos(): Promise<Photo[]> {
  const rows = await fetchAllRows<PhotoRow>((from, to) =>
    db
      .from("photos")
      .select("*")
      .not("bonsai_id", "is", null)
      .order("date", { ascending: false })
      .range(from, to),
  );
  return rows.map(rowToPhoto);
}

export async function getPhoto(id: string): Promise<Photo | undefined> {
  const { data, error } = await db.from("photos").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? rowToPhoto(data as PhotoRow) : undefined;
}

/** Récupère le blob d'une photo (bonsaï ou poterie) depuis Storage. */
export async function getPhotoBlob(
  photo: Pick<Photo, "storagePath" | "poterieId">,
): Promise<Blob | undefined> {
  if (!photo.storagePath) return undefined;
  const bucket = photo.poterieId ? POTERIE_BUCKET : BONSAI_BUCKET;
  const { data, error } = await db.storage.from(bucket).download(photo.storagePath);
  if (error) {
    const msg = String(error.message ?? "").toLowerCase();
    if (msg.includes("not found") || msg.includes("does not exist")) return undefined;
    throw error;
  }
  return data ?? undefined;
}

/** Récupère le blob de la photo d'une poterie depuis Storage. */
export async function getPoteriePhoto(
  poterie: Pick<Poterie, "photoPath">,
): Promise<Blob | undefined> {
  if (!poterie.photoPath) return undefined;
  const { data, error } = await db.storage.from(POTERIE_BUCKET).download(poterie.photoPath);
  if (error) {
    const msg = String(error.message ?? "").toLowerCase();
    if (msg.includes("not found") || msg.includes("does not exist")) return undefined;
    throw error;
  }
  return data ?? undefined;
}

/** Sauvegarde une photo de bonsaï : upload Storage + insert ligne. Retourne le storage_path. */
export async function savePhoto(photo: Photo & { blob?: Blob }): Promise<string> {
  if (!photo.blob) throw new Error("savePhoto: blob manquant");
  if (!photo.bonsaiId) throw new Error("savePhoto: bonsaiId manquant");
  const uidStr = await currentUserId();
  const path = await uploadBonsaiPhoto(uidStr, photo.id, photo.bonsaiId, photo.blob);
  const { error } = await db.from("photos").upsert({
    id: photo.id,
    bonsai_id: photo.bonsaiId,
    storage_path: path,
    date: photo.date,
    legende: photo.legende ?? null,
    user_id: uidStr,
  });
  if (error) {
    await deleteStorageObject(BONSAI_BUCKET, path);
    throw error;
  }
  return path;
}

export async function deletePhoto(id: string): Promise<void> {
  const photo = await getPhoto(id);
  if (!photo) return;
  if (photo.storagePath) {
    const bucket = photo.poterieId ? POTERIE_BUCKET : BONSAI_BUCKET;
    await deleteStorageObject(bucket, photo.storagePath);
  }
  const { error } = await db.from("photos").delete().eq("id", id);
  if (error) throw error;
}

/** Met à jour uniquement la légende d'une photo (sans réuploader le blob). */
export async function updatePhotoLegende(id: string, legende: string | null): Promise<void> {
  const { error } = await db.from("photos").update({ legende }).eq("id", id);
  if (error) throw error;
}

/** Met à jour uniquement la date d'une photo (sans réuploader le blob). */
export async function updatePhotoDate(id: string, date: string): Promise<void> {
  const { error } = await db.from("photos").update({ date }).eq("id", id);
  if (error) throw error;
}
