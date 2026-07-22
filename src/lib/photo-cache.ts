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
 * Récupère un Blob photo depuis le cache local, ou télécharge depuis l'URL si absent.
 */
export async function getCachedPhotoBlob(urlOrKey: string): Promise<Blob | null> {
  if (!urlOrKey) return null;

  try {
    // 1. Recherche dans CacheStorage API
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
      // Ignorer l'erreur IndexedDB et continuer vers le fetch
    }

    // 3. Fallback : Téléchargement direct si l'image est une URL web / Supabase Storage
    if (urlOrKey.startsWith('http://') || urlOrKey.startsWith('https://') || urlOrKey.startsWith('blob:')) {
      const res = await fetch(urlOrKey);
      if (res.ok) {
        const freshBlob = await res.blob();
        // Mettre en cache pour la prochaine fois
        setCachedPhotoBlob(urlOrKey, freshBlob).catch(() => {});
        return freshBlob;
      }
    }

    return null;
  } catch (error) {
    console.warn(`[photo-cache] Erreur de récupération pour ${urlOrKey}:`, error);
    return null;
  }
}

/**
 * Invalide ou supprime une photo spécifique du cache
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
 * Enregistre une photo (Blob) dans le cache
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
    console.warn(`[photo-cache] Impossible de mettre en cache ${urlOrKey} :`, error);
  }
}

/**
 * Vide intégralement le cache des photos
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
    console.error('[photo-cache] Erreur lors du vidage complet du cache :', error);
  }
}

/**
 * Estimation de la taille occupée
 */
export async function getPhotoCacheSize(): Promise<number> {
  if (typeof navigator !== 'undefined' && 'storage' in navigator && 'estimate' in navigator.storage) {
    const { usage } = await navigator.storage.estimate();
    return usage || 0;
  }
  return 0;
}
