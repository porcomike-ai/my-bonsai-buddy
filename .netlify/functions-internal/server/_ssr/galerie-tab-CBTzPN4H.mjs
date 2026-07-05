import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { M as useFileInput, B as Button, A as AddPhotoDialog, I as Input, T as Textarea, N as updatePhotoDate, O as updatePhotoLegende, Q as deletePhoto, U as savePoterieGalleryPhoto, u as uid, G as getPhotoBlob, k as useBlobUrl } from "./router-r6Ql_qzZ.mjs";
import { P as PhotoLightbox } from "./photo-lightbox-uI1_Mx_7.mjs";
import { u as useConfirm } from "./confirm-dialog-BYEP0dHO.mjs";
import { d as Camera, N as FolderOpen, e as Calendar, O as MessageSquarePlus, X } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-presence.mjs";
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
import "../_libs/radix-ui__react-radio-group.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
function PoterieGalerieTab({
  poterieId,
  photos
}) {
  const qc = useQueryClient();
  const cameraInput = useFileInput();
  const galleryInput = useFileInput();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [dialogSource, setDialogSource] = reactExports.useState("camera");
  const queueRef = reactExports.useRef([]);
  const [currentFile, setCurrentFile] = reactExports.useState(null);
  const [processedCount, setProcessedCount] = reactExports.useState(0);
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
  const onConfirm = async ({
    blob,
    date,
    legende
  }) => {
    await savePoterieGalleryPhoto({
      id: uid(),
      poterieId,
      blob,
      date,
      legende: legende || void 0
    });
    qc.invalidateQueries({ queryKey: ["poterie-photos", poterieId] });
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
      toast.success(
        `${total} photo${total > 1 ? "s" : ""} ajoutée${total > 1 ? "s" : ""}`
      );
    }
  };
  const [lightboxPhoto, setLightboxPhoto] = reactExports.useState(null);
  const { confirm, dialog: confirmDialog } = useConfirm();
  const remove = async (pid) => {
    const confirmed = await confirm({
      title: "Supprimer cette photo ?",
      destructive: true,
      confirmLabel: "Supprimer"
    });
    if (!confirmed) return;
    await deletePhoto(pid);
    qc.invalidateQueries({ queryKey: ["poterie-photos", poterieId] });
  };
  const updateLegende = async (p, legende) => {
    await updatePhotoLegende(p.id, legende || null);
    qc.invalidateQueries({ queryKey: ["poterie-photos", poterieId] });
  };
  const updateDate = async (p, date) => {
    await updatePhotoDate(p.id, date);
    qc.invalidateQueries({ queryKey: ["poterie-photos", poterieId] });
  };
  const [sortDesc, setSortDesc] = reactExports.useState(true);
  const sorted = [...photos].sort(
    (a, b) => sortDesc ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
  );
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: openCamera,
          className: "flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-4 py-5 text-sm font-medium text-muted-foreground transition hover:border-accent/60 hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-4 w-4" }),
            " Appareil photo"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: openGallery,
          className: "flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-4 py-5 text-sm font-medium text-muted-foreground transition hover:border-accent/60 hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-4 w-4" }),
            " Galerie"
          ]
        }
      )
    ] }),
    sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucune photo pour l'instant. Ajoutez des vues de cette poterie sous différents angles ou avec différents arbres." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setSortDesc((s) => !s), children: [
        "Date : ",
        sortDesc ? "plus récentes d'abord" : "plus anciennes d'abord"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-6 border-l border-border pl-6", children: sorted.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        PhotoTimeline,
        {
          p,
          onDelete: () => remove(p.id),
          onLegende: (t) => updateLegende(p, t),
          onDate: (d) => updateDate(p, d),
          onOpenLightbox: () => setLightboxPhoto(p)
        },
        p.id
      )) })
    ] }),
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
              toast.success(
                `${saved} photo${saved > 1 ? "s" : ""} ajoutée${saved > 1 ? "s" : ""}`
              );
            }
          }
        },
        source: dialogSource,
        file: currentFile,
        onConfirm,
        currentIndex: processedCount,
        totalCount: queueRef.current.length
      }
    ),
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
function usePhotoUrl(photo) {
  const [blob, setBlob] = reactExports.useState(void 0);
  const storagePath = photo?.storagePath;
  const poterieId = photo?.poterieId;
  reactExports.useEffect(() => {
    let cancelled = false;
    if (!storagePath) {
      setBlob(void 0);
      return;
    }
    getPhotoBlob({ storagePath, poterieId }).then((b) => {
      if (!cancelled) setBlob(b);
    }).catch(() => {
      if (!cancelled) setBlob(void 0);
    });
    return () => {
      cancelled = true;
    };
  }, [storagePath, poterieId]);
  return useBlobUrl(blob);
}
function PhotoTimeline({
  p,
  onDelete,
  onLegende,
  onDate,
  onOpenLightbox
}) {
  const url = usePhotoUrl(p);
  const [editing, setEditing] = reactExports.useState(false);
  const [draft, setDraft] = reactExports.useState(p.legende ?? "");
  const [editingDate, setEditingDate] = reactExports.useState(false);
  const save = async () => {
    await onLegende(draft.trim());
    setEditing(false);
    toast.success("Commentaire enregistré");
  };
  const saveDate = async (value) => {
    if (!value) return;
    const iso = new Date(value).toISOString();
    await onDate(iso);
    setEditingDate(false);
    toast.success("Date mise à jour");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-background" }),
    editingDate ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "date",
          defaultValue: p.date.slice(0, 10),
          className: "h-8 w-auto",
          autoFocus: true,
          onBlur: (e) => saveDate(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") saveDate(e.target.value);
            if (e.key === "Escape") setEditingDate(false);
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => setEditingDate(false), children: "Annuler" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setEditingDate(true),
        className: "inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground",
        title: "Modifier la date",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
          format(parseISO(p.date), "d MMMM yyyy", { locale: fr })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 overflow-hidden rounded-2xl border border-border bg-card", children: [
      url && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: url,
          alt: p.legende ?? "",
          loading: "lazy",
          onClick: onOpenLightbox,
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
                  setDraft(p.legende ?? "");
                  setEditing(false);
                },
                children: "Annuler"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: save, children: "Enregistrer" })
          ] })
        ] }) : p.legende ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              setDraft(p.legende ?? "");
              setEditing(true);
            },
            className: "block w-full whitespace-pre-wrap rounded-md bg-secondary/40 px-3 py-2 text-left text-sm leading-relaxed text-foreground/90 hover:bg-secondary/60",
            children: p.legende
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            "aria-label": "Supprimer cette photo",
            onClick: onDelete,
            className: "text-destructive hover:text-destructive",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
          }
        ) })
      ] })
    ] })
  ] });
}
export {
  PoterieGalerieTab,
  PoterieGalerieTab as default
};
