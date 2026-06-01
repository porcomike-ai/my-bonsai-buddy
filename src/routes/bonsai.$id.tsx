import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  getBonsai, deleteBonsai, listPhotos, listJournal, listRappels, getPoterie,
  savePhoto, deletePhoto, saveJournal, deleteJournal, saveRappel, deleteRappel,
  saveBonsai, uid, type SoinType, type Photo,
} from "@/lib/db";
import { fileToBlob, useBlobUrl } from "@/lib/blob-url";
import { AppShell } from "@/components/app-shell";
import { BonsaiPhoto } from "@/components/bonsai-photo";
import { BonsaiForm } from "@/components/bonsai-form";
import { SOINS, soinEmoji, soinLabel, styleLabel, etapeLabel } from "@/lib/bonsai-meta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, parseISO, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, Pencil, Trash2, ImagePlus, Plus, X, Calendar as CalendarIcon, Check, Share2, Image as ImageIcon, Images, Camera, FolderOpen, MessageSquarePlus } from "lucide-react";
import { toast } from "sonner";
import { shareBonsaiPdf } from "@/lib/share-pdf";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/bonsai/$id")({
  head: ({ params }) => ({
    meta: [{ title: `Bonsaï — Bonsaï Studio` }, { name: "description", content: `Fiche détaillée du bonsaï ${params.id}` }],
  }),
  component: BonsaiDetail,
});

function BonsaiDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);

  const { data: b, isPending } = useQuery({ queryKey: ["bonsai", id], queryFn: () => getBonsai(id) });
  const { data: photos = [] } = useQuery({ queryKey: ["photos", id], queryFn: () => listPhotos(id) });
  const { data: entries = [] } = useQuery({ queryKey: ["journal", id], queryFn: () => listJournal(id) });
  const { data: rappels = [] } = useQuery({ queryKey: ["rappels", id], queryFn: () => listRappels(id) });
  const { data: poterie } = useQuery({
    queryKey: ["poterie", b?.poterieId],
    queryFn: () => (b?.poterieId ? getPoterie(b.poterieId) : null),
    enabled: !!b?.poterieId,
  });

  if (isPending) return <AppShell><p className="text-muted-foreground">Chargement…</p></AppShell>;
  if (!b) return (
    <AppShell>
      <p className="text-muted-foreground">Bonsaï introuvable.</p>
      <Link to="/collection" className="text-accent">Retour à la collection</Link>
    </AppShell>
  );

  const remove = async () => {
    if (!confirm(`Supprimer définitivement « ${b.nom} » et toutes ses données ?`)) return;
    await deleteBonsai(id);
    await qc.invalidateQueries();
    toast.success("Bonsaï supprimé");
    navigate({ to: "/collection" });
  };

  if (editing) {
    return (
      <AppShell>
        <button onClick={() => setEditing(false)} className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Annuler la modification
        </button>
        <h1 className="font-display text-4xl font-semibold">Modifier « {b.nom} »</h1>
        <div className="mt-8">
          <BonsaiForm initial={b} onSaved={() => { setEditing(false); qc.invalidateQueries(); }} />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Link to="/collection" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Collection
      </Link>

      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        <div>
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            <div className="aspect-square w-full">
              <BonsaiPhoto photoId={b.photoPrincipale} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setEditing(true)}>
              <Pencil className="mr-1.5 h-4 w-4" /> Modifier
            </Button>
            <Button variant="outline" className="text-destructive hover:text-destructive" onClick={remove}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <SharePdfButton id={id} bonsai={b} photosCount={photos.length} />

        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-accent">{styleLabel(b.style)}</p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-5xl font-semibold leading-tight">{b.nom}</h1>
            {!(b.dansCollection ?? true) && (
              <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Sorti de la collection
              </span>
            )}
          </div>
          <p className="mt-1 text-lg italic text-muted-foreground">{b.espece}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Stat label="Étape" value={etapeLabel(b.etape)} />
            {b.ageEstime != null && <Stat label="Âge" value={`${b.ageEstime} ans`} />}
            {b.hauteurCm != null && <Stat label="Hauteur" value={`${b.hauteurCm} cm`} />}
            {b.dateAcquisition && <Stat label="Acquis le" value={format(parseISO(b.dateAcquisition), "d MMM yyyy", { locale: fr })} />}
            {b.origine && <Stat label="Origine" value={b.origine} />}
            {b.prixAchat != null && <Stat label="Prix d'achat" value={`${b.prixAchat.toLocaleString("fr-FR")} €`} />}
            {b.valeurEstimee != null && <Stat label="Valeur estimée" value={`${b.valeurEstimee.toLocaleString("fr-FR")} €`} />}
            {poterie && (
              <Stat
                label="Poterie"
                value={
                  <Link to="/poterie/$id" params={{ id: poterie.id }} className="text-accent hover:underline">
                    {poterie.nom}
                  </Link>
                }
              />
            )}
          </dl>

          {b.notes && (
            <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Notes</p>
              <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed">{b.notes}</p>
            </div>
          )}

          <Tabs defaultValue="galerie" className="mt-10">
            <TabsList className="bg-secondary/60">
              <TabsTrigger value="galerie">Galerie ({photos.length})</TabsTrigger>
              <TabsTrigger value="journal">Journal ({entries.length})</TabsTrigger>
              <TabsTrigger value="rappels">Rappels ({rappels.filter(r => r.actif).length})</TabsTrigger>
            </TabsList>

            <TabsContent value="galerie" className="pt-6">
              <GalerieTab bonsaiId={id} photos={photos} mainId={b.photoPrincipale} onSetMain={async (pid) => {
                await saveBonsai({ ...b, photoPrincipale: pid });
                qc.invalidateQueries();
              }} />
            </TabsContent>
            <TabsContent value="journal" className="pt-6">
              <JournalTab bonsaiId={id} entries={entries} />
            </TabsContent>
            <TabsContent value="rappels" className="pt-6">
              <RappelsTab bonsaiId={id} rappels={rappels} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-display text-lg font-medium">{value}</dd>
    </div>
  );
}

