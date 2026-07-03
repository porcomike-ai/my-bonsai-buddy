import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { G as useFileInput, B as Button, A as AddPhotoDialog, I as Input, T as Textarea, H as updatePhotoDate, J as updatePhotoLegende, K as deletePhoto, i as savePhoto, u as uid, e as useBlobUrl, D as Dialog, E as DialogContent, F as DialogTitle, y as getPhotoBlob } from "./router-DayW0770.mjs";
import { a as Camera, K as FolderOpen, b as Calendar, M as MessageSquarePlus, X, Z as ZoomOut, N as ZoomIn, R as RotateCcw } from "../_libs/lucide-react.mjs";
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
const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.4;
function PhotoLightbox({ photo, open, onOpenChange }) {
  const [zoom, setZoom] = reactExports.useState(1);
  const [offset, setOffset] = reactExports.useState({ x: 0, y: 0 });
  const containerRef = reactExports.useRef(null);
  const imgRef = reactExports.useRef(null);
  const touchState = reactExports.useRef({
    mode: "none",
    startX: 0,
    startY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
    startDist: 0,
    startZoom: 1
  });
  const panState = reactExports.useRef({
    active: false,
    startX: 0,
    startY: 0,
    startOffsetX: 0,
    startOffsetY: 0
  });
  const [blob, setBlob] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    if (!open || !photo) {
      setBlob(void 0);
      return;
    }
    let cancelled = false;
    import("./router-DayW0770.mjs").then((n) => n.O).then(({ getPhotoBlob: getPhotoBlob2 }) => getPhotoBlob2(photo)).then((b) => {
      if (!cancelled) setBlob(b);
    }).catch(() => {
      if (!cancelled) setBlob(void 0);
    });
    return () => {
      cancelled = true;
    };
  }, [open, photo]);
  const url = useBlobUrl(blob);
  reactExports.useEffect(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, [photo, open]);
  const clampOffset = reactExports.useCallback((x, y, z) => {
    if (!containerRef.current || !imgRef.current) return { x, y };
    const cw = containerRef.current.clientWidth;
    const ch = containerRef.current.clientHeight;
    const iw = imgRef.current.naturalWidth * z;
    const ih = imgRef.current.naturalHeight * z;
    const maxX = iw > cw ? (iw - cw) / 2 : 0;
    const maxY = ih > ch ? (ih - ch) / 2 : 0;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y))
    };
  }, []);
  const setZoomClamped = reactExports.useCallback(
    (newZoom, centerOffsetX = 0, centerOffsetY = 0) => {
      const z = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
      setZoom(z);
      setOffset((prev) => {
        const factor = z / (zoom || 1);
        return clampOffset(
          (prev.x - centerOffsetX) * factor + centerOffsetX,
          (prev.y - centerOffsetY) * factor + centerOffsetY,
          z
        );
      });
    },
    [zoom, clampOffset]
  );
  const zoomIn = () => setZoomClamped(zoom + ZOOM_STEP);
  const zoomOut = () => setZoomClamped(zoom - ZOOM_STEP);
  const resetZoom = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };
  const onWheel = (e) => {
    if (!open) return;
    e.preventDefault();
    const delta = -e.deltaY * 25e-4;
    setZoomClamped(zoom + delta * 5);
  };
  const onMouseDown = (e) => {
    if (zoom <= 1) return;
    panState.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startOffsetX: offset.x,
      startOffsetY: offset.y
    };
  };
  const onMouseMove = (e) => {
    if (!panState.current.active) return;
    const dx = e.clientX - panState.current.startX;
    const dy = e.clientY - panState.current.startY;
    setOffset(
      clampOffset(panState.current.startOffsetX + dx, panState.current.startOffsetY + dy, zoom)
    );
  };
  const onMouseUp = () => {
    panState.current.active = false;
  };
  const onTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchState.current = {
        mode: "pan",
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        startOffsetX: offset.x,
        startOffsetY: offset.y,
        startDist: 0,
        startZoom: zoom
      };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchState.current = {
        mode: "pinch",
        startX: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        startY: (e.touches[0].clientY + e.touches[1].clientY) / 2,
        startOffsetX: offset.x,
        startOffsetY: offset.y,
        startDist: Math.hypot(dx, dy),
        startZoom: zoom
      };
    }
  };
  const onTouchMove = (e) => {
    const ts = touchState.current;
    if (ts.mode === "pan" && e.touches.length === 1) {
      const dx = e.touches[0].clientX - ts.startX;
      const dy = e.touches[0].clientY - ts.startY;
      setOffset(clampOffset(ts.startOffsetX + dx, ts.startOffsetY + dy, zoom));
    } else if (ts.mode === "pinch" && e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const scale = dist / (ts.startDist || 1);
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, ts.startZoom * scale));
      setZoom(newZoom);
    }
  };
  const onTouchEnd = () => {
    touchState.current.mode = "none";
  };
  const canPan = zoom > 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "flex h-[100vh] max-h-[100vh] w-[100vw] max-w-[100vw] flex-col gap-0 overflow-hidden rounded-none border-none bg-background/95 p-0 backdrop-blur-sm",
      onPointerDownOutside: (e) => e.preventDefault(),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "sr-only", children: "Visionneuse de photo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "secondary",
            size: "icon",
            onClick: () => onOpenChange(false),
            className: "absolute right-4 top-4 z-20 h-10 w-10 rounded-full shadow-lg",
            "aria-label": "Fermer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-4 top-4 z-20 flex gap-2 rounded-full bg-secondary/90 p-1.5 shadow-lg backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: zoomOut,
              disabled: zoom <= MIN_ZOOM,
              className: "h-8 w-8 rounded-full",
              "aria-label": "Dézoomer",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomOut, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: zoomIn,
              disabled: zoom >= MAX_ZOOM,
              className: "h-8 w-8 rounded-full",
              "aria-label": "Zoomer",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: resetZoom,
              disabled: zoom === 1 && offset.x === 0 && offset.y === 0,
              className: "h-8 w-8 rounded-full",
              "aria-label": "Réinitialiser le zoom",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: containerRef,
            className: "relative flex flex-1 items-center justify-center overflow-hidden",
            onWheel,
            onMouseDown,
            onMouseMove,
            onMouseUp,
            onMouseLeave: onMouseUp,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            style: {
              cursor: canPan ? panState.current.active ? "grabbing" : "grab" : "default"
            },
            children: url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                ref: imgRef,
                src: url,
                alt: photo?.legende ?? "",
                draggable: false,
                className: "max-h-full max-w-full select-none object-contain transition-transform duration-100",
                style: {
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                  transformOrigin: "center center",
                  touchAction: "none"
                }
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Chargement…" })
          }
        ),
        photo && (photo.date || photo.legende) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/60 to-transparent px-6 pb-8 pt-12 text-white", children: [
          photo.date && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-white/80", children: format(parseISO(photo.date), "d MMMM yyyy 'à' HH:mm", { locale: fr }) }),
          photo.legende && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-white/95", children: photo.legende })
        ] })
      ]
    }
  ) });
}
function GalerieTab({
  bonsaiId,
  photos,
  mainId,
  onSetMain
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
      toast.success(
        `${total} photo${total > 1 ? "s" : ""} ajoutée${total > 1 ? "s" : ""}`
      );
    }
  };
  const [lightboxPhoto, setLightboxPhoto] = reactExports.useState(null);
  const remove = async (pid) => {
    if (!confirm("Supprimer cette photo ?")) return;
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
    sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucune photo pour l'instant. Documentez l'évolution de votre arbre." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setSortDesc((s) => !s), children: [
        "Date : ",
        sortDesc ? "plus récentes d'abord" : "plus anciennes d'abord"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-6 border-l border-border pl-6", children: sorted.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        PhotoTimeline,
        {
          p,
          isMain: p.id === mainId,
          onSetMain: () => onSetMain(p.id),
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
    )
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
function PhotoTimeline({
  p,
  isMain,
  onSetMain,
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
    ] })
  ] });
}
export {
  GalerieTab,
  GalerieTab as default
};
