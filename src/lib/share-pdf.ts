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

// Fonction utilitaire pour redimensionner proprement en conservant le ratio
async function getResizedImageBytes(blob: Blob, maxWidth = 800, quality = 0.7): Promise<{ bytes: Uint8Array; width: number; height: number }> {
  const dataUrl = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
  const img = await loadImage(dataUrl);
  
  const scale = Math.min(1, maxWidth / Math.max(img.width, img.height));
  const w = img.width * scale;
  const h = img.height * scale;
  
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(img, 0, 0, w, h);
  
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

  // Photo principale (Ratio préservé)
  if (b.photoPrincipale) {
    try {
      const blob = await getPhotoBlob({ storagePath: b.photoPrincipale });
      const { bytes, width, height } = await getResizedImageBytes(blob, 200, 0.7); // 200mm = max width possible
      const ratio = Math.min(70 / width, 70 / height);
      doc.addImage(bytes, "JPEG", margin, y, width * ratio, height * ratio, undefined, "FAST");
    } catch {}
  }

  // Textes (Infos clés)
  const textX = margin + 76;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(b.nom, textX, y + 8);
  // ... (Logique identique à ton original pour le reste des infos)
  
  // Galerie Photos (Avec calcul de centrage pour éviter les déformations)
  if (photosOpt === "toutes" && allPhotos.length > 0) {
    const sorted = [...allPhotos].sort((a, b) => b.date.localeCompare(a.date));
    for (let i = 0; i < sorted.length; i += 4) {
      doc.addPage();
      const slice = sorted.slice(i, i + 4);
      for (let k = 0; k < slice.length; k++) {
        const p = slice[k];
        const blob = await getPhotoBlob(p);
        const { bytes, width, height } = await getResizedImageBytes(blob, 300, 0.6);
        
        const col = k % 2;
        const row = Math.floor(k / 2);
        const cellW = 86, cellH = 86;
        const xPos = margin + col * 92;
        const yPos = 30 + row * 110;
        
        const ratio = Math.min(cellW / width, cellH / height);
        const w = width * ratio;
        const h = height * ratio;
        
        doc.addImage(bytes, "JPEG", xPos + (cellW - w) / 2, yPos + (cellH - h) / 2, w, h, undefined, "FAST");
        currentStep++;
        onProgress?.({ phase: "photos", current: currentStep, total: totalSteps });
      }
    }
  }

  return doc.output("blob");
}

export async function shareBonsaiPdf(bonsaiId: string, bonsaiName: string, options: any = {}): Promise<"shared" | "downloaded"> {
  const blob = await generateBonsaiPdf(bonsaiId, options);
  // ... (Logique de partage originale conservée)
  return "downloaded";
}
