// ============================================================================
//  Utilitaires image côté navigateur — redimensionnement / recompression.
//
//  Utilisé par la sauvegarde locale (backup.ts) quand l'utilisateur active
//  l'option "réduire la taille des photos". Reste volontairement autonome
//  (pas d'import depuis share-pdf.ts) pour ne pas risquer de régression sur
//  l'export PDF existant.
// ============================================================================

/**
 * Redimensionne et recompresse une image en JPEG via un canvas.
 * Si l'image est déjà plus petite que `maxDimension`, elle est retournée
 * telle quelle (on n'agrandit jamais, et on ne fait pas perdre de qualité
 * inutilement à une photo déjà légère).
 * En cas d'échec (image illisible, canvas indisponible), retourne le blob
 * d'origine plutôt que d'interrompre l'appelant.
 */
export async function resizeImageToBlob(
  blob: Blob,
  maxDimension = 1280,
  quality = 0.7,
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
