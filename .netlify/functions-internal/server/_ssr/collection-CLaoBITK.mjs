import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { R as Route$f, g as collectionSearchToFilters, h as filterAndSortBonsais, S as STYLES, D as DEFAULT_COLLECTION_FILTERS, i as Select, j as SelectTrigger, k as SelectValue, m as SelectContent, n as SelectItem, I as Input, B as Button, L as Label, d as cn, f as ageActuel, e as etapeLabel, c as styleLabel, o as filtersToCollectionSearch, l as listBonsais } from "./router-BaPlfOky.mjs";
import { A as AppShell } from "./app-shell-D55QzivN.mjs";
import { B as BonsaiPhoto } from "./bonsai-photo-DCTMNw5t.mjs";
import { S as StatusBadge, e as etapeToVariant } from "./status-badge-ShFCJxE8.mjs";
import { C as Checkbox } from "./checkbox-D1c8SV3t.mjs";
import { D as Dialog, a as DialogPortal, b as DialogContent, f as DialogClose, d as DialogTitle, e as DialogDescription, g as DialogOverlay } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import "../_libs/sonner.mjs";
import "../_libs/lovable.dev__mcp-js.mjs";
import "../_libs/modelcontextprotocol__sdk.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/ajv-formats.mjs";
import { X, P as Plus, s as Search, t as SlidersHorizontal, f as Sprout, o as Star } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-radio-group.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/date-fns.mjs";
import "../_libs/zod.mjs";
import "../_libs/jose.mjs";
import "../_libs/ajv.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/json-schema-traverse.mjs";
import "../_libs/fast-uri.mjs";
import "./photo-cache-p8x8uRxC.mjs";
import "../_libs/radix-ui__react-checkbox.mjs";
function BonsaiCard({
  bonsai,
  search,
  density = "comfortable",
  className
}) {
  const isCompact = density === "compact";
  const etape = bonsai.etape;
  const isSorti = !(bonsai.dansCollection ?? true);
  const age = ageActuel(bonsai);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/bonsai/$id",
      params: { id: bonsai.id },
      search,
      className: cn(
        "group relative flex flex-col overflow-hidden border border-border bg-card transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md",
        isCompact ? "rounded-xl" : "rounded-2xl",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "relative overflow-hidden bg-muted",
              isCompact ? "aspect-square" : "aspect-[4/5]"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                BonsaiPhoto,
                {
                  photoId: bonsai.photoPrincipale,
                  className: cn(
                    "h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]",
                    isSorti && "grayscale"
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-2.5 top-2.5 flex flex-wrap gap-1.5", children: isSorti ? /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { variant: "sorti", label: "Sorti", size: "sm" }) : etape ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatusBadge,
                {
                  variant: etapeToVariant(etape),
                  label: etapeLabel(etape),
                  size: "sm"
                }
              ) : null }),
              bonsai.favori && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-background/95 shadow-sm backdrop-blur-md",
                  "aria-label": "Favori",
                  title: "Favori",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-terracotta text-terracotta", strokeWidth: 2.25 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-3 text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: cn(
                      "font-display font-semibold leading-tight tracking-tight drop-shadow-sm",
                      isCompact ? "text-sm" : "text-base"
                    ),
                    children: bonsai.nom
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate text-xs italic text-white/85", children: bonsai.espece })
              ] })
            ]
          }
        ),
        !isCompact && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 px-3 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-xs text-muted-foreground", children: styleLabel(bonsai.style).split(" — ")[0] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-2 text-xs text-muted-foreground", children: [
            bonsai.hauteurCm != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              bonsai.hauteurCm,
              " cm"
            ] }),
            age != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              age,
              " ans"
            ] })
          ] })
        ] })
      ]
    }
  );
}
const Sheet = Dialog;
const SheetPortal = DialogPortal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogOverlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = DialogOverlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = DialogContent.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
SheetFooter.displayName = "SheetFooter";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogTitle,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = DialogTitle.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogDescription,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = DialogDescription.displayName;
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
const ALL_STYLES = "__all__";
const STATUT_LABELS = {
  actifs: "Dans la collection",
  favoris: "Favoris",
  sortis: "Sortis",
  tous: "Tous"
};
const SORT_LABELS = {
  "nom-asc": "A → Z",
  "nom-desc": "Z → A",
  "espece-asc": "Espèce",
  "acquisition-desc": "Acquisition ↓",
  "acquisition-asc": "Acquisition ↑",
  "valeur-desc": "Valeur ↓"
};
function CollectionPage() {
  const {
    data: bonsais = []
  } = useQuery({
    queryKey: ["bonsais"],
    queryFn: listBonsais
  });
  const navigate = useNavigate({
    from: "/collection"
  });
  const search = Route$f.useSearch();
  const filters = collectionSearchToFilters(search);
  const {
    q,
    style: styleFilter,
    statut: statutFilter,
    sort: sortBy,
    favorisFirst
  } = filters;
  useIsMobile();
  const [sheetOpen, setSheetOpen] = reactExports.useState(false);
  const patchFilters = (patch) => {
    const next = {
      ...filters,
      ...patch
    };
    navigate({
      search: filtersToCollectionSearch(next),
      replace: true
    });
  };
  const setQ = (v) => patchFilters({
    q: v
  });
  const setStyleFilter = (v) => patchFilters({
    style: v
  });
  const setStatutFilter = (v) => patchFilters({
    statut: v
  });
  const setSortBy = (v) => patchFilters({
    sort: v
  });
  const setFavorisFirst = (v) => patchFilters({
    favorisFirst: v
  });
  const filtered = reactExports.useMemo(() => filterAndSortBonsais(bonsais, filters), [bonsais, q, styleFilter, statutFilter, sortBy, favorisFirst]);
  const actifsCount = bonsais.filter((b) => b.dansCollection ?? true).length;
  const [isNarrow, setIsNarrow] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => setIsNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  const density = isNarrow ? "compact" : "comfortable";
  const chips = reactExports.useMemo(() => {
    const list = [];
    if (q.trim()) {
      list.push({
        key: "q",
        label: `« ${q.trim()} »`,
        clear: () => setQ("")
      });
    }
    if (styleFilter) {
      const styleName = STYLES.find((s) => s.value === styleFilter)?.label.split(" — ")[0] ?? styleFilter;
      list.push({
        key: "style",
        label: styleName,
        clear: () => setStyleFilter("")
      });
    }
    if (statutFilter !== DEFAULT_COLLECTION_FILTERS.statut) {
      list.push({
        key: "statut",
        label: STATUT_LABELS[statutFilter],
        clear: () => setStatutFilter(DEFAULT_COLLECTION_FILTERS.statut)
      });
    }
    if (sortBy !== DEFAULT_COLLECTION_FILTERS.sort) {
      list.push({
        key: "sort",
        label: SORT_LABELS[sortBy],
        clear: () => setSortBy(DEFAULT_COLLECTION_FILTERS.sort)
      });
    }
    if (favorisFirst) {
      list.push({
        key: "fav",
        label: "Favoris en premier",
        clear: () => setFavorisFirst(false)
      });
    }
    return list;
  }, [q, styleFilter, statutFilter, sortBy, favorisFirst]);
  const filterBadgeCount = chips.filter((c) => c.key !== "q").length;
  const clearAllFilters = () => {
    navigate({
      search: {},
      replace: true
    });
  };
  const filtersControls = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: styleFilter || ALL_STYLES, onValueChange: (v) => setStyleFilter(v === ALL_STYLES ? "" : v), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "aria-label": "Filtrer par style de bonsaï", className: "h-11 w-full rounded-full border-input bg-card px-4 text-sm sm:w-auto sm:min-w-[140px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Tous les styles" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ALL_STYLES, children: "Tous les styles" }),
        STYLES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statutFilter, onValueChange: (v) => setStatutFilter(v), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "aria-label": "Filtrer par statut dans la collection", className: "h-11 w-full rounded-full border-input bg-card px-4 text-sm sm:w-auto sm:min-w-[160px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "actifs", children: "Dans la collection" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "favoris", children: "Favoris" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sortis", children: "Sortis de la collection" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "tous", children: "Tous" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sortBy, onValueChange: (v) => setSortBy(v), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "aria-label": "Trier les bonsaïs", className: "h-11 w-full rounded-full border-input bg-card px-4 text-sm sm:w-auto sm:min-w-[160px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Trier par…" }) }),
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
  ] });
  const chipsRow = chips.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: [
    chips.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: c.clear, className: "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent transition hover:bg-accent/20", children: [
      c.label,
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
    ] }, c.key)),
    chips.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: clearAllFilters, className: "shrink-0 text-[11px] font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline", children: "Tout effacer" })
  ] }) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6 flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label", children: "Collection" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-4xl font-semibold tracking-tight", children: "Mes bonsaïs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          actifsCount,
          " arbre",
          actifsCount > 1 ? "s" : "",
          " dans votre collection",
          bonsais.length > actifsCount && ` · ${bonsais.length - actifsCount} sorti${bonsais.length - actifsCount > 1 ? "s" : ""}`,
          filtered.length !== bonsais.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent", children: [
            " ",
            "· ",
            filtered.length,
            " affiché",
            filtered.length > 1 ? "s" : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bonsai/nouveau", className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Nouveau bonsaï"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky z-20 -mx-4 mb-4 space-y-2 border-b border-border/40 bg-background/95 px-4 py-2.5 backdrop-blur-md supports-[backdrop-filter]:bg-background/85 sm:-mx-6 sm:px-6", style: {
      top: "var(--app-header-h, 4.5rem)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 lg:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Rechercher…", "aria-label": "Rechercher dans la collection", className: "h-10 rounded-full bg-card pl-10" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", onClick: () => setSheetOpen(true), className: "relative h-10 shrink-0 rounded-full px-3", "aria-label": "Ouvrir les filtres", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
          filterBadgeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground", children: filterBadgeCount })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden flex-wrap gap-3 lg:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-[200px] flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Rechercher par nom, espèce, origine…", "aria-label": "Rechercher dans la collection", className: "h-11 rounded-full bg-card pl-10" })
        ] }),
        filtersControls
      ] }),
      chipsRow
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: sheetOpen, onOpenChange: setSheetOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "bottom", className: "max-h-[85vh] overflow-y-auto rounded-t-3xl pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display text-xl", children: "Filtres" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Affine ta collection par style, statut et tri." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-label", children: "Style" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: styleFilter || ALL_STYLES, onValueChange: (v) => setStyleFilter(v === ALL_STYLES ? "" : v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "aria-label": "Style", className: "h-11 w-full rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Tous les styles" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ALL_STYLES, children: "Tous les styles" }),
              STYLES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-label", children: "Statut" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statutFilter, onValueChange: (v) => setStatutFilter(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "aria-label": "Statut", className: "h-11 w-full rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "actifs", children: "Dans la collection" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "favoris", children: "Favoris" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sortis", children: "Sortis de la collection" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "tous", children: "Tous" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-label", children: "Tri" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sortBy, onValueChange: (v) => setSortBy(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "aria-label": "Tri", className: "h-11 w-full rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "nom-asc", children: "Alphabétique (A → Z)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "nom-desc", children: "Alphabétique (Z → A)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "espece-asc", children: "Par espèce (A → Z)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "acquisition-desc", children: "Acquisition (récent → ancien)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "acquisition-asc", children: "Acquisition (ancien → récent)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "valeur-desc", children: "Valeur estimée (décroissante)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-3 rounded-2xl border border-input bg-card px-4 py-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: favorisFirst, onCheckedChange: (v) => setFavorisFirst(v === true), "aria-label": "Favoris en premier" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Favoris en premier" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetFooter, { className: "mt-8 mb-2 flex flex-row gap-2 sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", className: "flex-1 rounded-full", onClick: () => {
          clearAllFilters();
        }, disabled: filterBadgeCount === 0 && !q.trim(), children: "Tout effacer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", className: "flex-1 rounded-full", onClick: () => setSheetOpen(false), children: [
          "Voir ",
          filtered.length,
          " résultat",
          filtered.length > 1 ? "s" : ""
        ] })
      ] })
    ] }) }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-dashed border-border bg-card/50 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-2xl font-semibold", children: bonsais.length === 0 ? "Votre collection est vide" : "Aucun arbre ne correspond" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: bonsais.length === 0 ? "Ajoutez votre premier bonsaï pour commencer votre carnet." : "Modifiez vos filtres pour voir d'autres arbres." }),
      bonsais.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bonsai/nouveau", className: "mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Ajouter un bonsaï"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4", children: filtered.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "min-w-0", style: {
      contentVisibility: "auto",
      containIntrinsicSize: density === "compact" ? "auto 220px" : "auto 380px"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(BonsaiCard, { bonsai: b, search, density }) }, b.id)) })
  ] });
}
export {
  CollectionPage as component
};
