import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { listBonsais } from "@/lib/supabase-data";
import { AppShell } from "@/components/app-shell";
import { BonsaiCard } from "@/components/bonsai-card";
import { STYLES } from "@/lib/bonsai-meta";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Search, Sprout } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  collectionSearchToFilters,
  filterAndSortBonsais,
  filtersToCollectionSearch,
  validateCollectionSearch,
  type CollectionFilters,
  type CollectionSortOption,
  type CollectionStatutFilter,
} from "@/lib/collection-filters";

// Radix <Select.Item> interdit une value="" — sentinel pour "tous les styles"
const ALL_STYLES = "__all__";

export const Route = createFileRoute("/collection")({
  validateSearch: validateCollectionSearch,
  head: () => ({
    meta: [
      { title: "Mes bonsaïs — Bonsaï Studio" },
      {
        name: "description",
        content:
          "Toute votre collection de bonsaïs en un coup d'œil : filtres par style, recherche et statut de chaque arbre.",
      },
      { property: "og:title", content: "Mes bonsaïs — Bonsaï Studio" },
      {
        property: "og:description",
        content: "Parcourez votre collection de bonsaïs avec filtres par style et statut.",
      },
      { property: "og:url", content: "/collection" },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const { data: bonsais = [] } = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais });
  const navigate = useNavigate({ from: "/collection" });
  const search = Route.useSearch();
  const filters = collectionSearchToFilters(search);
  const { q, style: styleFilter, statut: statutFilter, sort: sortBy, favorisFirst } = filters;
  const isMobile = useIsMobile();

  const patchFilters = (patch: Partial<CollectionFilters>) => {
    const next = { ...filters, ...patch };
    navigate({ search: filtersToCollectionSearch(next), replace: true });
  };
  const setQ = (v: string) => patchFilters({ q: v });
  const setStyleFilter = (v: string) => patchFilters({ style: v });
  const setStatutFilter = (v: CollectionStatutFilter) => patchFilters({ statut: v });
  const setSortBy = (v: CollectionSortOption) => patchFilters({ sort: v });
  const setFavorisFirst = (v: boolean) => patchFilters({ favorisFirst: v });

  const filtered = useMemo(
    () => filterAndSortBonsais(bonsais, filters),
    [bonsais, q, styleFilter, statutFilter, sortBy, favorisFirst],
  );

  const actifsCount = bonsais.filter((b) => b.dansCollection ?? true).length;
  const density = isMobile ? "compact" : "comfortable";

  return (
    <AppShell>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-label">Collection</p>
          <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight">Mes bonsaïs</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {actifsCount} arbre{actifsCount > 1 ? "s" : ""} dans votre collection
            {bonsais.length > actifsCount &&
              ` · ${bonsais.length - actifsCount} sorti${bonsais.length - actifsCount > 1 ? "s" : ""}`}
          </p>
        </div>
        <Link
          to="/bonsai/nouveau"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> Nouveau bonsaï
        </Link>
      </header>

      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher par nom, espèce, origine…"
            aria-label="Rechercher dans la collection"
            className="h-11 rounded-full bg-card pl-10"
          />
        </div>
        <Select
          value={styleFilter || ALL_STYLES}
          onValueChange={(v) => setStyleFilter(v === ALL_STYLES ? "" : v)}
        >
          <SelectTrigger
            aria-label="Filtrer par style de bonsaï"
            className="h-11 w-auto min-w-[160px] rounded-full border-input bg-card px-4 text-sm"
          >
            <SelectValue placeholder="Tous les styles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_STYLES}>Tous les styles</SelectItem>
            {STYLES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statutFilter}
          onValueChange={(v) => setStatutFilter(v as CollectionStatutFilter)}
        >
          <SelectTrigger
            aria-label="Filtrer par statut dans la collection"
            className="h-11 w-auto min-w-[180px] rounded-full border-input bg-card px-4 text-sm"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="actifs">Dans la collection</SelectItem>
            <SelectItem value="favoris">Favoris</SelectItem>
            <SelectItem value="sortis">Sortis de la collection</SelectItem>
            <SelectItem value="tous">Tous</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as CollectionSortOption)}>
          <SelectTrigger
            aria-label="Trier les bonsaïs"
            className="h-11 w-auto min-w-[200px] rounded-full border-input bg-card px-4 text-sm"
          >
            <SelectValue placeholder="Trier par…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nom-asc">Alphabétique (A → Z)</SelectItem>
            <SelectItem value="nom-desc">Alphabétique (Z → A)</SelectItem>
            <SelectItem value="espece-asc">Par espèce (A → Z)</SelectItem>
            <SelectItem value="acquisition-desc">Acquisition (récent → ancien)</SelectItem>
            <SelectItem value="acquisition-asc">Acquisition (ancien → récent)</SelectItem>
            <SelectItem value="valeur-desc">Valeur estimée (décroissante)</SelectItem>
          </SelectContent>
        </Select>
        <label className="flex h-11 cursor-pointer items-center gap-2 rounded-full border border-input bg-card px-4 text-sm">
          <Checkbox
            checked={favorisFirst}
            onCheckedChange={(v) => setFavorisFirst(v === true)}
            aria-label="Favoris en premier"
          />
          <span>Favoris en premier</span>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card/50 py-16 text-center">
          <Sprout className="mx-auto h-10 w-10 text-muted-foreground" />
          <h2 className="mt-4 font-display text-2xl font-semibold">
            {bonsais.length === 0 ? "Votre collection est vide" : "Aucun arbre ne correspond"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {bonsais.length === 0
              ? "Ajoutez votre premier bonsaï pour commencer votre carnet."
              : "Modifiez vos filtres pour voir d'autres arbres."}
          </p>
          {bonsais.length === 0 && (
            <Link
              to="/bonsai/nouveau"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              <Plus className="h-4 w-4" /> Ajouter un bonsaï
            </Link>
          )}
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((b) => (
            <li key={b.id}>
              <BonsaiCard bonsai={b} search={search} density={density} />
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
