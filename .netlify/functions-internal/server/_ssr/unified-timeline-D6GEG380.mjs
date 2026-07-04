import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { F as useFileInput, B as Button, A as AddPhotoDialog, M as Dialog, N as DialogContent, O as DialogHeader, Q as DialogTitle, L as Label, I as Input, T as Textarea, S as DialogFooter, U as deleteJournal, G as updatePhotoDate, H as updatePhotoLegende, J as deletePhoto, i as savePhoto, u as uid, j as saveJournal, z as getPhotoBlob, e as useBlobUrl } from "./router-CdX15gXw.mjs";
import { P as PhotoLightbox } from "./photo-lightbox-DeD9erm-.mjs";
import { u as useConfirm } from "./confirm-dialog-DfQ2UWSk.mjs";
import { a as SOINS, b as soinEmoji, c as soinLabel } from "./bonsai-meta-gq8SRzvW.mjs";
import { a as Camera, K as FolderOpen, P as Plus, O as ArrowUpDown, b as Calendar, X, M as MessageSquarePlus } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-alert-dialog.mjs";
function getDateKey(isoDate) {
  return isoDate.slice(0, 10);
}
function UnifiedTimeline({
  bonsaiId,
  bonsai,
  photos,
  entries,
  mainId,
  onSetMain,
  onUpdateBonsai
}) {
  const qc = useQueryClient();
  const [sortDesc, setSortDesc] = reactExports.useState(true);
  const cameraInput = useFileInput();
  const galleryInput = useFileInput();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [dialogSource, setDialogSource] = reactExports.useState("camera");
  const queueRef = reactExports.useRef([]);
  const [currentFile, setCurrentFile] = reactExports.useState(null);
  const [processedCount, setProcessedCount] = reactExports.useState(0);
  const [journalModalOpen, setJournalModalOpen] = reactExports.useState(false);
  const [editingEntry, setEditingEntry] = reactExports.useState(null);
  const [journalType, setJournalType] = reactExports.useState("arrosage");
  const [journalDate, setJournalDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [journalNotes, setJournalNotes] = reactExports.useState("");
  const [lightboxPhoto, setLightboxPhoto] = reactExports.useState(null);
  const { confirm, dialog: confirmDialog } = useConfirm();
  const timeline = [
    ...photos.map((p) => ({ kind: "photo", data: p, dateKey: getDateKey(p.date) })),
    ...entries.map((e) => ({ kind: "journal", data: e, dateKey: getDateKey(e.date) }))
  ];
  timeline.sort((a, b) => {
    const dateCompare = sortDesc ? b.dateKey.localeCompare(a.dateKey) : a.dateKey.localeCompare(b.dateKey);
    if (dateCompare !== 0) return dateCompare;
    if (a.kind === "journal" && b.kind === "photo") return -1;
    if (a.kind === "photo" && b.kind === "journal") return 1;
    const aTime = a.kind === "photo" ? a.data.date : a.data.date;
    const bTime = b.kind === "photo" ? b.data.date : b.data.date;
    return sortDesc ? bTime.localeCompare(aTime) : aTime.localeCompare(bTime);
  });
  const groups = /* @__PURE__ */ new Map();
  for (const item of timeline) {
    const existing = groups.get(item.dateKey) ?? [];
    existing.push(item);
    groups.set(item.dateKey, existing);
  }
  const openCamera = () => {
    setDialogSource("camera");
    cameraInput.inputRef.current?.click();
  };
  const openGallery = () => {
    setDialogSource("gallery");
    galleryInput.inputRef.current?.click();
  };
  reactExports.useEffect(() => {
    if (dialogSource === "gallery" && galleryInput.inputRef.current?.files) {
      const files = Array.from(galleryInput.inputRef.current.files);
      if (files.length > 0) {
        queueRef.current = files;
        setProcessedCount(0);
        setCurrentFile(files[0]);
        setDialogOpen(true);
      }
    }
  }, [galleryInput.file, dialogSource]);
  reactExports.useEffect(() => {
    if (dialogSource === "camera" && cameraInput.file) {
      queueRef.current = [cameraInput.file];
      setProcessedCount(0);
      setCurrentFile(cameraInput.file);
      setDialogOpen(true);
    }
  }, [cameraInput.file, dialogSource]);
  const onPhotoConfirm = async ({
    blob,
    date,
    legende
  }) => {
    await savePhoto({
      id: uid(),
      bonsaiId,
      blob,
      date,
      legende: legende || void 0
    });
    qc.invalidateQueries({ queryKey: ["photos", bonsaiId] });
    const queue = queueRef.current;
    const nextIndex = processedCount + 1;
    if (nextIndex < queue.length) {
      setCurrentFile(queue[nextIndex]);
      setProcessedCount(nextIndex);
    } else {
      const total = queue.length;
      setDialogOpen(false);
      setCurrentFile(null);
      setProcessedCount(0);
      queueRef.current = [];
      cameraInput.reset();
      galleryInput.reset();
      toast.success(`${total} photo${total > 1 ? "s" : ""} ajoutée${total > 1 ? "s" : ""}`);
    }
  };
  const openNewJournal = () => {
    setEditingEntry(null);
    setJournalType("arrosage");
    setJournalDate((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
    setJournalNotes("");
    setJournalModalOpen(true);
  };
  const openEditJournal = (e) => {
    setEditingEntry(e);
    setJournalType(e.type);
    setJournalDate(e.date.slice(0, 10));
    setJournalNotes(e.notes || "");
    setJournalModalOpen(true);
  };
  const saveJournalEntry = async () => {
    const isCollectionExit = journalType === "don_vente" || journalType === "mort";
    let shouldUpdateStatus = false;
    if (isCollectionExit && bonsai.dansCollection !== false) {
      const confirmed = await confirm({
        title: "Cet arbre ne fait plus partie de votre collection ?",
        description: journalType === "mort" ? "Marquer cet arbre comme décédé le retirera de votre collection active." : "Ce bonsaï a été donné ou vendu. Voulez-vous le retirer de votre collection active ?",
        confirmLabel: "Oui, retirer",
        cancelLabel: "Non, garder",
        destructive: journalType === "mort"
      });
      shouldUpdateStatus = confirmed;
    }
    if (editingEntry) {
      await saveJournal({
        id: editingEntry.id,
        bonsaiId,
        type: journalType,
        date: new Date(journalDate).toISOString(),
        notes: journalNotes || void 0
      });
      toast.success("Entrée mise à jour");
    } else {
      await saveJournal({
        id: uid(),
        bonsaiId,
        type: journalType,
        date: new Date(journalDate).toISOString(),
        notes: journalNotes || void 0
      });
      toast.success("Entrée ajoutée");
    }
    if (shouldUpdateStatus) {
      await onUpdateBonsai({ ...bonsai, dansCollection: false });
      toast.info("Arbre retiré de la collection");
    }
    qc.invalidateQueries({ queryKey: ["journal", bonsaiId] });
    setJournalModalOpen(false);
    setEditingEntry(null);
  };
  const removeJournal = async (e) => {
    const confirmed = await confirm({
      title: "Supprimer cette entrée ?",
      destructive: true,
      confirmLabel: "Supprimer"
    });
    if (!confirmed) return;
    await deleteJournal(e.id);
    qc.invalidateQueries({ queryKey: ["journal", bonsaiId] });
  };
  const removePhoto = async (pid) => {
    const confirmed = await confirm({
      title: "Supprimer cette photo ?",
      destructive: true,
      confirmLabel: "Supprimer"
    });
    if (!confirmed) return;
    await deletePhoto(pid);
    qc.invalidateQueries({ queryKey: ["photos", bonsaiId] });
  };
  const updateLegende = async (p, legende) => {
    await updatePhotoLegende(p.id, legende || null);
    qc.invalidateQueries({ queryKey: ["photos", bonsaiId] });
  };
  const updateDate = async (p, date) => {
    await updatePhotoDate(p.id, date);
    qc.invalidateQueries({ queryKey: ["photos", bonsaiId] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: cameraInput.inputRef,
        type: "file",
        accept: "image/*",
        capture: "environment",
        className: "hidden",
        onChange: (e) => {
          const f = e.target.files?.[0];
          if (f) cameraInput.setFile(f);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: galleryInput.inputRef,
        type: "file",
        accept: "image/*",
        multiple: true,
        className: "hidden",
        onChange: (e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            galleryInput.setFile(files[0]);
          }
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: openCamera,
          className: "flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition hover:border-accent/60 hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-4 w-4" }),
            " Photo"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: openGallery,
          className: "flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition hover:border-accent/60 hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-4 w-4" }),
            " Galerie"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: openNewJournal,
          className: "col-span-2 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition hover:border-accent/60 hover:text-foreground sm:col-span-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Entrée"
          ]
        }
      )
    ] }),
    timeline.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setSortDesc((s) => !s), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "mr-1.5 h-3.5 w-3.5" }),
      sortDesc ? "Plus récentes d'abord" : "Plus anciennes d'abord"
    ] }) }),
    timeline.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucune photo ni entrée de journal. Documentez l'évolution de votre arbre." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-6 border-l border-border pl-6", children: Array.from(groups.entries()).map(([dateKey, items]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TimelineDateGroup,
      {
        dateKey,
        items,
        mainId,
        onSetMain,
        onPhotoDelete: removePhoto,
        onPhotoLegende: updateLegende,
        onPhotoDate: updateDate,
        onPhotoClick: setLightboxPhoto,
        onJournalEdit: openEditJournal,
        onJournalDelete: removeJournal
      },
      dateKey
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddPhotoDialog,
      {
        open: dialogOpen,
        onOpenChange: (open) => {
          if (!open) {
            const saved = processedCount;
            setDialogOpen(false);
            setCurrentFile(null);
            setProcessedCount(0);
            queueRef.current = [];
            cameraInput.reset();
            galleryInput.reset();
            if (saved > 0) {
              toast.success(`${saved} photo${saved > 1 ? "s" : ""} ajoutée${saved > 1 ? "s" : ""}`);
            }
          }
        },
        source: dialogSource,
        file: currentFile,
        onConfirm: onPhotoConfirm,
        currentIndex: processedCount,
        totalCount: queueRef.current.length
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: journalModalOpen, onOpenChange: setJournalModalOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingEntry ? "Modifier l'entrée" : "Nouvelle entrée" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Type de soin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: journalType,
              onChange: (e) => setJournalType(e.target.value),
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: journalDate,
              onChange: (e) => setJournalDate(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-1.5 block text-sm", children: "Notes (facultatif)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: journalNotes,
              onChange: (e) => setJournalNotes(e.target.value),
              rows: 3,
              placeholder: "Observations, détails…"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setJournalModalOpen(false), children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: saveJournalEntry, children: editingEntry ? "Mettre à jour" : "Enregistrer" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PhotoLightbox,
      {
        photo: lightboxPhoto,
        open: !!lightboxPhoto,
        onOpenChange: (o) => {
          if (!o) setLightboxPhoto(null);
        }
      }
    ),
    confirmDialog
  ] });
}
function TimelineDateGroup({
  dateKey,
  items,
  mainId,
  onSetMain,
  onPhotoDelete,
  onPhotoLegende,
  onPhotoDate,
  onPhotoClick,
  onJournalEdit,
  onJournalDelete
}) {
  const dateLabel = format(parseISO(dateKey + "T00:00:00"), "d MMMM yyyy", { locale: fr });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-background" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
      dateLabel
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-4", children: items.map(
      (item) => item.kind === "journal" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        JournalItem,
        {
          entry: item.data,
          onEdit: () => onJournalEdit(item.data),
          onDelete: () => onJournalDelete(item.data)
        },
        `journal-${item.data.id}`
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        PhotoItem,
        {
          photo: item.data,
          isMain: item.data.id === mainId,
          onSetMain: () => onSetMain(item.data.id),
          onDelete: () => onPhotoDelete(item.data.id),
          onLegende: (t) => onPhotoLegende(item.data, t),
          onDate: (d) => onPhotoDate(item.data, d),
          onClick: () => onPhotoClick(item.data)
        },
        `photo-${item.data.id}`
      )
    ) })
  ] });
}
function JournalItem({
  entry,
  onEdit,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick: onEdit,
      className: "flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-secondary/30 p-3 transition hover:bg-secondary/50",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-base", children: soinEmoji(entry.type) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: soinLabel(entry.type) }),
          entry.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 whitespace-pre-wrap text-sm text-muted-foreground", children: entry.notes })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: (e) => {
              e.stopPropagation();
              onDelete();
            },
            className: "shrink-0 text-muted-foreground hover:text-destructive",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
          }
        )
      ]
    }
  );
}
function PhotoItem({
  photo,
  isMain,
  onSetMain,
  onDelete,
  onLegende,
  onDate,
  onClick
}) {
  const url = usePhotoUrl(photo);
  const [editing, setEditing] = reactExports.useState(false);
  const [draft, setDraft] = reactExports.useState(photo.legende ?? "");
  const [editingDate, setEditingDate] = reactExports.useState(false);
  const save = async () => {
    await onLegende(draft.trim());
    setEditing(false);
    toast.success("Commentaire enregistré");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-border bg-card", children: [
    url && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: url,
        alt: photo.legende ?? "",
        loading: "lazy",
        onClick,
        className: "max-h-96 w-full cursor-zoom-in object-contain transition hover:opacity-95",
        decoding: "async"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-3", children: [
      editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: draft,
            onChange: (e) => setDraft(e.target.value),
            rows: 2,
            placeholder: "Votre commentaire sur cette photo…",
            autoFocus: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => {
                setDraft(photo.legende ?? "");
                setEditing(false);
              },
              children: "Annuler"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: save, children: "Enregistrer" })
        ] })
      ] }) : photo.legende ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            setDraft(photo.legende ?? "");
            setEditing(true);
          },
          className: "block w-full whitespace-pre-wrap rounded-md bg-secondary/40 px-3 py-2 text-left text-sm leading-relaxed text-foreground/90 hover:bg-secondary/60",
          children: photo.legende
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            setDraft("");
            setEditing(true);
          },
          className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquarePlus, { className: "h-3.5 w-3.5" }),
            " Ajouter un commentaire"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        isMain ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent", children: "Photo principale" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: onSetMain, children: "Définir comme principale" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            "aria-label": "Supprimer cette photo",
            onClick: onDelete,
            className: "text-destructive hover:text-destructive",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
          }
        )
      ] })
    ] })
  ] });
}
function usePhotoUrl(photo) {
  const [blob, setBlob] = reactExports.useState(void 0);
  const storagePath = photo?.storagePath;
  reactExports.useEffect(() => {
    let cancelled = false;
    if (!storagePath) {
      setBlob(void 0);
      return;
    }
    getPhotoBlob({ storagePath }).then((b) => {
      if (!cancelled) setBlob(b);
    }).catch(() => {
      if (!cancelled) setBlob(void 0);
    });
    return () => {
      cancelled = true;
    };
  }, [storagePath]);
  return useBlobUrl(blob);
}
export {
  UnifiedTimeline,
  UnifiedTimeline as default
};
