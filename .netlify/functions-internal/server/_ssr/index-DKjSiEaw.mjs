import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as listBonsais$1, c as listRappels$1, e as listJournal, a as listPoteries$1 } from "./router-lnbQiR3D.mjs";
import { A as AppShell } from "./app-shell-BQ949hrh.mjs";
import { B as BonsaiPhoto } from "./bonsai-photo-s0NccPR4.mjs";
import { b as soinEmoji, c as soinLabel, s as styleLabel } from "./bonsai-meta-6FZGZ_0u.mjs";
import "../_libs/sonner.mjs";
import "../_libs/lovable.dev__mcp-js.mjs";
import "../_libs/modelcontextprotocol__sdk.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/ajv-formats.mjs";
import { l as addDays, m as isBefore, p as parseISO, n as isAfter, f as format, a as fr } from "../_libs/date-fns.mjs";
import { P as Plus, g as Sprout, h as Container, B as Bell, o as BookOpen, v as CalendarDays, A as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/zod.mjs";
import "../_libs/jose.mjs";
import "../_libs/ajv.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/json-schema-traverse.mjs";
import "../_libs/fast-uri.mjs";
import "./photo-cache-DhR44897.mjs";
function Dashboard() {
  const bonsais = useQuery({
    queryKey: ["bonsais"],
    queryFn: listBonsais$1
  });
  const rappels = useQuery({
    queryKey: ["rappels"],
    queryFn: () => listRappels$1()
  });
  const journal = useQuery({
    queryKey: ["journal"],
    queryFn: () => listJournal()
  });
  const poteries = useQuery({
    queryKey: ["poteries"],
    queryFn: listPoteries$1
  });
  const now = /* @__PURE__ */ new Date();
  const in7 = addDays(now, 7);
  const aVenir = (rappels.data ?? []).filter((r) => r.actif && isBefore(parseISO(r.prochaineDate), in7)).slice(0, 6);
  const enRetard = (rappels.data ?? []).filter((r) => r.actif && isAfter(now, parseISO(r.prochaineDate)));
  const dernierAjouts = (bonsais.data ?? []).slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);
  const empty = (bonsais.data?.length ?? 0) === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-forest via-forest to-sage/80 p-8 text-primary-foreground md:flex-row md:items-end md:justify-between md:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.22em] text-primary-foreground/70", children: [
          "Carnet · ",
          format(now, "EEEE d MMMM", {
            locale: fr
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-semibold leading-tight md:text-5xl", children: "Bonjour. Vos arbres vous attendent." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-md text-sm text-primary-foreground/80 md:text-base", children: "Un espace calme pour observer, soigner et faire grandir votre collection au fil des saisons." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bonsai/nouveau", className: "inline-flex items-center gap-2 self-start rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-forest/30 transition hover:brightness-105 md:self-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Ajouter un bonsaï"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10 grid grid-cols-2 gap-4 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "h-4 w-4" }), label: "Bonsaïs", value: bonsais.data?.length ?? 0, to: "/collection" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "h-4 w-4" }), label: "Poteries", value: poteries.data?.length ?? 0, to: "/poteries" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }), label: "Rappels actifs", value: (rappels.data ?? []).filter((r) => r.actif).length, to: "/calendrier", highlight: enRetard.length > 0 ? `${enRetard.length} en retard` : void 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }), label: "Entrées journal", value: journal.data?.length ?? 0, to: "/journal" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Soins à venir", subtitle: "7 prochains jours", link: {
          to: "/calendrier",
          label: "Voir le calendrier"
        } }),
        aVenir.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyBox, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-5 w-5" }), children: "Aucun soin programmé pour cette semaine. Ajoutez un rappel depuis une fiche bonsaï." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: aVenir.map((r) => {
          const b = bonsais.data?.find((x) => x.id === r.bonsaiId);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bonsai/$id", params: {
            id: r.bonsaiId
          }, className: "flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-3 transition hover:border-accent/50 hover:shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-lg", children: soinEmoji(r.type) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
                soinLabel(r.type),
                " — ",
                b?.nom ?? "—"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                format(parseISO(r.prochaineDate), "EEEE d MMMM", {
                  locale: fr
                }),
                r.intervalleJours ? ` · tous les ${r.intervalleJours} j` : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground" })
          ] }) }, r.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Derniers ajouts", link: {
          to: "/collection",
          label: "Collection"
        } }),
        empty ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyBox, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "h-5 w-5" }), children: "Votre collection est vide. Commencez en ajoutant votre premier bonsaï." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-2 gap-3", children: dernierAjouts.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bonsai/$id", params: {
          id: b.id
        }, className: "group block overflow-hidden rounded-2xl border border-border bg-card transition hover:border-accent/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square w-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BonsaiPhoto, { photoId: b.photoPrincipale, className: "h-full w-full object-cover transition group-hover:scale-105" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-display text-sm font-semibold", children: b.nom }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[11px] uppercase tracking-wider text-muted-foreground", children: styleLabel(b.style).split(" — ")[0] })
          ] })
        ] }) }, b.id)) })
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "group rounded-2xl border border-border bg-card p-5 transition hover:border-accent/50 hover:shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-foreground", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 opacity-0 transition group-hover:opacity-100" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-3xl font-semibold text-foreground", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 inline-flex rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-medium text-destructive", children: highlight })
  ] });
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
function EmptyBox({
  icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 px-5 py-6 text-sm text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children })
  ] });
}
export {
  Dashboard as component
};
