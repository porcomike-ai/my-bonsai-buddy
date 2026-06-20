import {
  getDB,
  type Bonsai,
  type Photo,
  type Poterie,
  type JournalEntry,
  type Rappel,
  type Evenement,
} from "./db";

// ============================================================================
//  Formats de sauvegarde
// ============================================================================
//
//  v1 (legacy) : un seul JSON gzippé contenant TOUTES les photos en base64.
//      → +33 % de surcoût (encodage), tout est ré-uploadé à chaque sauvegarde.
//
//  v2 (actuel) : un manifest JSON gzippé + chaque photo stockée en BINAIRE
//      séparé sur Drive. Les sauvegardes ultérieures comparent les empreintes
//      SHA-256 et ne ré-uploadent que les photos modifiées ou nouvelles.
// ============================================================================

export interface BackupPayload {
  version: 1;
  exportedAt: string;
  bonsais: Bonsai[];
  poteries: Array<
    Omit<Poterie, "photoBlob"> & { photoBlobBase64?: string; photoBlobType?: string }
  >;
  photos: Array<Omit<Photo, "blob"> & { blobBase64: string; blobType: string }>;
  journal: JournalEntry[];
  rappels: Rappel[];
  evenements?: Evenement[];
}

// --- v2 ---

export interface ManifestPhotoEntry {
  id: string;
  bonsaiId: string;
  date: string;
  legende?: string;
  hash: string;
  mime: string;
  size: number;
  driveFileId: string;
}

export interface ManifestPoteriePhoto {
  poterieId: string;
  hash: string;
  mime: string;
  size: number;
  driveFileId: string;
}

export interface DriveManifest {
  version: 2;
  exportedAt: string;
  bonsais: Bonsai[];
  poteries: Array<Omit<Poterie, "photoBlob">>;
  journal: JournalEntry[];
  rappels: Rappel[];
  evenements: Evenement[];
  photos: ManifestPhotoEntry[];
  poteriePhotos: ManifestPoteriePhoto[];
}

export interface LocalPhoto {
  id: string;
  bonsaiId: string;
  date: string;
  legende?: string;
  blob: Blob;
  hash: string;
}
export interface LocalPoteriePhoto {
  poterieId: string;
  blob: Blob;
  hash: string;
}

export interface LocalSnapshot {
  bonsais: Bonsai[];
  poteries: Array<Omit<Poterie, "photoBlob">>;
  journal: JournalEntry[];
  rappels: Rappel[];
  evenements: Evenement[];
  photos: LocalPhoto[];
  poteriePhotos: LocalPoteriePhoto[];
}

// ============================================================================
//  Utilitaires
// ============================================================================

async function sha256Hex(blob: Blob): Promise<string> {
  const buf = await blob.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function blobToBase64(blob: Blob): Promise<{ data: string; type: string }> {
  const buf = new Uint8Array(await blob.arrayBuffer());
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < buf.length; i += chunk) {
    bin += String.fromCharCode(...buf.subarray(i, i + chunk));
  }
  return { data: btoa(bin), type: blob.type || "application/octet-stream" };
}

function base64ToBlob(data: string, type: string): Blob {
  const bin = atob(data);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return new Blob([buf], { type });
}

/**
 * Recompresse une image (Blob) en JPEG : max `maxSide` px sur le grand côté,
 * qualité `quality` (0-1). Renvoie le blob d'origine si la version recompressée
 * n'est pas plus petite, ou en cas d'erreur (ex. fichier non image).
 */
export async function recompressImage(blob: Blob, maxSide = 1280, quality = 0.7): Promise<Blob> {
  if (typeof document === "undefined") return blob;
  if (!blob.type.startsWith("image/")) return blob;
  try {
    const url = URL.createObjectURL(blob);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = () => reject(new Error("decode"));
        i.src = url;
      });
      let w = img.width;
      let h = img.height;
      if (w > maxSide || h > maxSide) {
        const r = Math.min(maxSide / w, maxSide / h);
        w = Math.round(w * r);
        h = Math.round(h * r);
      }
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return blob;
      ctx.drawImage(img, 0, 0, w, h);
      const out = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/jpeg", quality),
      );
      if (!out) return blob;
      return out.size < blob.size ? out : blob;
    } finally {
      URL.revokeObjectURL(url);
    }
  } catch {
    return blob;
  }
}

