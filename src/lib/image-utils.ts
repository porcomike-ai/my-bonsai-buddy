// ============================================================================
//  Utilitaires image côté navigateur — source unique de compression.
//
//  Utilisé par :
//  - l'upload UI (`fileToBlob` dans blob-url.ts)
//  - la sauvegarde locale (backup.ts, option "réduire la taille des photos")
//
//  Paramètres partagés (ne pas divergir entre chemins d'appel).
//  share-pdf.ts garde ses propres dimensions (800 px) adaptées au PDF.
// ============================================================================

/**
 * Plus grand côté max après redimensionnement (px).
 * 1920 px = Full HD exact, cohérent avec un usage vidéoprojecteur/grand écran.A
 * Poids estimé résultant : ~500-900 Ko/photo (repère comparable : Google
 * Photos stocke à 1695x1271 px pour ~620 Ko). Ne s'applique qu'aux nouvelles
 * photos uploadées après ce changement — aucun effet rétroactif, l'original
 * n'étant jamais conservé côté Supabase.
 */
export const IMAGE_MAX_DIMENSION = 1920;
/** Qualité JPEG (0–1). */
export const IMAGE_JPEG_QUALITY = 0.75;
/**
 * Sous ce poids (octets), on ne décode / ne recompresse pas : l'image est
 * déjà assez légère pour le stockage et l'affichage.
 */
export const IMAGE_SKIP_BELOW_BYTES = 800_000;

/**
 * Redimensionne et recompresse une image en JPEG via un canvas.
 * Si l'image est déjà plus petite que `maxDimension`, elle est retournée
 * telle quelle (on n'agrandit jamais).
 * En cas d'échec (image illisible, canvas indisponible), retourne le blob
 * d'origine plutôt que d'interrompre l'appelant.
 */
export async function resizeImageToBlob(
  blob: Blob,
  maxDimension = IMAGE_MAX_DIMENSION,
  quality = IMAGE_JPEG_QUALITY,
): Promise<Blob> {
  try {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });

    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Image illisible"));
      el.src = dataUrl;
    });

    const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
    if (scale >= 1) return blob;

    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return blob;
    ctx.drawImage(img, 0, 0, w, h);

    const resized = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/jpeg", quality),
    );
    return resized ?? blob;
  } catch {
    return blob;
  }
}

/**
 * Point d'entrée upload : saute la recompression sous IMAGE_SKIP_BELOW_BYTES,
 * sinon applique les paramètres canoniques (IMAGE_MAX_DIMENSION / IMAGE_JPEG_QUALITY).
 */
export async function compressImageBlob(blob: Blob): Promise<Blob> {
  if (blob.size < IMAGE_SKIP_BELOW_BYTES) return blob;
  return resizeImageToBlob(blob);
}

/** Formate un nombre d'octets en libellé lisible (Ko/Mo/Go). */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "taille inconnue";
  if (bytes < 1024) return `${bytes} o`;
  const units = ["Ko", "Mo", "Go"];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unitIndex]}`;
}
