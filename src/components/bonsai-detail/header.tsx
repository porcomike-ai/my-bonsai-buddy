import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Pencil, Trash2, Star } from "lucide-react";

import { BonsaiPhoto } from "@/components/bonsai-photo";
import { Button } from "@/components/ui/button";
import { styleLabel, etapeLabel } from "@/lib/bonsai-meta";
import type { Bonsai, Poterie } from "@/lib/supabase-data";

import { SharePdfButton } from "./share-pdf-button";
import { Stat } from "./stat";

export function BonsaiHeader({
  bonsai: b,
  poterie,
  photosCount,
  onEdit,
  onDelete,
  onToggleFavori,
  children,
}: {
  bonsai: Bonsai;
  poterie: Poterie | null | undefined;
  photosCount: number;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavori: () => void;
  children?: ReactNode;
}) {
  return (
    <>
      <div>
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="aspect-square w-full">
            <BonsaiPhoto photoId={b.photoPrincipale} className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onEdit}>
            <Pencil className="mr-1.5 h-4 w-4" /> Modifier
          </Button>
          <Button
            variant="outline"
            aria-label="Supprimer ce bonsaï"
            className="text-destructive hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <SharePdfButton id={b.id} bonsai={b} photosCount={photosCount} />
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-accent">{styleLabel(b.style)}</p>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-5xl font-semibold leading-tight">{b.nom}</h1>
          <button
            type="button"
            onClick={onToggleFavori}
            aria-label={b.favori ? "Retirer des favoris" : "Ajouter aux favoris"}
            aria-pressed={!!b.favori}
            title={b.favori ? "Retirer des favoris" : "Ajouter aux favoris"}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:bg-secondary ${b.favori ? "text-amber-500" : "text-muted-foreground"}`}
          >
            <Star className={`h-5 w-5 ${b.favori ? "fill-current" : ""}`} />
          </button>
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
          {b.dateAcquisition && (
            <Stat
              label="Acquis le"
              value={format(parseISO(b.dateAcquisition), "d MMM yyyy", { locale: fr })}
            />
          )}
          {b.origine && <Stat label="Origine" value={b.origine} />}
          {b.prixAchat != null && (
            <Stat label="Prix d'achat" value={`${b.prixAchat.toLocaleString("fr-FR")} €`} />
          )}
          {b.valeurEstimee != null && (
            <Stat label="Valeur estimée" value={`${b.valeurEstimee.toLocaleString("fr-FR")} €`} />
          )}
          {poterie && (
            <Stat
              label="Poterie"
              value={
                <Link
                  to="/poterie/$id"
                  params={{ id: poterie.id }}
                  className="text-accent hover:underline"
                >
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
      </div>
    </>
  );
}
