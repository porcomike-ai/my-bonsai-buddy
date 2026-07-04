import { jsPDF } from "jspdf";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import {
  getBonsai,
  getPhoto,
  getPhotoBlob,
  getPoteriePhoto,
  getPoterie,
  listJournal,
  listPhotos,
  listRappels,
} from "./supabase-data";
import { soinLabel, styleLabel } from "./bonsai-meta";

async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

async function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
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
  const principalBlob = b.photoPrincipale
    ? await getPhotoBlob({ storagePath: b.photoPrincipale })
    : undefined;

  onProgress?.({ phase: "generating", current: 0, total: allPhotos.length + 1 });

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const margin = 16;

  // Header
  doc.setFillColor(135, 168, 120); // sage
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

  // Photo
  if (principalBlob) {
    try {
      const dataUrl = await blobToDataUrl(principalBlob);
      const img = await loadImage(dataUrl);
      const maxW = 70,
        maxH = 70;
      const ratio = Math.min(maxW / img.width, maxH / img.height);
      const w = img.width * ratio,
        h = img.height * ratio;
      doc.addImage(dataUrl, "JPEG", margin, y, w, h, undefined, "FAST");
    } catch {
      /* image illisible */
    }
  }

  // Titre + espèce à droite de la photo
  const textX = margin + 76;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(b.nom, textX, y + 8);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.setTextColor(110, 110, 110);
  doc.text(b.espece, textX, y + 16);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(196, 101, 74); // terracotta
  doc.setFontSize(9);
  doc.text(styleLabel(b.style).toUpperCase(), textX, y + 22);

  // Infos clés
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(10);
  const infos: Array<[string, string]> = [];
  if (b.ageEstime != null) infos.push(["Âge estimé", `${b.ageEstime} ans`]);
  if (b.hauteurCm != null) infos.push(["Hauteur", `${b.hauteurCm} cm`]);
  if (b.dateAcquisition)
    infos.push(["Acquis le", format(parseISO(b.dateAcquisition), "d MMM yyyy", { locale: fr })]);
  if (b.origine) infos.push(["Origine", b.origine]);
  if (poterie) infos.push(["Poterie", poterie.nom]);
  infos.push([
    "Statut",
    (b.dansCollection ?? true) ? "Dans la collection" : "Sorti de la collection",
  ]);

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

  // Derniers entretiens
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

  // Prochains soins
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
      doc.text(
        `• ${format(parseISO(r.prochaineDate), "d MMM yyyy", { locale: fr })} — ${soinLabel(r.type)}`,
        margin,
        y,
      );
      y += 5;
    }
  }

  // Pied de page de la première page
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Bonsaï Studio — carnet de collection", W / 2, 290, { align: "center" });

  onProgress?.({ phase: "generating", current: 1, total: allPhotos.length + 1 });

  // Pages galerie (option « toutes les photos »)
  if (photosOpt === "toutes" && allPhotos.length > 0) {
    const H = 297;
    const sorted = [...allPhotos].sort((a, b) => b.date.localeCompare(a.date));
    const perPage = 4;
    const cols = 2;
    const gap = 6;
    const availW = W - margin * 2;
    const cellW = (availW - gap) / cols;
    const cellH = 110;

    let photoIndex = 0;
    for (let i = 0; i < sorted.length; i += perPage) {
      doc.addPage();
      // En-tête galerie
      doc.setFillColor(135, 168, 120);
      doc.rect(0, 0, W, 22, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(`Galerie — ${b.nom}`, margin, 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(
        `${Math.floor(i / perPage) + 1} / ${Math.ceil(sorted.length / perPage)}`,
        W - margin,
        14,
        { align: "right" },
      );
      doc.setTextColor(40, 40, 40);

      const slice = sorted.slice(i, i + perPage);
      for (let k = 0; k < slice.length; k++) {
        const p = slice[k];
        photoIndex++;
        onProgress?.({ phase: "photos", current: photoIndex, total: sorted.length });
        const col = k % cols;
        const row = Math.floor(k / cols);
        const x = margin + col * (cellW + gap);
        const yy = 30 + row * (cellH + gap);
        try {
          const blob = await getPhotoBlob(p);
          if (!blob) continue;
          const dataUrl = await blobToDataUrl(blob);
          const img = await loadImage(dataUrl);
          const imgMaxH = cellH - 10;
          const ratio = Math.min(cellW / img.width, imgMaxH / img.height);
          const w = img.width * ratio,
            h = img.height * ratio;
          const ix = x + (cellW - w) / 2;
          doc.addImage(dataUrl, "JPEG", ix, yy, w, h, undefined, "FAST");
          doc.setFontSize(9);
          doc.setTextColor(110, 110, 110);
          const caption = `${format(parseISO(p.date), "d MMM yyyy", { locale: fr })}${p.legende ? " — " + p.legende : ""}`;
          doc.text(doc.splitTextToSize(caption, cellW), x, yy + h + 5);
        } catch {
          /* ignore */
        }
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
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return "downloaded";
}