function SharePdfButton({ id, bonsai, photosCount }: { id: string; bonsai: { nom: string }; photosCount: number }) {
  const [busy, setBusy] = useState(false);
  const run = async (photos: "principale" | "toutes") => {
    setBusy(true);
    try {
      const r = await shareBonsaiPdf(id, bonsai.nom, { photos });
      toast.success(r === "shared" ? "Fiche partagée" : "Fiche téléchargée");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="mt-2 w-full" disabled={busy}>
          <Share2 className="mr-1.5 h-4 w-4" /> {busy ? "Génération…" : "Partager la fiche"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuItem onClick={() => run("principale")}>
          <ImageIcon className="mr-2 h-4 w-4" />
          <div className="flex flex-col">
            <span>Photo principale</span>
            <span className="text-xs text-muted-foreground">Fiche compacte sur 1 page</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => run("toutes")} disabled={photosCount === 0}>
          <Images className="mr-2 h-4 w-4" />
          <div className="flex flex-col">
            <span>Toutes les photos</span>
            <span className="text-xs text-muted-foreground">
              {photosCount > 0 ? `Inclut la galerie (${photosCount})` : "Aucune photo dans la galerie"}
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function GalerieTab({
  bonsaiId, photos, mainId, onSetMain,
}: { bonsaiId: string; photos: Awaited<ReturnType<typeof listPhotos>>; mainId?: string; onSetMain: (id: string) => void }) {
  const qc = useQueryClient();
  const onAdd = async (f: File) => {
    const blob = await fileToBlob(f);
    await savePhoto({ id: uid(), bonsaiId, blob, date: new Date().toISOString() });
    qc.invalidateQueries({ queryKey: ["photos", bonsaiId] });
    toast.success("Photo ajoutée");
  };
  const remove = async (pid: string) => {
    if (!confirm("Supprimer cette photo ?")) return;
    await deletePhoto(pid);
    qc.invalidateQueries({ queryKey: ["photos", bonsaiId] });
  };
  const updateLegende = async (p: Photo, legende: string) => {
    await savePhoto({ ...p, legende: legende || undefined });
    qc.invalidateQueries({ queryKey: ["photos", bonsaiId] });
  };
  const updateDate = async (p: Photo, date: string) => {
    await savePhoto({ ...p, date });
    qc.invalidateQueries({ queryKey: ["photos", bonsaiId] });
  };
  const [sortDesc, setSortDesc] = useState(true);
  const sorted = [...photos].sort((a, b) =>
    sortDesc ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
  );

  return (
    <div>
      <div className="mb-5 grid grid-cols-2 gap-3">
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-4 py-5 text-sm font-medium text-muted-foreground transition hover:border-accent/60 hover:text-foreground">
          <Camera className="h-4 w-4" /> Appareil photo
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onAdd(e.target.files[0])}
          />
        </label>
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card px-4 py-5 text-sm font-medium text-muted-foreground transition hover:border-accent/60 hover:text-foreground">
          <FolderOpen className="h-4 w-4" /> Galerie
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onAdd(e.target.files[0])}
          />
        </label>
      </div>
      {sorted.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucune photo pour l'instant. Documentez l'évolution de votre arbre.</p>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-end">
            <Button variant="outline" size="sm" onClick={() => setSortDesc((s) => !s)}>
              Date : {sortDesc ? "plus récentes d'abord" : "plus anciennes d'abord"}
            </Button>
          </div>
          <ol className="space-y-6 border-l border-border pl-6">
            {sorted.map((p) => (
              <PhotoTimeline
                key={p.id}
                p={p}
                isMain={p.id === mainId}
                onSetMain={() => onSetMain(p.id)}
                onDelete={() => remove(p.id)}
                onLegende={(t) => updateLegende(p, t)}
                onDate={(d) => updateDate(p, d)}
              />
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

function PhotoTimeline({ p, isMain, onSetMain, onDelete, onLegende, onDate }: { p: Photo; isMain: boolean; onSetMain: () => void; onDelete: () => void; onLegende: (t: string) => void | Promise<void>; onDate: (d: string) => void | Promise<void> }) {
  const url = useBlobUrl(p.blob);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(p.legende ?? "");
  const [editingDate, setEditingDate] = useState(false);
  const save = async () => {
    await onLegende(draft.trim());
    setEditing(false);
    toast.success("Commentaire enregistré");
  };
  const saveDate = async (value: string) => {
    if (!value) return;
    const iso = new Date(value).toISOString();
    await onDate(iso);
    setEditingDate(false);
    toast.success("Date mise à jour");
  };
  return (
    <li className="relative">
      <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-background" />
      {editingDate ? (
        <div className="flex items-center gap-2">
          <Input
            type="date"
            defaultValue={p.date.slice(0, 10)}
            className="h-8 w-auto"
            autoFocus
            onBlur={(e) => saveDate(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") saveDate((e.target as HTMLInputElement).value); if (e.key === "Escape") setEditingDate(false); }}
          />
          <Button variant="ghost" size="sm" onClick={() => setEditingDate(false)}>Annuler</Button>
        </div>
      ) : (
        <button onClick={() => setEditingDate(true)} className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground" title="Modifier la date">
          <CalendarIcon className="h-3 w-3" />
          {format(parseISO(p.date), "d MMMM yyyy", { locale: fr })}
        </button>
      )}

      <div className="mt-2 overflow-hidden rounded-2xl border border-border bg-card">
        {url && <img src={url} alt={p.legende ?? ""} className="w-full max-w-md object-cover" />}
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
                <Button variant="ghost" size="sm" onClick={() => { setDraft(p.legende ?? ""); setEditing(false); }}>Annuler</Button>
                <Button size="sm" onClick={save}>Enregistrer</Button>
              </div>
            </div>
          ) : p.legende ? (
            <button onClick={() => { setDraft(p.legende ?? ""); setEditing(true); }} className="block w-full whitespace-pre-wrap rounded-md bg-secondary/40 px-3 py-2 text-left text-sm leading-relaxed text-foreground/90 hover:bg-secondary/60">
              {p.legende}
            </button>
          ) : (
            <button onClick={() => { setDraft(""); setEditing(true); }} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <MessageSquarePlus className="h-3.5 w-3.5" /> Ajouter un commentaire
            </button>
          )}
          <div className="flex items-center justify-between">
            {isMain ? (
              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">Photo principale</span>
            ) : (
              <Button variant="ghost" size="sm" onClick={onSetMain}>Définir comme principale</Button>
            )}
            <Button variant="ghost" size="sm" onClick={onDelete} className="text-destructive hover:text-destructive">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}

function JournalTab({ bonsaiId, entries }: { bonsaiId: string; entries: Awaited<ReturnType<typeof listJournal>> }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<SoinType>("arrosage");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");

  const add = async () => {
    await saveJournal({ id: uid(), bonsaiId, type, date: new Date(date).toISOString(), notes: notes || undefined });
    qc.invalidateQueries();
    setOpen(false);
    setNotes("");
    toast.success("Entrée ajoutée");
  };
  const remove = async (eid: string) => {
    await deleteJournal(eid);
    qc.invalidateQueries();
  };

  return (
    <div>
      {!open ? (
        <Button onClick={() => setOpen(true)} className="mb-5"><Plus className="mr-1.5 h-4 w-4" /> Nouvelle entrée</Button>
      ) : (
        <div className="mb-5 space-y-3 rounded-2xl border border-border bg-card p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label className="mb-1.5 block text-sm">Type de soin</Label>
              <select value={type} onChange={(e) => setType(e.target.value as SoinType)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {SOINS.map((s) => <option key={s.value} value={s.value}>{s.emoji} {s.label}</option>)}
              </select>
            </div>
            <div>
              <Label className="mb-1.5 block text-sm">Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>
          <div>
            <Label className="mb-1.5 block text-sm">Notes (facultatif)</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Observations, dosage, météo…" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={add}>Enregistrer</Button>
          </div>
        </div>
      )}

      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucun entretien consigné. Notez votre prochain arrosage, taille ou rempotage.</p>
      ) : (
        <ul className="space-y-2">
          {entries.map((e) => (
            <li key={e.id} className="flex items-start gap-3 rounded-xl border border-border bg-card p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-base">{soinEmoji(e.type)}</span>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-medium">{soinLabel(e.type)}</span>
                  <span className="text-xs text-muted-foreground">{format(parseISO(e.date), "d MMM yyyy", { locale: fr })}</span>
                </div>
                {e.notes && <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">{e.notes}</p>}
              </div>
              <Button variant="ghost" size="icon" onClick={() => remove(e.id)} className="text-muted-foreground hover:text-destructive">
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function RappelsTab({ bonsaiId, rappels }: { bonsaiId: string; rappels: Awaited<ReturnType<typeof listRappels>> }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<SoinType>("arrosage");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [intervalle, setIntervalle] = useState("");

  const add = async () => {
    await saveRappel({
      id: uid(), bonsaiId, type,
      prochaineDate: new Date(date).toISOString(),
      intervalleJours: intervalle ? Number(intervalle) : undefined,
      actif: true,
    });
    qc.invalidateQueries();
    setOpen(false);
    setIntervalle("");
    toast.success("Rappel créé");
  };

  const markDone = async (r: typeof rappels[number]) => {
    await saveJournal({ id: uid(), bonsaiId, type: r.type, date: new Date().toISOString(), rappelId: r.id });
    if (r.intervalleJours) {
      await saveRappel({ ...r, prochaineDate: addDays(new Date(), r.intervalleJours).toISOString() });
    } else {
      await saveRappel({ ...r, actif: false });
    }
    qc.invalidateQueries();
    toast.success("Soin effectué");
  };

  const remove = async (rid: string) => {
    await deleteRappel(rid);
    qc.invalidateQueries();
  };

  return (
    <div>
      {!open ? (
        <Button onClick={() => setOpen(true)} className="mb-5"><Plus className="mr-1.5 h-4 w-4" /> Nouveau rappel</Button>
      ) : (
        <div className="mb-5 space-y-3 rounded-2xl border border-border bg-card p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <Label className="mb-1.5 block text-sm">Type</Label>
              <select value={type} onChange={(e) => setType(e.target.value as SoinType)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {SOINS.map((s) => <option key={s.value} value={s.value}>{s.emoji} {s.label}</option>)}
              </select>
            </div>
            <div>
              <Label className="mb-1.5 block text-sm">Prochaine date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm">Répéter tous les (jours)</Label>
              <Input type="number" min={0} placeholder="ex. 2" value={intervalle} onChange={(e) => setIntervalle(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={add}>Créer le rappel</Button>
          </div>
        </div>
      )}

      {rappels.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucun rappel. Programmez par exemple un arrosage tous les 2 jours.</p>
      ) : (
        <ul className="space-y-2">
          {rappels.map((r) => (
            <li key={r.id} className={`flex items-center gap-3 rounded-xl border bg-card p-3 ${r.actif ? "border-border" : "border-border/40 opacity-60"}`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-base">{soinEmoji(r.type)}</span>
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
              <Button variant="ghost" size="icon" onClick={() => remove(r.id)} className="text-muted-foreground hover:text-destructive">
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
