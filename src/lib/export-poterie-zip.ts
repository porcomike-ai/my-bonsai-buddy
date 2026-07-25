// ============================================================================
//  Export ZIP par poterie
//
//  Même principe que l'export ZIP par arbre (export-zip.ts) : un dossier par
//  poterie sélectionnée, contenant sa photo principale + ses photos de
//  galerie (nommées par date) + un fichier texte récapitulatif
//  (caractéristiques + liste des arbres actuellement plantés dedans).
// ============================================================================

import JSZip from "jszip";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { listPoteriePhotos, getPoteriePhoto, getPhotoBlob, type Poterie, type Bonsai } from "./supabase-data";
import { sanitizeForFilesystem } from "./folder-name";

export interface ExportPoterieProgress {
  /** Étape en cours, 1-indexée. */
  current: number;
  /** Nombre total d'étapes (poteries + photos confondues). */
  total: number;
  /** Nom de la poterie en cours de traitement, pour affichage. */
  poterieNom: string;
  /** Phase en cours, pour un libellé plus précis dans l'UI. */
  phase: "donnees" | "photos" | "compression";
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

function cm(n?: number): string {
  return n != null ? `${n} cm` : "Non renseignée";
}

/**
 * Construit le contenu texte formaté (fiche) d'une poterie.
 * `bonsaisLies` : arbres actuellement plantés dans cette poterie
 * (bonsai.poterieId === poterie.id), déjà filtrés par l'appelant pour éviter
 * de relister toute la collection une fois par poterie.
 */
function buildFicheTexte(p: Poterie, bonsaisLies: Bonsai[]): string {
  const lignes: string[] = [];
  const titre = `FICHE — ${p.nom}`;
  lignes.push(titre);
  lignes.push("=".repeat(titre.length));
  lignes.push("");
  lignes.push("--- Caractéristiques ---");
  lignes.push(`Nom : ${p.nom}`);
  lignes.push(`Forme : ${p.forme || "Non renseignée"}`);
  lignes.push(`Couleur : ${p.couleur || "Non renseignée"}`);
  lignes.push(`Matière : ${p.matiere || "Non renseignée"}`);
  lignes.push(`Dimensions : ${cm(p.longueurCm)} x ${cm(p.largeurCm)} x ${cm(p.hauteurCm)} (L x l x H)`);
  lignes.push(`Artisan : ${p.artisan || "Non renseigné"}`);
  lignes.push(`Origine : ${p.origine || "Non renseignée"}`);
  lignes.push(`Prix : ${euros(p.prix)}`);
  lignes.push(`Ajoutée le : ${dateForDisplay(p.createdAt)}`);
  if (p.notes) {
    lignes.push("");
    lignes.push("Notes :");
    lignes.push(p.notes);
  }

  lignes.push("");
  lignes.push("--- Arbre(s) actuellement dans cette poterie ---");
  if (bonsaisLies.length === 0) {
    lignes.push("(aucun arbre actuellement associé)");
  } else {
    for (const b of bonsaisLies) {
      lignes.push(`- ${b.nom} (${b.espece})`);
    }
  }

  lignes.push("");
  lignes.push(`Export généré le ${format(new Date(), "d MMMM yyyy à HH:mm", { locale: fr })}`);

  return lignes.join("\n");
}

export interface ExportPoterieZipOptions {
  onProgress?: (p: ExportPoterieProgress) => void;
}

/**
 * Génère un ZIP contenant un dossier par poterie (parmi `poteries`), avec sa
 * photo principale, ses photos de galerie (nommées par date) et sa fiche
 * texte, puis déclenche le téléchargement côté navigateur.
 *
 * `allBonsais` : la collection complète, utilisée uniquement pour retrouver
 * quels arbres sont plantés dans chaque poterie (bonsai.poterieId) — évite de
 * relister les bonsaïs une fois par poterie exportée.
 */
export async function exportPoteriesAsZip(
  poteries: Poterie[],
  allBonsais: Bonsai[],
  options: ExportPoterieZipOptions = {},
): Promise<void> {
  const { onProgress } = options;
  if (poteries.length === 0) throw new Error("Aucune poterie sélectionnée pour l'export");

  const zip = new JSZip();

  // Étape = 1 par poterie (fiche + photo principale) + 1 par photo de galerie.
  // On liste la galerie de chaque poterie une seule fois ici, réutilisée
  // ensuite dans la boucle d'export (pas de second appel réseau par poterie).
  const galleryPhotosByPoterie = await Promise.all(poteries.map((p) => listPoteriePhotos(p.id)));
  const total =
    poteries.length + galleryPhotosByPoterie.reduce((a, list) => a + list.length, 0);
  let current = 0;

  const usedFolderNames = new Map<string, number>();

  for (let i = 0; i < poteries.length; i++) {
    const p = poteries[i];

    // Évite les collisions de dossiers si deux poteries portent le même nom.
    const baseName = sanitizeForFilesystem(p.nom);
    const occurrence = usedFolderNames.get(baseName) ?? 0;
    usedFolderNames.set(baseName, occurrence + 1);
    const folderName = occurrence === 0 ? baseName : `${baseName} (${occurrence + 1})`;
    const folder = zip.folder(folderName)!;

    current += 1;
    onProgress?.({ current, total, poterieNom: p.nom, phase: "donnees" });

    const bonsaisLies = allBonsais.filter((b) => b.poterieId === p.id);
    const fiche = buildFicheTexte(p, bonsaisLies);
    folder.file(`${baseName}.txt`, fiche);

    // Photo principale.
    try {
      const blob = await getPoteriePhoto(p);
      if (blob) folder.file("photo-principale.jpg", blob);
    } catch {
      // Photo principale illisible/manquante : on continue sans elle.
    }

    // Photos de galerie, nommées par date (même logique que l'export par arbre).
    const galleryPhotos = galleryPhotosByPoterie[i];
    const usedPhotoNames = new Map<string, number>();
    for (const photo of galleryPhotos) {
      current += 1;
      onProgress?.({ current, total, poterieNom: p.nom, phase: "photos" });

      try {
        const blob = await getPhotoBlob(photo);
        if (!blob) continue;
        const baseDate = dateForFilename(photo.date);
        const occ = usedPhotoNames.get(baseDate) ?? 0;
        usedPhotoNames.set(baseDate, occ + 1);
        const photoName = occ === 0 ? `${baseDate}.jpg` : `${baseDate} (${occ + 1}).jpg`;
        folder.file(photoName, blob);
      } catch {
        // Une photo illisible/manquante ne doit pas interrompre tout l'export.
      }
    }
  }

  onProgress?.({ current: total, total, poterieNom: "", phase: "compression" });

  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });

  const dateSuffix = format(new Date(), "yyyy-MM-dd");
  const filename =
    poteries.length === 1
      ? `bonsai-studio-poterie-${sanitizeForFilesystem(poteries[0].nom)}-${dateSuffix}.zip`
      : `bonsai-studio-poteries-export-${dateSuffix}.zip`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
