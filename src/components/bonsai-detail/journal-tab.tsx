import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SOINS, soinEmoji, soinLabel } from "@/lib/bonsai-meta";
import {
  deleteJournal,
  saveJournal,
  uid,
  type JournalEntry,
  type SoinType,
} from "@/lib/supabase-data";

export function JournalTab({
  bonsaiId,
  entries,
}: {
  bonsaiId: string;
  entries: JournalEntry[];
}) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [type, setType] = useState<SoinType>("arrosage");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");

  const add = async () => {
    await saveJournal({
      id: uid(),
      bonsaiId,
      type,
      date: new Date(date).toISOString(),
      notes: notes || undefined,
    });
    qc.invalidateQueries();
    setOpen(false);
    setNotes("");
    toast.success("Entrée ajoutée");
  };
  const remove = async (eid: string) => {
    await deleteJournal(eid);
    qc.invalidateQueries();
  };
  const edit = (e: JournalEntry) => {
    setEditingId(e.id);
    setType(e.type);
    setDate(e.date.slice(0, 10));
    setNotes(e.notes || "");
    setOpen(true);
  };
  const update = async () => {
    if (!editingId) return;
    await saveJournal({
      id: editingId,
      bonsaiId,
      type,
      date: new Date(date).toISOString(),
      notes: notes || undefined,
    });
    qc.invalidateQueries();
    setOpen(false);
    setEditingId(null);
    setNotes("");
    toast.success("Entrée mise à jour");
  };

  return (
    <div>
      {!open ? (
        <Button onClick={() => setOpen(true)} className="mb-5">
          <Plus className="mr-1.5 h-4 w-4" /> Nouvelle entrée
        </Button>
      ) : (
        <div className="mb-5 space-y-3 rounded-2xl border border-border bg-card p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label className="mb-1.5 block text-sm">Type de soin</Label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as SoinType)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {SOINS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.emoji} {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="mb-1.5 block text-sm">Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>
          <div>
            <Label className="mb-1.5 block text-sm">Notes (facultatif)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Observations, dosage, météo…"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setEditingId(null);
                setNotes("");
              }}
            >
              Annuler
            </Button>
            <Button onClick={editingId ? update : add}>
              {editingId ? "Mettre à jour" : "Enregistrer"}
            </Button>
          </div>
        </div>
      )}

      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Aucun entretien consigné. Notez votre prochain arrosage, taille ou rempotage.
        </p>
      ) : (
        <ul className="space-y-2">
          {entries.map((e) => (
            <li
              key={e.id}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-3 transition hover:bg-secondary/40"
              onClick={() => edit(e)}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-base">
                {soinEmoji(e.type)}
              </span>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-medium">{soinLabel(e.type)}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(parseISO(e.date), "d MMM yyyy", { locale: fr })}
                  </span>
                </div>
                {e.notes && (
                  <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
                    {e.notes}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(event) => {
                  event.stopPropagation();
                  remove(e.id);
                }}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default JournalTab;
