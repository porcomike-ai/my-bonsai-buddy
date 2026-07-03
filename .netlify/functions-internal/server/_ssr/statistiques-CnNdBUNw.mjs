import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as listBonsais, a as listPoteries, b as listRappels, c as listPhotos, d as listJournal } from "./router-DayW0770.mjs";
import { A as AppShell } from "./app-shell-BwtD_V5I.mjs";
import { E as ETAPES, S as STYLES, s as styleLabel, e as etapeLabel } from "./bonsai-meta-BJOj-HVV.mjs";
import "../_libs/sonner.mjs";
import { d as differenceInDays, p as parseISO } from "../_libs/date-fns.mjs";
import { c as ChartBar, d as Sprout, e as Container, a as Camera, b as Calendar, E as Euro, T as TrendingUp } from "../_libs/lucide-react.mjs";
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
async function loadAllPhotos() {
  const bonsais = await listBonsais();
  const photosByBonsai = await Promise.all(bonsais.map((b) => listPhotos(b.id)));
  return photosByBonsai.flat();
}
async function loadAllJournal() {
  return listJournal();
}
function StatistiquesPage() {
  const {
    data: bonsais = []
  } = useQuery({
    queryKey: ["bonsais"],
    queryFn: listBonsais
  });
  const {
    data: poteries = []
  } = useQuery({
    queryKey: ["poteries"],
    queryFn: listPoteries
  });
  const {
    data: photos = []
  } = useQuery({
    queryKey: ["photos-all"],
    queryFn: loadAllPhotos
  });
  const {
    data: journal = []
  } = useQuery({
    queryKey: ["journal-all"],
    queryFn: loadAllJournal
  });
  const {
    data: rappels = []
  } = useQuery({
    queryKey: ["rappels-all"],
    queryFn: () => listRappels()
  });
  const stats = reactExports.useMemo(() => {
    const actifs = bonsais.filter((b) => b.dansCollection ?? true);
    const sortis = bonsais.length - actifs.length;
    const totalPrix = actifs.reduce((s, b) => s + (b.prixAchat ?? 0), 0);
    const totalValeur = actifs.reduce((s, b) => s + (b.valeurEstimee ?? 0), 0);
    const plusValue = totalValeur - totalPrix;
    const ageMoyen = (() => {
      const withAge = actifs.filter((b) => b.ageEstime != null);
      if (!withAge.length) return null;
      return Math.round(withAge.reduce((s, b) => s + (b.ageEstime ?? 0), 0) / withAge.length);
    })();
    const plusVieux = actifs.filter((b) => b.ageEstime != null).sort((a, b) => (b.ageEstime ?? 0) - (a.ageEstime ?? 0))[0];
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collection", className: "mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground", children: "Aller à la collection" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "h-4 w-4" }), label: "Bonsaïs actifs", value: stats.actifs, hint: stats.sortis ? `+${stats.sortis} sortis` : void 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "h-4 w-4" }), label: "Poteries", value: stats.totalPoteries }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-4 w-4" }), label: "Photos", value: stats.totalPhotos }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }), label: "Rappels actifs", value: stats.rappelsActifs }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Euro, { className: "h-4 w-4" }), label: "Prix d'achat", value: `${stats.totalPrix.toLocaleString("fr-FR")} €` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }), label: "Valeur estimée", value: `${stats.totalValeur.toLocaleString("fr-FR")} €`, hint: stats.plusValue !== 0 ? `${stats.plusValue > 0 ? "+" : ""}${stats.plusValue.toLocaleString("fr-FR")} €` : void 0, hintPositive: stats.plusValue > 0, hintNegative: stats.plusValue < 0 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Répartition par étape", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: stats.parEtape.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { label: e.label, count: e.count, max: maxEtape }, e.value)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Répartition par style", children: stats.parStyle.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucun style renseigné." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: stats.parStyle.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { label: styleLabel(s.value).split(" — ")[0], count: s.count, max: maxStyle }, s.value)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Espèces les plus représentées", children: stats.topEspeces.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "—" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm", children: stats.topEspeces.map(([nom, n]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-3 border-b border-border/60 pb-1.5 last:border-none last:pb-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate italic", children: nom }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium", children: n })
        ] }, nom)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Activité & ancienneté", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Soins (30 derniers jours)", value: stats.journal30 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Entrées de journal au total", value: stats.totalJournal }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Âge moyen", value: stats.ageMoyen != null ? `${stats.ageMoyen} ans` : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Plus vieux bonsaï", value: stats.plusVieux ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bonsai/$id", params: {
            id: stats.plusVieux.id
          }, className: "text-accent hover:underline", children: [
            stats.plusVieux.nom,
            " (",
            stats.plusVieux.ageEstime,
            " ans)"
          ] }) : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Étape majoritaire", value: (() => {
            const top = [...stats.parEtape].sort((a, b) => b.count - a.count)[0];
            return top && top.count > 0 ? `${etapeLabel(top.value)} (${top.count})` : "—";
          })() })
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
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-0.5 text-xs ${hintPositive ? "text-emerald-600" : hintNegative ? "text-destructive" : "text-muted-foreground"}`, children: hint })
  ] });
}
function Card({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl border border-border bg-card p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children })
  ] });
}
function Bar({
  label,
  count,
  max
}) {
  const pct = max > 0 ? Math.round(count / max * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: count })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-accent transition-all", style: {
      width: `${pct}%`
    } }) })
  ] });
}
function Row({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-3 border-b border-border/60 pb-1.5 last:border-none last:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right font-medium", children: value })
  ] });
}
export {
  StatistiquesPage as component
};
