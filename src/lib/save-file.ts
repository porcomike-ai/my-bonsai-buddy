// ============================================================================
//  Sauvegarde d'un Blob sur disque, avec choix de l'emplacement quand possible.
//
//  Utilise l'API File System Access (`showSaveFilePicker`) sur les navigateurs
//  qui la supportent (Chrome, Edge — pas de type officiel dans le lib DOM de
//  TypeScript, d'où le typage manuel minimal ci-dessous). Sur les navigateurs
//  qui ne la supportent pas (Firefox, Safari), on retombe sur le téléchargement
//  classique via un lien <a download>, exactement comme avant.
//
//  IMPORTANT — activation utilisateur :
//  `showSaveFilePicker` exige d'être appelé pendant la fenêtre d'« activation
//  utilisateur » (juste après un clic). Si on le fait après un traitement
//  asynchrone long (ex. téléchargement de toutes les photos), cette fenêtre
//  a expiré et l'appel échoue avec une SecurityError. C'est pourquoi cette
//  API est scindée en deux étapes : `pickSaveTarget` (à appeler IMMÉDIATEMENT
//  au clic, avant tout traitement) puis `writeToSaveTarget` (à appeler une
//  fois les données prêtes, peu importe le temps écoulé entre les deux).
// ============================================================================

interface SaveFilePickerAcceptOption {
  description: string;
  /** Chaque extension doit être simple (un seul point), ex. ".gz", pas ".json.gz". */
  accept: Record<string, string[]>;
}

interface SaveFilePickerOptions {
  suggestedName?: string;
  types?: SaveFilePickerAcceptOption[];
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

export type SaveTarget =
  | { kind: "picker"; handle: FileSystemFileHandleLike; suggestedName: string }
  | { kind: "download"; suggestedName: string }
  | { kind: "cancelled" };

/**
 * Ouvre (si le navigateur le supporte) le sélecteur d'emplacement pour choisir
 * où enregistrer le fichier. À appeler immédiatement après le clic utilisateur
 * — ne pas faire de traitement long avant cet appel, sous peine de perdre
 * l'activation utilisateur requise par l'API.
 *
 * `extension` doit être une extension simple : ".gz", ".json", ".zip"... Une
 * extension composée comme ".json.gz" est rejetée par le navigateur.
 */
export async function pickSaveTarget(
  suggestedName: string,
  options: { mimeType: string; extension: string; description?: string },
): Promise<SaveTarget> {
  const w = window as unknown as WindowWithFilePicker;

  if (typeof w.showSaveFilePicker !== "function") {
    return { kind: "download", suggestedName };
  }

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
    return { kind: "picker", handle, suggestedName };
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      // L'utilisateur a fermé/annulé le sélecteur.
      return { kind: "cancelled" };
    }
    // Toute autre erreur (activation expirée, API bloquée par une politique
    // de permissions, iframe, etc.) : on se rabat sur le téléchargement
    // classique plutôt que de faire échouer toute la sauvegarde.
    return { kind: "download", suggestedName };
  }
}

/** Écrit `blob` vers la cible obtenue via `pickSaveTarget`. */
export async function writeToSaveTarget(target: SaveTarget, blob: Blob): Promise<void> {
  if (target.kind === "cancelled") return;

  if (target.kind === "picker") {
    const writable = await target.handle.createWritable();
    await writable.write(blob);
    await writable.close();
    return;
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = target.suggestedName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
