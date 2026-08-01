import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { BonsaiPhoto } from "@/components/bonsai-photo";
import { StatusBadge, etapeToVariant } from "@/components/ui/status-badge";
import { styleLabel, etapeLabel } from "@/lib/bonsai-meta";
import { ageActuel } from "@/lib/supabase-data";
import type { Bonsai } from "@/lib/supabase-data";

interface BonsaiCardProps {
  bonsai: Bonsai;
  /** Search params de la collection (pour Suivant/Précédent sur la fiche) */
  search?: Record<string, unknown>;
  density?: "comfortable" | "compact";
  className?: string;
}

export function BonsaiCard({
  bonsai,
  search,
  density = "comfortable",
  className,
}: BonsaiCardProps) {
  const isCompact = density === "compact";
  const etape = bonsai.etape;
  const isSorti = !(bonsai.dansCollection ?? true);
  const age = ageActuel(bonsai);

  return (
    <Link
      to="/bonsai/$id"
      params={{ id: bonsai.id }}
      search={search}
      className={cn(
        "group relative flex flex-col overflow-hidden border border-border bg-card transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md",
        isCompact ? "rounded-xl" : "rounded-2xl",
        className,
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          isCompact ? "aspect-square" : "aspect-[4/5]",
        )}
      >
        <BonsaiPhoto
          photoId={bonsai.photoPrincipale}
          className={cn(
            "h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]",
            isSorti && "grayscale",
          )}
        />

        {/* Gradient bas pour lisibilité */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />

        {/* Badge étape ou Sorti */}
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {isSorti ? (
            <StatusBadge variant="sorti" label="Sorti" size="sm" />
          ) : etape ? (
            <StatusBadge
              variant={etapeToVariant(etape)}
              label={etapeLabel(etape)}
              size="sm"
            />
          ) : null}
        </div>

        {/* Favori */}
        {bonsai.favori && (
          <div
            className="absolute right-2 top-2 rounded-full bg-black/35 p-1.5 backdrop-blur-sm"
            aria-label="Favori"
            title="Favori"
          >
            <Star className="h-3.5 w-3.5 fill-terracotta text-terracotta" />
          </div>
        )}

        {/* Nom + espèce en overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 text-white">
          <h3
            className={cn(
              "font-display font-semibold leading-tight tracking-tight drop-shadow-sm",
              isCompact ? "text-sm" : "text-base",
            )}
          >
            {bonsai.nom}
          </h3>
          <p className="mt-0.5 truncate text-xs italic text-white/80">{bonsai.espece}</p>
        </div>
      </div>

      {/* Meta bas (comfortable uniquement) */}
      {!isCompact && (
        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
          <span className="truncate text-xs text-muted-foreground">
            {styleLabel(bonsai.style).split(" — ")[0]}
          </span>
          <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
            {bonsai.hauteurCm != null && <span>{bonsai.hauteurCm} cm</span>}
            {age != null && <span>{age} ans</span>}
          </div>
        </div>
      )}
    </Link>
  );
}
