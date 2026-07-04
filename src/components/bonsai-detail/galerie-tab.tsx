import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Camera,
  FolderOpen,
  MessageSquarePlus,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { AddPhotoDialog, useFileInput, type PhotoSource } from "@/components/add-photo-dialog";
import { PhotoLightbox } from "@/components/photo-lightbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useConfirm } from "@/components/confirm-dialog";
import { useBlobUrl } from "@/lib/blob-url";
import {
  deletePhoto,
  getPhotoBlob,
  savePhoto,
  uid,
  updatePhotoDate,
  updatePhotoLegende,
  type Photo,
} from "@/lib/supabase-data";

export function GalerieTab({
  bonsaiId,
  photos,
  mainId,
  onSetMain,
}: {
  bonsaiId: string;
  photos: Photo[];
  mainId?: string;
  onSetMain: (id: string) => void;
}) {
  const qc = useQueryClient();

  const cameraInput = useFileInput();
  const galleryInput = useFileInput();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSource, setDialogSource] = useState<PhotoSource>("camera");
  // Use a ref for the queue so onConfirm always reads the latest values without stale closures.
  const queueRef = useRef<File[]>([]);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [processedCount, setProcessedCount] = useState(0);

  const openCamera = () => {
    setDialogSource("camera");
    cameraInput.inputRef.current?.click();
  };
  const openGallery = () => {
    setDialogSource("gallery");
    galleryInput.inputRef.current?.click();
  };

  useEffect(() => {
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

  useEffect(() => {
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
    legende,
  }: {
    blob: Blob;
    date: string;
    legende: string;
  }) => {
    await savePhoto({
      id: uid(),
      bonsaiId,
      blob,
      date,
      legende: legende || undefined,
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
        `${total} photo${total > 1 ? "s" : ""} ajoutée${total > 1 ? "s" : ""}`,
      );
    }
  };

  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const { confirm, dialog: confirmDialog } = useConfirm();

  const remove = async (pid: string) => {
    const confirmed = await confirm({
      title: "Supprimer cette photo ?",
      destructive: true,
      confirmLabel: "Supprimer",
    });
    if (!confirmed) return;
    await deletePhoto(pid);
    qc.invalidateQueries({ queryKey: ["photos", bonsaiId] });
  };
  const updateLegende = async (p: Photo, legende: string) => {
    await updatePhotoLegende(p.id, legende || null);
    qc.invalidateQueries({ queryKey: ["photos", bonsaiId] });
  };
  const updateDate = async (p: Photo, date: string) => {
    await updatePhotoDate(p.id, date);
    qc.invalidateQueries({ queryKey: ["photos", bonsaiId] });
  };
  const [sortDesc, setSortDesc] = useState(true);
  const sorted = [...photos].sort((a, b) =>
    sortDesc ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
  );

  return (
    <div>
      <input
        ref={cameraInput.inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) cameraInput.setFile(f);
        }}
      />
      <input
        ref={galleryInput.inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            galleryInput.setFile(files[0]);
          }
        }}
      />

      <div className="mb-5 grid grid-cols-2 gap-3">
        <button
          onClick={openCamera}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-4 py-5 text-sm font-medium text-muted-foreground transition hover:border-accent/60 hover:text-foreground"
        >
          <Camera className="h-4 w-4" /> Appareil photo
        </button>
        <button
          onClick={openGallery}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-4 py-5 text-sm font-medium text-muted-foreground transition hover:border-accent/60 hover:text-foreground"
        >
          <FolderOpen className="h-4 w-4" /> Galerie
        </button>
      </div>

      {sorted.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Aucune photo pour l'instant. Documentez l'évolution de votre arbre.
        </p>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-end">
            <Button variant="outline" size="sm" onClick={() => setSortDesc((s) => !s)}>
              Date : {sortDesc ? "plus récentes d'abord" : "plus anciennes d'abord"}
            </Button>
          </div>
          <ol className="space-y-6 border-l border-border pl-6">
            {sorted.map((p) => (
              <PhotoTimeline
                key={p.id}
                p={p}
                isMain={p.id === mainId}
                onSetMain={() => onSetMain(p.id)}
                onDelete={() => remove(p.id)}
                onLegende={(t) => updateLegende(p, t)}
                onDate={(d) => updateDate(p, d)}
                onOpenLightbox={() => setLightboxPhoto(p)}
              />
            ))}
          </ol>
        </>
      )}

      <AddPhotoDialog
        open={dialogOpen}
        onOpenChange={(open) => {
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
                `${saved} photo${saved > 1 ? "s" : ""} ajoutée${saved > 1 ? "s" : ""}`,
              );
            }
          }
        }}
        source={dialogSource}
        file={currentFile}
        onConfirm={onConfirm}
        currentIndex={processedCount}
        totalCount={queueRef.current.length}
      />
      <PhotoLightbox
        photo={lightboxPhoto}
        open={!!lightboxPhoto}
        onOpenChange={(o) => {
          if (!o) setLightboxPhoto(null);
        }}
      />
      {confirmDialog}
    </div>
  );
}

