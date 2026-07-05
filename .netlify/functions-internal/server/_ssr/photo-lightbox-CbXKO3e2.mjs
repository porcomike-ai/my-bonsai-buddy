import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { k as useBlobUrl, V as Dialog, W as DialogContent, Y as DialogTitle, B as Button } from "./router-B380VHsD.mjs";
import { X, Z as ZoomOut, Q as ZoomIn, R as RotateCcw } from "../_libs/lucide-react.mjs";
import { f as format, a as fr, p as parseISO } from "../_libs/date-fns.mjs";
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
    import("./router-B380VHsD.mjs").then((n) => n.a0).then(({ getPhotoBlob }) => getPhotoBlob(photo)).then((b) => {
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
export {
  PhotoLightbox as P
};
