/**
 * src/lib/photo-cache.ts
 * Gestion résiliente du cache IndexedDB avec Fetch & Auto-Cache
 */

const DB_NAME = 'bonsai-photo-cache-db';
const STORE_NAME = 'photos';
const DB_VERSION = 1;

export type PhotoKeyInput = string | { storagePath?: string; url?: string; id?: string; poterieId?: string; photoUrl?: string } | null | undefined;

/**
 * Extrait une clé texte ou une URL exploitable à partir de n'importe quel objet Photo
 */
function normalizeCacheKey(input: PhotoKeyInput): { key: string | null; fetchUrl: string | null } {
  if (!input) return { key: null, fetchUrl: null };

  if (typeof input === 'string') {
    return { key: input, fetchUrl: input.startsWith('http') ? input : null };
  }

  if (typeof input === 'object') {
    const key = input.storagePath || input.url || input.photoUrl || input.id || input.poterieId || null;
    const fetchUrl = input.url || input.photoUrl || (input.storagePath && input.storagePath.startsWith('http') ? input.storagePath : null);
    return { key, fetchUrl };
  }

  return { key: null, fetchUrl: null };
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error("IndexedDB non disponible"));
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
 * Récupère un Blob. Si absent du cache, le télécharge via l'URL et le met en cache automatiquement.
 */
export async function getCachedPhotoBlob(input: PhotoKeyInput): Promise<Blob | null> {
  const { key, fetchUrl } = normalizeCacheKey(input);
  if (!key) return null;

  try {
    // 1. Tenter de lire dans IndexedDB
    const db = await openDB();
    const cachedBlob = await new Promise<Blob | null>((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        const res = request.result;
        if (res instanceof Blob) resolve(res);
        else if (res) resolve(new Blob([res]));
        else resolve(null);
      };
      request.onerror = () => resolve(null);
    });

    if (cachedBlob) {
      return cachedBlob;
    }

    // 2. Si absent du cache mais qu'on a une URL valide, on télécharge et met en cache
    const urlToFetch = fetchUrl || (key.startsWith('http') ? key : null);
    if (urlToFetch) {
      const response = await fetch(urlToFetch, { mode: 'cors' });
      if (response.ok) {
        const freshBlob = await response.blob();
        // Sauvegarde en tâche de fond
        setCachedPhotoBlob(key, freshBlob).catch(() => {});
        return freshBlob;
      }
    }

    return null;
  } catch (error) {
    console.warn(`[photo-cache] Erreur pour ${key} :`, error);
    return null;
  }
}

/**
 * Sauvegarde directe d'un Blob dans IndexedDB
 */
export async function setCachedPhotoBlob(input: PhotoKeyInput, blob: Blob): Promise<void> {
  const { key } = normalizeCacheKey(input);
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
 * Suppression d'une entrée spécifique
 */
export async function invalidateCachedPhoto(input: PhotoKeyInput): Promise<void> {
  const { key } = normalizeCacheKey(input);
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
 * Nettoyage complet
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
  } catch (error) {
    console.error('[photo-cache] Erreur lors de la réinitialisation :', error);
  }
}

/**
 * Taille estimée
 */
export async function getPhotoCacheSize(): Promise<number> {
  if (typeof navigator !== 'undefined' && 'storage' in navigator && 'estimate' in navigator.storage) {
    const { usage } = await navigator.storage.estimate();
    return usage || 0;
  }
  return 0;
}
