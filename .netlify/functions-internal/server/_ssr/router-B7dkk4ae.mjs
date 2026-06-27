import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-CWZp_xfH.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { I as ImagePlus } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
const appCss = "/assets/styles-B_U4luHo.css";
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
const Route$d = createRootRouteWithContext()({
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
  const { queryClient } = Route$d.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SupabaseAuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthGate, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) }) });
}
function AuthGate({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  reactExports.useEffect(() => {
    const isAuthRoute = pathname === "/connexion" || pathname === "/inscription";
    if (!loading && !user && !isAuthRoute) {
      navigate({ to: "/connexion" });
    }
  }, [user, loading, pathname, navigate]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Chargement…" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
const $$splitComponentImporter$b = () => import("./statistiques-C7W_GKB0.mjs");
const Route$c = createFileRoute("/statistiques")({
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
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const BASE_URL = "https://my-bonsai-buddy.lovable.app";
const Route$b = createFileRoute("/sitemap.xml")({
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
const db = supabase;
function uid() {
  return crypto.randomUUID();
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
function rowToPhoto(r) {
  return {
    id: r.id,
    bonsaiId: r.bonsai_id,
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
  const { data, error } = await db.storage.from(BONSAI_BUCKET).download(photo.storagePath);
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
async function uploadBonsaiPhoto(photoId, bonsaiId, blob) {
  const uidStr = await currentUserId();
  const path = bonsaiPhotoPath(uidStr, bonsaiId, photoId);
  const { error } = await db.storage.from(BONSAI_BUCKET).upload(path, blob, { upsert: true, contentType: blob.type || "image/jpeg" });
  if (error) throw error;
  return path;
}
async function uploadPoteriePhoto(poterieId, blob) {
  const uidStr = await currentUserId();
  const path = poteriePhotoPath(uidStr, poterieId);
  const { error } = await db.storage.from(POTERIE_BUCKET).upload(path, blob, { upsert: true, contentType: blob.type || "image/jpeg" });
  if (error) throw error;
  return path;
}
async function deleteStorageObject(bucket, path) {
  await db.storage.from(bucket).remove([path]);
}
async function listBonsais() {
  const { data, error } = await db.from("bonsais").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data.map(rowToBonsai);
}
async function getBonsai(id) {
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
async function listPhotos(bonsaiId) {
  const { data, error } = await db.from("photos").select("*").eq("bonsai_id", bonsaiId).order("date", { ascending: false });
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
  const uidStr = await currentUserId();
  const path = await uploadBonsaiPhoto(photo.id, photo.bonsaiId, photo.blob);
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
  if (photo.storagePath) await deleteStorageObject(BONSAI_BUCKET, photo.storagePath);
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
async function listJournal(bonsaiId) {
  let query = db.from("journal_entries").select("*");
  if (bonsaiId) query = query.eq("bonsai_id", bonsaiId);
  const { data, error } = await query.order("date", { ascending: false });
  if (error) throw error;
  return data.map(rowToJournal);
}
async function saveJournal(e) {
  const { error } = await db.from("journal_entries").upsert({
    id: e.id,
    bonsai_id: e.bonsaiId,
    type: e.type,
    date: e.date,
    notes: e.notes ?? null,
    rappel_id: e.rappelId ?? null
  });
  if (error) throw error;
}
async function deleteJournal(id) {
  const { error } = await db.from("journal_entries").delete().eq("id", id);
  if (error) throw error;
}
async function listRappels(bonsaiId) {
  let query = db.from("rappels").select("*");
  if (bonsaiId) query = query.eq("bonsai_id", bonsaiId);
  const { data, error } = await query.order("prochaine_date", { ascending: true });
  if (error) throw error;
  return data.map(rowToRappel);
}
async function saveRappel(r) {
  const { error } = await db.from("rappels").upsert({
    id: r.id,
    bonsai_id: r.bonsaiId,
    type: r.type,
    prochaine_date: r.prochaineDate,
    intervalle_jours: r.intervalleJours ?? null,
    notes: r.notes ?? null,
    actif: r.actif
  });
  if (error) throw error;
}
async function deleteRappel(id) {
  const { error } = await db.from("rappels").delete().eq("id", id);
  if (error) throw error;
}
async function listPoteries() {
  const { data, error } = await db.from("poteries").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data.map(rowToPoterie);
}
async function getPoterie(id) {
  const { data, error } = await db.from("poteries").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? rowToPoterie(data) : void 0;
}
async function savePoterie(p) {
  let photoPath = p.photoPath;
  if (p.photoBlob) {
    photoPath = await uploadPoteriePhoto(p.id, p.photoBlob);
  }
  const row = poterieToRow({ ...p, photoPath });
  const { error } = await db.from("poteries").upsert(row);
  if (error) {
    if (p.photoBlob && photoPath) await deleteStorageObject(POTERIE_BUCKET, photoPath);
    throw error;
  }
}
async function deletePoterie(id) {
  const poterie = await getPoterie(id);
  if (poterie?.photoPath) await deleteStorageObject(POTERIE_BUCKET, poterie.photoPath);
  const { error } = await db.from("poteries").delete().eq("id", id);
  if (error) throw error;
}
async function listEvenements() {
  const { data, error } = await db.from("evenements").select("*").order("date_heure", { ascending: true });
  if (error) throw error;
  return data.map(rowToEvenement);
}
async function saveEvenement(e) {
  const { error } = await db.from("evenements").upsert({
    id: e.id,
    titre: e.titre,
    description: e.description ?? null,
    date_heure: e.dateHeure,
    rappel_minutes: e.rappelMinutes ?? null,
    notified_at: e.notifiedAt ?? null,
    bonsai_id: e.bonsaiId ?? null
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
    listBonsais(),
    listPoteries(),
    listJournal(),
    listRappels(),
    listEvenements()
  ]);
  const photosParBonsai = await Promise.all(bonsais.map((b) => listPhotos(b.id)));
  const allPhotos = photosParBonsai.flat();
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
const supabaseData = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  deleteBonsai,
  deleteEvenement,
  deleteJournal,
  deletePhoto,
  deletePoterie,
  deleteRappel,
  exportSupabaseBackup,
  getBonsai,
  getPhoto,
  getPhotoBlob,
  getPoterie,
  getPoteriePhoto,
  importSupabaseBackup,
  listBonsais,
  listEvenements,
  listJournal,
  listPhotos,
  listPoteries,
  listRappels,
  saveBonsai,
  saveEvenement,
  saveJournal,
  savePhoto,
  savePoterie,
  saveRappel,
  uid,
  updatePhotoDate,
  updatePhotoLegende
}, Symbol.toStringTag, { value: "Module" }));
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
const $$splitComponentImporter$a = () => import("./poteries-DLdMHYIS.mjs");
const Route$a = createFileRoute("/poteries")({
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
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
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
const $$splitComponentImporter$9 = () => import("./parametres-Cm9l7Mli.mjs");
const Route$9 = createFileRoute("/parametres")({
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
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./journal-BTZRIDd8.mjs");
const Route$8 = createFileRoute("/journal")({
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
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./inscription-C8WkI_VV.mjs");
const Route$7 = createFileRoute("/inscription")({
  head: () => ({
    meta: [{
      title: "Inscription — Bonsaï Studio"
    }, {
      name: "description",
      content: "Créez votre compte Bonsaï Studio pour sauvegarder et synchroniser votre carnet de bonsaïs sur tous vos appareils."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./connexion-CXpXklDA.mjs");
const Route$6 = createFileRoute("/connexion")({
  head: () => ({
    meta: [{
      title: "Connexion — Bonsaï Studio"
    }, {
      name: "description",
      content: "Connectez-vous à votre carnet de bonsaïs pour synchroniser vos arbres sur tous vos appareils."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./collection-BBCXDc3C.mjs");
const Route$5 = createFileRoute("/collection")({
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
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./calendrier-Cehgvzpo.mjs");
const Route$4 = createFileRoute("/calendrier")({
  head: () => ({
    meta: [{
      title: "Calendrier des soins — Bonsaï Studio"
    }, {
      name: "description",
      content: "Calendrier mensuel des rappels d'entretien et évènements pour vos bonsaïs, avec notifications avant l'échéance."
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
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-CPd7FPBN.mjs");
const Route$3 = createFileRoute("/")({
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
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./poterie._id-BPj8A18G.mjs");
const Route$2 = createFileRoute("/poterie/$id")({
  ssr: false,
  loader: async ({
    params
  }) => {
    const p = await getPoterie(params.id);
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
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./bonsai.nouveau-CIGq8mGP.mjs");
const Route$1 = createFileRoute("/bonsai/nouveau")({
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
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./bonsai._id-BnGbfmT5.mjs");
const Route = createFileRoute("/bonsai/$id")({
  ssr: false,
  loader: async ({
    params
  }) => {
    const b = await getBonsai(params.id);
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
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const StatistiquesRoute = Route$c.update({
  id: "/statistiques",
  path: "/statistiques",
  getParentRoute: () => Route$d
});
const SitemapDotxmlRoute = Route$b.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$d
});
const PoteriesRoute = Route$a.update({
  id: "/poteries",
  path: "/poteries",
  getParentRoute: () => Route$d
});
const ParametresRoute = Route$9.update({
  id: "/parametres",
  path: "/parametres",
  getParentRoute: () => Route$d
});
const JournalRoute = Route$8.update({
  id: "/journal",
  path: "/journal",
  getParentRoute: () => Route$d
});
const InscriptionRoute = Route$7.update({
  id: "/inscription",
  path: "/inscription",
  getParentRoute: () => Route$d
});
const ConnexionRoute = Route$6.update({
  id: "/connexion",
  path: "/connexion",
  getParentRoute: () => Route$d
});
const CollectionRoute = Route$5.update({
  id: "/collection",
  path: "/collection",
  getParentRoute: () => Route$d
});
const CalendrierRoute = Route$4.update({
  id: "/calendrier",
  path: "/calendrier",
  getParentRoute: () => Route$d
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$d
});
const PoterieIdRoute = Route$2.update({
  id: "/poterie/$id",
  path: "/poterie/$id",
  getParentRoute: () => Route$d
});
const BonsaiNouveauRoute = Route$1.update({
  id: "/bonsai/nouveau",
  path: "/bonsai/nouveau",
  getParentRoute: () => Route$d
});
const BonsaiIdRoute = Route.update({
  id: "/bonsai/$id",
  path: "/bonsai/$id",
  getParentRoute: () => Route$d
});
const rootRouteChildren = {
  IndexRoute,
  CalendrierRoute,
  CollectionRoute,
  ConnexionRoute,
  InscriptionRoute,
  JournalRoute,
  ParametresRoute,
  PoteriesRoute,
  SitemapDotxmlRoute,
  StatistiquesRoute,
  BonsaiIdRoute,
  BonsaiNouveauRoute,
  PoterieIdRoute
};
const routeTree = Route$d._addFileChildren(rootRouteChildren)._addFileTypes();
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
  deleteBonsai as A,
  Button as B,
  updatePhotoDate as C,
  updatePhotoLegende as D,
  deletePhoto as E,
  deleteJournal as F,
  deleteRappel as G,
  supabaseData as H,
  Input as I,
  router as J,
  Label as L,
  PoterieForm as P,
  Route$2 as R,
  Textarea as T,
  listPoteries as a,
  listRappels as b,
  listPhotos as c,
  listJournal as d,
  useBlobUrl as e,
  fileToBlob as f,
  getPoteriePhoto as g,
  useAuth as h,
  saveBonsai as i,
  savePhoto as j,
  saveJournal as k,
  listBonsais as l,
  saveRappel as m,
  saveEvenement as n,
  exportSupabaseBackup as o,
  importSupabaseBackup as p,
  listEvenements as q,
  cn as r,
  savePoterie as s,
  deleteEvenement as t,
  uid as u,
  getPoterie as v,
  deletePoterie as w,
  getBonsai as x,
  getPhotoBlob as y,
  Route as z
};
