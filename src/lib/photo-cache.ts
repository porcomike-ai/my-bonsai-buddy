import { getPhotoBlob, type Photo } from "./supabase-data";

/**
 * Cache mémoire partagé des blobs de photos, pour éviter de retélécharger la
 * même photo plusieurs fois quand elle est affichée à plusieurs endroits de
 * l'app (ex. photo principale d'un bonsaï visible à la fois sur l'accueil,
 * la collection, et sa fiche détail).
 *
 * On met en cache la Promise elle-même (pas seulement le résultat) afin de
 * dédupliquer aussi les requêtes concurrentes lancées au même instant par
 * plusieurs composants pour la même photo.
 *
 * Une limite de taille simple (FIFO) évite une croissance mémoire illimitée
 * sur une session longue avec une grosse collection.
 */
const MAX_CACHE_ENTRIES = 300;
const cache = new Map<string, Promise<Blob | undefined>>();

function rememberKey(key: string) {
  // Remet la clé en fin d'ordre d'insertion (approximation LRU simple).
  const value = cache.get(key);
  if (value) {
    cache.delete(key);
    cache.set(key, value);
  }
  while (cache.size > MAX_CACHE_ENTRIES) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey === undefined) break;
    cache.delete(oldestKey);
  }
}

export function getCachedPhotoBlob(
  photo: Pick<Photo, "storagePath" | "poterieId">,
): Promise<Blob | undefined> {
  const key = photo.storagePath;
  if (!key) return Promise.resolve(undefined);

  const existing = cache.get(key);
  if (existing) {
    rememberKey(key);
    return existing;
  }

  const promise = getPhotoBlob(photo).catch(() => undefined);
  cache.set(key, promise);
  rememberKey(key);
  return promise;
}

/** Retire une photo du cache (ex. après suppression ou remplacement). */
export function invalidateCachedPhoto(storagePath: string | undefined): void {
  if (!storagePath) return;
  cache.delete(storagePath);
}

/** Vide entièrement le cache (utile après une déconnexion, par exemple). */
export function clearPhotoCache(): void {
  cache.clear();
}
