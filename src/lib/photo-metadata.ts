// ============================================================================
//  Utilitaires de datation intelligente pour les photos
//
//  - readExifDate(blob) : extrait la date de prise de vue depuis les métadonnées
//    EXIF (tag DateTimeOriginal 0x9003) d'un Blob JPEG. Sans dépendance externe.
//  - dateFromFilename(name) : détecte un motif YYYYMMDD ou YYYY-MM-DD dans le
//    nom de fichier (ex. IMG_20260621_1234.jpg).
// ============================================================================

/**
 * Lit le tag EXIF DateTimeOriginal (0x9003) d'un Blob JPEG.
 * Format EXIF attendu : "YYYY:MM:DD HH:MM:SS".
 * Retourne une date ISO, ou undefined si aucune métadonnée n'est trouvée.
 */
export async function readExifDate(blob: Blob): Promise<string | undefined> {
  try {
    const buf = new Uint8Array(await blob.arrayBuffer());

    // Vérifie la signature JPEG (SOI marker 0xFFD8).
    if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return undefined;

    let offset = 2;
    while (offset < buf.length) {
      // Cherche un marqueur APP1 (0xFFE1) qui contient les données EXIF.
      if (buf[offset] !== 0xff) break;
      const marker = buf[offset + 1];
      if (marker !== 0xe1) {
        // Marqueur non-EXIF : on avance. La longueur du segment est sur 2 octets.
        const segLen = (buf[offset + 2] << 8) | buf[offset + 3];
        offset += 2 + segLen;
        continue;
      }

      // Segment APP1 trouvé. On vérifie l'en-tête "Exif\0\0".
      const segStart = offset + 4;
      const exifHeader = buf.subarray(segStart, segStart + 6);
      if (
        exifHeader[0] !== 0x45 ||
        exifHeader[1] !== 0x78 ||
        exifHeader[2] !== 0x69 ||
        exifHeader[3] !== 0x66
      ) {
        // Pas EXIF, on sort.
        return undefined;
      }

      const tiffOffset = segStart + 6;
      const isLittleEndian = buf[tiffOffset] === 0x49; // "II" = little-endian
      const read16 = (o: number) =>
        isLittleEndian ? buf[o] | (buf[o + 1] << 8) : (buf[o] << 8) | buf[o + 1];
      const read32 = (o: number) =>
        isLittleEndian
          ? buf[o] | (buf[o + 1] << 8) | (buf[o + 2] << 16) | (buf[o + 3] << 24)
          : (buf[o] << 24) | (buf[o + 1] << 16) | (buf[o + 2] << 8) | buf[o + 3];

      const ifd0Offset = tiffOffset + read32(tiffOffset + 4);
      const numEntries = read16(ifd0Offset);
      let exifIfdOffset = 0;

      // Parcourt les entrées IFD0 pour trouver le sous-IFD EXIF (tag 0x8769).
      for (let i = 0; i < numEntries; i++) {
        const entryOffset = ifd0Offset + 2 + i * 12;
        const tag = read16(entryOffset);
        if (tag === 0x8769) {
          exifIfdOffset = tiffOffset + read32(entryOffset + 8);
          break;
        }
      }

      if (!exifIfdOffset) return undefined;

      // Parcourt le sous-IFD EXIF pour trouver DateTimeOriginal (0x9003).
      const exifEntries = read16(exifIfdOffset);
      for (let i = 0; i < exifEntries; i++) {
        const entryOffset = exifIfdOffset + 2 + i * 12;
        const tag = read16(entryOffset);
        if (tag !== 0x9003 && tag !== 0x0132) continue; // DateTimeOriginal ou DateTime

        const type = read16(entryOffset + 2);
        if (type !== 2) continue; // ASCII

        const valueOffset = read32(entryOffset + 8);
        const strStart = tiffOffset + valueOffset;
        // Chaîne ASCII terminée par \0 — on lit jusqu'à 20 caractères.
        let raw = "";
        for (let j = 0; j < 20; j++) {
          const c = buf[strStart + j];
          if (c === 0) break;
          raw += String.fromCharCode(c);
        }

        // Format "YYYY:MM:DD HH:MM:SS" → ISO.
        const m = raw.trim().match(/^(\d{4}):(\d{2}):(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/);
        if (m) {
          return `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}`;
        }

        // Fallback : format "YYYY:MM:DD" seulement.
        const m2 = raw.trim().match(/^(\d{4}):(\d{2}):(\d{2})/);
        if (m2) {
          return `${m2[1]}-${m2[2]}-${m2[3]}T12:00:00`;
        }
      }

      return undefined;
    }
  } catch {
    // Silencieux : on tolère tout échec de parsing.
  }
  return undefined;
}

/**
 * Détecte un motif de date dans un nom de fichier.
 * Patterns supportés : YYYYMMDD, YYYY-MM-DD, IMG_YYYYMMDD, etc.
 * Retourne une date ISO, ou undefined si aucun motif n'est trouvé.
 */
export function dateFromFilename(name: string): string | undefined {
  // Évite les faux positifs sur des nombres courts en exigeant un délimiteur.
  const patterns = [
    /(?:^|[_\-\s])(\d{4})(\d{2})(\d{2})(?:[_\-\s.]|$)/, // YYYYMMDD
    /(?:^|[_\-\s])(\d{4})-(\d{2})-(\d{2})(?:[_\-\s.]|$)/, // YYYY-MM-DD
  ];

  for (const re of patterns) {
    const m = name.match(re);
    if (!m) continue;
    const year = Number(m[1]);
    const month = Number(m[2]);
    const day = Number(m[3]);
    // Validation basique du mois/jour.
    if (month < 1 || month > 12 || day < 1 || day > 31) continue;
    // Vérifie que la date est valide réellement (ex: pas le 31 février).
    const d = new Date(year, month - 1, day, 12, 0, 0);
    if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) continue;
    return d.toISOString();
  }

  return undefined;
}
