import { useCallback, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import type { Photo } from "@/lib/supabase-data";
import { useBlobUrl } from "@/lib/blob-url";

interface PhotoLightboxProps {
  photo: Photo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.4;

export function PhotoLightbox({ photo, open, onOpenChange }: PhotoLightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Gestes tactiles (pinch-to-zoom + pan).
  const touchState = useRef<{
    mode: "none" | "pan" | "pinch";
    startX: number;
    startY: number;
    startOffsetX: number;
    startOffsetY: number;
    startDist: number;
    startZoom: number;
  }>({
    mode: "none",
    startX: 0,
    startY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
    startDist: 0,
    startZoom: 1,
  });

  // Pan souris (drag).
  const panState = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    startOffsetX: number;
    startOffsetY: number;
  }>({
    active: false,
    startX: 0,
    startY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
  });

  // Récupération du blob pour l'affichage.
  const [blob, setBlob] = useState<Blob | undefined>(undefined);
  useEffect(() => {
    if (!open || !photo) {
      setBlob(undefined);
      return;
    }
    let cancelled = false;
    import("@/lib/supabase-data")
      .then(({ getPhotoBlob }) => getPhotoBlob(photo))
      .then((b) => {
        if (!cancelled) setBlob(b);
      })
      .catch(() => {
        if (!cancelled) setBlob(undefined);
      });
    return () => {
      cancelled = true;
    };
  }, [open, photo]);
  const url = useBlobUrl(blob);

  // Reset zoom/offset quand on change de photo ou qu'on ferme.
  useEffect(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, [photo, open]);

  const clampOffset = useCallback((x: number, y: number, z: number) => {
    if (!containerRef.current || !imgRef.current) return { x, y };
    const cw = containerRef.current.clientWidth;
    const ch = containerRef.current.clientHeight;
    const iw = imgRef.current.naturalWidth * z;
    const ih = imgRef.current.naturalHeight * z;
    // Si l'image est plus petite que le conteneur, on centre.
    const maxX = iw > cw ? (iw - cw) / 2 : 0;
    const maxY = ih > ch ? (ih - ch) / 2 : 0;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  }, []);

  const setZoomClamped = useCallback(
    (newZoom: number, centerOffsetX = 0, centerOffsetY = 0) => {
      const z = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
      setZoom(z);
      // Ajuste l'offset pour zoomer vers le centre du geste.
      setOffset((prev) => {
        const factor = z / (zoom || 1);
        return clampOffset(
          (prev.x - centerOffsetX) * factor + centerOffsetX,
          (prev.y - centerOffsetY) * factor + centerOffsetY,
          z,
        );
      });
    },
    [zoom, clampOffset],
  );

  const zoomIn = () => setZoomClamped(zoom + ZOOM_STEP);
  const zoomOut = () => setZoomClamped(zoom - ZOOM_STEP);
  const resetZoom = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  // Molette (desktop).
  const onWheel = (e: React.WheelEvent) => {
    if (!open) return;
    e.preventDefault();
    const delta = -e.deltaY * 0.0025;
    setZoomClamped(zoom + delta * 5);
  };

  // Pan souris (desktop).
  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    panState.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startOffsetX: offset.x,
      startOffsetY: offset.y,
    };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!panState.current.active) return;
    const dx = e.clientX - panState.current.startX;
    const dy = e.clientY - panState.current.startY;
    setOffset(
      clampOffset(panState.current.startOffsetX + dx, panState.current.startOffsetY + dy, zoom),
    );
  };
  const onMouseUp = () => {
    panState.current.active = false;
  };

  // Touch handlers (mobile) — pinch + pan.
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchState.current = {
        mode: "pan",
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        startOffsetX: offset.x,
        startOffsetY: offset.y,
        startDist: 0,
        startZoom: zoom,
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
        startZoom: zoom,
      };
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex h-[100vh] max-h-[100vh] w-[100vw] max-w-[100vw] flex-col gap-0 overflow-hidden rounded-none border-none bg-background/95 p-0 backdrop-blur-sm"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">Visionneuse de photo</DialogTitle>

        {/* Bouton fermer (haut droite) */}
        <Button
          variant="secondary"
          size="icon"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-20 h-10 w-10 rounded-full shadow-lg"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Boutons zoom (haut gauche) */}
        <div className="absolute left-4 top-4 z-20 flex gap-2 rounded-full bg-secondary/90 p-1.5 shadow-lg backdrop-blur">
          <Button
            variant="ghost"
            size="icon"
            onClick={zoomOut}
            disabled={zoom <= MIN_ZOOM}
            className="h-8 w-8 rounded-full"
            aria-label="Dézoomer"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={zoomIn}
            disabled={zoom >= MAX_ZOOM}
            className="h-8 w-8 rounded-full"
            aria-label="Zoomer"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetZoom}
            disabled={zoom === 1 && offset.x === 0 && offset.y === 0}
            className="h-8 w-8 rounded-full"
            aria-label="Réinitialiser le zoom"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Zone image */}
        <div
          ref={containerRef}
          className="relative flex flex-1 items-center justify-center overflow-hidden"
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            cursor: canPan ? (panState.current.active ? "grabbing" : "grab") : "default",
          }}
        >
          {url ? (
            <img
              ref={imgRef}
              src={url}
              alt={photo?.legende ?? ""}
              draggable={false}
              className="max-h-full max-w-full select-none object-contain transition-transform duration-100"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                transformOrigin: "center center",
                touchAction: "none",
              }}
            />
          ) : (
            <div className="text-sm text-muted-foreground">Chargement…</div>
          )}
        </div>

        {/* Bandeau bas : date + commentaire */}
        {photo && (photo.date || photo.legende) && (
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/60 to-transparent px-6 pb-8 pt-12 text-white">
            {photo.date && (
              <p className="text-xs font-medium uppercase tracking-wider text-white/80">
                {format(parseISO(photo.date), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
              </p>
            )}
            {photo.legende && (
              <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-white/95">
                {photo.legende}
              </p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
