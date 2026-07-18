import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { lazy, Suspense, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import {
  deleteBonsai,
  getBonsai,
  getPoterie,
  listJournal,
  listPhotos,
  listRappels,
  saveBonsai,
} from "@/lib/supabase-data";
import { AppShell } from "@/components/app-shell";
import { BonsaiForm } from "@/components/bonsai-form";
import { BonsaiHeader } from "@/components/bonsai-detail/header";
import { useConfirm } from "@/components/confirm-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Chargement paresseux des onglets — chaque onglet est bundle-splitté
const UnifiedTimeline = lazy(() => import("@/components/bonsai-detail/unified-timeline"));
const RappelsTab = lazy(() => import("@/components/bonsai-detail/rappels-tab"));

export const Route = createFileRoute("/bonsai/$id")({
  ssr: false,
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
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const { confirm, dialog: confirmDialog } = useConfirm();

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
        <Link to="/collection" className="text-accent">
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
    await deleteBonsai(id);
    qc.invalidateQueries({ queryKey: ["bonsais"] });
    qc.invalidateQueries({ queryKey: ["photos-all"] });
    qc.invalidateQueries({ queryKey: ["journal-all"] });
    qc.invalidateQueries({ queryKey: ["rappels-all"] });
    toast.success("Bonsaï supprimé");
    navigate({ to: "/collection" });
  };

  const toggleFavori = async () => {
    await saveBonsai({ ...b, favori: !b.favori });
    qc.invalidateQueries({ queryKey: ["bonsai", id] });
    qc.invalidateQueries({ queryKey: ["bonsais"] });
    toast.success(b.favori ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  const setMainPhoto = async (pid: string) => {
    const photo = photos.find((p) => p.id === pid);
    if (!photo) return;
    await saveBonsai({ ...b, photoPrincipale: photo.storagePath });
    qc.invalidateQueries({ queryKey: ["bonsai", id] });
  };

  const updateBonsai = async (updated: typeof b) => {
    await saveBonsai(updated);
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
      <Link
        to="/collection"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Collection
      </Link>

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
    </AppShell>
  );
}
