// ============================================================================
//  Couche données Supabase — remplace src/lib/db.ts (IndexedDB)
//
//  - Tables Postgres : bonsais, poteries, photos, journal_entries, rappels, evenements
//  - Photos binaires → Supabase Storage (buckets privés bonsai-photos, poterie-photos)
//  - Isolation par utilisateur (user_id DEFAULT auth.uid() + RLS)
//  - Auto-save : chaque appel persiste immédiatement, l'invalidation TanStack Query
//    rafraîchit l'UI.
//  - Schéma multi-appareils : toutes les lectures/écritures passent par le réseau,
//    sync au focus + subscriptions realtime.
// ============================================================================

import { supabase } from "@/integrations/supabase/client";
import type {
  BonsaiRow,
  PoterieRow,
  PhotoRow,
  JournalEntryRow,
  RappelRow,
  EvenementRow,
} from "@/integrations/supabase/domain-types";

// Le `supabase` exporté est un Proxy paresseux qui efface le type générique
// de createClient<Database>(). Les types `*Row` importés ci-dessus servent
// à caster explicitement les résultats des requêtes.
const db = supabase as unknown as {
  auth: typeof supabase.auth;
  storage: typeof supabase.storage;
  from: (table: string) => ReturnType<typeof supabase.from>;
};

// --- Types domaine (compatibles avec l'ancienne API db.ts) ---

export type { BonsaiStyle, BonsaiEtape, SoinType } from "@/integrations/supabase/domain-types";

export interface Bonsai {
  id: string;
  nom: string;
  espece: string;
  style: import("@/integrations/supabase/domain-types").BonsaiStyle;
  etape?: import("@/integrations/supabase/domain-types").BonsaiEtape;
  ageEstime?: number;
  dateAcquisition?: string;
  origine?: string;
  hauteurCm?: number;
  prixAchat?: number;
  valeurEstimee?: number;
  /** Storage path de la photo principale (ex. "{uid}/{bonsaiId}/{photoId}.jpg"). */
  photoPrincipale?: string;
  poterieId?: string;
  notes?: string;
  dansCollection?: boolean;
  favori?: boolean;
  createdAt: string;
}

export interface Photo {
  id: string;
  bonsaiId?: string;
  poterieId?: string;
  /** Chemin Storage. Ignoré à l'insert si un blob est fourni (généré côté serveur). */
  storagePath?: string;
  date: string;
  legende?: string;
}

export interface JournalEntry {
  id: string;
  bonsaiId: string;
  type: import("@/integrations/supabase/domain-types").SoinType;
  date: string;
  notes?: string;
  rappelId?: string;
}

export interface Rappel {
  id: string;
  bonsaiId: string;
  type: import("@/integrations/supabase/domain-types").SoinType;
  prochaineDate: string;
  intervalleJours?: number;
  notes?: string;
  actif: boolean;
}

export interface Poterie {
  id: string;
  nom: string;
  longueurCm?: number;
  largeurCm?: number;
  hauteurCm?: number;
  forme?: string;
  couleur?: string;
  matiere?: string;
  artisan?: string;
  origine?: string;
  prix?: number;
  /** Chemin Storage de la photo, ex. "{uid}/{poterieId}.jpg". */
  photoPath?: string;
  notes?: string;
  createdAt: string;
}

export interface Evenement {
  id: string;
  titre: string;
  description?: string;
  dateHeure: string;
  rappelMinutes?: number;
  notifiedAt?: string;
  bonsaiId?: string;
  createdAt: string;
}

export function uid() {
  return crypto.randomUUID();
}

/**
 * Calcule l'âge actuel d'un bonsaï à partir de son âge estimé à l'acquisition
 * et de la date d'acquisition.
 *
 * @param b - Bonsaï avec ageEstime (âge à l'acquisition) et dateAcquisition
 * @param today - Date de référence (défaut: aujourd'hui)
 * @returns L'âge actuel recalculé, ou ageEstime tel quel si pas de date d'acquisition
 */
