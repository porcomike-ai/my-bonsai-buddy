import { getPhotoBlob, type Photo } from "./supabase-data";

/**
 * Cache des blobs de photos, à deux niveaux :
 *
 * 1. Cache mémoire (Map) — dédoublonne les requêtes concurrentes pour la
 *    même photo (deux composants qui l'affichent en même temps ne
 *    déclenchent qu'un seul vrai téléchargement), et sert instantanément
 *    pendant la session en cours. Limité à MAX_CACHE_ENTRIES (FIFO simple)
 *    pour éviter une croissance mémoire illimitée.
 *
 * 2. Persistance IndexedDB — survit aux rechargements de page et aux
 *    changements de session (contrairement au cache mémoire seul). Toute
 *    interaction avec IndexedDB est protégée par un try/catch : si
 *    IndexedDB est indisponible (rendu serveur, navigation privée sur
 *    certains navigateurs, environnement de test jsdom), le cache mémoire
 *    reste pleinement fonctionnel, simplement non persistant — aucune
 *    erreur ne remonte à l'appelant dans ce cas.
 */

const DB_NAME = "bonsai-photo-cache-db";
const STORE_NAME = "photos";
const DB_VERSION = 1;
const MAX_CACHE_ENTRIES = 300;

const memoryCache = new Map<string, Promise<Blob | undefined>>();

function rememberKey(key: string) {
  const value = memoryCache.get(key);
  if (value) {
    memoryCache.delete(key);
    memoryCache.set(key, value);
  }
  while (memoryCache.size > MAX_CACHE_ENTRIES) {
    const oldestKey = memoryCache.keys().next().value;
    if (oldestKey === undefined) break;
    memoryCache.delete(oldestKey);
  }
}

// --- Persistance IndexedDB ---

let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (typeof window === "undefined" || !("indexedDB" in window)) {
    return Promise.reject(new Error("IndexedDB non disponible"));
  }
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  return dbPromise;
}

async function readFromIndexedDB(key: string): Promise<Blob | undefined> {
  try {
    const db = await openDB();
    return await new Promise<Blob | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const request = tx.objectStore(STORE_NAME).get(key);
      request.onsuccess = () =>
        resolve(request.result instanceof Blob ? request.result : undefined);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return undefined;
  }
}

async function writeToIndexedDB(key: string, blob: Blob): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const request = tx.objectStore(STORE_NAME).put(blob, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    /* Pas grave : le cache mémoire reste fonctionnel sans persistance disque. */
  }
}

async function deleteFromIndexedDB(key: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const request = tx.objectStore(STORE_NAME).delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    /* Rien à faire si IndexedDB est indisponible. */
  }
}

async function clearIndexedDB(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const request = tx.objectStore(STORE_NAME).clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    /* Rien à faire si IndexedDB est indisponible. */
  }
}

/**
 * Récupère le blob d'une photo, en passant par (dans l'ordre) : le cache
 * mémoire, puis IndexedDB, puis enfin le vrai téléchargement réseau/Storage.
 * Le résultat téléchargé est ensuite écrit dans IndexedDB pour les
 * prochaines fois (y compris lors d'une session future).
 */
export function getCachedPhotoBlob(
  photo: Pick<Photo, "storagePath" | "poterieId">,
): Promise<Blob | undefined> {
  const key = photo.storagePath;
  if (!key) return Promise.resolve(undefined);

  const existing = memoryCache.get(key);
  if (existing) {
    rememberKey(key);
    return existing;
  }

  const promise = (async () => {
    const cached = await readFromIndexedDB(key);
    if (cached) return cached;

    const blob = await getPhotoBlob(photo).catch(() => undefined);
    if (blob) {
      // Fire-and-forget : n'attend pas l'écriture disque pour afficher la photo.
      void writeToIndexedDB(key, blob);
    } else {
      // Échec réseau : on ne garde pas cet échec en cache mémoire, sinon tout
      // appel futur pour la même photo recevrait immédiatement le même
      // `undefined` pour le reste de la session, sans jamais retenter. On ne
      // supprime que si personne n'a déjà remplacé l'entrée entre-temps
      // (retry manuel via setCachedPhotoBlob, invalidation concurrente).
      if (memoryCache.get(key) === promise) memoryCache.delete(key);
    }
    return blob;
  })();

  memoryCache.set(key, promise);
  rememberKey(key);
  return promise;
}

/** Enregistre directement un blob déjà connu dans le cache (mémoire + disque). */
export async function setCachedPhotoBlob(storagePath: string, blob: Blob): Promise<void> {
  if (!storagePath) return;
  memoryCache.set(storagePath, Promise.resolve(blob));
  rememberKey(storagePath);
  await writeToIndexedDB(storagePath, blob);
}

/** Retire une photo du cache (ex. après suppression ou remplacement). */
export function invalidateCachedPhoto(storagePath: string | undefined): void {
  if (!storagePath) return;
  memoryCache.delete(storagePath);
  void deleteFromIndexedDB(storagePath);
}

/** Vide entièrement le cache (mémoire + IndexedDB). */
export async function clearPhotoCache(): Promise<void> {
  memoryCache.clear();
  await clearIndexedDB();
}

/** Estimation de l'espace de stockage utilisé par le navigateur (diagnostic). */
export async function getPhotoCacheSize(): Promise<number> {
  if (typeof navigator !== "undefined" && "storage" in navigator && "estimate" in navigator.storage) {
    const { usage } = await navigator.storage.estimate();
    return usage ?? 0;
  }
  return 0;
}
