import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { d as listJournal, l as listBonsais } from "./router-5kye6AS8.mjs";
import { A as AppShell } from "./app-shell-D2hlU-O7.mjs";
import { a as SOINS, b as soinEmoji, c as soinLabel } from "./bonsai-meta-BJOj-HVV.mjs";
import "../_libs/sonner.mjs";
import { f as format, p as parseISO, a as fr } from "../_libs/date-fns.mjs";
import { B as BookOpen } from "../_libs/lucide-react.mjs";
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
function JournalPage() {
  const {
    data: entries = []
  } = useQuery({
    queryKey: ["journal"],
    queryFn: () => listJournal()
  });
  const {
    data: bonsais = []
  } = useQuery({
    queryKey: ["bonsais"],
    queryFn: listBonsais
  });
  const [bFilter, setBFilter] = reactExports.useState("");
  const [tFilter, setTFilter] = reactExports.useState("");
  const filtered = reactExports.useMemo(() => entries.filter((e) => {
    if (bFilter && e.bonsaiId !== bFilter) return false;
    if (tFilter && e.type !== tFilter) return false;
    return true;
  }), [entries, bFilter, tFilter]);
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: bFilter, onChange: (e) => setBFilter(e.target.value), "aria-label": "Filtrer par bonsaï", className: "h-11 rounded-full border border-input bg-card px-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Tous les bonsaïs" }),
        bonsais.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b.id, children: b.nom }, b.id))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: tFilter, onChange: (e) => setTFilter(e.target.value), "aria-label": "Filtrer par type de soin", className: "h-11 rounded-full border border-input bg-card px-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Tous les soins" }),
        SOINS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: s.value, children: [
          s.emoji,
          " ",
          s.label
        ] }, s.value))
      ] })
    ] }),
    grouped.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-dashed border-border bg-card/50 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-2xl font-semibold", children: "Journal vide" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Consignez vos soins depuis les fiches de vos bonsaïs." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: grouped.map(([month, items]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 font-display text-xl font-semibold capitalize text-muted-foreground", children: format(parseISO(`${month}-01`), "MMMM yyyy", {
        locale: fr
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: items.map((e) => {
        const b = bonsais.find((x) => x.id === e.bonsaiId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 rounded-xl border border-border bg-card p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-lg", children: soinEmoji(e.type) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: soinLabel(e.type) }),
                b && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bonsai/$id", params: {
                  id: b.id
                }, className: "ml-2 text-sm text-accent hover:underline", children: b.nom })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: format(parseISO(e.date), "EEE d MMM", {
                locale: fr
              }) })
            ] }),
            e.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 whitespace-pre-wrap text-sm text-muted-foreground", children: e.notes })
          ] })
        ] }, e.id);
      }) })
    ] }, month)) })
  ] });
}
export {
  JournalPage as component
};
