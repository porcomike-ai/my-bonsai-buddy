import { getDB, type Bonsai, type Photo, type Poterie, type JournalEntry, type Rappel, type Evenement } from "./db";

export interface BackupPayload {
  version: 1;
  exportedAt: string;
  bonsais: Bonsai[];
  poteries: Array<Omit<Poterie, "photoBlob"> & { photoBlobBase64?: string; photoBlobType?: string }>;
  photos: Array<Omit<Photo, "blob"> & { blobBase64: string; blobType: string }>;
  journal: JournalEntry[];
  rappels: Rappel[];
  evenements?: Evenement[];
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

export async function buildBackup(): Promise<BackupPayload> {
  const db = await getDB();
  const [bonsais, poteries, photos, journal, rappels, evenements] = await Promise.all([
    db.getAll("bonsais"),
    db.getAll("poteries"),
    db.getAll("photos"),
    db.getAll("journal"),
    db.getAll("rappels"),
    db.getAll("evenements").catch(() => [] as Evenement[]),
  ]);

  const photosEnc = await Promise.all(
    photos.map(async (p) => {
      const { data, type } = await blobToBase64(p.blob);
      const { blob, ...rest } = p;
      return { ...rest, blobBase64: data, blobType: type };
    }),
  );

  const poteriesEnc = await Promise.all(
    poteries.map(async (p) => {
      const { photoBlob, ...rest } = p;
      if (!photoBlob) return rest;
      const { data, type } = await blobToBase64(photoBlob);
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
  const tx = db.transaction(["bonsais", "poteries", "photos", "journal", "rappels"], "readwrite");
  await Promise.all([
    tx.objectStore("bonsais").clear(),
    tx.objectStore("poteries").clear(),
    tx.objectStore("photos").clear(),
    tx.objectStore("journal").clear(),
    tx.objectStore("rappels").clear(),
  ]);
  for (const b of payload.bonsais) await tx.objectStore("bonsais").put(b);
  for (const p of payload.poteries) {
    const { photoBlobBase64, photoBlobType, ...rest } = p as any;
    const obj: Poterie = photoBlobBase64
      ? { ...rest, photoBlob: base64ToBlob(photoBlobBase64, photoBlobType || "image/jpeg") }
      : rest;
    await tx.objectStore("poteries").put(obj);
  }
  for (const p of payload.photos) {
    const { blobBase64, blobType, ...rest } = p as any;
    await tx.objectStore("photos").put({ ...rest, blob: base64ToBlob(blobBase64, blobType) });
  }
  for (const j of payload.journal) await tx.objectStore("journal").put(j);
  for (const r of payload.rappels) await tx.objectStore("rappels").put(r);
  await tx.done;
}
