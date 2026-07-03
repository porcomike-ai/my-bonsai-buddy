import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button, L as Label, I as Input, T as Textarea, j as saveJournal, u as uid, N as deleteJournal } from "./router-Co_Ro_jt.mjs";
import { a as SOINS, b as soinEmoji, c as soinLabel } from "./bonsai-meta-BJOj-HVV.mjs";
import { P as Plus, X } from "../_libs/lucide-react.mjs";
import { f as format, a as fr, p as parseISO } from "../_libs/date-fns.mjs";
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
function JournalTab({
  bonsaiId,
  entries
}) {
  const qc = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [type, setType] = reactExports.useState("arrosage");
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [notes, setNotes] = reactExports.useState("");
  const add = async () => {
    await saveJournal({
      id: uid(),
      bonsaiId,
      type,
      date: new Date(date).toISOString(),
      notes: notes || void 0
    });
    qc.invalidateQueries();
    setOpen(false);
    setNotes("");
    toast.success("Entrée ajoutée");
  };
  const remove = async (eid) => {
    await deleteJournal(eid);
    qc.invalidateQueries();
  };
  const edit = (e) => {
    setEditingId(e.id);
    setType(e.type);
    setDate(e.date.slice(0, 10));
    setNotes(e.notes || "");
    setOpen(true);
  };
  const update = async () => {
    if (!editingId) return;
    await saveJournal({
      id: editingId,
      bonsaiId,
      type,
      date: new Date(date).toISOString(),
      notes: notes || void 0
    });
    qc.invalidateQueries();
    setOpen(false);
    setEditingId(null);
    setNotes("");
    toast.success("Entrée mise à jour");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    !open ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setOpen(true), className: "mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
      " Nouvelle entrée"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 space-y-3 rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Type de soin" }),
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Notes (facultatif)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            rows: 3,
            placeholder: "Observations, dosage, météo…"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => {
              setOpen(false);
              setEditingId(null);
              setNotes("");
            },
            children: "Annuler"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: editingId ? update : add, children: editingId ? "Mettre à jour" : "Enregistrer" })
      ] })
    ] }),
    entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucun entretien consigné. Notez votre prochain arrosage, taille ou rempotage." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: entries.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-3 transition hover:bg-secondary/40",
        onClick: () => edit(e),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-base", children: soinEmoji(e.type) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: soinLabel(e.type) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: format(parseISO(e.date), "d MMM yyyy", { locale: fr }) })
            ] }),
            e.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 whitespace-pre-wrap text-sm text-muted-foreground", children: e.notes })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
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
    )) })
  ] });
}
export {
  JournalTab,
  JournalTab as default
};
