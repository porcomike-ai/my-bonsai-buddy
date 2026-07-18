import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Camera, FolderOpen } from "lucide-react";
import { toast } from "sonner";

import { AddPhotoDialog, useFileInput, type PhotoSource } from "@/components/add-photo-dialog";
import { savePhoto, uid } from "@/lib/supabase-data";

/**
 * Boutons "Photo" / "Galerie" + inputs fichiers cachés + dialogue de
 * confirmation, entièrement autonomes : gère lui-même la file d'attente de
 * photos, l'appel à savePhoto, et l'invalidation du cache React Query.
 *
 * Rendu comme un fragment (pas de wrapper), pour s'insérer directement dans
 * la grille de boutons du composant parent.
 */
export function PhotoUploadButtons({ bonsaiId }: { bonsaiId: string }) {
  const qc = useQueryClient();
  const cameraInput = useFileInput();
  const galleryInput = useFileInput();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSource, setDialogSource] = useState<PhotoSource>("camera");
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

  const onPhotoConfirm = async ({
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
      toast.success(`${total} photo${total > 1 ? "s" : ""} ajoutée${total > 1 ? "s" : ""}`);
    }
  };

  return (
    <>
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

      <button
        onClick={openCamera}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition hover:border-accent/60 hover:text-foreground"
      >
        <Camera className="h-4 w-4" /> Photo
      </button>
      <button
        onClick={openGallery}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition hover:border-accent/60 hover:text-foreground"
      >
        <FolderOpen className="h-4 w-4" /> Galerie
      </button>

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
              toast.success(`${saved} photo${saved > 1 ? "s" : ""} ajoutée${saved > 1 ? "s" : ""}`);
            }
          }
        }}
        source={dialogSource}
        file={currentFile}
        onConfirm={onPhotoConfirm}
        currentIndex={processedCount}
        totalCount={queueRef.current.length}
      />
    </>
  );
}
