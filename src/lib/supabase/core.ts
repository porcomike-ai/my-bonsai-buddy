// ============================================================================
//  Couche données Supabase — module « core »
//
//  Regroupe ce qui est partagé par tous les autres modules de src/lib/supabase/ :
//  - le client Supabase typé
//  - les interfaces domaine (Bonsai, Photo, JournalEntry, Rappel, Poterie, Evenement)
//  - les mappers snake_case ↔ camelCase
//  - les helpers Storage (buckets, chemins, upload/suppression)
//  - `fetchAllRows`, la pagination exhaustive utilisée par tous les `list*`
//
//  Ce fichier ne doit PAS être importé directement par le reste de l'app —
//  passer par `@/lib/supabase-data`, qui réexporte tout publiquement.
// ============================================================================

import { supabase } from "@/integrations/supabase/client";
import type {
  BonsaiRow,
  PoterieRow,
  PhotoRow,
} from "@/integrations/supabase/domain-types";

// Le `supabase` exporté est un Proxy paresseux qui efface le type générique
// de createClient<Database>(). Les types `*Row` importés ci-dessus servent
// à caster explicitement les résultats des requêtes.
export const db = supabase as unknown as {
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
  notifiedAt?: string;
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

// --- Storage helpers ---

export async function currentUserId(): Promise<string> {
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) throw new Error("Non authentifié");
  return user.id;
}

export const BONSAI_BUCKET = "bonsai-photos";
export const POTERIE_BUCKET = "poterie-photos";

function bonsaiPhotoPath(uidStr: string, bonsaiId: string, photoId: string): string {
  return `${uidStr}/${bonsaiId}/${photoId}.jpg`;
}

function poteriePhotoPath(uidStr: string, poterieId: string): string {
  return `${uidStr}/${poterieId}.jpg`;
}

// NOTE perf : ces fonctions reçoivent `uidStr` déjà résolu par l'appelant au
// lieu de rappeler `currentUserId()` (qui déclenche un aller-retour réseau
// réel vers l'API Auth de Supabase via `db.auth.getUser()`). Avant ce
// correctif, une sauvegarde avec photo déclenchait DEUX appels `getUser()`
// séquentiels au lieu d'un.
export async function uploadBonsaiPhoto(
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

export async function uploadPoteriePhoto(
  uidStr: string,
  poterieId: string,
  blob: Blob,
): Promise<string> {
  const path = poteriePhotoPath(uidStr, poterieId);
  const { error } = await db.storage
    .from(POTERIE_BUCKET)
    .upload(path, blob, { upsert: true, contentType: blob.type || "image/jpeg" });
  if (error) throw error;
  return path;
}

/** Upload d'une photo de galerie pour une poterie (chemin distinct du photo_path principal). */
export async function uploadPoterieGalleryPhoto(
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

export async function deleteStorageObject(bucket: string, path: string): Promise<void> {
  await db.storage.from(bucket).remove([path]);
}

// --- Récupération exhaustive (sans plafond arbitraire) ---
//
// Supabase/PostgREST plafonne chaque requête à un nombre de lignes fixe.
// Utiliser un simple `.limit(N)` codé en dur revient à tronquer silencieusement
// les données au-delà de N, sans que rien ne prévienne l'utilisateur (voir audit).
// `fetchAllRows` boucle sur `.range()` par lots jusqu'à épuisement des résultats,
// pour garantir que toutes les lignes de l'utilisateur sont bien récupérées, quelle
// que soit la taille réelle de sa collection.
export const FETCH_CHUNK_SIZE = 1000;

export async function fetchAllRows<T>(
  runQuery: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: unknown }>,
): Promise<T[]> {
  const all: T[] = [];
  let from = 0;
  for (;;) {
    const to = from + FETCH_CHUNK_SIZE - 1;
    const { data, error } = await runQuery(from, to);
    if (error) throw error;
    const rows = data ?? [];
    all.push(...rows);
    if (rows.length < FETCH_CHUNK_SIZE) break;
    from += FETCH_CHUNK_SIZE;
  }
  return all;
}
