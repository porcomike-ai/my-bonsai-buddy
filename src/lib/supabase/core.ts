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
import type { Database } from "@/integrations/supabase/types";
import type {
  BonsaiRow,
  PoterieRow,
  PhotoRow,
} from "@/integrations/supabase/domain-types";

/** Payload d'upsert bonsaï (colonnes optionnelles — PostgREST n'écrit que les présentes). */
export type BonsaiUpsert = Database["public"]["Tables"]["bonsais"]["Insert"];
/** Payload d'upsert poterie. */
export type PoterieUpsert = Database["public"]["Tables"]["poteries"]["Insert"];

// Le `supabase` exporté est un Proxy paresseux qui efface le type générique
// de createClient<Database>(). Les types `*Row` importés ci-dessus servent
// à caster explicitement les résultats des requêtes.
//
// `from` reprend directement `typeof supabase.from` (au lieu d'un
// `(table: string) => ...` fait main) pour garder la vérification à la
// compilation des noms de table : `supabase` est déjà `createClient<Database>`
// (voir client.ts), donc `typeof supabase.from` porte déjà l'union littérale
// des noms de table réels. Un `db.from("bonssais")` (faute de frappe) est
// maintenant une erreur de compilation, plus une erreur silencieuse détectée
// seulement au runtime.
export const db = supabase as unknown as {
  auth: typeof supabase.auth;
  storage: typeof supabase.storage;
  from: typeof supabase.from;
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

  // Cas limite 29 février : dans une année non bissextile, acquisition.getDate()
  // vaut 29 mais aucun jour "28 < 29" ne devient jamais vrai à égalité de mois —
  // le bonsaï resterait perpétuellement compté comme "pas encore anniversaire"
  // le 28 février. On ramène l'anniversaire au 28 février dans ce cas précis,
  // convention la plus courante (l'autre étant le 1er mars).
  const acqMonth = acquisition.getMonth();
  const acqDate =
    acqMonth === 1 && acquisition.getDate() === 29 ? 28 : acquisition.getDate();

  const pasEncoreAnniversaire =
    today.getMonth() < acqMonth || (today.getMonth() === acqMonth && today.getDate() < acqDate);
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

export function bonsaiToRow(b: Partial<Bonsai>): BonsaiUpsert {
  // Construction progressive : les champs requis (nom/espece/style) sont
  // toujours fournis par les appelants d'upsert complets (saveBonsai).
  const row: Partial<BonsaiUpsert> = {};
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
  return row as BonsaiUpsert;
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

export function poterieToRow(p: Partial<Poterie>): PoterieUpsert {
  // Construction progressive : `nom` est toujours fourni par savePoterie.
  const row: Partial<PoterieUpsert> = {};
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
  return row as PoterieUpsert;
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

// currentUserId() est appelée à chaque écriture (savePhoto, saveJournal,
// saveRappel, saveEvenement, savePoterie, saveBonsai) et utilisait
// systématiquement db.auth.getUser(), qui fait un aller-retour réseau réel
// vers l'API Auth de Supabase (contrairement à getSession(), qui lit la
// session en mémoire/localStorage sans requête). Une simple création de
// bonsaï avec photo déclenchait donc 2 requêtes Auth séquentielles en plus
// des écritures elles-mêmes.
//
// On met en cache le dernier UID résolu. Le cache est tenu à jour par
// onAuthStateChange (connexion, déconnexion, refresh de token) pour ne
// jamais servir un UID d'une session expirée ou d'un autre utilisateur —
// et de toute façon, même un cache momentanément désynchronisé ne peut pas
// causer d'écriture sous une mauvaise identité : les policies RLS
// (`WITH CHECK (auth.uid() = user_id)`) revalident côté serveur la valeur
// réelle du JWT envoyé, indépendamment de ce que ce cache client calcule.
let cachedUserId: string | undefined;

// Optional chaining : certains mocks de test ne fournissent qu'un sous-
// ensemble de l'objet `auth` (ex. juste `getUser`), sans `onAuthStateChange`.
// Sans ce garde, l'appel plantait au chargement du module entier — avant même
// qu'un test ne s'exécute — dans tout fichier qui mocke
// "@/integrations/supabase/client" sans reproduire toute la surface de l'API
// GoTrueClient. En production, le vrai client Supabase a toujours cette
// méthode ; le cache reste alors simplement non tenu à jour en environnement
// de test minimalement mocké, ce qui est sans conséquence (currentUserId()
// retombe sur getUser() à chaque appel dans ce cas).
db.auth.onAuthStateChange?.((event, session) => {
  cachedUserId = event === "SIGNED_OUT" ? undefined : session?.user?.id;
});

export async function currentUserId(): Promise<string> {
  if (cachedUserId) return cachedUserId;
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) throw new Error("Non authentifié");
  cachedUserId = user.id;
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

/**
 * Suppression Storage stricte : lève si l'API échoue.
 * À utiliser quand la ligne BDD existe encore (rollback d'upload, remplacement
 * de photo) — l'appelant doit pouvoir annuler l'opération métier.
 */
export async function deleteStorageObject(bucket: string, path: string): Promise<void> {
  if (!path) return;
  const { error } = await db.storage.from(bucket).remove([path]);
  if (error) throw error;
}

/**
 * Nettoyage Storage best-effort après un DELETE BDD réussi.
 * Ne lève jamais : la BDD est déjà cohérente, un échec Storage ne doit pas
 * faire croire à l'utilisateur que la suppression a échoué. Les erreurs sont
 * loguées pour diagnostic (orphelins éventuels).
 */
export async function cleanupStoragePaths(bucket: string, paths: string[]): Promise<void> {
  const clean = paths.filter(Boolean);
  if (clean.length === 0) return;
  const { error } = await db.storage.from(bucket).remove(clean);
  if (error) {
    console.error(
      `[cleanupStoragePaths] échec suppressions bucket=${bucket} paths=${clean.length}:`,
      error,
    );
  }
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

/**
 * Résultat minimal attendu d'une page PostgREST.
 * On accepte un thenable large (PostgrestFilterBuilder) plutôt que d'exiger
 * exactement `PromiseLike<{ data: T[]; error }>` : le builder résout en
 * `PostgrestSingleResponse` (champs supplémentaires status/count) et les
 * `Row` générés divergent parfois des `*Row` domaine (ex. `style: string`
 * vs `BonsaiStyle`) — d'où un cast interne unique ici.
 */
type PageResult = { data: unknown; error: unknown };

export async function fetchAllRows<T>(
  runQuery: (from: number, to: number) => PromiseLike<PageResult>,
): Promise<T[]> {
  // Plafond de sécurité : à FETCH_CHUNK_SIZE lignes par page, 1000 itérations
  // représentent déjà largement plus de données qu'un usage normal de l'app
  // n'en produira jamais. Protège contre une boucle infinie si l'API venait
  // à toujours renvoyer une page pleine (bug côté backend).
  const MAX_ITERATIONS = 1000;
  const all: T[] = [];
  let from = 0;
  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const to = from + FETCH_CHUNK_SIZE - 1;
    const { data, error } = await runQuery(from, to);
    if (error) throw error;
    const rows = (data as T[] | null) ?? [];
    all.push(...rows);
    if (rows.length < FETCH_CHUNK_SIZE) return all;
    from += FETCH_CHUNK_SIZE;
  }
  throw new Error(
    `fetchAllRows: plafond de ${MAX_ITERATIONS} itérations atteint sans fin de pagination — abandon.`,
  );
}
