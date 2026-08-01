import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { CollectionSearch } from "@/lib/collection-filters";

interface BonsaiPrevNextNavProps {
  prevId?: string;
  nextId?: string;
  /** Position 1-indexée dans la liste filtrée, ex. "3 / 12". Absent si la liste est vide. */
  position?: { index: number; total: number };
  /** Search params à reporter sur les liens Précédent/Suivant, pour rester dans le même filtre. */
  search: CollectionSearch;
}

/**
 * Boutons Précédent/Suivant pour parcourir la collection filtrée sans
 * repasser par la vue liste. `prevId`/`nextId` sont déjà calculés par
 * l'appelant (BonsaiDetail) à partir de la même fonction de filtrage/tri que
 * la page Collection — ce composant ne fait que l'affichage et la
 * navigation.
 */
export function BonsaiPrevNextNav({ prevId, nextId, position, search }: BonsaiPrevNextNavProps) {
  return (
    <nav
      aria-label="Navigation entre arbres de la collection filtrée"
      className="flex items-center gap-2"
    >
      {prevId ? (
        <Link
          to="/bonsai/$id"
          params={{ id: prevId }}
          search={search}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-input bg-card px-3 text-sm text-foreground transition hover:border-accent/60 hover:text-accent"
          aria-label="Bonsaï précédent"
          title="Bonsaï précédent (flèche gauche)"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Précédent</span>
        </Link>
      ) : (
        <span
          className="inline-flex h-9 cursor-not-allowed items-center gap-1.5 rounded-full border border-input bg-card px-3 text-sm text-muted-foreground opacity-50"
          aria-disabled="true"
          title="Aucun arbre précédent dans ce filtre"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Précédent</span>
        </span>
      )}

      {position && (
        <span className="min-w-[3.5rem] px-1 text-center text-xs tabular-nums text-muted-foreground">
          {position.index} / {position.total}
        </span>
      )}

      {nextId ? (
        <Link
          to="/bonsai/$id"
          params={{ id: nextId }}
          search={search}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-input bg-card px-3 text-sm text-foreground transition hover:border-accent/60 hover:text-accent"
          aria-label="Bonsaï suivant"
          title="Bonsaï suivant (flèche droite)"
        >
          <span className="hidden sm:inline">Suivant</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span
          className="inline-flex h-9 cursor-not-allowed items-center gap-1.5 rounded-full border border-input bg-card px-3 text-sm text-muted-foreground opacity-50"
          aria-disabled="true"
          title="Aucun arbre suivant dans ce filtre"
        >
          <span className="hidden sm:inline">Suivant</span>
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
