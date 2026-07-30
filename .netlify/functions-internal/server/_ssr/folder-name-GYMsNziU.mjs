const FORBIDDEN_CHARS_REGEX = /[\\/:*?"<>|]/;
const CONTROL_CHARS_REGEX = /[\x00-\x1f]/;
const FORBIDDEN_CHARS_REGEX_G = /[\\/:*?"<>|]/g;
const CONTROL_CHARS_REGEX_G = /[\x00-\x1f]/g;
const RESERVED_WINDOWS_NAMES = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\.|$)/i;
const MAX_LENGTH = 120;
function folderNameError(raw) {
  const name = raw.trim();
  if (!name) return null;
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
function sanitizeForFilesystem(raw) {
  let cleaned = raw.normalize("NFC").replace(FORBIDDEN_CHARS_REGEX_G, "-").replace(CONTROL_CHARS_REGEX_G, "").replace(/\s+/g, " ").trim().replace(/[. ]+$/, "");
  if (RESERVED_WINDOWS_NAMES.test(cleaned)) cleaned = `${cleaned}_`;
  return (cleaned || "sans-nom").slice(0, MAX_LENGTH);
}
export {
  folderNameError as f,
  sanitizeForFilesystem as s
};
