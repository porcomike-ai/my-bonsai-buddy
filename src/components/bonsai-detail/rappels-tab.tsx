import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { addDays, format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, Check, Plus, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SOINS_SELECTABLE, soinEmoji, soinLabel } from "@/lib/bonsai-meta";
import {
  deleteJournal,
  deleteRappel,
  saveJournal,
  saveRappel,
  uid,
  type Rappel,
  type SoinType,
} from "@/lib/supabase-data";

export function RappelsTab({
  bonsaiId,
  rappels,
}: {
  bonsaiId: string;
  rappels: Rappel[];
}) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<SoinType>("rempotage");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [intervalle, setIntervalle] = useState("");

  const add = async () => {
    try {
      await saveRappel({
        id: uid(),
        bonsaiId,
        type,
        prochaineDate: new Date(date).toISOString(),
        intervalleJours: intervalle ? Number(intervalle) : undefined,
        actif: true,
      });
    } catch (e) {
      toast.error(
        "Échec de la création du rappel : " + (e instanceof Error ? e.message : "erreur inconnue"),
      );
      return;
    }
    qc.invalidateQueries({ queryKey: ["rappels"] });
    setOpen(false);
    setIntervalle("");
    toast.success("Rappel créé");
  };

  const markDone = async (r: Rappel) => {
    const journalId = uid();
    try {
      await saveJournal({
        id: journalId,
        bonsaiId,
        type: r.type,
        date: new Date().toISOString(),
        rappelId: r.id,
      });
    } catch (e) {
      toast.error(
        "Échec de l'enregistrement du soin : " +
          (e instanceof Error ? e.message : "erreur inconnue"),
      );
      return;
    }

    try {
      if (r.intervalleJours) {
        await saveRappel({
          ...r,
          prochaineDate: addDays(new Date(), r.intervalleJours).toISOString(),
        });
      } else {
        await saveRappel({ ...r, actif: false });
      }
    } catch (e) {
      // Le journal a déjà été enregistré à ce stade. On annule cette entrée
      // (rollback compensatoire, même principe que le rollback Storage dans
      // savePhoto — voir src/lib/supabase/photo.ts) pour ne pas laisser un
      // "soin" fantôme si l'utilisateur retente l'action en pensant que rien
      // n'a été fait.
      try {
        await deleteJournal(journalId);
        toast.error(
          "Échec de la mise à jour du rappel, le soin n'a pas été enregistré : " +
            (e instanceof Error ? e.message : "erreur inconnue"),
        );
      } catch {
        // Le rollback lui-même a échoué : le journal contient bien l'entrée
        // mais le rappel n'a pas été mis à jour. Ne surtout pas suggérer de
        // retenter (ça créerait un vrai doublon) — on informe explicitement.
        qc.invalidateQueries({ queryKey: ["journal"] });
        toast.error(
          "Le soin a été enregistré mais la mise à jour du rappel a échoué, et l'annulation automatique aussi. Vérifiez le journal avant de retenter.",
        );
      }
      return;
    }

    qc.invalidateQueries({ queryKey: ["rappels"] });
    qc.invalidateQueries({ queryKey: ["journal"] });
    toast.success("Soin effectué");
  };

  const remove = async (rid: string) => {
    try {
      await deleteRappel(rid);
    } catch (e) {
      toast.error(
        "Échec de la suppression : " + (e instanceof Error ? e.message : "erreur inconnue"),
      );
      return;
    }
    qc.invalidateQueries({ queryKey: ["rappels"] });
  };

  return (
    <div>
      {!open ? (
        <Button onClick={() => setOpen(true)} className="mb-5">
          <Plus className="mr-1.5 h-4 w-4" /> Nouveau rappel
        </Button>
      ) : (
        <div className="mb-5 space-y-3 rounded-2xl border border-border bg-card p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <Label className="mb-1.5 block text-sm">Type</Label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as SoinType)}
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
              <Label className="mb-1.5 block text-sm">Prochaine date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm">Répéter tous les (jours)</Label>
              <Input
                type="number"
                min={0}
                placeholder="ex. 2"
                value={intervalle}
                onChange={(e) => setIntervalle(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button onClick={add}>Créer le rappel</Button>
          </div>
        </div>
      )}

      {rappels.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Aucun rappel. Programmez par exemple un arrosage tous les 2 jours.
        </p>
      ) : (
        <ul className="space-y-2">
          {rappels.map((r) => (
            <li
              key={r.id}
              className={`flex items-center gap-3 rounded-xl border bg-card p-3 ${r.actif ? "border-border" : "border-border/40 opacity-60"}`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-base">
                {soinEmoji(r.type)}
              </span>
              <div className="flex-1">
                <div className="font-medium">{soinLabel(r.type)}</div>
                <div className="text-xs text-muted-foreground">
                  <CalendarIcon className="mr-1 inline h-3 w-3" />
                  {format(parseISO(r.prochaineDate), "EEEE d MMMM yyyy", { locale: fr })}
                  {r.intervalleJours ? ` · tous les ${r.intervalleJours} j` : ""}
                </div>
              </div>
              {r.actif && (
                <Button variant="outline" size="sm" onClick={() => markDone(r)}>
                  <Check className="mr-1 h-4 w-4" /> Fait
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => remove(r.id)}
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

export default RappelsTab;
