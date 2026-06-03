import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { listJournal, listBonsais } from "@/lib/db";
import { AppShell } from "@/components/app-shell";
import { SOINS, soinEmoji, soinLabel } from "@/lib/bonsai-meta";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal d'entretien — Bonsaï Studio" },
      { name: "description", content: "Historique chronologique de tous les soins apportés à votre collection de bonsaïs, filtrable par arbre et par type." },
      { property: "og:title", content: "Journal d'entretien — Bonsaï Studio" },
      { property: "og:description", content: "Historique des soins apportés à vos bonsaïs." },
      { property: "og:url", content: "/journal" },
    ],
  }),
  component: JournalPage,
});


function JournalPage() {
  const { data: entries = [] } = useQuery({ queryKey: ["journal"], queryFn: () => listJournal() });
  const { data: bonsais = [] } = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais });

  const [bFilter, setBFilter] = useState("");
  const [tFilter, setTFilter] = useState("");

  const filtered = useMemo(() => entries.filter((e) => {
    if (bFilter && e.bonsaiId !== bFilter) return false;
    if (tFilter && e.type !== tFilter) return false;
    return true;
  }), [entries, bFilter, tFilter]);

  // Group by month
  const grouped = useMemo(() => {
    const m = new Map<string, typeof entries>();
    filtered.forEach((e) => {
      const k = format(parseISO(e.date), "yyyy-MM");
      const arr = m.get(k) ?? [];
      arr.push(e);
      m.set(k, arr);
    });
    return Array.from(m.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  return (
    <AppShell>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Historique</p>
        <h1 className="mt-1 font-display text-4xl font-semibold">Journal d'entretien</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {entries.length} entrée{entries.length > 1 ? "s" : ""} dans votre carnet
        </p>
      </header>

      <div className="mb-6 flex flex-wrap gap-3">
        <select value={bFilter} onChange={(e) => setBFilter(e.target.value)} aria-label="Filtrer par bonsaï" className="h-11 rounded-full border border-input bg-card px-4 text-sm">
          <option value="">Tous les bonsaïs</option>
          {bonsais.map((b) => <option key={b.id} value={b.id}>{b.nom}</option>)}
        </select>
        <select value={tFilter} onChange={(e) => setTFilter(e.target.value)} aria-label="Filtrer par type de soin" className="h-11 rounded-full border border-input bg-card px-4 text-sm">
          <option value="">Tous les soins</option>
          {SOINS.map((s) => <option key={s.value} value={s.value}>{s.emoji} {s.label}</option>)}
        </select>
      </div>

      {grouped.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card/50 py-16 text-center">
          <BookOpen className="mx-auto h-10 w-10 text-muted-foreground" />
          <h2 className="mt-4 font-display text-2xl font-semibold">Journal vide</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Consignez vos soins depuis les fiches de vos bonsaïs.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {grouped.map(([month, items]) => (
            <section key={month}>
              <h2 className="mb-3 font-display text-xl font-semibold capitalize text-muted-foreground">
                {format(parseISO(`${month}-01`), "MMMM yyyy", { locale: fr })}
              </h2>
              <ul className="space-y-2">
                {items.map((e) => {
                  const b = bonsais.find((x) => x.id === e.bonsaiId);
                  return (
                    <li key={e.id} className="flex items-start gap-3 rounded-xl border border-border bg-card p-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-lg">
                        {soinEmoji(e.type)}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <div>
                            <span className="font-medium">{soinLabel(e.type)}</span>
                            {b && (
                              <Link to="/bonsai/$id" params={{ id: b.id }} className="ml-2 text-sm text-accent hover:underline">
                                {b.nom}
                              </Link>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {format(parseISO(e.date), "EEE d MMM", { locale: fr })}
                          </span>
                        </div>
                        {e.notes && <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">{e.notes}</p>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </AppShell>
  );
}
