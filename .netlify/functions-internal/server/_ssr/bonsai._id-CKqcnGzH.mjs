import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { z as Route, B as Button, i as saveBonsai, A as deleteBonsai, r as cn, L as Label, I as Input, T as Textarea, C as updatePhotoDate, D as updatePhotoLegende, E as deletePhoto, f as fileToBlob, j as savePhoto, u as uid, e as useBlobUrl, k as saveJournal, F as deleteJournal, m as saveRappel, G as deleteRappel, y as getPhotoBlob, x as getBonsai, v as getPoterie, d as listJournal, b as listRappels, c as listPhotos } from "./router-5kye6AS8.mjs";
import { A as AppShell } from "./app-shell-D2hlU-O7.mjs";
import { B as BonsaiPhoto } from "./bonsai-photo-BWTISEsp.mjs";
import { B as BonsaiForm } from "./bonsai-form-z4e98bzh.mjs";
import { s as styleLabel, e as etapeLabel, a as SOINS, b as soinEmoji, c as soinLabel } from "./bonsai-meta-BJOj-HVV.mjs";
import { R as Root2, L as List, T as Trigger$1, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { j as jspdf_node_minExports } from "../_libs/jspdf.mjs";
import { D as Dialog$1, a as DialogPortal$1, b as DialogContent$1, c as DialogClose, d as DialogTitle$1, e as DialogOverlay$1, f as DialogDescription$1 } from "../_libs/radix-ui__react-dialog.mjs";
import { R as RadioGroup$1, a as RadioGroupItem$1, b as RadioGroupIndicator } from "../_libs/radix-ui__react-radio-group.mjs";
import { R as Root2$1, T as Trigger, P as Portal2, C as Content2, I as Item2, S as SubTrigger2, a as SubContent2, b as CheckboxItem2, c as ItemIndicator2, d as RadioItem2, L as Label2, e as Separator2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { t as ArrowLeft, u as Pencil, v as Trash2, k as Star, w as Share2, x as Image$1, y as Images, b as Camera, F as FolderOpen, P as Plus, X, c as Calendar, n as Check, M as MessageSquarePlus, z as Sparkles, G as FileText, J as Loader, Z as ZoomOut, K as ZoomIn, R as RotateCcw, N as Circle, m as ChevronRight } from "../_libs/lucide-react.mjs";
import { f as format, p as parseISO, a as fr, l as addDays } from "../_libs/date-fns.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./client-CWZp_xfH.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/react-hook-form.mjs";
import "../_libs/hookform__resolvers.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "fs";
import "path";
import "../_libs/fflate.mjs";
import "../_libs/fast-png.mjs";
import "../_libs/iobuffer.mjs";
import "../_libs/pako.mjs";
import "../_libs/html2canvas.mjs";
import "../_libs/dompurify.mjs";
import "../_libs/canvg.mjs";
import "../_libs/core-js.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/raf.mjs";
import "../_libs/performance-now.mjs";
import "../_libs/rgbcolor.mjs";
import "../_libs/svg-pathdata.mjs";
import "../_libs/stackblur-canvas.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger$1,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger$1.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
async function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}
async function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}
async function generateBonsaiPdf(bonsaiId, options = {}) {
  const photosOpt = options.photos ?? "principale";
  const b = await getBonsai(bonsaiId);
  if (!b) throw new Error("Bonsaï introuvable");
  const [poterie, journal, rappels, allPhotos] = await Promise.all([
    b.poterieId ? getPoterie(b.poterieId) : Promise.resolve(void 0),
    listJournal(bonsaiId),
    listRappels(bonsaiId),
    photosOpt === "toutes" ? listPhotos(bonsaiId) : Promise.resolve([])
  ]);
  const principalBlob = b.photoPrincipale ? await getPhotoBlob({ storagePath: b.photoPrincipale }) : void 0;
  const doc = new jspdf_node_minExports.jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const margin = 16;
  doc.setFillColor(135, 168, 120);
  doc.rect(0, 0, W, 32, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Bonsaï Studio", margin, 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Fiche récapitulative", margin, 22);
  doc.text(format(/* @__PURE__ */ new Date(), "d MMMM yyyy", { locale: fr }), W - margin, 22, { align: "right" });
  let y = 44;
  doc.setTextColor(40, 40, 40);
  if (principalBlob) {
    try {
      const dataUrl = await blobToDataUrl(principalBlob);
      const img = await loadImage(dataUrl);
      const maxW = 70, maxH = 70;
      const ratio = Math.min(maxW / img.width, maxH / img.height);
      const w = img.width * ratio, h = img.height * ratio;
      doc.addImage(dataUrl, "JPEG", margin, y, w, h, void 0, "FAST");
    } catch {
    }
  }
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
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(10);
  const infos = [];
  if (b.ageEstime != null) infos.push(["Âge estimé", `${b.ageEstime} ans`]);
  if (b.hauteurCm != null) infos.push(["Hauteur", `${b.hauteurCm} cm`]);
  if (b.dateAcquisition)
    infos.push(["Acquis le", format(parseISO(b.dateAcquisition), "d MMM yyyy", { locale: fr })]);
  if (b.origine) infos.push(["Origine", b.origine]);
  if (poterie) infos.push(["Poterie", poterie.nom]);
  infos.push([
    "Statut",
    b.dansCollection ?? true ? "Dans la collection" : "Sorti de la collection"
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
        y
      );
      y += 5;
    }
  }
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Bonsaï Studio — carnet de collection", W / 2, 290, { align: "center" });
  if (photosOpt === "toutes" && allPhotos.length > 0) {
    const H = 297;
    const sorted = [...allPhotos].sort((a, b2) => b2.date.localeCompare(a.date));
    const perPage = 4;
    const cols = 2;
    const gap = 6;
    const availW = W - margin * 2;
    const cellW = (availW - gap) / cols;
    const cellH = 110;
    for (let i = 0; i < sorted.length; i += perPage) {
      doc.addPage();
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
        { align: "right" }
      );
      doc.setTextColor(40, 40, 40);
      const slice = sorted.slice(i, i + perPage);
      for (let k = 0; k < slice.length; k++) {
        const p = slice[k];
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
          const w = img.width * ratio, h = img.height * ratio;
          const ix = x + (cellW - w) / 2;
          doc.addImage(dataUrl, "JPEG", ix, yy, w, h, void 0, "FAST");
          doc.setFontSize(9);
          doc.setTextColor(110, 110, 110);
          const caption = `${format(parseISO(p.date), "d MMM yyyy", { locale: fr })}${p.legende ? " — " + p.legende : ""}`;
          doc.text(doc.splitTextToSize(caption, cellW), x, yy + h + 5);
        } catch {
        }
      }
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Bonsaï Studio — carnet de collection", W / 2, H - 7, { align: "center" });
    }
  }
  return doc.output("blob");
}
function safeFileName(s) {
  return s.replace(/[^a-zA-Z0-9-_]+/g, "-").replace(/^-+|-+$/g, "") || "bonsai";
}
async function shareBonsaiPdf(bonsaiId, bonsaiName, options = {}) {
  const blob = await generateBonsaiPdf(bonsaiId, options);
  const fileName = `bonsai-${safeFileName(bonsaiName)}.pdf`;
  const file = new File([blob], fileName, { type: "application/pdf" });
  const nav = navigator;
  if (nav.share && nav.canShare?.({ files: [file] })) {
    try {
      await nav.share({
        files: [file],
        title: `Fiche bonsaï — ${bonsaiName}`,
        text: `Fiche récapitulative de ${bonsaiName}`
      });
      return "shared";
    } catch (err) {
      if (err?.name === "AbortError") return "shared";
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1e3);
  return "downloaded";
}
const Dialog = Dialog$1;
const DialogPortal = DialogPortal$1;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogOverlay$1,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogOverlay$1.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent$1,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogContent$1.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogTitle$1,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogTitle$1.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogDescription$1,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogDescription$1.displayName;
const RadioGroup = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroup$1, { className: cn("grid gap-2", className), ...props, ref });
});
RadioGroup.displayName = RadioGroup$1.displayName;
const RadioGroupItem = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RadioGroupItem$1,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupIndicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-3.5 w-3.5 fill-primary" }) })
    }
  );
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
async function readExifDate(blob) {
  try {
    const buf = new Uint8Array(await blob.arrayBuffer());
    if (buf.length < 4 || buf[0] !== 255 || buf[1] !== 216) return void 0;
    let offset = 2;
    while (offset < buf.length) {
      if (buf[offset] !== 255) break;
      const marker = buf[offset + 1];
      if (marker !== 225) {
        const segLen = buf[offset + 2] << 8 | buf[offset + 3];
        offset += 2 + segLen;
        continue;
      }
      const segStart = offset + 4;
      const exifHeader = buf.subarray(segStart, segStart + 6);
      if (exifHeader[0] !== 69 || exifHeader[1] !== 120 || exifHeader[2] !== 105 || exifHeader[3] !== 102) {
        return void 0;
      }
      const tiffOffset = segStart + 6;
      const isLittleEndian = buf[tiffOffset] === 73;
      const read16 = (o) => isLittleEndian ? buf[o] | buf[o + 1] << 8 : buf[o] << 8 | buf[o + 1];
      const read32 = (o) => isLittleEndian ? buf[o] | buf[o + 1] << 8 | buf[o + 2] << 16 | buf[o + 3] << 24 : buf[o] << 24 | buf[o + 1] << 16 | buf[o + 2] << 8 | buf[o + 3];
      const ifd0Offset = tiffOffset + read32(tiffOffset + 4);
      const numEntries = read16(ifd0Offset);
      let exifIfdOffset = 0;
      for (let i = 0; i < numEntries; i++) {
        const entryOffset = ifd0Offset + 2 + i * 12;
        const tag = read16(entryOffset);
        if (tag === 34665) {
          exifIfdOffset = tiffOffset + read32(entryOffset + 8);
          break;
        }
      }
      if (!exifIfdOffset) return void 0;
      const exifEntries = read16(exifIfdOffset);
      for (let i = 0; i < exifEntries; i++) {
        const entryOffset = exifIfdOffset + 2 + i * 12;
        const tag = read16(entryOffset);
        if (tag !== 36867 && tag !== 306) continue;
        const type = read16(entryOffset + 2);
        if (type !== 2) continue;
        const valueOffset = read32(entryOffset + 8);
        const strStart = tiffOffset + valueOffset;
        let raw = "";
        for (let j = 0; j < 20; j++) {
          const c = buf[strStart + j];
          if (c === 0) break;
          raw += String.fromCharCode(c);
        }
        const m = raw.trim().match(/^(\d{4}):(\d{2}):(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/);
        if (m) {
          return `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}`;
        }
        const m2 = raw.trim().match(/^(\d{4}):(\d{2}):(\d{2})/);
        if (m2) {
          return `${m2[1]}-${m2[2]}-${m2[3]}T12:00:00`;
        }
      }
      return void 0;
    }
  } catch {
  }
  return void 0;
}
function dateFromFilename(name) {
  const patterns = [
    /(?:^|[_\-\s])(\d{4})(\d{2})(\d{2})(?:[_\-\s.]|$)/,
    // YYYYMMDD
    /(?:^|[_\-\s])(\d{4})-(\d{2})-(\d{2})(?:[_\-\s.]|$)/
    // YYYY-MM-DD
  ];
  for (const re of patterns) {
    const m = name.match(re);
    if (!m) continue;
    const year = Number(m[1]);
    const month = Number(m[2]);
    const day = Number(m[3]);
    if (month < 1 || month > 12 || day < 1 || day > 31) continue;
    const d = new Date(year, month - 1, day, 12, 0, 0);
    if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) continue;
    return d.toISOString();
  }
  return void 0;
}
function AddPhotoDialog({
  open,
  onOpenChange,
  source,
  file,
  onConfirm
}) {
  const [preview, setPreview] = reactExports.useState(void 0);
  const [blob, setBlob] = reactExports.useState(null);
  const [exifDate, setExifDate] = reactExports.useState(void 0);
  const [filenameDate, setFilenameDate] = reactExports.useState(void 0);
  const [selectedMode, setSelectedMode] = reactExports.useState("today");
  const [customDate, setCustomDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [legende, setLegende] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!open || !file) {
      setBlob(null);
      setPreview(void 0);
      setExifDate(void 0);
      setFilenameDate(void 0);
      setLegende("");
      return;
    }
    let cancelled = false;
    (async () => {
      const url = URL.createObjectURL(file);
      if (!cancelled) setPreview(url);
      const processed = await fileToBlob(file);
      if (cancelled) return;
      setBlob(processed);
      if (source === "gallery") {
        const [exif, fromName] = await Promise.all([
          readExifDate(file),
          Promise.resolve(dateFromFilename(file.name))
        ]);
        if (cancelled) return;
        setExifDate(exif);
        setFilenameDate(fromName);
        if (exif) setSelectedMode("exif");
        else if (fromName) setSelectedMode("filename");
        else setSelectedMode("custom");
      } else {
        setSelectedMode("today");
      }
      setCustomDate((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
    })();
    return () => {
      cancelled = true;
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [open, file, source]);
  const options = source === "camera" ? [
    {
      mode: "today",
      label: `Aujourd'hui — ${format(/* @__PURE__ */ new Date(), "d MMMM yyyy", { locale: fr })}`,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      available: true
    }
  ] : [
    {
      mode: "exif",
      label: exifDate ? `Date de prise de vue (EXIF) — ${format(parseISO(exifDate), "d MMMM yyyy 'à' HH:mm", { locale: fr })}` : "Date de prise de vue d'origine (EXIF indisponible)",
      date: exifDate,
      available: !!exifDate
    },
    {
      mode: "filename",
      label: filenameDate ? `Date détectée dans le nom — ${format(parseISO(filenameDate), "d MMMM yyyy", { locale: fr })}` : "Aucune date détectée dans le nom du fichier",
      date: filenameDate,
      available: !!filenameDate
    },
    { mode: "custom", label: "Date personnalisée", date: void 0, available: true }
  ];
  const selectedDate = selectedMode === "today" ? (/* @__PURE__ */ new Date()).toISOString() : selectedMode === "custom" ? (/* @__PURE__ */ new Date(customDate + "T12:00:00")).toISOString() : options.find((o) => o.mode === selectedMode)?.date ?? (/* @__PURE__ */ new Date()).toISOString();
  const submit = async () => {
    if (!blob) return;
    setBusy(true);
    try {
      await onConfirm({ blob, date: selectedDate, legende: legende.trim() });
      onOpenChange(false);
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] overflow-y-auto sm:max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
      source === "camera" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }),
      source === "camera" ? "Photo prise à l'instant" : "Importer une photo"
    ] }) }),
    preview && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview, alt: "Aperçu", className: "max-h-64 w-full object-contain" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-1.5 text-sm font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
        "Date de la photo"
      ] }),
      source === "camera" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl bg-secondary/50 px-3 py-2 text-sm text-muted-foreground", children: options[0].label }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        RadioGroup,
        {
          value: selectedMode,
          onValueChange: (v) => setSelectedMode(v),
          className: "space-y-2",
          children: options.map((opt) => {
            const id = `date-opt-${opt.mode}`;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center gap-3 rounded-xl border px-3 py-2.5 transition ${opt.available ? "border-border hover:border-accent/40" : "cursor-not-allowed border-border/40 opacity-50"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: opt.mode, id, disabled: !opt.available }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: id,
                      className: `flex-1 text-sm ${opt.available ? "cursor-pointer" : ""}`,
                      children: opt.label
                    }
                  )
                ]
              },
              opt.mode
            );
          })
        }
      ),
      selectedMode === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "date",
          value: customDate,
          onChange: (e) => setCustomDate(e.target.value),
          className: "w-auto"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "legende", className: "flex items-center gap-1.5 text-sm font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }),
        "Commentaire / Note"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "legende",
          value: legende,
          onChange: (e) => setLegende(e.target.value),
          rows: 2,
          placeholder: "Décrivez le soin ou l'état de l'arbre à cet instant…"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), disabled: busy, children: "Annuler" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, disabled: !blob || busy, children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { className: "mr-1.5 h-4 w-4 animate-spin" }),
        " Enregistrement…"
      ] }) : "Enregistrer la photo" })
    ] })
  ] }) });
}
function useFileInput() {
  const [file, setFile] = reactExports.useState(null);
  const inputRef = reactExports.useRef(null);
  const reset = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };
  return { file, setFile, inputRef, reset };
}
const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.4;
function PhotoLightbox({ photo, open, onOpenChange }) {
  const [zoom, setZoom] = reactExports.useState(1);
  const [offset, setOffset] = reactExports.useState({ x: 0, y: 0 });
  const containerRef = reactExports.useRef(null);
  const imgRef = reactExports.useRef(null);
  const touchState = reactExports.useRef({
    mode: "none",
    startX: 0,
    startY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
    startDist: 0,
    startZoom: 1
  });
  const panState = reactExports.useRef({
    active: false,
    startX: 0,
    startY: 0,
    startOffsetX: 0,
    startOffsetY: 0
  });
  const [blob, setBlob] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    if (!open || !photo) {
      setBlob(void 0);
      return;
    }
    let cancelled = false;
    import("./router-5kye6AS8.mjs").then((n) => n.H).then(({ getPhotoBlob: getPhotoBlob2 }) => getPhotoBlob2(photo)).then((b) => {
      if (!cancelled) setBlob(b);
    }).catch(() => {
      if (!cancelled) setBlob(void 0);
    });
    return () => {
      cancelled = true;
    };
  }, [open, photo]);
  const url = useBlobUrl(blob);
  reactExports.useEffect(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, [photo, open]);
  const clampOffset = reactExports.useCallback((x, y, z) => {
    if (!containerRef.current || !imgRef.current) return { x, y };
    const cw = containerRef.current.clientWidth;
    const ch = containerRef.current.clientHeight;
    const iw = imgRef.current.naturalWidth * z;
    const ih = imgRef.current.naturalHeight * z;
    const maxX = iw > cw ? (iw - cw) / 2 : 0;
    const maxY = ih > ch ? (ih - ch) / 2 : 0;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y))
    };
  }, []);
  const setZoomClamped = reactExports.useCallback(
    (newZoom, centerOffsetX = 0, centerOffsetY = 0) => {
      const z = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
      setZoom(z);
      setOffset((prev) => {
        const factor = z / (zoom || 1);
        return clampOffset(
          (prev.x - centerOffsetX) * factor + centerOffsetX,
          (prev.y - centerOffsetY) * factor + centerOffsetY,
          z
        );
      });
    },
    [zoom, clampOffset]
  );
  const zoomIn = () => setZoomClamped(zoom + ZOOM_STEP);
  const zoomOut = () => setZoomClamped(zoom - ZOOM_STEP);
  const resetZoom = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };
  const onWheel = (e) => {
    if (!open) return;
    e.preventDefault();
    const delta = -e.deltaY * 25e-4;
    setZoomClamped(zoom + delta * 5);
  };
  const onMouseDown = (e) => {
    if (zoom <= 1) return;
    panState.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startOffsetX: offset.x,
      startOffsetY: offset.y
    };
  };
  const onMouseMove = (e) => {
    if (!panState.current.active) return;
    const dx = e.clientX - panState.current.startX;
    const dy = e.clientY - panState.current.startY;
    setOffset(
      clampOffset(panState.current.startOffsetX + dx, panState.current.startOffsetY + dy, zoom)
    );
  };
  const onMouseUp = () => {
    panState.current.active = false;
  };
  const onTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchState.current = {
        mode: "pan",
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        startOffsetX: offset.x,
        startOffsetY: offset.y,
        startDist: 0,
        startZoom: zoom
      };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchState.current = {
        mode: "pinch",
        startX: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        startY: (e.touches[0].clientY + e.touches[1].clientY) / 2,
        startOffsetX: offset.x,
        startOffsetY: offset.y,
        startDist: Math.hypot(dx, dy),
        startZoom: zoom
      };
    }
  };
  const onTouchMove = (e) => {
    const ts = touchState.current;
    if (ts.mode === "pan" && e.touches.length === 1) {
      const dx = e.touches[0].clientX - ts.startX;
      const dy = e.touches[0].clientY - ts.startY;
      setOffset(clampOffset(ts.startOffsetX + dx, ts.startOffsetY + dy, zoom));
    } else if (ts.mode === "pinch" && e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const scale = dist / (ts.startDist || 1);
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, ts.startZoom * scale));
      setZoom(newZoom);
    }
  };
  const onTouchEnd = () => {
    touchState.current.mode = "none";
  };
  const canPan = zoom > 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "flex h-[100vh] max-h-[100vh] w-[100vw] max-w-[100vw] flex-col gap-0 overflow-hidden rounded-none border-none bg-background/95 p-0 backdrop-blur-sm",
      onPointerDownOutside: (e) => e.preventDefault(),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "sr-only", children: "Visionneuse de photo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "secondary",
            size: "icon",
            onClick: () => onOpenChange(false),
            className: "absolute right-4 top-4 z-20 h-10 w-10 rounded-full shadow-lg",
            "aria-label": "Fermer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-4 top-4 z-20 flex gap-2 rounded-full bg-secondary/90 p-1.5 shadow-lg backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: zoomOut,
              disabled: zoom <= MIN_ZOOM,
              className: "h-8 w-8 rounded-full",
              "aria-label": "Dézoomer",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomOut, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: zoomIn,
              disabled: zoom >= MAX_ZOOM,
              className: "h-8 w-8 rounded-full",
              "aria-label": "Zoomer",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: resetZoom,
              disabled: zoom === 1 && offset.x === 0 && offset.y === 0,
              className: "h-8 w-8 rounded-full",
              "aria-label": "Réinitialiser le zoom",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: containerRef,
            className: "relative flex flex-1 items-center justify-center overflow-hidden",
            onWheel,
            onMouseDown,
            onMouseMove,
            onMouseUp,
            onMouseLeave: onMouseUp,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            style: {
              cursor: canPan ? panState.current.active ? "grabbing" : "grab" : "default"
            },
            children: url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                ref: imgRef,
                src: url,
                alt: photo?.legende ?? "",
                draggable: false,
                className: "max-h-full max-w-full select-none object-contain transition-transform duration-100",
                style: {
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                  transformOrigin: "center center",
                  touchAction: "none"
                }
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Chargement…" })
          }
        ),
        photo && (photo.date || photo.legende) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/60 to-transparent px-6 pb-8 pt-12 text-white", children: [
          photo.date && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-white/80", children: format(parseISO(photo.date), "d MMMM yyyy 'à' HH:mm", { locale: fr }) }),
          photo.legende && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-white/95", children: photo.legende })
        ] })
      ]
    }
  ) });
}
const DropdownMenu = Root2$1;
const DropdownMenuTrigger = Trigger;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
function BonsaiDetail() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [editing, setEditing] = reactExports.useState(false);
  const {
    data: b,
    isPending
  } = useQuery({
    queryKey: ["bonsai", id],
    queryFn: () => getBonsai(id)
  });
  const {
    data: photos = []
  } = useQuery({
    queryKey: ["photos", id],
    queryFn: () => listPhotos(id)
  });
  const {
    data: entries = []
  } = useQuery({
    queryKey: ["journal", id],
    queryFn: () => listJournal(id)
  });
  const {
    data: rappels = []
  } = useQuery({
    queryKey: ["rappels", id],
    queryFn: () => listRappels(id)
  });
  const {
    data: poterie
  } = useQuery({
    queryKey: ["poterie", b?.poterieId],
    queryFn: () => b?.poterieId ? getPoterie(b.poterieId) : null,
    enabled: !!b?.poterieId
  });
  if (isPending) return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Chargement…" }) });
  if (!b) return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Bonsaï introuvable." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collection", className: "text-accent", children: "Retour à la collection" })
  ] });
  const remove = async () => {
    if (!confirm(`Supprimer définitivement « ${b.nom} » et toutes ses données ?`)) return;
    await deleteBonsai(id);
    await qc.invalidateQueries();
    toast.success("Bonsaï supprimé");
    navigate({
      to: "/collection"
    });
  };
  if (editing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing(false), className: "mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Annuler la modification"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl font-semibold", children: [
        "Modifier « ",
        b.nom,
        " »"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BonsaiForm, { initial: b, onSaved: () => {
        setEditing(false);
        qc.invalidateQueries();
      } }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/collection", className: "mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Collection"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[380px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl border border-border bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BonsaiPhoto, { photoId: b.photoPrincipale, className: "h-full w-full object-cover" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "flex-1", onClick: () => setEditing(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "mr-1.5 h-4 w-4" }),
            " Modifier"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", "aria-label": "Supprimer ce bonsaï", className: "text-destructive hover:text-destructive", onClick: remove, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SharePdfButton, { id, bonsai: b, photosCount: photos.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-accent", children: styleLabel(b.style) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl font-semibold leading-tight", children: b.nom }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: async () => {
            await saveBonsai({
              ...b,
              favori: !b.favori
            });
            await qc.invalidateQueries();
            toast.success(b.favori ? "Retiré des favoris" : "Ajouté aux favoris");
          }, "aria-label": b.favori ? "Retirer des favoris" : "Ajouter aux favoris", "aria-pressed": !!b.favori, title: b.favori ? "Retirer des favoris" : "Ajouter aux favoris", className: `inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:bg-secondary ${b.favori ? "text-amber-500" : "text-muted-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-5 w-5 ${b.favori ? "fill-current" : ""}` }) }),
          !(b.dansCollection ?? true) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Sorti de la collection" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-lg italic text-muted-foreground", children: b.espece }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Étape", value: etapeLabel(b.etape) }),
          b.ageEstime != null && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Âge", value: `${b.ageEstime} ans` }),
          b.hauteurCm != null && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Hauteur", value: `${b.hauteurCm} cm` }),
          b.dateAcquisition && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Acquis le", value: format(parseISO(b.dateAcquisition), "d MMM yyyy", {
            locale: fr
          }) }),
          b.origine && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Origine", value: b.origine }),
          b.prixAchat != null && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Prix d'achat", value: `${b.prixAchat.toLocaleString("fr-FR")} €` }),
          b.valeurEstimee != null && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Valeur estimée", value: `${b.valeurEstimee.toLocaleString("fr-FR")} €` }),
          poterie && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Poterie", value: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/poterie/$id", params: {
            id: poterie.id
          }, className: "text-accent hover:underline", children: poterie.nom }) })
        ] }),
        b.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-border bg-secondary/40 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 whitespace-pre-wrap text-sm leading-relaxed", children: b.notes })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "galerie", className: "mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-secondary/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "galerie", children: [
              "Galerie (",
              photos.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "journal", children: [
              "Journal (",
              entries.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "rappels", children: [
              "Rappels (",
              rappels.filter((r) => r.actif).length,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "galerie", className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GalerieTab, { bonsaiId: id, photos, mainId: b.photoPrincipale, onSetMain: async (pid) => {
            await saveBonsai({
              ...b,
              photoPrincipale: pid
            });
            qc.invalidateQueries();
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "journal", className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JournalTab, { bonsaiId: id, entries }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "rappels", className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RappelsTab, { bonsaiId: id, rappels }) })
        ] })
      ] })
    ] })
  ] });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5 font-display text-lg font-medium", children: value })
  ] });
}
function SharePdfButton({
  id,
  bonsai,
  photosCount
}) {
  const [busy, setBusy] = reactExports.useState(false);
  const run = async (photos) => {
    setBusy(true);
    try {
      const r = await shareBonsaiPdf(id, bonsai.nom, {
        photos
      });
      toast.success(r === "shared" ? "Fiche partagée" : "Fiche téléchargée");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-2 w-full", disabled: busy, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "mr-1.5 h-4 w-4" }),
      " ",
      busy ? "Génération…" : "Partager la fiche"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-64", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => run("principale"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Image$1, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Photo principale" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Fiche compacte sur 1 page" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => run("toutes"), disabled: photosCount === 0, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Images, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Toutes les photos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: photosCount > 0 ? `Inclut la galerie (${photosCount})` : "Aucune photo dans la galerie" })
        ] })
      ] })
    ] })
  ] });
}
function GalerieTab({
  bonsaiId,
  photos,
  mainId,
  onSetMain
}) {
  const qc = useQueryClient();
  const cameraInput = useFileInput();
  const galleryInput = useFileInput();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [dialogSource, setDialogSource] = reactExports.useState("camera");
  const dialogFile = dialogSource === "camera" ? cameraInput.file : galleryInput.file;
  const openCamera = () => {
    setDialogSource("camera");
    cameraInput.inputRef.current?.click();
  };
  const openGallery = () => {
    setDialogSource("gallery");
    galleryInput.inputRef.current?.click();
  };
  reactExports.useEffect(() => {
    if (dialogFile) setDialogOpen(true);
  }, [dialogFile]);
  const onConfirm = async ({
    blob,
    date,
    legende
  }) => {
    await savePhoto({
      id: uid(),
      bonsaiId,
      blob,
      date,
      legende: legende || void 0
    });
    qc.invalidateQueries({
      queryKey: ["photos", bonsaiId]
    });
    toast.success("Photo ajoutée");
    cameraInput.reset();
    galleryInput.reset();
  };
  const [lightboxPhoto, setLightboxPhoto] = reactExports.useState(null);
  const remove = async (pid) => {
    if (!confirm("Supprimer cette photo ?")) return;
    await deletePhoto(pid);
    qc.invalidateQueries({
      queryKey: ["photos", bonsaiId]
    });
  };
  const updateLegende = async (p, legende) => {
    await updatePhotoLegende(p.id, legende || null);
    qc.invalidateQueries({
      queryKey: ["photos", bonsaiId]
    });
  };
  const updateDate = async (p, date) => {
    await updatePhotoDate(p.id, date);
    qc.invalidateQueries({
      queryKey: ["photos", bonsaiId]
    });
  };
  const [sortDesc, setSortDesc] = reactExports.useState(true);
  const sorted = [...photos].sort((a, b) => sortDesc ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: cameraInput.inputRef, type: "file", accept: "image/*", capture: "environment", className: "hidden", onChange: (e) => {
      const f = e.target.files?.[0];
      if (f) cameraInput.setFile(f);
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: galleryInput.inputRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => {
      const f = e.target.files?.[0];
      if (f) galleryInput.setFile(f);
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: openCamera, className: "flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-4 py-5 text-sm font-medium text-muted-foreground transition hover:border-accent/60 hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-4 w-4" }),
        " Appareil photo"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: openGallery, className: "flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-4 py-5 text-sm font-medium text-muted-foreground transition hover:border-accent/60 hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-4 w-4" }),
        " Galerie"
      ] })
    ] }),
    sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucune photo pour l'instant. Documentez l'évolution de votre arbre." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setSortDesc((s) => !s), children: [
        "Date : ",
        sortDesc ? "plus récentes d'abord" : "plus anciennes d'abord"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-6 border-l border-border pl-6", children: sorted.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoTimeline, { p, isMain: p.id === mainId, onSetMain: () => onSetMain(p.id), onDelete: () => remove(p.id), onLegende: (t) => updateLegende(p, t), onDate: (d) => updateDate(p, d), onOpenLightbox: () => setLightboxPhoto(p) }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddPhotoDialog, { open: dialogOpen, onOpenChange: setDialogOpen, source: dialogSource, file: dialogFile, onConfirm }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoLightbox, { photo: lightboxPhoto, open: !!lightboxPhoto, onOpenChange: (o) => {
      if (!o) setLightboxPhoto(null);
    } })
  ] });
}
function usePhotoUrl(photo) {
  const [blob, setBlob] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    let cancelled = false;
    if (!photo) {
      setBlob(void 0);
      return;
    }
    getPhotoBlob(photo).then((b) => {
      if (!cancelled) setBlob(b);
    }).catch(() => {
      if (!cancelled) setBlob(void 0);
    });
    return () => {
      cancelled = true;
    };
  }, [photo]);
  return useBlobUrl(blob);
}
function PhotoTimeline({
  p,
  isMain,
  onSetMain,
  onDelete,
  onLegende,
  onDate,
  onOpenLightbox
}) {
  const url = usePhotoUrl(p);
  const [editing, setEditing] = reactExports.useState(false);
  const [draft, setDraft] = reactExports.useState(p.legende ?? "");
  const [editingDate, setEditingDate] = reactExports.useState(false);
  const save = async () => {
    await onLegende(draft.trim());
    setEditing(false);
    toast.success("Commentaire enregistré");
  };
  const saveDate = async (value) => {
    if (!value) return;
    const iso = new Date(value).toISOString();
    await onDate(iso);
    setEditingDate(false);
    toast.success("Date mise à jour");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-background" }),
    editingDate ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", defaultValue: p.date.slice(0, 10), className: "h-8 w-auto", autoFocus: true, onBlur: (e) => saveDate(e.target.value), onKeyDown: (e) => {
        if (e.key === "Enter") saveDate(e.target.value);
        if (e.key === "Escape") setEditingDate(false);
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => setEditingDate(false), children: "Annuler" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditingDate(true), className: "inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground", title: "Modifier la date", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
      format(parseISO(p.date), "d MMMM yyyy", {
        locale: fr
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 overflow-hidden rounded-2xl border border-border bg-card", children: [
      url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: p.legende ?? "", loading: "lazy", onClick: onOpenLightbox, className: "max-h-96 w-full cursor-zoom-in object-contain transition hover:opacity-95", decoding: "async" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-3", children: [
        editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: draft, onChange: (e) => setDraft(e.target.value), rows: 2, placeholder: "Votre commentaire sur cette photo…", autoFocus: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
              setDraft(p.legende ?? "");
              setEditing(false);
            }, children: "Annuler" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: save, children: "Enregistrer" })
          ] })
        ] }) : p.legende ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setDraft(p.legende ?? "");
          setEditing(true);
        }, className: "block w-full whitespace-pre-wrap rounded-md bg-secondary/40 px-3 py-2 text-left text-sm leading-relaxed text-foreground/90 hover:bg-secondary/60", children: p.legende }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          setDraft("");
          setEditing(true);
        }, className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquarePlus, { className: "h-3.5 w-3.5" }),
          " Ajouter un commentaire"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          isMain ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent", children: "Photo principale" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: onSetMain, children: "Définir comme principale" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", "aria-label": "Supprimer cette photo", onClick: onDelete, className: "text-destructive hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] })
  ] });
}
function JournalTab({
  bonsaiId,
  entries
}) {
  const qc = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const [type, setType] = reactExports.useState("arrosage");
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [notes, setNotes] = reactExports.useState("");
  const add = async () => {
    await saveJournal({
      id: uid(),
      bonsaiId,
      type,
      date: new Date(date).toISOString(),
      notes: notes || void 0
    });
    qc.invalidateQueries();
    setOpen(false);
    setNotes("");
    toast.success("Entrée ajoutée");
  };
  const remove = async (eid) => {
    await deleteJournal(eid);
    qc.invalidateQueries();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    !open ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setOpen(true), className: "mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
      " Nouvelle entrée"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 space-y-3 rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Type de soin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: type, onChange: (e) => setType(e.target.value), className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm", children: SOINS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: s.value, children: [
            s.emoji,
            " ",
            s.label
          ] }, s.value)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Notes (facultatif)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: notes, onChange: (e) => setNotes(e.target.value), rows: 3, placeholder: "Observations, dosage, météo…" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: add, children: "Enregistrer" })
      ] })
    ] }),
    entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucun entretien consigné. Notez votre prochain arrosage, taille ou rempotage." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: entries.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 rounded-xl border border-border bg-card p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-base", children: soinEmoji(e.type) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: soinLabel(e.type) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: format(parseISO(e.date), "d MMM yyyy", {
            locale: fr
          }) })
        ] }),
        e.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 whitespace-pre-wrap text-sm text-muted-foreground", children: e.notes })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => remove(e.id), className: "text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
    ] }, e.id)) })
  ] });
}
function RappelsTab({
  bonsaiId,
  rappels
}) {
  const qc = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const [type, setType] = reactExports.useState("arrosage");
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [intervalle, setIntervalle] = reactExports.useState("");
  const add = async () => {
    await saveRappel({
      id: uid(),
      bonsaiId,
      type,
      prochaineDate: new Date(date).toISOString(),
      intervalleJours: intervalle ? Number(intervalle) : void 0,
      actif: true
    });
    qc.invalidateQueries();
    setOpen(false);
    setIntervalle("");
    toast.success("Rappel créé");
  };
  const markDone = async (r) => {
    await saveJournal({
      id: uid(),
      bonsaiId,
      type: r.type,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      rappelId: r.id
    });
    if (r.intervalleJours) {
      await saveRappel({
        ...r,
        prochaineDate: addDays(/* @__PURE__ */ new Date(), r.intervalleJours).toISOString()
      });
    } else {
      await saveRappel({
        ...r,
        actif: false
      });
    }
    qc.invalidateQueries();
    toast.success("Soin effectué");
  };
  const remove = async (rid) => {
    await deleteRappel(rid);
    qc.invalidateQueries();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    !open ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setOpen(true), className: "mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
      " Nouveau rappel"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 space-y-3 rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: type, onChange: (e) => setType(e.target.value), className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm", children: SOINS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: s.value, children: [
            s.emoji,
            " ",
            s.label
          ] }, s.value)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Prochaine date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Répéter tous les (jours)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, placeholder: "ex. 2", value: intervalle, onChange: (e) => setIntervalle(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: add, children: "Créer le rappel" })
      ] })
    ] }),
    rappels.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucun rappel. Programmez par exemple un arrosage tous les 2 jours." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: rappels.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: `flex items-center gap-3 rounded-xl border bg-card p-3 ${r.actif ? "border-border" : "border-border/40 opacity-60"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-base", children: soinEmoji(r.type) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: soinLabel(r.type) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mr-1 inline h-3 w-3" }),
          format(parseISO(r.prochaineDate), "EEEE d MMMM yyyy", {
            locale: fr
          }),
          r.intervalleJours ? ` · tous les ${r.intervalleJours} j` : ""
        ] })
      ] }),
      r.actif && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => markDone(r), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1 h-4 w-4" }),
        " Fait"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => remove(r.id), className: "text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
    ] }, r.id)) })
  ] });
}
export {
  BonsaiDetail as component
};
