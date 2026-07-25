// ============================================================================
//  Validation / assainissement de noms utilisés comme noms de fichier ou de
//  dossier (export ZIP par arbre : un dossier par bonsaï, nommé d'après
//  `bonsai.nom`).
//
//  Deux usages complémentaires :
//  - `folderNameError()` : validation BLOQUANTE au moment de la saisie
//    (formulaire bonsaï) — on refuse le nom plutôt que de le corriger en
//    silence, pour que l'utilisateur choisisse consciemment un nom valide.
//  - `sanitizeForFilesystem()` : filet de sécurité au moment de l'export,
//    pour les noms déjà enregistrés avant l'ajout de cette validation (ou
//    importés depuis une sauvegarde) — corrige sans bloquer, car à ce stade
//    il est trop tard pour redemander une saisie.
//
//  Le jeu de caractères interdits est le sur-ensemble des restrictions
//  Windows/macOS/Linux : Windows est le plus restrictif des trois, donc s'y
//  conformer garantit la compatibilité partout.
// ============================================================================

const FORBIDDEN_CHARS_REGEX = /[\\/:*?"<>|]/;
const CONTROL_CHARS_REGEX = /[\x00-\x1f]/;
// eslint-disable-next-line no-control-regex -- volontaire, on veut bien détecter les caractères de contrôle
const RESERVED_WINDOWS_NAMES = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\.|$)/i;
const MAX_LENGTH = 120;

/**
 * Valide qu'un nom peut servir sans conflit de nom de fichier/dossier sur
 * Windows, macOS et Linux. Retourne un message d'erreur en français si le nom
 * est invalide, ou `null` s'il est valide.
 */
export function folderNameError(raw: string): string | null {
  const name = raw.trim();
  if (!name) return null; // le caractère "requis" est géré séparément (zod .min)

  if (FORBIDDEN_CHARS_REGEX.test(name)) {
    return 'Le nom ne peut pas contenir les caractères : \\ / : * ? " < > |';
  }
  if (CONTROL_CHARS_REGEX.test(name)) {
    return "Le nom contient un caractère non imprimable non autorisé";
  }
  if (/[. ]$/.test(name)) {
    return "Le nom ne peut pas se terminer par un point ou une espace";
  }
  if (RESERVED_WINDOWS_NAMES.test(name)) {
    return `"${name}" est un nom réservé par Windows et ne peut pas être utilisé tel quel`;
  }
  if (name.length > MAX_LENGTH) {
    return `Le nom est trop long (${MAX_LENGTH} caractères maximum)`;
  }
  return null;
}

/**
 * Corrige silencieusement un nom pour qu'il soit utilisable comme nom de
 * fichier/dossier — filet de sécurité pour des données existantes qui n'ont
 * pas transité par `folderNameError` (créées avant son introduction,
 * importées depuis une sauvegarde, etc.). Ne jamais utiliser à la saisie :
 * préférer `folderNameError` pour informer l'utilisateur plutôt que de
 * corriger en silence.
 */
export function sanitizeForFilesystem(raw: string): string {
  let cleaned = raw
    .normalize("NFC")
    .replace(FORBIDDEN_CHARS_REGEX, "-")
    .replace(CONTROL_CHARS_REGEX, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[. ]+$/, "");

  if (RESERVED_WINDOWS_NAMES.test(cleaned)) cleaned = `${cleaned}_`;

  return (cleaned || "sans-nom").slice(0, MAX_LENGTH);
}
