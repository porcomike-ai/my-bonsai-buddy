/**
 * src/lib/photo-cache.ts
 * Module de gestion et de nettoyage du cache local des photos (IndexedDB & CacheStorage)
 */

const DB_NAME = 'bonsai-photo-cache-db';
const STORE_NAME = 'photos';
const DB_VERSION = 1;

/**
 * Ouvre ou initialise la base de données IndexedDB pour les photos
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error("IndexedDB n'est pas supporté par ce navigateur."));
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
 * Vide intégralement le cache des photos (IndexedDB + Cache API).
 * Résout les erreurs d'import et réinitialise le stockage local des images.
 */
export async function clearPhotoCache(): Promise<void> {
  try {
    // 1. Suppression du store IndexedDB
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    db.close();

    // 2. Suppression de la base de données IndexedDB elle-même pour réinitialiser proprement
    await new Promise<void>((resolve, reject) => {
      const deleteReq = indexedDB.deleteDatabase(DB_NAME);
      deleteReq.onsuccess = () => resolve();
      deleteReq.onerror = () => reject(deleteReq.error);
      deleteReq.onblocked = () => resolve(); // Poursuivre même si bloqué temporairement
    });

    // 3. Nettoyage de l'API Cache Storage du navigateur
    if ('caches' in window) {
      const cacheKeys = await caches.keys();
      const photoCacheKeys = cacheKeys.filter(
        (key) => key.includes('photo') || key.includes('bonsai') || key.includes('image')
      );
      await Promise.all(photoCacheKeys.map((key) => caches.delete(key)));
    }

    console.info('[photo-cache] Le cache des photos a été vidé avec succès.');
  } catch (error) {
    console.error('[photo-cache] Erreur lors du nettoyage du cache :', error);
    throw error;
  }
}

/**
 * Enregistre une image dans le cache local
 */
export async function setCachedPhoto(key: string, data: Blob | ArrayBuffer | string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(data, key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn(`[photo-cache] Impossible d'enregistrer la photo ${key} dans le cache :`, error);
  }
}

/**
 * Récupère une image depuis le cache local
 */
export async function getCachedPhoto(key: string): Promise<Blob | ArrayBuffer | string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn(`[photo-cache] Impossible de lire la photo ${key} depuis le cache :`, error);
    return null;
  }
}

/**
 * Estime la taille actuellement occupée par le cache
 */
export async function getPhotoCacheSize(): Promise<number> {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const { usage } = await navigator.storage.estimate();
    return usage || 0;
  }
  return 0;
}
