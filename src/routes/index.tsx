import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  listBonsais,
  listRappels,
  listJournal,
  listPoteries,
  listAllPhotos,
  saveJournal,
  saveRappel,
  deleteJournal,
  uid,
  type Rappel,
  type Bonsai,
  type JournalEntry,
  type Photo,
} from "@/lib/supabase-data";
import { AppShell } from "@/components/app-shell";
import { BonsaiPhoto } from "@/components/bonsai-photo";
import { StatusBadge, etapeToVariant } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { soinEmoji, soinLabel, styleLabel, etapeLabel } from "@/lib/bonsai-meta";
import {
  format,
  parseISO,
  isAfter,
  isBefore,
  addDays,
  startOfDay,
  differenceInDays,
  isSameDay,
} from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import {
  Sprout,
  Bell,
  BookOpen,
  Plus,
  ArrowRight,
  CalendarDays,
  Camera,
  Check,
  AlertTriangle,
  Star,
  Leaf,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — Bonsaï Studio" },
      {
        name: "description",
        content:
          "Vue d'ensemble de votre collection de bonsaïs : prochains soins, rappels en retard et derniers arbres ajoutés.",
      },
      { property: "og:title", content: "Tableau de bord — Bonsaï Studio" },
      {
        property: "og:description",
        content: "Vue d'ensemble de votre collection de bonsaïs et des prochains soins.",
      },
      { property: "og:url", content: "/" },
    ],
  }),
  component: Dashboard,
});

/** Message hero selon la saison et l’état des rappels. */
function heroCopy(now: Date, overdueCount: number, dueTodayCount: number): {
  title: string;
  subtitle: string;
} {
  const month = now.getMonth(); // 0–11
  let seasonal: string;
  if (month >= 2 && month <= 4) {
    seasonal =
      "Printemps : période idéale pour observer les bourgeons et planifier les rempotages.";
  } else if (month >= 5 && month <= 7) {
    seasonal =
      "Été : surveillez l’arrosage et l’exposition. Vos arbres sont en pleine croissance.";
  } else if (month >= 8 && month <= 10) {
    seasonal =
      "Automne : couleurs, dernière fertilisation, et préparation au repos hivernal.";
  } else {
    seasonal =
      "Hiver : respectez le repos végétatif. Moins d’interventions, plus d’observation.";
  }

  if (overdueCount > 0) {
    return {
      title:
        overdueCount === 1
          ? "1 rappel en retard demande votre attention."
          : `${overdueCount} rappels en retard demandent votre attention.`,
      subtitle: seasonal,
    };
  }
  if (dueTodayCount > 0) {
    return {
      title:
        dueTodayCount === 1
          ? "1 soin est prévu pour aujourd’hui."
          : `${dueTodayCount} soins sont prévus pour aujourd’hui.`,
      subtitle: seasonal,
    };
  }
  return {
    title: "Tout est à jour. Profitez de vos arbres.",
    subtitle: seasonal,
  };
}