// ============================================================================
//  Construction d'un snapshot local (v2)
// ============================================================================

export interface BuildSnapshotOptions {
  recompress?: boolean;
  maxSide?: number;
  quality?: number;
}

export async function buildSnapshot(opts: BuildSnapshotOptions = {}): Promise<LocalSnapshot> {
  const { recompress = true, maxSide = 1280, quality = 0.7 } = opts;
  const db = await getDB();
  const [bonsais, poteries, photos, journal, rappels, evenements] = await Promise.all([
    db.getAll("bonsais"),
    db.getAll("poteries"),
    db.getAll("photos"),
    db.getAll("journal"),
    db.getAll("rappels"),
    db.getAll("evenements").catch(() => [] as Evenement[]),
  ]);

  const prep = async (b: Blob) => (recompress ? await recompressImage(b, maxSide, quality) : b);

  const photosLocal: LocalPhoto[] = await Promise.all(
    photos.map(async (p) => {
      const blob = await prep(p.blob);
      const hash = await sha256Hex(blob);
      return { id: p.id, bonsaiId: p.bonsaiId, date: p.date, legende: p.legende, blob, hash };
    }),
  );

  const poteriesMeta: Array<Omit<Poterie, "photoBlob">> = poteries.map((p) => {
    const { photoBlob: _drop, ...rest } = p;
    return rest;
  });

  const poteriePhotos: LocalPoteriePhoto[] = [];
  for (const p of poteries) {
    if (!p.photoBlob) continue;
    const blob = await prep(p.photoBlob);
    const hash = await sha256Hex(blob);
    poteriePhotos.push({ poterieId: p.id, blob, hash });
  }

  return {
    bonsais,
    poteries: poteriesMeta,
    journal,
    rappels,
    evenements,
    photos: photosLocal,
    poteriePhotos,
  };
}

// ============================================================================
//  Application d'un manifest (v2) — restauration via callback de téléchargement
// ============================================================================

export async function applyManifest(
  manifest: DriveManifest,
  fetchBinary: (driveFileId: string) => Promise<Blob>,
  onProgress?: (done: number, total: number) => void,
): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(
    ["bonsais", "poteries", "photos", "journal", "rappels", "evenements"],
    "readwrite",
  );
  await Promise.all([
    tx.objectStore("bonsais").clear(),
    tx.objectStore("poteries").clear(),
    tx.objectStore("photos").clear(),
    tx.objectStore("journal").clear(),
    tx.objectStore("rappels").clear(),
    tx.objectStore("evenements").clear(),
  ]);
  for (const b of manifest.bonsais) await tx.objectStore("bonsais").put(b);
  for (const p of manifest.poteries) await tx.objectStore("poteries").put(p as Poterie);
  for (const j of manifest.journal) await tx.objectStore("journal").put(j);
  for (const r of manifest.rappels) await tx.objectStore("rappels").put(r);
  for (const e of manifest.evenements ?? []) await tx.objectStore("evenements").put(e);
  await tx.done;

  const total = manifest.photos.length + manifest.poteriePhotos.length;
  let done = 0;

  for (const ph of manifest.photos) {
    const blob = await fetchBinary(ph.driveFileId);
    await db.put("photos", {
      id: ph.id,
      bonsaiId: ph.bonsaiId,
      date: ph.date,
      legende: ph.legende,
      blob: blob.type ? blob : new Blob([blob], { type: ph.mime }),
    });
    onProgress?.(++done, total);
  }

  for (const pp of manifest.poteriePhotos) {
    const blob = await fetchBinary(pp.driveFileId);
    const existing = await db.get("poteries", pp.poterieId);
    if (existing) {
      await db.put("poteries", {
        ...existing,
        photoBlob: blob.type ? blob : new Blob([blob], { type: pp.mime }),
      });
    }
    onProgress?.(++done, total);
  }
}

// ============================================================================
//  Legacy v1 — utilisé uniquement pour restaurer d'anciennes sauvegardes
// ============================================================================

