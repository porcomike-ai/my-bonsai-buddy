/**
 * src/lib/photo-cache.ts
 * Gestion du cache IndexedDB et CacheStorage pour les photos d'arbres et poteries.
 */

const DB_NAME = 'bonsai-photo-cache-db';
const STORE_NAME = 'photos';
const DB_VERSION = 1;

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
 * Récupère un Blob photo depuis le cache local ou télécharge puis met en cache
 */
export async function getCachedPhotoBlob(urlOrKey: string): Promise<Blob | null> {
  if (!urlOrKey) return null;

  try {
    // 1. Recherche dans CacheStorage
    if ('caches' in window) {
      const cache = await caches.open('bonsai-photos-v1');
      const response = await cache.match(urlOrKey);
      if (response && response.ok) {
        return await response.blob();
      }
    }

    // 2. Recherche dans IndexedDB
    try {
      const db = await openDB();
      const cachedBlob = await new Promise<Blob | null>((resolve) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(urlOrKey);

        request.onsuccess = () => {
          const res = request.result;
          if (res instanceof Blob) resolve(res);
          else if (res) resolve(new Blob([res]));
          else resolve(null);
        };
        request.onerror = () => resolve(null);
      });

      if (cachedBlob) return cachedBlob;
    } catch {
      // Poursuivre vers fetch en cas d'erreur IDB
    }

    // 3. Téléchargement direct si URL distante
    if (urlOrKey.startsWith('http://') || urlOrKey.startsWith('https://')) {
      const res = await fetch(urlOrKey, { mode: 'cors' });
      if (res.ok) {
        const freshBlob = await res.blob();
        setCachedPhotoBlob(urlOrKey, freshBlob).catch(() => {});
        return freshBlob;
      }
    }

    return null;
  } catch (error) {
    console.warn(`[photo-cache] Impossible d'extraire la photo pour ${urlOrKey}:`, error);
    return null;
  }
}

/**
 * Alternative retournant directement une URL affichable (Blob URL ou URL d'origine)
 */
export async function getCachedPhotoUrl(urlOrKey: string): Promise<string> {
  if (!urlOrKey) return '';
  const blob = await getCachedPhotoBlob(urlOrKey);
  if (blob) {
    return URL.createObjectURL(blob);
  }
  return urlOrKey;
}

/**
 * Supprime une entrée du cache
 */
export async function invalidateCachedPhoto(urlOrKey: string): Promise<void> {
  if (!urlOrKey) return;

  try {
    if ('caches' in window) {
      const cache = await caches.open('bonsai-photos-v1');
      await cache.delete(urlOrKey);
    }

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
 * Sauvegarde un Blob dans le cache
 */
export async function setCachedPhotoBlob(urlOrKey: string, blob: Blob): Promise<void> {
  if (!urlOrKey || !blob) return;

  try {
    if ('caches' in window) {
      const cache = await caches.open('bonsai-photos-v1');
      await cache.put(urlOrKey, new Response(blob));
    }

    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(blob, urlOrKey);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn(`[photo-cache] Stockage impossible pour ${urlOrKey} :`, error);
  }
}

/**
 * Réinitialisation complète du cache
 */
export async function clearPhotoCache(): Promise<void> {
  try {
    if ('caches' in window) {
      const cacheKeys = await caches.keys();
      const photoKeys = cacheKeys.filter(
        (key) => key.includes('photo') || key.includes('bonsai') || key.includes('image')
      );
      await Promise.all(photoKeys.map((key) => caches.delete(key)));
    }

    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('[photo-cache] Erreur lors du vidage complet :', error);
  }
}

/**
 * Estimation de la taille globale du stockage
 */
export async function getPhotoCacheSize(): Promise<number> {
  if (typeof navigator !== 'undefined' && 'storage' in navigator && 'estimate' in navigator.storage) {
    const { usage } = await navigator.storage.estimate();
    return usage || 0;
  }
  return 0;
}
