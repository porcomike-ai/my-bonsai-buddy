import { useEffect, useState } from "react";
import { compressImageBlob } from "./image-utils";

export function useBlobUrl(blob: Blob | undefined | null): string | undefined {
  const [url, setUrl] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!blob) {
      setUrl(undefined);
      return;
    }
    const u = URL.createObjectURL(blob);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [blob]);
  return url;
}

/**
 * Normalise un fichier image pour l'upload (compression unifiée via
 * image-utils : max 1280 px, JPEG 0.75, skip si < 800 Ko).
 */
export async function fileToBlob(file: File): Promise<Blob> {
  return compressImageBlob(file);
}

/**
 * Sauvegarde une photo directement dans la galerie/le stockage de l'appareil.
 * Utilisée pour les photos prises avec l'appareil photo du téléphone (pas
 * celles importées depuis la galerie, qui y sont déjà).
 *
 * Sur mobile, `navigator.share` avec un fichier ouvre la feuille de partage
 * du système, qui propose "Enregistrer l'image" — c'est la méthode la plus
 * fiable pour écrire dans la galerie depuis un navigateur. Si l'API n'est
 * pas disponible (desktop, navigateur non compatible), on retombe sur un
 * téléchargement classique.
 */
export async function saveBlobToDevice(blob: Blob, filename: string): Promise<void> {
  const file = new File([blob], filename, { type: blob.type || "image/jpeg" });
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };

  if (nav.share && nav.canShare?.({ files: [file] })) {
    try {
      await nav.share({ files: [file] });
      return;
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return;
      // Sinon, on retombe sur le téléchargement classique ci-dessous.
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
