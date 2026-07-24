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

// Fonction optimisée pour renvoyer un format binaire (Uint8Array) sans déformation
async function getResizedImageBytes(blob: Blob, maxWidth = 800, quality = 0.7): Promise<{ bytes: Uint8Array; width: number; height: number }> {
  const dataUrl = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
  const img = await loadImage(dataUrl);
  
  const scale = Math.min(1, maxWidth / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);
  
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { bytes: new Uint8Array(await blob.arrayBuffer()), width: img.width, height: img.height };
  
  ctx.drawImage(img, 0, 0, w, h);
  const resizedBlob = await new Promise<Blob>((resolve) => canvas.toBlob(r => resolve(r!), "image/jpeg", quality));
  return { bytes: new Uint8Array(await resizedBlob.arrayBuffer()), width: w, height: h };
}

export type PdfPhotosOption = "principale" | "toutes";
export interface PdfProgress { phase: "loading" | "generating" | "photos"; current: number; total: number; }

export async function generateBonsaiPdf(
  bonsaiId: string,
  options: { photos?: PdfPhotosOption; onProgress?: (p: PdfProgress) => void } = {},
): Promise<Blob> {
  const photosOpt = options.photos ?? "principale";
  const onProgress = options.onProgress;
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

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;
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

  // Photo principale
  if (b.photoPrincipale) {
    try {
      const blob = await getPhotoBlob({ storagePath: b.photoPrincipale });
      if (blob) {
        const { bytes, width, height } = await getResizedImageBytes(blob, 800, 0.7);
        const ratio = Math.min(70 / width, 70 / height);
        doc.addImage(bytes, "JPEG", margin, y, width * ratio, height * ratio, undefined, "FAST");
      }
    } catch {}
  }

  // Textes (Infos clés)
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

  // Infos
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

  // Pied de page de la première page
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Bonsaï Studio — carnet de collection", W / 2, 290, { align: "center" });

  // Galerie
  if (photosOpt === "toutes" && allPhotos.length > 0) {
    const sorted = [...allPhotos].sort((a, b) => b.date.localeCompare(a.date));
    const totalPages = Math.ceil(sorted.length / 4);
    for (let i = 0; i < sorted.length; i += 4) {
      const pageNum = Math.floor(i / 4) + 1;
      doc.addPage();
      doc.setFillColor(135, 168, 120);
      doc.rect(0, 0, W, 22, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(`Galerie — ${b.nom}`, margin, 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`${pageNum} / ${totalPages}`, W - margin, 14, { align: "right" });
      doc.setTextColor(40, 40, 40);
      
      const slice = sorted.slice(i, i + 4);
      for (let k = 0; k < slice.length; k++) {
        const p = slice[k];
        currentStep++;
        onProgress?.({ phase: "photos", current: currentStep, total: totalSteps });
        try {
          const blob = await getPhotoBlob(p);
          if (!blob) continue;
          const { bytes, width, height } = await getResizedImageBytes(blob, 800, 0.7);
          const cellW = 86, cellH = 86;
          const xPos = margin + (k % 2) * 92;
          const yPos = 30 + Math.floor(k / 2) * 110;
          const ratio = Math.min(cellW / width, cellH / height);
          doc.addImage(bytes, "JPEG", xPos + (cellW - width * ratio) / 2, yPos + (cellH - height * ratio) / 2, width * ratio, height * ratio, undefined, "FAST");
          doc.setFontSize(9);
          doc.setTextColor(110, 110, 110);
          const caption = `${format(parseISO(p.date), "d MMM yyyy", { locale: fr })}${p.legende ? " — " + p.legende : ""}`;
          doc.text(doc.splitTextToSize(caption, cellW), xPos, yPos + 92);
        } catch {}
      }

      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Bonsaï Studio — carnet de collection", W / 2, H - 7, { align: "center" });
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
      await nav.share({
        files: [file],
        title: `Fiche bonsaï — ${bonsaiName}`,
        text: `Fiche récapitulative de ${bonsaiName}`,
      });
      return "shared";
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return "shared";
      // fallback vers téléchargement
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 1000);
  return "downloaded";
}