export function ageActuel(
  b: Pick<Bonsai, "ageEstime" | "dateAcquisition">,
  today: Date = new Date(),
): number | undefined {
  if (b.ageEstime == null) return undefined;
  if (!b.dateAcquisition) return b.ageEstime;

  const acquisition = new Date(b.dateAcquisition);
  let annees = today.getFullYear() - acquisition.getFullYear();
  const pasEncoreAnniversaire =
    today.getMonth() < acquisition.getMonth() ||
    (today.getMonth() === acquisition.getMonth() && today.getDate() < acquisition.getDate());
  if (pasEncoreAnniversaire) annees -= 1;

  return b.ageEstime + Math.max(0, annees);
}

// --- Mappers snake_case ↔ camelCase ---

export function rowToBonsai(r: BonsaiRow): Bonsai {
  return {
    id: r.id,
    nom: r.nom,
    espece: r.espece,
    style: r.style,
    etape: r.etape ?? undefined,
    ageEstime: r.age_estime ?? undefined,
    dateAcquisition: r.date_acquisition ?? undefined,
    origine: r.origine ?? undefined,
    hauteurCm: r.hauteur_cm ?? undefined,
    prixAchat: r.prix_achat ?? undefined,
    valeurEstimee: r.valeur_estimee ?? undefined,
    photoPrincipale: r.photo_principale_path ?? undefined,
    poterieId: r.poterie_id ?? undefined,
    notes: r.notes ?? undefined,
    dansCollection: r.dans_collection,
    favori: r.favori,
    createdAt: r.created_at,
  };
}

export function bonsaiToRow(b: Partial<Bonsai>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (b.id !== undefined) row.id = b.id;
  if (b.nom !== undefined) row.nom = b.nom;
  if (b.espece !== undefined) row.espece = b.espece;
  if (b.style !== undefined) row.style = b.style;
  if (b.etape !== undefined) row.etape = b.etape;
  if (b.ageEstime !== undefined) row.age_estime = b.ageEstime;
  if (b.dateAcquisition !== undefined) row.date_acquisition = b.dateAcquisition;
  if (b.origine !== undefined) row.origine = b.origine;
  if (b.hauteurCm !== undefined) row.hauteur_cm = b.hauteurCm;
  if (b.prixAchat !== undefined) row.prix_achat = b.prixAchat;
  if (b.valeurEstimee !== undefined) row.valeur_estimee = b.valeurEstimee;
  if (b.photoPrincipale !== undefined) row.photo_principale_path = b.photoPrincipale;
  if (b.poterieId !== undefined) row.poterie_id = b.poterieId;
  if (b.notes !== undefined) row.notes = b.notes;
  if (b.dansCollection !== undefined) row.dans_collection = b.dansCollection;
  if (b.favori !== undefined) row.favori = b.favori;
  return row;
}

export function rowToPoterie(r: PoterieRow): Poterie {
  return {
    id: r.id,
    nom: r.nom,
    longueurCm: r.longueur_cm ?? undefined,
    largeurCm: r.largeur_cm ?? undefined,
    hauteurCm: r.hauteur_cm ?? undefined,
    forme: r.forme ?? undefined,
    couleur: r.couleur ?? undefined,
    matiere: r.matiere ?? undefined,
    artisan: r.artisan ?? undefined,
    origine: r.origine ?? undefined,
    prix: r.prix ?? undefined,
    photoPath: r.photo_path ?? undefined,
    notes: r.notes ?? undefined,
    createdAt: r.created_at,
  };
}

export function poterieToRow(p: Partial<Poterie>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (p.id !== undefined) row.id = p.id;
  if (p.nom !== undefined) row.nom = p.nom;
  if (p.longueurCm !== undefined) row.longueur_cm = p.longueurCm;
  if (p.largeurCm !== undefined) row.largeur_cm = p.largeurCm;
  if (p.hauteurCm !== undefined) row.hauteur_cm = p.hauteurCm;
  if (p.forme !== undefined) row.forme = p.forme;
  if (p.couleur !== undefined) row.couleur = p.couleur;
  if (p.matiere !== undefined) row.matiere = p.matiere;
  if (p.artisan !== undefined) row.artisan = p.artisan;
  if (p.origine !== undefined) row.origine = p.origine;
  if (p.prix !== undefined) row.prix = p.prix;
  if (p.photoPath !== undefined) row.photo_path = p.photoPath;
  if (p.notes !== undefined) row.notes = p.notes;
  return row;
}

