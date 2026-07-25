// ============================================================================
//  Export ZIP par arbre
//
//  Génère, entièrement côté client, une archive .zip contenant un dossier par
//  bonsaï sélectionné : ses photos (nommées par leur date) + un fichier texte
//  récapitulatif (caractéristiques + historique complet des événements).
//
//  Ne dépend que de fonctions déjà exposées par `@/lib/supabase-data` — aucune
//  requête réseau n'est dupliquée ici, on ne fait qu'assembler et compresser.
// ============================================================================

import JSZip from "jszip";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import {
  listPhotos,
  listJournal,
  listRappels,
  getPhotoBlob,
  getPoterie,
  ageActuel,
  type Bonsai,
} from "./supabase-data";
import { styleLabel, etapeLabel, soinLabel } from "./bonsai-meta";
import { sanitizeForFilesystem } from "./folder-name";

export interface ExportProgress {
  /** Étape en cours, 1-indexée. */
  current: number;
  /** Nombre total d'étapes (arbres + photos confondus). */
  total: number;
  /** Nom de l'arbre en cours de traitement, pour affichage. */
  bonsaiNom: string;
  /** Phase en cours, pour un libellé plus précis dans l'UI. */
  phase: "donnees" | "photos" | "compression";
}

/**
 * Nettoie un nom pour en faire un nom de dossier/fichier valide sur
 * Windows/macOS/Linux. Filet de sécurité pour des arbres nommés avant
 * l'ajout de la validation à la saisie (voir `src/lib/folder-name.ts`) ou
 * importés depuis une sauvegarde — dans l'usage normal, `bonsai.nom` est
 * déjà garanti valide par le formulaire.
 */
function sanitizeFilename(name: string): string {
  return sanitizeForFilesystem(name);
}

/** Formate une date ISO (ou "date inconnue") en libellé lisible pour un nom de fichier. */
function dateForFilename(iso: string | undefined): string {
  if (!iso) return "date-inconnue";
  try {
    return format(parseISO(iso), "yyyy-MM-dd");
  } catch {
    return "date-inconnue";
  }
}

/** Formate une date ISO pour l'affichage dans le fichier texte. */
function dateForDisplay(iso: string | undefined): string {
  if (!iso) return "Non renseignée";
  try {
    return format(parseISO(iso), "d MMMM yyyy", { locale: fr });
  } catch {
    return iso;
  }
}

function euros(n?: number): string {
  if (n == null) return "Non renseigné";
  return `${n.toLocaleString("fr-FR")} €`;
}

/** Construit le contenu texte formaté (fiche + historique) d'un bonsaï. */
async function buildFicheTexte(b: Bonsai): Promise<string> {
  const [journal, rappels, poterie] = await Promise.all([
    listJournal(b.id),
    listRappels(b.id),
    b.poterieId ? getPoterie(b.poterieId) : Promise.resolve(undefined),
  ]);

  const lignes: string[] = [];
  const titre = `FICHE — ${b.nom}`;
  lignes.push(titre);
  lignes.push("=".repeat(titre.length));
  lignes.push("");
  lignes.push("--- Caractéristiques ---");
  lignes.push(`Nom : ${b.nom}`);
  lignes.push(`Espèce : ${b.espece}`);
  lignes.push(`Style : ${styleLabel(b.style)}`);
  lignes.push(`Étape : ${etapeLabel(b.etape)}`);
  lignes.push(`Âge estimé : ${ageActuel(b) != null ? `${ageActuel(b)} ans` : "Non renseigné"}`);
  lignes.push(`Date d'acquisition : ${dateForDisplay(b.dateAcquisition)}`);
  lignes.push(`Origine : ${b.origine || "Non renseignée"}`);
  lignes.push(`Hauteur : ${b.hauteurCm != null ? `${b.hauteurCm} cm` : "Non renseignée"}`);
  lignes.push(`Prix d'achat : ${euros(b.prixAchat)}`);
  lignes.push(`Valeur estimée : ${euros(b.valeurEstimee)}`);
  lignes.push(`Poterie : ${poterie?.nom ?? "Non renseignée"}`);
  lignes.push(`Dans la collection : ${b.dansCollection === false ? "Non" : "Oui"}`);
  lignes.push(`Favori : ${b.favori ? "Oui" : "Non"}`);
  if (b.notes) {
    lignes.push("");
    lignes.push("Notes :");
    lignes.push(b.notes);
  }

  lignes.push("");
  lignes.push("--- Rappels actifs ---");
  const rappelsActifs = rappels.filter((r) => r.actif);
  if (rappelsActifs.length === 0) {
    lignes.push("(aucun rappel actif)");
  } else {
    for (const r of rappelsActifs) {
      lignes.push(
        `- ${soinLabel(r.type)} : prochaine échéance le ${dateForDisplay(r.prochaineDate)}${
          r.notes ? ` — ${r.notes}` : ""
        }`,
      );
    }
  }

  lignes.push("");
  lignes.push("--- Historique des événements (journal) ---");
  if (journal.length === 0) {
    lignes.push("(aucune entrée de journal)");
  } else {
    // listJournal renvoie déjà par date décroissante ; on affiche du plus ancien
    // au plus récent pour lire l'historique dans l'ordre chronologique naturel.
    const parDateCroissante = [...journal].reverse();
    for (const j of parDateCroissante) {
      lignes.push(`[${dateForDisplay(j.date)}] ${soinLabel(j.type)}${j.notes ? ` — ${j.notes}` : ""}`);
    }
  }

  lignes.push("");
  lignes.push(`Export généré le ${format(new Date(), "d MMMM yyyy à HH:mm", { locale: fr })}`);

  return lignes.join("\n");
}

