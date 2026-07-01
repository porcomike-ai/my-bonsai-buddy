import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { R as Route$2, g as getPoteriePhoto, e as useBlobUrl, P as PoterieForm, B as Button, v as deletePoterie, t as getPoterie, l as listBonsais } from "./router-B0pA28kv.mjs";
import { A as AppShell } from "./app-shell-BBLqqXTs.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { w as ArrowLeft, e as Container, x as Pencil, y as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/date-fns.mjs";
function PoterieDetail() {
  const {
    id
  } = Route$2.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [editing, setEditing] = reactExports.useState(false);
  const {
    data: p,
    isPending
  } = useQuery({
    queryKey: ["poterie", id],
    queryFn: () => getPoterie(id)
  });
  const {
    data: bonsais = []
  } = useQuery({
    queryKey: ["bonsais"],
    queryFn: listBonsais
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
  if (isPending) return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Chargement…" }) });
  if (!p) return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Poterie introuvable." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/poteries", className: "text-accent", children: "Retour" })
  ] });
  const planted = bonsais.find((b) => b.poterieId === p.id);
  const remove = async () => {
    if (!confirm(`Supprimer « ${p.nom} » ?`)) return;
    await deletePoterie(id);
    await qc.invalidateQueries();
    toast.success("Poterie supprimée");
    navigate({
      to: "/poteries"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/poteries", className: "mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Poteries"
    ] }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx(PoterieForm, { initial: p, onClose: () => {
      setEditing(false);
      qc.invalidateQueries();
    } }),
    !editing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[420px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary to-peach/30", children: url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "h-12 w-12 text-muted-foreground" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-accent", children: "Poterie" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-5xl font-semibold", children: p.nom }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3", children: [
          p.forme && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Forme", value: p.forme }),
          p.matiere && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Matière", value: p.matiere }),
          p.couleur && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Couleur", value: p.couleur }),
          (p.longueurCm || p.largeurCm || p.hauteurCm) && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Dimensions", value: `${p.longueurCm ?? "?"} × ${p.largeurCm ?? "?"} × ${p.hauteurCm ?? "?"} cm` }),
          p.artisan && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Artisan", value: p.artisan }),
          p.origine && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Origine", value: p.origine }),
          p.prix != null && /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Prix", value: `${p.prix} €` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "État", value: planted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bonsai/$id", params: {
            id: planted.id
          }, className: "text-accent hover:underline", children: [
            "Plantée · ",
            planted.nom
          ] }) : "Libre" })
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: remove, className: "text-destructive hover:text-destructive", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-1.5 h-4 w-4" }),
            " Supprimer"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5 font-display text-lg font-medium", children: value })
  ] });
}
export {
  PoterieDetail as component
};
