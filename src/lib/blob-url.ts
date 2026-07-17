import { useEffect, useState } from "react";

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

export async function fileToBlob(file: File): Promise<Blob> {
  // Resize/compress if large
  if (file.size < 800_000) return file;
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = () => {
      img.onload = () => {
        const max = 1600;
        let w = img.width;
        let h = img.height;
        if (w > max || h > max) {
          const ratio = Math.min(max / w, max / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob((b) => resolve(b ?? file), "image/jpeg", 0.85);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
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
