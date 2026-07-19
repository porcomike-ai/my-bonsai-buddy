// ============================================================================
//  Sauvegarde locale (filet de sécurité) — format legacy v1
//
//  Format JSON compatible avec l'ancien BackupPayload de src/lib/backup.ts :
//  photos encodées en base64, pour pouvoir restaurer les anciennes sauvegardes
//  via le même fichier .json.gz.
// ============================================================================

import type { Bonsai, Photo, JournalEntry, Rappel, Poterie, Evenement } from "./core";
import { listBonsais, saveBonsai } from "./bonsai";
import { listAllPhotos, getPhotoBlob, savePhoto } from "./photo";
import { listJournal, saveJournal } from "./journal";
import { listRappels, saveRappel } from "./rappel";
import { listPoteries, savePoterie, getPoteriePhoto } from "./poterie";
import { listEvenements, saveEvenement } from "./evenement";

export interface SupabaseBackupPayload {
  version: 1;
  exportedAt: string;
  bonsais: Bonsai[];
  poteries: Array<
    Omit<Poterie, "photoPath"> & { photoBlobBase64?: string; photoBlobType?: string }
  >;
  photos: Array<Omit<Photo, "storagePath"> & { blobBase64: string; blobType: string }>;
  journal: JournalEntry[];
  rappels: Rappel[];
  evenements?: Evenement[];
}

export async function blobToBase64(blob: Blob): Promise<{ data: string; type: string }> {
  const buf = new Uint8Array(await blob.arrayBuffer());
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < buf.length; i += chunk) {
    bin += String.fromCharCode(...buf.subarray(i, i + chunk));
  }
  return { data: btoa(bin), type: blob.type || "application/octet-stream" };
}

export function base64ToBlob(data: string, type: string): Blob {
  const bin = atob(data);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return new Blob([buf], { type });
}

/**
 * Exporte toutes les données Supabase de l'utilisateur courant dans un payload
 * JSON compatible avec l'ancien format BackupPayload (version 1).
 * Les photos sont téléchargées depuis Storage puis encodées en base64.
 */
export async function exportSupabaseBackup(): Promise<SupabaseBackupPayload> {
  const [bonsais, poteries, journal, rappels, evenements] = await Promise.all([
    listBonsais(),
    listPoteries(),
    listJournal(),
    listRappels(),
    listEvenements(),
  ]);

  // Récupère toutes les photos de bonsaïs de l'utilisateur en une seule
  // requête (au lieu d'une requête par bonsaï) — même fonction que celle
  // déjà utilisée par la page Statistiques, pour éviter le pattern N+1 sur
  // le chemin le plus coûteux (export complet de la collection).
  const allPhotos = await listAllPhotos();

  const photosEnc = await Promise.all(
    allPhotos.map(async (p) => {
      const blob = await getPhotoBlob(p);
      const { data, type } = blob
        ? await blobToBase64(blob)
        : { data: "", type: "application/octet-stream" };
      const { storagePath: _drop, ...rest } = p;
      void _drop;
      return { ...rest, blobBase64: data, blobType: type };
    }),
  );

  const poteriesEnc = await Promise.all(
    poteries.map(async (p) => {
      const { photoPath: _drop, ...rest } = p;
      void _drop;
      const blob = await getPoteriePhoto(p);
      if (!blob) return rest;
      const { data, type } = await blobToBase64(blob);
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

/**
 * Importe un payload JSON (format BackupPayload v1) dans Supabase.
 * Écrase les données existantes (upsert par id). Les photos en base64 sont
 * uploadées vers Storage.
 */
export async function importSupabaseBackup(payload: SupabaseBackupPayload): Promise<void> {
  if (payload.version !== 1) throw new Error("Version de sauvegarde non prise en charge");

  // --- Upsert des enregistrements non binaires ---
  for (const b of payload.bonsais) await saveBonsai(b);
  for (const j of payload.journal) await saveJournal(j);
  for (const r of payload.rappels) await saveRappel(r);
  for (const e of payload.evenements ?? []) await saveEvenement(e);

  // --- Poteries (avec photo éventuelle) ---
  for (const p of payload.poteries) {
    const { photoBlobBase64, photoBlobType, ...rest } = p as {
      photoBlobBase64?: string;
      photoBlobType?: string;
    } & Omit<Poterie, "photoPath">;
    const poterie: Poterie & { photoBlob?: Blob } = { ...rest };
    if (photoBlobBase64) {
      poterie.photoBlob = base64ToBlob(photoBlobBase64, photoBlobType || "image/jpeg");
    }
    await savePoterie(poterie);
  }

  // --- Photos (upload vers Storage) ---
  for (const p of payload.photos) {
    const { blobBase64, blobType, ...rest } = p as {
      blobBase64: string;
      blobType: string;
    } & Omit<Photo, "storagePath">;
    if (!blobBase64) continue;
    const blob = base64ToBlob(blobBase64, blobType);
    await savePhoto({ ...rest, blob });
  }
}
