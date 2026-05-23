import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { listRappels, listBonsais, saveRappel, saveJournal, uid } from "@/lib/db";
import { AppShell } from "@/components/app-shell";
import { soinEmoji, soinLabel } from "@/lib/bonsai-meta";
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval,
  format, isSameMonth, isSameDay, parseISO, addMonths, subMonths, addDays,
} from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/calendrier")({
  head: () => ({
    meta: [
      { title: "Calendrier des soins — Bonsaï Studio" },
      { name: "description", content: "Calendrier mensuel des rappels d'entretien pour vos bonsaïs." },
    ],
  }),
  component: CalendrierPage,
});

function CalendrierPage() {
  const qc = useQueryClient();
  const [month, setMonth] = useState(() => new Date());
  const { data: rappels = [] } = useQuery({ queryKey: ["rappels"], queryFn: () => listRappels() });
  const { data: bonsais = [] } = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais });

  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });

  const byDay = new Map<string, typeof rappels>();
  rappels.filter((r) => r.actif).forEach((r) => {
    const k = format(parseISO(r.prochaineDate), "yyyy-MM-dd");
    const arr = byDay.get(k) ?? [];
    arr.push(r);
    byDay.set(k, arr);
  });

  const markDone = async (r: typeof rappels[number]) => {
    await saveJournal({ id: uid(), bonsaiId: r.bonsaiId, type: r.type, date: new Date().toISOString(), rappelId: r.id });
    if (r.intervalleJours) {
      await saveRappel({ ...r, prochaineDate: addDays(new Date(), r.intervalleJours).toISOString() });
    } else {
      await saveRappel({ ...r, actif: false });
    }
    qc.invalidateQueries();
    toast.success("Soin enregistré");
  };

  return (
    <AppShell>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Soins programmés</p>
          <h1 className="mt-1 font-display text-4xl font-semibold capitalize">
            {format(month, "MMMM yyyy", { locale: fr })}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setMonth(subMonths(month, 1))}><ChevronLeft className="h-4 w-4" /></Button>
          <Button variant="outline" onClick={() => setMonth(new Date())}>Aujourd'hui</Button>
          <Button variant="outline" size="icon" onClick={() => setMonth(addMonths(month, 1))}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </header>

      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="grid grid-cols-7 border-b border-border bg-secondary/40 text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {["lun", "mar", "mer", "jeu", "ven", "sam", "dim"].map((d) => (
            <div key={d} className="py-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((d) => {
            const k = format(d, "yyyy-MM-dd");
            const items = byDay.get(k) ?? [];
            const inMonth = isSameMonth(d, month);
            const today = isSameDay(d, new Date());
            return (
              <div
                key={k}
                className={cn(
                  "min-h-[110px] border-b border-r border-border p-2 text-left",
                  !inMonth && "bg-secondary/20 text-muted-foreground/60",
                )}
              >
                <div className={cn("mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium", today && "bg-accent text-accent-foreground")}>
                  {format(d, "d")}
                </div>
                <ul className="space-y-1">
                  {items.slice(0, 3).map((r) => {
                    const b = bonsais.find((x) => x.id === r.bonsaiId);
                    return (
                      <li key={r.id}>
                        <Link
                          to="/bonsai/$id"
                          params={{ id: r.bonsaiId }}
                          className="block truncate rounded-md bg-sage/25 px-1.5 py-0.5 text-[11px] text-forest hover:bg-sage/40"
                          title={`${soinLabel(r.type)} — ${b?.nom ?? ""}`}
                        >
                          {soinEmoji(r.type)} {b?.nom ?? "—"}
                        </Link>
                      </li>
                    );
                  })}
                  {items.length > 3 && <li className="text-[10px] text-muted-foreground">+ {items.length - 3}</li>}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 font-display text-2xl font-semibold">Rappels en cours</h2>
        {rappels.filter((r) => r.actif).length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucun rappel actif. Ajoutez-en depuis la fiche d'un bonsaï.</p>
        ) : (
          <ul className="space-y-2">
            {rappels.filter((r) => r.actif).map((r) => {
              const b = bonsais.find((x) => x.id === r.bonsaiId);
              return (
                <li key={r.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-base">{soinEmoji(r.type)}</span>
                  <div className="flex-1">
                    <div className="font-medium">{soinLabel(r.type)} — {b?.nom ?? "—"}</div>
                    <div className="text-xs text-muted-foreground">
                      {format(parseISO(r.prochaineDate), "EEEE d MMMM yyyy", { locale: fr })}
                      {r.intervalleJours ? ` · tous les ${r.intervalleJours} j` : ""}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => markDone(r)}><Check className="mr-1 h-4 w-4" /> Fait</Button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </AppShell>
  );
}
