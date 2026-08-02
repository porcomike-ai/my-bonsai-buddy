import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import {
  deleteBonsai,
  getBonsai,
  getPoterie,
  listBonsais,
  listJournal,
  listPhotos,
  listRappels,
  saveBonsai,
} from "@/lib/supabase-data";
import { AppShell } from "@/components/app-shell";
import { BonsaiForm } from "@/components/bonsai-form";
import { BonsaiHeader } from "@/components/bonsai-detail/header";
import { BonsaiPrevNextNav } from "@/components/bonsai-detail/prev-next-nav";
import { useConfirm } from "@/components/confirm-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { collectionSearchToFilters, filterAndSortBonsais, validateCollectionSearch } from "@/lib/collection-filters";

// Chargement paresseux des onglets — chaque onglet est bundle-splitté
const UnifiedTimeline = lazy(() => import("@/components/bonsai-detail/unified-timeline"));
const RappelsTab = lazy(() => import("@/components/bonsai-detail/rappels-tab"));

export const Route = createFileRoute("/bonsai/$id")({
  ssr: false,
  validateSearch: validateCollectionSearch,
  loader: async ({ params, context }) => {
    // Même queryKey que le `useQuery` de BonsaiDetail ci-dessous : évite un 2e
    // appel réseau `getBonsai` redondant juste après la navigation.
    const b = await context.queryClient.ensureQueryData({
      queryKey: ["bonsai", params.id],
      queryFn: () => getBonsai(params.id),
    });
    return b ? { nom: b.nom, espece: b.espece } : null;
  },
  head: ({ loaderData, params }) => {
    const nom = loaderData?.nom ?? "Bonsaï";
    const espece = loaderData?.espece;
    const baseDesc = `${nom}${espece ? ` (${espece})` : ""} — galerie évolutive, journal d'entretien et rappels de soins.`;
    const desc = baseDesc.length > 160 ? baseDesc.slice(0, 157) + "…" : baseDesc;
    const title = `${nom} — Bonsaï Studio`;
    return {
      meta: [
        { title: title.length > 60 ? `${nom.slice(0, 50)} — Bonsaï` : title },
        { name: "description", content: desc },
        { name: "robots", content: "noindex,follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/bonsai/${params.id}` },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: BonsaiDetail,
});

function TabFallback() {
  return <p className="pt-4 text-sm text-muted-foreground">Chargement…</p>;
}

function BonsaiDetail() {
  const { id } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const { confirm, dialog: confirmDialog, isConfirmOpen } = useConfirm();

  const { data: b, isPending } = useQuery({
    queryKey: ["bonsai", id],
    queryFn: () => getBonsai(id),
  });
  const { data: photos = [] } = useQuery({
    queryKey: ["photos", id],
    queryFn: () => listPhotos(id),
  });
  const { data: entries = [] } = useQuery({
    queryKey: ["journal", id],
    queryFn: () => listJournal(id),
  });
  const { data: rappels = [] } = useQuery({
    queryKey: ["rappels", id],
    queryFn: () => listRappels(id),
  });
  const { data: poterie } = useQuery({
    queryKey: ["poterie", b?.poterieId],
    queryFn: () => (b?.poterieId ? getPoterie(b.poterieId) : null),
    enabled: !!b?.poterieId,
  });
  // Même queryKey que /collection : partage le cache React Query, pas de
  // requête réseau supplémentaire si la collection a déjà été visitée.
  const { data: allBonsais = [] } = useQuery({ queryKey: ["bonsais"], queryFn: listBonsais });

  // Navigation Précédent/Suivant : reproduit exactement le filtrage/tri de
  // la vue Collection (fonction partagée) à partir des filtres reçus en
  // search params, pour que "Suivant" corresponde à l'arbre suivant dans la
  // liste que l'utilisateur avait sous les yeux avant d'ouvrir cette fiche.
  const filters = useMemo(() => collectionSearchToFilters(search), [search]);
  const filteredIds = useMemo(
    () => filterAndSortBonsais(allBonsais, filters).map((x) => x.id),
    [allBonsais, filters],
  );
  const currentIndex = filteredIds.indexOf(id);
  const prevId = currentIndex > 0 ? filteredIds[currentIndex - 1] : undefined;
  const nextId =
    currentIndex >= 0 && currentIndex < filteredIds.length - 1
      ? filteredIds[currentIndex + 1]
      : undefined;
  const navPosition =
    currentIndex >= 0 ? { index: currentIndex + 1, total: filteredIds.length } : undefined;

  // Raccourcis clavier ← / → : ignorés pendant l'édition du formulaire, si
  // une boîte de confirmation est ouverte, ou si le focus est dans un champ
  // de saisie (texte, select, contenteditable) pour ne pas interférer avec
  // la frappe ou la navigation native du clavier dans un formulaire.
  useEffect(() => {
    if (editing || isConfirmOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }
      if (e.key === "ArrowLeft" && prevId) {
        navigate({ to: "/bonsai/$id", params: { id: prevId }, search });
      } else if (e.key === "ArrowRight" && nextId) {
        navigate({ to: "/bonsai/$id", params: { id: nextId }, search });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [editing, isConfirmOpen, prevId, nextId, search, navigate]);

  if (isPending)
    return (
      <AppShell>
        <p className="text-muted-foreground">Chargement…</p>
      </AppShell>
    );
  if (!b)
    return (
      <AppShell>
        <p className="text-muted-foreground">Bonsaï introuvable.</p>
        <Link to="/collection" search={search} className="text-accent">
          Retour à la collection
        </Link>
      </AppShell>
    );

  const remove = async () => {
    const confirmed = await confirm({
      title: "Supprimer ce bonsaï ?",
      description: `« ${b.nom} » et toutes ses données (photos, journal, rappels) seront supprimés définitivement.`,
      destructive: true,
      confirmLabel: "Supprimer",
    });
    if (!confirmed) return;
    try {
      await deleteBonsai(id);
    } catch (e) {
      toast.error(
        "Échec de la suppression : " + (e instanceof Error ? e.message : "erreur inconnue"),
      );
      return;
    }
    qc.invalidateQueries({ queryKey: ["bonsais"] });
    qc.invalidateQueries({ queryKey: ["photos-all"] });
    qc.invalidateQueries({ queryKey: ["journal"] });
    qc.invalidateQueries({ queryKey: ["rappels"] });
    toast.success("Bonsaï supprimé");
    navigate({ to: "/collection", search });
  };

  const toggleFavori = async () => {
    try {
      await saveBonsai({ ...b, favori: !b.favori });
    } catch (e) {
      toast.error(
        "Échec de la mise à jour : " + (e instanceof Error ? e.message : "erreur inconnue"),
      );
      return;
    }
    qc.invalidateQueries({ queryKey: ["bonsai", id] });
    qc.invalidateQueries({ queryKey: ["bonsais"] });
    toast.success(b.favori ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  const setMainPhoto = async (pid: string) => {
    const photo = photos.find((p) => p.id === pid);
    if (!photo) return;
    try {
      await saveBonsai({ ...b, photoPrincipale: photo.storagePath });
    } catch (e) {
      toast.error(
        "Échec de la mise à jour de la photo principale : " +
          (e instanceof Error ? e.message : "erreur inconnue"),
      );
      return;
    }
    qc.invalidateQueries({ queryKey: ["bonsai", id] });
  };

  const updateBonsai = async (updated: typeof b) => {
    try {
      await saveBonsai(updated);
    } catch (e) {
      toast.error(
        "Échec de la mise à jour : " + (e instanceof Error ? e.message : "erreur inconnue"),
      );
      return;
    }
    qc.invalidateQueries({ queryKey: ["bonsai", id] });
  };

  if (editing) {
    return (
      <AppShell>
        <button
          onClick={() => setEditing(false)}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Annuler la modification
        </button>
        <h1 className="font-display text-4xl font-semibold">Modifier « {b.nom} »</h1>
        <div className="mt-8">
          <BonsaiForm
            initial={b}
            onSaved={() => {
              setEditing(false);
              qc.invalidateQueries({ queryKey: ["bonsai", id] });
              qc.invalidateQueries({ queryKey: ["bonsais"] });
            }}
          />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Sticky full-width (main = w-full) — pas de 100vw / overflow caché */}
      <div
        className="sticky z-20 mb-6 border-b border-border/50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85"
        style={{ top: "var(--app-header-h, 4.5rem)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <Link
            to="/collection"
            search={search}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Collection
          </Link>
          {filteredIds.length > 1 && (
            <BonsaiPrevNextNav
              prevId={prevId}
              nextId={nextId}
              position={navPosition}
              search={search}
            />
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        <BonsaiHeader
          bonsai={b}
          poterie={poterie}
          photosCount={photos.length}
          onEdit={() => setEditing(true)}
          onDelete={remove}
          onToggleFavori={toggleFavori}
        >
          <Tabs defaultValue="timeline" className="mt-10">
            <TabsList className="bg-secondary/60">
              <TabsTrigger value="timeline">
                Timeline ({photos.length + entries.length})
              </TabsTrigger>
              <TabsTrigger value="rappels">
                Rappels ({rappels.filter((r) => r.actif).length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="pt-6">
              <Suspense fallback={<TabFallback />}>
                <UnifiedTimeline
                  bonsaiId={id}
                  bonsai={b}
                  photos={photos}
                  entries={entries}
                  mainId={b.photoPrincipale}
                  onSetMain={setMainPhoto}
                  onUpdateBonsai={updateBonsai}
                />
              </Suspense>
            </TabsContent>
            <TabsContent value="rappels" className="pt-6">
              <Suspense fallback={<TabFallback />}>
                <RappelsTab bonsaiId={id} rappels={rappels} />
              </Suspense>
            </TabsContent>
          </Tabs>
        </BonsaiHeader>
      </div>
      {confirmDialog}
      </div>
    </AppShell>
  );
}
