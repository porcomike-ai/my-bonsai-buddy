import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getPoterie, listBonsais, deletePoterie } from "@/lib/db";
import { useBlobUrl } from "@/lib/blob-url";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { PoterieForm } from "./poteries";
import { ArrowLeft, Container, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/poterie/$id")({
  head: () => ({
    meta: [
      { title: "Poterie — Bonsaï Studio" },
      { name: "description", content: "Fiche détaillée d'une poterie pour bonsaï : forme, matière, dimensions, artisan et arbre planté." },
      { property: "og:title", content: "Poterie — Bonsaï Studio" },
      { property: "og:description", content: "Fiche détaillée d'une poterie pour bonsaï." },
    ],
  }),
  component: PoterieDetail,
});


function PoterieDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);

  const { data: p, isPending } = useQuery({ queryKey: ["poterie", id], queryFn: () => getPoterie(id) });
  const { data: bonsais = [] } = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais });
  const url = useBlobUrl(p?.photoBlob);

  if (isPending) return <AppShell><p className="text-muted-foreground">Chargement…</p></AppShell>;
  if (!p) return <AppShell><p>Poterie introuvable.</p><Link to="/poteries" className="text-accent">Retour</Link></AppShell>;

  const planted = bonsais.find((b) => b.poterieId === p.id);

  const remove = async () => {
    if (!confirm(`Supprimer « ${p.nom} » ?`)) return;
    await deletePoterie(id);
    await qc.invalidateQueries();
    toast.success("Poterie supprimée");
    navigate({ to: "/poteries" });
  };

  return (
    <AppShell>
      <Link to="/poteries" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Poteries
      </Link>

      {editing && <PoterieForm initial={p} onClose={() => { setEditing(false); qc.invalidateQueries(); }} />}

      {!editing && (
        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary to-peach/30">
            {url ? <img src={url} alt="" className="h-full w-full object-cover" /> : (
              <div className="flex h-full w-full items-center justify-center"><Container className="h-12 w-12 text-muted-foreground" /></div>
            )}
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">Poterie</p>
            <h1 className="mt-1 font-display text-5xl font-semibold">{p.nom}</h1>

            <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {p.forme && <Stat label="Forme" value={p.forme} />}
              {p.matiere && <Stat label="Matière" value={p.matiere} />}
              {p.couleur && <Stat label="Couleur" value={p.couleur} />}
              {(p.longueurCm || p.largeurCm || p.hauteurCm) && (
                <Stat label="Dimensions" value={`${p.longueurCm ?? "?"} × ${p.largeurCm ?? "?"} × ${p.hauteurCm ?? "?"} cm`} />
              )}
              {p.artisan && <Stat label="Artisan" value={p.artisan} />}
              {p.origine && <Stat label="Origine" value={p.origine} />}
              {p.prix != null && <Stat label="Prix" value={`${p.prix} €`} />}
              <Stat label="État" value={planted ? (
                <Link to="/bonsai/$id" params={{ id: planted.id }} className="text-accent hover:underline">Plantée · {planted.nom}</Link>
              ) : "Libre"} />
            </dl>

            {p.notes && (
              <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Notes</p>
                <p className="mt-1.5 whitespace-pre-wrap text-sm">{p.notes}</p>
              </div>
            )}

            <div className="mt-8 flex gap-2">
              <Button variant="outline" onClick={() => setEditing(true)}><Pencil className="mr-1.5 h-4 w-4" /> Modifier</Button>
              <Button variant="outline" onClick={remove} className="text-destructive hover:text-destructive">
                <Trash2 className="mr-1.5 h-4 w-4" /> Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}
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
