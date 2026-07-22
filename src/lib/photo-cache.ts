/**
 * src/lib/photo-cache.ts
 * Gestion du cache IndexedDB et CacheStorage pour les photos d'arbres et poteries.
 */

const DB_NAME = 'bonsai-photo-cache-db';
const STORE_NAME = 'photos';
const DB_VERSION = 1;

/**
 * Ouvre ou initialise la base IndexedDB
 */
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
 * Récupère un Blob photo depuis le cache local (IndexedDB / CacheStorage)
 */
export async function getCachedPhotoBlob(urlOrKey: string): Promise<Blob | null> {
  if (!urlOrKey) return null;

  try {
    // 1. Essai via CacheStorage API
    if ('caches' in window) {
      const cache = await caches.open('bonsai-photos-v1');
      const response = await cache.match(urlOrKey);
      if (response) {
        return await response.blob();
      }
    }

    // 2. Essai via IndexedDB
    const db = await openDB();
    const blob = await new Promise<Blob | null>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(urlOrKey);

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
      request.onerror = () => reject(request.error);
    });

    return blob;
  } catch (error) {
    console.warn(`[photo-cache] Impossible de récupérer la photo ${urlOrKey} :`, error);
    return null;
  }
}

/**
 * Invalide ou supprime une photo spécifique du cache
 */
export async function invalidateCachedPhoto(urlOrKey: string): Promise<void> {
  if (!urlOrKey) return;

  try {
    // 1. Suppression dans CacheStorage
    if ('caches' in window) {
      const cache = await caches.open('bonsai-photos-v1');
      await cache.delete(urlOrKey);
    }

    // 2. Suppression dans IndexedDB
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(urlOrKey);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn(`[photo-cache] Impossible d'invalider la photo ${urlOrKey} :`, error);
  }
}

/**
 * Mettre en cache une photo avec son Blob
 */
export async function setCachedPhotoBlob(urlOrKey: string, blob: Blob): Promise<void> {
  if (!urlOrKey || !blob) return;

  try {
    // 1. Stockage CacheStorage
    if ('caches' in window) {
      const cache = await caches.open('bonsai-photos-v1');
      await cache.put(urlOrKey, new Response(blob));
    }

    // 2. Stockage IndexedDB
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(blob, urlOrKey);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn(`[photo-cache] Impossible de mettre en cache la photo ${urlOrKey} :`, error);
  }
}

/**
 * Vide intégralement l'ensemble des caches photos
 */
export async function clearPhotoCache(): Promise<void> {
  try {
    // Nettoyage Cache API
    if ('caches' in window) {
      const cacheKeys = await caches.keys();
      const photoKeys = cacheKeys.filter(
        (key) => key.includes('photo') || key.includes('bonsai') || key.includes('image')
      );
      await Promise.all(photoKeys.map((key) => caches.delete(key)));
    }

    // Nettoyage IndexedDB
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('[photo-cache] Erreur lors du vidage complet du cache :', error);
  }
}

/**
 * Obtenir une estimation de la taille occupée par le cache
 */
export async function getPhotoCacheSize(): Promise<number> {
  if (typeof navigator !== 'undefined' && 'storage' in navigator && 'estimate' in navigator.storage) {
    const { usage } = await navigator.storage.estimate();
    return usage || 0;
  }
  return 0;
}
