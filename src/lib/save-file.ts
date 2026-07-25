// ============================================================================
//  Sauvegarde d'un Blob sur disque, avec choix de l'emplacement quand possible.
//
//  Utilise l'API File System Access (`showSaveFilePicker`) sur les navigateurs
//  qui la supportent (Chrome, Edge — pas de type officiel dans le lib DOM de
//  TypeScript, d'où le typage manuel minimal ci-dessous). Sur les navigateurs
//  qui ne la supportent pas (Firefox, Safari), on retombe sur le téléchargement
//  classique via un lien <a download>, exactement comme avant.
// ============================================================================

interface SaveFilePickerOptions {
  suggestedName?: string;
  types?: Array<{ description: string; accept: Record<string, string[]> }>;
}

interface FileSystemWritableFileStream {
  write: (data: Blob) => Promise<void>;
  close: () => Promise<void>;
}

interface FileSystemFileHandleLike {
  createWritable: () => Promise<FileSystemWritableFileStream>;
}

type WindowWithFilePicker = Window & {
  showSaveFilePicker?: (options?: SaveFilePickerOptions) => Promise<FileSystemFileHandleLike>;
};

export type SaveFileResult = "saved-via-picker" | "saved-via-download" | "cancelled";

/**
 * Enregistre `blob` sur disque sous le nom `suggestedName`.
 * Retourne "cancelled" si l'utilisateur annule la boîte de dialogue du
 * sélecteur de fichier (dans ce cas, ne pas afficher de message de succès).
 */
export async function saveBlobToDisk(
  blob: Blob,
  suggestedName: string,
  options: { mimeType: string; extension: string; description?: string } = {
    mimeType: "application/octet-stream",
    extension: "",
  },
): Promise<SaveFileResult> {
  const w = window as unknown as WindowWithFilePicker;

  if (typeof w.showSaveFilePicker === "function") {
    try {
      const handle = await w.showSaveFilePicker({
        suggestedName,
        types: [
          {
            description: options.description ?? "Fichier",
            accept: { [options.mimeType]: [options.extension] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return "saved-via-picker";
    } catch (e) {
      // L'utilisateur a fermé/annulé le sélecteur : on ne fait rien de plus.
      if (e instanceof DOMException && e.name === "AbortError") return "cancelled";
      throw e;
    }
  }

  // Repli : téléchargement classique (Firefox, Safari, ou tout navigateur
  // sans support de l'API File System Access).
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = suggestedName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return "saved-via-download";
}
