import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { H as Dialog, K as DialogContent, N as DialogTitle, B as Button, $ as useBlobUrl, d as cn } from "./router-BaPlfOky.mjs";
import { Z as ZoomOut, Y as ZoomIn, _ as RotateCcw, $ as Columns2, p as ChevronLeft, q as ChevronRight, X } from "../_libs/lucide-react.mjs";
import { f as format, a as fr, p as parseISO } from "../_libs/date-fns.mjs";
const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.4;
function usePhotoUrl(photo, open) {
  const [blob, setBlob] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    if (!open || !photo) {
      setBlob(void 0);
      return;
    }
    let cancelled = false;
    import("./photo-cache-p8x8uRxC.mjs").then(({ getCachedPhotoBlob }) => getCachedPhotoBlob(photo)).then((b) => {
      if (!cancelled) setBlob(b);
    }).catch(() => {
      if (!cancelled) setBlob(void 0);
    });
    return () => {
      cancelled = true;
    };
  }, [open, photo]);
  return useBlobUrl(blob);
}
function SinglePane({
  url,
  alt,
  zoom,
  offset,
  isPanning,
  canPan,
  imgRef,
  containerRef,
  onWheel,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onPointerDown,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: containerRef,
      className: "relative flex h-full flex-1 items-center justify-center overflow-hidden",
      onWheel,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave: onMouseUp,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onPointerDown,
      onClick,
      style: {
        cursor: isPanning ? "grabbing" : canPan ? "zoom-out" : "pointer"
      },
      children: url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          ref: imgRef,
          src: url,
          alt,
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
  );
}
function PhotoLightbox({ photo, photos = [], open, onOpenChange }) {
  const [zoom, setZoom] = reactExports.useState(1);
  const [offset, setOffset] = reactExports.useState({ x: 0, y: 0 });
  const containerRef = reactExports.useRef(null);
  const imgRef = reactExports.useRef(null);
  const [isPanning, setIsPanning] = reactExports.useState(false);
  const [compareMode, setCompareMode] = reactExports.useState(false);
  const [comparePhoto, setComparePhoto] = reactExports.useState(null);
  const [splitPct, setSplitPct] = reactExports.useState(50);
  const [localPhoto, setLocalPhoto] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setLocalPhoto(photo);
  }, [photo]);
  const activePhoto = localPhoto ?? photo;
  const sortedPhotos = reactExports.useMemo(() => {
    if (!photos.length) return activePhoto ? [activePhoto] : [];
    return [...photos].sort((a, b) => a.date.localeCompare(b.date));
  }, [photos, activePhoto]);
  const currentIndex = reactExports.useMemo(() => {
    if (!activePhoto) return -1;
    return sortedPhotos.findIndex((p) => p.id === activePhoto.id);
  }, [sortedPhotos, activePhoto]);
  const goPrev = () => {
    if (currentIndex > 0) {
      setLocalPhoto(sortedPhotos[currentIndex - 1]);
    }
  };
  const goNext = () => {
    if (currentIndex >= 0 && currentIndex < sortedPhotos.length - 1) {
      setLocalPhoto(sortedPhotos[currentIndex + 1]);
    }
  };
  const url = usePhotoUrl(activePhoto, open);
  const compareUrl = usePhotoUrl(comparePhoto, open && compareMode);
  const CLICK_DRAG_THRESHOLD_PX = 5;
  const DOUBLE_CLICK_WINDOW_MS = 250;
  const clickStartRef = reactExports.useRef(null);
  const pendingCloseTimer = reactExports.useRef(null);
  const cancelPendingClose = reactExports.useCallback(() => {
    if (pendingCloseTimer.current) {
      clearTimeout(pendingCloseTimer.current);
      pendingCloseTimer.current = null;
    }
  }, []);
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
  reactExports.useEffect(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    if (!open) {
      setCompareMode(false);
      setComparePhoto(null);
      setSplitPct(50);
    }
    return () => cancelPendingClose();
  }, [activePhoto, open, cancelPendingClose]);
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
    if (!open || compareMode) return;
    e.preventDefault();
    const delta = -e.deltaY * 25e-4;
    setZoomClamped(zoom + delta * 5);
  };
  const onMouseDown = (e) => {
    if (zoom <= 1 || compareMode) return;
    setIsPanning(true);
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
    setIsPanning(false);
  };
  const onTouchStart = (e) => {
    if (compareMode) return;
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
      clickStartRef.current = null;
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
    if (compareMode) return;
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
  const onContainerPointerDown = (e) => {
    clickStartRef.current = e.isPrimary ? { x: e.clientX, y: e.clientY } : null;
  };
  const onContainerClick = (e) => {
    if (compareMode) return;
    const start = clickStartRef.current;
    clickStartRef.current = null;
    if (!start) return;
    const dist = Math.hypot(e.clientX - start.x, e.clientY - start.y);
    if (dist > CLICK_DRAG_THRESHOLD_PX) return;
    if (e.detail >= 2) {
      cancelPendingClose();
      return;
    }
    cancelPendingClose();
    pendingCloseTimer.current = setTimeout(() => {
      pendingCloseTimer.current = null;
      onOpenChange(false);
    }, DOUBLE_CLICK_WINDOW_MS);
  };
  const canPan = zoom > 1 && !compareMode;
  const canCompare = sortedPhotos.length >= 2;
  const toggleCompare = () => {
    if (compareMode) {
      setCompareMode(false);
      setComparePhoto(null);
      return;
    }
    setCompareMode(true);
    const other = sortedPhotos.find((p) => p.id !== activePhoto?.id) ?? sortedPhotos[0] ?? null;
    setComparePhoto(other);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };
  const formatDate = (iso) => {
    if (!iso) return "";
    try {
      return format(parseISO(iso), "d MMM yyyy", { locale: fr });
    } catch {
      return iso.slice(0, 10);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "flex h-[100vh] max-h-[100vh] w-[100vw] max-w-[100vw] flex-col gap-0 overflow-hidden rounded-none border-none bg-background/95 p-0 backdrop-blur-sm",
      onPointerDownOutside: (e) => e.preventDefault(),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "sr-only", children: "Visionneuse de photo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-4 right-4 top-4 z-20 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 rounded-full bg-secondary/90 p-1.5 shadow-lg backdrop-blur", children: [
            !compareMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
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
            canCompare && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: compareMode ? "default" : "ghost",
                size: "sm",
                onClick: toggleCompare,
                className: "h-8 rounded-full px-3 text-xs font-semibold",
                "aria-label": compareMode ? "Quitter la comparaison" : "Comparer avant/après",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Columns2, { className: "mr-1.5 h-3.5 w-3.5" }),
                  compareMode ? "Quitter" : "Comparer"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            !compareMode && sortedPhotos.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 rounded-full bg-secondary/90 p-1 shadow-lg backdrop-blur", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: goPrev,
                  disabled: currentIndex <= 0,
                  className: "h-8 w-8 rounded-full",
                  "aria-label": "Photo précédente",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center px-1 text-[11px] font-medium text-muted-foreground", children: [
                currentIndex + 1,
                "/",
                sortedPhotos.length
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: goNext,
                  disabled: currentIndex < 0 || currentIndex >= sortedPhotos.length - 1,
                  className: "h-8 w-8 rounded-full",
                  "aria-label": "Photo suivante",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "secondary",
                size: "icon",
                onClick: () => onOpenChange(false),
                className: "h-10 w-10 rounded-full shadow-lg",
                "aria-label": "Fermer",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
              }
            )
          ] })
        ] }),
        compareMode && comparePhoto ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-1 flex-col overflow-hidden pt-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full overflow-hidden", style: { width: `${splitPct}%` }, children: [
              url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: url,
                  alt: activePhoto?.legende ?? "Avant",
                  className: "h-full w-full object-contain",
                  draggable: false
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center text-sm text-muted-foreground", children: "Chargement…" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur", children: [
                formatDate(activePhoto?.date),
                " · Actuelle"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative h-full flex-1 overflow-hidden border-l border-white/20",
                children: [
                  compareUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: compareUrl,
                      alt: comparePhoto.legende ?? "Comparaison",
                      className: "h-full w-full object-contain",
                      draggable: false
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center text-sm text-muted-foreground", children: "Chargement…" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur", children: [
                    formatDate(comparePhoto.date),
                    " · Comparaison"
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-6 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "Répartition" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "range",
                min: 20,
                max: 80,
                value: splitPct,
                onChange: (e) => setSplitPct(Number(e.target.value)),
                className: "h-1.5 flex-1 cursor-pointer accent-[var(--color-accent)]",
                "aria-label": "Répartition avant/après"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border bg-card/80 px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: "Choisir la photo de comparaison" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: sortedPhotos.filter((p) => p.id !== activePhoto?.id).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              CompareThumb,
              {
                photo: p,
                selected: comparePhoto?.id === p.id,
                onSelect: () => setComparePhoto(p)
              },
              p.id
            )) })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SinglePane,
            {
              url,
              alt: activePhoto?.legende ?? "",
              zoom,
              offset,
              isPanning,
              canPan,
              imgRef,
              containerRef,
              onWheel,
              onMouseDown,
              onMouseMove,
              onMouseUp,
              onTouchStart,
              onTouchMove,
              onTouchEnd,
              onPointerDown: onContainerPointerDown,
              onClick: onContainerClick
            }
          ),
          activePhoto && (activePhoto.date || activePhoto.legende) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/60 to-transparent px-6 pb-8 pt-12 text-white", children: [
            activePhoto.date && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-white/80", children: format(parseISO(activePhoto.date), "d MMMM yyyy 'à' HH:mm", { locale: fr }) }),
            activePhoto.legende && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-white/95", children: activePhoto.legende })
          ] })
        ] })
      ]
    }
  ) });
}
function CompareThumb({
  photo,
  selected,
  onSelect
}) {
  const url = usePhotoUrl(photo, true);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: onSelect,
      className: cn(
        "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition",
        selected ? "border-accent ring-2 ring-accent/30" : "border-transparent opacity-70 hover:opacity-100"
      ),
      children: url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "", className: "h-full w-full object-cover", loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full bg-muted" })
    }
  );
}
export {
  PhotoLightbox as P
};