export async function buildBackup(opts: BuildSnapshotOptions = {}): Promise<BackupPayload> {
  // Conservé pour compat — non utilisé par le flux Drive depuis v2.
  const { recompress = true, maxSide = 1280, quality = 0.7 } = opts;
  const db = await getDB();
  const [bonsais, poteries, photos, journal, rappels, evenements] = await Promise.all([
    db.getAll("bonsais"),
    db.getAll("poteries"),
    db.getAll("photos"),
    db.getAll("journal"),
    db.getAll("rappels"),
    db.getAll("evenements").catch(() => [] as Evenement[]),
  ]);
  const prep = async (b: Blob) => (recompress ? await recompressImage(b, maxSide, quality) : b);
  const photosEnc = await Promise.all(
    photos.map(async (p) => {
      const optimized = await prep(p.blob);
      const { data, type } = await blobToBase64(optimized);
      const { blob: _b, ...rest } = p;
      return { ...rest, blobBase64: data, blobType: type };
    }),
  );
  const poteriesEnc = await Promise.all(
    poteries.map(async (p) => {
      const { photoBlob, ...rest } = p;
      if (!photoBlob) return rest;
      const optimized = await prep(photoBlob);
      const { data, type } = await blobToBase64(optimized);
      return { ...rest, photoBlobBase64: data, photoBlobType: type };
    }),
  );
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    bonsais,
    poteries: poteriesEnc,
    photos: photosEnc,
    journal,
    rappels,
    evenements,
  };
}

export async function restoreBackup(payload: BackupPayload): Promise<void> {
  if (payload.version !== 1) throw new Error("Version de sauvegarde non prise en charge");
  const db = await getDB();
  const tx = db.transaction(
    ["bonsais", "poteries", "photos", "journal", "rappels", "evenements"],
    "readwrite",
  );
  await Promise.all([
    tx.objectStore("bonsais").clear(),
    tx.objectStore("poteries").clear(),
    tx.objectStore("photos").clear(),
    tx.objectStore("journal").clear(),
    tx.objectStore("rappels").clear(),
    tx.objectStore("evenements").clear(),
  ]);
  for (const b of payload.bonsais) await tx.objectStore("bonsais").put(b);
  for (const p of payload.poteries) {
    const { photoBlobBase64, photoBlobType, ...rest } = p as {
      photoBlobBase64?: string;
      photoBlobType?: string;
    } & Omit<Poterie, "photoBlob">;
    const obj: Poterie = photoBlobBase64
      ? { ...rest, photoBlob: base64ToBlob(photoBlobBase64, photoBlobType || "image/jpeg") }
      : rest;
    await tx.objectStore("poteries").put(obj);
  }
  for (const p of payload.photos) {
    const { blobBase64, blobType, ...rest } = p as { blobBase64: string; blobType: string } & Omit<
      Photo,
      "blob"
    >;
    await tx.objectStore("photos").put({ ...rest, blob: base64ToBlob(blobBase64, blobType) });
  }
  for (const j of payload.journal) await tx.objectStore("journal").put(j);
  for (const r of payload.rappels) await tx.objectStore("rappels").put(r);
  for (const e of payload.evenements ?? []) await tx.objectStore("evenements").put(e);
  await tx.done;
}

// ============================================================================
//  Optimisation des photos stockées localement
// ============================================================================

export async function optimizeStoredImages(
  maxSide = 1280,
  quality = 0.7,
): Promise<{ count: number; saved: number }> {
  const db = await getDB();
  const photos = await db.getAll("photos");
  const poteries = await db.getAll("poteries");
  let count = 0;
  let saved = 0;
  for (const p of photos) {
    const before = p.blob.size;
    const after = await recompressImage(p.blob, maxSide, quality);
    if (after.size < before) {
      saved += before - after.size;
      count++;
      await db.put("photos", { ...p, blob: after });
    }
  }
  for (const p of poteries) {
    if (!p.photoBlob) continue;
    const before = p.photoBlob.size;
    const after = await recompressImage(p.photoBlob, maxSide, quality);
    if (after.size < before) {
      saved += before - after.size;
      count++;
      await db.put("poteries", { ...p, photoBlob: after });
    }
  }
  return { count, saved };
}
