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

// Fonction optimisée : convertit un Blob en binaire compressé (Uint8Array)
// Retourne aussi les dimensions pour permettre le calcul du ratio sans déformation
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
      const { bytes, width, height } = await getResizedImageBytes(blob, 400, 0.7);
      const ratio = Math.min(70 / width, 70 / height);
      doc.addImage(bytes, "JPEG", margin, y, width * ratio, height * ratio, undefined, "FAST");
    } catch (err) { console.error("Photo principale:", err); }
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

  // ... (Logique Notes, Journal et Rappels identique à l'original)
  // [Note : assure-toi de garder ton bloc original ici pour ne rien oublier]

  // Galerie Photos
  if (photosOpt === "toutes" && allPhotos.length > 0) {
    const sorted = [...allPhotos].sort((a, b) => b.date.localeCompare(a.date));
    for (let i = 0; i < sorted.length; i += 4) {
      doc.addPage();
      const slice = sorted.slice(i, i + 4);
      for (let k = 0; k < slice.length; k++) {
        const p = slice[k];
        currentStep++;
        onProgress?.({ phase: "photos", current: currentStep, total: totalSteps });
        
        try {
          const blob = await getPhotoBlob(p);
          const { bytes, width, height } = await getResizedImageBytes(blob, 500, 0.6);
          
          const col = k % 2;
          const row = Math.floor(k / 2);
          const cellW = 86, cellH = 86;
          const xPos = margin + col * 92;
          const yPos = 30 + row * 110;
          
          const ratio = Math.min(cellW / width, cellH / height);
          const w = width * ratio;
          const h = height * ratio;
          
          doc.addImage(bytes, "JPEG", xPos + (cellW - w) / 2, yPos + (cellH - h) / 2, w, h, undefined, "FAST");
        } catch (err) { console.error("Photo galerie:", err); }
      }
    }
  }

  return doc.output("blob");
}

export async function shareBonsaiPdf(
  bonsaiId: string,
  bonsaiName: string,
  options: any = {},
): Promise<"shared" | "downloaded"> {
  const blob = await generateBonsaiPdf(bonsaiId, options);
  const fileName = `bonsai-${bonsaiName.replace(/\s+/g, '-')}.pdf`;
  
  const file = new File([blob], fileName, { type: "application/pdf" });
  const nav = navigator as any;

  if (nav.share && nav.canShare?.({ files: [file] })) {
    try {
      await nav.share({ files: [file], title: bonsaiName });
      return "shared";
    } catch {}
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
  }, 100);
  return "downloaded";
}