export function rowToPhoto(r: PhotoRow): Photo {
  return {
    id: r.id,
    bonsaiId: r.bonsai_id ?? undefined,
    poterieId: r.poterie_id ?? undefined,
    storagePath: r.storage_path,
    date: r.date,
    legende: r.legende ?? undefined,
  };
}

export function rowToJournal(r: JournalEntryRow): JournalEntry {
  return {
    id: r.id,
    bonsaiId: r.bonsai_id,
    type: r.type,
    date: r.date,
    notes: r.notes ?? undefined,
    rappelId: r.rappel_id ?? undefined,
  };
}

export function rowToRappel(r: RappelRow): Rappel {
  return {
    id: r.id,
    bonsaiId: r.bonsai_id,
    type: r.type,
    prochaineDate: r.prochaine_date,
    intervalleJours: r.intervalle_jours ?? undefined,
    notes: r.notes ?? undefined,
    actif: r.actif,
  };
}

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

// --- Storage helpers ---

async function currentUserId(): Promise<string> {
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) throw new Error("Non authentifié");
  return user.id;
}

const BONSAI_BUCKET = "bonsai-photos";
const POTERIE_BUCKET = "poterie-photos";

function bonsaiPhotoPath(uidStr: string, bonsaiId: string, photoId: string): string {
  return `${uidStr}/${bonsaiId}/${photoId}.jpg`;
}

