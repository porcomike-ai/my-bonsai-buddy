import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { listBonsais } from "@/lib/supabase-data";
import { AppShell } from "@/components/app-shell";
import { BonsaiCard } from "@/components/bonsai-card";
import { STYLES } from "@/lib/bonsai-meta";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Plus, Search, Sprout, X, SlidersHorizontal } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  collectionSearchToFilters,
  filterAndSortBonsais,
  filtersToCollectionSearch,
  validateCollectionSearch,
  DEFAULT_COLLECTION_FILTERS,
  type CollectionFilters,
  type CollectionSortOption,
  type CollectionStatutFilter,
} from "@/lib/collection-filters";

// Radix <Select.Item> interdit une value="" — sentinel pour "tous les styles"
const ALL_STYLES = "__all__";

const STATUT_LABELS: Record<CollectionStatutFilter, string> = {
  actifs: "Dans la collection",
  favoris: "Favoris",
  sortis: "Sortis",
  tous: "Tous",
};

const SORT_LABELS: Record<CollectionSortOption, string> = {
  "nom-asc": "A → Z",
  "nom-desc": "Z → A",
  "espece-asc": "Espèce",
  "acquisition-desc": "Acquisition ↓",
  "acquisition-asc": "Acquisition ↑",
  "valeur-desc": "Valeur ↓",
};

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
  const [sheetOpen, setSheetOpen] = useState(false);

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

  // Chips actifs (hors recherche pour le badge ; recherche incluse dans les chips affichés)
  const chips = useMemo(() => {
    const list: { key: string; label: string; clear: () => void }[] = [];
    if (q.trim()) {
      list.push({ key: "q", label: `« ${q.trim()} »`, clear: () => setQ("") });
    }
    if (styleFilter) {
      const styleName =
        STYLES.find((s) => s.value === styleFilter)?.label.split(" — ")[0] ?? styleFilter;
      list.push({ key: "style", label: styleName, clear: () => setStyleFilter("") });
    }
    if (statutFilter !== DEFAULT_COLLECTION_FILTERS.statut) {
      list.push({
        key: "statut",
        label: STATUT_LABELS[statutFilter],
        clear: () => setStatutFilter(DEFAULT_COLLECTION_FILTERS.statut),
      });
    }
    if (sortBy !== DEFAULT_COLLECTION_FILTERS.sort) {
      list.push({
        key: "sort",
        label: SORT_LABELS[sortBy],
        clear: () => setSortBy(DEFAULT_COLLECTION_FILTERS.sort),
      });
    }
    if (favorisFirst) {
      list.push({
        key: "fav",
        label: "Favoris en premier",
        clear: () => setFavorisFirst(false),
      });
    }
    return list;
  }, [q, styleFilter, statutFilter, sortBy, favorisFirst]);

  /** Badge bouton Filtres : hors recherche (déjà visible dans le champ). */
  const filterBadgeCount = chips.filter((c) => c.key !== "q").length;

  const clearAllFilters = () => {
    navigate({ search: {}, replace: true });
  };

  const filtersControls = (
    <>
      <Select
        value={styleFilter || ALL_STYLES}
        onValueChange={(v) => setStyleFilter(v === ALL_STYLES ? "" : v)}
      >
        <SelectTrigger
          aria-label="Filtrer par style de bonsaï"
          className="h-11 w-full rounded-full border-input bg-card px-4 text-sm sm:w-auto sm:min-w-[140px]"
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
          className="h-11 w-full rounded-full border-input bg-card px-4 text-sm sm:w-auto sm:min-w-[160px]"
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
          className="h-11 w-full rounded-full border-input bg-card px-4 text-sm sm:w-auto sm:min-w-[160px]"
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
    </>
  );

  const chipsRow =
    chips.length > 0 ? (
      <div className="flex items-center gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {chips.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={c.clear}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent transition hover:bg-accent/20"
          >
            {c.label}
            <X className="h-3 w-3" />
          </button>
        ))}
        {chips.length > 1 && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="shrink-0 text-[11px] font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            Tout effacer
          </button>
        )}
      </div>
    ) : null;

  return (
    <AppShell>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-label">Collection</p>
          <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight">Mes bonsaïs</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {actifsCount} arbre{actifsCount > 1 ? "s" : ""} dans votre collection
            {bonsais.length > actifsCount &&
              ` · ${bonsais.length - actifsCount} sorti${bonsais.length - actifsCount > 1 ? "s" : ""}`}
            {filtered.length !== bonsais.length && (
              <span className="text-accent">
                {" "}
                · {filtered.length} affiché{filtered.length > 1 ? "s" : ""}
              </span>
            )}
          </p>
        </div>
        <Link
          to="/bonsai/nouveau"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> Nouveau bonsaï
        </Link>
      </header>

      {/* Filtres sticky full-bleed : fond flouté sur toute la largeur viewport,
          contenu réel réeligné sur max-w-7xl + px-6 (comme AppShell main). */}
      <div
        className="sticky z-20 mb-4 border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85"
        style={{
          top: "var(--app-header-h, 4.5rem)",
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
        }}
      >
        <div className="mx-auto max-w-7xl space-y-2 px-6 py-2.5">
        {/* Mobile : recherche + bouton Filtres */}
        <div className="flex gap-2 md:hidden">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher…"
              aria-label="Rechercher dans la collection"
              className="h-10 rounded-full bg-card pl-10"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setSheetOpen(true)}
            className="relative h-10 shrink-0 rounded-full px-3"
            aria-label="Ouvrir les filtres"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {filterBadgeCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                {filterBadgeCount}
              </span>
            )}
          </Button>
        </div>

        {/* Desktop : tous les contrôles en ligne */}
        <div className="hidden flex-wrap gap-3 md:flex">
          <div className="relative min-w-[200px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher par nom, espèce, origine…"
              aria-label="Rechercher dans la collection"
              className="h-11 rounded-full bg-card pl-10"
            />
          </div>
          {filtersControls}
        </div>

        {chipsRow}
        </div>
      </div>

      {/* Sheet filtres — mobile uniquement */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-3xl pb-24">
          <SheetHeader className="text-left">
            <SheetTitle className="font-display text-xl">Filtres</SheetTitle>
            <SheetDescription>
              Affine ta collection par style, statut et tri.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label className="text-label">Style</Label>
              <Select
                value={styleFilter || ALL_STYLES}
                onValueChange={(v) => setStyleFilter(v === ALL_STYLES ? "" : v)}
              >
                <SelectTrigger aria-label="Style" className="h-11 w-full rounded-full">
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
            </div>

            <div className="space-y-2">
              <Label className="text-label">Statut</Label>
              <Select
                value={statutFilter}
                onValueChange={(v) => setStatutFilter(v as CollectionStatutFilter)}
              >
                <SelectTrigger aria-label="Statut" className="h-11 w-full rounded-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="actifs">Dans la collection</SelectItem>
                  <SelectItem value="favoris">Favoris</SelectItem>
                  <SelectItem value="sortis">Sortis de la collection</SelectItem>
                  <SelectItem value="tous">Tous</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-label">Tri</Label>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as CollectionSortOption)}>
                <SelectTrigger aria-label="Tri" className="h-11 w-full rounded-full">
                  <SelectValue />
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
            </div>

            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-input bg-card px-4 py-3 text-sm">
              <Checkbox
                checked={favorisFirst}
                onCheckedChange={(v) => setFavorisFirst(v === true)}
                aria-label="Favoris en premier"
              />
              <span className="font-medium">Favoris en premier</span>
            </label>
          </div>

          <SheetFooter className="mt-8 mb-2 flex flex-row gap-2 sm:justify-between">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-full"
              onClick={() => {
                clearAllFilters();
              }}
              disabled={filterBadgeCount === 0 && !q.trim()}
            >
              Tout effacer
            </Button>
            <Button
              type="button"
              className="flex-1 rounded-full"
              onClick={() => setSheetOpen(false)}
            >
              Voir {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

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
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((b) => (
            <li
              key={b.id}
              className="min-w-0"
              style={{
                contentVisibility: "auto",
                containIntrinsicSize: density === "compact" ? "auto 220px" : "auto 380px",
              }}
            >
              <BonsaiCard bonsai={b} search={search} density={density} />
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