function Dashboard() {
  const qc = useQueryClient();
  const [fabOpen, setFabOpen] = useState(false);

  const bonsaisQ = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais });
  const rappelsQ = useQuery({ queryKey: ["rappels"], queryFn: () => listRappels() });
  const journalQ = useQuery({ queryKey: ["journal"], queryFn: () => listJournal() });
  const poteriesQ = useQuery({ queryKey: ["poteries"], queryFn: listPoteries });
  const photosQ = useQuery({ queryKey: ["photos-all"], queryFn: listAllPhotos });

  const bonsais = bonsaisQ.data ?? [];
  const rappels = rappelsQ.data ?? [];
  const journal = journalQ.data ?? [];
  const poteries = poteriesQ.data ?? [];
  const photos = photosQ.data ?? [];

  const now = new Date();
  const today = startOfDay(now);
  const in7 = addDays(today, 7);
  const weekAgo = addDays(today, -7);

  const bonsaiById = useMemo(() => {
    const m = new Map<string, Bonsai>();
    bonsais.forEach((b) => m.set(b.id, b));
    return m;
  }, [bonsais]);

  const actifs = useMemo(
    () => bonsais.filter((b) => b.dansCollection ?? true),
    [bonsais],
  );

  const enRetard = useMemo(
    () =>
      rappels
        .filter((r) => r.actif && isAfter(today, startOfDay(parseISO(r.prochaineDate))))
        .sort((a, b) => a.prochaineDate.localeCompare(b.prochaineDate)),
    [rappels, today],
  );

  const dusAujourdhui = useMemo(
    () =>
      rappels.filter(
        (r) => r.actif && isSameDay(parseISO(r.prochaineDate), today),
      ),
    [rappels, today],
  );

  const aVenirSemaine = useMemo(
    () =>
      rappels
        .filter((r) => {
          if (!r.actif) return false;
          const d = startOfDay(parseISO(r.prochaineDate));
          return !isAfter(today, d) && isBefore(d, in7);
        })
        .sort((a, b) => a.prochaineDate.localeCompare(b.prochaineDate))
        .slice(0, 8),
    [rappels, today, in7],
  );

  const soinsCetteSemaine = useMemo(
    () => journal.filter((j) => !isBefore(parseISO(j.date), weekAgo)).length,
    [journal, weekAgo],
  );

  const favoris = useMemo(() => actifs.filter((b) => b.favori), [actifs]);

  /** Focus : retards d’abord, puis favoris sans soin récent (30 j). */
  const focusTrees = useMemo(() => {
    const recentCare = new Set(
      journal
        .filter((j) => differenceInDays(now, parseISO(j.date)) <= 30)
        .map((j) => j.bonsaiId),
    );
    const fromOverdue = enRetard
      .map((r) => bonsaiById.get(r.bonsaiId))
      .filter((b): b is Bonsai => !!b);
    const fromFavoris = favoris.filter((b) => !recentCare.has(b.id));
    const seen = new Set<string>();
    const out: Bonsai[] = [];
    for (const b of [...fromOverdue, ...fromFavoris]) {
      if (seen.has(b.id)) continue;
      seen.add(b.id);
      out.push(b);
      if (out.length >= 3) break;
    }
    return out;
  }, [enRetard, favoris, journal, bonsaiById, now]);

  const jardinItems = useMemo(() => {
    // Retards d’abord, puis dus aujourd’hui (sans doublon)
    const seen = new Set<string>();
    const list: { rappel: Rappel; overdue: boolean }[] = [];
    for (const r of enRetard) {
      if (seen.has(r.id)) continue;
      seen.add(r.id);
      list.push({ rappel: r, overdue: true });
    }
    for (const r of dusAujourdhui) {
      if (seen.has(r.id)) continue;
      seen.add(r.id);
      list.push({ rappel: r, overdue: false });
    }
    return list.slice(0, 8);
  }, [enRetard, dusAujourdhui]);

  const activity = useMemo(() => {
    type Item =
      | { kind: "journal"; date: string; data: JournalEntry }
      | { kind: "photo"; date: string; data: Photo }
      | { kind: "bonsai"; date: string; data: Bonsai };

    const items: Item[] = [
      ...journal.map((j) => ({ kind: "journal" as const, date: j.date, data: j })),
      ...photos.slice(0, 40).map((p) => ({ kind: "photo" as const, date: p.date, data: p })),
      ...bonsais.map((b) => ({ kind: "bonsai" as const, date: b.createdAt, data: b })),
    ];
    items.sort((a, b) => b.date.localeCompare(a.date));
    return items.slice(0, 12);
  }, [journal, photos, bonsais]);

  const dernierAjouts = useMemo(
    () =>
      [...actifs].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4),
    [actifs],
  );

  const { title: heroTitle, subtitle: heroSubtitle } = heroCopy(
    now,
    enRetard.length,
    dusAujourdhui.length,
  );

  const completeRappel = useMutation({
    mutationFn: async (r: Rappel) => {
      const journalId = uid();
      await saveJournal({
        id: journalId,
        bonsaiId: r.bonsaiId,
        type: r.type,
        date: new Date().toISOString(),
        rappelId: r.id,
      });
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
        try {
          await deleteJournal(journalId);
        } catch {
          /* ignore */
        }
        throw e;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["rappels"] });
      qc.invalidateQueries({ queryKey: ["journal"] });
      toast.success("Soin enregistré");
    },
    onError: (e) => {
      toast.error(
        "Échec : " + (e instanceof Error ? e.message : "erreur inconnue"),
      );
    },
  });

  const empty = actifs.length === 0;

  return (
    <AppShell>
      {/* ── 5. Hero contextuel ─────────────────────────────────────────── */}
      <section className="mb-8">
        <div className="flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-forest via-forest to-sage/80 p-8 text-primary-foreground md:flex-row md:items-end md:justify-between md:p-12">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.22em] text-primary-foreground/70">
              Carnet · {format(now, "EEEE d MMMM", { locale: fr })}
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
              {heroTitle}
            </h1>
            <p className="mt-3 max-w-md text-sm text-primary-foreground/80 md:text-base">
              {heroSubtitle}
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

      {/* ── 2. Accès rapide ────────────────────────────────────────────── */}
      <section className="mb-8">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <QuickAction to="/journal" icon={<Leaf className="h-4 w-4" />} label="Logger un soin" />
          <QuickAction
            to="/collection"
            icon={<Camera className="h-4 w-4" />}
            label="Collection / photo"
          />
          <QuickAction
            to="/calendrier"
            icon={<Bell className="h-4 w-4" />}
            label="Rappels"
          />
          <QuickAction
            to="/bonsai/nouveau"
            icon={<Plus className="h-4 w-4" />}
            label="Nouveau bonsaï"
          />
        </div>
      </section>

      {/* ── 3. KPI cliquables orientés alerte ───────────────────────────── */}
      <section className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard
          icon={<AlertTriangle className="h-4 w-4" />}
          label="En retard"
          value={enRetard.length}
          to="/calendrier"
          tone={enRetard.length > 0 ? "danger" : "default"}
          hint={enRetard.length > 0 ? "À traiter" : "Rien en retard"}
        />
        <StatCard
          icon={<CalendarDays className="h-4 w-4" />}
          label="Soins (7 j)"
          value={soinsCetteSemaine}
          to="/journal"
          hint="Entrées journal"
        />
        <StatCard
          icon={<Star className="h-4 w-4" />}
          label="Favoris"
          value={favoris.length}
          to="/collection"
          search={{ statut: "favoris" }}
        />
        <StatCard
          icon={<Sprout className="h-4 w-4" />}
          label="Collection"
          value={actifs.length}
          to="/collection"
          hint={poteries.length ? `${poteries.length} poteries` : undefined}
        />
      </section>

      {/* ── 1. Jardin du jour ──────────────────────────────────────────── */}
      <section className="mb-10">
        <SectionHeader
          title="Jardin du jour"
          subtitle="Retards, soins du jour et focus"
          link={{ to: "/calendrier", label: "Calendrier" }}
        />

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-2 lg:col-span-3">
            {jardinItems.length === 0 ? (
              <EmptyBox icon={<Check className="h-5 w-5" />}>
                Aucun soin dû aujourd’hui. Profitez d’un moment d’observation.
              </EmptyBox>
            ) : (
              <ul className="space-y-2">
                {jardinItems.map(({ rappel: r, overdue }) => {
                  const b = bonsaiById.get(r.bonsaiId);
                  const busy =
                    completeRappel.isPending && completeRappel.variables?.id === r.id;
                  return (
                    <li
                      key={r.id}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border bg-card px-3 py-3 sm:gap-4 sm:px-4",
                        overdue ? "border-destructive/40" : "border-border",
                      )}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-lg">
                        {soinEmoji(r.type)}
                      </span>
                      <Link
                        to="/bonsai/$id"
                        params={{ id: r.bonsaiId }}
                        className="min-w-0 flex-1"
                      >
                        <div className="truncate font-medium">
                          {soinLabel(r.type)} — {b?.nom ?? "—"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {overdue ? (
                            <span className="font-medium text-destructive">
                              En retard ·{" "}
                              {format(parseISO(r.prochaineDate), "d MMM", { locale: fr })}
                            </span>
                          ) : (
                            <span>Aujourd’hui</span>
                          )}
                          {r.intervalleJours ? ` · tous les ${r.intervalleJours} j` : ""}
                        </div>
                      </Link>
                      <Button
                        type="button"
                        size="sm"
                        disabled={busy}
                        onClick={() => completeRappel.mutate(r)}
                        className="shrink-0 rounded-full"
                      >
                        <Check className="mr-1 h-3.5 w-3.5" />
                        {busy ? "…" : "Fait"}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}

            {aVenirSemaine.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-label">Cette semaine</p>
                <ul className="space-y-1.5">
                  {aVenirSemaine
                    .filter((r) => !isSameDay(parseISO(r.prochaineDate), today))
                    .slice(0, 5)
                    .map((r) => {
                      const b = bonsaiById.get(r.bonsaiId);
                      return (
                        <li key={r.id}>
                          <Link
                            to="/bonsai/$id"
                            params={{ id: r.bonsaiId }}
                            className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 px-3 py-2 text-sm transition hover:border-accent/40"
                          >
                            <span className="text-base">{soinEmoji(r.type)}</span>
                            <span className="min-w-0 flex-1 truncate">
                              {soinLabel(r.type)} — {b?.nom ?? "—"}
                            </span>
                            <span className="shrink-0 text-xs text-muted-foreground">
                              {format(parseISO(r.prochaineDate), "EEE d", { locale: fr })}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
          </div>

          {/* Focus arbres */}
          <div className="lg:col-span-2">
            <p className="mb-2 text-label">Focus</p>
            {focusTrees.length === 0 ? (
              <EmptyBox icon={<Sprout className="h-5 w-5" />}>
                Aucun arbre prioritaire pour le moment.
              </EmptyBox>
            ) : (
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-3">
                {focusTrees.map((b) => (
                  <li key={b.id}>
                    <Link
                      to="/bonsai/$id"
                      params={{ id: b.id }}
                      className="group block overflow-hidden rounded-xl border border-border bg-card transition hover:border-accent/50"
                    >
                      <div className="aspect-square overflow-hidden">
                        <BonsaiPhoto
                          photoId={b.photoPrincipale}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                        />
                      </div>
                      <div className="p-2">
                        <div className="truncate text-xs font-semibold">{b.nom}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. Activité récente + derniers ajouts ──────────────────────── */}
      <div className="grid gap-8 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <SectionHeader
            title="Activité récente"
            subtitle="Photos, soins et ajouts"
            link={{ to: "/journal", label: "Journal" }}
          />
          {activity.length === 0 ? (
            <EmptyBox icon={<BookOpen className="h-5 w-5" />}>
              Aucune activité pour l’instant. Ajoutez une photo ou un soin.
            </EmptyBox>
          ) : (
            <ul className="space-y-2">
              {activity.map((item) => {
                if (item.kind === "journal") {
                  const b = bonsaiById.get(item.data.bonsaiId);
                  return (
                    <ActivityRow
                      key={`j-${item.data.id}`}
                      to="/bonsai/$id"
                      params={{ id: item.data.bonsaiId }}
                      emoji={soinEmoji(item.data.type)}
                      title={`${soinLabel(item.data.type)} — ${b?.nom ?? "—"}`}
                      meta={format(parseISO(item.date), "d MMM · HH:mm", { locale: fr })}
                      badge="Soin"
                    />
                  );
                }
                if (item.kind === "photo") {
                  const b = item.data.bonsaiId
                    ? bonsaiById.get(item.data.bonsaiId)
                    : undefined;
                  return (
                    <ActivityRow
                      key={`p-${item.data.id}`}
                      to={item.data.bonsaiId ? "/bonsai/$id" : "/collection"}
                      params={item.data.bonsaiId ? { id: item.data.bonsaiId } : undefined}
                      emoji="📷"
                      title={
                        item.data.legende?.trim()
                          ? item.data.legende
                          : `Photo — ${b?.nom ?? "galerie"}`
                      }
                      meta={format(parseISO(item.date), "d MMM · HH:mm", { locale: fr })}
                      badge="Photo"
                    />
                  );
                }
                return (
                  <ActivityRow
                    key={`b-${item.data.id}`}
                    to="/bonsai/$id"
                    params={{ id: item.data.id }}
                    emoji="🌱"
                    title={`Ajout — ${item.data.nom}`}
                    meta={format(parseISO(item.date), "d MMM", { locale: fr })}
                    badge="Nouveau"
                  />
                );
              })}
            </ul>
          )}
        </section>

        <section className="lg:col-span-2">
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
                    className="group block overflow-hidden rounded-2xl border border-border bg-card transition hover:border-accent/50 hover:shadow-sm"
                  >
                    <div className="relative aspect-square w-full overflow-hidden">
                      <BonsaiPhoto
                        photoId={b.photoPrincipale}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                      {b.etape && (
                        <div className="absolute left-2 top-2">
                          <StatusBadge
                            variant={etapeToVariant(b.etape)}
                            label={etapeLabel(b.etape)}
                            size="sm"
                          />
                        </div>
                      )}
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

      {/* ── FAB mobile ─────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        {fabOpen && (
          <div className="mb-3 flex flex-col items-end gap-2">
            <FabLink to="/journal" label="Logger un soin" onNavigate={() => setFabOpen(false)} />
            <FabLink
              to="/calendrier"
              label="Rappels"
              onNavigate={() => setFabOpen(false)}
            />
            <FabLink
              to="/bonsai/nouveau"
              label="Nouveau bonsaï"
              onNavigate={() => setFabOpen(false)}
            />
            <FabLink
              to="/collection"
              label="Collection"
              onNavigate={() => setFabOpen(false)}
            />
          </div>
        )}
        <button
          type="button"
          onClick={() => setFabOpen((o) => !o)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-forest/30 transition hover:brightness-110"
          aria-label={fabOpen ? "Fermer le menu rapide" : "Ouvrir le menu rapide"}
        >
          {fabOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </button>
      </div>
    </AppShell>
  );
}

function QuickAction({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium transition hover:border-accent/50 hover:shadow-sm"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground">
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </Link>
  );
}

function StatCard({
  icon,
  label,
  value,
  to,
  search,
  hint,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  to: string;
  search?: Record<string, unknown>;
  hint?: string;
  tone?: "default" | "danger";
}) {
  return (
    <Link
      to={to}
      search={search}
      className={cn(
        "group surface-card p-4 transition hover:shadow-md sm:p-5",
        tone === "danger" && value > 0
          ? "border-destructive/40 hover:border-destructive/60"
          : "hover:border-accent/50",
      )}
    >
      <div className="flex items-center justify-between text-muted-foreground">
        <span
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full",
            tone === "danger" && value > 0
              ? "bg-destructive/15 text-destructive"
              : "bg-secondary text-foreground",
          )}
        >
          {icon}
        </span>
        <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
      </div>
      <div
        className={cn(
          "mt-3 font-display text-3xl font-semibold tracking-tight",
          tone === "danger" && value > 0 ? "text-destructive" : "text-foreground",
        )}
      >
        {value}
      </div>
      <div className="mt-1 text-label">{label}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </Link>
  );
}

function SectionHeader({
  title,
  subtitle,
  link,
}: {
  title: string;
  subtitle?: string;
  link?: { to: string; label: string };
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="text-label mt-0.5">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link.to} className="shrink-0 text-sm font-medium text-accent hover:underline">
          {link.label} →
        </Link>
      )}
    </div>
  );
}

function EmptyBox({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 px-5 py-6 text-sm text-muted-foreground">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
        {icon}
      </span>
      <p>{children}</p>
    </div>
  );
}

function ActivityRow({
  to,
  params,
  emoji,
  title,
  meta,
  badge,
}: {
  to: string;
  params?: { id: string };
  emoji: string;
  title: string;
  meta: string;
  badge: string;
}) {
  return (
    <li>
      <Link
        to={to}
        params={params}
        className="flex items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2.5 transition hover:border-accent/40 hover:shadow-sm sm:px-4"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-base">
          {emoji}
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">{title}</div>
          <div className="text-xs text-muted-foreground">{meta}</div>
        </div>
        <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {badge}
        </span>
      </Link>
    </li>
  );
}

function FabLink({
  to,
  label,
  onNavigate,
}: {
  to: string;
  label: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-md"
    >
      {label}
    </Link>
  );
}
