import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
import { SOINS_SELECTABLE } from "@/lib/bonsai-meta";
import {
  saveJournal,
  deleteJournal,
  uid,
  type JournalEntry,
  type SoinType,
  type Bonsai,
} from "@/lib/supabase-data";

/**
 * Dialogue de création/édition d'une entrée de journal.
 *
 * IMPORTANT : contient la logique de sortie de collection
 * (isCollectionExit = type "don_vente" ou "mort"). Ne pas renommer ces deux
 * valeurs ni modifier cette condition sans vérifier unified-timeline.tsx et
 * les bonsaïs déjà marqués "sorti de la collection" en base.
 */
export function JournalEntryDialog({
  bonsaiId,
  bonsai,
  entry,
  open,
  onOpenChange,
  onUpdateBonsai,
}: {
  bonsaiId: string;
  bonsai: Bonsai;
  entry: JournalEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateBonsai: (b: Bonsai) => void;
}) {
  const qc = useQueryClient();
  const { confirm, dialog: confirmDialog } = useConfirm();

  const [journalType, setJournalType] = useState<SoinType>("rempotage");
  const [journalDate, setJournalDate] = useState(new Date().toISOString().slice(0, 10));
  const [journalNotes, setJournalNotes] = useState("");

  // Réinitialise le formulaire à chaque ouverture, selon qu'on édite ou crée.
  useEffect(() => {
    if (!open) return;
    if (entry) {
      setJournalType(entry.type);
      setJournalDate(entry.date.slice(0, 10));
      setJournalNotes(entry.notes || "");
    } else {
      setJournalType("rempotage");
      setJournalDate(new Date().toISOString().slice(0, 10));
      setJournalNotes("");
    }
  }, [open, entry]);

  const saveJournalEntry = async () => {
    if (journalType === "autre" && !journalNotes.trim()) {
      toast.error("Merci de préciser l'information dans le champ Notes pour le type « Autre ».");
      return;
    }

    const isCollectionExit = journalType === "don_vente" || journalType === "mort";
    let shouldUpdateStatus = false;

    // Si l'événement indique une sortie de collection, demander confirmation.
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

    if (entry) {
      await saveJournal({
        id: entry.id,
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

    // Mettre à jour le statut de l'arbre si confirmé.
    if (shouldUpdateStatus) {
      await onUpdateBonsai({ ...bonsai, dansCollection: false });
      toast.info("Arbre retiré de la collection");
    }

    qc.invalidateQueries({ queryKey: ["journal", bonsaiId] });
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{entry ? "Modifier l'entrée" : "Nouvelle entrée"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="journal-type" className="mb-1.5 block text-sm">
                Type d'événement
              </Label>
              <select
                id="journal-type"
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
              <Label htmlFor="journal-date" className="mb-1.5 block text-sm">
                Date
              </Label>
              <Input
                id="journal-date"
                type="date"
                value={journalDate}
                onChange={(e) => setJournalDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="journal-notes" className="mb-1.5 block text-sm">
                {journalType === "autre" ? "Précisez (obligatoire)" : "Notes (facultatif)"}
              </Label>
              <Textarea
                id="journal-notes"
                value={journalNotes}
                onChange={(e) => setJournalNotes(e.target.value)}
                rows={3}
                placeholder={
                  journalType === "autre" ? "Décrivez cet événement…" : "Observations, détails…"
                }
              />
            </div>
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
            {entry ? (
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
                      await deleteJournal(entry.id);
                      qc.invalidateQueries({ queryKey: ["journal", bonsaiId] });
                      onOpenChange(false);
                      toast.success("Entrée supprimée");
                    }
                  }}
                >
                  Supprimer
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Annuler
                  </Button>
                  <Button onClick={saveJournalEntry}>Mettre à jour</Button>
                </div>
              </>
            ) : (
              <>
                <div />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Annuler
                  </Button>
                  <Button onClick={saveJournalEntry}>Enregistrer</Button>
                </div>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {confirmDialog}
    </>
  );
}
