import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  listBonsais,
  listAllPhotos,
  listJournal,
  listRappels,
  listPoteries,
  ageActuel,
} from "@/lib/supabase-data";
import { AppShell } from "@/components/app-shell";
import { ETAPES, STYLES, styleLabel, etapeLabel } from "@/lib/bonsai-meta";
import {
  ChartBar as BarChart3,
  Sprout,
  Camera,
  Euro,
  TrendingUp,
  Container,
  Calendar as CalendarIcon,
} from "lucide-react";
import { parseISO, differenceInDays } from "date-fns";

export const Route = createFileRoute("/statistiques")({
  head: () => ({
    meta: [
      { title: "Statistiques — Bonsaï Studio" },
      {
        name: "description",
        content:
          "Vue chiffrée de votre collection de bonsaïs : valeur estimée, répartition par style et étape, fréquence des soins.",
      },
      { property: "og:title", content: "Statistiques — Bonsaï Studio" },
      { property: "og:description", content: "Vue chiffrée de votre collection de bonsaïs." },
      { property: "og:url", content: "/statistiques" },
    ],
  }),
  component: StatistiquesPage,
});

async function loadAllJournal() {
  return listJournal();
}

function StatistiquesPage() {
  const { data: bonsais = [] } = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais });
  const { data: poteries = [] } = useQuery({ queryKey: ["poteries"], queryFn: listPoteries });
  const { data: photos = [] } = useQuery({ queryKey: ["photos-all"], queryFn: listAllPhotos });
  const { data: journal = [] } = useQuery({ queryKey: ["journal"], queryFn: loadAllJournal });
  const { data: rappels = [] } = useQuery({
    queryKey: ["rappels"],
    queryFn: () => listRappels(),
  });

  const stats = useMemo(() => {
    const actifs = bonsais.filter((b) => b.dansCollection ?? true);
    const sortis = bonsais.length - actifs.length;
    const totalPrix = actifs.reduce((s, b) => s + (b.prixAchat ?? 0), 0);
    const totalValeur = actifs.reduce((s, b) => s + (b.valeurEstimee ?? 0), 0);
    const plusValue = totalValeur - totalPrix;
    const ageMoyen = (() => {
      const ages = actifs.map((b) => ageActuel(b)).filter((a): a is number => a != null);
      if (!ages.length) return null;
      return Math.round(ages.reduce((s, a) => s + a, 0) / ages.length);
    })();
    const plusVieux = actifs
      .filter((b) => ageActuel(b) != null)
      .sort((a, b) => (ageActuel(b) ?? 0) - (ageActuel(a) ?? 0))[0];

    const parEtape = ETAPES.map((e) => ({
      ...e,
      count: actifs.filter((b) => (b.etape ?? "culture") === e.value).length,
    }));
    const parStyle = STYLES.map((s) => ({
      ...s,
      count: actifs.filter((b) => b.style === s.value).length,
    }))
      .filter((s) => s.count > 0)
      .sort((a, b) => b.count - a.count);

    const especesMap = new Map<string, number>();
    actifs.forEach((b) => especesMap.set(b.espece, (especesMap.get(b.espece) ?? 0) + 1));
    const topEspeces = [...especesMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

    // Activité 30 derniers jours
    const now = new Date();
    const journal30 = journal.filter((j) => differenceInDays(now, parseISO(j.date)) <= 30);
    const rappelsActifs = rappels.filter((r) => r.actif).length;

    return {
      total: bonsais.length,
      actifs: actifs.length,
      sortis,
      totalPhotos: photos.length,
      totalPoteries: poteries.length,
      totalPrix,
      totalValeur,
      plusValue,
      ageMoyen,
      plusVieux,
      parEtape,
      parStyle,
      topEspeces,
      journal30: journal30.length,
      rappelsActifs,
      totalJournal: journal.length,
    };
  }, [bonsais, poteries, photos, journal, rappels]);

  const maxStyle = Math.max(1, ...stats.parStyle.map((s) => s.count));
  const maxEtape = Math.max(1, ...stats.parEtape.map((e) => e.count));

  return (
    <AppShell>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Aperçu</p>
        <h1 className="mt-1 font-display text-4xl font-semibold">Statistiques</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Vue d'ensemble de votre collection ({stats.actifs} arbre{stats.actifs > 1 ? "s" : ""}{" "}
          actif{stats.actifs > 1 ? "s" : ""}).
        </p>
      </header>

      {bonsais.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card/50 py-16 text-center">
          <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground" />
          <h2 className="mt-4 font-display text-2xl font-semibold">Pas encore de données</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ajoutez votre premier bonsaï pour voir apparaître les statistiques.
          </p>
          <Link
            to="/collection"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Aller à la collection
          </Link>
        </div>
      ) : (
        <>
          <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <KPI
              icon={<Sprout className="h-4 w-4" />}
              label="Bonsaïs actifs"
              value={stats.actifs}
              hint={stats.sortis ? `+${stats.sortis} sortis` : undefined}
            />
            <KPI
              icon={<Container className="h-4 w-4" />}
              label="Poteries"
              value={stats.totalPoteries}
            />
            <KPI icon={<Camera className="h-4 w-4" />} label="Photos" value={stats.totalPhotos} />
            <KPI
              icon={<CalendarIcon className="h-4 w-4" />}
              label="Rappels actifs"
              value={stats.rappelsActifs}
            />
            <KPI
              icon={<Euro className="h-4 w-4" />}
              label="Prix d'achat"
              value={`${stats.totalPrix.toLocaleString("fr-FR")} €`}
            />
            <KPI
              icon={<TrendingUp className="h-4 w-4" />}
              label="Valeur estimée"
              value={`${stats.totalValeur.toLocaleString("fr-FR")} €`}
              hint={
                stats.plusValue !== 0
                  ? `${stats.plusValue > 0 ? "+" : ""}${stats.plusValue.toLocaleString("fr-FR")} €`
                  : undefined
              }
              hintPositive={stats.plusValue > 0}
              hintNegative={stats.plusValue < 0}
            />
          </section>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card title="Répartition par étape">
              <div className="space-y-3">
                {stats.parEtape.map((e) => (
                  <Bar key={e.value} label={e.label} count={e.count} max={maxEtape} />
                ))}
              </div>
            </Card>

            <Card title="Répartition par style">
              {stats.parStyle.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun style renseigné.</p>
              ) : (
                <div className="space-y-3">
                  {stats.parStyle.map((s) => (
                    <Bar
                      key={s.value}
                      label={styleLabel(s.value).split(" — ")[0]}
                      count={s.count}
                      max={maxStyle}
                    />
                  ))}
                </div>
              )}
            </Card>

            <Card title="Espèces les plus représentées">
              {stats.topEspeces.length === 0 ? (
                <p className="text-sm text-muted-foreground">—</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {stats.topEspeces.map(([nom, n]) => (
                    <li
                      key={nom}
                      className="flex items-center justify-between gap-3 border-b border-border/60 pb-1.5 last:border-none last:pb-0"
                    >
                      <span className="truncate italic">{nom}</span>
                      <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
                        {n}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card title="Activité &amp; ancienneté">
              <ul className="space-y-2 text-sm">
                <Row label="Soins (30 derniers jours)" value={stats.journal30} />
                <Row label="Entrées de journal au total" value={stats.totalJournal} />
                <Row
                  label="Âge moyen"
                  value={stats.ageMoyen != null ? `${stats.ageMoyen} ans` : "—"}
                />
                <Row
                  label="Plus vieux bonsaï"
                  value={
                    stats.plusVieux ? (
                      <Link
                        to="/bonsai/$id"
                        params={{ id: stats.plusVieux.id }}
                        className="text-accent hover:underline"
                      >
                        {stats.plusVieux.nom} ({ageActuel(stats.plusVieux)} ans)
                      </Link>
                    ) : (
                      "—"
                    )
                  }
                />
                <Row
                  label="Étape majoritaire"
                  value={(() => {
                    const top = [...stats.parEtape].sort((a, b) => b.count - a.count)[0];
                    return top && top.count > 0 ? `${etapeLabel(top.value)} (${top.count})` : "—";
                  })()}
                />
              </ul>
            </Card>
          </div>
        </>
      )}
    </AppShell>
  );
}

function KPI({
  icon,
  label,
  value,
  hint,
  hintPositive,
  hintNegative,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  hint?: string;
  hintPositive?: boolean;
  hintNegative?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-2 font-display text-2xl font-semibold">{value}</div>
      {hint && (
        <div
          className={`mt-0.5 text-xs ${hintPositive ? "text-emerald-600" : hintNegative ? "text-destructive" : "text-muted-foreground"}`}
        >
          {hint}
        </div>
      )}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Bar({ label, count, max }: { label: string; count: number; max: number }) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="truncate">{label}</span>
        <span className="text-muted-foreground">{count}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <li className="flex items-center justify-between gap-3 border-b border-border/60 pb-1.5 last:border-none last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </li>
  );
}
