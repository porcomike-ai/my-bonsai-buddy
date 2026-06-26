import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { I as Input, l as listBonsais } from "./router-5kye6AS8.mjs";
import { A as AppShell } from "./app-shell-D2hlU-O7.mjs";
import { B as BonsaiPhoto } from "./bonsai-photo-BWTISEsp.mjs";
import { S as STYLES, s as styleLabel } from "./bonsai-meta-BJOj-HVV.mjs";
import "../_libs/sonner.mjs";
import { P as Plus, j as Search, S as Sprout, k as Star } from "../_libs/lucide-react.mjs";
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
function CollectionPage() {
  const {
    data: bonsais = []
  } = useQuery({
    queryKey: ["bonsais"],
    queryFn: listBonsais
  });
  const [q, setQ] = reactExports.useState("");
  const [styleFilter, setStyleFilter] = reactExports.useState("");
  const [statutFilter, setStatutFilter] = reactExports.useState("actifs");
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
    return list.sort((a, b) => Number(!!b.favori) - Number(!!a.favori));
  }, [bonsais, q, styleFilter, statutFilter]);
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
          b.ageEstime != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 text-xs text-muted-foreground", children: [
            b.ageEstime,
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
