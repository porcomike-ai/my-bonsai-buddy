// ============================================================================
//  Sauvegarde locale (filet de sécurité) — format legacy v1
//
//  Format JSON compatible avec l'ancien BackupPayload de src/lib/backup.ts :
//  photos encodées en base64, pour pouvoir restaurer les anciennes sauvegardes
//  via le même fichier .json.gz.
// ============================================================================

import type { Bonsai, Photo, JournalEntry, Rappel, Poterie, Evenement } from "./core";
import { listBonsais, saveBonsai } from "./bonsai";
import { listAllPhotos, listAllPoteriePhotos, getPhotoBlob, savePhoto } from "./photo";
import { listJournal, saveJournal } from "./journal";
import { listRappels, saveRappel } from "./rappel";
import { listPoteries, savePoterie, savePoterieGalleryPhoto } from "./poterie";
import { getPoteriePhoto } from "./photo";
import { listEvenements, saveEvenement } from "./evenement";
import { resizeImageToBlob } from "../image-utils";

export interface SupabaseBackupPayload {
  version: 1;
  exportedAt: string;
  bonsais: Bonsai[];
  poteries: Array<
    Omit<Poterie, "photoPath"> & { photoBlobBase64?: string; photoBlobType?: string }
  >;
  photos: Array<Omit<Photo, "storagePath"> & { blobBase64: string; blobType: string }>;
  /** Photos de galerie de poterie (distinctes de la photo principale ci-dessus).
   * Optionnel : absent des sauvegardes créées avant l'ajout de ce champ. */
  poteriePhotos?: Array<Omit<Photo, "storagePath"> & { blobBase64: string; blobType: string }>;
  journal: JournalEntry[];
  rappels: Rappel[];
  evenements?: Evenement[];
}

/** Progression d'un export ou d'un import de sauvegarde locale. */
export interface BackupProgress {
  /** Étape en cours. "photos"/"poteries" sont les postes coûteux (Storage). */
  phase: "donnees" | "photos" | "poteries";
  current: number;
  total: number;
}

export interface BackupSummary {
  bonsais: number;
  photos: number;
  poteries: number;
  poteriePhotos: number;
  journal: number;
  rappels: number;
  evenements: number;
}

/**
 * Compte rapide des enregistrements concernés par une sauvegarde, sans
 * télécharger aucune photo (juste les métadonnées) — utilisé pour afficher un
 * récapitulatif avant de lancer l'export réel.
 */
export async function getBackupSummary(): Promise<BackupSummary> {
  const [bonsais, photos, poteries, poteriePhotos, journal, rappels, evenements] =
    await Promise.all([
      listBonsais(),
      listAllPhotos(),
      listPoteries(),
      listAllPoteriePhotos(),
      listJournal(),
      listRappels(),
      listEvenements(),
    ]);
  return {
    bonsais: bonsais.length,
    photos: photos.length,
    poteries: poteries.length,
    poteriePhotos: poteriePhotos.length,
    journal: journal.length,
    rappels: rappels.length,
    evenements: evenements.length,
  };
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

export interface ExportBackupOptions {
  onProgress?: (p: BackupProgress) => void;
  /**
   * Si vrai, chaque photo est redimensionnée (max 1280 px) et recompressée
   * en JPEG qualité 70 % avant d'être encodée en base64. Réduit sensiblement
   * la taille du fichier de sauvegarde, au prix d'une perte de qualité —
   * désactivé par défaut pour ne jamais dégrader les photos sans consentement
   * explicite.
   */
  compressPhotos?: boolean;
}

/**
 * Exporte toutes les données Supabase de l'utilisateur courant dans un payload
 * JSON compatible avec l'ancien format BackupPayload (version 1).
 * Les photos sont téléchargées depuis Storage puis encodées en base64.
 */
export async function exportSupabaseBackup(
  options: ExportBackupOptions = {},
): Promise<SupabaseBackupPayload> {
  const { onProgress, compressPhotos = false } = options;

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
  // Photos de galerie de poterie : distinctes de la photo principale de
  // chaque poterie (poteriesEnc ci-dessous), sans quoi elles ne sont jamais
  // sauvegardées ni restaurées.
  const allPoteriePhotos = await listAllPoteriePhotos();

  const total = allPhotos.length + allPoteriePhotos.length + poteries.length;
  let current = 0;
  onProgress?.({ phase: "donnees", current, total: total || 1 });

  const photosEnc = await Promise.all(
    allPhotos.map(async (p) => {
      const blob = await getPhotoBlob(p);
      const finalBlob = blob && compressPhotos ? await resizeImageToBlob(blob, 1280, 0.7) : blob;
      const { data, type } = finalBlob
        ? await blobToBase64(finalBlob)
        : { data: "", type: "application/octet-stream" };
      current += 1;
      onProgress?.({ phase: "photos", current, total: total || 1 });
      const { storagePath: _drop, ...rest } = p;
      void _drop;
      return { ...rest, blobBase64: data, blobType: type };
    }),
  );

  const poteriePhotosEnc = await Promise.all(
    allPoteriePhotos.map(async (p) => {
      const blob = await getPhotoBlob(p);
      const finalBlob = blob && compressPhotos ? await resizeImageToBlob(blob, 1280, 0.7) : blob;
      const { data, type } = finalBlob
        ? await blobToBase64(finalBlob)
        : { data: "", type: "application/octet-stream" };
      current += 1;
      onProgress?.({ phase: "photos", current, total: total || 1 });
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
      current += 1;
      onProgress?.({ phase: "poteries", current, total: total || 1 });
      if (!blob) return rest;
      const finalBlob = compressPhotos ? await resizeImageToBlob(blob, 1280, 0.7) : blob;
      const { data, type } = await blobToBase64(finalBlob);
      return { ...rest, photoBlobBase64: data, photoBlobType: type };
    }),
  );

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    bonsais,
    poteries: poteriesEnc,
    photos: photosEnc,
    poteriePhotos: poteriePhotosEnc,
    journal,
    rappels,
    evenements,
  };
}

