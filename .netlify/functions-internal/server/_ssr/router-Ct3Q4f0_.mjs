import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, d as useNavigate, e as useLocation, f as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { G as redirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-CWZp_xfH.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { R as Root2$1, V as Value, T as Trigger$1, I as Icon, P as Portal, C as Content2, a as Viewport, b as Item, c as ItemIndicator, d as ItemText, S as ScrollUpButton, e as ScrollDownButton, L as Label$1, f as Separator } from "../_libs/radix-ui__react-select.mjs";
import { R as Root$1, P as Portal$1, C as Content$1, a as Close, T as Title, O as Overlay, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { R as Root2$4, I as Item2, a as Indicator } from "../_libs/radix-ui__react-radio-group.mjs";
import { R as Root2$2, P as Portal2, C as Content2$1, T as Title2, D as Description2, a as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { o as openDB } from "../_libs/idb.mjs";
import { c as createTanStackInvokeToolHandler, a as createTanStackOAuthProtectedResourceMetadataHandler, b as createTanStackListToolsHandler, d as createTanStackMcpHandler, e as defineTool, f as defineMcp, g as auth } from "../_libs/lovable.dev__mcp-js.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_libs/radix-ui__react-checkbox.mjs";
import { u as useForm, C as Controller } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { R as Root$2, T as Thumb } from "../_libs/radix-ui__react-switch.mjs";
import { R as Root2$3, T as Trigger$2, P as Portal2$1, C as Content2$2, I as Item2$1, S as SubTrigger2, a as SubContent2, b as CheckboxItem2, c as ItemIndicator2, d as RadioItem2, L as Label2, e as Separator2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { j as jspdf_node_minExports } from "../_libs/jspdf.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { L as Leaf, A as ArrowLeft, C as Container, P as Pencil, T as Trash2, a as ChartBar, S as Sprout, b as Camera, c as Calendar, E as Euro, d as TrendingUp, e as Plus, f as LogOut, B as Bell, g as BellOff, h as CircleAlert, D as Database, i as CloudUpload, H as HardDriveDownload, j as HardDriveUpload, W as Wand, I as Info, k as BookOpen, l as Search, m as Star, n as ChevronLeft, o as ChevronRight, p as Check, q as CalendarDays, r as ArrowRight, s as LayoutDashboard, t as Settings, u as ImagePlus, v as ChevronDown, w as CalendarPlus, X, x as Sparkles, F as FileText, y as Loader, z as Share2, G as Image$1, J as Images, K as ChevronUp, M as Circle } from "../_libs/lucide-react.mjs";
import { d as differenceInDays, p as parseISO, f as format, s as startOfWeek, a as startOfMonth, e as endOfWeek, b as endOfMonth, c as eachDayOfInterval, g as subMonths, h as addMonths, i as isSameMonth, j as isSameDay, k as addDays, l as isBefore, m as isAfter, n as fr } from "../_libs/date-fns.mjs";
import { f as object, d as string, _ as _enum, k as boolean, n as number } from "../_libs/zod.mjs";
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
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
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
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
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
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-menu.mjs";
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
const appCss = "/assets/styles-BOH51niO.css";
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
const db = supabase;
function uid() {
  return crypto.randomUUID();
}
function ageActuel(b, today = /* @__PURE__ */ new Date()) {
  if (b.ageEstime == null) return void 0;
  if (!b.dateAcquisition) return b.ageEstime;
  const acquisition = new Date(b.dateAcquisition);
  let annees = today.getFullYear() - acquisition.getFullYear();
  const pasEncoreAnniversaire = today.getMonth() < acquisition.getMonth() || today.getMonth() === acquisition.getMonth() && today.getDate() < acquisition.getDate();
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
function rowToJournal(r) {
  return {
    id: r.id,
    bonsaiId: r.bonsai_id,
    type: r.type,
    date: r.date,
    notes: r.notes ?? void 0,
    rappelId: r.rappel_id ?? void 0
  };
}
function rowToRappel(r) {
  return {
    id: r.id,
    bonsaiId: r.bonsai_id,
    type: r.type,
    prochaineDate: r.prochaine_date,
    intervalleJours: r.intervalle_jours ?? void 0,
    notes: r.notes ?? void 0,
    actif: r.actif
  };
}
function rowToEvenement(r) {
  return {
    id: r.id,
    titre: r.titre,
    description: r.description ?? void 0,
    dateHeure: r.date_heure,
    rappelMinutes: r.rappel_minutes ?? void 0,
    notifiedAt: r.notified_at ?? void 0,
    bonsaiId: r.bonsai_id ?? void 0,
    createdAt: r.created_at
  };
}
async function currentUserId() {
  const {
    data: { user }
  } = await db.auth.getUser();
  if (!user) throw new Error("Non authentifié");
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
async function listBonsais$2() {
  const { data, error } = await db.from("bonsais").select("*").order("created_at", { ascending: false }).limit(500);
  if (error) throw error;
  return data.map(rowToBonsai);
}
async function getBonsai$1(id) {
  const { data, error } = await db.from("bonsais").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? rowToBonsai(data) : void 0;
}
async function saveBonsai(b) {
  const {
    data: { user }
  } = await db.auth.getUser();
  if (!user) throw new Error("Non authentifié");
  const { error } = await db.from("bonsais").upsert({ ...bonsaiToRow(b), user_id: user.id });
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
async function listPhotos$1(bonsaiId) {
  const { data, error } = await db.from("photos").select("*").eq("bonsai_id", bonsaiId).order("date", { ascending: false }).limit(200);
  if (error) throw error;
  return data.map(rowToPhoto);
}
async function listAllPhotos() {
  const { data, error } = await db.from("photos").select("*").not("bonsai_id", "is", null).order("date", { ascending: false }).limit(2e3);
  if (error) throw error;
  return data.map(rowToPhoto);
}
async function getPhoto(id) {
  const { data, error } = await db.from("photos").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? rowToPhoto(data) : void 0;
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
async function listJournal$1(bonsaiId) {
  let query = db.from("journal_entries").select("*");
  if (bonsaiId) query = query.eq("bonsai_id", bonsaiId);
  const { data, error } = await query.order("date", { ascending: false }).limit(500);
  if (error) throw error;
  return data.map(rowToJournal);
}
async function saveJournal(e) {
  const uidStr = await currentUserId();
  const { error } = await db.from("journal_entries").upsert({
    id: e.id,
    bonsai_id: e.bonsaiId,
    type: e.type,
    date: e.date,
    notes: e.notes ?? null,
    rappel_id: e.rappelId ?? null,
    user_id: uidStr
  });
  if (error) throw error;
}
async function deleteJournal(id) {
  const { error } = await db.from("journal_entries").delete().eq("id", id);
  if (error) throw error;
}
async function listRappels$2(bonsaiId) {
  let query = db.from("rappels").select("*");
  if (bonsaiId) query = query.eq("bonsai_id", bonsaiId);
  const { data, error } = await query.order("prochaine_date", { ascending: true }).limit(200);
  if (error) throw error;
  return data.map(rowToRappel);
}
async function saveRappel(r) {
  const uidStr = await currentUserId();
  const { error } = await db.from("rappels").upsert({
    id: r.id,
    bonsai_id: r.bonsaiId,
    type: r.type,
    prochaine_date: r.prochaineDate,
    intervalle_jours: r.intervalleJours ?? null,
    notes: r.notes ?? null,
    actif: r.actif,
    user_id: uidStr
  });
  if (error) throw error;
}
async function deleteRappel(id) {
  const { error } = await db.from("rappels").delete().eq("id", id);
  if (error) throw error;
}
async function listPoteries$2() {
  const { data, error } = await db.from("poteries").select("*").order("created_at", { ascending: false }).limit(200);
  if (error) throw error;
  return data.map(rowToPoterie);
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
  const { data, error } = await db.from("photos").select("*").eq("poterie_id", poterieId).order("date", { ascending: false }).limit(200);
  if (error) throw error;
  return data.map(rowToPhoto);
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
async function listEvenements$1() {
  const { data, error } = await db.from("evenements").select("*").order("date_heure", { ascending: true }).limit(100);
  if (error) throw error;
  return data.map(rowToEvenement);
}
async function saveEvenement(e) {
  const uidStr = await currentUserId();
  const { error } = await db.from("evenements").upsert({
    id: e.id,
    titre: e.titre,
    description: e.description ?? null,
    date_heure: e.dateHeure,
    rappel_minutes: e.rappelMinutes ?? null,
    notified_at: e.notifiedAt ?? null,
    bonsai_id: e.bonsaiId ?? null,
    user_id: uidStr
  });
  if (error) throw error;
}
async function deleteEvenement(id) {
  const { error } = await db.from("evenements").delete().eq("id", id);
  if (error) throw error;
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
async function exportSupabaseBackup() {
  const [bonsais, poteries, journal, rappels, evenements] = await Promise.all([
    listBonsais$2(),
    listPoteries$2(),
    listJournal$1(),
    listRappels$2(),
    listEvenements$1()
  ]);
  const allPhotos = await listAllPhotos();
  const photosEnc = await Promise.all(
    allPhotos.map(async (p) => {
      const blob = await getPhotoBlob(p);
      const { data, type } = blob ? await blobToBase64(blob) : { data: "", type: "application/octet-stream" };
      const { storagePath: _drop, ...rest } = p;
      return { ...rest, blobBase64: data, blobType: type };
    })
  );
  const poteriesEnc = await Promise.all(
    poteries.map(async (p) => {
      const { photoPath: _drop, ...rest } = p;
      const blob = await getPoteriePhoto(p);
      if (!blob) return rest;
      const { data, type } = await blobToBase64(blob);
      return { ...rest, photoBlobBase64: data, photoBlobType: type };
    })
  );
  return {
    version: 1,
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    bonsais,
    poteries: poteriesEnc,
    photos: photosEnc,
    journal,
    rappels,
    evenements
  };
}
async function importSupabaseBackup(payload) {
  if (payload.version !== 1) throw new Error("Version de sauvegarde non prise en charge");
  for (const b of payload.bonsais) await saveBonsai(b);
  for (const j of payload.journal) await saveJournal(j);
  for (const r of payload.rappels) await saveRappel(r);
  for (const e of payload.evenements ?? []) await saveEvenement(e);
  for (const p of payload.poteries) {
    const { photoBlobBase64, photoBlobType, ...rest } = p;
    const poterie = { ...rest };
    if (photoBlobBase64) {
      poterie.photoBlob = base64ToBlob(photoBlobBase64, photoBlobType || "image/jpeg");
    }
    await savePoterie(poterie);
  }
  for (const p of payload.photos) {
    const { blobBase64, blobType, ...rest } = p;
    if (!blobBase64) continue;
    const blob = base64ToBlob(blobBase64, blobType);
    await savePhoto({ ...rest, blob });
  }
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const NAV = [
  { to: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/collection", label: "Mes bonsaïs", icon: Sprout },
  { to: "/poteries", label: "Poteries", icon: Container },
  { to: "/calendrier", label: "Calendrier", icon: Calendar },
  { to: "/journal", label: "Journal", icon: BookOpen },
  { to: "/statistiques", label: "Statistiques", icon: ChartBar },
  { to: "/parametres", label: "Paramètres", icon: Settings }
];
function AppShell({ children }) {
  const { location } = useRouterState();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "group flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-4.5 w-4.5", strokeWidth: 2.25 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-semibold tracking-tight", children: "Bonsaï Studio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: "Carnet de collection" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-1 md:flex", children: NAV.map((item) => {
          const active = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
          const Icon2 = item.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.to,
              className: cn(
                "flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: "h-4 w-4" }),
                item.label
              ]
            },
            item.to
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex gap-1 overflow-x-auto border-t border-border/60 px-4 py-2 md:hidden", children: NAV.map((item) => {
        const active = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
        const Icon2 = item.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.to,
            className: cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
              active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: "h-3.5 w-3.5" }),
              item.label
            ]
          },
          item.to
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-7xl px-6 py-10", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/60 py-6 text-center text-xs text-muted-foreground", children: "Bonsaï Studio · vos données sont synchronisées via Supabase" })
  ] });
}
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
const Route$h = createFileRoute("/statistiques")({
  head: () => ({
    meta: [
      { title: "Statistiques — Bonsaï Studio" },
      {
        name: "description",
        content: "Vue chiffrée de votre collection de bonsaïs : valeur estimée, répartition par style et étape, fréquence des soins."
      },
      { property: "og:title", content: "Statistiques — Bonsaï Studio" },
      { property: "og:description", content: "Vue chiffrée de votre collection de bonsaïs." },
      { property: "og:url", content: "/statistiques" }
    ]
  }),
  component: StatistiquesPage
});
async function loadAllJournal() {
  return listJournal$1();
}
function StatistiquesPage() {
  const { data: bonsais = [] } = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais$2 });
  const { data: poteries = [] } = useQuery({ queryKey: ["poteries"], queryFn: listPoteries$2 });
  const { data: photos = [] } = useQuery({ queryKey: ["photos-all"], queryFn: listAllPhotos });
  const { data: journal = [] } = useQuery({ queryKey: ["journal-all"], queryFn: loadAllJournal });
  const { data: rappels = [] } = useQuery({
    queryKey: ["rappels-all"],
    queryFn: () => listRappels$2()
  });
  const stats = reactExports.useMemo(() => {
    const actifs = bonsais.filter((b) => b.dansCollection ?? true);
    const sortis = bonsais.length - actifs.length;
    const totalPrix = actifs.reduce((s, b) => s + (b.prixAchat ?? 0), 0);
    const totalValeur = actifs.reduce((s, b) => s + (b.valeurEstimee ?? 0), 0);
    const plusValue = totalValeur - totalPrix;
    const ageMoyen = (() => {
      const ages = actifs.map((b) => ageActuel(b)).filter((a) => a != null);
      if (!ages.length) return null;
      return Math.round(ages.reduce((s, a) => s + a, 0) / ages.length);
    })();
    const plusVieux = actifs.filter((b) => ageActuel(b) != null).sort((a, b) => (ageActuel(b) ?? 0) - (ageActuel(a) ?? 0))[0];
    const parEtape = ETAPES.map((e) => ({
      ...e,
      count: actifs.filter((b) => (b.etape ?? "culture") === e.value).length
    }));
    const parStyle = STYLES.map((s) => ({
      ...s,
      count: actifs.filter((b) => b.style === s.value).length
    })).filter((s) => s.count > 0).sort((a, b) => b.count - a.count);
    const especesMap = /* @__PURE__ */ new Map();
    actifs.forEach((b) => especesMap.set(b.espece, (especesMap.get(b.espece) ?? 0) + 1));
    const topEspeces = [...especesMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
    const now = /* @__PURE__ */ new Date();
    const journal30 = journal.filter((j) => differenceInDays(now, parseISO(j.date)) <= 30);
    const rappelsActifs = rappels.filter((r) => r.actif).length;
    return {
      total: bonsais.length,
      actifs: actifs.length,
      sortis,
      totalPhotos: photos.length,
      totalPoteries: poteries.length,
      totalPrix,
      totalValeur,
      plusValue,
      ageMoyen,
      plusVieux,
      parEtape,
      parStyle,
      topEspeces,
      journal30: journal30.length,
      rappelsActifs,
      totalJournal: journal.length
    };
  }, [bonsais, poteries, photos, journal, rappels]);
  const maxStyle = Math.max(1, ...stats.parStyle.map((s) => s.count));
  const maxEtape = Math.max(1, ...stats.parEtape.map((e) => e.count));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-muted-foreground", children: "Aperçu" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-4xl font-semibold", children: "Statistiques" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Vue d'ensemble de votre collection (",
        stats.actifs,
        " arbre",
        stats.actifs > 1 ? "s" : "",
        " ",
        "actif",
        stats.actifs > 1 ? "s" : "",
        ")."
      ] })
    ] }),
    bonsais.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-dashed border-border bg-card/50 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartBar, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-2xl font-semibold", children: "Pas encore de données" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Ajoutez votre premier bonsaï pour voir apparaître les statistiques." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/collection",
          className: "mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground",
          children: "Aller à la collection"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KPI,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "h-4 w-4" }),
            label: "Bonsaïs actifs",
            value: stats.actifs,
            hint: stats.sortis ? `+${stats.sortis} sortis` : void 0
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KPI,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "h-4 w-4" }),
            label: "Poteries",
            value: stats.totalPoteries
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-4 w-4" }), label: "Photos", value: stats.totalPhotos }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KPI,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
            label: "Rappels actifs",
            value: stats.rappelsActifs
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KPI,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Euro, { className: "h-4 w-4" }),
            label: "Prix d'achat",
            value: `${stats.totalPrix.toLocaleString("fr-FR")} €`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KPI,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }),
            label: "Valeur estimée",
            value: `${stats.totalValeur.toLocaleString("fr-FR")} €`,
            hint: stats.plusValue !== 0 ? `${stats.plusValue > 0 ? "+" : ""}${stats.plusValue.toLocaleString("fr-FR")} €` : void 0,
            hintPositive: stats.plusValue > 0,
            hintNegative: stats.plusValue < 0
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Répartition par étape", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: stats.parEtape.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { label: e.label, count: e.count, max: maxEtape }, e.value)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Répartition par style", children: stats.parStyle.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucun style renseigné." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: stats.parStyle.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Bar,
          {
            label: styleLabel(s.value).split(" — ")[0],
            count: s.count,
            max: maxStyle
          },
          s.value
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Espèces les plus représentées", children: stats.topEspeces.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "—" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm", children: stats.topEspeces.map(([nom, n]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-center justify-between gap-3 border-b border-border/60 pb-1.5 last:border-none last:pb-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate italic", children: nom }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium", children: n })
            ]
          },
          nom
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Activité & ancienneté", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Soins (30 derniers jours)", value: stats.journal30 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Entrées de journal au total", value: stats.totalJournal }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Row,
            {
              label: "Âge moyen",
              value: stats.ageMoyen != null ? `${stats.ageMoyen} ans` : "—"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Row,
            {
              label: "Plus vieux bonsaï",
              value: stats.plusVieux ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/bonsai/$id",
                  params: { id: stats.plusVieux.id },
                  className: "text-accent hover:underline",
                  children: [
                    stats.plusVieux.nom,
                    " (",
                    ageActuel(stats.plusVieux),
                    " ans)"
                  ]
                }
              ) : "—"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Row,
            {
              label: "Étape majoritaire",
              value: (() => {
                const top = [...stats.parEtape].sort((a, b) => b.count - a.count)[0];
                return top && top.count > 0 ? `${etapeLabel(top.value)} (${top.count})` : "—";
              })()
            }
          )
        ] }) })
      ] })
    ] })
  ] });
}
function KPI({
  icon,
  label,
  value,
  hint,
  hintPositive,
  hintNegative
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground", children: [
      icon,
      " ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-2xl font-semibold", children: value }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `mt-0.5 text-xs ${hintPositive ? "text-emerald-600" : hintNegative ? "text-destructive" : "text-muted-foreground"}`,
        children: hint
      }
    )
  ] });
}
function Card({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl border border-border bg-card p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children })
  ] });
}
function Bar({ label, count, max }) {
  const pct = max > 0 ? Math.round(count / max * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: count })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full rounded-full bg-accent transition-all",
        style: { width: `${pct}%` }
      }
    ) })
  ] });
}
function Row({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-3 border-b border-border/60 pb-1.5 last:border-none last:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right font-medium", children: value })
  ] });
}
const BASE_URL = "https://my-bonsai-buddy.lovable.app";
const Route$g = createFileRoute("/sitemap.xml")({
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
function useBlobUrl(blob) {
  const [url, setUrl] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    if (!blob) {
      setUrl(void 0);
      return;
    }
    const u2 = URL.createObjectURL(blob);
    setUrl(u2);
    return () => URL.revokeObjectURL(u2);
  }, [blob]);
  return url;
}
async function fileToBlob(file) {
  if (file.size < 8e5) return file;
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();
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
const Select = Root2$1;
const SelectValue = Value;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger$1,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = Trigger$1.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Content2,
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
        Viewport,
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
SelectContent.displayName = Content2.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label$1,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = Label$1.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemText, { children })
    ]
  }
));
SelectItem.displayName = Item.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = Separator.displayName;
const Dialog = Root$1;
const DialogPortal = Portal$1;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content$1,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content$1.displayName;
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
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const RadioGroup = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2$4, { className: cn("grid gap-2", className), ...props, ref });
});
RadioGroup.displayName = Root2$4.displayName;
const RadioGroupItem = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-3.5 w-3.5 fill-primary" }) })
    }
  );
});
RadioGroupItem.displayName = Item2.displayName;
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
      if (source === "camera") {
        try {
          await saveBlobToDevice(blob, `bonsai-${Date.now()}.jpg`);
        } catch {
        }
      }
      setLegende("");
      setBlob(null);
      setPreview(void 0);
    } finally {
      setBusy(false);
    }
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
const FORMES = [
  "Ovale",
  "Ronde",
  "Rectangulaire",
  "Rectangulaire à coins arrondis",
  "Carrée",
  "Hexagonale",
  "Octogonale",
  "Pentagonale",
  "Lotus",
  "Demi-lune",
  "Cascade (haute)",
  "Tambour (cylindrique)",
  "Suiban (plateau peu profond, sans trou)",
  "Coupe peu profonde",
  "Nanban (forme libre, texturée)",
  "Nuage / forme irrégulière"
];
const MATIERES = [
  "Grès",
  "Terre cuite non émaillée",
  "Céramique émaillée",
  "Porcelaine",
  "Argile de Yixing",
  "Béton",
  "Plastique / résine (entraînement)"
];
const AUTRE = "__autre__";
function initialSelection(value, list) {
  if (!value) return { selection: "", custom: "" };
  if (list.includes(value)) return { selection: value, custom: "" };
  return { selection: AUTRE, custom: value };
}
const Route$f = createFileRoute("/poteries")({
  head: () => ({
    meta: [
      { title: "Poteries — Bonsaï Studio" },
      {
        name: "description",
        content: "Catalogue de vos poteries pour bonsaïs : formes, matières, dimensions et arbres associés."
      },
      { property: "og:title", content: "Poteries — Bonsaï Studio" },
      {
        property: "og:description",
        content: "Catalogue de vos contenants pour bonsaïs et arbres associés."
      },
      { property: "og:url", content: "/poteries" }
    ]
  }),
  component: PoteriesPage
});
function PoteriesPage() {
  const { data: poteries = [] } = useQuery({ queryKey: ["poteries"], queryFn: listPoteries$2 });
  const { data: bonsais = [] } = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais$2 });
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
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/poterie/$id",
          params: { id: p.id },
          className: "group block overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg",
          children: [
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
          ]
        }
      ) }, p.id);
    }) })
  ] });
}
function PoterieImage({ poterie }) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-secondary via-muted to-peach/30", children: url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: url,
      alt: "",
      loading: "lazy",
      decoding: "async",
      className: "h-full w-full object-cover"
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "h-10 w-10 opacity-40" }) }) });
}
function PoterieForm({ initial, onClose }) {
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
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
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
    await savePoterie(photoBlob ? { ...p, photoBlob } : p);
    await qc.invalidateQueries();
    toast.success(initial ? "Poterie mise à jour" : "Poterie ajoutée");
    onClose();
    if (!initial) navigate({ to: "/poterie/$id", params: { id: p.id } });
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: submit,
      className: "mb-8 grid gap-6 rounded-3xl border border-border bg-card p-6 lg:grid-cols-[240px_1fr]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "group relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-background transition hover:border-accent/60", children: [
          preview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: preview,
              alt: "",
              loading: "lazy",
              decoding: "async",
              className: "h-full w-full object-cover"
            }
          ) : initial?.photoPath ? /* @__PURE__ */ jsxRuntimeExports.jsx(ExistingImage, { poterie: initial }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "mx-auto h-7 w-7" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs", children: "Photo" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "file",
              accept: "image/*",
              className: "absolute inset-0 cursor-pointer opacity-0",
              onChange: (e) => e.target.files?.[0] && onFile(e.target.files[0])
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Nom", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.nom,
                onChange: (e) => set("nom", e.target.value),
                placeholder: "Tokoname ovale brune"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Forme" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: formeChoice, onValueChange: setFormeChoice, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "aria-label": "Forme", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choisir une forme…" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  FORMES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: f, children: f }, f)),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: AUTRE, children: "Autre" })
                ] })
              ] }),
              formeChoice === AUTRE && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  className: "mt-2",
                  value: formeCustom,
                  onChange: (e) => setFormeCustom(e.target.value),
                  placeholder: "Précisez la forme"
                }
              )
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
              matiereChoice === AUTRE && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  className: "mt-2",
                  value: matiereCustom,
                  onChange: (e) => setMatiereCustom(e.target.value),
                  placeholder: "Précisez la matière"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Couleur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.couleur,
                onChange: (e) => set("couleur", e.target.value),
                placeholder: "Brun, vert céladon…"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Longueur (cm)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: 0,
                value: form.longueurCm,
                onChange: (e) => set("longueurCm", e.target.value)
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Largeur (cm)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: 0,
                value: form.largeurCm,
                onChange: (e) => set("largeurCm", e.target.value)
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Hauteur (cm)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: 0,
                value: form.hauteurCm,
                onChange: (e) => set("hauteurCm", e.target.value)
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Prix (€)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: 0,
                value: form.prix,
                onChange: (e) => set("prix", e.target.value)
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Artisan", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.artisan,
                onChange: (e) => set("artisan", e.target.value),
                placeholder: "Yamaaki, Bigei…"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Origine", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.origine,
                onChange: (e) => set("origine", e.target.value),
                placeholder: "Japon, Tokoname…"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field$1, { label: "Notes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, value: form.notes, onChange: (e) => set("notes", e.target.value) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Annuler" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: initial ? "Enregistrer" : "Ajouter la poterie" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AddPhotoDialog,
          {
            open: dialogOpen,
            onOpenChange: setDialogOpen,
            source: dialogSource,
            file,
            onConfirm: handlePhotoConfirm
          }
        )
      ]
    }
  );
}
function Field$1({
  label,
  children
}) {
  const id = reactExports.useId();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: id, className: "mb-1.5 block text-sm", children: label }),
    reactExports.cloneElement(children, { id })
  ] });
}
function ExistingImage({ poterie }) {
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
const AlertDialog = Root2$2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2$1,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2$1.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
function ConfirmDialog({
  title,
  description,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  destructive = false,
  open,
  onOpenChange,
  onConfirm
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: title }),
      description && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: cancelLabel }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AlertDialogAction,
        {
          onClick: onConfirm,
          className: destructive ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : void 0,
          children: confirmLabel
        }
      )
    ] })
  ] }) });
}
function useConfirm() {
  const [state, setState] = reactExports.useState({ open: false, options: null, resolver: null });
  const confirm = (options) => {
    return new Promise((resolve) => {
      setState({ open: true, options, resolver: resolve });
    });
  };
  const handleConfirm = () => {
    state.resolver?.(true);
    setState((s) => ({ ...s, open: false }));
  };
  const handleCancel = () => {
    state.resolver?.(false);
    setState((s) => ({ ...s, open: false }));
  };
  const dialog = state.options ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    ConfirmDialog,
    {
      ...state.options,
      open: state.open,
      onOpenChange: (open) => {
        if (!open) handleCancel();
      },
      onConfirm: handleConfirm
    }
  ) : null;
  return { confirm, dialog };
}
let dbPromise = null;
function getDB() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB n'est disponible que côté client");
  }
  if (!dbPromise) {
    dbPromise = openDB("bonsai-studio", 2, {
      upgrade(db2, oldVersion) {
        if (oldVersion < 1) {
          db2.createObjectStore("bonsais", { keyPath: "id" });
          const photos = db2.createObjectStore("photos", { keyPath: "id" });
          photos.createIndex("by-bonsai", "bonsaiId");
          const journal = db2.createObjectStore("journal", { keyPath: "id" });
          journal.createIndex("by-bonsai", "bonsaiId");
          journal.createIndex("by-date", "date");
          const rappels = db2.createObjectStore("rappels", { keyPath: "id" });
          rappels.createIndex("by-bonsai", "bonsaiId");
          rappels.createIndex("by-date", "prochaineDate");
          db2.createObjectStore("poteries", { keyPath: "id" });
        }
        if (oldVersion < 2) {
          const ev = db2.createObjectStore("evenements", { keyPath: "id" });
          ev.createIndex("by-date", "dateHeure");
        }
      }
    });
  }
  return dbPromise;
}
async function listBonsais$1() {
  const db2 = await getDB();
  return db2.getAll("bonsais");
}
async function listPhotos(bonsaiId) {
  const db2 = await getDB();
  return db2.getAllFromIndex("photos", "by-bonsai", bonsaiId);
}
async function listJournal(bonsaiId) {
  const db2 = await getDB();
  const all = await db2.getAll("journal");
  return all.sort((a, b) => b.date.localeCompare(a.date));
}
async function listRappels$1(bonsaiId) {
  const db2 = await getDB();
  const all = await db2.getAll("rappels");
  return all.sort((a, b) => a.prochaineDate.localeCompare(b.prochaineDate));
}
async function listPoteries$1() {
  const db2 = await getDB();
  return db2.getAll("poteries");
}
async function listEvenements() {
  const db2 = await getDB();
  const all = await db2.getAll("evenements");
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
    console.log("Service Worker enregistré:", registration);
    const vapidPublicKey = "BFIBioio6UseGsO67Zk0hJuGdYjkNuJ69RxTWBN0EfBXeSy3-t_z-zm9bCXYnqU2-u5YbZWW42gh1EQ4ZFyKtDE";
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
    });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error("Utilisateur non connecté");
      return false;
    }
    const { error } = await supabase.from("push_subscriptions").upsert({
      user_id: user.id,
      endpoint: subscription.endpoint,
      p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey("p256dh")))),
      auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey("auth"))))
    }, { onConflict: "endpoint" });
    if (error) {
      console.error("Erreur lors de l'enregistrement de l'abonnement:", error);
      return false;
    }
    console.log("Abonnement push enregistré avec succès");
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
    console.log("Abonnement push supprimé:", unsubscribed);
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
const APP_VERSION = "1.16.8";
const APP_VERSION_DATE = "2026-07-18";
const Route$e = createFileRoute("/parametres")({
  head: () => ({
    meta: [
      { title: "Paramètres — Bonsaï Studio" },
      {
        name: "description",
        content: "Paramètres et sauvegarde : exporter/importer vos données Supabase, migrer depuis IndexedDB et options de l'application."
      },
      { property: "og:title", content: "Paramètres — Bonsaï Studio" },
      {
        property: "og:description",
        content: "Sauvegardes Supabase et options de l'application."
      },
      { property: "og:url", content: "/parametres" }
    ]
  }),
  component: ParametresPage
});
function ParametresPage() {
  const qc = useQueryClient();
  const { user, signOut } = useAuth();
  const [busy, setBusy] = reactExports.useState(null);
  const [hasLocalData, setHasLocalData] = reactExports.useState(false);
  const [checkingLocal, setCheckingLocal] = reactExports.useState(true);
  const { confirm, dialog: confirmDialog } = useConfirm();
  const [pushEnabled, setPushEnabled] = reactExports.useState(null);
  const [enablingPush, setEnablingPush] = reactExports.useState(false);
  const [disablingPush, setDisablingPush] = reactExports.useState(false);
  const [sendingTest, setSendingTest] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") {
      setCheckingLocal(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const bonsais = await listBonsais$1();
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
      const { data, error } = await supabase.functions.invoke("send-test-push");
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
    setBusy("export");
    try {
      const payload = await exportSupabaseBackup();
      const json = JSON.stringify(payload);
      let blob;
      if (typeof CompressionStream !== "undefined") {
        const enc = new TextEncoder().encode(json);
        const stream = new Response(new Blob([enc])).body.pipeThrough(
          new CompressionStream("gzip")
        );
        blob = await new Response(stream).blob();
      } else {
        blob = new Blob([json], { type: "application/json" });
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
        const stream = new Response(new Blob([bytes])).body.pipeThrough(
          new DecompressionStream("gzip")
        );
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
      const [bonsais, poteries, journal, rappels, evenements] = await Promise.all([
        listBonsais$1(),
        listPoteries$1(),
        listJournal(),
        listRappels$1(),
        listEvenements().catch(() => [])
      ]);
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
      toast.success(
        `Migration terminée : ${bonsais.length} arbre(s), ${allPhotos.length} photo(s), ${poteries.length} poterie(s), ${journal.length} entrée(s) de journal, ${rappels.length} rappel(s), ${evenements.length} évènement(s).`
      );
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
    typeof window !== "undefined" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 rounded-3xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent", children: pushEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Notifications push" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: pushEnabled === null ? "Vérification du support des notifications..." : pushEnabled ? "Les notifications push sont activées. Vous recevrez des rappels même si l'application est fermée." : notificationStatus() === "unsupported" ? "Votre navigateur ne supporte pas les notifications push." : "Activez les notifications pour recevoir des rappels même si l'application est fermée." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex gap-3", children: pushEnabled === null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: true, className: "opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mr-2 h-4 w-4" }),
        "Vérification..."
      ] }) : pushEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: doDisablePush, disabled: disablingPush, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "mr-2 h-4 w-4" }),
          disablingPush ? "Désactivation..." : "Désactiver les notifications"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: doSendTestNotification, disabled: sendingTest, children: sendingTest ? "Envoi..." : "Envoyer une notification de test" })
      ] }) : notificationStatus() === "unsupported" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", disabled: true, className: "opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mr-2 h-4 w-4" }),
        "Non supporté"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: doEnablePush, disabled: enablingPush || !user, children: [
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
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: doLocalExport,
            disabled: busy !== null,
            className: "h-auto py-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HardDriveDownload, { className: "mr-2 h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: busy === "export" ? "Préparation…" : "Télécharger la sauvegarde" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-normal text-muted-foreground", children: "Fichier compressé sur votre appareil" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            className: `flex h-auto cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-4 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground ${busy !== null ? "pointer-events-none opacity-50" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HardDriveUpload, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: busy === "import" ? "Import…" : "Importer un fichier" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-normal text-muted-foreground", children: ".json ou .json.gz" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "file",
                  accept: ".json,.gz,application/json,application/gzip",
                  className: "hidden",
                  onChange: (e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      doLocalImport(f);
                      e.target.value = "";
                    }
                  }
                }
              )
            ]
          }
        )
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
          format(parseISO(APP_VERSION_DATE), "d MMMM yyyy", { locale: fr })
        ] })
      ] })
    ] }) }),
    confirmDialog
  ] });
}
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
const listBonsais = defineTool({
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
const getBonsai = defineTool({
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
const SOIN_TYPES = [
  "arrosage",
  "taille",
  "rempotage",
  "fertilisation",
  "traitement",
  "ligature",
  "don_vente",
  "mort",
  "autre"
];
const logSoin = defineTool({
  name: "log_soin",
  title: "Enregistrer un soin",
  description: "Ajoute une entrée dans le journal d'entretien d'un bonsaï (arrosage, taille, rempotage, etc.).",
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
const listPoteries = defineTool({
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
const projectRef = "project-ref-unset";
const mcp = defineMcp({
  name: "bonsai-studio-mcp",
  title: "Bonsaï Studio",
  version: "0.1.0",
  instructions: "Outils pour interagir avec votre carnet Bonsaï Studio : lister vos bonsaïs et poteries, consulter les rappels d'entretien à venir, et enregistrer les soins effectués dans le journal.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated"
  }),
  tools: [listBonsais, getBonsai, listRappels, logSoin, listPoteries]
});
const Route$d = createFileRoute("/mcp")({
  server: {
    handlers: {
      ANY: createTanStackMcpHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource", trustForwardedHost: true })
    }
  }
});
const Route$c = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal d'entretien — Bonsaï Studio" },
      {
        name: "description",
        content: "Historique chronologique de tous les soins apportés à votre collection de bonsaïs, filtrable par arbre et par type."
      },
      { property: "og:title", content: "Journal d'entretien — Bonsaï Studio" },
      { property: "og:description", content: "Historique des soins apportés à vos bonsaïs." },
      { property: "og:url", content: "/journal" }
    ]
  }),
  component: JournalPage
});
function JournalPage() {
  const { data: entries = [] } = useQuery({ queryKey: ["journal"], queryFn: () => listJournal$1() });
  const { data: bonsais = [] } = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais$2 });
  const [bFilter, setBFilter] = reactExports.useState("");
  const [tFilter, setTFilter] = reactExports.useState("");
  const filtered = reactExports.useMemo(
    () => entries.filter((e) => {
      if (bFilter && e.bonsaiId !== bFilter) return false;
      if (tFilter && e.type !== tFilter) return false;
      return true;
    }),
    [entries, bFilter, tFilter]
  );
  const grouped = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    filtered.forEach((e) => {
      const k = format(parseISO(e.date), "yyyy-MM");
      const arr = m.get(k) ?? [];
      arr.push(e);
      m.set(k, arr);
    });
    return Array.from(m.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-muted-foreground", children: "Historique" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-4xl font-semibold", children: "Journal d'entretien" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        entries.length,
        " entrée",
        entries.length > 1 ? "s" : "",
        " dans votre carnet"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: bFilter,
          onChange: (e) => setBFilter(e.target.value),
          "aria-label": "Filtrer par bonsaï",
          className: "h-11 rounded-full border border-input bg-card px-4 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Tous les bonsaïs" }),
            bonsais.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b.id, children: b.nom }, b.id))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: tFilter,
          onChange: (e) => setTFilter(e.target.value),
          "aria-label": "Filtrer par type de soin",
          className: "h-11 rounded-full border border-input bg-card px-4 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Tous les soins" }),
            SOINS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: s.value, children: [
              s.emoji,
              " ",
              s.label
            ] }, s.value))
          ]
        }
      )
    ] }),
    grouped.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-dashed border-border bg-card/50 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-2xl font-semibold", children: "Journal vide" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Consignez vos soins depuis les fiches de vos bonsaïs." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: grouped.map(([month, items]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 font-display text-xl font-semibold capitalize text-muted-foreground", children: format(parseISO(`${month}-01`), "MMMM yyyy", { locale: fr }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: items.map((e) => {
        const b = bonsais.find((x) => x.id === e.bonsaiId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-start gap-3 rounded-xl border border-border bg-card p-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-lg", children: soinEmoji(e.type) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: soinLabel(e.type) }),
                    b && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/bonsai/$id",
                        params: { id: b.id },
                        className: "ml-2 text-sm text-accent hover:underline",
                        children: b.nom
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: format(parseISO(e.date), "EEE d MMM", { locale: fr }) })
                ] }),
                e.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 whitespace-pre-wrap text-sm text-muted-foreground", children: e.notes })
              ] })
            ]
          },
          e.id
        );
      }) })
    ] }, month)) })
  ] });
}
const Route$b = createFileRoute("/inscription")({
  head: () => ({
    meta: [
      { title: "Inscription — Bonsaï Studio" },
      {
        name: "description",
        content: "Créez votre compte Bonsaï Studio pour sauvegarder et synchroniser votre carnet de bonsaïs sur tous vos appareils."
      }
    ]
  }),
  component: InscriptionPage
});
function InscriptionPage() {
  const { signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/", replace: true });
    }
  }, [user, loading, navigate]);
  const submit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Le mot de passe doit faire au moins 8 caractères");
      return;
    }
    if (password !== confirm) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    setBusy(true);
    try {
      await signUp(email.trim(), password);
      toast.success("Compte créé. Vous pouvez vous connecter.");
      navigate({ to: "/connexion" });
    } catch (err) {
      toast.error("Inscription impossible : " + err.message);
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-6 w-6", strokeWidth: 2.25 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Créer un compte" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Synchronisez vos bonsaïs sur tous vos appareils" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4 rounded-3xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "email",
            type: "email",
            required: true,
            autoComplete: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "vous@exemple.com"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Mot de passe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "password",
            type: "password",
            required: true,
            autoComplete: "new-password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: "Au moins 8 caractères"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirm", children: "Confirmer le mot de passe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "confirm",
            type: "password",
            required: true,
            autoComplete: "new-password",
            value: confirm,
            onChange: (e) => setConfirm(e.target.value),
            placeholder: "••••••••"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy, className: "w-full", children: busy ? "Création…" : "Créer mon compte" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
        "Déjà un compte ?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/connexion", className: "font-medium text-accent hover:underline", children: "Se connecter" })
      ] })
    ] })
  ] }) });
}
const Route$a = createFileRoute("/connexion")({
  validateSearch: (s) => ({
    redirect: typeof s.redirect === "string" && s.redirect.startsWith("/") ? s.redirect : void 0
  }),
  head: () => ({
    meta: [
      { title: "Connexion — Bonsaï Studio" },
      {
        name: "description",
        content: "Connectez-vous à votre carnet de bonsaïs pour synchroniser vos arbres sur tous vos appareils."
      }
    ]
  }),
  component: ConnexionPage
});
function ConnexionPage() {
  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const { redirect: redirect2 } = Route$a.useSearch();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const goRedirect = () => {
    const target = redirect2 ?? "/";
    if (target.includes("?") || target.startsWith("/.")) window.location.assign(target);
    else navigate({ to: target, replace: true });
  };
  reactExports.useEffect(() => {
    if (!loading && user) goRedirect();
  }, [user, loading]);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await signIn(email.trim(), password);
      toast.success("Connexion réussie");
      goRedirect();
    } catch (err) {
      toast.error("Connexion impossible : " + err.message);
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-6 w-6", strokeWidth: 2.25 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Bonsaï Studio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Carnet de collection" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4 rounded-3xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "email",
            type: "email",
            required: true,
            autoComplete: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "vous@exemple.com"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Mot de passe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "password",
            type: "password",
            required: true,
            autoComplete: "current-password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: "••••••••"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy, className: "w-full", children: busy ? "Connexion…" : "Se connecter" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
        "Pas encore de compte ?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/inscription", className: "font-medium text-accent hover:underline", children: "Créer un compte" })
      ] })
    ] })
  ] }) });
}
const MAX_CACHE_ENTRIES = 300;
const cache = /* @__PURE__ */ new Map();
function rememberKey(key) {
  const value = cache.get(key);
  if (value) {
    cache.delete(key);
    cache.set(key, value);
  }
  while (cache.size > MAX_CACHE_ENTRIES) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey === void 0) break;
    cache.delete(oldestKey);
  }
}
function getCachedPhotoBlob(photo) {
  const key = photo.storagePath;
  if (!key) return Promise.resolve(void 0);
  const existing = cache.get(key);
  if (existing) {
    rememberKey(key);
    return existing;
  }
  const promise = getPhotoBlob(photo).catch(() => void 0);
  cache.set(key, promise);
  rememberKey(key);
  return promise;
}
function invalidateCachedPhoto(storagePath) {
  if (!storagePath) return;
  cache.delete(storagePath);
}
const photoCache = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getCachedPhotoBlob,
  invalidateCachedPhoto
}, Symbol.toStringTag, { value: "Module" }));
function BonsaiPhoto({
  photoId,
  className,
  fallbackClassName
}) {
  const [blob, setBlob] = reactExports.useState();
  reactExports.useEffect(() => {
    let cancelled = false;
    if (!photoId) {
      setBlob(void 0);
      return;
    }
    getCachedPhotoBlob({ storagePath: photoId, poterieId: null }).then((blob2) => {
      if (!cancelled) setBlob(blob2);
    }).catch(() => {
      if (!cancelled) setBlob(void 0);
    });
    return () => {
      cancelled = true;
    };
  }, [photoId]);
  const url = useBlobUrl(blob);
  if (!url) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "flex items-center justify-center bg-gradient-to-br from-secondary via-muted to-sage/30 text-muted-foreground",
          fallbackClassName ?? className
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-8 w-8 opacity-40" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "", loading: "lazy", decoding: "async", className });
}
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
const Route$9 = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Mes bonsaïs — Bonsaï Studio" },
      {
        name: "description",
        content: "Toute votre collection de bonsaïs en un coup d'œil : filtres par style, recherche et statut de chaque arbre."
      },
      { property: "og:title", content: "Mes bonsaïs — Bonsaï Studio" },
      {
        property: "og:description",
        content: "Parcourez votre collection de bonsaïs avec filtres par style et statut."
      },
      { property: "og:url", content: "/collection" }
    ]
  }),
  component: CollectionPage
});
function CollectionPage() {
  const { data: bonsais = [] } = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais$2 });
  const [q, setQ] = reactExports.useState("");
  const [styleFilter, setStyleFilter] = reactExports.useState("");
  const [statutFilter, setStatutFilter] = reactExports.useState(
    "actifs"
  );
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/bonsai/nouveau",
          className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Nouveau bonsaï"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-[240px] flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: q,
            onChange: (e) => setQ(e.target.value),
            placeholder: "Rechercher par nom, espèce, origine…",
            "aria-label": "Rechercher dans la collection",
            className: "h-11 rounded-full bg-card pl-10"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: styleFilter,
          onChange: (e) => setStyleFilter(e.target.value),
          "aria-label": "Filtrer par style de bonsaï",
          className: "h-11 rounded-full border border-input bg-card px-4 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Tous les styles" }),
            STYLES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.value, children: s.label }, s.value))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: statutFilter,
          onChange: (e) => setStatutFilter(e.target.value),
          "aria-label": "Filtrer par statut dans la collection",
          className: "h-11 rounded-full border border-input bg-card px-4 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "actifs", children: "Dans la collection" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "favoris", children: "Favoris" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "sortis", children: "Sortis de la collection" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "tous", children: "Tous" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sortBy, onValueChange: (v) => setSortBy(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            "aria-label": "Trier les bonsaïs",
            className: "h-11 w-auto min-w-[200px] rounded-full border-input bg-card px-4 text-sm",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Trier par…" })
          }
        ),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            checked: favorisFirst,
            onCheckedChange: (v) => setFavorisFirst(v === true),
            "aria-label": "Favoris en premier"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Favoris en premier" })
      ] })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-dashed border-border bg-card/50 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-2xl font-semibold", children: bonsais.length === 0 ? "Votre collection est vide" : "Aucun arbre ne correspond" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: bonsais.length === 0 ? "Ajoutez votre premier bonsaï pour commencer votre carnet." : "Modifiez vos filtres pour voir d'autres arbres." }),
      bonsais.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/bonsai/nouveau",
          className: "mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Ajouter un bonsaï"
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: filtered.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/bonsai/$id",
        params: { id: b.id },
        className: "group block overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] w-full overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              BonsaiPhoto,
              {
                photoId: b.photoPrincipale,
                className: `h-full w-full object-cover transition duration-500 group-hover:scale-105 ${b.dansCollection ?? true ? "" : "grayscale"}`
              }
            ),
            !(b.dansCollection ?? true) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur", children: "Sorti" }),
            b.favori && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-amber-500 backdrop-blur",
                "aria-label": "Favori",
                title: "Favori",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-current" })
              }
            )
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
        ]
      }
    ) }, b.id)) })
  ] });
}
const Route$8 = createFileRoute("/calendrier")({
  head: () => ({
    meta: [
      { title: "Calendrier des soins — Bonsaï Studio" },
      {
        name: "description",
        content: "Calendrier mensuel des rappels d'entretien et évènements pour vos bonsaïs, avec notifications avant l'échéance pour les évènements."
      },
      { property: "og:title", content: "Calendrier des soins — Bonsaï Studio" },
      {
        property: "og:description",
        content: "Rappels d'entretien et évènements pour vos bonsaïs."
      },
      { property: "og:url", content: "/calendrier" }
    ]
  }),
  component: CalendrierPage
});
function CalendrierPage() {
  const qc = useQueryClient();
  const [month, setMonth] = reactExports.useState(() => /* @__PURE__ */ new Date());
  const { data: rappels = [] } = useQuery({ queryKey: ["rappels"], queryFn: () => listRappels$2() });
  const { data: bonsais = [] } = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais$2 });
  const { data: evenements = [] } = useQuery({ queryKey: ["evenements"], queryFn: listEvenements$1 });
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });
  const rappelsByDay = /* @__PURE__ */ new Map();
  rappels.filter((r) => r.actif).forEach((r) => {
    const k = format(parseISO(r.prochaineDate), "yyyy-MM-dd");
    const arr = rappelsByDay.get(k) ?? [];
    arr.push(r);
    rappelsByDay.set(k, arr);
  });
  const eventsByDay = /* @__PURE__ */ new Map();
  evenements.forEach((e) => {
    const k = format(parseISO(e.dateHeure), "yyyy-MM-dd");
    const arr = eventsByDay.get(k) ?? [];
    arr.push(e);
    eventsByDay.set(k, arr);
  });
  const markDone = async (r) => {
    await saveJournal({
      id: uid(),
      bonsaiId: r.bonsaiId,
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
      await saveRappel({ ...r, actif: false });
    }
    qc.invalidateQueries();
    toast.success("Soin enregistré");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8 flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-muted-foreground", children: "Soins & évènements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-4xl font-semibold capitalize", children: format(month, "MMMM yyyy", { locale: fr }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Mois précédent",
            onClick: () => setMonth(subMonths(month)),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setMonth(/* @__PURE__ */ new Date()), children: "Aujourd'hui" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Mois suivant",
            onClick: () => setMonth(addMonths(month, 1)),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-3xl border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 border-b border-border bg-secondary/40 text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2", children: d }, d)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7", children: days.map((d) => {
        const k = format(d, "yyyy-MM-dd");
        const items = rappelsByDay.get(k) ?? [];
        const evs = eventsByDay.get(k) ?? [];
        const inMonth = isSameMonth(d, month);
        const today = isSameDay(d, /* @__PURE__ */ new Date());
        const totalCount = items.length + evs.length;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "min-h-[110px] border-b border-r border-border p-2 text-left",
              !inMonth && "bg-secondary/20 text-muted-foreground"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                    today && "bg-accent text-accent-foreground"
                  ),
                  children: format(d, "d")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1", children: [
                evs.slice(0, 2).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "block truncate rounded-md bg-accent/15 px-1.5 py-0.5 text-[11px] text-accent",
                    title: `${e.titre} — ${format(parseISO(e.dateHeure), "HH:mm")}`,
                    children: [
                      "📅 ",
                      format(parseISO(e.dateHeure), "HH:mm"),
                      " ",
                      e.titre
                    ]
                  }
                ) }, e.id)),
                items.slice(0, Math.max(0, 3 - evs.length)).map((r) => {
                  const b = bonsais.find((x) => x.id === r.bonsaiId);
                  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/bonsai/$id",
                      params: { id: r.bonsaiId },
                      className: "block truncate rounded-md bg-sage/25 px-1.5 py-0.5 text-[11px] text-forest hover:bg-sage/40",
                      title: `${soinLabel(r.type)} — ${b?.nom ?? ""}`,
                      children: [
                        soinEmoji(r.type),
                        " ",
                        b?.nom ?? "—"
                      ]
                    }
                  ) }, r.id);
                }),
                totalCount > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-[10px] text-muted-foreground", children: [
                  "+ ",
                  totalCount - 3
                ] })
              ] })
            ]
          },
          k
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EvenementsSection, { evenements, bonsais }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-display text-2xl font-semibold", children: "Rappels de soins en cours" }),
      rappels.filter((r) => r.actif).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucun rappel actif. Ajoutez-en depuis la fiche d'un bonsaï." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: rappels.filter((r) => r.actif).map((r) => {
        const b = bonsais.find((x) => x.id === r.bonsaiId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-center gap-3 rounded-xl border border-border bg-card p-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-base", children: soinEmoji(r.type) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
                  soinLabel(r.type),
                  " — ",
                  b?.nom ?? "—"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                  format(parseISO(r.prochaineDate), "EEEE d MMMM yyyy", { locale: fr }),
                  r.intervalleJours ? ` · tous les ${r.intervalleJours} j` : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => markDone(r), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1 h-4 w-4" }),
                " Fait"
              ] })
            ]
          },
          r.id
        );
      }) })
    ] })
  ] });
}
function EvenementsSection({
  evenements,
  bonsais
}) {
  const qc = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [titre, setTitre] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const { confirm, dialog: confirmDialog } = useConfirm();
  const [dateHeure, setDateHeure] = reactExports.useState(() => {
    const d = /* @__PURE__ */ new Date();
    d.setMinutes(0, 0, 0);
    d.setHours(d.getHours() + 1);
    return formatLocal(d);
  });
  const [rappelMinutes, setRappelMinutes] = reactExports.useState("60");
  const [bonsaiId, setBonsaiId] = reactExports.useState("");
  const add = async () => {
    if (!titre.trim()) {
      toast.error("Donnez un titre à l'évènement");
      return;
    }
    const iso = new Date(dateHeure).toISOString();
    await saveEvenement({
      id: uid(),
      titre: titre.trim(),
      description: description.trim() || void 0,
      dateHeure: iso,
      rappelMinutes: rappelMinutes ? Number(rappelMinutes) : void 0,
      bonsaiId: bonsaiId || void 0,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    qc.invalidateQueries({ queryKey: ["evenements"] });
    setOpen(false);
    setTitre("");
    setDescription("");
    toast.success("Évènement ajouté");
  };
  const edit = (e) => {
    setEditingId(e.id);
    setTitre(e.titre);
    setDescription(e.description || "");
    setDateHeure(formatLocal(new Date(e.dateHeure)));
    setRappelMinutes(e.rappelMinutes?.toString() || "60");
    setBonsaiId(e.bonsaiId || "");
    setOpen(true);
  };
  const update = async () => {
    if (!editingId || !titre.trim()) {
      toast.error("Donnez un titre à l'évènement");
      return;
    }
    const iso = new Date(dateHeure).toISOString();
    await saveEvenement({
      id: editingId,
      titre: titre.trim(),
      description: description.trim() || void 0,
      dateHeure: iso,
      rappelMinutes: rappelMinutes ? Number(rappelMinutes) : void 0,
      bonsaiId: bonsaiId || void 0,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    qc.invalidateQueries({ queryKey: ["evenements"] });
    setOpen(false);
    setEditingId(null);
    setTitre("");
    setDescription("");
    toast.success("Évènement mis à jour");
  };
  const remove = async (id) => {
    const confirmed = await confirm({
      title: "Supprimer cet évènement ?",
      destructive: true,
      confirmLabel: "Supprimer"
    });
    if (!confirmed) return;
    await deleteEvenement(id);
    qc.invalidateQueries({ queryKey: ["evenements"] });
  };
  const upcoming = evenements.filter(
    (e) => new Date(e.dateHeure).getTime() > Date.now() - 24 * 36e5
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: "Évènements à venir" }),
      !open && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setOpen(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "mr-1.5 h-4 w-4" }),
        " Nouvel évènement"
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 space-y-3 rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "evt-titre", className: "mb-1.5 block text-sm", children: "Titre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "evt-titre",
              value: titre,
              onChange: (e) => setTitre(e.target.value),
              placeholder: "Atelier de taille, exposition…"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "evt-date", className: "mb-1.5 block text-sm", children: "Date et heure" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "evt-date",
              type: "datetime-local",
              value: dateHeure,
              onChange: (e) => setDateHeure(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "evt-rappel", className: "mb-1.5 block text-sm", children: "Rappel avant (minutes)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "evt-rappel",
              value: rappelMinutes,
              onChange: (e) => setRappelMinutes(e.target.value),
              className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "0", children: "À l'heure" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "10", children: "10 min avant" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30", children: "30 min avant" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "60", children: "1 h avant" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "180", children: "3 h avant" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1440", children: "1 jour avant" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2880", children: "2 jours avant" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "evt-bonsai", className: "mb-1.5 block text-sm", children: "Bonsaï associé (facultatif)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "evt-bonsai",
              value: bonsaiId,
              onChange: (e) => setBonsaiId(e.target.value),
              className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Aucun —" }),
                bonsais.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b.id, children: b.nom }, b.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "evt-desc", className: "mb-1.5 block text-sm", children: "Description (facultatif)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "evt-desc",
              value: description,
              onChange: (e) => setDescription(e.target.value),
              rows: 3
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => {
              setOpen(false);
              setEditingId(null);
              setTitre("");
              setDescription("");
            },
            children: "Annuler"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: editingId ? update : add, children: editingId ? "Mettre à jour" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
          " Ajouter"
        ] }) })
      ] })
    ] }),
    upcoming.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucun évènement programmé." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: upcoming.map((e) => {
      const b = e.bonsaiId ? bonsais.find((x) => x.id === e.bonsaiId) : void 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "flex items-start gap-3 rounded-xl border border-border bg-card p-3 cursor-pointer hover:bg-secondary/40 transition",
          onClick: () => edit(e),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: e.titre }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: format(parseISO(e.dateHeure), "EEE d MMM · HH:mm", { locale: fr }) })
              ] }),
              b && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/bonsai/$id",
                  params: { id: b.id },
                  className: "text-xs text-accent hover:underline",
                  onClick: (event) => event.stopPropagation(),
                  children: b.nom
                }
              ),
              e.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 whitespace-pre-wrap text-sm text-muted-foreground", children: e.description }),
              e.rappelMinutes != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3 w-3" }),
                e.rappelMinutes === 0 ? "Rappel à l'heure" : `Rappel ${formatMinutes(e.rappelMinutes)} avant`
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                "aria-label": `Supprimer l'évènement ${e.titre}`,
                onClick: (event) => {
                  event.stopPropagation();
                  remove(e.id);
                },
                className: "text-muted-foreground hover:text-destructive",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ]
        },
        e.id
      );
    }) }),
    confirmDialog
  ] });
}
function formatLocal(d) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function formatMinutes(m) {
  if (m < 60) return `${m} min`;
  if (m < 1440) return `${Math.round(m / 60)} h`;
  return `${Math.round(m / 1440)} j`;
}
const Route$7 = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — Bonsaï Studio" },
      {
        name: "description",
        content: "Vue d'ensemble de votre collection de bonsaïs : prochains soins, rappels en retard et derniers arbres ajoutés."
      },
      { property: "og:title", content: "Tableau de bord — Bonsaï Studio" },
      {
        property: "og:description",
        content: "Vue d'ensemble de votre collection de bonsaïs et des prochains soins."
      },
      { property: "og:url", content: "/" }
    ]
  }),
  component: Dashboard
});
function Dashboard() {
  const bonsais = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais$2 });
  const rappels = useQuery({ queryKey: ["rappels"], queryFn: () => listRappels$2() });
  const journal = useQuery({ queryKey: ["journal"], queryFn: () => listJournal$1() });
  const poteries = useQuery({ queryKey: ["poteries"], queryFn: listPoteries$2 });
  const now = /* @__PURE__ */ new Date();
  const in7 = addDays(now, 7);
  const aVenir = (rappels.data ?? []).filter((r) => r.actif && isBefore(parseISO(r.prochaineDate), in7)).slice(0, 6);
  const enRetard = (rappels.data ?? []).filter(
    (r) => r.actif && isAfter(now, parseISO(r.prochaineDate))
  );
  const dernierAjouts = (bonsais.data ?? []).slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);
  const empty = (bonsais.data?.length ?? 0) === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-forest via-forest to-sage/80 p-8 text-primary-foreground md:flex-row md:items-end md:justify-between md:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.22em] text-primary-foreground/70", children: [
          "Carnet · ",
          format(now, "EEEE d MMMM", { locale: fr })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-semibold leading-tight md:text-5xl", children: "Bonjour. Vos arbres vous attendent." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-md text-sm text-primary-foreground/80 md:text-base", children: "Un espace calme pour observer, soigner et faire grandir votre collection au fil des saisons." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/bonsai/nouveau",
          className: "inline-flex items-center gap-2 self-start rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-forest/30 transition hover:brightness-105 md:self-end",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Ajouter un bonsaï"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10 grid grid-cols-2 gap-4 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "h-4 w-4" }),
          label: "Bonsaïs",
          value: bonsais.data?.length ?? 0,
          to: "/collection"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "h-4 w-4" }),
          label: "Poteries",
          value: poteries.data?.length ?? 0,
          to: "/poteries"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
          label: "Rappels actifs",
          value: (rappels.data ?? []).filter((r) => r.actif).length,
          to: "/calendrier",
          highlight: enRetard.length > 0 ? `${enRetard.length} en retard` : void 0
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
          label: "Entrées journal",
          value: journal.data?.length ?? 0,
          to: "/journal"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            title: "Soins à venir",
            subtitle: "7 prochains jours",
            link: { to: "/calendrier", label: "Voir le calendrier" }
          }
        ),
        aVenir.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyBox, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-5 w-5" }), children: "Aucun soin programmé pour cette semaine. Ajoutez un rappel depuis une fiche bonsaï." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: aVenir.map((r) => {
          const b = bonsais.data?.find((x) => x.id === r.bonsaiId);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/bonsai/$id",
              params: { id: r.bonsaiId },
              className: "flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-3 transition hover:border-accent/50 hover:shadow-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-lg", children: soinEmoji(r.type) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
                    soinLabel(r.type),
                    " — ",
                    b?.nom ?? "—"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                    format(parseISO(r.prochaineDate), "EEEE d MMMM", { locale: fr }),
                    r.intervalleJours ? ` · tous les ${r.intervalleJours} j` : ""
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground" })
              ]
            }
          ) }, r.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            title: "Derniers ajouts",
            link: { to: "/collection", label: "Collection" }
          }
        ),
        empty ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyBox, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "h-5 w-5" }), children: "Votre collection est vide. Commencez en ajoutant votre premier bonsaï." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-2 gap-3", children: dernierAjouts.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/bonsai/$id",
            params: { id: b.id },
            className: "group block overflow-hidden rounded-2xl border border-border bg-card transition hover:border-accent/50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square w-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                BonsaiPhoto,
                {
                  photoId: b.photoPrincipale,
                  className: "h-full w-full object-cover transition group-hover:scale-105"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-display text-sm font-semibold", children: b.nom }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[11px] uppercase tracking-wider text-muted-foreground", children: styleLabel(b.style).split(" — ")[0] })
              ] })
            ]
          }
        ) }, b.id)) })
      ] })
    ] })
  ] });
}
function StatCard({
  icon,
  label,
  value,
  to,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to,
      className: "group rounded-2xl border border-border bg-card p-5 transition hover:border-accent/50 hover:shadow-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-foreground", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 opacity-0 transition group-hover:opacity-100" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-3xl font-semibold text-foreground", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs uppercase tracking-wider text-muted-foreground", children: label }),
        highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 inline-flex rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-medium text-destructive", children: highlight })
      ]
    }
  );
}
function SectionHeader({
  title,
  subtitle,
  link
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-end justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: subtitle })
    ] }),
    link && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: link.to, className: "text-sm font-medium text-accent hover:underline", children: [
      link.label,
      " →"
    ] })
  ] });
}
function EmptyBox({ icon, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 px-5 py-6 text-sm text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children })
  ] });
}
const PoterieGalerieTab = reactExports.lazy(() => import("./galerie-tab-BFdBcdQl.mjs"));
const Route$6 = createFileRoute("/poterie/$id")({
  ssr: false,
  loader: async ({ params, context }) => {
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
  head: ({ loaderData, params }) => {
    const nom = loaderData?.nom ?? "Poterie";
    const bits = [loaderData?.forme, loaderData?.matiere, loaderData?.artisan].filter(Boolean).join(", ");
    const baseDesc = `${nom}${bits ? ` — ${bits}` : ""} — fiche détaillée de poterie pour bonsaï.`;
    const desc = baseDesc.length > 160 ? baseDesc.slice(0, 157) + "…" : baseDesc;
    const title = `${nom} — Bonsaï Studio`;
    return {
      meta: [
        { title: title.length > 60 ? `${nom.slice(0, 50)} — Poterie` : title },
        { name: "description", content: desc },
        { name: "robots", content: "noindex,follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/poterie/${params.id}` }
      ]
    };
  },
  component: PoterieDetail
});
function PoterieDetail() {
  const { id } = Route$6.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [editing, setEditing] = reactExports.useState(false);
  const { confirm, dialog: confirmDialog } = useConfirm();
  const { data: p, isPending } = useQuery({
    queryKey: ["poterie", id],
    queryFn: () => getPoterie(id)
  });
  const { data: bonsais = [] } = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais$2 });
  const { data: photos = [] } = useQuery({
    queryKey: ["poterie-photos", id],
    queryFn: () => listPoteriePhotos(id)
  });
  const [blob, setBlob] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    let cancelled = false;
    if (!p) {
      setBlob(void 0);
      return;
    }
    getPoteriePhoto(p).then((b) => {
      if (!cancelled) setBlob(b);
    }).catch(() => {
      if (!cancelled) setBlob(void 0);
    });
    return () => {
      cancelled = true;
    };
  }, [p]);
  const url = useBlobUrl(blob);
  if (isPending)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Chargement…" }) });
  if (!p)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Poterie introuvable." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/poteries", className: "text-accent", children: "Retour" })
    ] });
  const planted = bonsais.find((b) => b.poterieId === p.id);
  const remove = async () => {
    const confirmed = await confirm({
      title: "Supprimer cette poterie ?",
      description: `« ${p.nom} » sera supprimée définitivement.`,
      destructive: true,
      confirmLabel: "Supprimer"
    });
    if (!confirmed) return;
    await deletePoterie(id);
    await qc.invalidateQueries();
    toast.success("Poterie supprimée");
    navigate({ to: "/poteries" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/poteries",
        className: "mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Poteries"
        ]
      }
    ),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PoterieForm,
      {
        initial: p,
        onClose: () => {
          setEditing(false);
          qc.invalidateQueries();
        }
      }
    ),
    !editing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[420px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary to-peach/30", children: url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "h-12 w-12 text-muted-foreground" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-accent", children: "Poterie" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-5xl font-semibold", children: p.nom }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3", children: [
          p.forme && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat$1, { label: "Forme", value: p.forme }),
          p.matiere && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat$1, { label: "Matière", value: p.matiere }),
          p.couleur && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat$1, { label: "Couleur", value: p.couleur }),
          (p.longueurCm || p.largeurCm || p.hauteurCm) && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Stat$1,
            {
              label: "Dimensions",
              value: `${p.longueurCm ?? "?"} × ${p.largeurCm ?? "?"} × ${p.hauteurCm ?? "?"} cm`
            }
          ),
          p.artisan && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat$1, { label: "Artisan", value: p.artisan }),
          p.origine && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat$1, { label: "Origine", value: p.origine }),
          p.prix != null && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat$1, { label: "Prix", value: `${p.prix} €` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Stat$1,
            {
              label: "État",
              value: planted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/bonsai/$id",
                  params: { id: planted.id },
                  className: "text-accent hover:underline",
                  children: [
                    "Plantée · ",
                    planted.nom
                  ]
                }
              ) : "Libre"
            }
          )
        ] }),
        p.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-border bg-secondary/40 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 whitespace-pre-wrap text-sm", children: p.notes })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => setEditing(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "mr-1.5 h-4 w-4" }),
            " Modifier"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: remove,
              className: "text-destructive hover:text-destructive",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-1.5 h-4 w-4" }),
                " Supprimer"
              ]
            }
          )
        ] })
      ] })
    ] }),
    !editing && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-display text-2xl font-semibold", children: "Galerie" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        reactExports.Suspense,
        {
          fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Chargement…" }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(PoterieGalerieTab, { poterieId: id, photos })
        }
      )
    ] }),
    confirmDialog
  ] });
}
function Stat$1({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5 font-display text-lg font-medium", children: value })
  ] });
}
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root$2,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Root$2.displayName;
const schema = object({
  nom: string().min(1, "Donnez un nom à votre bonsaï"),
  espece: string().min(1, "Indiquez l'espèce"),
  style: _enum([
    "chokkan",
    "moyogi",
    "shakan",
    "kengai",
    "han-kengai",
    "bunjin",
    "yose-ue",
    "ishitsuki",
    "sokan",
    "sankan",
    "kabudachi",
    "ikadabuki",
    "netsuranari",
    "sekijoju",
    "neagari",
    "fukinagashi",
    "hokidachi",
    "sharimiki",
    "sabamiki",
    "nejikan",
    "takozukuri",
    "bankan",
    "autre"
  ]),
  etape: _enum(["culture", "pre-bonsai", "bonsai"]),
  ageEstime: string().optional(),
  hauteurCm: string().optional(),
  prixAchat: string().optional(),
  valeurEstimee: string().optional(),
  dateAcquisition: string().optional(),
  origine: string().optional(),
  poterieId: string().optional(),
  notes: string().optional(),
  dansCollection: boolean()
});
function BonsaiForm({
  initial,
  onSaved
}) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { user } = useAuth();
  const { data: poteries = [] } = useQuery({ queryKey: ["poteries"], queryFn: listPoteries$2 });
  const [file, setFile] = reactExports.useState(null);
  const [preview, setPreview] = reactExports.useState(null);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [dialogSource, setDialogSource] = reactExports.useState("gallery");
  const [photoData, setPhotoData] = reactExports.useState(null);
  const [especeLang, setEspeceLang] = reactExports.useState(() => {
    if (typeof window === "undefined") return "latin";
    return localStorage.getItem("bonsai.espece.lang") ?? "latin";
  });
  reactExports.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);
  const form = useForm({
    resolver: u(schema),
    defaultValues: {
      nom: initial?.nom ?? "",
      espece: initial?.espece ?? "",
      style: initial?.style ?? "moyogi",
      etape: initial?.etape ?? "culture",
      ageEstime: initial?.ageEstime != null ? String(initial.ageEstime) : "",
      hauteurCm: initial?.hauteurCm != null ? String(initial.hauteurCm) : "",
      prixAchat: initial?.prixAchat != null ? String(initial.prixAchat) : "",
      valeurEstimee: initial?.valeurEstimee != null ? String(initial.valeurEstimee) : "",
      dateAcquisition: initial?.dateAcquisition?.slice(0, 10) ?? "",
      origine: initial?.origine ?? "",
      poterieId: initial?.poterieId ?? "",
      notes: initial?.notes ?? "",
      dansCollection: initial?.dansCollection ?? true
    }
  });
  const especesList = reactExports.useMemo(() => getAllEspeces(), []);
  const toggleEspeceLang = () => {
    const next = especeLang === "latin" ? "fr" : "latin";
    setEspeceLang(next);
    if (typeof window !== "undefined") localStorage.setItem("bonsai.espece.lang", next);
    const current = form.getValues("espece").trim();
    const match = especesList.find((e) => e.latin === current || e.fr === current);
    if (match) form.setValue("espece", next === "latin" ? match.latin : match.fr);
  };
  const onFile = (f) => {
    setFile(f);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(f);
    });
    setDialogSource("gallery");
    setDialogOpen(true);
  };
  const handlePhotoConfirm = async (data) => {
    setPhotoData(data);
    setDialogOpen(false);
  };
  const submit = form.handleSubmit(async (values) => {
    if (!user) {
      toast.error("Vous devez être connecté pour ajouter un bonsaï à votre collection");
      navigate({ to: "/connexion" });
      return;
    }
    const id = initial?.id ?? uid();
    let photoId = initial?.photoPrincipale;
    addCustomEspece(values.espece);
    try {
      const b = {
        id,
        nom: values.nom.trim(),
        espece: values.espece.trim(),
        style: values.style,
        etape: values.etape,
        ageEstime: values.ageEstime ? Number(values.ageEstime) : void 0,
        hauteurCm: values.hauteurCm ? Number(values.hauteurCm) : void 0,
        prixAchat: values.prixAchat ? Number(values.prixAchat) : void 0,
        valeurEstimee: values.valeurEstimee ? Number(values.valeurEstimee) : void 0,
        dateAcquisition: values.dateAcquisition || void 0,
        origine: values.origine?.trim() || void 0,
        poterieId: values.poterieId || void 0,
        notes: values.notes?.trim() || void 0,
        photoPrincipale: photoId,
        dansCollection: values.dansCollection,
        createdAt: initial?.createdAt ?? (/* @__PURE__ */ new Date()).toISOString()
      };
      await saveBonsai(b);
      if (photoData) {
        photoId = await savePhoto({
          id: uid(),
          bonsaiId: id,
          blob: photoData.blob,
          date: photoData.date,
          legende: photoData.legende || "Photo principale"
        });
        b.photoPrincipale = photoId;
        await saveBonsai(b);
      }
      await qc.invalidateQueries();
      toast.success(initial ? "Bonsaï mis à jour" : "Bonsaï ajouté à votre collection");
      if (onSaved) onSaved(b);
      else navigate({ to: "/bonsai/$id", params: { id } });
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement: " + error.message);
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "grid gap-8 lg:grid-cols-[280px_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-2 block", children: "Photo principale" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-card transition hover:border-accent/60", children: [
        preview ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "mx-auto h-8 w-8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs", children: "Cliquer pour téléverser" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            accept: "image/*",
            className: "absolute inset-0 cursor-pointer opacity-0",
            onChange: (e) => e.target.files?.[0] && onFile(e.target.files[0])
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nom", error: form.formState.errors.nom?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...form.register("nom"), placeholder: "Vieux pin du jardin" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Field,
          {
            label: "Espèce",
            error: form.formState.errors.espece?.message,
            action: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: toggleEspeceLang,
                className: "text-xs text-accent hover:underline",
                title: "Basculer entre nom scientifique et nom français",
                children: especeLang === "latin" ? "Afficher en français" : "Afficher en latin"
              }
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  ...form.register("espece"),
                  list: "especes-list",
                  placeholder: especeLang === "latin" ? "Pinus parviflora" : "Pin blanc du Japon"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "especes-list", children: especesList.map((e) => {
                const value = especeLang === "latin" ? e.latin : e.fr;
                const other = especeLang === "latin" ? e.fr : e.latin;
                return /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value, children: other }, `${e.latin}|${e.fr}`);
              }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Style", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            ...form.register("style"),
            className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
            children: STYLES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.value, children: s.label }, s.value))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Étape", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            ...form.register("etape"),
            className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
            children: ETAPES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.value, children: s.label }, s.value))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Poterie associée", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            ...form.register("poterieId"),
            className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Aucune" }),
              poteries.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id, children: p.nom }, p.id))
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Âge estimé à l'acquisition (années)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 0,
              inputMode: "numeric",
              ...form.register("ageEstime"),
              placeholder: "35"
            }
          ),
          form.watch("ageEstime") && !form.watch("dateAcquisition") && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Renseignez une date d'acquisition pour que l'âge se mette à jour automatiquement chaque année." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Hauteur (cm)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 0,
            inputMode: "numeric",
            ...form.register("hauteurCm"),
            placeholder: "45"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date d'acquisition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", ...form.register("dateAcquisition") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Origine / pépinière", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...form.register("origine"), placeholder: "Pépinière Saulieu" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Prix d'achat (€)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 0,
            step: "0.01",
            ...form.register("prixAchat"),
            placeholder: "120"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Valeur estimée (€)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 0,
            step: "0.01",
            ...form.register("valeurEstimee"),
            placeholder: "350"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Notes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          ...form.register("notes"),
          rows: 4,
          placeholder: "Histoire, observations, projets de mise en forme…"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Controller,
        {
          control: form.control,
          name: "dansCollection",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Dans la collection" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: field.value ? "Cet arbre fait partie de votre collection active." : "Cet arbre est sorti de la collection (vendu, donné, perdu…)." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: field.value, onCheckedChange: field.onChange })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => navigate({ to: "/collection" }), children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: form.formState.isSubmitting, children: initial ? "Enregistrer" : "Ajouter à la collection" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddPhotoDialog,
      {
        open: dialogOpen,
        onOpenChange: setDialogOpen,
        source: dialogSource,
        file,
        onConfirm: handlePhotoConfirm
      }
    )
  ] });
}
function Field({
  label,
  error,
  action,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "block text-sm", children: label }),
      action
    ] }),
    children,
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: error })
  ] });
}
const Route$5 = createFileRoute("/bonsai/nouveau")({
  head: () => ({
    meta: [
      { title: "Nouveau bonsaï — Bonsaï Studio" },
      {
        name: "description",
        content: "Ajoutez un nouveau bonsaï à votre carnet de collection : espèce, style, étape, dimensions et première photo."
      },
      { property: "og:title", content: "Nouveau bonsaï — Bonsaï Studio" },
      {
        property: "og:description",
        content: "Ajoutez un nouvel arbre à votre carnet de collection."
      },
      { property: "og:url", content: "/bonsai/nouveau" },
      { name: "robots", content: "noindex,follow" }
    ]
  }),
  component: NewBonsaiPage
});
function NewBonsaiPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/collection",
        className: "mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Retour à la collection"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-semibold", children: "Nouveau bonsaï" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 mb-8 text-sm text-muted-foreground", children: "Ajoutez les informations essentielles. Vous pourrez compléter la galerie et les rappels ensuite." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BonsaiForm, {})
  ] });
}
const DropdownMenu = Root2$3;
const DropdownMenuTrigger = Trigger$2;
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
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2$1, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2$2,
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
DropdownMenuContent.displayName = Content2$2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2$1,
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
DropdownMenuItem.displayName = Item2$1.displayName;
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
async function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}
async function getResizedImageBytes(blob, maxWidth = 800, quality = 0.7) {
  const dataUrl = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
  const img = await loadImage(dataUrl);
  const scale = Math.min(1, maxWidth / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { bytes: new Uint8Array(await blob.arrayBuffer()), width: img.width, height: img.height };
  ctx.drawImage(img, 0, 0, w, h);
  const resizedBlob = await new Promise((resolve) => canvas.toBlob((r) => resolve(r), "image/jpeg", quality));
  return { bytes: new Uint8Array(await resizedBlob.arrayBuffer()), width: w, height: h };
}
async function generateBonsaiPdf(bonsaiId, options = {}) {
  const photosOpt = options.photos ?? "principale";
  const onProgress = options.onProgress;
  onProgress?.({ phase: "loading", current: 0, total: 1 });
  const b = await getBonsai$1(bonsaiId);
  if (!b) throw new Error("Bonsaï introuvable");
  const [poterie, journal, rappels, allPhotos] = await Promise.all([
    b.poterieId ? getPoterie(b.poterieId) : Promise.resolve(void 0),
    listJournal$1(bonsaiId),
    listRappels$2(bonsaiId),
    photosOpt === "toutes" ? listPhotos$1(bonsaiId) : Promise.resolve([])
  ]);
  const totalSteps = 1 + (photosOpt === "toutes" ? allPhotos.length : 0);
  let currentStep = 0;
  const doc = new jspdf_node_minExports.jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;
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
  if (b.photoPrincipale) {
    try {
      const blob = await getPhotoBlob({ storagePath: b.photoPrincipale });
      const { bytes, width, height } = await getResizedImageBytes(blob, 800, 0.7);
      const ratio = Math.min(70 / width, 70 / height);
      doc.addImage(bytes, "JPEG", margin, y, width * ratio, height * ratio, void 0, "FAST");
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
  const age = ageActuel(b);
  if (age != null) infos.push(["Âge estimé", `${age} ans`]);
  if (b.hauteurCm != null) infos.push(["Hauteur", `${b.hauteurCm} cm`]);
  if (b.dateAcquisition) infos.push(["Acquis le", format(parseISO(b.dateAcquisition), "d MMM yyyy", { locale: fr })]);
  if (b.origine) infos.push(["Origine", b.origine]);
  if (poterie) infos.push(["Poterie", poterie.nom]);
  infos.push(["Statut", b.dansCollection ?? true ? "Dans la collection" : "Sorti de la collection"]);
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
      doc.text(`• ${format(parseISO(r.prochaineDate), "d MMM yyyy", { locale: fr })} — ${soinLabel(r.type)}`, margin, y);
      y += 5;
    }
  }
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Bonsaï Studio — carnet de collection", W / 2, 290, { align: "center" });
  if (photosOpt === "toutes" && allPhotos.length > 0) {
    const sorted = [...allPhotos].sort((a, b2) => b2.date.localeCompare(a.date));
    const totalPages = Math.ceil(sorted.length / 4);
    for (let i = 0; i < sorted.length; i += 4) {
      const pageNum = Math.floor(i / 4) + 1;
      doc.addPage();
      doc.setFillColor(135, 168, 120);
      doc.rect(0, 0, W, 22, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(`Galerie — ${b.nom}`, margin, 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`${pageNum} / ${totalPages}`, W - margin, 14, { align: "right" });
      doc.setTextColor(40, 40, 40);
      const slice = sorted.slice(i, i + 4);
      for (let k = 0; k < slice.length; k++) {
        const p = slice[k];
        currentStep++;
        onProgress?.({ phase: "photos", current: currentStep, total: totalSteps });
        try {
          const blob = await getPhotoBlob(p);
          const { bytes, width, height } = await getResizedImageBytes(blob, 800, 0.7);
          const cellW = 86, cellH = 86;
          const xPos = margin + k % 2 * 92;
          const yPos = 30 + Math.floor(k / 2) * 110;
          const ratio = Math.min(cellW / width, cellH / height);
          doc.addImage(bytes, "JPEG", xPos + (cellW - width * ratio) / 2, yPos + (cellH - height * ratio) / 2, width * ratio, height * ratio, void 0, "FAST");
          doc.setFontSize(9);
          doc.setTextColor(110, 110, 110);
          const caption = `${format(parseISO(p.date), "d MMM yyyy", { locale: fr })}${p.legende ? " — " + p.legende : ""}`;
          doc.text(doc.splitTextToSize(caption, cellW), xPos, yPos + 92);
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
  a.style.display = "none";
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 1e3);
  return "downloaded";
}
function SharePdfButton({
  id,
  bonsai,
  photosCount
}) {
  const [busy, setBusy] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(null);
  const run = async (photos) => {
    setBusy(true);
    setProgress({ phase: "loading", current: 0, total: 1 });
    try {
      const r = await shareBonsaiPdf(id, bonsai.nom, {
        photos,
        onProgress: setProgress
      });
      toast.success(r === "shared" ? "Fiche partagée" : "Fiche téléchargée");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };
  const progressLabel = progress?.phase === "loading" ? "Chargement…" : progress?.phase === "generating" ? "Génération…" : progress?.phase === "photos" ? `Photo ${progress.current}/${progress.total}` : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-2 w-full", disabled: busy, children: [
      busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { className: "mr-1.5 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "mr-1.5 h-4 w-4" }),
      busy && progressLabel ? progressLabel : busy ? "Génération…" : "Partager la fiche"
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
        ageActuel(b) != null && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Âge", value: `${ageActuel(b)} ans` }),
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
const UnifiedTimeline = reactExports.lazy(() => import("./unified-timeline-66FCKZzB.mjs"));
const RappelsTab = reactExports.lazy(() => import("./rappels-tab-BbsZtz3A.mjs"));
const Route$4 = createFileRoute("/bonsai/$id")({
  ssr: false,
  loader: async ({ params, context }) => {
    const b = await context.queryClient.ensureQueryData({
      queryKey: ["bonsai", params.id],
      queryFn: () => getBonsai$1(params.id)
    });
    return b ? { nom: b.nom, espece: b.espece } : null;
  },
  head: ({ loaderData, params }) => {
    const nom = loaderData?.nom ?? "Bonsaï";
    const espece = loaderData?.espece;
    const baseDesc = `${nom}${espece ? ` (${espece})` : ""} — galerie évolutive, journal d'entretien et rappels de soins.`;
    const desc = baseDesc.length > 160 ? baseDesc.slice(0, 157) + "…" : baseDesc;
    const title = `${nom} — Bonsaï Studio`;
    return {
      meta: [
        { title: title.length > 60 ? `${nom.slice(0, 50)} — Bonsaï` : title },
        { name: "description", content: desc },
        { name: "robots", content: "noindex,follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/bonsai/${params.id}` },
        { property: "og:type", content: "article" }
      ]
    };
  },
  component: BonsaiDetail
});
function TabFallback() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-4 text-sm text-muted-foreground", children: "Chargement…" });
}
function BonsaiDetail() {
  const { id } = Route$4.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [editing, setEditing] = reactExports.useState(false);
  const { confirm, dialog: confirmDialog } = useConfirm();
  const { data: b, isPending } = useQuery({
    queryKey: ["bonsai", id],
    queryFn: () => getBonsai$1(id)
  });
  const { data: photos = [] } = useQuery({
    queryKey: ["photos", id],
    queryFn: () => listPhotos$1(id)
  });
  const { data: entries = [] } = useQuery({
    queryKey: ["journal", id],
    queryFn: () => listJournal$1(id)
  });
  const { data: rappels = [] } = useQuery({
    queryKey: ["rappels", id],
    queryFn: () => listRappels$2(id)
  });
  const { data: poterie } = useQuery({
    queryKey: ["poterie", b?.poterieId],
    queryFn: () => b?.poterieId ? getPoterie(b.poterieId) : null,
    enabled: !!b?.poterieId
  });
  if (isPending)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Chargement…" }) });
  if (!b)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Bonsaï introuvable." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collection", className: "text-accent", children: "Retour à la collection" })
    ] });
  const remove = async () => {
    const confirmed = await confirm({
      title: "Supprimer ce bonsaï ?",
      description: `« ${b.nom} » et toutes ses données (photos, journal, rappels) seront supprimés définitivement.`,
      destructive: true,
      confirmLabel: "Supprimer"
    });
    if (!confirmed) return;
    await deleteBonsai(id);
    await qc.invalidateQueries();
    toast.success("Bonsaï supprimé");
    navigate({ to: "/collection" });
  };
  const toggleFavori = async () => {
    await saveBonsai({ ...b, favori: !b.favori });
    await qc.invalidateQueries();
    toast.success(b.favori ? "Retiré des favoris" : "Ajouté aux favoris");
  };
  const setMainPhoto = async (pid) => {
    const photo = photos.find((p) => p.id === pid);
    if (!photo) return;
    await saveBonsai({ ...b, photoPrincipale: photo.storagePath });
    qc.invalidateQueries({ queryKey: ["bonsai", id] });
  };
  const updateBonsai = async (updated) => {
    await saveBonsai(updated);
    qc.invalidateQueries({ queryKey: ["bonsai", id] });
  };
  if (editing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setEditing(false),
          className: "mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            " Annuler la modification"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl font-semibold", children: [
        "Modifier « ",
        b.nom,
        " »"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        BonsaiForm,
        {
          initial: b,
          onSaved: () => {
            setEditing(false);
            qc.invalidateQueries();
          }
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/collection",
        className: "mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Collection"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 lg:grid-cols-[380px_1fr]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      BonsaiHeader,
      {
        bonsai: b,
        poterie,
        photosCount: photos.length,
        onEdit: () => setEditing(true),
        onDelete: remove,
        onToggleFavori: toggleFavori,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "timeline", className: "mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-secondary/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "timeline", children: [
              "Timeline (",
              photos.length + entries.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "rappels", children: [
              "Rappels (",
              rappels.filter((r) => r.actif).length,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "timeline", className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(TabFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            UnifiedTimeline,
            {
              bonsaiId: id,
              bonsai: b,
              photos,
              entries,
              mainId: b.photoPrincipale,
              onSetMain: setMainPhoto,
              onUpdateBonsai: updateBonsai
            }
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "rappels", className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(TabFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(RappelsTab, { bonsaiId: id, rappels }) }) })
        ] })
      }
    ) }),
    confirmDialog
  ] });
}
const Route$3 = createFileRoute("/.well-known/oauth-protected-resource")({
  server: {
    handlers: {
      ANY: createTanStackOAuthProtectedResourceMetadataHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource", trustForwardedHost: true })
    }
  }
});
const Route$2 = createFileRoute("/.mcp/list-tools")({
  server: {
    handlers: {
      // ANY: TanStack returns SPA HTML for methods not in `handlers`; the SDK 405s instead.
      ANY: createTanStackListToolsHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource", trustForwardedHost: true })
    }
  }
});
const Route$1 = createFileRoute("/.mcp/invoke-tool/$tool")({
  server: {
    handlers: {
      // ANY: TanStack returns SPA HTML for methods not in `handlers`; the SDK 405s instead.
      ANY: createTanStackInvokeToolHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource", trustForwardedHost: true })
    }
  }
});
const authOAuth = () => supabase.auth.oauth;
const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : ""
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("authorization_id manquant");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({ to: "/connexion", search: { redirect: next } });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id");
    const { data, error } = await authOAuth().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex min-h-screen items-center justify-center p-6 text-sm text-muted-foreground", children: [
    "Impossible de charger la demande d'autorisation : ",
    String(error?.message ?? error)
  ] })
});
function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const clientName = details?.client?.name ?? "cette application";
  async function decide(approve) {
    setBusy(true);
    setError(null);
    const { data, error: error2 } = approve ? await authOAuth().approveAuthorization(authorization_id) : await authOAuth().denyAuthorization(authorization_id);
    if (error2) {
      setBusy(false);
      setError(error2.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("Le serveur d'autorisation n'a pas renvoyé d'URL de redirection.");
      return;
    }
    window.location.href = target;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex min-h-screen items-center justify-center bg-background px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-3xl border border-border bg-card p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-6 w-6", strokeWidth: 2.25 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-semibold tracking-tight", children: [
        "Connecter ",
        clientName
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
        clientName,
        " pourra lire vos bonsaïs, vos poteries et vos rappels, et écrire dans votre journal d'entretien, en votre nom."
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "mb-4 text-sm text-destructive", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: busy, onClick: () => decide(true), className: "w-full", children: "Autoriser" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          disabled: busy,
          variant: "outline",
          onClick: () => decide(false),
          className: "w-full",
          children: "Refuser"
        }
      )
    ] })
  ] }) });
}
const StatistiquesRoute = Route$h.update({
  id: "/statistiques",
  path: "/statistiques",
  getParentRoute: () => Route$i
});
const SitemapDotxmlRoute = Route$g.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$i
});
const PoteriesRoute = Route$f.update({
  id: "/poteries",
  path: "/poteries",
  getParentRoute: () => Route$i
});
const ParametresRoute = Route$e.update({
  id: "/parametres",
  path: "/parametres",
  getParentRoute: () => Route$i
});
const McpRoute = Route$d.update({
  id: "/mcp",
  path: "/mcp",
  getParentRoute: () => Route$i
});
const JournalRoute = Route$c.update({
  id: "/journal",
  path: "/journal",
  getParentRoute: () => Route$i
});
const InscriptionRoute = Route$b.update({
  id: "/inscription",
  path: "/inscription",
  getParentRoute: () => Route$i
});
const ConnexionRoute = Route$a.update({
  id: "/connexion",
  path: "/connexion",
  getParentRoute: () => Route$i
});
const CollectionRoute = Route$9.update({
  id: "/collection",
  path: "/collection",
  getParentRoute: () => Route$i
});
const CalendrierRoute = Route$8.update({
  id: "/calendrier",
  path: "/calendrier",
  getParentRoute: () => Route$i
});
const IndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$i
});
const PoterieIdRoute = Route$6.update({
  id: "/poterie/$id",
  path: "/poterie/$id",
  getParentRoute: () => Route$i
});
const BonsaiNouveauRoute = Route$5.update({
  id: "/bonsai/nouveau",
  path: "/bonsai/nouveau",
  getParentRoute: () => Route$i
});
const BonsaiIdRoute = Route$4.update({
  id: "/bonsai/$id",
  path: "/bonsai/$id",
  getParentRoute: () => Route$i
});
const Char91DotwellKnownChar93OauthProtectedResourceRoute = Route$3.update({
  id: "/.well-known/oauth-protected-resource",
  path: "/.well-known/oauth-protected-resource",
  getParentRoute: () => Route$i
});
const Char91DotmcpChar93ListToolsRoute = Route$2.update({
  id: "/.mcp/list-tools",
  path: "/.mcp/list-tools",
  getParentRoute: () => Route$i
});
const Char91DotmcpChar93InvokeToolToolRoute = Route$1.update({
  id: "/.mcp/invoke-tool/$tool",
  path: "/.mcp/invoke-tool/$tool",
  getParentRoute: () => Route$i
});
const DotlovableOauthConsentRoute = Route.update({
  id: "/.lovable/oauth/consent",
  path: "/.lovable/oauth/consent",
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
  AddPhotoDialog as A,
  Button as B,
  Dialog as D,
  Input as I,
  Label as L,
  SOINS_SELECTABLE as S,
  Textarea as T,
  useConfirm as a,
  updatePhotoDate as b,
  updatePhotoLegende as c,
  deletePhoto as d,
  uid as e,
  useBlobUrl as f,
  getCachedPhotoBlob as g,
  savePhoto as h,
  invalidateCachedPhoto as i,
  DialogContent as j,
  DialogHeader as k,
  DialogTitle as l,
  DialogFooter as m,
  deleteJournal as n,
  saveJournal as o,
  soinEmoji as p,
  soinLabel as q,
  SOINS as r,
  savePoterieGalleryPhoto as s,
  saveRappel as t,
  useFileInput as u,
  deleteRappel as v,
  photoCache as w,
  router as x
};
