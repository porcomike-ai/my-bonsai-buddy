import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useNavigate, e as useLocation } from "../_libs/tanstack__react-router.mjs";
import { Q as redirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-CWZp_xfH.mjs";
import { c as createTanStackInvokeToolHandler, a as createTanStackOAuthProtectedResourceMetadataHandler, b as createTanStackListToolsHandler, d as createTanStackMcpHandler, e as defineTool, f as defineMcp, g as auth } from "../_libs/lovable.dev__mcp-js.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { S as SelectTrigger$1, a as SelectIcon, b as SelectScrollUpButton$1, c as SelectScrollDownButton$1, d as SelectPortal, e as SelectContent$1, f as SelectViewport, g as SelectLabel$1, h as SelectItem$1, i as SelectItemIndicator, j as SelectItemText, k as SelectSeparator$1, l as Select$1, m as SelectValue$1 } from "../_libs/radix-ui__react-select.mjs";
import { g as DialogOverlay$1, a as DialogPortal$1, b as DialogContent$1, f as DialogClose, d as DialogTitle$1, e as DialogDescription$1, D as Dialog$1, h as DialogTrigger$1 } from "../_libs/radix-ui__react-dialog.mjs";
import { R as RadioGroup$1, a as RadioGroupItem$1, b as RadioGroupIndicator } from "../_libs/radix-ui__react-radio-group.mjs";
import { C as ChevronDown, a as ChevronUp, b as Check, X, c as Circle, d as Camera, S as Sparkles, e as Calendar, F as FileText, L as Loader, I as ImagePlus } from "../_libs/lucide-react.mjs";
import { f as format, a as fr, p as parseISO } from "../_libs/date-fns.mjs";
import { d as string, k as boolean, n as number, _ as _enum } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/jose.mjs";
import "../_libs/modelcontextprotocol__sdk.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/ajv.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/json-schema-traverse.mjs";
import "../_libs/fast-uri.mjs";
import "../_libs/ajv-formats.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
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
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
const appCss = "/assets/styles-DFQZE1AH.css";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const AuthContext = reactExports.createContext(null);
function SupabaseAuthProvider({ children }) {
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session)).finally(() => setLoading(false));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      (async () => {
        setSession(newSession);
      })();
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);
  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };
  const signUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AuthContext.Provider,
    {
      value: {
        user: session?.user ?? null,
        session,
        loading,
        signIn,
        signUp,
        signOut
      },
      children
    }
  );
}
function useAuth() {
  const ctx = reactExports.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans <SupabaseAuthProvider>");
  return ctx;
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl font-semibold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-xl font-semibold text-foreground", children: "Page introuvable" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Cette page n'existe pas ou a été déplacée." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Retour à l'accueil"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-semibold tracking-tight text-foreground", children: "Cette page n'a pas pu être chargée" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Une erreur est survenue. Essayez de rafraîchir ou revenez à l'accueil." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Réessayer"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
          children: "Accueil"
        }
      )
    ] })
  ] }) });
}
const Route$i = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#3d5a3d" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "Bonsaï" },
      { name: "google-site-verification", content: "2KS3qzFwi65SJXIQUhMxDwdmxT9G6GAGyUyRe51xLcs" },
      { title: "Bonsaï Studio — Carnet de collection" },
      {
        name: "description",
        content: "Carnet personnel pour gérer votre collection de bonsaïs : fiches, galerie évolutive, journal d'entretien, rappels et poteries."
      },
      { name: "author", content: "Bonsaï Studio" },
      { property: "og:site_name", content: "Bonsaï Studio" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/icon-512.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "fr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$i.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SupabaseAuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthGate, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) }) });
}
function AuthGate({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const pathname = useLocation({ select: (l) => l.pathname });
  const isAuthRoute = pathname === "/connexion" || pathname === "/inscription";
  reactExports.useEffect(() => {
    if (!loading && !user && !isAuthRoute) {
      navigate({
        to: "/connexion",
        search: { redirect: pathname },
        replace: true
      });
    }
  }, [user, loading, pathname, isAuthRoute, navigate]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Chargement…" }) });
  }
  if (!user && !isAuthRoute) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
const $$splitComponentImporter$c = () => import("./index-C1i8tc8L.mjs");
const Route$h = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Tableau de bord — Bonsaï Studio"
    }, {
      name: "description",
      content: "Vue d'ensemble de votre collection de bonsaïs : prochains soins, rappels en retard et derniers arbres ajoutés."
    }, {
      property: "og:title",
      content: "Tableau de bord — Bonsaï Studio"
    }, {
      property: "og:description",
      content: "Vue d'ensemble de votre collection de bonsaïs et des prochains soins."
    }, {
      property: "og:url",
      content: "/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./calendrier-o2QT7PiT.mjs");
const Route$g = createFileRoute("/calendrier")({
  head: () => ({
    meta: [{
      title: "Calendrier des soins — Bonsaï Studio"
    }, {
      name: "description",
      content: "Calendrier mensuel des rappels d'entretien et évènements pour vos bonsaïs, avec notifications avant l'échéance pour les évènements."
    }, {
      property: "og:title",
      content: "Calendrier des soins — Bonsaï Studio"
    }, {
      property: "og:description",
      content: "Rappels d'entretien et évènements pour vos bonsaïs."
    }, {
      property: "og:url",
      content: "/calendrier"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const DEFAULT_COLLECTION_FILTERS = {
  q: "",
  style: "",
  statut: "actifs",
  sort: "nom-asc",
  favorisFirst: false
};
function filterAndSortBonsais(bonsais, filters) {
  const needle = filters.q.trim().toLowerCase();
  const list = bonsais.filter((b) => {
    const dans = b.dansCollection ?? true;
    if (filters.statut === "actifs" && !dans) return false;
    if (filters.statut === "sortis" && dans) return false;
    if (filters.statut === "favoris" && !b.favori) return false;
    if (filters.style && b.style !== filters.style) return false;
    if (!needle) return true;
    return b.nom.toLowerCase().includes(needle) || b.espece.toLowerCase().includes(needle) || (b.origine ?? "").toLowerCase().includes(needle);
  });
  const cmp = (a, b) => {
    switch (filters.sort) {
      case "nom-asc":
        return a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" });
      case "nom-desc":
        return b.nom.localeCompare(a.nom, "fr", { sensitivity: "base" });
      case "espece-asc":
        return a.espece.localeCompare(b.espece, "fr", { sensitivity: "base" });
      case "acquisition-desc": {
        const da = a.dateAcquisition ? new Date(a.dateAcquisition).getTime() : null;
        const db2 = b.dateAcquisition ? new Date(b.dateAcquisition).getTime() : null;
        if (da === null && db2 === null) return 0;
        if (da === null) return 1;
        if (db2 === null) return -1;
        return db2 - da;
      }
      case "acquisition-asc": {
        const da = a.dateAcquisition ? new Date(a.dateAcquisition).getTime() : null;
        const db2 = b.dateAcquisition ? new Date(b.dateAcquisition).getTime() : null;
        if (da === null && db2 === null) return 0;
        if (da === null) return 1;
        if (db2 === null) return -1;
        return da - db2;
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
    if (filters.favorisFirst) {
      const diff = Number(!!b.favori) - Number(!!a.favori);
      if (diff !== 0) return diff;
    }
    return cmp(a, b);
  });
}
const VALID_STATUTS = ["actifs", "sortis", "tous", "favoris"];
const VALID_SORTS = [
  "nom-asc",
  "nom-desc",
  "espece-asc",
  "acquisition-desc",
  "acquisition-asc",
  "valeur-desc"
];
function validateCollectionSearch(s) {
  return {
    q: typeof s.q === "string" ? s.q : void 0,
    style: typeof s.style === "string" ? s.style : void 0,
    statut: typeof s.statut === "string" && VALID_STATUTS.includes(s.statut) ? s.statut : void 0,
    sort: typeof s.sort === "string" && VALID_SORTS.includes(s.sort) ? s.sort : void 0,
    fav: s.fav === true || s.fav === "true" ? true : void 0
  };
}
function collectionSearchToFilters(s) {
  return {
    q: s.q ?? DEFAULT_COLLECTION_FILTERS.q,
    style: s.style ?? DEFAULT_COLLECTION_FILTERS.style,
    statut: s.statut ?? DEFAULT_COLLECTION_FILTERS.statut,
    sort: s.sort ?? DEFAULT_COLLECTION_FILTERS.sort,
    favorisFirst: s.fav ?? DEFAULT_COLLECTION_FILTERS.favorisFirst
  };
}
function filtersToCollectionSearch(f) {
  const s = {};
  if (f.q !== DEFAULT_COLLECTION_FILTERS.q) s.q = f.q;
  if (f.style !== DEFAULT_COLLECTION_FILTERS.style) s.style = f.style;
  if (f.statut !== DEFAULT_COLLECTION_FILTERS.statut) s.statut = f.statut;
  if (f.sort !== DEFAULT_COLLECTION_FILTERS.sort) s.sort = f.sort;
  if (f.favorisFirst !== DEFAULT_COLLECTION_FILTERS.favorisFirst) s.fav = true;
  return s;
}
const $$splitComponentImporter$a = () => import("./collection-C_nZHPAO.mjs");
const Route$f = createFileRoute("/collection")({
  validateSearch: validateCollectionSearch,
  head: () => ({
    meta: [{
      title: "Mes bonsaïs — Bonsaï Studio"
    }, {
      name: "description",
      content: "Toute votre collection de bonsaïs en un coup d'œil : filtres par style, recherche et statut de chaque arbre."
    }, {
      property: "og:title",
      content: "Mes bonsaïs — Bonsaï Studio"
    }, {
      property: "og:description",
      content: "Parcourez votre collection de bonsaïs avec filtres par style et statut."
    }, {
      property: "og:url",
      content: "/collection"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./connexion-DQu-PbT0.mjs");
function isSafeRedirect(path) {
  if (!path.startsWith("/")) return false;
  if (path.includes("\\")) return false;
  if (path.startsWith("//")) return false;
  return true;
}
const Route$e = createFileRoute("/connexion")({
  validateSearch: (s) => ({
    redirect: typeof s.redirect === "string" && isSafeRedirect(s.redirect) ? s.redirect : void 0
  }),
  head: () => ({
    meta: [{
      title: "Connexion — Bonsaï Studio"
    }, {
      name: "description",
      content: "Connectez-vous à votre carnet de bonsaïs pour synchroniser vos arbres sur tous vos appareils."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./inscription-Dibet_Xh.mjs");
const Route$d = createFileRoute("/inscription")({
  head: () => ({
    meta: [{
      title: "Inscription — Bonsaï Studio"
    }, {
      name: "description",
      content: "Créez votre compte Bonsaï Studio pour sauvegarder et synchroniser votre carnet de bonsaïs sur tous vos appareils."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./journal-PLPOGZWQ.mjs");
const Route$c = createFileRoute("/journal")({
  head: () => ({
    meta: [{
      title: "Journal d'entretien — Bonsaï Studio"
    }, {
      name: "description",
      content: "Historique chronologique de tous les soins apportés à votre collection de bonsaïs, filtrable par arbre et par type."
    }, {
      property: "og:title",
      content: "Journal d'entretien — Bonsaï Studio"
    }, {
      property: "og:description",
      content: "Historique des soins apportés à vos bonsaïs."
    }, {
      property: "og:url",
      content: "/journal"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
function supabaseForUser(ctx) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env for MCP tool");
  return createClient(url, key, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false }
  });
}
function textResult(value) {
  return {
    content: [{ type: "text", text: JSON.stringify(value, null, 2) }],
    structuredContent: { value }
  };
}
function errorResult(message) {
  return { content: [{ type: "text", text: message }], isError: true };
}
const listBonsais$1 = defineTool({
  name: "list_bonsais",
  title: "Lister mes bonsaïs",
  description: "Retourne les bonsaïs de la collection de l'utilisateur connecté (nom, espèce, style, étape, favori).",
  inputSchema: {
    limit: number().int().min(1).max(200).default(50).describe("Nombre maximum de résultats"),
    favoris_only: boolean().default(false).describe("Ne renvoyer que les bonsaïs favoris"),
    search: string().optional().describe("Filtre plein-texte sur nom / espèce")
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, favoris_only, search }, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Non authentifié");
    let query = supabaseForUser(ctx).from("bonsais").select(
      "id, nom, espece, style, etape, favori, dans_collection, date_acquisition, hauteur_cm, valeur_estimee"
    ).eq("dans_collection", true).order("nom", { ascending: true }).limit(limit);
    if (favoris_only) query = query.eq("favori", true);
    if (search && search.trim()) {
      const s = `%${search.trim()}%`;
      query = query.or(`nom.ilike.${s},espece.ilike.${s}`);
    }
    const { data, error } = await query;
    if (error) return errorResult(error.message);
    return textResult({ count: data?.length ?? 0, bonsais: data ?? [] });
  }
});
const getBonsai$1 = defineTool({
  name: "get_bonsai",
  title: "Détail d'un bonsaï",
  description: "Retourne la fiche complète d'un bonsaï (métadonnées, derniers soins, prochains rappels).",
  inputSchema: {
    bonsai_id: string().uuid().describe("Identifiant du bonsaï")
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ bonsai_id }, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Non authentifié");
    const sb = supabaseForUser(ctx);
    const [bonsai, journal, rappels] = await Promise.all([
      sb.from("bonsais").select("*").eq("id", bonsai_id).maybeSingle(),
      sb.from("journal_entries").select("id, type, date, notes").eq("bonsai_id", bonsai_id).order("date", { ascending: false }).limit(10),
      sb.from("rappels").select("id, type, prochaine_date, intervalle_jours, actif, notes").eq("bonsai_id", bonsai_id).eq("actif", true).order("prochaine_date", { ascending: true })
    ]);
    if (bonsai.error) return errorResult(bonsai.error.message);
    if (!bonsai.data) return errorResult("Bonsaï introuvable");
    return textResult({
      bonsai: bonsai.data,
      derniers_soins: journal.data ?? [],
      rappels_actifs: rappels.data ?? []
    });
  }
});
const listRappels = defineTool({
  name: "list_rappels_a_venir",
  title: "Rappels à venir",
  description: "Liste les rappels d'entretien actifs à venir (par défaut sur les 30 prochains jours), triés par date.",
  inputSchema: {
    days_ahead: number().int().min(1).max(365).default(30),
    overdue_only: boolean().default(false).describe("Ne renvoyer que les rappels en retard")
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ days_ahead, overdue_only }, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Non authentifié");
    const today = /* @__PURE__ */ new Date();
    const limitDate = new Date(today.getTime() + days_ahead * 864e5);
    let q = supabaseForUser(ctx).from("rappels").select("id, bonsai_id, type, prochaine_date, intervalle_jours, notes, actif").eq("actif", true).order("prochaine_date", { ascending: true });
    if (overdue_only) {
      q = q.lt("prochaine_date", today.toISOString().slice(0, 10));
    } else {
      q = q.lte("prochaine_date", limitDate.toISOString().slice(0, 10));
    }
    const { data, error } = await q;
    if (error) return errorResult(error.message);
    return textResult({ count: data?.length ?? 0, rappels: data ?? [] });
  }
});
const STYLES = [
  { value: "chokkan", label: "Chokkan — droit formel" },
  { value: "moyogi", label: "Moyogi — droit informel" },
  { value: "shakan", label: "Shakan — incliné" },
  { value: "kengai", label: "Kengai — cascade" },
  { value: "han-kengai", label: "Han-kengai — semi-cascade" },
  { value: "bunjin", label: "Bunjin(-gi) — lettré" },
  { value: "fukinagashi", label: "Fukinagashi — battu par le vent" },
  { value: "hokidachi", label: "Hokidachi — balai" },
  { value: "sokan", label: "Sokan — double tronc" },
  { value: "sankan", label: "Sankan — triple tronc" },
  { value: "kabudachi", label: "Kabudachi — touffe (multi-troncs)" },
  { value: "yose-ue", label: "Yose-ue — forêt" },
  { value: "ikadabuki", label: "Ikadabuki — radeau" },
  { value: "netsuranari", label: "Netsuranari — radeau sinueux" },
  { value: "ishitsuki", label: "Ishitsuki — sur roche" },
  { value: "sekijoju", label: "Sekijoju — racines sur roche" },
  { value: "neagari", label: "Neagari — racines exposées" },
  { value: "sharimiki", label: "Sharimiki — bois mort (shari)" },
  { value: "sabamiki", label: "Sabamiki — tronc creusé" },
  { value: "nejikan", label: "Nejikan — tronc tordu" },
  { value: "takozukuri", label: "Takozukuri — style poulpe" },
  { value: "bankan", label: "Bankan — tronc enroulé" },
  { value: "autre", label: "Autre" }
];
const ETAPES = [
  { value: "culture", label: "En culture", short: "Culture" },
  { value: "pre-bonsai", label: "Pré-bonsaï", short: "Pré-bonsaï" },
  { value: "bonsai", label: "Bonsaï", short: "Bonsaï" }
];
function etapeLabel(e) {
  if (!e) return "Non renseigné";
  return ETAPES.find((x) => x.value === e)?.label ?? e;
}
const SOINS = [
  { value: "accident", label: "Accident", emoji: "⚠️" },
  { value: "achete", label: "Acheté", emoji: "🛒" },
  { value: "engrais", label: "Engrais", emoji: "🌱" },
  { value: "exposition", label: "Exposition", emoji: "🏆" },
  { value: "greffe", label: "Greffe", emoji: "🌿" },
  { value: "marcottage", label: "Marcottage", emoji: "🌾" },
  { value: "mise_en_forme", label: "Mise en forme", emoji: "✂️" },
  { value: "mise_en_pleine_terre", label: "Mis en pleine terre", emoji: "⛰️" },
  { value: "prelevement", label: "Prélèvement", emoji: "🪓" },
  { value: "rempotage", label: "Rempotage", emoji: "🪴" },
  { value: "don_vente", label: "Vendu/don", emoji: "🎁" },
  { value: "mort", label: "Mort", emoji: "🪦" },
  { value: "autre", label: "Autre", emoji: "•" },
  // --- Anciennes valeurs, conservées pour l'affichage de l'historique ---
  { value: "arrosage", label: "Arrosage", emoji: "💧" },
  { value: "taille", label: "Taille", emoji: "✂️" },
  { value: "fertilisation", label: "Fertilisation", emoji: "🌱" },
  { value: "traitement", label: "Traitement", emoji: "🧪" },
  { value: "ligature", label: "Ligature", emoji: "🧵" }
];
const SOINS_SELECTABLE = [
  { value: "accident", label: "Accident", emoji: "⚠️" },
  { value: "achete", label: "Acheté", emoji: "🛒" },
  { value: "engrais", label: "Engrais", emoji: "🌱" },
  { value: "exposition", label: "Exposition", emoji: "🏆" },
  { value: "greffe", label: "Greffe", emoji: "🌿" },
  { value: "marcottage", label: "Marcottage", emoji: "🌾" },
  { value: "mise_en_forme", label: "Mise en forme", emoji: "✂️" },
  { value: "mort", label: "Mort", emoji: "🪦" },
  { value: "mise_en_pleine_terre", label: "Mis en pleine terre", emoji: "⛰️" },
  { value: "prelevement", label: "Prélèvement", emoji: "🪓" },
  { value: "rempotage", label: "Rempotage", emoji: "🪴" },
  { value: "don_vente", label: "Vendu/don", emoji: "🎁" },
  { value: "autre", label: "Autre", emoji: "•" }
];
function styleLabel(s) {
  return STYLES.find((x) => x.value === s)?.label ?? s;
}
function soinLabel(s) {
  return SOINS.find((x) => x.value === s)?.label ?? s;
}
function soinEmoji(s) {
  return SOINS.find((x) => x.value === s)?.emoji ?? "•";
}
const ESPECES = [
  // Érables
  { latin: "Acer buergerianum", fr: "Érable trident" },
  { latin: "Acer palmatum", fr: "Érable du Japon" },
  { latin: "Acer palmatum 'Deshojo'", fr: "Érable du Japon Deshojo" },
  { latin: "Acer palmatum 'Kiyohime'", fr: "Érable du Japon Kiyohime" },
  { latin: "Acer palmatum 'Arakawa'", fr: "Érable à écorce de pin" },
  { latin: "Acer palmatum 'Shishigashira'", fr: "Érable tête de lion" },
  { latin: "Acer japonicum", fr: "Érable du Japon (à feuilles larges)" },
  { latin: "Acer monspessulanum", fr: "Érable de Montpellier" },
  { latin: "Acer campestre", fr: "Érable champêtre" },
  { latin: "Acer ginnala", fr: "Érable de l'Amour" },
  { latin: "Acer rubrum", fr: "Érable rouge" },
  { latin: "Acer saccharinum", fr: "Érable argenté" },
  // Charmes, hêtres, ormes
  { latin: "Carpinus betulus", fr: "Charme commun" },
  { latin: "Carpinus turczaninovii", fr: "Charme coréen" },
  { latin: "Carpinus japonica", fr: "Charme du Japon" },
  { latin: "Fagus sylvatica", fr: "Hêtre commun" },
  { latin: "Fagus crenata", fr: "Hêtre du Japon" },
  { latin: "Ulmus parvifolia", fr: "Orme de Chine" },
  { latin: "Ulmus minor", fr: "Orme champêtre" },
  { latin: "Ulmus procera", fr: "Orme anglais" },
  { latin: "Zelkova serrata", fr: "Zelkova du Japon" },
  { latin: "Celtis sinensis", fr: "Micocoulier de Chine" },
  { latin: "Celtis australis", fr: "Micocoulier de Provence" },
  // Chênes
  { latin: "Quercus robur", fr: "Chêne pédonculé" },
  { latin: "Quercus petraea", fr: "Chêne sessile" },
  { latin: "Quercus suber", fr: "Chêne-liège" },
  { latin: "Quercus ilex", fr: "Chêne vert" },
  { latin: "Quercus pubescens", fr: "Chêne pubescent" },
  { latin: "Quercus cerris", fr: "Chêne chevelu" },
  // Genévriers
  { latin: "Juniperus chinensis", fr: "Genévrier de Chine" },
  { latin: "Juniperus chinensis 'Itoigawa'", fr: "Genévrier Itoigawa" },
  { latin: "Juniperus chinensis 'Kishu'", fr: "Genévrier Kishu" },
  { latin: "Juniperus chinensis 'Shimpaku'", fr: "Genévrier Shimpaku" },
  { latin: "Juniperus procumbens", fr: "Genévrier rampant" },
  { latin: "Juniperus rigida", fr: "Genévrier rigide" },
  { latin: "Juniperus communis", fr: "Genévrier commun" },
  { latin: "Juniperus sabina", fr: "Genévrier sabine" },
  { latin: "Juniperus squamata", fr: "Genévrier écailleux" },
  // Pins
  { latin: "Pinus mugo", fr: "Pin des montagnes" },
  { latin: "Pinus parviflora", fr: "Pin blanc du Japon" },
  { latin: "Pinus sylvestris", fr: "Pin sylvestre" },
  { latin: "Pinus thunbergii", fr: "Pin noir du Japon" },
  { latin: "Pinus nigra", fr: "Pin noir d'Autriche" },
  { latin: "Pinus halepensis", fr: "Pin d'Alep" },
  { latin: "Pinus pinea", fr: "Pin parasol" },
  { latin: "Pinus pinaster", fr: "Pin maritime" },
  { latin: "Pinus densiflora", fr: "Pin rouge du Japon" },
  { latin: "Pinus strobus", fr: "Pin Weymouth" },
  { latin: "Pinus contorta", fr: "Pin tordu" },
  // Autres conifères
  { latin: "Picea abies", fr: "Épicéa commun" },
  { latin: "Picea glauca", fr: "Épicéa blanc" },
  { latin: "Picea jezoensis", fr: "Épicéa de Yeddo" },
  { latin: "Picea mariana", fr: "Épinette noire" },
  { latin: "Larix decidua", fr: "Mélèze d'Europe" },
  { latin: "Larix kaempferi", fr: "Mélèze du Japon" },
  { latin: "Taxus baccata", fr: "If commun" },
  { latin: "Taxus cuspidata", fr: "If du Japon" },
  { latin: "Cryptomeria japonica", fr: "Cèdre du Japon" },
  { latin: "Cupressus macrocarpa", fr: "Cyprès de Monterey" },
  { latin: "Cupressus sempervirens", fr: "Cyprès de Provence" },
  { latin: "Chamaecyparis obtusa", fr: "Faux-cyprès hinoki" },
  { latin: "Chamaecyparis pisifera", fr: "Faux-cyprès sawara" },
  { latin: "Thuja occidentalis", fr: "Thuya du Canada" },
  { latin: "Thuja orientalis", fr: "Thuya d'Orient" },
  { latin: "Metasequoia glyptostroboides", fr: "Métaséquoia" },
  { latin: "Taxodium distichum", fr: "Cyprès chauve" },
  { latin: "Sequoia sempervirens", fr: "Séquoia toujours vert" },
  { latin: "Cedrus atlantica", fr: "Cèdre de l'Atlas" },
  { latin: "Cedrus libani", fr: "Cèdre du Liban" },
  { latin: "Cedrus deodara", fr: "Cèdre de l'Himalaya" },
  { latin: "Abies koreana", fr: "Sapin de Corée" },
  { latin: "Tsuga canadensis", fr: "Pruche du Canada" },
  { latin: "Ginkgo biloba", fr: "Ginkgo" },
  // Fruitiers et fleurissants
  { latin: "Malus sp.", fr: "Pommier d'ornement" },
  { latin: "Malus halliana", fr: "Pommier de Hall" },
  { latin: "Pyrus communis", fr: "Poirier commun" },
  { latin: "Prunus mume", fr: "Abricotier du Japon" },
  { latin: "Prunus serrulata", fr: "Cerisier du Japon" },
  { latin: "Prunus persica", fr: "Pêcher" },
  { latin: "Prunus spinosa", fr: "Prunellier" },
  { latin: "Prunus avium", fr: "Merisier" },
  { latin: "Punica granatum", fr: "Grenadier" },
  { latin: "Punica granatum 'Nana'", fr: "Grenadier nain" },
  { latin: "Diospyros kaki", fr: "Plaqueminier (kaki)" },
  { latin: "Diospyros rhombifolia", fr: "Plaqueminier princesse" },
  { latin: "Chaenomeles japonica", fr: "Cognassier du Japon" },
  { latin: "Chaenomeles speciosa", fr: "Cognassier de Chine" },
  { latin: "Cydonia oblonga", fr: "Cognassier commun" },
  { latin: "Citrus sinensis", fr: "Oranger" },
  { latin: "Citrus limon", fr: "Citronnier" },
  { latin: "Fortunella margarita", fr: "Kumquat" },
  { latin: "Olea europaea", fr: "Olivier" },
  { latin: "Olea europaea 'Sylvestris'", fr: "Olivier sauvage" },
  { latin: "Morus alba", fr: "Mûrier blanc" },
  { latin: "Morus nigra", fr: "Mûrier noir" },
  { latin: "Ficus carica", fr: "Figuier commun" },
  // Arbustes décoratifs / haies
  { latin: "Cotoneaster horizontalis", fr: "Cotonéaster rampant" },
  { latin: "Cotoneaster microphyllus", fr: "Cotonéaster à petites feuilles" },
  { latin: "Pyracantha sp.", fr: "Buisson ardent" },
  { latin: "Crataegus monogyna", fr: "Aubépine monogyne" },
  { latin: "Crataegus laevigata", fr: "Aubépine à deux styles" },
  { latin: "Berberis thunbergii", fr: "Épine-vinette du Japon" },
  { latin: "Buxus sempervirens", fr: "Buis commun" },
  { latin: "Buxus microphylla", fr: "Buis à petites feuilles" },
  { latin: "Ilex crenata", fr: "Houx crénelé" },
  { latin: "Ilex serrata", fr: "Houx denté du Japon" },
  { latin: "Ilex aquifolium", fr: "Houx commun" },
  { latin: "Ligustrum sinense", fr: "Troène de Chine" },
  { latin: "Ligustrum ovalifolium", fr: "Troène ovale" },
  { latin: "Ligustrum vulgare", fr: "Troène commun" },
  { latin: "Euonymus europaeus", fr: "Fusain d'Europe" },
  { latin: "Euonymus alatus", fr: "Fusain ailé" },
  { latin: "Lonicera nitida", fr: "Chèvrefeuille à feuilles de buis" },
  { latin: "Hibiscus syriacus", fr: "Althéa" },
  { latin: "Lagerstroemia indica", fr: "Lilas des Indes" },
  { latin: "Wisteria floribunda", fr: "Glycine du Japon" },
  { latin: "Wisteria sinensis", fr: "Glycine de Chine" },
  { latin: "Bougainvillea glabra", fr: "Bougainvillier" },
  { latin: "Rhododendron indicum", fr: "Azalée satsuki" },
  { latin: "Rhododendron obtusum", fr: "Azalée du Japon" },
  { latin: "Camellia japonica", fr: "Camélia du Japon" },
  { latin: "Camellia sinensis", fr: "Théier" },
  { latin: "Gardenia jasminoides", fr: "Gardénia" },
  { latin: "Pistacia lentiscus", fr: "Lentisque" },
  { latin: "Pistacia terebinthus", fr: "Térébinthe" },
  // Intérieur / tropicaux
  { latin: "Ficus retusa", fr: "Ficus ginseng" },
  { latin: "Ficus microcarpa", fr: "Ficus microcarpa" },
  { latin: "Ficus benjamina", fr: "Ficus pleureur" },
  { latin: "Ficus religiosa", fr: "Figuier des pagodes" },
  { latin: "Ficus salicaria", fr: "Ficus à feuilles de saule" },
  { latin: "Carmona retusa", fr: "Arbre à thé de Fukien" },
  { latin: "Sageretia theezans", fr: "Sagéretia" },
  { latin: "Serissa japonica", fr: "Serissa (arbre aux mille étoiles)" },
  { latin: "Crassula ovata", fr: "Arbre de jade" },
  { latin: "Portulacaria afra", fr: "Pourpier en arbre" },
  { latin: "Pithecellobium tortum", fr: "Brésilien (Pithecellobium)" },
  { latin: "Schefflera arboricola", fr: "Schefflera nain" },
  { latin: "Bougainvillea spectabilis", fr: "Bougainvillier spectaculaire" },
  { latin: "Tamarindus indica", fr: "Tamarinier" },
  { latin: "Adenium obesum", fr: "Rose du désert" },
  { latin: "Operculicarya decaryi", fr: "Operculicaria" },
  { latin: "Murraya paniculata", fr: "Bois jasmin" },
  // Bouleaux / saules / autres
  { latin: "Betula pendula", fr: "Bouleau verruqueux" },
  { latin: "Betula pubescens", fr: "Bouleau blanc" },
  { latin: "Alnus glutinosa", fr: "Aulne glutineux" },
  { latin: "Salix babylonica", fr: "Saule pleureur" },
  { latin: "Salix caprea", fr: "Saule marsault" },
  { latin: "Tilia cordata", fr: "Tilleul à petites feuilles" },
  { latin: "Fraxinus excelsior", fr: "Frêne commun" },
  { latin: "Robinia pseudoacacia", fr: "Robinier faux-acacia" },
  { latin: "Sorbus aucuparia", fr: "Sorbier des oiseleurs" },
  { latin: "Liquidambar styraciflua", fr: "Copalme d'Amérique" }
];
const LS_CUSTOM = "bonsai.especes.custom";
function getCustomEspeces() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_CUSTOM);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function addCustomEspece(value) {
  if (typeof window === "undefined") return;
  const v = value.trim();
  if (!v) return;
  const all = [...ESPECES, ...getCustomEspeces()];
  if (all.some(
    (e) => e.latin.toLowerCase() === v.toLowerCase() || e.fr.toLowerCase() === v.toLowerCase()
  ))
    return;
  const custom = getCustomEspeces();
  custom.push({ latin: v, fr: v });
  localStorage.setItem(LS_CUSTOM, JSON.stringify(custom));
}
function getAllEspeces() {
  return [...ESPECES, ...getCustomEspeces()];
}
const SOIN_TYPES = SOINS_SELECTABLE.map((s) => s.value);
const logSoin = defineTool({
  name: "log_soin",
  title: "Enregistrer un soin",
  description: "Ajoute une entrée dans le journal d'entretien d'un bonsaï (rempotage, engrais, greffe, etc.).",
  inputSchema: {
    bonsai_id: string().uuid(),
    type: _enum(SOIN_TYPES).describe("Type de soin"),
    date: string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe("Date ISO (YYYY-MM-DD). Par défaut : aujourd'hui."),
    notes: string().optional()
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false },
  handler: async ({ bonsai_id, type, date, notes }, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Non authentifié");
    const { data, error } = await supabaseForUser(ctx).from("journal_entries").insert({
      bonsai_id,
      user_id: ctx.getUserId(),
      type,
      date: date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      notes: notes ?? null
    }).select().single();
    if (error) return errorResult(error.message);
    return textResult({ ok: true, entry: data });
  }
});
const listPoteries$1 = defineTool({
  name: "list_poteries",
  title: "Lister mes poteries",
  description: "Retourne les poteries de la collection avec leurs dimensions et matières.",
  inputSchema: {
    limit: number().int().min(1).max(200).default(50),
    search: string().optional().describe("Filtre sur nom / artisan / forme")
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, search }, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Non authentifié");
    let q = supabaseForUser(ctx).from("poteries").select(
      "id, nom, forme, matiere, couleur, artisan, longueur_cm, largeur_cm, hauteur_cm, prix"
    ).order("nom", { ascending: true }).limit(limit);
    if (search && search.trim()) {
      const s = `%${search.trim()}%`;
      q = q.or(`nom.ilike.${s},artisan.ilike.${s},forme.ilike.${s}`);
    }
    const { data, error } = await q;
    if (error) return errorResult(error.message);
    return textResult({ count: data?.length ?? 0, poteries: data ?? [] });
  }
});
const projectRef = "xvvqffgchelmszpbdvde";
const mcp = defineMcp({
  name: "bonsai-studio-mcp",
  title: "Bonsaï Studio",
  version: "0.1.0",
  instructions: "Outils pour interagir avec votre carnet Bonsaï Studio : lister vos bonsaïs et poteries, consulter les rappels d'entretien à venir, et enregistrer les soins effectués dans le journal.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated"
  }),
  tools: [listBonsais$1, getBonsai$1, listRappels, logSoin, listPoteries$1]
});
const Route$b = createFileRoute("/mcp")({
  server: {
    handlers: {
      ANY: createTanStackMcpHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource", trustForwardedHost: true })
    }
  }
});
const $$splitComponentImporter$6 = () => import("./parametres-Bwvq8U__.mjs");
const Route$a = createFileRoute("/parametres")({
  head: () => ({
    meta: [{
      title: "Paramètres — Bonsaï Studio"
    }, {
      name: "description",
      content: "Paramètres et sauvegarde : exporter/importer vos données Supabase, migrer depuis IndexedDB et options de l'application."
    }, {
      property: "og:title",
      content: "Paramètres — Bonsaï Studio"
    }, {
      property: "og:description",
      content: "Sauvegardes Supabase et options de l'application."
    }, {
      property: "og:url",
      content: "/parametres"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const db = supabase;
function uid() {
  return crypto.randomUUID();
}
function ageActuel(b, today = /* @__PURE__ */ new Date()) {
  if (b.ageEstime == null) return void 0;
  if (!b.dateAcquisition) return b.ageEstime;
  const acquisition = new Date(b.dateAcquisition);
  let annees = today.getFullYear() - acquisition.getFullYear();
  const acqMonth = acquisition.getMonth();
  const acqDate = acqMonth === 1 && acquisition.getDate() === 29 ? 28 : acquisition.getDate();
  const pasEncoreAnniversaire = today.getMonth() < acqMonth || today.getMonth() === acqMonth && today.getDate() < acqDate;
  if (pasEncoreAnniversaire) annees -= 1;
  return b.ageEstime + Math.max(0, annees);
}
function rowToBonsai(r) {
  return {
    id: r.id,
    nom: r.nom,
    espece: r.espece,
    style: r.style,
    etape: r.etape ?? void 0,
    ageEstime: r.age_estime ?? void 0,
    dateAcquisition: r.date_acquisition ?? void 0,
    origine: r.origine ?? void 0,
    hauteurCm: r.hauteur_cm ?? void 0,
    prixAchat: r.prix_achat ?? void 0,
    valeurEstimee: r.valeur_estimee ?? void 0,
    photoPrincipale: r.photo_principale_path ?? void 0,
    poterieId: r.poterie_id ?? void 0,
    notes: r.notes ?? void 0,
    dansCollection: r.dans_collection,
    favori: r.favori,
    createdAt: r.created_at
  };
}
function bonsaiToRow(b) {
  const row = {};
  if (b.id !== void 0) row.id = b.id;
  if (b.nom !== void 0) row.nom = b.nom;
  if (b.espece !== void 0) row.espece = b.espece;
  if (b.style !== void 0) row.style = b.style;
  if (b.etape !== void 0) row.etape = b.etape;
  if (b.ageEstime !== void 0) row.age_estime = b.ageEstime;
  if (b.dateAcquisition !== void 0) row.date_acquisition = b.dateAcquisition;
  if (b.origine !== void 0) row.origine = b.origine;
  if (b.hauteurCm !== void 0) row.hauteur_cm = b.hauteurCm;
  if (b.prixAchat !== void 0) row.prix_achat = b.prixAchat;
  if (b.valeurEstimee !== void 0) row.valeur_estimee = b.valeurEstimee;
  if (b.photoPrincipale !== void 0) row.photo_principale_path = b.photoPrincipale;
  if (b.poterieId !== void 0) row.poterie_id = b.poterieId;
  if (b.notes !== void 0) row.notes = b.notes;
  if (b.dansCollection !== void 0) row.dans_collection = b.dansCollection;
  if (b.favori !== void 0) row.favori = b.favori;
  return row;
}
function rowToPoterie(r) {
  return {
    id: r.id,
    nom: r.nom,
    longueurCm: r.longueur_cm ?? void 0,
    largeurCm: r.largeur_cm ?? void 0,
    hauteurCm: r.hauteur_cm ?? void 0,
    forme: r.forme ?? void 0,
    couleur: r.couleur ?? void 0,
    matiere: r.matiere ?? void 0,
    artisan: r.artisan ?? void 0,
    origine: r.origine ?? void 0,
    prix: r.prix ?? void 0,
    photoPath: r.photo_path ?? void 0,
    notes: r.notes ?? void 0,
    createdAt: r.created_at
  };
}
function poterieToRow(p) {
  const row = {};
  if (p.id !== void 0) row.id = p.id;
  if (p.nom !== void 0) row.nom = p.nom;
  if (p.longueurCm !== void 0) row.longueur_cm = p.longueurCm;
  if (p.largeurCm !== void 0) row.largeur_cm = p.largeurCm;
  if (p.hauteurCm !== void 0) row.hauteur_cm = p.hauteurCm;
  if (p.forme !== void 0) row.forme = p.forme;
  if (p.couleur !== void 0) row.couleur = p.couleur;
  if (p.matiere !== void 0) row.matiere = p.matiere;
  if (p.artisan !== void 0) row.artisan = p.artisan;
  if (p.origine !== void 0) row.origine = p.origine;
  if (p.prix !== void 0) row.prix = p.prix;
  if (p.photoPath !== void 0) row.photo_path = p.photoPath;
  if (p.notes !== void 0) row.notes = p.notes;
  return row;
}
function rowToPhoto(r) {
  return {
    id: r.id,
    bonsaiId: r.bonsai_id ?? void 0,
    poterieId: r.poterie_id ?? void 0,
    storagePath: r.storage_path,
    date: r.date,
    legende: r.legende ?? void 0
  };
}
let cachedUserId;
db.auth.onAuthStateChange?.((event, session) => {
  cachedUserId = event === "SIGNED_OUT" ? void 0 : session?.user?.id;
});
async function currentUserId() {
  if (cachedUserId) return cachedUserId;
  const {
    data: { user }
  } = await db.auth.getUser();
  if (!user) throw new Error("Non authentifié");
  cachedUserId = user.id;
  return user.id;
}
const BONSAI_BUCKET = "bonsai-photos";
const POTERIE_BUCKET = "poterie-photos";
function bonsaiPhotoPath(uidStr, bonsaiId, photoId) {
  return `${uidStr}/${bonsaiId}/${photoId}.jpg`;
}
function poteriePhotoPath(uidStr, poterieId) {
  return `${uidStr}/${poterieId}.jpg`;
}
async function uploadBonsaiPhoto(uidStr, photoId, bonsaiId, blob) {
  const path = bonsaiPhotoPath(uidStr, bonsaiId, photoId);
  const { error } = await db.storage.from(BONSAI_BUCKET).upload(path, blob, { upsert: true, contentType: blob.type || "image/jpeg" });
  if (error) throw error;
  return path;
}
async function uploadPoteriePhoto(uidStr, poterieId, blob) {
  const path = poteriePhotoPath(uidStr, poterieId);
  const { error } = await db.storage.from(POTERIE_BUCKET).upload(path, blob, { upsert: true, contentType: blob.type || "image/jpeg" });
  if (error) throw error;
  return path;
}
async function uploadPoterieGalleryPhoto(uidStr, photoId, poterieId, blob) {
  const path = `${uidStr}/${poterieId}/${photoId}.jpg`;
  const { error } = await db.storage.from(POTERIE_BUCKET).upload(path, blob, { upsert: true, contentType: blob.type || "image/jpeg" });
  if (error) throw error;
  return path;
}
async function deleteStorageObject(bucket, path) {
  await db.storage.from(bucket).remove([path]);
}
const FETCH_CHUNK_SIZE = 1e3;
async function fetchAllRows(runQuery) {
  const MAX_ITERATIONS = 1e3;
  const all = [];
  let from = 0;
  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const to = from + FETCH_CHUNK_SIZE - 1;
    const { data, error } = await runQuery(from, to);
    if (error) throw error;
    const rows = data ?? [];
    all.push(...rows);
    if (rows.length < FETCH_CHUNK_SIZE) return all;
    from += FETCH_CHUNK_SIZE;
  }
  throw new Error(
    `fetchAllRows: plafond de ${MAX_ITERATIONS} itérations atteint sans fin de pagination — abandon.`
  );
}
async function listBonsais() {
  const rows = await fetchAllRows(
    (from, to) => db.from("bonsais").select("*").order("created_at", { ascending: false }).range(from, to)
  );
  return rows.map(rowToBonsai);
}
async function getBonsai(id) {
  const { data, error } = await db.from("bonsais").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? rowToBonsai(data) : void 0;
}
async function saveBonsai(b) {
  const uidStr = await currentUserId();
  const { error } = await db.from("bonsais").upsert({ ...bonsaiToRow(b), user_id: uidStr });
  if (error) throw error;
}
async function deleteBonsai(id) {
  const { data: photos } = await db.from("photos").select("storage_path").eq("bonsai_id", id);
  if (photos && photos.length > 0) {
    const paths = photos.map((p) => p.storage_path);
    await db.storage.from(BONSAI_BUCKET).remove(paths);
  }
  const { error } = await db.from("bonsais").delete().eq("id", id);
  if (error) throw error;
}
async function listPhotos(bonsaiId) {
  const rows = await fetchAllRows(
    (from, to) => db.from("photos").select("*").eq("bonsai_id", bonsaiId).order("date", { ascending: false }).range(from, to)
  );
  return rows.map(rowToPhoto);
}
async function listAllPhotos() {
  const rows = await fetchAllRows(
    (from, to) => db.from("photos").select("*").not("bonsai_id", "is", null).order("date", { ascending: false }).range(from, to)
  );
  return rows.map(rowToPhoto);
}
async function listAllPoteriePhotos() {
  const rows = await fetchAllRows(
    (from, to) => db.from("photos").select("*").not("poterie_id", "is", null).order("date", { ascending: false }).range(from, to)
  );
  return rows.map(rowToPhoto);
}
async function getPhoto(id) {
  const { data, error } = await db.from("photos").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? rowToPhoto(data) : void 0;
}
async function getPhotoBlob(photo) {
  if (!photo.storagePath) return void 0;
  const bucket = photo.poterieId ? POTERIE_BUCKET : BONSAI_BUCKET;
  const { data, error } = await db.storage.from(bucket).download(photo.storagePath);
  if (error) {
    const msg = String(error.message ?? "").toLowerCase();
    if (msg.includes("not found") || msg.includes("does not exist")) return void 0;
    throw error;
  }
  return data ?? void 0;
}
async function getPoteriePhoto(poterie) {
  if (!poterie.photoPath) return void 0;
  const { data, error } = await db.storage.from(POTERIE_BUCKET).download(poterie.photoPath);
  if (error) {
    const msg = String(error.message ?? "").toLowerCase();
    if (msg.includes("not found") || msg.includes("does not exist")) return void 0;
    throw error;
  }
  return data ?? void 0;
}
async function savePhoto(photo) {
  if (!photo.blob) throw new Error("savePhoto: blob manquant");
  if (!photo.bonsaiId) throw new Error("savePhoto: bonsaiId manquant");
  const uidStr = await currentUserId();
  const path = await uploadBonsaiPhoto(uidStr, photo.id, photo.bonsaiId, photo.blob);
  const { error } = await db.from("photos").upsert({
    id: photo.id,
    bonsai_id: photo.bonsaiId,
    storage_path: path,
    date: photo.date,
    legende: photo.legende ?? null,
    user_id: uidStr
  });
  if (error) {
    await deleteStorageObject(BONSAI_BUCKET, path);
    throw error;
  }
  return path;
}
async function deletePhoto(id) {
  const photo = await getPhoto(id);
  if (!photo) return;
  if (photo.storagePath) {
    const bucket = photo.poterieId ? POTERIE_BUCKET : BONSAI_BUCKET;
    await deleteStorageObject(bucket, photo.storagePath);
  }
  const { error } = await db.from("photos").delete().eq("id", id);
  if (error) throw error;
}
async function updatePhotoLegende(id, legende) {
  const { error } = await db.from("photos").update({ legende }).eq("id", id);
  if (error) throw error;
}
async function updatePhotoDate(id, date) {
  const { error } = await db.from("photos").update({ date }).eq("id", id);
  if (error) throw error;
}
async function listPoteries() {
  const rows = await fetchAllRows(
    (from, to) => db.from("poteries").select("*").order("created_at", { ascending: false }).range(from, to)
  );
  return rows.map(rowToPoterie);
}
async function getPoterie(id) {
  const { data, error } = await db.from("poteries").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? rowToPoterie(data) : void 0;
}
async function savePoterie(p) {
  const uidStr = await currentUserId();
  let photoPath = p.photoPath;
  if (p.photoBlob) {
    photoPath = await uploadPoteriePhoto(uidStr, p.id, p.photoBlob);
  }
  const row = poterieToRow({ ...p, photoPath });
  const { error } = await db.from("poteries").upsert({ ...row, user_id: uidStr });
  if (error) {
    if (p.photoBlob && photoPath) await deleteStorageObject(POTERIE_BUCKET, photoPath);
    throw error;
  }
}
async function deletePoterie(id) {
  const poterie = await getPoterie(id);
  if (poterie?.photoPath) await deleteStorageObject(POTERIE_BUCKET, poterie.photoPath);
  const { data: photos } = await db.from("photos").select("storage_path").eq("poterie_id", id);
  if (photos && photos.length > 0) {
    const paths = photos.map((p) => p.storage_path);
    await db.storage.from(POTERIE_BUCKET).remove(paths);
  }
  const { error } = await db.from("poteries").delete().eq("id", id);
  if (error) throw error;
}
async function listPoteriePhotos(poterieId) {
  const rows = await fetchAllRows(
    (from, to) => db.from("photos").select("*").eq("poterie_id", poterieId).order("date", { ascending: false }).range(from, to)
  );
  return rows.map(rowToPhoto);
}
async function savePoterieGalleryPhoto(photo) {
  if (!photo.blob) throw new Error("savePoterieGalleryPhoto: blob manquant");
  if (!photo.poterieId) throw new Error("savePoterieGalleryPhoto: poterieId manquant");
  const uidStr = await currentUserId();
  const path = await uploadPoterieGalleryPhoto(uidStr, photo.id, photo.poterieId, photo.blob);
  const { error } = await db.from("photos").upsert({
    id: photo.id,
    poterie_id: photo.poterieId,
    bonsai_id: null,
    storage_path: path,
    date: photo.date,
    legende: photo.legende ?? null,
    user_id: uidStr
  });
  if (error) {
    await deleteStorageObject(POTERIE_BUCKET, path);
    throw error;
  }
  return path;
}
function useBlobUrl(blob) {
  const [url, setUrl] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    if (!blob) {
      setUrl(void 0);
      return;
    }
    const u = URL.createObjectURL(blob);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [blob]);
  return url;
}
async function fileToBlob(file) {
  if (file.size < 8e5) return file;
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error("Échec de lecture du fichier"));
    img.onerror = () => reject(new Error("Image illisible ou corrompue"));
    reader.onload = () => {
      img.onload = () => {
        const max = 1600;
        let w = img.width;
        let h = img.height;
        if (w > max || h > max) {
          const ratio = Math.min(max / w, max / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob((b) => resolve(b ?? file), "image/jpeg", 0.85);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
async function saveBlobToDevice(blob, filename) {
  const file = new File([blob], filename, { type: blob.type || "image/jpeg" });
  const nav = navigator;
  if (nav.share && nav.canShare?.({ files: [file] })) {
    try {
      await nav.share({ files: [file] });
      return;
    } catch (err) {
      if (err?.name === "AbortError") return;
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Select = Select$1;
const SelectValue = SelectValue$1;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectTrigger$1,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectIcon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectTrigger$1.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollUpButton$1,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollDownButton$1,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPortal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectContent$1,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectViewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectContent$1.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectLabel$1,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectLabel$1.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectItem$1,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectItem$1.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectSeparator$1,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectSeparator$1.displayName;
const Dialog = Dialog$1;
const DialogTrigger = DialogTrigger$1;
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
    // Format YYYY-MM-DD, YYYY/MM/DD, YYYY.MM.DD avec délimiteurs autour ou non
    /(\d{4})[-\/.](\d{2})[-\/.](\d{2})/,
    // Format DD-MM-YYYY, DD/MM/YYYY, DD.MM.YYYY avec délimiteurs autour ou non
    /(\d{2})[-\/.](\d{2})[-\/.](\d{4})/,
    // Format YYYYMMDD (sans séparateurs)
    /(\d{4})(\d{2})(\d{2})/
  ];
  for (const re of patterns) {
    const m = name.match(re);
    if (!m) continue;
    let year, month, day;
    if (m[1].length === 4) {
      year = Number(m[1]);
      month = Number(m[2]);
      day = Number(m[3]);
    } else {
      day = Number(m[1]);
      month = Number(m[2]);
      year = Number(m[3]);
    }
    if (month < 1 || month > 12 || day < 1 || day > 31) continue;
    if (year < 1900 || year > 2100) continue;
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
  onConfirm,
  currentIndex = 0,
  totalCount = 1
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
    let createdUrl;
    (async () => {
      try {
        const url = URL.createObjectURL(file);
        createdUrl = url;
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
      } catch (e) {
        if (cancelled) return;
        toast.error(
          "Impossible de lire cette image : " + (e instanceof Error ? e.message : "fichier illisible ou corrompu")
        );
        onOpenChange(false);
      }
    })();
    return () => {
      cancelled = true;
      if (createdUrl) URL.revokeObjectURL(createdUrl);
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
    } catch (e) {
      toast.error(
        "Échec de l'enregistrement de la photo : " + (e instanceof Error ? e.message : "erreur inconnue")
      );
      setBusy(false);
      return;
    }
    if (source === "camera") {
      try {
        await saveBlobToDevice(blob, `bonsai-${Date.now()}.jpg`);
      } catch {
      }
    }
    setLegende("");
    setBlob(null);
    setPreview(void 0);
    setBusy(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] overflow-y-auto sm:max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
      source === "camera" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }),
      source === "camera" ? "Photo prise à l'instant" : totalCount > 1 ? `Photo ${currentIndex + 1} / ${totalCount}` : "Importer une photo"
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
const $$splitComponentImporter$5 = () => import("./poteries-B8oFCcKF.mjs");
const FORMES = ["Ovale", "Ronde", "Rectangulaire", "Rectangulaire à coins arrondis", "Carrée", "Hexagonale", "Octogonale", "Pentagonale", "Lotus", "Demi-lune", "Cascade (haute)", "Tambour (cylindrique)", "Suiban (plateau peu profond, sans trou)", "Coupe peu profonde", "Nanban (forme libre, texturée)", "Nuage / forme irrégulière"];
const MATIERES = ["Grès", "Terre cuite non émaillée", "Céramique émaillée", "Porcelaine", "Argile de Yixing", "Béton", "Plastique / résine (entraînement)"];
const AUTRE = "__autre__";
function initialSelection(value, list) {
  if (!value) return {
    selection: "",
    custom: ""
  };
  if (list.includes(value)) return {
    selection: value,
    custom: ""
  };
  return {
    selection: AUTRE,
    custom: value
  };
}
const Route$9 = createFileRoute("/poteries")({
  head: () => ({
    meta: [{
      title: "Poteries — Bonsaï Studio"
    }, {
      name: "description",
      content: "Catalogue de vos poteries pour bonsaïs : formes, matières, dimensions et arbres associés."
    }, {
      property: "og:title",
      content: "Poteries — Bonsaï Studio"
    }, {
      property: "og:description",
      content: "Catalogue de vos contenants pour bonsaïs et arbres associés."
    }, {
      property: "og:url",
      content: "/poteries"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
function PoterieForm({
  initial,
  onClose
}) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [file, setFile] = reactExports.useState(null);
  const [preview, setPreview] = reactExports.useState(null);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [dialogSource, setDialogSource] = reactExports.useState("gallery");
  const [photoData, setPhotoData] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    nom: initial?.nom ?? "",
    longueurCm: initial?.longueurCm?.toString() ?? "",
    largeurCm: initial?.largeurCm?.toString() ?? "",
    hauteurCm: initial?.hauteurCm?.toString() ?? "",
    couleur: initial?.couleur ?? "",
    artisan: initial?.artisan ?? "",
    origine: initial?.origine ?? "",
    prix: initial?.prix?.toString() ?? "",
    notes: initial?.notes ?? ""
  });
  const set = (k, v) => setForm((f) => ({
    ...f,
    [k]: v
  }));
  const formeInit = initialSelection(initial?.forme, FORMES);
  const matiereInit = initialSelection(initial?.matiere, MATIERES);
  const [formeChoice, setFormeChoice] = reactExports.useState(formeInit.selection);
  const [formeCustom, setFormeCustom] = reactExports.useState(formeInit.custom);
  const [matiereChoice, setMatiereChoice] = reactExports.useState(matiereInit.selection);
  const [matiereCustom, setMatiereCustom] = reactExports.useState(matiereInit.custom);
  const resolvedForme = formeChoice === AUTRE ? formeCustom.trim() : formeChoice ? formeChoice : "";
  const resolvedMatiere = matiereChoice === AUTRE ? matiereCustom.trim() : matiereChoice ? matiereChoice : "";
  const submit = async (e) => {
    e.preventDefault();
    if (!form.nom.trim()) {
      toast.error("Donnez un nom à la poterie");
      return;
    }
    const photoBlob = photoData?.blob;
    const p = {
      id: initial?.id ?? uid(),
      nom: form.nom.trim(),
      longueurCm: form.longueurCm ? Number(form.longueurCm) : void 0,
      largeurCm: form.largeurCm ? Number(form.largeurCm) : void 0,
      hauteurCm: form.hauteurCm ? Number(form.hauteurCm) : void 0,
      forme: resolvedForme || void 0,
      couleur: form.couleur.trim() || void 0,
      matiere: resolvedMatiere || void 0,
      artisan: form.artisan.trim() || void 0,
      origine: form.origine.trim() || void 0,
      prix: form.prix ? Number(form.prix) : void 0,
      notes: form.notes.trim() || void 0,
      photoPath: initial?.photoPath,
      createdAt: initial?.createdAt ?? (/* @__PURE__ */ new Date()).toISOString()
    };
    try {
      await savePoterie(photoBlob ? {
        ...p,
        photoBlob
      } : p);
    } catch (err) {
      toast.error("Échec de l'enregistrement : " + (err instanceof Error ? err.message : "erreur inconnue"));
      return;
    }
    qc.invalidateQueries({
      queryKey: ["poteries"]
    });
    qc.invalidateQueries({
      queryKey: ["poterie", p.id]
    });
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
    setDialogSource("gallery");
    setDialogOpen(true);
  };
  const handlePhotoConfirm = async (data) => {
    setPhotoData(data);
    setDialogOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mb-8 grid gap-6 rounded-3xl border border-border bg-card p-6 lg:grid-cols-[240px_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "group relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-background transition hover:border-accent/60", children: [
      preview ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview, alt: "", loading: "lazy", decoding: "async", className: "h-full w-full object-cover" }) : initial?.photoPath ? /* @__PURE__ */ jsxRuntimeExports.jsx(ExistingImage, { poterie: initial }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "mx-auto h-7 w-7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs", children: "Photo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "absolute inset-0 cursor-pointer opacity-0", onChange: (e) => {
        const f = e.target.files?.[0];
        e.target.value = "";
        if (f) onFile(f);
      } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nom", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.nom, onChange: (e) => set("nom", e.target.value), placeholder: "Tokoname ovale brune" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Forme" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: formeChoice, onValueChange: setFormeChoice, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "aria-label": "Forme", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choisir une forme…" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              FORMES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: f, children: f }, f)),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: AUTRE, children: "Autre" })
            ] })
          ] }),
          formeChoice === AUTRE && /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-2", value: formeCustom, onChange: (e) => setFormeCustom(e.target.value), placeholder: "Précisez la forme" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Matière" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: matiereChoice, onValueChange: setMatiereChoice, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "aria-label": "Matière", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choisir une matière…" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              MATIERES.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m, children: m }, m)),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: AUTRE, children: "Autre" })
            ] })
          ] }),
          matiereChoice === AUTRE && /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-2", value: matiereCustom, onChange: (e) => setMatiereCustom(e.target.value), placeholder: "Précisez la matière" })
        ] }),
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
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddPhotoDialog, { open: dialogOpen, onOpenChange: setDialogOpen, source: dialogSource, file, onConfirm: handlePhotoConfirm })
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
const BASE_URL = "https://my-bonsai-buddy.lovable.app";
const Route$8 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/collection", changefreq: "weekly", priority: "0.8" },
          { path: "/calendrier", changefreq: "weekly", priority: "0.7" },
          { path: "/journal", changefreq: "weekly", priority: "0.6" },
          { path: "/poteries", changefreq: "weekly", priority: "0.7" },
          { path: "/statistiques", changefreq: "monthly", priority: "0.5" }
        ];
        const urls = entries.map(
          (e) => [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`
          ].filter(Boolean).join("\n")
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$4 = () => import("./statistiques-BntSdDal.mjs");
const Route$7 = createFileRoute("/statistiques")({
  head: () => ({
    meta: [{
      title: "Statistiques — Bonsaï Studio"
    }, {
      name: "description",
      content: "Vue chiffrée de votre collection de bonsaïs : valeur estimée, répartition par style et étape, fréquence des soins."
    }, {
      property: "og:title",
      content: "Statistiques — Bonsaï Studio"
    }, {
      property: "og:description",
      content: "Vue chiffrée de votre collection de bonsaïs."
    }, {
      property: "og:url",
      content: "/statistiques"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const Route$6 = createFileRoute("/.mcp/list-tools")({
  server: {
    handlers: {
      // ANY: TanStack returns SPA HTML for methods not in `handlers`; the SDK 405s instead.
      ANY: createTanStackListToolsHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource", trustForwardedHost: true })
    }
  }
});
const Route$5 = createFileRoute("/.well-known/oauth-protected-resource")({
  server: {
    handlers: {
      ANY: createTanStackOAuthProtectedResourceMetadataHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource", trustForwardedHost: true })
    }
  }
});
const $$splitComponentImporter$3 = () => import("./bonsai._id-D-gMsToQ.mjs");
const Route$4 = createFileRoute("/bonsai/$id")({
  ssr: false,
  validateSearch: validateCollectionSearch,
  loader: async ({
    params,
    context
  }) => {
    const b = await context.queryClient.ensureQueryData({
      queryKey: ["bonsai", params.id],
      queryFn: () => getBonsai(params.id)
    });
    return b ? {
      nom: b.nom,
      espece: b.espece
    } : null;
  },
  head: ({
    loaderData,
    params
  }) => {
    const nom = loaderData?.nom ?? "Bonsaï";
    const espece = loaderData?.espece;
    const baseDesc = `${nom}${espece ? ` (${espece})` : ""} — galerie évolutive, journal d'entretien et rappels de soins.`;
    const desc = baseDesc.length > 160 ? baseDesc.slice(0, 157) + "…" : baseDesc;
    const title = `${nom} — Bonsaï Studio`;
    return {
      meta: [{
        title: title.length > 60 ? `${nom.slice(0, 50)} — Bonsaï` : title
      }, {
        name: "description",
        content: desc
      }, {
        name: "robots",
        content: "noindex,follow"
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: desc
      }, {
        property: "og:url",
        content: `/bonsai/${params.id}`
      }, {
        property: "og:type",
        content: "article"
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./bonsai.nouveau-CmlULePm.mjs");
const Route$3 = createFileRoute("/bonsai/nouveau")({
  head: () => ({
    meta: [{
      title: "Nouveau bonsaï — Bonsaï Studio"
    }, {
      name: "description",
      content: "Ajoutez un nouveau bonsaï à votre carnet de collection : espèce, style, étape, dimensions et première photo."
    }, {
      property: "og:title",
      content: "Nouveau bonsaï — Bonsaï Studio"
    }, {
      property: "og:description",
      content: "Ajoutez un nouvel arbre à votre carnet de collection."
    }, {
      property: "og:url",
      content: "/bonsai/nouveau"
    }, {
      name: "robots",
      content: "noindex,follow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./poterie._id-Cj8EM3p8.mjs");
const Route$2 = createFileRoute("/poterie/$id")({
  ssr: false,
  loader: async ({
    params,
    context
  }) => {
    const p = await context.queryClient.ensureQueryData({
      queryKey: ["poterie", params.id],
      queryFn: () => getPoterie(params.id)
    });
    return p ? {
      nom: p.nom,
      forme: p.forme,
      matiere: p.matiere,
      artisan: p.artisan
    } : null;
  },
  head: ({
    loaderData,
    params
  }) => {
    const nom = loaderData?.nom ?? "Poterie";
    const bits = [loaderData?.forme, loaderData?.matiere, loaderData?.artisan].filter(Boolean).join(", ");
    const baseDesc = `${nom}${bits ? ` — ${bits}` : ""} — fiche détaillée de poterie pour bonsaï.`;
    const desc = baseDesc.length > 160 ? baseDesc.slice(0, 157) + "…" : baseDesc;
    const title = `${nom} — Bonsaï Studio`;
    return {
      meta: [{
        title: title.length > 60 ? `${nom.slice(0, 50)} — Poterie` : title
      }, {
        name: "description",
        content: desc
      }, {
        name: "robots",
        content: "noindex,follow"
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: desc
      }, {
        property: "og:url",
        content: `/poterie/${params.id}`
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const authOAuth = () => supabase.auth.oauth;
const $$splitErrorComponentImporter = () => import("../_._lovable.oauth.consent-BHbppD8f.mjs");
const $$splitComponentImporter = () => import("../_._lovable.oauth.consent-46Ac6Y0Y.mjs");
const Route$1 = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : ""
  }),
  beforeLoad: async ({
    search,
    location
  }) => {
    if (!search.authorization_id) throw new Error("authorization_id manquant");
    const {
      data
    } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({
        to: "/connexion",
        search: {
          redirect: next
        }
      });
    }
  },
  loader: async ({
    location
  }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id");
    const {
      data,
      error
    } = await authOAuth().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({
      href: immediate
    });
    return data;
  },
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
const Route = createFileRoute("/.mcp/invoke-tool/$tool")({
  server: {
    handlers: {
      // ANY: TanStack returns SPA HTML for methods not in `handlers`; the SDK 405s instead.
      ANY: createTanStackInvokeToolHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource", trustForwardedHost: true })
    }
  }
});
const IndexRoute = Route$h.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$i
});
const CalendrierRoute = Route$g.update({
  id: "/calendrier",
  path: "/calendrier",
  getParentRoute: () => Route$i
});
const CollectionRoute = Route$f.update({
  id: "/collection",
  path: "/collection",
  getParentRoute: () => Route$i
});
const ConnexionRoute = Route$e.update({
  id: "/connexion",
  path: "/connexion",
  getParentRoute: () => Route$i
});
const InscriptionRoute = Route$d.update({
  id: "/inscription",
  path: "/inscription",
  getParentRoute: () => Route$i
});
const JournalRoute = Route$c.update({
  id: "/journal",
  path: "/journal",
  getParentRoute: () => Route$i
});
const McpRoute = Route$b.update({
  id: "/mcp",
  path: "/mcp",
  getParentRoute: () => Route$i
});
const ParametresRoute = Route$a.update({
  id: "/parametres",
  path: "/parametres",
  getParentRoute: () => Route$i
});
const PoteriesRoute = Route$9.update({
  id: "/poteries",
  path: "/poteries",
  getParentRoute: () => Route$i
});
const SitemapDotxmlRoute = Route$8.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$i
});
const StatistiquesRoute = Route$7.update({
  id: "/statistiques",
  path: "/statistiques",
  getParentRoute: () => Route$i
});
const Char91DotmcpChar93ListToolsRoute = Route$6.update({
  id: "/.mcp/list-tools",
  path: "/.mcp/list-tools",
  getParentRoute: () => Route$i
});
const Char91DotwellKnownChar93OauthProtectedResourceRoute = Route$5.update({
  id: "/.well-known/oauth-protected-resource",
  path: "/.well-known/oauth-protected-resource",
  getParentRoute: () => Route$i
});
const BonsaiIdRoute = Route$4.update({
  id: "/bonsai/$id",
  path: "/bonsai/$id",
  getParentRoute: () => Route$i
});
const BonsaiNouveauRoute = Route$3.update({
  id: "/bonsai/nouveau",
  path: "/bonsai/nouveau",
  getParentRoute: () => Route$i
});
const PoterieIdRoute = Route$2.update({
  id: "/poterie/$id",
  path: "/poterie/$id",
  getParentRoute: () => Route$i
});
const DotlovableOauthConsentRoute = Route$1.update({
  id: "/.lovable/oauth/consent",
  path: "/.lovable/oauth/consent",
  getParentRoute: () => Route$i
});
const Char91DotmcpChar93InvokeToolToolRoute = Route.update({
  id: "/.mcp/invoke-tool/$tool",
  path: "/.mcp/invoke-tool/$tool",
  getParentRoute: () => Route$i
});
const rootRouteChildren = {
  IndexRoute,
  CalendrierRoute,
  CollectionRoute,
  ConnexionRoute,
  InscriptionRoute,
  JournalRoute,
  McpRoute,
  ParametresRoute,
  PoteriesRoute,
  SitemapDotxmlRoute,
  StatistiquesRoute,
  Char91DotmcpChar93ListToolsRoute,
  Char91DotwellKnownChar93OauthProtectedResourceRoute,
  BonsaiIdRoute,
  BonsaiNouveauRoute,
  PoterieIdRoute,
  DotlovableOauthConsentRoute,
  Char91DotmcpChar93InvokeToolToolRoute
};
const routeTree = Route$i._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Synchronisation multi-appareils : re-fetch au focus de la fenêtre pour
        // récupérer les modifications faites depuis un autre appareil.
        refetchOnWindowFocus: true,
        staleTime: 0
      }
    }
  });
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$4 as $,
  savePoterieGalleryPhoto as A,
  Button as B,
  listPhotos as C,
  getPoterie as D,
  etapeLabel as E,
  Dialog as F,
  DialogTrigger as G,
  DialogContent as H,
  Input as I,
  DialogHeader as J,
  DialogTitle as K,
  Label as L,
  DialogDescription as M,
  RadioGroup as N,
  RadioGroupItem as O,
  DialogFooter as P,
  listPoteriePhotos as Q,
  Route$f as R,
  Select as S,
  Textarea as T,
  fetchAllRows as U,
  currentUserId as V,
  db as W,
  AddPhotoDialog as X,
  useBlobUrl as Y,
  ETAPES as Z,
  getBonsai as _,
  listPoteries as a,
  deleteBonsai as a0,
  getAllEspeces as a1,
  addCustomEspece as a2,
  Route$2 as a3,
  PoterieForm as a4,
  deletePoterie as a5,
  buttonVariants as a6,
  Route$1 as a7,
  authOAuth as a8,
  useFileInput as a9,
  SOINS_SELECTABLE as aa,
  updatePhotoDate as ab,
  updatePhotoLegende as ac,
  deletePhoto as ad,
  router as ae,
  soinLabel as b,
  styleLabel as c,
  cn as d,
  collectionSearchToFilters as e,
  filterAndSortBonsais as f,
  SelectTrigger as g,
  SelectValue as h,
  SelectContent as i,
  SelectItem as j,
  STYLES as k,
  listBonsais as l,
  ageActuel as m,
  filtersToCollectionSearch as n,
  useAuth as o,
  Route$e as p,
  SOINS as q,
  listAllPhotos as r,
  soinEmoji as s,
  listAllPoteriePhotos as t,
  uid as u,
  getPhotoBlob as v,
  getPoteriePhoto as w,
  saveBonsai as x,
  savePoterie as y,
  savePhoto as z
};
