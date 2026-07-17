import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Camera,
  FolderOpen,
  MessageSquarePlus,
  Plus,
  X,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";

import { AddPhotoDialog, useFileInput, type PhotoSource } from "@/components/add-photo-dialog";
import { PhotoLightbox } from "@/components/photo-lightbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useConfirm } from "@/components/confirm-dialog";
import { useBlobUrl } from "@/lib/blob-url";
import {
  deletePhoto,
  getPhotoBlob,
  savePhoto,
  saveJournal,
  deleteJournal,
  uid,
  updatePhotoDate,
  updatePhotoLegende,
  type Photo,
  type JournalEntry,
  type SoinType,
  type Bonsai,
} from "@/lib/supabase-data";
import { SOINS_SELECTABLE, soinEmoji, soinLabel } from "@/lib/bonsai-meta";

type TimelineItem =
  | { kind: "photo"; data: Photo; dateKey: string }
  | { kind: "journal"; data: JournalEntry; dateKey: string };

function getDateKey(isoDate: string): string {
  return isoDate.slice(0, 10);
}

export function UnifiedTimeline({
  bonsaiId,
  bonsai,
  photos,
  entries,
  mainId,
  onSetMain,
  onUpdateBonsai,
}: {
  bonsaiId: string;
  bonsai: Bonsai;
  photos: Photo[];
  entries: JournalEntry[];
  mainId?: string;
  onSetMain: (id: string) => void;
  onUpdateBonsai: (b: Bonsai) => void;
}) {
  const qc = useQueryClient();
  const [sortDesc, setSortDesc] = useState(true);

  // Photo upload state
  const cameraInput = useFileInput();
  const galleryInput = useFileInput();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSource, setDialogSource] = useState<PhotoSource>("camera");
  const queueRef = useRef<File[]>([]);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [processedCount, setProcessedCount] = useState(0);

  // Journal edit modal state
  const [journalModalOpen, setJournalModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [journalType, setJournalType] = useState<SoinType>("rempotage");
  const [journalDate, setJournalDate] = useState(new Date().toISOString().slice(0, 10));
  const [journalNotes, setJournalNotes] = useState("");

  // Lightbox
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const { confirm, dialog: confirmDialog } = useConfirm();

  // Build merged timeline
  const timeline: TimelineItem[] = [
    ...photos.map((p) => ({ kind: "photo" as const, data: p, dateKey: getDateKey(p.date) })),
    ...entries.map((e) => ({ kind: "journal" as const, data: e, dateKey: getDateKey(e.date) })),
  ];

  // Sort by date (within same date, journal entries appear before photos)
  timeline.sort((a, b) => {
    const dateCompare = sortDesc
      ? b.dateKey.localeCompare(a.dateKey)
      : a.dateKey.localeCompare(b.dateKey);
    if (dateCompare !== 0) return dateCompare;
    // Same date: journal first, then photos
    if (a.kind === "journal" && b.kind === "photo") return -1;
    if (a.kind === "photo" && b.kind === "journal") return 1;
    // Both same kind: sort by exact timestamp
    const aTime = a.kind === "photo" ? a.data.date : a.data.date;
    const bTime = b.kind === "photo" ? b.data.date : b.data.date;
    return sortDesc ? bTime.localeCompare(aTime) : aTime.localeCompare(bTime);
  });

  // Group by date for display
  const groups: Map<string, TimelineItem[]> = new Map();
  for (const item of timeline) {
    const existing = groups.get(item.dateKey) ?? [];
    existing.push(item);
    groups.set(item.dateKey, existing);
  }

  // Photo upload handlers
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

  // Journal handlers
  const openNewJournal = () => {
    setEditingEntry(null);
    setJournalType("rempotage");
    setJournalDate(new Date().toISOString().slice(0, 10));
    setJournalNotes("");
    setJournalModalOpen(true);
  };

  const openEditJournal = (e: JournalEntry) => {
    setEditingEntry(e);
    setJournalType(e.type);
    setJournalDate(e.date.slice(0, 10));
    setJournalNotes(e.notes || "");
    setJournalModalOpen(true);
  };

  const saveJournalEntry = async () => {
    if (journalType === "autre" && !journalNotes.trim()) {
      toast.error("Merci de préciser l'information dans le champ Notes pour le type « Autre ».");
      return;
    }

    const isCollectionExit = journalType === "don_vente" || journalType === "mort";
    let shouldUpdateStatus = false;

    // Si l'événement indique une sortie de collection, demander confirmation
    if (isCollectionExit && bonsai.dansCollection !== false) {
      const confirmed = await confirm({
        title: "Cet arbre ne fait plus partie de votre collection ?",
        description:
          journalType === "mort"
            ? "Marquer cet arbre comme décédé le retirera de votre collection active."
            : "Ce bonsaï a été donné ou vendu. Voulez-vous le retirer de votre collection active ?",
        confirmLabel: "Oui, retirer",
        cancelLabel: "Non, garder",
        destructive: journalType === "mort",
      });
      shouldUpdateStatus = confirmed;
    }

    if (editingEntry) {
      await saveJournal({
        id: editingEntry.id,
        bonsaiId,
        type: journalType,
        date: new Date(journalDate).toISOString(),
        notes: journalNotes || undefined,
      });
      toast.success("Entrée mise à jour");
    } else {
      await saveJournal({
        id: uid(),
        bonsaiId,
        type: journalType,
        date: new Date(journalDate).toISOString(),
        notes: journalNotes || undefined,
      });
      toast.success("Entrée ajoutée");
    }

    // Mettre à jour le statut de l'arbre si confirmé
    if (shouldUpdateStatus) {
      await onUpdateBonsai({ ...bonsai, dansCollection: false });
      toast.info("Arbre retiré de la collection");
    }

    qc.invalidateQueries({ queryKey: ["journal", bonsaiId] });
    setJournalModalOpen(false);
    setEditingEntry(null);
  };

  const removeJournal = async (e: JournalEntry) => {
    const confirmed = await confirm({
      title: "Supprimer cette entrée ?",
      destructive: true,
      confirmLabel: "Supprimer",
    });
    if (!confirmed) return;
    await deleteJournal(e.id);
    qc.invalidateQueries({ queryKey: ["journal", bonsaiId] });
  };

  // Photo handlers
  const removePhoto = async (pid: string) => {
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

  return (
    <div>
      {/* Hidden file inputs */}
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

      {/* Action buttons */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
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
        <button
          onClick={openNewJournal}
          className="col-span-2 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition hover:border-accent/60 hover:text-foreground sm:col-span-1"
        >
          <Plus className="h-4 w-4" /> Entrée
        </button>
      </div>

      {/* Sort toggle */}
      {timeline.length > 0 && (
        <div className="mb-4 flex items-center justify-end">
          <Button variant="outline" size="sm" onClick={() => setSortDesc((s) => !s)}>
            <ArrowUpDown className="mr-1.5 h-3.5 w-3.5" />
            {sortDesc ? "Plus récentes d'abord" : "Plus anciennes d'abord"}
          </Button>
        </div>
      )}

      {/* Timeline */}
      {timeline.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Aucune photo ni entrée de journal. Documentez l'évolution de votre arbre.
        </p>
      ) : (
        <ol className="space-y-6 border-l border-border pl-6">
          {Array.from(groups.entries()).map(([dateKey, items]) => (
            <TimelineDateGroup
              key={dateKey}
              dateKey={dateKey}
              items={items}
              mainId={mainId}
              onSetMain={onSetMain}
              onPhotoDelete={removePhoto}
              onPhotoLegende={updateLegende}
              onPhotoDate={updateDate}
              onPhotoClick={setLightboxPhoto}
              onJournalEdit={openEditJournal}
              onJournalDelete={removeJournal}
            />
          ))}
        </ol>
      )}

      {/* Photo upload dialog */}
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

      {/* Journal edit modal */}
      <Dialog open={journalModalOpen} onOpenChange={setJournalModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingEntry ? "Modifier l'entrée" : "Nouvelle entrée"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="mb-1.5 block text-sm">Type d'événement</Label>
              <select
                value={journalType}
                onChange={(e) => setJournalType(e.target.value as SoinType)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {SOINS_SELECTABLE.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.emoji} {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="mb-1.5 block text-sm">Date</Label>
              <Input
                type="date"
                value={journalDate}
                onChange={(e) => setJournalDate(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm">
                {journalType === "autre" ? "Précisez (obligatoire)" : "Notes (facultatif)"}
              </Label>
              <Textarea
                value={journalNotes}
                onChange={(e) => setJournalNotes(e.target.value)}
                rows={3}
                placeholder={
                  journalType === "autre"
                    ? "Décrivez cet événement…"
                    : "Observations, détails…"
                }
              />
            </div>
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
            {editingEntry ? (
              <>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    const confirmed = await confirm({
                      title: "Supprimer cette entrée ?",
                      description: "Cette action est irréversible.",
                      destructive: true,
                      confirmLabel: "Supprimer",
                    });
                    if (confirmed) {
                      await deleteJournal(editingEntry.id);
                      qc.invalidateQueries({ queryKey: ["journal", bonsaiId] });
                      setJournalModalOpen(false);
                      setEditingEntry(null);
                      toast.success("Entrée supprimée");
                    }
                  }}
                >
                  Supprimer
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setJournalModalOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={saveJournalEntry}>Mettre à jour</Button>
                </div>
              </>
            ) : (
              <>
                <div />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setJournalModalOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={saveJournalEntry}>Enregistrer</Button>
                </div>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Lightbox */}
      <PhotoLightbox
        photo={lightboxPhoto}
        open={!!lightboxPhoto}
        onOpenChange={(o) => {
          if (!o) setLightboxPhoto(null);
        }}
      />

      {/* Confirm dialog */}
      {confirmDialog}
    </div>
  );
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
  onJournalDelete,
}: {
  dateKey: string;
  items: TimelineItem[];
  mainId?: string;
  onSetMain: (id: string) => void;
  onPhotoDelete: (id: string) => void;
  onPhotoLegende: (p: Photo, legende: string) => void;
  onPhotoDate: (p: Photo, date: string) => void;
  onPhotoClick: (p: Photo) => void;
  onJournalEdit: (e: JournalEntry) => void;
  onJournalDelete: (e: JournalEntry) => void;
}) {
  const dateLabel = format(parseISO(dateKey + "T00:00:00"), "d MMMM yyyy", { locale: fr });

  return (
    <li className="relative">
      <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-background" />
      <button className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground">
        <CalendarIcon className="h-3 w-3" />
        {dateLabel}
      </button>
      <div className="mt-3 space-y-4">
        {items.map((item) =>
          item.kind === "journal" ? (
            <JournalItem
              key={`journal-${item.data.id}`}
              entry={item.data}
              onEdit={() => onJournalEdit(item.data)}
              onDelete={() => onJournalDelete(item.data)}
            />
          ) : (
            <PhotoItem
              key={`photo-${item.data.id}`}
              photo={item.data}
              isMain={item.data.id === mainId}
              onSetMain={() => onSetMain(item.data.id)}
              onDelete={() => onPhotoDelete(item.data.id)}
              onLegende={(t) => onPhotoLegende(item.data, t)}
              onDate={(d) => onPhotoDate(item.data, d)}
              onClick={() => onPhotoClick(item.data)}
            />
          ),
        )}
      </div>
    </li>
  );
}

function JournalItem({
  entry,
  onEdit,
  onDelete,
}: {
  entry: JournalEntry;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      onClick={onEdit}
      className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-secondary/30 p-3 transition hover:bg-secondary/50"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-base">
        {soinEmoji(entry.type)}
      </span>
      <div className="flex-1">
        <span className="font-medium">{soinLabel(entry.type)}</span>
        {entry.notes && (
          <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">{entry.notes}</p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="shrink-0 text-muted-foreground hover:text-destructive"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

function PhotoItem({
  photo,
  isMain,
  onSetMain,
  onDelete,
  onLegende,
  onDate,
  onClick,
}: {
  photo: Photo;
  isMain: boolean;
  onSetMain: () => void;
  onDelete: () => void;
  onLegende: (t: string) => void;
  onDate: (d: string) => void;
  onClick: () => void;
}) {
  const url = usePhotoUrl(photo);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(photo.legende ?? "");
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
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {url && (
        <img
          src={url}
          alt={photo.legende ?? ""}
          loading="lazy"
          onClick={onClick}
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
                  setDraft(photo.legende ?? "");
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
        ) : photo.legende ? (
          <button
            onClick={() => {
              setDraft(photo.legende ?? "");
              setEditing(true);
            }}
            className="block w-full whitespace-pre-wrap rounded-md bg-secondary/40 px-3 py-2 text-left text-sm leading-relaxed text-foreground/90 hover:bg-secondary/60"
          >
            {photo.legende}
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

export default UnifiedTimeline;