function poteriePhotoPath(uidStr: string, poterieId: string): string {
  return `${uidStr}/${poterieId}.jpg`;
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

// NOTE perf : ces fonctions reçoivent désormais `uidStr` déjà résolu par l'appelant
// au lieu de rappeler `currentUserId()` (qui déclenche un aller-retour réseau réel
// vers l'API Auth de Supabase via `db.auth.getUser()`). Avant ce correctif, une
// sauvegarde avec photo déclenchait DEUX appels `getUser()` séquentiels au lieu d'un.
async function uploadBonsaiPhoto(
  uidStr: string,
  photoId: string,
  bonsaiId: string,
  blob: Blob,
): Promise<string> {
  const path = bonsaiPhotoPath(uidStr, bonsaiId, photoId);
  const { error } = await db.storage
    .from(BONSAI_BUCKET)
    .upload(path, blob, { upsert: true, contentType: blob.type || "image/jpeg" });
  if (error) throw error;
  return path;
}

async function uploadPoteriePhoto(uidStr: string, poterieId: string, blob: Blob): Promise<string> {
  const path = poteriePhotoPath(uidStr, poterieId);
  const { error } = await db.storage
    .from(POTERIE_BUCKET)
    .upload(path, blob, { upsert: true, contentType: blob.type || "image/jpeg" });
  if (error) throw error;
  return path;
}

/** Upload d'une photo de galerie pour une poterie (chemin distinct du photo_path principal). */
async function uploadPoterieGalleryPhoto(
  uidStr: string,
  photoId: string,
  poterieId: string,
  blob: Blob,
): Promise<string> {
  const path = `${uidStr}/${poterieId}/${photoId}.jpg`;
  const { error } = await db.storage
    .from(POTERIE_BUCKET)
    .upload(path, blob, { upsert: true, contentType: blob.type || "image/jpeg" });
  if (error) throw error;
  return path;
}

async function deleteStorageObject(bucket: string, path: string): Promise<void> {
  await db.storage.from(bucket).remove([path]);
}

// --- Bonsais ---

export async function listBonsais(): Promise<Bonsai[]> {
  const { data, error } = await db
    .from("bonsais")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw error;
  return (data as BonsaiRow[]).map(rowToBonsai);
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

// --- Photos ---

export async function listPhotos(bonsaiId: string): Promise<Photo[]> {
  const { data, error } = await db
    .from("photos")
    .select("*")
    .eq("bonsai_id", bonsaiId)
    .order("date", { ascending: false })
    .limit(200);
  if (error) throw error;
  return (data as PhotoRow[]).map(rowToPhoto);
}

/**
 * Récupère toutes les photos de bonsaïs de l'utilisateur en une seule requête
 * (au lieu d'une requête par bonsaï). RLS filtre automatiquement sur le bon
 * utilisateur, pas besoin de préciser bonsai_id ici.
 */
export async function listAllPhotos(): Promise<Photo[]> {
  const { data, error } = await db
    .from("photos")
    .select("*")
    .not("bonsai_id", "is", null)
    .order("date", { ascending: false })
    .limit(2000);
  if (error) throw error;
  return (data as PhotoRow[]).map(rowToPhoto);
}

export async function getPhoto(id: string): Promise<Photo | undefined> {
  const { data, error } = await db.from("photos").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? rowToPhoto(data as PhotoRow) : undefined;
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

// --- Journal ---

export async function listJournal(bonsaiId?: string): Promise<JournalEntry[]> {
  let query = db.from("journal_entries").select("*");
  if (bonsaiId) query = query.eq("bonsai_id", bonsaiId);
  const { data, error } = await query.order("date", { ascending: false }).limit(500);
  if (error) throw error;
  return (data as JournalEntryRow[]).map(rowToJournal);
}

export async function saveJournal(e: JournalEntry): Promise<void> {
  const uidStr = await currentUserId();
  const { error } = await db.from("journal_entries").upsert({
    id: e.id,
    bonsai_id: e.bonsaiId,
    type: e.type,
    date: e.date,
    notes: e.notes ?? null,
    rappel_id: e.rappelId ?? null,
    user_id: uidStr,
  });
  if (error) throw error;
}

export async function deleteJournal(id: string): Promise<void> {
  const { error } = await db.from("journal_entries").delete().eq("id", id);
  if (error) throw error;
}

// --- Rappels ---

export async function listRappels(bonsaiId?: string): Promise<Rappel[]> {
  let query = db.from("rappels").select("*");
  if (bonsaiId) query = query.eq("bonsai_id", bonsaiId);
  const { data, error } = await query.order("prochaine_date", { ascending: true }).limit(200);
  if (error) throw error;
  return (data as RappelRow[]).map(rowToRappel);
}

export async function saveRappel(r: Rappel): Promise<void> {
  const uidStr = await currentUserId();
  const { error } = await db.from("rappels").upsert({
    id: r.id,
    bonsai_id: r.bonsaiId,
    type: r.type,
    prochaine_date: r.prochaineDate,
    intervalle_jours: r.intervalleJours ?? null,
    notes: r.notes ?? null,
    actif: r.actif,
    user_id: uidStr,
  });
  if (error) throw error;
}

export async function deleteRappel(id: string): Promise<void> {
  const { error } = await db.from("rappels").delete().eq("id", id);
  if (error) throw error;
}

// --- Poteries ---

export async function listPoteries(): Promise<Poterie[]> {
  const { data, error } = await db
    .from("poteries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw error;
  return (data as PoterieRow[]).map(rowToPoterie);
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
  const { error } = await db.from("poteries").delete().eq("id", id);
  if (error) throw error;
}

// --- Photos de poteries (galerie) ---

export async function listPoteriePhotos(poterieId: string): Promise<Photo[]> {
  const { data, error } = await db
    .from("photos")
    .select("*")
    .eq("poterie_id", poterieId)
    .order("date", { ascending: false })
    .limit(200);
  if (error) throw error;
  return (data as PhotoRow[]).map(rowToPhoto);
}

/** Sauvegarde une photo de galerie pour une poterie. Retourne le storage_path. */
export async function savePoterieGalleryPhoto(
  photo: Photo & { blob?: Blob },
): Promise<string> {
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


// --- Évènements ---

export async function listEvenements(): Promise<Evenement[]> {
  const { data, error } = await db
    .from("evenements")
    .select("*")
    .order("date_heure", { ascending: true })
    .limit(100);
  if (error) throw error;
  return (data as EvenementRow[]).map(rowToEvenement);
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

// ============================================================================
//  Sauvegarde locale (filet de sécurité) — format legacy v1
//
//  Format JSON compatible avec l'ancien BackupPayload de src/lib/backup.ts :
//  photos encodées en base64, pour pouvoir restaurer les anciennes sauvegardes
//  via le même fichier .json.gz.
// ============================================================================

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
