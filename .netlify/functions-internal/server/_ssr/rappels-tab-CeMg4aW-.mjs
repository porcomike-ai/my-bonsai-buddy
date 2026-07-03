import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button, L as Label, I as Input, k as saveRappel, u as uid, j as saveJournal, O as deleteRappel } from "./router-Co_Ro_jt.mjs";
import { a as SOINS, b as soinEmoji, c as soinLabel } from "./bonsai-meta-BJOj-HVV.mjs";
import { P as Plus, b as Calendar, q as Check, X } from "../_libs/lucide-react.mjs";
import { f as format, a as fr, p as parseISO, l as addDays } from "../_libs/date-fns.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
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
function RappelsTab({
  bonsaiId,
  rappels
}) {
  const qc = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const [type, setType] = reactExports.useState("arrosage");
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [intervalle, setIntervalle] = reactExports.useState("");
  const add = async () => {
    await saveRappel({
      id: uid(),
      bonsaiId,
      type,
      prochaineDate: new Date(date).toISOString(),
      intervalleJours: intervalle ? Number(intervalle) : void 0,
      actif: true
    });
    qc.invalidateQueries();
    setOpen(false);
    setIntervalle("");
    toast.success("Rappel créé");
  };
  const markDone = async (r) => {
    await saveJournal({
      id: uid(),
      bonsaiId,
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
    toast.success("Soin effectué");
  };
  const remove = async (rid) => {
    await deleteRappel(rid);
    qc.invalidateQueries();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    !open ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setOpen(true), className: "mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
      " Nouveau rappel"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 space-y-3 rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: type,
              onChange: (e) => setType(e.target.value),
              className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
              children: SOINS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: s.value, children: [
                s.emoji,
                " ",
                s.label
              ] }, s.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Prochaine date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Répéter tous les (jours)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 0,
              placeholder: "ex. 2",
              value: intervalle,
              onChange: (e) => setIntervalle(e.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: add, children: "Créer le rappel" })
      ] })
    ] }),
    rappels.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucun rappel. Programmez par exemple un arrosage tous les 2 jours." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: rappels.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: `flex items-center gap-3 rounded-xl border bg-card p-3 ${r.actif ? "border-border" : "border-border/40 opacity-60"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-base", children: soinEmoji(r.type) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: soinLabel(r.type) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mr-1 inline h-3 w-3" }),
              format(parseISO(r.prochaineDate), "EEEE d MMMM yyyy", { locale: fr }),
              r.intervalleJours ? ` · tous les ${r.intervalleJours} j` : ""
            ] })
          ] }),
          r.actif && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => markDone(r), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1 h-4 w-4" }),
            " Fait"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => remove(r.id),
              className: "text-muted-foreground hover:text-destructive",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ]
      },
      r.id
    )) })
  ] });
}
export {
  RappelsTab,
  RappelsTab as default
};
