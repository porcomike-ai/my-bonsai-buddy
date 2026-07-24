/**
 * src/lib/photo-cache.ts
 * Gestion résiliente et universelle du cache IndexedDB
 */

const DB_NAME = 'bonsai-photo-cache-db';
const STORE_NAME = 'photos';
const DB_VERSION = 1;

// Récupération de l'URL Supabase (Vite)
const SUPABASE_URL = 
  (import.meta.env && import.meta.env.VITE_SUPABASE_URL) || 
  (typeof window !== 'undefined' && (window as any).env?.VITE_SUPABASE_URL) || 
  '';

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
      bucket?: string;
    } 
  | null 
  | undefined;

/**
 * Reconstruit la clé de cache et l'URL de téléchargement réseau
 */
function resolvePhotoInfo(input: PhotoKeyInput): { cacheKey: string | null; fetchUrl: string | null } {
  if (!input) return { cacheKey: null, fetchUrl: null };

  if (typeof input === 'string') {
    const isFullUrl = input.startsWith('http://') || input.startsWith('https://') || input.startsWith('blob:') || input.startsWith('data:');
    
    if (isFullUrl) {
      return { cacheKey: input, fetchUrl: input };
    }
    
    // Si c't un chemin relatif passé directement en string
    const targetBucket = input.includes('poterie') ? 'poterie-photos' : 'bonsai-photos';
    const fullUrl = SUPABASE_URL ? `${SUPABASE_URL}/storage/v1/object/public/${targetBucket}/${input}` : null;
    return { cacheKey: input, fetchUrl: fullUrl };
  }

  if (typeof input === 'object') {
    const rawPath = input.storagePath || input.storage_path;
    const rawUrl = input.url || input.photo_url || input.photoUrl;
    const cacheKey = rawPath || rawUrl || input.id || input.poterieId || input.poterie_id || null;

    if (!cacheKey) return { cacheKey: null, fetchUrl: null };

    let fetchUrl: string | null = null;

    if (rawUrl && (rawUrl.startsWith('http') || rawUrl.startsWith('blob:'))) {
      fetchUrl = rawUrl;
    } else if (rawPath) {
      if (rawPath.startsWith('http')) {
        fetchUrl = rawPath;
      } else if (SUPABASE_URL) {
        const bucket = input.bucket || (input.poterieId || input.poterie_id ? 'poterie-photos' : 'bonsai-photos');
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

export async function getCachedPhotoBlob(input: PhotoKeyInput): Promise<Blob | null> {
  const { cacheKey, fetchUrl } = resolvePhotoInfo(input);
  if (!cacheKey) return null;

  try {
    // 1. Recherche dans IndexedDB
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

    // 2. Si absent du cache local, téléchargement via l'URL reconstituée
    if (fetchUrl) {
      const response = await fetch(fetchUrl, { mode: 'cors' });
      if (response.ok) {
        const freshBlob = await response.blob();
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

export async function getPhotoCacheSize(): Promise<number> {
  if (typeof navigator !== 'undefined' && 'storage' in navigator && 'estimate' in navigator.storage) {
    const { usage } = await navigator.storage.estimate();
    return usage || 0;
  }
  return 0;
}
