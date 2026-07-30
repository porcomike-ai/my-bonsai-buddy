import type { Bonsai } from "@/lib/supabase-data";

export type CollectionSortOption =
  | "nom-asc"
  | "nom-desc"
  | "espece-asc"
  | "acquisition-desc"
  | "acquisition-asc"
  | "valeur-desc";

export type CollectionStatutFilter = "actifs" | "sortis" | "tous" | "favoris";

export interface CollectionFilters {
  q: string;
  style: string; // "" = tous les styles
  statut: CollectionStatutFilter;
  sort: CollectionSortOption;
  favorisFirst: boolean;
}

export const DEFAULT_COLLECTION_FILTERS: CollectionFilters = {
  q: "",
  style: "",
  statut: "actifs",
  sort: "nom-asc",
  favorisFirst: false,
};

/**
 * Filtre puis trie une liste de bonsaïs selon les critères de la vue
 * Collection. Logique unique partagée entre `/collection` (affichage de la
 * grille) et `/bonsai/$id` (calcul des voisins précédent/suivant) : les deux
 * vues doivent impérativement produire le même ordre pour que la navigation
 * "Suivant/Précédent" corresponde exactement à ce que l'utilisateur voyait
 * dans la grille.
 */
export function filterAndSortBonsais(bonsais: Bonsai[], filters: CollectionFilters): Bonsai[] {
  const needle = filters.q.trim().toLowerCase();
  const list = bonsais.filter((b) => {
    const dans = b.dansCollection ?? true;
    if (filters.statut === "actifs" && !dans) return false;
    if (filters.statut === "sortis" && dans) return false;
    if (filters.statut === "favoris" && !b.favori) return false;
    if (filters.style && b.style !== filters.style) return false;
    if (!needle) return true;
    return (
      b.nom.toLowerCase().includes(needle) ||
      b.espece.toLowerCase().includes(needle) ||
      (b.origine ?? "").toLowerCase().includes(needle)
    );
  });

  const cmp = (a: Bonsai, b: Bonsai): number => {
    switch (filters.sort) {
      case "nom-asc":
        return a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" });
      case "nom-desc":
        return b.nom.localeCompare(a.nom, "fr", { sensitivity: "base" });
      case "espece-asc":
        return a.espece.localeCompare(b.espece, "fr", { sensitivity: "base" });
      case "acquisition-desc": {
        const da = a.dateAcquisition ? new Date(a.dateAcquisition).getTime() : null;
        const db = b.dateAcquisition ? new Date(b.dateAcquisition).getTime() : null;
        if (da === null && db === null) return 0;
        if (da === null) return 1;
        if (db === null) return -1;
        return db - da;
      }
      case "acquisition-asc": {
        const da = a.dateAcquisition ? new Date(a.dateAcquisition).getTime() : null;
        const db = b.dateAcquisition ? new Date(b.dateAcquisition).getTime() : null;
        if (da === null && db === null) return 0;
        if (da === null) return 1;
        if (db === null) return -1;
        return da - db;
      }
      case "valeur-desc": {
        const va = a.valeurEstimee ?? null;
        const vb = b.valeurEstimee ?? null;
        if (va === null && vb === null) return 0;
        if (va === null) return 1;
        if (vb === null) return -1;
        return vb - va;
      }
      default:
        return 0;
    }
  };

  return list.sort((a, b) => {
    if (filters.favorisFirst) {
      const diff = Number(!!b.favori) - Number(!!a.favori);
      if (diff !== 0) return diff;
    }
    return cmp(a, b);
  });
}

/**
 * Search params partagés entre `/collection` et `/bonsai/$id`. Tous les
 * champs sont optionnels et à plat (types primitifs uniquement) pour rester
 * sérialisables tels quels dans l'URL. `undefined` signifie "valeur par
 * défaut" à chaque champ, pas de nettoyage supplémentaire nécessaire.
 */
export interface CollectionSearch {
  q?: string;
  style?: string;
  statut?: CollectionStatutFilter;
  sort?: CollectionSortOption;
  fav?: boolean;
}

const VALID_STATUTS: CollectionStatutFilter[] = ["actifs", "sortis", "tous", "favoris"];
const VALID_SORTS: CollectionSortOption[] = [
  "nom-asc",
  "nom-desc",
  "espece-asc",
  "acquisition-desc",
  "acquisition-asc",
  "valeur-desc",
];

/** Valide/normalise les search params bruts venus de l'URL (potentiellement forgés à la main). */
export function validateCollectionSearch(s: Record<string, unknown>): CollectionSearch {
  return {
    q: typeof s.q === "string" ? s.q : undefined,
    style: typeof s.style === "string" ? s.style : undefined,
    statut:
      typeof s.statut === "string" && VALID_STATUTS.includes(s.statut as CollectionStatutFilter)
        ? (s.statut as CollectionStatutFilter)
        : undefined,
    sort:
      typeof s.sort === "string" && VALID_SORTS.includes(s.sort as CollectionSortOption)
        ? (s.sort as CollectionSortOption)
        : undefined,
    fav: s.fav === true || s.fav === "true" ? true : undefined,
  };
}

/** Transforme les search params d'URL (partiels) en filtres complets, en comblant les trous avec les valeurs par défaut. */
export function collectionSearchToFilters(s: CollectionSearch): CollectionFilters {
  return {
    q: s.q ?? DEFAULT_COLLECTION_FILTERS.q,
    style: s.style ?? DEFAULT_COLLECTION_FILTERS.style,
    statut: s.statut ?? DEFAULT_COLLECTION_FILTERS.statut,
    sort: s.sort ?? DEFAULT_COLLECTION_FILTERS.sort,
    favorisFirst: s.fav ?? DEFAULT_COLLECTION_FILTERS.favorisFirst,
  };
}

/** Transforme des filtres complets en search params compacts (omet les valeurs par défaut pour garder l'URL courte). */
export function filtersToCollectionSearch(f: CollectionFilters): CollectionSearch {
  const s: CollectionSearch = {};
  if (f.q !== DEFAULT_COLLECTION_FILTERS.q) s.q = f.q;
  if (f.style !== DEFAULT_COLLECTION_FILTERS.style) s.style = f.style;
  if (f.statut !== DEFAULT_COLLECTION_FILTERS.statut) s.statut = f.statut;
  if (f.sort !== DEFAULT_COLLECTION_FILTERS.sort) s.sort = f.sort;
  if (f.favorisFirst !== DEFAULT_COLLECTION_FILTERS.favorisFirst) s.fav = true;
  return s;
}