export interface ExportZipOptions {
  onProgress?: (p: ExportProgress) => void;
}

/**
 * Génère un ZIP contenant un dossier par bonsaï (parmi `bonsais`), avec ses
 * photos (nommées par date) et sa fiche texte, puis déclenche le
 * téléchargement côté navigateur.
 */
export async function exportBonsaisAsZip(
  bonsais: Bonsai[],
  options: ExportZipOptions = {},
): Promise<void> {
  const { onProgress } = options;
  if (bonsais.length === 0) throw new Error("Aucun arbre sélectionné pour l'export");

  const zip = new JSZip();

  // Étape = 1 par arbre (fiche texte + métadonnées) + 1 par photo téléchargée.
  // On ne connaît le nombre de photos qu'après avoir listé chaque arbre, donc
  // on calcule le total au fil de l'eau et on notifie une fois qu'il est stable
  // pour chaque arbre (l'UI affiche une barre qui avance de façon monotone).
  const photoCounts = await Promise.all(bonsais.map((b) => listPhotos(b.id).then((p) => p.length)));
  const total = bonsais.length + photoCounts.reduce((a, n) => a + n, 0);
  let current = 0;

  const usedFolderNames = new Map<string, number>();

  for (let i = 0; i < bonsais.length; i++) {
    const b = bonsais[i];

    // Évite les collisions de dossiers si deux arbres portent le même nom.
    const baseName = sanitizeFilename(b.nom);
    const occurrence = usedFolderNames.get(baseName) ?? 0;
    usedFolderNames.set(baseName, occurrence + 1);
    const folderName = occurrence === 0 ? baseName : `${baseName} (${occurrence + 1})`;
    const folder = zip.folder(folderName)!;

    current += 1;
    onProgress?.({ current, total, bonsaiNom: b.nom, phase: "donnees" });

    const [fiche, photos] = await Promise.all([buildFicheTexte(b), listPhotos(b.id)]);
    folder.file(`${baseName}.txt`, fiche);

    const usedPhotoNames = new Map<string, number>();
    for (const photo of photos) {
      current += 1;
      onProgress?.({ current, total, bonsaiNom: b.nom, phase: "photos" });

      try {
        const blob = await getPhotoBlob(photo);
        if (!blob) continue;
        const baseDate = dateForFilename(photo.date);
        const occ = usedPhotoNames.get(baseDate) ?? 0;
        usedPhotoNames.set(baseDate, occ + 1);
        const photoName = occ === 0 ? `${baseDate}.jpg` : `${baseDate} (${occ + 1}).jpg`;
        folder.file(photoName, blob);
      } catch {
        // Une photo illisible/manquante ne doit pas interrompre tout l'export ;
        // elle est simplement omise du zip.
      }
    }
  }

  onProgress?.({ current: total, total, bonsaiNom: "", phase: "compression" });

  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });

  const dateSuffix = format(new Date(), "yyyy-MM-dd");
  const filename =
    bonsais.length === 1
      ? `bonsai-studio-${sanitizeFilename(bonsais[0].nom)}-${dateSuffix}.zip`
      : `bonsai-studio-export-${dateSuffix}.zip`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
