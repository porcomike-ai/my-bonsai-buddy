import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge, etapeToVariant } from "@/components/ui/status-badge";
import { styleLabel, etapeLabel } from "@/lib/bonsai-meta";
import type { Bonsai } from "@/lib/types"; // adapte le chemin si besoin

interface BonsaiCardProps {
  bonsai: Bonsai;
  photoUrl?: string | null;
  density?: "comfortable" | "compact";
  className?: string;
}

export function BonsaiCard({
  bonsai,
  photoUrl,
  density = "comfortable",
  className,
}: BonsaiCardProps) {
  const isCompact = density === "compact";
  const etape = bonsai.etape ?? "culture";

  return (
    <Link
      to="/bonsai/$id"
      params={{ id: bonsai.id }}
      className={cn(
        "group relative flex flex-col overflow-hidden surface-card-hover",
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
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={bonsai.nom}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
            <span className="text-4xl">🌱</span>
          </div>
        )}

        {/* Overlay gradient bas */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />

        {/* Badges haut */}
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          <StatusBadge
            variant={etapeToVariant(etape)}
            label={etapeLabel(etape)}
            size="sm"
          />
        </div>

        {/* Favori */}
        {bonsai.favori && (
          <div className="absolute right-2 top-2 rounded-full bg-black/35 p-1.5 backdrop-blur-sm">
            <Star className="h-3.5 w-3.5 fill-terracotta text-terracotta" />
          </div>
        )}

        {/* Nom + espèce */}
        <div className="absolute inset-x-0 bottom-0 p-3 text-white">
          <h3
            className={cn(
              "text-display leading-tight drop-shadow-sm",
              isCompact ? "text-sm" : "text-base",
            )}
          >
            {bonsai.nom}
          </h3>
          <p className="mt-0.5 truncate text-xs text-white/80 italic">
            {bonsai.espece}
          </p>
        </div>
      </div>

      {/* Meta bas (mode comfortable uniquement) */}
      {!isCompact && (
        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
          <span className="truncate text-meta">
            {styleLabel(bonsai.style).split(" — ")[0]}
          </span>
          {bonsai.hauteurCm != null && (
            <span className="shrink-0 text-meta">{bonsai.hauteurCm} cm</span>
          )}
        </div>
      )}
    </Link>
  );
}
