import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { listPoteries, listBonsais, savePoterie, uid, type Poterie } from "@/lib/db";
import { fileToBlob, useBlobUrl } from "@/lib/blob-url";
import { AppShell } from "@/components/app-shell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Container, ImagePlus, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/poteries")({
  head: () => ({
    meta: [
      { title: "Poteries — Bonsaï Studio" },
      { name: "description", content: "Catalogue de vos poteries pour bonsaïs : formes, matières, dimensions et arbres associés." },
      { property: "og:title", content: "Poteries — Bonsaï Studio" },
      { property: "og:description", content: "Catalogue de vos contenants pour bonsaïs et arbres associés." },
    ],
  }),
  component: PoteriesPage,
});


function PoteriesPage() {
  const { data: poteries = [] } = useQuery({ queryKey: ["poteries"], queryFn: listPoteries });
  const { data: bonsais = [] } = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais });
  const [open, setOpen] = useState(false);

  return (
    <AppShell>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Catalogue</p>
          <h1 className="mt-1 font-display text-4xl font-semibold">Poteries</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {poteries.length} contenant{poteries.length > 1 ? "s" : ""} dans votre collection
          </p>
        </div>
        <Button onClick={() => setOpen(true)}><Plus className="mr-1.5 h-4 w-4" /> Nouvelle poterie</Button>
      </header>

      {open && <PoterieForm onClose={() => setOpen(false)} />}

      {poteries.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card/50 py-16 text-center">
          <Container className="mx-auto h-10 w-10 text-muted-foreground" />
          <h2 className="mt-4 font-display text-2xl font-semibold">Aucune poterie</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ajoutez les contenants de votre collection pour les associer à vos bonsaïs.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {poteries.map((p) => {
            const planted = bonsais.find((b) => b.poterieId === p.id);
            return (
              <li key={p.id}>
                <Link
                  to="/poterie/$id"
                  params={{ id: p.id }}
                  className="group block overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg"
                >
                  <PoterieImage blob={p.photoBlob} />
                  <div className="space-y-1.5 p-4">
                    <h2 className="truncate font-display text-lg font-semibold">{p.nom}</h2>
                    <p className="text-xs text-muted-foreground">
                      {[p.forme, p.couleur, p.matiere].filter(Boolean).join(" · ") || "—"}
                    </p>
                    {(p.longueurCm || p.largeurCm || p.hauteurCm) && (
                      <p className="text-xs text-muted-foreground">
                        {[p.longueurCm, p.largeurCm, p.hauteurCm].map((d) => d ?? "?").join(" × ")} cm
                      </p>
                    )}
                    <p className="text-[11px] uppercase tracking-wider">
                      {planted ? (
                        <span className="text-accent">Plantée · {planted.nom}</span>
                      ) : (
                        <span className="text-muted-foreground">Libre</span>
                      )}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </AppShell>
  );
}

function PoterieImage({ blob }: { blob?: Blob }) {
  const url = useBlobUrl(blob);
  return (
    <div className="aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-secondary via-muted to-peach/30">
      {url ? <img src={url} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" /> : (
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          <Container className="h-10 w-10 opacity-40" />
        </div>
      )}
    </div>
  );
}

export function PoterieForm({ initial, onClose }: { initial?: Poterie; onClose: () => void }) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    nom: initial?.nom ?? "",
    longueurCm: initial?.longueurCm?.toString() ?? "",
    largeurCm: initial?.largeurCm?.toString() ?? "",
    hauteurCm: initial?.hauteurCm?.toString() ?? "",
    forme: initial?.forme ?? "",
    couleur: initial?.couleur ?? "",
    matiere: initial?.matiere ?? "",
    artisan: initial?.artisan ?? "",
    origine: initial?.origine ?? "",
    prix: initial?.prix?.toString() ?? "",
    notes: initial?.notes ?? "",
  });
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom.trim()) {
      toast.error("Donnez un nom à la poterie");
      return;
    }
    let photoBlob = initial?.photoBlob;
    if (file) photoBlob = await fileToBlob(file);

    const p: Poterie = {
      id: initial?.id ?? uid(),
      nom: form.nom.trim(),
      longueurCm: form.longueurCm ? Number(form.longueurCm) : undefined,
      largeurCm: form.largeurCm ? Number(form.largeurCm) : undefined,
      hauteurCm: form.hauteurCm ? Number(form.hauteurCm) : undefined,
      forme: form.forme.trim() || undefined,
      couleur: form.couleur.trim() || undefined,
      matiere: form.matiere.trim() || undefined,
      artisan: form.artisan.trim() || undefined,
      origine: form.origine.trim() || undefined,
      prix: form.prix ? Number(form.prix) : undefined,
      notes: form.notes.trim() || undefined,
      photoBlob,
      createdAt: initial?.createdAt ?? new Date().toISOString(),
    };
    await savePoterie(p);
    await qc.invalidateQueries();
    toast.success(initial ? "Poterie mise à jour" : "Poterie ajoutée");
    onClose();
    if (!initial) navigate({ to: "/poterie/$id", params: { id: p.id } });
  };

  const onFile = (f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  return (
    <form onSubmit={submit} className="mb-8 grid gap-6 rounded-3xl border border-border bg-card p-6 lg:grid-cols-[240px_1fr]">
      <label className="group relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-background transition hover:border-accent/60">
        {preview ? <img src={preview} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" /> : initial?.photoBlob ? (
          <ExistingImage blob={initial.photoBlob} />
        ) : (
          <div className="text-center text-muted-foreground"><ImagePlus className="mx-auto h-7 w-7" /><p className="mt-2 text-xs">Photo</p></div>
        )}
        <input type="file" accept="image/*" className="absolute inset-0 cursor-pointer opacity-0" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
      </label>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nom"><Input value={form.nom} onChange={(e) => set("nom", e.target.value)} placeholder="Tokoname ovale brune" /></Field>
          <Field label="Forme"><Input value={form.forme} onChange={(e) => set("forme", e.target.value)} placeholder="Ovale, rectangle, ronde…" /></Field>
          <Field label="Matière"><Input value={form.matiere} onChange={(e) => set("matiere", e.target.value)} placeholder="Grès, terre cuite émaillée…" /></Field>
          <Field label="Couleur"><Input value={form.couleur} onChange={(e) => set("couleur", e.target.value)} placeholder="Brun, vert céladon…" /></Field>
          <Field label="Longueur (cm)"><Input type="number" min={0} value={form.longueurCm} onChange={(e) => set("longueurCm", e.target.value)} /></Field>
          <Field label="Largeur (cm)"><Input type="number" min={0} value={form.largeurCm} onChange={(e) => set("largeurCm", e.target.value)} /></Field>
          <Field label="Hauteur (cm)"><Input type="number" min={0} value={form.hauteurCm} onChange={(e) => set("hauteurCm", e.target.value)} /></Field>
          <Field label="Prix (€)"><Input type="number" min={0} value={form.prix} onChange={(e) => set("prix", e.target.value)} /></Field>
          <Field label="Artisan"><Input value={form.artisan} onChange={(e) => set("artisan", e.target.value)} placeholder="Yamaaki, Bigei…" /></Field>
          <Field label="Origine"><Input value={form.origine} onChange={(e) => set("origine", e.target.value)} placeholder="Japon, Tokoname…" /></Field>
        </div>
        <Field label="Notes"><Textarea rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} /></Field>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
          <Button type="submit">{initial ? "Enregistrer" : "Ajouter la poterie"}</Button>
        </div>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block text-sm">{label}</Label>
      {children}
    </div>
  );
}

function ExistingImage({ blob }: { blob: Blob }) {
  const url = useBlobUrl(blob);
  return url ? <img src={url} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" /> : null;
}
