import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { I as Input, T as Textarea, B as Button, f as fileToBlob, u as uid, s as savePoterie, g as getPoteriePhoto, e as useBlobUrl, L as Label, a as listPoteries, l as listBonsais } from "./router-B7dkk4ae.mjs";
import { A as AppShell } from "./app-shell-DyFFU200.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { I as ImagePlus, P as Plus, a as Container } from "../_libs/lucide-react.mjs";
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
function PoteriesPage() {
  const {
    data: poteries = []
  } = useQuery({
    queryKey: ["poteries"],
    queryFn: listPoteries
  });
  const {
    data: bonsais = []
  } = useQuery({
    queryKey: ["bonsais"],
    queryFn: listBonsais
  });
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8 flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-muted-foreground", children: "Catalogue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-4xl font-semibold", children: "Poteries" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          poteries.length,
          " contenant",
          poteries.length > 1 ? "s" : "",
          " dans votre collection"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setOpen(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
        " Nouvelle poterie"
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(PoterieForm, { onClose: () => setOpen(false) }),
    poteries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-dashed border-border bg-card/50 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-2xl font-semibold", children: "Aucune poterie" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Ajoutez les contenants de votre collection pour les associer à vos bonsaïs." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3", children: poteries.map((p) => {
      const planted = bonsais.find((b) => b.poterieId === p.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/poterie/$id", params: {
        id: p.id
      }, className: "group block overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PoterieImage, { poterie: p }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "truncate font-display text-lg font-semibold", children: p.nom }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: [p.forme, p.couleur, p.matiere].filter(Boolean).join(" · ") || "—" }),
          (p.longueurCm || p.largeurCm || p.hauteurCm) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            [p.longueurCm, p.largeurCm, p.hauteurCm].map((d) => d ?? "?").join(" × "),
            " ",
            "cm"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider", children: planted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent", children: [
            "Plantée · ",
            planted.nom
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Libre" }) })
        ] })
      ] }) }, p.id);
    }) })
  ] });
}
function PoterieImage({
  poterie
}) {
  const [blob, setBlob] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    let cancelled = false;
    if (!poterie) {
      setBlob(void 0);
      return;
    }
    getPoteriePhoto(poterie).then((b) => {
      if (!cancelled) setBlob(b);
    }).catch(() => {
      if (!cancelled) setBlob(void 0);
    });
    return () => {
      cancelled = true;
    };
  }, [poterie]);
  const url = useBlobUrl(blob);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-secondary via-muted to-peach/30", children: url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "", loading: "lazy", decoding: "async", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "h-10 w-10 opacity-40" }) }) });
}
function PoterieForm({
  initial,
  onClose
}) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [file, setFile] = reactExports.useState(null);
  const [preview, setPreview] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    nom: initial?.nom ?? "",
    longueurCm: initial?.longueurCm?.toString() ?? "",
    largeurCm: initial?.largeurCm?.toString() ?? "",
    hauteurCm: initial?.hauteurCm?.toString() ?? "",
    forme: initial?.forme ?? "",
    couleur: initial?.couleur ?? "",
    matiere: initial?.matiere ?? "",
    artisan: initial?.artisan ?? "",
    origine: initial?.origine ?? "",
    prix: initial?.prix?.toString() ?? "",
    notes: initial?.notes ?? ""
  });
  const set = (k, v) => setForm((f) => ({
    ...f,
    [k]: v
  }));
  const submit = async (e) => {
    e.preventDefault();
    if (!form.nom.trim()) {
      toast.error("Donnez un nom à la poterie");
      return;
    }
    const photoBlob = file ? await fileToBlob(file) : void 0;
    const p = {
      id: initial?.id ?? uid(),
      nom: form.nom.trim(),
      longueurCm: form.longueurCm ? Number(form.longueurCm) : void 0,
      largeurCm: form.largeurCm ? Number(form.largeurCm) : void 0,
      hauteurCm: form.hauteurCm ? Number(form.hauteurCm) : void 0,
      forme: form.forme.trim() || void 0,
      couleur: form.couleur.trim() || void 0,
      matiere: form.matiere.trim() || void 0,
      artisan: form.artisan.trim() || void 0,
      origine: form.origine.trim() || void 0,
      prix: form.prix ? Number(form.prix) : void 0,
      notes: form.notes.trim() || void 0,
      photoPath: initial?.photoPath,
      createdAt: initial?.createdAt ?? (/* @__PURE__ */ new Date()).toISOString()
    };
    await savePoterie(photoBlob ? {
      ...p,
      photoBlob
    } : p);
    await qc.invalidateQueries();
    toast.success(initial ? "Poterie mise à jour" : "Poterie ajoutée");
    onClose();
    if (!initial) navigate({
      to: "/poterie/$id",
      params: {
        id: p.id
      }
    });
  };
  const onFile = (f) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mb-8 grid gap-6 rounded-3xl border border-border bg-card p-6 lg:grid-cols-[240px_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "group relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-background transition hover:border-accent/60", children: [
      preview ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview, alt: "", loading: "lazy", decoding: "async", className: "h-full w-full object-cover" }) : initial?.photoPath ? /* @__PURE__ */ jsxRuntimeExports.jsx(ExistingImage, { poterie: initial }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "mx-auto h-7 w-7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs", children: "Photo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "absolute inset-0 cursor-pointer opacity-0", onChange: (e) => e.target.files?.[0] && onFile(e.target.files[0]) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nom", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.nom, onChange: (e) => set("nom", e.target.value), placeholder: "Tokoname ovale brune" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Forme", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.forme, onChange: (e) => set("forme", e.target.value), placeholder: "Ovale, rectangle, ronde…" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Matière", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.matiere, onChange: (e) => set("matiere", e.target.value), placeholder: "Grès, terre cuite émaillée…" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Couleur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.couleur, onChange: (e) => set("couleur", e.target.value), placeholder: "Brun, vert céladon…" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Longueur (cm)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: form.longueurCm, onChange: (e) => set("longueurCm", e.target.value) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Largeur (cm)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: form.largeurCm, onChange: (e) => set("largeurCm", e.target.value) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Hauteur (cm)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: form.hauteurCm, onChange: (e) => set("hauteurCm", e.target.value) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Prix (€)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: form.prix, onChange: (e) => set("prix", e.target.value) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Artisan", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.artisan, onChange: (e) => set("artisan", e.target.value), placeholder: "Yamaaki, Bigei…" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Origine", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.origine, onChange: (e) => set("origine", e.target.value), placeholder: "Japon, Tokoname…" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Notes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, value: form.notes, onChange: (e) => set("notes", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: initial ? "Enregistrer" : "Ajouter la poterie" })
      ] })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  const id = reactExports.useId();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: id, className: "mb-1.5 block text-sm", children: label }),
    reactExports.cloneElement(children, {
      id
    })
  ] });
}
function ExistingImage({
  poterie
}) {
  const [blob, setBlob] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    let cancelled = false;
    getPoteriePhoto(poterie).then((b) => {
      if (!cancelled) setBlob(b);
    }).catch(() => {
      if (!cancelled) setBlob(void 0);
    });
    return () => {
      cancelled = true;
    };
  }, [poterie]);
  const url = useBlobUrl(blob);
  return url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "", loading: "lazy", decoding: "async", className: "h-full w-full object-cover" }) : null;
}
export {
  PoterieForm,
  PoteriesPage as component
};
