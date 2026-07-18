import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { I as Input, S as Select, f as SelectTrigger, g as SelectValue, h as SelectContent, i as SelectItem, d as ageActuel, w as cn, l as listBonsais$1 } from "./router-lnbQiR3D.mjs";
import { A as AppShell } from "./app-shell-BQ949hrh.mjs";
import { B as BonsaiPhoto } from "./bonsai-photo-s0NccPR4.mjs";
import { S as STYLES, s as styleLabel } from "./bonsai-meta-6FZGZ_0u.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_libs/radix-ui__react-checkbox.mjs";
import "../_libs/sonner.mjs";
import "../_libs/lovable.dev__mcp-js.mjs";
import "../_libs/modelcontextprotocol__sdk.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/ajv-formats.mjs";
import { P as Plus, q as Search, g as Sprout, r as Star, b as Check } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-radio-group.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/date-fns.mjs";
import "../_libs/zod.mjs";
import "../_libs/jose.mjs";
import "../_libs/ajv.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/json-schema-traverse.mjs";
import "../_libs/fast-uri.mjs";
import "./photo-cache-DhR44897.mjs";
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = Checkbox$1.displayName;
function CollectionPage() {
  const {
    data: bonsais = []
  } = useQuery({
    queryKey: ["bonsais"],
    queryFn: listBonsais$1
  });
  const [q, setQ] = reactExports.useState("");
  const [styleFilter, setStyleFilter] = reactExports.useState("");
  const [statutFilter, setStatutFilter] = reactExports.useState("actifs");
  const [sortBy, setSortBy] = reactExports.useState("nom-asc");
  const [favorisFirst, setFavorisFirst] = reactExports.useState(false);
  const filtered = reactExports.useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = bonsais.filter((b) => {
      const dans = b.dansCollection ?? true;
      if (statutFilter === "actifs" && !dans) return false;
      if (statutFilter === "sortis" && dans) return false;
      if (statutFilter === "favoris" && !b.favori) return false;
      if (styleFilter && b.style !== styleFilter) return false;
      if (!needle) return true;
      return b.nom.toLowerCase().includes(needle) || b.espece.toLowerCase().includes(needle) || (b.origine ?? "").toLowerCase().includes(needle);
    });
    const cmp = (a, b) => {
      switch (sortBy) {
        case "nom-asc":
          return a.nom.localeCompare(b.nom, "fr", {
            sensitivity: "base"
          });
        case "nom-desc":
          return b.nom.localeCompare(a.nom, "fr", {
            sensitivity: "base"
          });
        case "espece-asc":
          return a.espece.localeCompare(b.espece, "fr", {
            sensitivity: "base"
          });
        case "acquisition-desc": {
          const da = a.dateAcquisition ? new Date(a.dateAcquisition).getTime() : null;
          const db = b.dateAcquisition ? new Date(b.dateAcquisition).getTime() : null;
          if (da === null && db === null) return 0;
          if (da === null) return 1;
          if (db === null) return -1;
          return db - da;
        }
        case "acquisition-asc": {
          const da = a.dateAcquisition ? new Date(a.dateAcquisition).getTime() : null;
          const db = b.dateAcquisition ? new Date(b.dateAcquisition).getTime() : null;
          if (da === null && db === null) return 0;
          if (da === null) return 1;
          if (db === null) return -1;
          return da - db;
        }
        case "valeur-desc": {
          const va = a.valeurEstimee ?? null;
          const vb = b.valeurEstimee ?? null;
          if (va === null && vb === null) return 0;
          if (va === null) return 1;
          if (vb === null) return -1;
          return vb - va;
        }
        default:
          return 0;
      }
    };
    return list.sort((a, b) => {
      if (favorisFirst) {
        const diff = Number(!!b.favori) - Number(!!a.favori);
        if (diff !== 0) return diff;
      }
      return cmp(a, b);
    });
  }, [bonsais, q, styleFilter, statutFilter, sortBy, favorisFirst]);
  const actifsCount = bonsais.filter((b) => b.dansCollection ?? true).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8 flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-muted-foreground", children: "Collection" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-4xl font-semibold", children: "Mes bonsaïs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          actifsCount,
          " arbre",
          actifsCount > 1 ? "s" : "",
          " dans votre collection",
          bonsais.length > actifsCount && ` · ${bonsais.length - actifsCount} sorti${bonsais.length - actifsCount > 1 ? "s" : ""}`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bonsai/nouveau", className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Nouveau bonsaï"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-[240px] flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Rechercher par nom, espèce, origine…", "aria-label": "Rechercher dans la collection", className: "h-11 rounded-full bg-card pl-10" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: styleFilter, onChange: (e) => setStyleFilter(e.target.value), "aria-label": "Filtrer par style de bonsaï", className: "h-11 rounded-full border border-input bg-card px-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Tous les styles" }),
        STYLES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.value, children: s.label }, s.value))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: statutFilter, onChange: (e) => setStatutFilter(e.target.value), "aria-label": "Filtrer par statut dans la collection", className: "h-11 rounded-full border border-input bg-card px-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "actifs", children: "Dans la collection" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "favoris", children: "Favoris" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "sortis", children: "Sortis de la collection" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "tous", children: "Tous" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sortBy, onValueChange: (v) => setSortBy(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "aria-label": "Trier les bonsaïs", className: "h-11 w-auto min-w-[200px] rounded-full border-input bg-card px-4 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Trier par…" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "nom-asc", children: "Alphabétique (A → Z)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "nom-desc", children: "Alphabétique (Z → A)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "espece-asc", children: "Par espèce (A → Z)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "acquisition-desc", children: "Acquisition (récent → ancien)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "acquisition-asc", children: "Acquisition (ancien → récent)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "valeur-desc", children: "Valeur estimée (décroissante)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex h-11 cursor-pointer items-center gap-2 rounded-full border border-input bg-card px-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: favorisFirst, onCheckedChange: (v) => setFavorisFirst(v === true), "aria-label": "Favoris en premier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Favoris en premier" })
      ] })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-dashed border-border bg-card/50 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-2xl font-semibold", children: bonsais.length === 0 ? "Votre collection est vide" : "Aucun arbre ne correspond" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: bonsais.length === 0 ? "Ajoutez votre premier bonsaï pour commencer votre carnet." : "Modifiez vos filtres pour voir d'autres arbres." }),
      bonsais.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bonsai/nouveau", className: "mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Ajouter un bonsaï"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: filtered.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bonsai/$id", params: {
      id: b.id
    }, className: "group block overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] w-full overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BonsaiPhoto, { photoId: b.photoPrincipale, className: `h-full w-full object-cover transition duration-500 group-hover:scale-105 ${b.dansCollection ?? true ? "" : "grayscale"}` }),
        !(b.dansCollection ?? true) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur", children: "Sorti" }),
        b.favori && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-amber-500 backdrop-blur", "aria-label": "Favori", title: "Favori", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-current" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "truncate font-display text-lg font-semibold", children: b.nom }),
          ageActuel(b) != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 text-xs text-muted-foreground", children: [
            ageActuel(b),
            " ans"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm italic text-muted-foreground", children: b.espece }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[11px] uppercase tracking-wider text-accent", children: styleLabel(b.style).split(" — ")[0] })
      ] })
    ] }) }, b.id)) })
  ] });
}
export {
  CollectionPage as component
};
