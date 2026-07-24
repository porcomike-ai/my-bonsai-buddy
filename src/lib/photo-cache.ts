/**
 * src/lib/photo-cache.ts
 * Module de cache IndexedDB universel pour Poteries ET Bonsaïs.
 * Prend en charge camelCase (storagePath) et snake_case (storage_path / photo_url).
 */

const DB_NAME = 'bonsai-photo-cache-db';
const STORE_NAME = 'photos';
const DB_VERSION = 1;

// Supabase URL Fallback au cas où seule une clé de stockage relative est passée
const SUPABASE_URL = typeof window !== 'undefined' && (window as any).env?.VITE_SUPABASE_URL 
  ? (window as any).env.VITE_SUPABASE_URL 
  : '';

export type PhotoKeyInput = 
  | string 
  | { 
      storagePath?: string; 
      storage_path?: string; 
      url?: string; 
      photo_url?: string; 
      photoUrl?: string; 
      id?: string; 
      poterieId?: string; 
      poterie_id?: string; 
      path?: string;
    } 
  | null 
  | undefined;

/**
 * Extrait la clé unique et résout l'URL réseau correspondante pour n'importe quel objet Photo.
 */
function resolvePhotoInfo(input: PhotoKeyInput): { cacheKey: string | null; fetchUrl: string | null } {
  if (!input) return { cacheKey: null, fetchUrl: null };

  // 1. Si c'est déjà une chaîne de caractères
  if (typeof input === 'string') {
    const isFullUrl = input.startsWith('http://') || input.startsWith('https://') || input.startsWith('blob:') || input.startsWith('data:');
    return {
      cacheKey: input,
      fetchUrl: isFullUrl ? input : null
    };
  }

  // 2. Si c'est un objet (Bonsaï ou Poterie)
  if (typeof input === 'object') {
    // Clé unique pour le cache IndexedDB
    const rawPath = input.storage_path || input.storagePath || input.path;
    const rawUrl = input.url || input.photo_url || input.photoUrl;
    const rawId = input.id || input.poterieId || input.poterie_id;

    const cacheKey = rawPath || rawUrl || rawId || null;

    // Détermination de l'URL pour le Fetch réseau si absent du cache
    let fetchUrl: string | null = null;

    if (rawUrl && (rawUrl.startsWith('http') || rawUrl.startsWith('blob:'))) {
      fetchUrl = rawUrl;
    } else if (rawPath) {
      if (rawPath.startsWith('http')) {
        fetchUrl = rawPath;
      } else if (SUPABASE_URL) {
        // Reconstitution de l'URL Supabase Storage pour le bucket "bonsai-photos" ou "photos"
        const bucket = input.poterieId || input.poterie_id ? 'poterie-photos' : 'bonsai-photos';
        fetchUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${rawPath}`;
      }
    }

    return { cacheKey, fetchUrl };
  }

  return { cacheKey: null, fetchUrl: null };
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
 * Récupère le Blob d'une photo depuis le cache ou télécharge via l'URL
 */
export async function getCachedPhotoBlob(input: PhotoKeyInput): Promise<Blob | null> {
  const { cacheKey, fetchUrl } = resolvePhotoInfo(input);
  if (!cacheKey) return null;

  try {
    // 1. Tenter la lecture dans IndexedDB
    const db = await openDB();
    const cachedBlob = await new Promise<Blob | null>((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(cacheKey);

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

    // 2. Si absent du cache, faire un Fetch direct sur l'URL
    const targetUrl = fetchUrl || (cacheKey.startsWith('http') ? cacheKey : null);
    if (targetUrl) {
      const response = await fetch(targetUrl, { mode: 'cors' });
      if (response.ok) {
        const freshBlob = await response.blob();
        // Mettre en cache en arrière-plan
        setCachedPhotoBlob(cacheKey, freshBlob).catch(() => {});
        return freshBlob;
      }
    }

    return null;
  } catch (error) {
    console.warn(`[photo-cache] Erreur pour ${cacheKey} :`, error);
    return null;
  }
}

/**
 * Mettre en cache un Blob
 */
export async function setCachedPhotoBlob(input: PhotoKeyInput, blob: Blob): Promise<void> {
  const { cacheKey } = resolvePhotoInfo(input);
  if (!cacheKey || !blob) return;

  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(blob, cacheKey);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn(`[photo-cache] Écriture impossible pour ${cacheKey} :`, error);
  }
}

/**
 * Invalider/supprimer une photo spécifique
 */
export async function invalidateCachedPhoto(input: PhotoKeyInput): Promise<void> {
  const { cacheKey } = resolvePhotoInfo(input);
  if (!cacheKey) return;

  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(cacheKey);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn(`[photo-cache] Erreur de suppression pour ${cacheKey} :`, error);
  }
}

/**
 * Réinitialiser tout le cache
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
 * Estimation taille
 */
export async function getPhotoCacheSize(): Promise<number> {
  if (typeof navigator !== 'undefined' && 'storage' in navigator && 'estimate' in navigator.storage) {
    const { usage } = await navigator.storage.estimate();
    return usage || 0;
  }
  return 0;
}
