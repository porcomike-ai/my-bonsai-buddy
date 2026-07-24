import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, MessageSquarePlus, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useBlobUrl } from "@/lib/blob-url";
import { getCachedPhotoBlob } from "@/lib/photo-cache";
import { soinEmoji, soinLabel } from "@/lib/bonsai-meta";
import type { Photo, JournalEntry } from "@/lib/supabase-data";

export type TimelineItem =
  | { kind: "photo"; data: Photo; dateKey: string }
  | { kind: "journal"; data: JournalEntry; dateKey: string };

export function TimelineDateGroup({
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

  const save = async () => {
    await onLegende(draft.trim());
    setEditing(false);
    toast.success("Commentaire enregistré");
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
    getCachedPhotoBlob({ storagePath, poterieId: photo.poterieId })
      .then((b) => {
        if (!cancelled) setBlob(b);
      })
      .catch(() => {
        if (!cancelled) setBlob(undefined);
      });
    return () => {
      cancelled = true;
    };
  }, [storagePath, photo.poterieId]);
  return useBlobUrl(blob);
}
