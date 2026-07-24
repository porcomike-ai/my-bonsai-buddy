/**
 * src/lib/photo-cache.ts
 * Gestion du cache IndexedDB pour les photos d'arbres et poteries.
 */

const DB_NAME = 'bonsai-photo-cache-db';
const STORE_NAME = 'photos';
const DB_VERSION = 1;

// Type flexible pour accepter aussi bien une string/URL qu'un objet photo Supabase
export type PhotoKeyInput = string | { storagePath?: string; url?: string; id?: string; poterieId?: string } | null | undefined;

/**
 * Normalise l'entrée utilisateur pour extraire une clé de cache unique sous forme de string.
 */
function normalizeCacheKey(input: PhotoKeyInput): string | null {
  if (!input) return null;
  if (typeof input === 'string') return input;
  if (typeof input === 'object') {
    return input.storagePath || input.url || input.id || input.poterieId || null;
  }
  return null;
}

/**
 * Initialise ou ouvre la base IndexedDB
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error("IndexedDB non disponible sur cet environnement"));
      return;
    }

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

/**
 * Récupère un Blob photo depuis le cache IndexedDB.
 * Compatible avec string ou objet { storagePath, poterieId, ... }
 */
export async function getCachedPhotoBlob(input: PhotoKeyInput): Promise<Blob | null> {
  const key = normalizeCacheKey(input);
  if (!key) return null;

  try {
    const db = await openDB();
    return new Promise<Blob | null>((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        const res = request.result;
        if (res instanceof Blob) {
          resolve(res);
        } else if (res) {
          resolve(new Blob([res]));
        } else {
          resolve(null);
        }
      };
      request.onerror = () => resolve(null);
    });
  } catch (error) {
    console.warn(`[photo-cache] Erreur de lecture pour ${key} :`, error);
    return null;
  }
}

/**
 * Enregistre un Blob associé à une photo dans IndexedDB
 */
export async function setCachedPhotoBlob(input: PhotoKeyInput, blob: Blob): Promise<void> {
  const key = normalizeCacheKey(input);
  if (!key || !blob) return;

  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(blob, key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn(`[photo-cache] Erreur d'écriture pour ${key} :`, error);
  }
}

/**
 * Invalide/supprime une photo spécifique du cache
 */
export async function invalidateCachedPhoto(input: PhotoKeyInput): Promise<void> {
  const key = normalizeCacheKey(input);
  if (!key) return;

  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn(`[photo-cache] Erreur de suppression pour ${key} :`, error);
  }
}

/**
 * Vide intégralement le cache IndexedDB et réinitialise la base
 */
export async function clearPhotoCache(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    // Nettoyage auxiliaire de l'API CacheStorage si présent
    if ('caches' in window) {
      const cacheKeys = await caches.keys();
      const photoKeys = cacheKeys.filter((k) => k.includes('bonsai') || k.includes('photo'));
      await Promise.all(photoKeys.map((k) => caches.delete(k)));
    }
  } catch (error) {
    console.error('[photo-cache] Erreur lors de la réinitialisation du cache :', error);
  }
}

/**
 * Récupère l'estimation de l'espace occupé par l'application
 */
export async function getPhotoCacheSize(): Promise<number> {
  if (typeof navigator !== 'undefined' && 'storage' in navigator && 'estimate' in navigator.storage) {
    const { usage } = await navigator.storage.estimate();
    return usage || 0;
  }
  return 0;
}
