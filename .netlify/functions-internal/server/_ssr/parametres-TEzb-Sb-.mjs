import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AppShell } from "./app-shell-CiPQIcjs.mjs";
import { k as useAuth, B as Button, r as saveBonsai, v as savePhoto, t as savePoterie, d as cn, D as Dialog, A as DialogTrigger, C as DialogContent, E as DialogHeader, F as DialogTitle, G as DialogDescription, H as RadioGroup, J as RadioGroupItem, L as Label, I as Input, K as DialogFooter, l as listBonsais$1, a as listPoteries$1, n as listAllPhotos, o as listAllPoteriePhotos, p as getPhotoBlob, q as getPoteriePhoto, x as listPhotos$1, M as listPoteriePhotos, y as getPoterie, c as styleLabel, z as etapeLabel, j as ageActuel, b as soinLabel, w as savePoterieGalleryPhoto } from "./router-Dgs5QC_7.mjs";
import { C as Checkbox } from "./checkbox-KC5I_3te.mjs";
import { R as Root, I as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { u as useConfirm } from "./confirm-dialog-qMBn7-_d.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { J as JSZip } from "../_libs/jszip.mjs";
import { s as saveJournal, l as listJournal$1 } from "./journal-BAlYNI2g.mjs";
import { s as saveRappel, l as listRappels$1 } from "./rappel-DXFdD1h8.mjs";
import { s as sanitizeForFilesystem } from "./folder-name-GYMsNziU.mjs";
import { s as saveEvenement, l as listEvenements$1 } from "./evenement-Ck5gEObw.mjs";
import { o as openDB } from "../_libs/idb.mjs";
import { s as supabase } from "./client-CWZp_xfH.mjs";
import "../_libs/lovable.dev__mcp-js.mjs";
import "../_libs/modelcontextprotocol__sdk.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/ajv-formats.mjs";
import { s as LogOut, B as Bell, t as BellOff, u as CircleAlert, D as Database, v as CloudUpload, H as HardDriveDownload, w as HardDriveUpload, x as FolderArchive, y as Info } from "../_libs/lucide-react.mjs";
import { f as format, p as parseISO, a as fr } from "../_libs/date-fns.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-radio-group.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/zod.mjs";
import "../_libs/jose.mjs";
import "../_libs/ajv.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/json-schema-traverse.mjs";
import "../_libs/fast-uri.mjs";
import "../_libs/radix-ui__react-checkbox.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/readable-stream.mjs";
import "events";
import "node:string_decoder";
import "../_libs/process-nextick-args.mjs";
import "../_libs/isarray.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/core-util-is.mjs";
import "../_libs/inherits.mjs";
import "../_libs/util-deprecate.mjs";
import "../_libs/lie.mjs";
import "../_libs/immediate.mjs";
import "../_libs/setimmediate.mjs";
import "../_libs/pako.mjs";
async function resizeImageToBlob(blob, maxDimension = 1280, quality = 0.7) {
  try {
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Image illisible"));
      el.src = dataUrl;
    });
    const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
    if (scale >= 1) return blob;
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return blob;
    ctx.drawImage(img, 0, 0, w, h);
    const resized = await new Promise(
      (resolve) => canvas.toBlob((b) => resolve(b), "image/jpeg", quality)
    );
    return resized ?? blob;
  } catch {
    return blob;
  }
}
function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "taille inconnue";
  if (bytes < 1024) return `${bytes} o`;
  const units = ["Ko", "Mo", "Go"];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unitIndex]}`;
}
async function getBackupSummary() {
  const [bonsais, photos, poteries, poteriePhotos, journal, rappels, evenements] = await Promise.all([
    listBonsais$1(),
    listAllPhotos(),
    listPoteries$1(),
    listAllPoteriePhotos(),
    listJournal$1(),
    listRappels$1(),
    listEvenements$1()
  ]);
  return {
    bonsais: bonsais.length,
    photos: photos.length,
    poteries: poteries.length,
    poteriePhotos: poteriePhotos.length,
    journal: journal.length,
    rappels: rappels.length,
    evenements: evenements.length
  };
}
async function blobToBase64(blob) {
  const buf = new Uint8Array(await blob.arrayBuffer());
  let bin = "";
  const chunk = 32768;
  for (let i = 0; i < buf.length; i += chunk) {
    bin += String.fromCharCode(...buf.subarray(i, i + chunk));
  }
  return { data: btoa(bin), type: blob.type || "application/octet-stream" };
}
function base64ToBlob(data, type) {
  const bin = atob(data);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return new Blob([buf], { type });
}
async function exportSupabaseBackup(options = {}) {
  const { onProgress, compressPhotos = false } = options;
  const [bonsais, poteries, journal, rappels, evenements] = await Promise.all([
    listBonsais$1(),
    listPoteries$1(),
    listJournal$1(),
    listRappels$1(),
    listEvenements$1()
  ]);
  const allPhotos = await listAllPhotos();
  const allPoteriePhotos = await listAllPoteriePhotos();
  const total = allPhotos.length + allPoteriePhotos.length + poteries.length;
  let current = 0;
  onProgress?.({ phase: "donnees", current, total: total || 1 });
  const photosEnc = await Promise.all(
    allPhotos.map(async (p) => {
      const blob = await getPhotoBlob(p);
      const finalBlob = blob && compressPhotos ? await resizeImageToBlob(blob, 1280, 0.7) : blob;
      const { data, type } = finalBlob ? await blobToBase64(finalBlob) : { data: "", type: "application/octet-stream" };
      current += 1;
      onProgress?.({ phase: "photos", current, total: total || 1 });
      const { storagePath: _drop, ...rest } = p;
      return { ...rest, blobBase64: data, blobType: type };
    })
  );
  const poteriePhotosEnc = await Promise.all(
    allPoteriePhotos.map(async (p) => {
      const blob = await getPhotoBlob(p);
      const finalBlob = blob && compressPhotos ? await resizeImageToBlob(blob, 1280, 0.7) : blob;
      const { data, type } = finalBlob ? await blobToBase64(finalBlob) : { data: "", type: "application/octet-stream" };
      current += 1;
      onProgress?.({ phase: "photos", current, total: total || 1 });
      const { storagePath: _drop, ...rest } = p;
      return { ...rest, blobBase64: data, blobType: type };
    })
  );
  const poteriesEnc = await Promise.all(
    poteries.map(async (p) => {
      const { photoPath: _drop, ...rest } = p;
      const blob = await getPoteriePhoto(p);
      current += 1;
      onProgress?.({ phase: "poteries", current, total: total || 1 });
      if (!blob) return rest;
      const finalBlob = compressPhotos ? await resizeImageToBlob(blob, 1280, 0.7) : blob;
      const { data, type } = await blobToBase64(finalBlob);
      return { ...rest, photoBlobBase64: data, photoBlobType: type };
    })
  );
  return {
    version: 1,
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    bonsais,
    poteries: poteriesEnc,
    photos: photosEnc,
    poteriePhotos: poteriePhotosEnc,
    journal,
    rappels,
    evenements
  };
}
async function importSupabaseBackup(payload, options = {}) {
  if (payload.version !== 1) throw new Error("Version de sauvegarde non prise en charge");
  const { onProgress } = options;
  const IMPORT_BATCH_SIZE = 15;
  async function runBatched(items, fn) {
    for (let i = 0; i < items.length; i += IMPORT_BATCH_SIZE) {
      await Promise.all(items.slice(i, i + IMPORT_BATCH_SIZE).map(fn));
    }
  }
  const total = payload.bonsais.length + payload.journal.length + payload.rappels.length + (payload.evenements?.length ?? 0) + payload.poteries.length + payload.photos.length + (payload.poteriePhotos?.length ?? 0);
  let current = 0;
  const step = (phase) => {
    current += 1;
    onProgress?.({ phase, current, total: total || 1 });
  };
  await runBatched(payload.bonsais, async (b) => {
    await saveBonsai(b);
    step("donnees");
  });
  await runBatched(payload.journal, async (j) => {
    await saveJournal(j);
    step("donnees");
  });
  await runBatched(payload.rappels, async (r) => {
    await saveRappel(r);
    step("donnees");
  });
  await runBatched(payload.evenements ?? [], async (e) => {
    await saveEvenement(e);
    step("donnees");
  });
  await runBatched(payload.poteries, async (p) => {
    const { photoBlobBase64, photoBlobType, ...rest } = p;
    const poterie = { ...rest };
    if (photoBlobBase64) {
      poterie.photoBlob = base64ToBlob(photoBlobBase64, photoBlobType || "image/jpeg");
    }
    await savePoterie(poterie);
    step("poteries");
  });
  await runBatched(payload.photos, async (p) => {
    const { blobBase64, blobType, ...rest } = p;
    if (!blobBase64) {
      step("photos");
      return;
    }
    const blob = base64ToBlob(blobBase64, blobType);
    await savePhoto({ ...rest, blob });
    step("photos");
  });
  await runBatched(payload.poteriePhotos ?? [], async (p) => {
    const { blobBase64, blobType, ...rest } = p;
    if (!blobBase64) {
      step("photos");
      return;
    }
    const blob = base64ToBlob(blobBase64, blobType);
    await savePoterieGalleryPhoto({ ...rest, blob });
    step("photos");
  });
}
const Progress = reactExports.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root.displayName;
function sanitizeFilename(name) {
  return sanitizeForFilesystem(name);
}
function dateForFilename$1(iso) {
  if (!iso) return "date-inconnue";
  try {
    return format(parseISO(iso), "yyyy-MM-dd");
  } catch {
    return "date-inconnue";
  }
}
function dateForDisplay$1(iso) {
  if (!iso) return "Non renseignée";
  try {
    return format(parseISO(iso), "d MMMM yyyy", { locale: fr });
  } catch {
    return iso;
  }
}
function euros$1(n) {
  if (n == null) return "Non renseigné";
  return `${n.toLocaleString("fr-FR")} €`;
}
async function buildFicheTexte$1(b) {
  const [journal, rappels, poterie] = await Promise.all([
    listJournal$1(b.id),
    listRappels$1(b.id),
    b.poterieId ? getPoterie(b.poterieId) : Promise.resolve(void 0)
  ]);
  const lignes = [];
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
  lignes.push(`Date d'acquisition : ${dateForDisplay$1(b.dateAcquisition)}`);
  lignes.push(`Origine : ${b.origine || "Non renseignée"}`);
  lignes.push(`Hauteur : ${b.hauteurCm != null ? `${b.hauteurCm} cm` : "Non renseignée"}`);
  lignes.push(`Prix d'achat : ${euros$1(b.prixAchat)}`);
  lignes.push(`Valeur estimée : ${euros$1(b.valeurEstimee)}`);
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
        `- ${soinLabel(r.type)} : prochaine échéance le ${dateForDisplay$1(r.prochaineDate)}${r.notes ? ` — ${r.notes}` : ""}`
      );
    }
  }
  lignes.push("");
  lignes.push("--- Historique des événements (journal) ---");
  if (journal.length === 0) {
    lignes.push("(aucune entrée de journal)");
  } else {
    const parDateCroissante = [...journal].reverse();
    for (const j of parDateCroissante) {
      lignes.push(`[${dateForDisplay$1(j.date)}] ${soinLabel(j.type)}${j.notes ? ` — ${j.notes}` : ""}`);
    }
  }
  lignes.push("");
  lignes.push(`Export généré le ${format(/* @__PURE__ */ new Date(), "d MMMM yyyy à HH:mm", { locale: fr })}`);
  return lignes.join("\n");
}
async function exportBonsaisAsZip(bonsais, options = {}) {
  const { onProgress } = options;
  if (bonsais.length === 0) throw new Error("Aucun arbre sélectionné pour l'export");
  const zip = new JSZip();
  const photoCounts = await Promise.all(bonsais.map((b) => listPhotos$1(b.id).then((p) => p.length)));
  const total = bonsais.length + photoCounts.reduce((a2, n) => a2 + n, 0);
  let current = 0;
  const usedFolderNames = /* @__PURE__ */ new Map();
  for (let i = 0; i < bonsais.length; i++) {
    const b = bonsais[i];
    const baseName = sanitizeFilename(b.nom);
    const occurrence = usedFolderNames.get(baseName) ?? 0;
    usedFolderNames.set(baseName, occurrence + 1);
    const folderName = occurrence === 0 ? baseName : `${baseName} (${occurrence + 1})`;
    const folder = zip.folder(folderName);
    current += 1;
    onProgress?.({ current, total, bonsaiNom: b.nom, phase: "donnees" });
    const [fiche, photos] = await Promise.all([buildFicheTexte$1(b), listPhotos$1(b.id)]);
    folder.file(`${baseName}.txt`, fiche);
    const usedPhotoNames = /* @__PURE__ */ new Map();
    for (const photo of photos) {
      current += 1;
      onProgress?.({ current, total, bonsaiNom: b.nom, phase: "photos" });
      try {
        const blob2 = await getPhotoBlob(photo);
        if (!blob2) continue;
        const baseDate = dateForFilename$1(photo.date);
        const occ = usedPhotoNames.get(baseDate) ?? 0;
        usedPhotoNames.set(baseDate, occ + 1);
        const photoName = occ === 0 ? `${baseDate}.jpg` : `${baseDate} (${occ + 1}).jpg`;
        folder.file(photoName, blob2);
      } catch {
      }
    }
  }
  onProgress?.({ current: total, total, bonsaiNom: "", phase: "compression" });
  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
  const dateSuffix = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
  const filename = bonsais.length === 1 ? `bonsai-studio-${sanitizeFilename(bonsais[0].nom)}-${dateSuffix}.zip` : `bonsai-studio-export-${dateSuffix}.zip`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function phaseLabel$1(p) {
  if (p.phase === "compression") return "Compression du fichier ZIP…";
  if (p.phase === "photos") return `${p.bonsaiNom} — téléchargement des photos…`;
  return `${p.bonsaiNom} — préparation de la fiche…`;
}
function ExportZipDialog() {
  const [open, setOpen] = reactExports.useState(false);
  const [portee, setPortee] = reactExports.useState("toute");
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [search, setSearch] = reactExports.useState("");
  const [progress, setProgress] = reactExports.useState(null);
  const [exporting, setExporting] = reactExports.useState(false);
  const { data: bonsais = [], isLoading } = useQuery({
    queryKey: ["bonsais"],
    queryFn: listBonsais$1,
    enabled: open
  });
  const sorted = reactExports.useMemo(
    () => [...bonsais].sort((a, b) => a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" })),
    [bonsais]
  );
  const filtered = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(
      (b) => b.nom.toLowerCase().includes(q) || b.espece.toLowerCase().includes(q)
    );
  }, [sorted, search]);
  const toggle = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const toggleAllFiltered = () => {
    setSelectedIds((prev) => {
      const allSelected = filtered.every((b) => prev.has(b.id));
      const next = new Set(prev);
      for (const b of filtered) {
        if (allSelected) next.delete(b.id);
        else next.add(b.id);
      }
      return next;
    });
  };
  const resetState = () => {
    setPortee("toute");
    setSelectedIds(/* @__PURE__ */ new Set());
    setSearch("");
    setProgress(null);
    setExporting(false);
  };
  const handleOpenChange = (next) => {
    if (exporting) return;
    setOpen(next);
    if (!next) resetState();
  };
  const doExport = async () => {
    const cible = portee === "toute" ? sorted : sorted.filter((b) => selectedIds.has(b.id));
    if (cible.length === 0) {
      toast.error("Sélectionnez au moins un arbre à exporter");
      return;
    }
    setExporting(true);
    setProgress({ current: 0, total: cible.length, bonsaiNom: "", phase: "donnees" });
    try {
      await exportBonsaisAsZip(cible, { onProgress: setProgress });
      toast.success(
        cible.length === 1 ? `Export de "${cible[0].nom}" terminé` : `Export de ${cible.length} arbre(s) terminé`
      );
      setOpen(false);
      resetState();
    } catch (e) {
      toast.error("Échec de l'export : " + e.message);
      setExporting(false);
      setProgress(null);
    }
  };
  const percent = progress && progress.total > 0 ? Math.round(progress.current / progress.total * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: handleOpenChange, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-auto py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FolderArchive, { className: "mr-2 h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "Exporter en ZIP (par arbre)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-normal text-muted-foreground", children: "Photos + fiche texte, un dossier par arbre" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[85vh] overflow-y-auto sm:max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Exporter la collection en ZIP" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Chaque arbre sera exporté dans son propre dossier : ses photos (nommées par date) et une fiche texte avec ses caractéristiques et son historique." })
      ] }),
      !exporting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          RadioGroup,
          {
            value: portee,
            onValueChange: (v) => setPortee(v),
            className: "gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "toute", id: "portee-toute" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "portee-toute", className: "cursor-pointer font-normal", children: [
                  "Toute la collection (",
                  bonsais.length,
                  " arbre",
                  bonsais.length > 1 ? "s" : "",
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "selection", id: "portee-selection" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "portee-selection", className: "cursor-pointer font-normal", children: [
                  "Une sélection d'arbres (",
                  selectedIds.size,
                  " sélectionné",
                  selectedIds.size > 1 ? "s" : "",
                  ")"
                ] })
              ] })
            ]
          }
        ),
        portee === "selection" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 rounded-xl border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-border p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Rechercher un arbre…",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "h-8"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "shrink-0",
                onClick: toggleAllFiltered,
                children: [
                  "Tout ",
                  filtered.length > 0 && filtered.every((b) => selectedIds.has(b.id)) ? "désélectionner" : "sélectionner"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-64 overflow-y-auto p-2", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2 text-sm text-muted-foreground", children: "Chargement…" }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2 text-sm text-muted-foreground", children: "Aucun arbre trouvé." }) : filtered.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: `bonsai-${b.id}`,
              className: "flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-accent/10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    id: `bonsai-${b.id}`,
                    checked: selectedIds.has(b.id),
                    onCheckedChange: () => toggle(b.id)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
                  b.nom,
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "— ",
                    b.espece
                  ] })
                ] })
              ]
            },
            b.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => handleOpenChange(false), children: "Annuler" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: doExport, disabled: isLoading, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderArchive, { className: "mr-2 h-4 w-4" }),
            "Générer le ZIP"
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-sm font-medium", children: progress ? phaseLabel$1(progress) : "Préparation…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: percent }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-right text-xs text-muted-foreground", children: [
          progress?.current ?? 0,
          " / ",
          progress?.total ?? 0,
          " · ",
          percent,
          "%"
        ] })
      ] })
    ] })
  ] });
}
function dateForFilename(iso) {
  if (!iso) return "date-inconnue";
  try {
    return format(parseISO(iso), "yyyy-MM-dd");
  } catch {
    return "date-inconnue";
  }
}
function dateForDisplay(iso) {
  if (!iso) return "Non renseignée";
  try {
    return format(parseISO(iso), "d MMMM yyyy", { locale: fr });
  } catch {
    return iso;
  }
}
function euros(n) {
  if (n == null) return "Non renseigné";
  return `${n.toLocaleString("fr-FR")} €`;
}
function cm(n) {
  return n != null ? `${n} cm` : "Non renseignée";
}
function buildFicheTexte(p, bonsaisLies) {
  const lignes = [];
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
  lignes.push(`Export généré le ${format(/* @__PURE__ */ new Date(), "d MMMM yyyy à HH:mm", { locale: fr })}`);
  return lignes.join("\n");
}
async function exportPoteriesAsZip(poteries, allBonsais, options = {}) {
  const { onProgress } = options;
  if (poteries.length === 0) throw new Error("Aucune poterie sélectionnée pour l'export");
  const zip = new JSZip();
  const galleryPhotosByPoterie = await Promise.all(poteries.map((p) => listPoteriePhotos(p.id)));
  const total = poteries.length + galleryPhotosByPoterie.reduce((a2, list) => a2 + list.length, 0);
  let current = 0;
  const usedFolderNames = /* @__PURE__ */ new Map();
  for (let i = 0; i < poteries.length; i++) {
    const p = poteries[i];
    const baseName = sanitizeForFilesystem(p.nom);
    const occurrence = usedFolderNames.get(baseName) ?? 0;
    usedFolderNames.set(baseName, occurrence + 1);
    const folderName = occurrence === 0 ? baseName : `${baseName} (${occurrence + 1})`;
    const folder = zip.folder(folderName);
    current += 1;
    onProgress?.({ current, total, poterieNom: p.nom, phase: "donnees" });
    const bonsaisLies = allBonsais.filter((b) => b.poterieId === p.id);
    const fiche = buildFicheTexte(p, bonsaisLies);
    folder.file(`${baseName}.txt`, fiche);
    try {
      const blob2 = await getPoteriePhoto(p);
      if (blob2) folder.file("photo-principale.jpg", blob2);
    } catch {
    }
    const galleryPhotos = galleryPhotosByPoterie[i];
    const usedPhotoNames = /* @__PURE__ */ new Map();
    for (const photo of galleryPhotos) {
      current += 1;
      onProgress?.({ current, total, poterieNom: p.nom, phase: "photos" });
      try {
        const blob2 = await getPhotoBlob(photo);
        if (!blob2) continue;
        const baseDate = dateForFilename(photo.date);
        const occ = usedPhotoNames.get(baseDate) ?? 0;
        usedPhotoNames.set(baseDate, occ + 1);
        const photoName = occ === 0 ? `${baseDate}.jpg` : `${baseDate} (${occ + 1}).jpg`;
        folder.file(photoName, blob2);
      } catch {
      }
    }
  }
  onProgress?.({ current: total, total, poterieNom: "", phase: "compression" });
  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
  const dateSuffix = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
  const filename = poteries.length === 1 ? `bonsai-studio-poterie-${sanitizeForFilesystem(poteries[0].nom)}-${dateSuffix}.zip` : `bonsai-studio-poteries-export-${dateSuffix}.zip`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function phaseLabel(p) {
  if (p.phase === "compression") return "Compression du fichier ZIP…";
  if (p.phase === "photos") return `${p.poterieNom} — téléchargement des photos…`;
  return `${p.poterieNom} — préparation de la fiche…`;
}
function ExportPoterieZipDialog() {
  const [open, setOpen] = reactExports.useState(false);
  const [portee, setPortee] = reactExports.useState("toute");
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [search, setSearch] = reactExports.useState("");
  const [progress, setProgress] = reactExports.useState(null);
  const [exporting, setExporting] = reactExports.useState(false);
  const { data: poteries = [], isLoading } = useQuery({
    queryKey: ["poteries"],
    queryFn: listPoteries$1,
    enabled: open
  });
  const { data: bonsais = [] } = useQuery({
    queryKey: ["bonsais"],
    queryFn: listBonsais$1,
    enabled: open
  });
  const sorted = reactExports.useMemo(
    () => [...poteries].sort((a, b) => a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" })),
    [poteries]
  );
  const filtered = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(
      (p) => p.nom.toLowerCase().includes(q) || (p.forme ?? "").toLowerCase().includes(q) || (p.matiere ?? "").toLowerCase().includes(q)
    );
  }, [sorted, search]);
  const toggle = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const toggleAllFiltered = () => {
    setSelectedIds((prev) => {
      const allSelected = filtered.every((p) => prev.has(p.id));
      const next = new Set(prev);
      for (const p of filtered) {
        if (allSelected) next.delete(p.id);
        else next.add(p.id);
      }
      return next;
    });
  };
  const resetState = () => {
    setPortee("toute");
    setSelectedIds(/* @__PURE__ */ new Set());
    setSearch("");
    setProgress(null);
    setExporting(false);
  };
  const handleOpenChange = (next) => {
    if (exporting) return;
    setOpen(next);
    if (!next) resetState();
  };
  const doExport = async () => {
    const cible = portee === "toute" ? sorted : sorted.filter((p) => selectedIds.has(p.id));
    if (cible.length === 0) {
      toast.error("Sélectionnez au moins une poterie à exporter");
      return;
    }
    setExporting(true);
    setProgress({ current: 0, total: cible.length, poterieNom: "", phase: "donnees" });
    try {
      await exportPoteriesAsZip(cible, bonsais, { onProgress: setProgress });
      toast.success(
        cible.length === 1 ? `Export de "${cible[0].nom}" terminé` : `Export de ${cible.length} poterie(s) terminé`
      );
      setOpen(false);
      resetState();
    } catch (e) {
      toast.error("Échec de l'export : " + e.message);
      setExporting(false);
      setProgress(null);
    }
  };
  const percent = progress && progress.total > 0 ? Math.round(progress.current / progress.total * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: handleOpenChange, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-auto py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FolderArchive, { className: "mr-2 h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "Exporter en ZIP (par poterie)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-normal text-muted-foreground", children: "Photos + fiche texte, un dossier par poterie" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[85vh] overflow-y-auto sm:max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Exporter les poteries en ZIP" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Chaque poterie sera exportée dans son propre dossier : sa photo principale, ses photos de galerie (nommées par date) et une fiche texte avec ses caractéristiques." })
      ] }),
      !exporting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          RadioGroup,
          {
            value: portee,
            onValueChange: (v) => setPortee(v),
            className: "gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "toute", id: "portee-poteries-toute" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "portee-poteries-toute", className: "cursor-pointer font-normal", children: [
                  "Toutes les poteries (",
                  poteries.length,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "selection", id: "portee-poteries-selection" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "portee-poteries-selection", className: "cursor-pointer font-normal", children: [
                  "Une sélection de poteries (",
                  selectedIds.size,
                  " sélectionnée",
                  selectedIds.size > 1 ? "s" : "",
                  ")"
                ] })
              ] })
            ]
          }
        ),
        portee === "selection" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 rounded-xl border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-border p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Rechercher une poterie…",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "h-8"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "shrink-0",
                onClick: toggleAllFiltered,
                children: [
                  "Tout ",
                  filtered.length > 0 && filtered.every((p) => selectedIds.has(p.id)) ? "désélectionner" : "sélectionner"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-64 overflow-y-auto p-2", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2 text-sm text-muted-foreground", children: "Chargement…" }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2 text-sm text-muted-foreground", children: "Aucune poterie trouvée." }) : filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: `poterie-${p.id}`,
              className: "flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-accent/10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    id: `poterie-${p.id}`,
                    checked: selectedIds.has(p.id),
                    onCheckedChange: () => toggle(p.id)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
                  p.nom,
                  p.forme ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    " — ",
                    p.forme
                  ] }) : null
                ] })
              ]
            },
            p.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => handleOpenChange(false), children: "Annuler" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: doExport, disabled: isLoading, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderArchive, { className: "mr-2 h-4 w-4" }),
            "Générer le ZIP"
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-sm font-medium", children: progress ? phaseLabel(progress) : "Préparation…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: percent }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-right text-xs text-muted-foreground", children: [
          progress?.current ?? 0,
          " / ",
          progress?.total ?? 0,
          " · ",
          percent,
          "%"
        ] })
      ] })
    ] })
  ] });
}
async function pickSaveTarget(suggestedName, options) {
  const w = window;
  if (typeof w.showSaveFilePicker !== "function") {
    return { kind: "download", suggestedName };
  }
  try {
    const handle = await w.showSaveFilePicker({
      suggestedName,
      types: [
        {
          description: options.description ?? "Fichier",
          accept: { [options.mimeType]: [options.extension] }
        }
      ]
    });
    return { kind: "picker", handle, suggestedName };
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      return { kind: "cancelled" };
    }
    return { kind: "download", suggestedName };
  }
}
async function writeToSaveTarget(target, blob) {
  if (target.kind === "cancelled") return;
  if (target.kind === "picker") {
    const writable = await target.handle.createWritable();
    await writable.write(blob);
    await writable.close();
    return;
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = target.suggestedName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
let dbPromise = null;
function getDB() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB n'est disponible que côté client");
  }
  if (!dbPromise) {
    dbPromise = openDB("bonsai-studio", 2, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore("bonsais", { keyPath: "id" });
          const photos = db.createObjectStore("photos", { keyPath: "id" });
          photos.createIndex("by-bonsai", "bonsaiId");
          const journal = db.createObjectStore("journal", { keyPath: "id" });
          journal.createIndex("by-bonsai", "bonsaiId");
          journal.createIndex("by-date", "date");
          const rappels = db.createObjectStore("rappels", { keyPath: "id" });
          rappels.createIndex("by-bonsai", "bonsaiId");
          rappels.createIndex("by-date", "prochaineDate");
          db.createObjectStore("poteries", { keyPath: "id" });
        }
        if (oldVersion < 2) {
          const ev = db.createObjectStore("evenements", { keyPath: "id" });
          ev.createIndex("by-date", "dateHeure");
        }
      }
    });
  }
  return dbPromise;
}
async function listBonsais() {
  const db = await getDB();
  return db.getAll("bonsais");
}
async function listPhotos(bonsaiId) {
  const db = await getDB();
  return db.getAllFromIndex("photos", "by-bonsai", bonsaiId);
}
async function listJournal(bonsaiId) {
  const db = await getDB();
  const all = await db.getAll("journal");
  return all.sort((a, b) => b.date.localeCompare(a.date));
}
async function listRappels(bonsaiId) {
  const db = await getDB();
  const all = await db.getAll("rappels");
  return all.sort((a, b) => a.prochaineDate.localeCompare(b.prochaineDate));
}
async function listPoteries() {
  const db = await getDB();
  return db.getAll("poteries");
}
async function listEvenements() {
  const db = await getDB();
  const all = await db.getAll("evenements");
  return all.sort((a, b) => a.dateHeure.localeCompare(b.dateHeure));
}
async function requestNotificationPermission() {
  if (typeof window === "undefined" || !("Notification" in window)) return "denied";
  if (Notification.permission === "default") {
    try {
      return await Notification.requestPermission();
    } catch {
      return "denied";
    }
  }
  return Notification.permission;
}
function notificationStatus() {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  return Notification.permission;
}
async function subscribeToPush() {
  if (typeof window === "undefined") return false;
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.warn("Service Worker ou Push API non supporté");
    return false;
  }
  try {
    const permission = await requestNotificationPermission();
    if (permission !== "granted") {
      console.warn("Permission de notification refusée");
      return false;
    }
    const registration = await navigator.serviceWorker.register("/sw.js");
    if (false) ;
    const vapidPublicKey = void 0;
    if (!vapidPublicKey) {
      console.error(
        "VITE_VAPID_PUBLIC_KEY n'est pas défini : impossible de s'abonner aux notifications push."
      );
      return false;
    }
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      // Cast nécessaire : le type Uint8Array de la lib DOM utilisée par ce
      // projet est plus strict que BufferSource (incompatibilité de version
      // de types, sans conséquence à l'exécution — un Uint8Array est un
      // BufferSource valide pour l'API Push réelle du navigateur).
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
    });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error("Utilisateur non connecté");
      return false;
    }
    const p256dhKey = subscription.getKey("p256dh");
    const authKey = subscription.getKey("auth");
    if (!p256dhKey || !authKey) {
      console.error("Clés de chiffrement manquantes sur l'abonnement push.");
      return false;
    }
    const { error } = await supabase.from("push_subscriptions").upsert({
      user_id: user.id,
      endpoint: subscription.endpoint,
      p256dh: btoa(String.fromCharCode(...new Uint8Array(p256dhKey))),
      auth: btoa(String.fromCharCode(...new Uint8Array(authKey)))
    }, { onConflict: "endpoint" });
    if (error) {
      console.error("Erreur lors de l'enregistrement de l'abonnement:", error);
      return false;
    }
    if (false) ;
    return true;
  } catch (error) {
    console.error("Erreur lors de l'abonnement push:", error);
    return false;
  }
}
async function checkPushSubscription() {
  if (typeof window === "undefined") return false;
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return false;
  }
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) return false;
    const subscription = await registration.pushManager.getSubscription();
    return subscription !== null;
  } catch {
    return false;
  }
}
async function unsubscribeFromPush() {
  if (typeof window === "undefined") return false;
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return false;
  }
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) return false;
    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) return false;
    const { error } = await supabase.from("push_subscriptions").delete().eq("endpoint", subscription.endpoint);
    if (error) {
      console.error("Erreur lors de la suppression de l'abonnement:", error);
      return false;
    }
    const unsubscribed = await subscription.unsubscribe();
    if (false) ;
    return true;
  } catch (error) {
    console.error("Erreur lors de la désabonnement push:", error);
    return false;
  }
}
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
const APP_VERSION = "1.5.5";
const APP_VERSION_DATE = "2026-07-26";
function ParametresPage() {
  const qc = useQueryClient();
  const {
    user,
    signOut
  } = useAuth();
  const [busy, setBusy] = reactExports.useState(null);
  const [hasLocalData, setHasLocalData] = reactExports.useState(false);
  const [checkingLocal, setCheckingLocal] = reactExports.useState(true);
  const {
    confirm,
    dialog: confirmDialog
  } = useConfirm();
  const [pushEnabled, setPushEnabled] = reactExports.useState(null);
  const [enablingPush, setEnablingPush] = reactExports.useState(false);
  const [disablingPush, setDisablingPush] = reactExports.useState(false);
  const [sendingTest, setSendingTest] = reactExports.useState(false);
  const [compressPhotos, setCompressPhotos] = reactExports.useState(false);
  const [backupProgress, setBackupProgress] = reactExports.useState(null);
  const {
    data: backupSummary
  } = useQuery({
    queryKey: ["backup-summary"],
    queryFn: getBackupSummary
  });
  reactExports.useEffect(() => {
    if (typeof window === "undefined") {
      setCheckingLocal(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const bonsais = await listBonsais();
        if (!cancelled) setHasLocalData(bonsais.length > 0);
      } catch {
        if (!cancelled) setHasLocalData(false);
      } finally {
        if (!cancelled) setCheckingLocal(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    (async () => {
      try {
        const hasSubscription = await checkPushSubscription();
        if (!cancelled) setPushEnabled(hasSubscription);
      } catch {
        if (!cancelled) setPushEnabled(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const doSignOut = async () => {
    try {
      await signOut();
      toast.success("Déconnecté");
    } catch (e) {
      toast.error(e.message);
    }
  };
  const doEnablePush = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour activer les notifications");
      return;
    }
    setEnablingPush(true);
    try {
      const success = await subscribeToPush();
      if (success) {
        const hasSubscription = await checkPushSubscription();
        setPushEnabled(hasSubscription);
        toast.success("Notifications push activées");
      } else {
        toast.error("Impossible d'activer les notifications push");
      }
    } catch (e) {
      toast.error("Erreur: " + e.message);
    } finally {
      setEnablingPush(false);
    }
  };
  const doDisablePush = async () => {
    setDisablingPush(true);
    try {
      const success = await unsubscribeFromPush();
      if (success) {
        setPushEnabled(false);
        toast.success("Notifications push désactivées");
      } else {
        toast.error("Impossible de désactiver les notifications push");
      }
    } catch (e) {
      toast.error("Erreur: " + e.message);
    } finally {
      setDisablingPush(false);
    }
  };
  const doSendTestNotification = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour envoyer une notification de test");
      return;
    }
    setSendingTest(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke("send-test-push");
      if (error) {
        toast.error("Erreur: " + error.message);
        return;
      }
      toast.success(data?.message || "Notification de test envoyée");
    } catch (e) {
      toast.error("Erreur: " + e.message);
    } finally {
      setSendingTest(false);
    }
  };
  const doLocalExport = async () => {
    const willGzip = typeof CompressionStream !== "undefined";
    const ext = willGzip ? "gz" : "json";
    const filename = `bonsai-studio-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json${willGzip ? ".gz" : ""}`;
    const target = await pickSaveTarget(filename, {
      mimeType: willGzip ? "application/gzip" : "application/json",
      extension: `.${ext}`,
      description: "Sauvegarde Bonsaï Studio"
    });
    if (target.kind === "cancelled") return;
    setBusy("export");
    setBackupProgress({
      phase: "donnees",
      current: 0,
      total: 1
    });
    try {
      const payload = await exportSupabaseBackup({
        compressPhotos,
        onProgress: setBackupProgress
      });
      const json = JSON.stringify(payload);
      let blob;
      if (willGzip) {
        const enc = new TextEncoder().encode(json);
        const stream = new Response(new Blob([enc])).body.pipeThrough(new CompressionStream("gzip"));
        blob = await new Response(stream).blob();
      } else {
        blob = new Blob([json], {
          type: "application/json"
        });
      }
      await writeToSaveTarget(target, blob);
      toast.success(`Sauvegarde téléchargée (${formatBytes(blob.size)})`);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(null);
      setBackupProgress(null);
    }
  };
  const doLocalImport = async (file) => {
    setBusy("import");
    let payload;
    try {
      const buf = await file.arrayBuffer();
      const bytes = new Uint8Array(buf);
      const isGzip = bytes.length > 2 && bytes[0] === 31 && bytes[1] === 139;
      let text;
      if (isGzip && typeof DecompressionStream !== "undefined") {
        const stream = new Response(new Blob([bytes])).body.pipeThrough(new DecompressionStream("gzip"));
        text = await new Response(stream).text();
      } else {
        text = new TextDecoder().decode(bytes);
      }
      payload = JSON.parse(text);
    } catch (e) {
      toast.error("Fichier invalide : " + e.message);
      setBusy(null);
      return;
    }
    const confirmed = await confirm({
      title: "Importer cette sauvegarde ?",
      description: `Cette sauvegarde contient ${payload.bonsais.length} arbre(s), ${payload.photos.length} photo(s), ${payload.poteries.length} poterie(s) (${payload.poteriePhotos?.length ?? 0} photo(s) de galerie), ${payload.journal.length} entrée(s) de journal et ${payload.rappels.length} rappel(s). Les données Supabase actuelles seront remplacées (par id).`,
      confirmLabel: "Importer"
    });
    if (!confirmed) {
      setBusy(null);
      return;
    }
    setBackupProgress({
      phase: "donnees",
      current: 0,
      total: 1
    });
    try {
      await importSupabaseBackup(payload, {
        onProgress: setBackupProgress
      });
      await qc.invalidateQueries();
      toast.success("Sauvegarde restaurée depuis le fichier");
    } catch (e) {
      toast.error("Échec de l'import : " + e.message);
    } finally {
      setBusy(null);
      setBackupProgress(null);
    }
  };
  const doMigrateLocal = async () => {
    const confirmed = await confirm({
      title: "Migrer les données locales vers Supabase ?",
      description: "Toutes les données IndexedDB seront importées. Les doublons (même id) seront écrasés.",
      confirmLabel: "Migrer"
    });
    if (!confirmed) return;
    setBusy("migrate");
    try {
      const [bonsais, poteries, journal, rappels, evenements] = await Promise.all([listBonsais(), listPoteries(), listJournal(), listRappels(), listEvenements().catch(() => [])]);
      const photosParBonsai = await Promise.all(bonsais.map((b) => listPhotos(b.id)));
      const allPhotos = photosParBonsai.flat();
      for (const b of bonsais) {
        await saveBonsai({
          id: b.id,
          nom: b.nom,
          espece: b.espece,
          style: b.style,
          etape: b.etape,
          ageEstime: b.ageEstime,
          dateAcquisition: b.dateAcquisition,
          origine: b.origine,
          hauteurCm: b.hauteurCm,
          prixAchat: b.prixAchat,
          valeurEstimee: b.valeurEstimee,
          poterieId: b.poterieId,
          notes: b.notes,
          dansCollection: b.dansCollection,
          favori: b.favori,
          createdAt: b.createdAt
        });
      }
      for (const p of allPhotos) {
        await savePhoto({
          id: p.id,
          bonsaiId: p.bonsaiId,
          date: p.date,
          legende: p.legende,
          blob: p.blob
        });
      }
      for (const j of journal) {
        await saveJournal({
          id: j.id,
          bonsaiId: j.bonsaiId,
          type: j.type,
          date: j.date,
          notes: j.notes,
          rappelId: j.rappelId
        });
      }
      for (const r of rappels) {
        await saveRappel({
          id: r.id,
          bonsaiId: r.bonsaiId,
          type: r.type,
          prochaineDate: r.prochaineDate,
          intervalleJours: r.intervalleJours,
          notes: r.notes,
          actif: r.actif
        });
      }
      for (const p of poteries) {
        await savePoterie({
          id: p.id,
          nom: p.nom,
          longueurCm: p.longueurCm,
          largeurCm: p.largeurCm,
          hauteurCm: p.hauteurCm,
          forme: p.forme,
          couleur: p.couleur,
          matiere: p.matiere,
          artisan: p.artisan,
          origine: p.origine,
          prix: p.prix,
          notes: p.notes,
          createdAt: p.createdAt,
          photoBlob: p.photoBlob
        });
      }
      for (const e of evenements) {
        await saveEvenement({
          id: e.id,
          titre: e.titre,
          description: e.description,
          dateHeure: e.dateHeure,
          rappelMinutes: e.rappelMinutes,
          notifiedAt: e.notifiedAt,
          bonsaiId: e.bonsaiId,
          createdAt: e.createdAt
        });
      }
      await qc.invalidateQueries();
      setHasLocalData(false);
      toast.success(`Migration terminée : ${bonsais.length} arbre(s), ${allPhotos.length} photo(s), ${poteries.length} poterie(s), ${journal.length} entrée(s) de journal, ${rappels.length} rappel(s), ${evenements.length} évènement(s).`);
    } catch (e) {
      toast.error("Migration échouée : " + e.message);
    } finally {
      setBusy(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-semibold", children: "Paramètres" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Gérez vos données synchronisées via Supabase, importez vos anciennes données locales et exportez une sauvegarde de sécurité." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-10 rounded-3xl border border-border bg-card p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 sm:flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Compte" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: user ? `Connecté en tant que ${user.email}` : "Non connecté." })
        ] })
      ] }),
      user && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: doSignOut, className: "w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-2 h-4 w-4" }),
        "Se déconnecter"
      ] })
    ] }) }),
    typeof window !== "undefined" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 rounded-3xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent", children: pushEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Notifications push" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: pushEnabled === null ? "Vérification du support des notifications..." : pushEnabled ? "Les notifications push sont activées. Vous recevrez des rappels même si l'application est fermée." : notificationStatus() === "unsupported" ? "Votre navigateur ne supporte pas les notifications push." : "Activez les notifications pour recevoir des rappels même si l'application est fermée." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap", children: pushEnabled === null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: true, className: "w-full opacity-50 sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mr-2 h-4 w-4" }),
        "Vérification..."
      ] }) : pushEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: doDisablePush, disabled: disablingPush, className: "w-full sm:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "mr-2 h-4 w-4" }),
          disablingPush ? "Désactivation..." : "Désactiver les notifications"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: doSendTestNotification, disabled: sendingTest, className: "w-full sm:w-auto", children: sendingTest ? "Envoi..." : "Envoyer une notification de test" })
      ] }) : notificationStatus() === "unsupported" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", disabled: true, className: "w-full opacity-50 sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mr-2 h-4 w-4" }),
        "Non supporté"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: doEnablePush, disabled: enablingPush || !user, className: "w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "mr-2 h-4 w-4" }),
        enablingPush ? "Activation..." : "Activer les notifications"
      ] }) })
    ] }),
    typeof window !== "undefined" && !checkingLocal && hasLocalData && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 rounded-3xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Importer mes données locales (IndexedDB) vers Supabase" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Des données locales (IndexedDB) ont été détectées sur cet appareil. Importez-les vers Supabase pour les synchroniser dans le cloud. Les éléments existants avec le même identifiant seront écrasés." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: doMigrateLocal, disabled: busy !== null, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "mr-2 h-4 w-4" }),
        busy === "migrate" ? "Migration en cours…" : "Importer vers Supabase"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 rounded-3xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HardDriveDownload, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Sauvegarde locale (filet de sécurité)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
            "Téléchargez un fichier ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: ".json.gz" }),
            " contenant toute votre collection (photos comprises), lue depuis Supabase. Utile pour archiver ou transférer vers un autre appareil."
          ] }),
          backupSummary && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
            "Contenu actuel : ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: backupSummary.bonsais }),
            " ",
            "arbre(s), ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: backupSummary.photos }),
            " photo(s),",
            " ",
            backupSummary.poteries,
            " poterie(s) (",
            backupSummary.poteriePhotos,
            " photo(s) de galerie), ",
            backupSummary.journal,
            " entrée(s) de journal,",
            " ",
            backupSummary.rappels,
            " rappel(s), ",
            backupSummary.evenements,
            " évènement(s)."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-start gap-2 rounded-xl border border-border bg-muted/30 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { id: "compress-photos", checked: compressPhotos, onCheckedChange: (v) => setCompressPhotos(v === true), disabled: busy !== null }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "compress-photos", className: "cursor-pointer text-sm leading-snug", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Réduire la taille des photos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 block text-muted-foreground", children: "Redimensionne (max 1280 px) et recompresse les photos en JPEG qualité 70 % avant de les inclure dans le fichier, pour une sauvegarde plus légère. Décoché (par défaut) : les photos sont sauvegardées dans leur résolution d'origine. Dans tous les cas, vos photos restent stockées intactes dans Supabase Storage — seul le fichier exporté est concerné." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: doLocalExport, disabled: busy !== null, className: "h-auto py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HardDriveDownload, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: busy === "export" ? "Préparation…" : "Télécharger la sauvegarde" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-normal text-muted-foreground", children: "Fichier compressé sur votre appareil" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex h-auto cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-4 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground ${busy !== null ? "pointer-events-none opacity-50" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HardDriveUpload, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: busy === "import" ? "Import…" : "Importer un fichier" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-normal text-muted-foreground", children: ".json ou .json.gz" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: ".json,.gz,application/json,application/gzip", className: "hidden", onChange: (e) => {
            const f = e.target.files?.[0];
            if (f) {
              doLocalImport(f);
              e.target.value = "";
            }
          } })
        ] })
      ] }),
      busy !== null && backupProgress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 text-sm text-muted-foreground", children: busy === "export" ? backupProgress.phase === "photos" ? "Téléchargement et encodage des photos…" : backupProgress.phase === "poteries" ? "Traitement des photos de poteries…" : "Collecte des données…" : backupProgress.phase === "photos" ? "Import des photos…" : backupProgress.phase === "poteries" ? "Import des poteries…" : "Import des données…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: Math.round(backupProgress.current / backupProgress.total * 100) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-right text-xs text-muted-foreground", children: [
          backupProgress.current,
          " / ",
          backupProgress.total
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 rounded-3xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderArchive, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Export ZIP par arbre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Exportez toute la collection ou une sélection d'arbres : un dossier par arbre, contenant ses photos (nommées par date) et une fiche texte avec ses caractéristiques et l'historique complet de ses événements." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExportZipDialog, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 rounded-3xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderArchive, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Export ZIP par poterie" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Exportez toutes les poteries ou une sélection : un dossier par poterie, contenant sa photo principale, ses photos de galerie (nommées par date) et une fiche texte avec ses caractéristiques et les arbres actuellement plantés dedans." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExportPoterieZipDialog, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-6 rounded-3xl border border-border bg-card p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "À propos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          "Bonsaï Studio — version ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: APP_VERSION }),
          " · ",
          "publiée le ",
          format(parseISO(APP_VERSION_DATE), "d MMMM yyyy", {
            locale: fr
          })
        ] })
      ] })
    ] }) }),
    confirmDialog
  ] });
}
export {
  ParametresPage as component
};
