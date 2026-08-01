import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { Plus, Search, Sprout, X } from "lucide-react";
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

/** Nombre de colonnes responsive (aligné sur la grille Tailwind). */
function useColumnCount(): number {
  const [cols, setCols] = useState(2);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1280) setCols(4);
      else if (w >= 1024) setCols(3);
      else setCols(2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

/**
 * Virtualisation basée sur le scroll fenêtre (pas de conteneur scroll interne).
 * Évite les pièges de hauteur (contain:strict, max-h + enfants absolute).
 */
function useWindowVirtualRows(rowCount: number, rowH: number, overscan = 4) {
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [viewportH, setViewportH] = useState(900);
  const [listTop, setListTop] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onResize = () => {
      setViewportH(window.innerHeight);
      if (listRef.current) {
        const rect = listRef.current.getBoundingClientRect();
        setListTop(rect.top + window.scrollY);
      }
    };
    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [rowCount, rowH]);

  // Recalcule le top quand le layout change (filtres, header)
  useEffect(() => {
    if (!listRef.current) return;
    const ro = new ResizeObserver(() => {
      const rect = listRef.current!.getBoundingClientRect();
      setListTop(rect.top + window.scrollY);
    });
    ro.observe(listRef.current);
    return () => ro.disconnect();
  }, []);

  const relativeScroll = Math.max(0, scrollY - listTop);
  const startRow = Math.max(0, Math.floor(relativeScroll / rowH) - overscan);
  const endRow = Math.min(
    rowCount - 1,
    Math.ceil((relativeScroll + viewportH) / rowH) + overscan,
  );

  const visibleRows: number[] = [];
  if (rowCount > 0) {
    for (let r = startRow; r <= endRow; r++) visibleRows.push(r);
  }

  return { listRef, visibleRows, totalHeight: rowCount * rowH };
}

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
  const cols = useColumnCount();

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

  // ── Chips actifs (filtres ≠ défaut) ──────────────────────────────────────
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

  const clearAllFilters = () => {
    navigate({ search: {}, replace: true });
  };

  // ── Virtualisation fenêtre ───────────────────────────────────────────────
  const gap = isMobile ? 12 : 20;
  const estimateCardH = density === "compact" ? 210 : 340;
  const rowH = estimateCardH + gap;
  const rowCount = Math.ceil(filtered.length / cols);
  const { listRef, visibleRows, totalHeight } = useWindowVirtualRows(rowCount, rowH);

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

      {/* Filtres sticky */}
      <div className="sticky top-0 z-20 -mx-1 mb-4 space-y-3 bg-background/95 px-1 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
        <div className="flex flex-wrap gap-3">
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
          <Select
            value={styleFilter || ALL_STYLES}
            onValueChange={(v) => setStyleFilter(v === ALL_STYLES ? "" : v)}
          >
            <SelectTrigger
              aria-label="Filtrer par style de bonsaï"
              className="h-11 w-auto min-w-[140px] rounded-full border-input bg-card px-4 text-sm"
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
              className="h-11 w-auto min-w-[160px] rounded-full border-input bg-card px-4 text-sm"
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
              className="h-11 w-auto min-w-[160px] rounded-full border-input bg-card px-4 text-sm"
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

        {chips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={c.clear}
                className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent transition hover:bg-accent/20"
              >
                {c.label}
                <X className="h-3 w-3" />
              </button>
            ))}
            {chips.length > 1 && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-[11px] font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
              >
                Tout effacer
              </button>
            )}
          </div>
        )}
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
        <div ref={listRef} className="relative w-full" style={{ height: totalHeight }}>
          {visibleRows.map((rowIndex) => {
            const startIdx = rowIndex * cols;
            const rowItems = filtered.slice(startIdx, startIdx + cols);
            return (
              <div
                key={rowIndex}
                className="absolute left-0 right-0 grid"
                style={{
                  top: rowIndex * rowH,
                  height: estimateCardH,
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  gap,
                }}
              >
                {rowItems.map((b) => (
                  <div key={b.id} className="min-w-0">
                    <BonsaiCard bonsai={b} search={search} density={density} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