export interface ImportBackupOptions {
  onProgress?: (p: BackupProgress) => void;
}

/**
 * Importe un payload JSON (format BackupPayload v1) dans Supabase.
 * Écrase les données existantes (upsert par id). Les photos en base64 sont
 * uploadées vers Storage.
 */
export async function importSupabaseBackup(
  payload: SupabaseBackupPayload,
  options: ImportBackupOptions = {},
): Promise<void> {
  if (payload.version !== 1) throw new Error("Version de sauvegarde non prise en charge");
  const { onProgress } = options;

  const total =
    payload.bonsais.length +
    payload.journal.length +
    payload.rappels.length +
    (payload.evenements?.length ?? 0) +
    payload.poteries.length +
    payload.photos.length +
    (payload.poteriePhotos?.length ?? 0);
  let current = 0;
  const step = (phase: BackupProgress["phase"]) => {
    current += 1;
    onProgress?.({ phase, current, total: total || 1 });
  };

  // --- Upsert des enregistrements non binaires ---
  // Note : `b.photoPrincipale` (core.ts) est un chemin Storage qui embarque
  // l'UID du propriétaire au moment de l'export (bonsaiPhotoPath). Il est
  // réécrit tel quel ici, sans recalcul — ce qui suppose une restauration
  // vers le MÊME compte/projet Supabase que celui qui a produit la
  // sauvegarde (le cas d'usage courant : réimport après purge locale,
  // changement d'appareil sur le même compte). Restaurer vers un compte
  // différent laisserait `photo_principale_path` pointer vers un chemin
  // qui n'existe plus dans le nouveau bucket.
  for (const b of payload.bonsais) {
    await saveBonsai(b);
    step("donnees");
  }
  for (const j of payload.journal) {
    await saveJournal(j);
    step("donnees");
  }
  for (const r of payload.rappels) {
    await saveRappel(r);
    step("donnees");
  }
  for (const e of payload.evenements ?? []) {
    await saveEvenement(e);
    step("donnees");
  }

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
    step("poteries");
  }

  // --- Photos (upload vers Storage) ---
  for (const p of payload.photos) {
    const { blobBase64, blobType, ...rest } = p as {
      blobBase64: string;
      blobType: string;
    } & Omit<Photo, "storagePath">;
    if (!blobBase64) {
      step("photos");
      continue;
    }
    const blob = base64ToBlob(blobBase64, blobType);
    await savePhoto({ ...rest, blob });
    step("photos");
  }

  // --- Photos de galerie de poterie (upload vers Storage) ---
  for (const p of payload.poteriePhotos ?? []) {
    const { blobBase64, blobType, ...rest } = p as {
      blobBase64: string;
      blobType: string;
    } & Omit<Photo, "storagePath">;
    if (!blobBase64) {
      step("photos");
      continue;
    }
    const blob = base64ToBlob(blobBase64, blobType);
    await savePoterieGalleryPhoto({ ...rest, blob });
    step("photos");
  }
}
