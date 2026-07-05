import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { listBonsais } from "@/lib/supabase-data";
import { AppShell } from "@/components/app-shell";
import { BonsaiPhoto } from "@/components/bonsai-photo";
import { STYLES, styleLabel } from "@/lib/bonsai-meta";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Search, Sprout, Star } from "lucide-react";

type SortOption =
  | "nom-asc"
  | "nom-desc"
  | "espece-asc"
  | "acquisition-desc"
  | "acquisition-asc"
  | "valeur-desc";

export const Route = createFileRoute("/collection")({
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
  const [q, setQ] = useState("");
  const [styleFilter, setStyleFilter] = useState<string>("");
  const [statutFilter, setStatutFilter] = useState<"actifs" | "sortis" | "tous" | "favoris">(
    "actifs",
  );
  const [sortBy, setSortBy] = useState<SortOption>("nom-asc");
  const [favorisFirst, setFavorisFirst] = useState(false);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = bonsais.filter((b) => {
      const dans = b.dansCollection ?? true;
      if (statutFilter === "actifs" && !dans) return false;
      if (statutFilter === "sortis" && dans) return false;
      if (statutFilter === "favoris" && !b.favori) return false;
      if (styleFilter && b.style !== styleFilter) return false;
      if (!needle) return true;
      return (
        b.nom.toLowerCase().includes(needle) ||
        b.espece.toLowerCase().includes(needle) ||
        (b.origine ?? "").toLowerCase().includes(needle)
      );
    });

    const cmp = (a: typeof list[number], b: typeof list[number]): number => {
      switch (sortBy) {
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
      if (favorisFirst) {
        const diff = Number(!!b.favori) - Number(!!a.favori);
        if (diff !== 0) return diff;
      }
      return cmp(a, b);
    });
  }, [bonsais, q, styleFilter, statutFilter, sortBy, favorisFirst]);

  const actifsCount = bonsais.filter((b) => b.dansCollection ?? true).length;

  return (
    <AppShell>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Collection</p>
          <h1 className="mt-1 font-display text-4xl font-semibold">Mes bonsaïs</h1>
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
        <select
          value={styleFilter}
          onChange={(e) => setStyleFilter(e.target.value)}
          aria-label="Filtrer par style de bonsaï"
          className="h-11 rounded-full border border-input bg-card px-4 text-sm"
        >
          <option value="">Tous les styles</option>
          {STYLES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <select
          value={statutFilter}
          onChange={(e) =>
            setStatutFilter(e.target.value as "actifs" | "sortis" | "tous" | "favoris")
          }
          aria-label="Filtrer par statut dans la collection"
          className="h-11 rounded-full border border-input bg-card px-4 text-sm"
        >
          <option value="actifs">Dans la collection</option>
          <option value="favoris">Favoris</option>
          <option value="sortis">Sortis de la collection</option>
          <option value="tous">Tous</option>
        </select>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
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
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((b) => (
            <li key={b.id}>
              <Link
                to="/bonsai/$id"
                params={{ id: b.id }}
                className="group block overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <BonsaiPhoto
                    photoId={b.photoPrincipale}
                    className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${(b.dansCollection ?? true) ? "" : "grayscale"}`}
                  />
                  {!(b.dansCollection ?? true) && (
                    <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur">
                      Sorti
                    </span>
                  )}
                  {b.favori && (
                    <span
                      className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-amber-500 backdrop-blur"
                      aria-label="Favori"
                      title="Favori"
                    >
                      <Star className="h-4 w-4 fill-current" />
                    </span>
                  )}
                </div>
                <div className="space-y-1 p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="truncate font-display text-lg font-semibold">{b.nom}</h2>
                    {b.ageEstime != null && (
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {b.ageEstime} ans
                      </span>
                    )}
                  </div>
                  <p className="truncate text-sm italic text-muted-foreground">{b.espece}</p>
                  <p className="truncate text-[11px] uppercase tracking-wider text-accent">
                    {styleLabel(b.style).split(" — ")[0]}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
