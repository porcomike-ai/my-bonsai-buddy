import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { B as Button, w as cn, L as Label, I as Input, T as Textarea, p as saveJournal, u as uid, q as saveRappel, r as saveEvenement, y as deleteEvenement, c as listRappels$1, l as listBonsais$1, x as listEvenements } from "./router-lnbQiR3D.mjs";
import { A as AppShell } from "./app-shell-BQ949hrh.mjs";
import { b as soinEmoji, c as soinLabel } from "./bonsai-meta-6FZGZ_0u.mjs";
import { u as useConfirm } from "./confirm-dialog-B2mq8kMp.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/lovable.dev__mcp-js.mjs";
import "../_libs/modelcontextprotocol__sdk.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/ajv-formats.mjs";
import { s as startOfWeek, b as startOfMonth, e as endOfWeek, c as endOfMonth, g as eachDayOfInterval, f as format, p as parseISO, h as subMonths, i as addMonths, j as isSameMonth, k as isSameDay, a as fr, l as addDays } from "../_libs/date-fns.mjs";
import { s as ChevronLeft, t as ChevronRight, b as Check, u as CalendarPlus, P as Plus, B as Bell, X } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-alert-dialog.mjs";
function CalendrierPage() {
  const qc = useQueryClient();
  const [month, setMonth] = reactExports.useState(() => /* @__PURE__ */ new Date());
  const {
    data: rappels = []
  } = useQuery({
    queryKey: ["rappels"],
    queryFn: () => listRappels$1()
  });
  const {
    data: bonsais = []
  } = useQuery({
    queryKey: ["bonsais"],
    queryFn: listBonsais$1
  });
  const {
    data: evenements = []
  } = useQuery({
    queryKey: ["evenements"],
    queryFn: listEvenements
  });
  const start = startOfWeek(startOfMonth(month), {
    weekStartsOn: 1
  });
  const end = endOfWeek(endOfMonth(month), {
    weekStartsOn: 1
  });
  const days = eachDayOfInterval({
    start,
    end
  });
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
      await saveRappel({
        ...r,
        actif: false
      });
    }
    qc.invalidateQueries();
    toast.success("Soin enregistré");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8 flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.22em] text-muted-foreground", children: "Soins & évènements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-4xl font-semibold capitalize", children: format(month, "MMMM yyyy", {
          locale: fr
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", "aria-label": "Mois précédent", onClick: () => setMonth(subMonths(month)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setMonth(/* @__PURE__ */ new Date()), children: "Aujourd'hui" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", "aria-label": "Mois suivant", onClick: () => setMonth(addMonths(month, 1)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
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
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("min-h-[110px] border-b border-r border-border p-2 text-left", !inMonth && "bg-secondary/20 text-muted-foreground"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium", today && "bg-accent text-accent-foreground"), children: format(d, "d") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1", children: [
            evs.slice(0, 2).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block truncate rounded-md bg-accent/15 px-1.5 py-0.5 text-[11px] text-accent", title: `${e.titre} — ${format(parseISO(e.dateHeure), "HH:mm")}`, children: [
              "📅 ",
              format(parseISO(e.dateHeure), "HH:mm"),
              " ",
              e.titre
            ] }) }, e.id)),
            items.slice(0, Math.max(0, 3 - evs.length)).map((r) => {
              const b = bonsais.find((x) => x.id === r.bonsaiId);
              return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bonsai/$id", params: {
                id: r.bonsaiId
              }, className: "block truncate rounded-md bg-sage/25 px-1.5 py-0.5 text-[11px] text-forest hover:bg-sage/40", title: `${soinLabel(r.type)} — ${b?.nom ?? ""}`, children: [
                soinEmoji(r.type),
                " ",
                b?.nom ?? "—"
              ] }) }, r.id);
            }),
            totalCount > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-[10px] text-muted-foreground", children: [
              "+ ",
              totalCount - 3
            ] })
          ] })
        ] }, k);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EvenementsSection, { evenements, bonsais }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-display text-2xl font-semibold", children: "Rappels de soins en cours" }),
      rappels.filter((r) => r.actif).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucun rappel actif. Ajoutez-en depuis la fiche d'un bonsaï." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: rappels.filter((r) => r.actif).map((r) => {
        const b = bonsais.find((x) => x.id === r.bonsaiId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 rounded-xl border border-border bg-card p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-base", children: soinEmoji(r.type) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
              soinLabel(r.type),
              " — ",
              b?.nom ?? "—"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              format(parseISO(r.prochaineDate), "EEEE d MMMM yyyy", {
                locale: fr
              }),
              r.intervalleJours ? ` · tous les ${r.intervalleJours} j` : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => markDone(r), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1 h-4 w-4" }),
            " Fait"
          ] })
        ] }, r.id);
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
  const {
    confirm,
    dialog: confirmDialog
  } = useConfirm();
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
    qc.invalidateQueries({
      queryKey: ["evenements"]
    });
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
    qc.invalidateQueries({
      queryKey: ["evenements"]
    });
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
    qc.invalidateQueries({
      queryKey: ["evenements"]
    });
  };
  const upcoming = evenements.filter((e) => new Date(e.dateHeure).getTime() > Date.now() - 24 * 36e5);
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "evt-titre", value: titre, onChange: (e) => setTitre(e.target.value), placeholder: "Atelier de taille, exposition…" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "evt-date", className: "mb-1.5 block text-sm", children: "Date et heure" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "evt-date", type: "datetime-local", value: dateHeure, onChange: (e) => setDateHeure(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "evt-rappel", className: "mb-1.5 block text-sm", children: "Rappel avant (minutes)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "evt-rappel", value: rappelMinutes, onChange: (e) => setRappelMinutes(e.target.value), className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "0", children: "À l'heure" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "10", children: "10 min avant" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30", children: "30 min avant" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "60", children: "1 h avant" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "180", children: "3 h avant" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1440", children: "1 jour avant" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2880", children: "2 jours avant" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "evt-bonsai", className: "mb-1.5 block text-sm", children: "Bonsaï associé (facultatif)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "evt-bonsai", value: bonsaiId, onChange: (e) => setBonsaiId(e.target.value), className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Aucun —" }),
            bonsais.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b.id, children: b.nom }, b.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "evt-desc", className: "mb-1.5 block text-sm", children: "Description (facultatif)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "evt-desc", value: description, onChange: (e) => setDescription(e.target.value), rows: 3 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
          setOpen(false);
          setEditingId(null);
          setTitre("");
          setDescription("");
        }, children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: editingId ? update : add, children: editingId ? "Mettre à jour" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
          " Ajouter"
        ] }) })
      ] })
    ] }),
    upcoming.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucun évènement programmé." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: upcoming.map((e) => {
      const b = e.bonsaiId ? bonsais.find((x) => x.id === e.bonsaiId) : void 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 rounded-xl border border-border bg-card p-3 cursor-pointer hover:bg-secondary/40 transition", onClick: () => edit(e), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: e.titre }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: format(parseISO(e.dateHeure), "EEE d MMM · HH:mm", {
              locale: fr
            }) })
          ] }),
          b && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bonsai/$id", params: {
            id: b.id
          }, className: "text-xs text-accent hover:underline", onClick: (event) => event.stopPropagation(), children: b.nom }),
          e.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 whitespace-pre-wrap text-sm text-muted-foreground", children: e.description }),
          e.rappelMinutes != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3 w-3" }),
            e.rappelMinutes === 0 ? "Rappel à l'heure" : `Rappel ${formatMinutes(e.rappelMinutes)} avant`
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": `Supprimer l'évènement ${e.titre}`, onClick: (event) => {
          event.stopPropagation();
          remove(e.id);
        }, className: "text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }, e.id);
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
export {
  CalendrierPage as component
};
