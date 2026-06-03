import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { listBonsais, listRappels, listJournal, listPoteries } from "@/lib/db";
import { AppShell } from "@/components/app-shell";
import { BonsaiPhoto } from "@/components/bonsai-photo";
import { soinEmoji, soinLabel, styleLabel } from "@/lib/bonsai-meta";
import { format, parseISO, isAfter, isBefore, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { Sprout, Container, Bell, BookOpen, Plus, ArrowRight, CalendarDays } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — Bonsaï Studio" },
      { name: "description", content: "Vue d'ensemble de votre collection de bonsaïs : prochains soins, rappels en retard et derniers arbres ajoutés." },
      { property: "og:title", content: "Tableau de bord — Bonsaï Studio" },
      { property: "og:description", content: "Vue d'ensemble de votre collection de bonsaïs et des prochains soins." },
      { property: "og:url", content: "/" },
    ],
  }),
  component: Dashboard,
});


function Dashboard() {
  const bonsais = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais });
  const rappels = useQuery({ queryKey: ["rappels"], queryFn: () => listRappels() });
  const journal = useQuery({ queryKey: ["journal"], queryFn: () => listJournal() });
  const poteries = useQuery({ queryKey: ["poteries"], queryFn: listPoteries });

  const now = new Date();
  const in7 = addDays(now, 7);
  const aVenir = (rappels.data ?? [])
    .filter((r) => r.actif && isBefore(parseISO(r.prochaineDate), in7))
    .slice(0, 6);
  const enRetard = (rappels.data ?? []).filter(
    (r) => r.actif && isAfter(now, parseISO(r.prochaineDate)),
  );
  const dernierAjouts = (bonsais.data ?? [])
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 4);

  const empty = (bonsais.data?.length ?? 0) === 0;

  return (
    <AppShell>
      <section className="mb-10">
        <div className="flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-forest via-forest to-sage/80 p-8 text-primary-foreground md:flex-row md:items-end md:justify-between md:p-12">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.22em] text-primary-foreground/70">
              Carnet · {format(now, "EEEE d MMMM", { locale: fr })}
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight md:text-5xl">
              Bonjour. Vos arbres vous attendent.
            </h1>
            <p className="mt-3 max-w-md text-sm text-primary-foreground/80 md:text-base">
              Un espace calme pour observer, soigner et faire grandir votre collection au fil des saisons.
            </p>
          </div>
          <Link
            to="/bonsai/nouveau"
            className="inline-flex items-center gap-2 self-start rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-forest/30 transition hover:brightness-105 md:self-end"
          >
            <Plus className="h-4 w-4" /> Ajouter un bonsaï
          </Link>
        </div>
      </section>

      <section className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={<Sprout className="h-4 w-4" />} label="Bonsaïs" value={bonsais.data?.length ?? 0} to="/collection" />
        <StatCard icon={<Container className="h-4 w-4" />} label="Poteries" value={poteries.data?.length ?? 0} to="/poteries" />
        <StatCard
          icon={<Bell className="h-4 w-4" />}
          label="Rappels actifs"
          value={(rappels.data ?? []).filter((r) => r.actif).length}
          to="/calendrier"
          highlight={enRetard.length > 0 ? `${enRetard.length} en retard` : undefined}
        />
        <StatCard icon={<BookOpen className="h-4 w-4" />} label="Entrées journal" value={journal.data?.length ?? 0} to="/journal" />
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <SectionHeader title="Soins à venir" subtitle="7 prochains jours" link={{ to: "/calendrier", label: "Voir le calendrier" }} />
          {aVenir.length === 0 ? (
            <EmptyBox icon={<CalendarDays className="h-5 w-5" />}>
              Aucun soin programmé pour cette semaine. Ajoutez un rappel depuis une fiche bonsaï.
            </EmptyBox>
          ) : (
            <ul className="space-y-2">
              {aVenir.map((r) => {
                const b = bonsais.data?.find((x) => x.id === r.bonsaiId);
                return (
                  <li key={r.id}>
                    <Link
                      to="/bonsai/$id"
                      params={{ id: r.bonsaiId }}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-3 transition hover:border-accent/50 hover:shadow-sm"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-lg">
                        {soinEmoji(r.type)}
                      </span>
                      <div className="flex-1">
                        <div className="font-medium">{soinLabel(r.type)} — {b?.nom ?? "—"}</div>
                        <div className="text-xs text-muted-foreground">
                          {format(parseISO(r.prochaineDate), "EEEE d MMMM", { locale: fr })}
                          {r.intervalleJours ? ` · tous les ${r.intervalleJours} j` : ""}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section>
          <SectionHeader title="Derniers ajouts" link={{ to: "/collection", label: "Collection" }} />
          {empty ? (
            <EmptyBox icon={<Sprout className="h-5 w-5" />}>
              Votre collection est vide. Commencez en ajoutant votre premier bonsaï.
            </EmptyBox>
          ) : (
            <ul className="grid grid-cols-2 gap-3">
              {dernierAjouts.map((b) => (
                <li key={b.id}>
                  <Link
                    to="/bonsai/$id"
                    params={{ id: b.id }}
                    className="group block overflow-hidden rounded-2xl border border-border bg-card transition hover:border-accent/50"
                  >
                    <div className="aspect-square w-full overflow-hidden">
                      <BonsaiPhoto photoId={b.photoPrincipale} className="h-full w-full object-cover transition group-hover:scale-105" />
                    </div>
                    <div className="p-3">
                      <div className="truncate font-display text-sm font-semibold">{b.nom}</div>
                      <div className="truncate text-[11px] uppercase tracking-wider text-muted-foreground">
                        {styleLabel(b.style).split(" — ")[0]}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppShell>
  );
}

function StatCard({
  icon, label, value, to, highlight,
}: {
  icon: React.ReactNode; label: string; value: number; to: string; highlight?: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-border bg-card p-5 transition hover:border-accent/50 hover:shadow-sm"
    >
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-foreground">{icon}</span>
        <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className="mt-3 font-display text-3xl font-semibold text-foreground">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      {highlight && (
        <div className="mt-2 inline-flex rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-medium text-destructive">
          {highlight}
        </div>
      )}
    </Link>
  );
}

function SectionHeader({
  title, subtitle, link,
}: { title: string; subtitle?: string; link?: { to: string; label: string } }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <h2 className="font-display text-2xl font-semibold">{title}</h2>
        {subtitle && <p className="text-xs uppercase tracking-wider text-muted-foreground">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link.to} className="text-sm font-medium text-accent hover:underline">
          {link.label} →
        </Link>
      )}
    </div>
  );
}

function EmptyBox({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 px-5 py-6 text-sm text-muted-foreground">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground">{icon}</span>
      <p>{children}</p>
    </div>
  );
}
