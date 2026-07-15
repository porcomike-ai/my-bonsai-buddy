import { jsPDF } from "jspdf";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import {
  getBonsai,
  getPhotoBlob,
  getPoterie,
  listJournal,
  listPhotos,
  listRappels,
  ageActuel,
} from "./supabase-data";
import { soinLabel, styleLabel } from "./bonsai-meta";

async function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}

// Fonction optimisée : convertit un Blob en binaire compressé (Uint8Array) pour jsPDF
async function getResizedImageBytes(blob: Blob, maxWidth = 600, quality = 0.5): Promise<Uint8Array> {
  const dataUrl = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
  const img = await loadImage(dataUrl);
  
  const scale = Math.min(1, maxWidth / img.width);
  const canvas = document.createElement("canvas");
  canvas.width = img.width * scale;
  canvas.height = img.height * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new Uint8Array(await blob.arrayBuffer());
  
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const resizedBlob = await new Promise<Blob>((resolve) => canvas.toBlob(r => resolve(r!), "image/jpeg", quality));
  return new Uint8Array(await resizedBlob.arrayBuffer());
}

export type PdfPhotosOption = "principale" | "toutes";

export interface PdfProgress {
  phase: "loading" | "generating" | "photos";
  current: number;
  total: number;
}

export async function generateBonsaiPdf(
  bonsaiId: string,
  options: { photos?: PdfPhotosOption; onProgress?: (p: PdfProgress) => void } = {},
): Promise<Blob> {
  const photosOpt = options.photos ?? "principale";
  const onProgress = options.onProgress;
  
  // Étape 1 : Chargement des données
  onProgress?.({ phase: "loading", current: 0, total: 1 });

  const b = await getBonsai(bonsaiId);
  if (!b) throw new Error("Bonsaï introuvable");
  
  const [poterie, journal, rappels, allPhotos] = await Promise.all([
    b.poterieId ? getPoterie(b.poterieId) : Promise.resolve(undefined),
    listJournal(bonsaiId),
    listRappels(bonsaiId),
    photosOpt === "toutes" ? listPhotos(bonsaiId) : Promise.resolve([]),
  ]);

  const totalSteps = 1 + (photosOpt === "toutes" ? allPhotos.length : 0);
  let currentStep = 0;

  // Étape 2 : Génération de la fiche principale
  onProgress?.({ phase: "generating", current: currentStep, total: totalSteps });

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const margin = 16;

  // Header
  doc.setFillColor(135, 168, 120);
  doc.rect(0, 0, W, 32, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Bonsaï Studio", margin, 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Fiche récapitulative", margin, 22);
  doc.text(format(new Date(), "d MMMM yyyy", { locale: fr }), W - margin, 22, { align: "right" });

  let y = 44;
  doc.setTextColor(40, 40, 40);

  // Photo principale optimisée
  if (b.photoPrincipale) {
    try {
      const blob = await getPhotoBlob({ storagePath: b.photoPrincipale });
      const binaryData = await getResizedImageBytes(blob, 400, 0.5);
      doc.addImage(binaryData, "JPEG", margin, y, 70, 70, undefined, "FAST");
    } catch (err) {
      console.error("Erreur de chargement de la photo principale", err);
    }
  }

  // Titre + espèce
  const textX = margin + 76;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(b.nom, textX, y + 8);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.setTextColor(110, 110, 110);
  doc.text(b.espece, textX, y + 16);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(196, 101, 74);
  doc.setFontSize(9);
  doc.text(styleLabel(b.style).toUpperCase(), textX, y + 22);

  // Infos clés
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(10);
  const infos: Array<[string, string]> = [];
  const age = ageActuel(b);
  if (age != null) infos.push(["Âge estimé", `${age} ans`]);
  if (b.hauteurCm != null) infos.push(["Hauteur", `${b.hauteurCm} cm`]);
  if (b.dateAcquisition) infos.push(["Acquis le", format(parseISO(b.dateAcquisition), "d MMM yyyy", { locale: fr })]);
  if (b.origine) infos.push(["Origine", b.origine]);
  if (poterie) infos.push(["Poterie", poterie.nom]);
  infos.push(["Statut", (b.dansCollection ?? true) ? "Dans la collection" : "Sorti de la collection"]);

  let iy = y + 30;
  for (const [label, value] of infos) {
    doc.setFont("helvetica", "bold");
    doc.text(label, textX, iy);
    doc.setFont("helvetica", "normal");
    doc.text(value, textX + 30, iy);
    iy += 5.5;
  }

  y = Math.max(y + 76, iy) + 6;

  // Notes
  if (b.notes) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Notes", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(b.notes, W - margin * 2);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 4;
  }

  // Journal
  if (journal.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Derniers entretiens", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    for (const e of journal.slice(0, 6)) {
      if (y > 270) break;
      const line = `• ${format(parseISO(e.date), "d MMM yyyy", { locale: fr })} — ${soinLabel(e.type)}${e.notes ? " : " + e.notes : ""}`;
      const wrapped = doc.splitTextToSize(line, W - margin * 2);
      doc.text(wrapped, margin, y);
      y += wrapped.length * 5;
    }
    y += 3;
  }

  // Rappels
  const actifs = rappels.filter((r) => r.actif).slice(0, 5);
  if (actifs.length > 0 && y < 270) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Prochains soins", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    for (const r of actifs) {
      if (y > 280) break;
      doc.text(`• ${format(parseISO(r.prochaineDate), "d MMM yyyy", { locale: fr })} — ${soinLabel(r.type)}`, margin, y);
      y += 5;
    }
  }

  currentStep++;

  // Étape 3 : Galerie d'images (Traitement page par page, 4 photos par page)
  if (photosOpt === "toutes" && allPhotos.length > 0) {
    onProgress?.({ phase: "photos", current: currentStep, total: totalSteps });
    
    const sorted = [...allPhotos].sort((a, b) => b.date.localeCompare(a.date));
    const perPage = 4;
    
    for (let i = 0; i < sorted.length; i += perPage) {
      doc.addPage();
      
      // En-tête de la page de la galerie
      doc.setFillColor(245, 245, 245);
      doc.rect(0, 0, W, 20, "F");
      doc.setTextColor(80, 80, 80);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(`Galerie Photos — ${b.nom}`, margin, 13);
      
      const slice = sorted.slice(i, i + perPage);
      
      for (let k = 0; k < slice.length; k++) {
        const p = slice[k];
        const col = k % 2;
        const row = Math.floor(k / 2);
        
        const xPos = margin + col * 92;
        const yPos = 30 + row * 120;

        try {
          const blob = await getPhotoBlob(p);
          // Résolution de 500px de large max et qualité 0.4 pour un excellent ratio poids/visuel
          const binaryData = await getResizedImageBytes(blob, 500, 0.4);
          
          doc.addImage(binaryData, "JPEG", xPos, yPos, 86, 86, undefined, "FAST");
          
          // Légende sous la photo (Date)
          doc.setFont("helvetica", "italic");
          doc.setFontSize(9);
          doc.setTextColor(100, 100, 100);
          doc.text(
            format(parseISO(p.date), "d MMMM yyyy", { locale: fr }),
            xPos + 43,
            yPos + 92,
            { align: "center" }
          );
        } catch (err) {
          console.error("Erreur de chargement d'une image de la galerie", err);
        }

        currentStep++;
        onProgress?.({ phase: "photos", current: currentStep, total: totalSteps });
      }
    }
  }

  return doc.output("blob");
}

function safeFileName(s: string): string {
  return s.replace(/[^a-zA-Z0-9-_]+/g, "-").replace(/^-+|-+$/g, "") || "bonsai";
}

export async function shareBonsaiPdf(
  bonsaiId: string,
  bonsaiName: string,
  options: { photos?: PdfPhotosOption; onProgress?: (p: PdfProgress) => void } = {},
): Promise<"shared" | "downloaded"> {
  const blob = await generateBonsaiPdf(bonsaiId, options);
  const fileName = `bonsai-${safeFileName(bonsaiName)}.pdf`;
  const file = new File([blob], fileName, { type: "application/pdf" });

  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
  if (nav.share && nav.canShare?.({ files: [file] })) {
    try {
      await nav.share({ files: [file], title: `Fiche bonsaï — ${bonsaiName}`, text: `Fiche de ${bonsaiName}` });
      return "shared";
    } catch (err) {
      console.warn("Échec du partage natif", err);
    }
  }

  // Fallback : Téléchargement automatique
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  return "downloaded";
}
