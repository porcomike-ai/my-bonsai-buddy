import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { A as AppShell } from "./app-shell-DVADMHR6.mjs";
import { m as useAuth, B as Button, n as saveBonsai, o as savePhoto, p as saveJournal, q as saveRappel, s as savePoterie, r as saveEvenement, t as exportSupabaseBackup, v as importSupabaseBackup } from "./router-B380VHsD.mjs";
import { u as useConfirm } from "./confirm-dialog-DR1ebqbl.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { o as openDB } from "../_libs/idb.mjs";
import { l as LogOut, D as Database, m as CloudUpload, H as HardDriveDownload, n as HardDriveUpload, W as Wand, o as Info } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
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
import "../_libs/radix-ui__react-alert-dialog.mjs";
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
const APP_VERSION = "1.13.2";
const APP_VERSION_DATE = "2026-07-04";
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
  const doSignOut = async () => {
    try {
      await signOut();
      toast.success("Déconnecté");
    } catch (e) {
      toast.error(e.message);
    }
  };
  const doLocalExport = async () => {
    setBusy("export");
    try {
      const payload = await exportSupabaseBackup();
      const json = JSON.stringify(payload);
      let blob;
      if (typeof CompressionStream !== "undefined") {
        const enc = new TextEncoder().encode(json);
        const stream = new Response(new Blob([enc])).body.pipeThrough(new CompressionStream("gzip"));
        blob = await new Response(stream).blob();
      } else {
        blob = new Blob([json], {
          type: "application/json"
        });
      }
      const ext = blob.type.includes("gzip") || typeof CompressionStream !== "undefined" ? "json.gz" : "json";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bonsai-studio-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1e3);
      toast.success("Sauvegarde téléchargée");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(null);
    }
  };
  const doLocalImport = async (file) => {
    const confirmed = await confirm({
      title: "Importer cette sauvegarde ?",
      description: "Les données Supabase actuelles seront remplacées par le contenu du fichier.",
      confirmLabel: "Importer"
    });
    if (!confirmed) return;
    setBusy("import");
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
      const payload = JSON.parse(text);
      await importSupabaseBackup(payload);
      await qc.invalidateQueries();
      toast.success("Sauvegarde restaurée depuis le fichier");
    } catch (e) {
      toast.error("Fichier invalide : " + e.message);
    } finally {
      setBusy(null);
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-10 rounded-3xl border border-border bg-card p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Compte" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: user ? `Connecté en tant que ${user.email}` : "Non connecté." })
      ] }),
      user && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: doSignOut, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-2 h-4 w-4" }),
        "Se déconnecter"
      ] })
    ] }) }),
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
          ] })
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
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-6 rounded-3xl border border-border bg-card p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wand, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Réduire la taille de la sauvegarde" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          "Les photos sont ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "recompressées automatiquement" }),
          " côté navigateur lors de l'export local (max 1280 px, JPEG qualité 70 %) pour limiter la taille du fichier de sauvegarde."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Vos photos restent stockées intactes dans Supabase Storage — seuls les exports en bénéficient." })
      ] })
    ] }) }),
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
