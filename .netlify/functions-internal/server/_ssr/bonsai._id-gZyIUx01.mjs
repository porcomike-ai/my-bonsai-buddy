import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { z as Route, B as Button, h as saveBonsai, C as deleteBonsai, q as cn, x as getBonsai, v as getPoterie, d as listJournal, b as listRappels, c as listPhotos, y as getPhotoBlob } from "./router-DayW0770.mjs";
import { A as AppShell } from "./app-shell-BwtD_V5I.mjs";
import { B as BonsaiForm } from "./bonsai-form-S_l59ESg.mjs";
import { B as BonsaiPhoto } from "./bonsai-photo-D7bdanHc.mjs";
import { s as styleLabel, e as etapeLabel, c as soinLabel } from "./bonsai-meta-BJOj-HVV.mjs";
import { R as Root2$1, T as Trigger$1, P as Portal2, C as Content2, I as Item2, S as SubTrigger2, a as SubContent2, b as CheckboxItem2, c as ItemIndicator2, d as RadioItem2, L as Label2, e as Separator2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { j as jspdf_node_minExports } from "../_libs/jspdf.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { w as ArrowLeft, x as Pencil, y as Trash2, n as Star, z as Share2, G as Image$1, J as Images, p as ChevronRight, q as Check, C as Circle } from "../_libs/lucide-react.mjs";
import { f as format, a as fr, p as parseISO } from "../_libs/date-fns.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-radio-group.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/react-hook-form.mjs";
import "../_libs/hookform__resolvers.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
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
const DropdownMenu = Root2$1;
const DropdownMenuTrigger = Trigger$1;
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
function SharePdfButton({
  id,
  bonsai,
  photosCount
}) {
  const [busy, setBusy] = reactExports.useState(false);
  const run = async (photos) => {
    setBusy(true);
    try {
      const r = await shareBonsaiPdf(id, bonsai.nom, { photos });
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
function Stat({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5 font-display text-lg font-medium", children: value })
  ] });
}
function BonsaiHeader({
  bonsai: b,
  poterie,
  photosCount,
  onEdit,
  onDelete,
  onToggleFavori,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl border border-border bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BonsaiPhoto, { photoId: b.photoPrincipale, className: "h-full w-full object-cover" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "flex-1", onClick: onEdit, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "mr-1.5 h-4 w-4" }),
          " Modifier"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            "aria-label": "Supprimer ce bonsaï",
            className: "text-destructive hover:text-destructive",
            onClick: onDelete,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SharePdfButton, { id: b.id, bonsai: b, photosCount })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-accent", children: styleLabel(b.style) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl font-semibold leading-tight", children: b.nom }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onToggleFavori,
            "aria-label": b.favori ? "Retirer des favoris" : "Ajouter aux favoris",
            "aria-pressed": !!b.favori,
            title: b.favori ? "Retirer des favoris" : "Ajouter aux favoris",
            className: `inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:bg-secondary ${b.favori ? "text-amber-500" : "text-muted-foreground"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-5 w-5 ${b.favori ? "fill-current" : ""}` })
          }
        ),
        !(b.dansCollection ?? true) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Sorti de la collection" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-lg italic text-muted-foreground", children: b.espece }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Étape", value: etapeLabel(b.etape) }),
        b.ageEstime != null && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Âge", value: `${b.ageEstime} ans` }),
        b.hauteurCm != null && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Hauteur", value: `${b.hauteurCm} cm` }),
        b.dateAcquisition && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Stat,
          {
            label: "Acquis le",
            value: format(parseISO(b.dateAcquisition), "d MMM yyyy", { locale: fr })
          }
        ),
        b.origine && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Origine", value: b.origine }),
        b.prixAchat != null && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Prix d'achat", value: `${b.prixAchat.toLocaleString("fr-FR")} €` }),
        b.valeurEstimee != null && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Valeur estimée", value: `${b.valeurEstimee.toLocaleString("fr-FR")} €` }),
        poterie && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Stat,
          {
            label: "Poterie",
            value: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/poterie/$id",
                params: { id: poterie.id },
                className: "text-accent hover:underline",
                children: poterie.nom
              }
            )
          }
        )
      ] }),
      b.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-border bg-secondary/40 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 whitespace-pre-wrap text-sm leading-relaxed", children: b.notes })
      ] }),
      children
    ] })
  ] });
}
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
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
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
const GalerieTab = reactExports.lazy(() => import("./galerie-tab-D1_cl9N7.mjs"));
const JournalTab = reactExports.lazy(() => import("./journal-tab-D8IS8Fai.mjs"));
const RappelsTab = reactExports.lazy(() => import("./rappels-tab-Di_a4AdT.mjs"));
function TabFallback() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-4 text-sm text-muted-foreground", children: "Chargement…" });
}
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
  const toggleFavori = async () => {
    await saveBonsai({
      ...b,
      favori: !b.favori
    });
    await qc.invalidateQueries();
    toast.success(b.favori ? "Retiré des favoris" : "Ajouté aux favoris");
  };
  const setMainPhoto = async (pid) => {
    const photo = photos.find((p) => p.id === pid);
    if (!photo) return;
    await saveBonsai({
      ...b,
      photoPrincipale: photo.storagePath
    });
    qc.invalidateQueries({
      queryKey: ["bonsai", id]
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 lg:grid-cols-[380px_1fr]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BonsaiHeader, { bonsai: b, poterie, photosCount: photos.length, onEdit: () => setEditing(true), onDelete: remove, onToggleFavori: toggleFavori, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "galerie", className: "mt-10", children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "galerie", className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(TabFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(GalerieTab, { bonsaiId: id, photos, mainId: b.photoPrincipale, onSetMain: setMainPhoto }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "journal", className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(TabFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(JournalTab, { bonsaiId: id, entries }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "rappels", className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(TabFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(RappelsTab, { bonsaiId: id, rappels }) }) })
    ] }) }) })
  ] });
}
export {
  BonsaiDetail as component
};
