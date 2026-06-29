import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  listRappels,
  listBonsais,
  saveRappel,
  saveJournal,
  uid,
  listEvenements,
  saveEvenement,
  deleteEvenement,
  type Evenement,
} from "@/lib/supabase-data";
import { AppShell } from "@/components/app-shell";
import { soinEmoji, soinLabel } from "@/lib/bonsai-meta";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  parseISO,
  addMonths,
  subMonths,
  addDays,
} from "date-fns";
import { fr } from "date-fns/locale";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  X,
  Bell,
  BellOff,
  BellRing,
  CalendarPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { notificationStatus, requestNotificationPermission } from "@/lib/notifications";

export const Route = createFileRoute("/calendrier")({
  head: () => ({
    meta: [
      { title: "Calendrier des soins — Bonsaï Studio" },
      {
        name: "description",
        content:
          "Calendrier mensuel des rappels d'entretien et évènements pour vos bonsaïs, avec notifications avant l'échéance.",
      },
      { property: "og:title", content: "Calendrier des soins — Bonsaï Studio" },
      {
        property: "og:description",
        content: "Rappels d'entretien et évènements pour vos bonsaïs.",
      },
      { property: "og:url", content: "/calendrier" },
    ],
  }),
  component: CalendrierPage,
});

function CalendrierPage() {
  const qc = useQueryClient();
  const [month, setMonth] = useState(() => new Date());
  const { data: rappels = [] } = useQuery({ queryKey: ["rappels"], queryFn: () => listRappels() });
  const { data: bonsais = [] } = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais });
  const { data: evenements = [] } = useQuery({ queryKey: ["evenements"], queryFn: listEvenements });

  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });

  const rappelsByDay = new Map<string, typeof rappels>();
  rappels
    .filter((r) => r.actif)
    .forEach((r) => {
      const k = format(parseISO(r.prochaineDate), "yyyy-MM-dd");
      const arr = rappelsByDay.get(k) ?? [];
      arr.push(r);
      rappelsByDay.set(k, arr);
    });

  const eventsByDay = new Map<string, Evenement[]>();
  evenements.forEach((e) => {
    const k = format(parseISO(e.dateHeure), "yyyy-MM-dd");
    const arr = eventsByDay.get(k) ?? [];
    arr.push(e);
    eventsByDay.set(k, arr);
  });

  const markDone = async (r: (typeof rappels)[number]) => {
    await saveJournal({
      id: uid(),
      bonsaiId: r.bonsaiId,
      type: r.type,
      date: new Date().toISOString(),
      rappelId: r.id,
    });
    if (r.intervalleJours) {
      await saveRappel({
        ...r,
        prochaineDate: addDays(new Date(), r.intervalleJours).toISOString(),
      });
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
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Soins & évènements
          </p>
          <h1 className="mt-1 font-display text-4xl font-semibold capitalize">
            {format(month, "MMMM yyyy", { locale: fr })}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Mois précédent"
            onClick={() => setMonth(subMonths(month, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => setMonth(new Date())}>
            Aujourd'hui
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Mois suivant"
            onClick={() => setMonth(addMonths(month, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="grid grid-cols-7 border-b border-border bg-secondary/40 text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {["lun", "mar", "mer", "jeu", "ven", "sam", "dim"].map((d) => (
            <div key={d} className="py-2">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((d) => {
            const k = format(d, "yyyy-MM-dd");
            const items = rappelsByDay.get(k) ?? [];
            const evs = eventsByDay.get(k) ?? [];
            const inMonth = isSameMonth(d, month);
            const today = isSameDay(d, new Date());
            const totalCount = items.length + evs.length;
            return (
              <div
                key={k}
                className={cn(
                  "min-h-[110px] border-b border-r border-border p-2 text-left",
                  !inMonth && "bg-secondary/20 text-muted-foreground",
                )}
              >
                <div
                  className={cn(
                    "mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                    today && "bg-accent text-accent-foreground",
                  )}
                >
                  {format(d, "d")}
                </div>
                <ul className="space-y-1">
                  {evs.slice(0, 2).map((e) => (
                    <li key={e.id}>
                      <span
                        className="block truncate rounded-md bg-accent/15 px-1.5 py-0.5 text-[11px] text-accent"
                        title={`${e.titre} — ${format(parseISO(e.dateHeure), "HH:mm")}`}
                      >
                        📅 {format(parseISO(e.dateHeure), "HH:mm")} {e.titre}
                      </span>
                    </li>
                  ))}
                  {items.slice(0, Math.max(0, 3 - evs.length)).map((r) => {
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
                  {totalCount > 3 && (
                    <li className="text-[10px] text-muted-foreground">+ {totalCount - 3}</li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <EvenementsSection evenements={evenements} bonsais={bonsais} />

      <section className="mt-10">
        <h2 className="mb-4 font-display text-2xl font-semibold">Rappels de soins en cours</h2>
        {rappels.filter((r) => r.actif).length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucun rappel actif. Ajoutez-en depuis la fiche d'un bonsaï.
          </p>
        ) : (
          <ul className="space-y-2">
            {rappels
              .filter((r) => r.actif)
              .map((r) => {
                const b = bonsais.find((x) => x.id === r.bonsaiId);
                return (
                  <li
                    key={r.id}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-base">
                      {soinEmoji(r.type)}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium">
                        {soinLabel(r.type)} — {b?.nom ?? "—"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format(parseISO(r.prochaineDate), "EEEE d MMMM yyyy", { locale: fr })}
                        {r.intervalleJours ? ` · tous les ${r.intervalleJours} j` : ""}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => markDone(r)}>
                      <Check className="mr-1 h-4 w-4" /> Fait
                    </Button>
                  </li>
                );
              })}
          </ul>
        )}
      </section>
    </AppShell>
  );
}

function EvenementsSection({
  evenements,
  bonsais,
}: {
  evenements: Evenement[];
  bonsais: Awaited<ReturnType<typeof listBonsais>>;
}) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dateHeure, setDateHeure] = useState(() => {
    const d = new Date();
    d.setMinutes(0, 0, 0);
    d.setHours(d.getHours() + 1);
    return formatLocal(d);
  });
  const [rappelMinutes, setRappelMinutes] = useState("60");
  const [bonsaiId, setBonsaiId] = useState<string>("");
  const [notifStatus, setNotifStatus] = useState<NotificationPermission | "unsupported">(() =>
    notificationStatus(),
  );

  const ask = async () => {
    const p = await requestNotificationPermission();
    setNotifStatus(p);
    if (p === "granted") toast.success("Notifications activées");
    else if (p === "denied")
      toast.error("Notifications refusées. Activez-les dans les réglages du navigateur.");
  };

  const add = async () => {
    if (!titre.trim()) {
      toast.error("Donnez un titre à l'évènement");
      return;
    }
    const iso = new Date(dateHeure).toISOString();
    await saveEvenement({
      id: uid(),
      titre: titre.trim(),
      description: description.trim() || undefined,
      dateHeure: iso,
      rappelMinutes: rappelMinutes ? Number(rappelMinutes) : undefined,
      bonsaiId: bonsaiId || undefined,
      createdAt: new Date().toISOString(),
    });
    qc.invalidateQueries({ queryKey: ["evenements"] });
    setOpen(false);
    setTitre("");
    setDescription("");
    toast.success("Évènement ajouté");
    if (notifStatus !== "granted" && notifStatus !== "unsupported") ask();
  };

  const edit = (e: Evenement) => {
    setEditingId(e.id);
    setTitre(e.titre);
    setDescription(e.description || "");
    setDateHeure(formatLocal(new Date(e.dateHeure)));
    setRappelMinutes(e.rappelMinutes?.toString() || "60");
    setBonsaiId(e.bonsaiId || "");
    setOpen(true);
  };

  const update = async () => {
    if (!editingId || !titre.trim()) {
      toast.error("Donnez un titre à l'évènement");
      return;
    }
    const iso = new Date(dateHeure).toISOString();
    await saveEvenement({
      id: editingId,
      titre: titre.trim(),
      description: description.trim() || undefined,
      dateHeure: iso,
      rappelMinutes: rappelMinutes ? Number(rappelMinutes) : undefined,
      bonsaiId: bonsaiId || undefined,
      createdAt: new Date().toISOString(),
    });
    qc.invalidateQueries({ queryKey: ["evenements"] });
    setOpen(false);
    setEditingId(null);
    setTitre("");
    setDescription("");
    toast.success("Évènement mis à jour");
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer cet évènement ?")) return;
    await deleteEvenement(id);
    qc.invalidateQueries({ queryKey: ["evenements"] });
  };

  const upcoming = evenements.filter(
    (e) => new Date(e.dateHeure).getTime() > Date.now() - 24 * 3600_000,
  );

  return (
    <section className="mt-10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold">Évènements à venir</h2>
        <div className="flex items-center gap-2">
          <NotifBadge status={notifStatus} onAsk={ask} />
          {!open && (
            <Button onClick={() => setOpen(true)}>
              <CalendarPlus className="mr-1.5 h-4 w-4" /> Nouvel évènement
            </Button>
          )}
        </div>
      </div>

      {open && (
        <div className="mb-5 space-y-3 rounded-2xl border border-border bg-card p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="evt-titre" className="mb-1.5 block text-sm">
                Titre
              </Label>
              <Input
                id="evt-titre"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                placeholder="Atelier de taille, exposition…"
              />
            </div>
            <div>
              <Label htmlFor="evt-date" className="mb-1.5 block text-sm">
                Date et heure
              </Label>
              <Input
                id="evt-date"
                type="datetime-local"
                value={dateHeure}
                onChange={(e) => setDateHeure(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="evt-rappel" className="mb-1.5 block text-sm">
                Rappel avant (minutes)
              </Label>
              <select
                id="evt-rappel"
                value={rappelMinutes}
                onChange={(e) => setRappelMinutes(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="0">À l'heure</option>
                <option value="10">10 min avant</option>
                <option value="30">30 min avant</option>
                <option value="60">1 h avant</option>
                <option value="180">3 h avant</option>
                <option value="1440">1 jour avant</option>
                <option value="2880">2 jours avant</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="evt-bonsai" className="mb-1.5 block text-sm">
                Bonsaï associé (facultatif)
              </Label>
              <select
                id="evt-bonsai"
                value={bonsaiId}
                onChange={(e) => setBonsaiId(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">— Aucun —</option>
                {bonsais.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="evt-desc" className="mb-1.5 block text-sm">
                Description (facultatif)
              </Label>
              <Textarea
                id="evt-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setEditingId(null);
                setTitre("");
                setDescription("");
              }}
            >
              Annuler
            </Button>
            <Button onClick={editingId ? update : add}>
              {editingId ? "Mettre à jour" : <><Plus className="mr-1 h-4 w-4" /> Ajouter</>}
            </Button>
          </div>
          {notifStatus !== "granted" && notifStatus !== "unsupported" && (
            <p className="text-xs text-muted-foreground">
              Pour recevoir une notification sur cet appareil, autorisez les notifications avec le
              bouton ci-dessus. L'application doit être ouverte (au moins en arrière-plan dans le
              navigateur) au moment du rappel.
            </p>
          )}
        </div>
      )}

      {upcoming.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucun évènement programmé.</p>
      ) : (
        <ul className="space-y-2">
          {upcoming.map((e) => {
            const b = e.bonsaiId ? bonsais.find((x) => x.id === e.bonsaiId) : undefined;
            return (
              <li
                key={e.id}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-3 cursor-pointer hover:bg-secondary/40 transition"
                onClick={() => edit(e)}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <CalendarPlus className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-medium">{e.titre}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(parseISO(e.dateHeure), "EEE d MMM · HH:mm", { locale: fr })}
                    </span>
                  </div>
                  {b && (
                    <Link
                      to="/bonsai/$id"
                      params={{ id: b.id }}
                      className="text-xs text-accent hover:underline"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {b.nom}
                    </Link>
                  )}
                  {e.description && (
                    <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
                      {e.description}
                    </p>
                  )}
                  {e.rappelMinutes != null && (
                    <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Bell className="h-3 w-3" />
                      {e.rappelMinutes === 0
                        ? "Rappel à l'heure"
                        : `Rappel ${formatMinutes(e.rappelMinutes)} avant`}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Supprimer l'évènement ${e.titre}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    remove(e.id);
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function NotifBadge({
  status,
  onAsk,
}: {
  status: NotificationPermission | "unsupported";
  onAsk: () => void;
}) {
  if (status === "unsupported") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
        <BellOff className="h-3 w-3" /> Notifications non supportées
      </span>
    );
  }
  if (status === "granted") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-sage/30 px-3 py-1 text-xs text-forest">
        <BellRing className="h-3 w-3" /> Notifications activées
      </span>
    );
  }
  return (
    <Button variant="outline" size="sm" onClick={onAsk}>
      <Bell className="mr-1 h-3.5 w-3.5" /> Activer les notifications
    </Button>
  );
}

function formatLocal(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formatMinutes(m: number) {
  if (m < 60) return `${m} min`;
  if (m < 1440) return `${Math.round(m / 60)} h`;
  return `${Math.round(m / 1440)} j`;
}