function usePhotoUrl(photo: Photo): string | undefined {
  const [blob, setBlob] = useState<Blob | undefined>(undefined);
  const storagePath = photo?.storagePath;
  useEffect(() => {
    let cancelled = false;
    if (!storagePath) {
      setBlob(undefined);
      return;
    }
    getPhotoBlob({ storagePath })
      .then((b) => {
        if (!cancelled) setBlob(b);
      })
      .catch(() => {
        if (!cancelled) setBlob(undefined);
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
  onOpenLightbox,
}: {
  p: Photo;
  isMain: boolean;
  onSetMain: () => void;
  onDelete: () => void;
  onLegende: (t: string) => void | Promise<void>;
  onDate: (d: string) => void | Promise<void>;
  onOpenLightbox: () => void;
}) {
  const url = usePhotoUrl(p);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(p.legende ?? "");
  const [editingDate, setEditingDate] = useState(false);
  const save = async () => {
    await onLegende(draft.trim());
    setEditing(false);
    toast.success("Commentaire enregistré");
  };
  const saveDate = async (value: string) => {
    if (!value) return;
    const iso = new Date(value).toISOString();
    await onDate(iso);
    setEditingDate(false);
    toast.success("Date mise à jour");
  };
  return (
    <li className="relative">
      <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-background" />
      {editingDate ? (
        <div className="flex items-center gap-2">
          <Input
            type="date"
            defaultValue={p.date.slice(0, 10)}
            className="h-8 w-auto"
            autoFocus
            onBlur={(e) => saveDate(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveDate((e.target as HTMLInputElement).value);
              if (e.key === "Escape") setEditingDate(false);
            }}
          />
          <Button variant="ghost" size="sm" onClick={() => setEditingDate(false)}>
            Annuler
          </Button>
        </div>
      ) : (
        <button
          onClick={() => setEditingDate(true)}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
          title="Modifier la date"
        >
          <CalendarIcon className="h-3 w-3" />
          {format(parseISO(p.date), "d MMMM yyyy", { locale: fr })}
        </button>
      )}

      <div className="mt-2 overflow-hidden rounded-2xl border border-border bg-card">
        {url && (
          <img
            src={url}
            alt={p.legende ?? ""}
            loading="lazy"
            onClick={onOpenLightbox}
            className="max-h-96 w-full cursor-zoom-in object-contain transition hover:opacity-95"
            decoding="async"
          />
        )}
        <div className="space-y-2 p-3">
          {editing ? (
            <div className="space-y-2">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={2}
                placeholder="Votre commentaire sur cette photo…"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDraft(p.legende ?? "");
                    setEditing(false);
                  }}
                >
                  Annuler
                </Button>
                <Button size="sm" onClick={save}>
                  Enregistrer
                </Button>
              </div>
            </div>
          ) : p.legende ? (
            <button
              onClick={() => {
                setDraft(p.legende ?? "");
                setEditing(true);
              }}
              className="block w-full whitespace-pre-wrap rounded-md bg-secondary/40 px-3 py-2 text-left text-sm leading-relaxed text-foreground/90 hover:bg-secondary/60"
            >
              {p.legende}
            </button>
          ) : (
            <button
              onClick={() => {
                setDraft("");
                setEditing(true);
              }}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <MessageSquarePlus className="h-3.5 w-3.5" /> Ajouter un commentaire
            </button>
          )}
          <div className="flex items-center justify-between">
            {isMain ? (
              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                Photo principale
              </span>
            ) : (
              <Button variant="ghost" size="sm" onClick={onSetMain}>
                Définir comme principale
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              aria-label="Supprimer cette photo"
              onClick={onDelete}
              className="text-destructive hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}

// Default export pour import dynamique via React.lazy
export default GalerieTab;
