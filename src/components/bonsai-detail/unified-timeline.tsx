import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, ArrowUpDown } from "lucide-react";

import { PhotoLightbox } from "@/components/photo-lightbox";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/components/confirm-dialog";
import { invalidateCachedPhoto } from "@/lib/photo-cache";
import {
  deletePhoto,
  deleteJournal,
  updatePhotoDate,
  updatePhotoLegende,
  type Photo,
  type JournalEntry,
  type Bonsai,
} from "@/lib/supabase-data";

import { PhotoUploadButtons } from "@/components/bonsai-detail/photo-upload-buttons";
import { JournalEntryDialog } from "@/components/bonsai-detail/journal-entry-dialog";
import { TimelineDateGroup, type TimelineItem } from "@/components/bonsai-detail/timeline-items";

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

  // Journal edit modal state
  const [journalModalOpen, setJournalModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

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
    return sortDesc ? b.data.date.localeCompare(a.data.date) : a.data.date.localeCompare(b.data.date);
  });

  // Group by date for display
  const groups: Map<string, TimelineItem[]> = new Map();
  for (const item of timeline) {
    const existing = groups.get(item.dateKey) ?? [];
    existing.push(item);
    groups.set(item.dateKey, existing);
  }

  const openNewJournal = () => {
    setEditingEntry(null);
    setJournalModalOpen(true);
  };

  const openEditJournal = (e: JournalEntry) => {
    setEditingEntry(e);
    setJournalModalOpen(true);
  };

  // Suppression rapide depuis la liste (icône), distincte du bouton
  // "Supprimer" à l'intérieur de la modale d'édition.
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
    const target = photos.find((p) => p.id === pid);
    await deletePhoto(pid);
    invalidateCachedPhoto(target?.storagePath);
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
      {/* Action buttons */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <PhotoUploadButtons bonsaiId={bonsaiId} />
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

      {/* Journal edit modal */}
      <JournalEntryDialog
        bonsaiId={bonsaiId}
        bonsai={bonsai}
        entry={editingEntry}
        open={journalModalOpen}
        onOpenChange={setJournalModalOpen}
        onUpdateBonsai={onUpdateBonsai}
      />

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

export default UnifiedTimeline;
