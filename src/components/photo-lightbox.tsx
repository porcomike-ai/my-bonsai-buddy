import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Columns2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import type { Photo } from "@/lib/supabase-data";
import { useBlobUrl } from "@/lib/blob-url";
import { cn } from "@/lib/utils";

interface PhotoLightboxProps {
  photo: Photo | null;
  /** Liste complète pour navigation + mode comparaison */
  photos?: Photo[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.4;

function usePhotoUrl(photo: Photo | null | undefined, open: boolean) {
  const [blob, setBlob] = useState<Blob | undefined>(undefined);
  useEffect(() => {
    if (!open || !photo) {
      setBlob(undefined);
      return;
    }
    let cancelled = false;
    import("@/lib/photo-cache")
      .then(({ getCachedPhotoBlob }) => getCachedPhotoBlob(photo))
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
  onClick,
}: {
  url: string | undefined;
  alt: string;
  zoom: number;
  offset: { x: number; y: number };
  isPanning: boolean;
  canPan: boolean;
  imgRef: React.RefObject<HTMLImageElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onWheel: (e: React.WheelEvent) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      ref={containerRef}
      className="relative flex h-full flex-1 items-center justify-center overflow-hidden"
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onPointerDown={onPointerDown}
      onClick={onClick}
      style={{
        cursor: isPanning ? "grabbing" : canPan ? "zoom-out" : "pointer",
      }}
    >
      {url ? (
        <img
          ref={imgRef}
          src={url}
          alt={alt}
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
  );
}

export function PhotoLightbox({ photo, photos = [], open, onOpenChange }: PhotoLightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isPanning, setIsPanning] = useState(false);

  // Mode comparaison
  const [compareMode, setCompareMode] = useState(false);
  const [comparePhoto, setComparePhoto] = useState<Photo | null>(null);
  const [splitPct, setSplitPct] = useState(50);

  // Index courant dans la liste (navigation)
  const sortedPhotos = useMemo(() => {
    if (!photos.length) return photo ? [photo] : [];
    return [...photos].sort((a, b) => a.date.localeCompare(b.date));
  }, [photos, photo]);

  const currentIndex = useMemo(() => {
    if (!photo) return -1;
    return sortedPhotos.findIndex((p) => p.id === photo.id);
  }, [sortedPhotos, photo]);

  const goPrev = () => {
    if (currentIndex > 0) {
      const prev = sortedPhotos[currentIndex - 1];
      // Navigation via callback externe n'existe pas — on met à jour via parent
      // En pratique le parent contrôle `photo`. On expose un pattern interne :
      // on garde un state local override si photos[] est fourni.
      setLocalPhoto(prev);
    }
  };
  const goNext = () => {
    if (currentIndex >= 0 && currentIndex < sortedPhotos.length - 1) {
      setLocalPhoto(sortedPhotos[currentIndex + 1]);
    }
  };

  const [localPhoto, setLocalPhoto] = useState<Photo | null>(null);
  useEffect(() => {
    setLocalPhoto(photo);
  }, [photo]);

  const activePhoto = localPhoto ?? photo;
  const url = usePhotoUrl(activePhoto, open);
  const compareUrl = usePhotoUrl(comparePhoto, open && compareMode);

  const CLICK_DRAG_THRESHOLD_PX = 5;
  const DOUBLE_CLICK_WINDOW_MS = 250;
  const clickStartRef = useRef<{ x: number; y: number } | null>(null);
  const pendingCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelPendingClose = useCallback(() => {
    if (pendingCloseTimer.current) {
      clearTimeout(pendingCloseTimer.current);
      pendingCloseTimer.current = null;
    }
  }, []);

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

  useEffect(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    if (!open) {
      setCompareMode(false);
      setComparePhoto(null);
      setSplitPct(50);
    }
    return () => cancelPendingClose();
  }, [activePhoto, open, cancelPendingClose]);

  const clampOffset = useCallback((x: number, y: number, z: number) => {
    if (!containerRef.current || !imgRef.current) return { x, y };
    const cw = containerRef.current.clientWidth;
    const ch = containerRef.current.clientHeight;
    const iw = imgRef.current.naturalWidth * z;
    const ih = imgRef.current.naturalHeight * z;
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

  const onWheel = (e: React.WheelEvent) => {
    if (!open || compareMode) return;
    e.preventDefault();
    const delta = -e.deltaY * 0.0025;
    setZoomClamped(zoom + delta * 5);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1 || compareMode) return;
    setIsPanning(true);
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
    setIsPanning(false);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (compareMode) return;
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
        startZoom: zoom,
      };
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
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

  const onContainerPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    clickStartRef.current = e.isPrimary ? { x: e.clientX, y: e.clientY } : null;
  };

  const onContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
    // Propose la photo la plus ancienne différente comme comparaison par défaut
    const other =
      sortedPhotos.find((p) => p.id !== activePhoto?.id) ??
      sortedPhotos[0] ??
      null;
    setComparePhoto(other);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const formatDate = (iso?: string) => {
    if (!iso) return "";
    try {
      return format(parseISO(iso), "d MMM yyyy", { locale: fr });
    } catch {
      return iso.slice(0, 10);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex h-[100vh] max-h-[100vh] w-[100vw] max-w-[100vw] flex-col gap-0 overflow-hidden rounded-none border-none bg-background/95 p-0 backdrop-blur-sm"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">Visionneuse de photo</DialogTitle>

        {/* Toolbar haut */}
        <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between gap-2">
          <div className="flex gap-2 rounded-full bg-secondary/90 p-1.5 shadow-lg backdrop-blur">
            {!compareMode && (
              <>
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
              </>
            )}
            {canCompare && (
              <Button
                variant={compareMode ? "default" : "ghost"}
                size="sm"
                onClick={toggleCompare}
                className="h-8 rounded-full px-3 text-xs font-semibold"
                aria-label={compareMode ? "Quitter la comparaison" : "Comparer avant/après"}
              >
                <Columns2 className="mr-1.5 h-3.5 w-3.5" />
                {compareMode ? "Quitter" : "Comparer"}
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!compareMode && sortedPhotos.length > 1 && (
              <div className="flex gap-1 rounded-full bg-secondary/90 p-1 shadow-lg backdrop-blur">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goPrev}
                  disabled={currentIndex <= 0}
                  className="h-8 w-8 rounded-full"
                  aria-label="Photo précédente"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="flex items-center px-1 text-[11px] font-medium text-muted-foreground">
                  {currentIndex + 1}/{sortedPhotos.length}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goNext}
                  disabled={currentIndex < 0 || currentIndex >= sortedPhotos.length - 1}
                  className="h-8 w-8 rounded-full"
                  aria-label="Photo suivante"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-10 w-10 rounded-full shadow-lg"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Zone image */}
        {compareMode && comparePhoto ? (
          <div className="relative flex flex-1 flex-col overflow-hidden pt-16">
            {/* Split view */}
            <div className="relative flex min-h-0 flex-1">
              <div className="relative h-full overflow-hidden" style={{ width: `${splitPct}%` }}>
                {url ? (
                  <img
                    src={url}
                    alt={activePhoto?.legende ?? "Avant"}
                    className="h-full w-full object-contain"
                    draggable={false}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Chargement…
                  </div>
                )}
                <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                  {formatDate(activePhoto?.date)} · Actuelle
                </div>
              </div>
              <div
                className="relative h-full flex-1 overflow-hidden border-l border-white/20"
              >
                {compareUrl ? (
                  <img
                    src={compareUrl}
                    alt={comparePhoto.legende ?? "Comparaison"}
                    className="h-full w-full object-contain"
                    draggable={false}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Chargement…
                  </div>
                )}
                <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                  {formatDate(comparePhoto.date)} · Comparaison
                </div>
              </div>
            </div>

            {/* Slider de répartition */}
            <div className="flex items-center gap-3 px-6 py-3">
              <span className="text-[11px] text-muted-foreground">Répartition</span>
              <input
                type="range"
                min={20}
                max={80}
                value={splitPct}
                onChange={(e) => setSplitPct(Number(e.target.value))}
                className="h-1.5 flex-1 cursor-pointer accent-[var(--color-accent)]"
                aria-label="Répartition avant/après"
              />
            </div>

            {/* Filmstrip sélection photo de comparaison */}
            <div className="border-t border-border bg-card/80 px-4 py-3">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Choisir la photo de comparaison
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {sortedPhotos
                  .filter((p) => p.id !== activePhoto?.id)
                  .map((p) => (
                    <CompareThumb
                      key={p.id}
                      photo={p}
                      selected={comparePhoto?.id === p.id}
                      onSelect={() => setComparePhoto(p)}
                    />
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <SinglePane
              url={url}
              alt={activePhoto?.legende ?? ""}
              zoom={zoom}
              offset={offset}
              isPanning={isPanning}
              canPan={canPan}
              imgRef={imgRef}
              containerRef={containerRef}
              onWheel={onWheel}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onPointerDown={onContainerPointerDown}
              onClick={onContainerClick}
            />

            {activePhoto && (activePhoto.date || activePhoto.legende) && (
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/60 to-transparent px-6 pb-8 pt-12 text-white">
                {activePhoto.date && (
                  <p className="text-xs font-medium uppercase tracking-wider text-white/80">
                    {format(parseISO(activePhoto.date), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                  </p>
                )}
                {activePhoto.legende && (
                  <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-white/95">
                    {activePhoto.legende}
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CompareThumb({
  photo,
  selected,
  onSelect,
}: {
  photo: Photo;
  selected: boolean;
  onSelect: () => void;
}) {
  const url = usePhotoUrl(photo, true);
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition",
        selected ? "border-accent ring-2 ring-accent/30" : "border-transparent opacity-70 hover:opacity-100",
      )}
    >
      {url ? (
        <img src={url} alt="" className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="h-full w-full bg-muted" />
      )}
    </button>
  );
}
