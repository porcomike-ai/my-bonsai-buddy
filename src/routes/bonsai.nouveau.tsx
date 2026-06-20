import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { BonsaiForm } from "@/components/bonsai-form";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/bonsai/nouveau")({
  head: () => ({
    meta: [
      { title: "Nouveau bonsaï — Bonsaï Studio" },
      {
        name: "description",
        content:
          "Ajoutez un nouveau bonsaï à votre carnet de collection : espèce, style, étape, dimensions et première photo.",
      },
      { property: "og:title", content: "Nouveau bonsaï — Bonsaï Studio" },
      {
        property: "og:description",
        content: "Ajoutez un nouvel arbre à votre carnet de collection.",
      },
      { property: "og:url", content: "/bonsai/nouveau" },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: NewBonsaiPage,
});

function NewBonsaiPage() {
  return (
    <AppShell>
      <Link
        to="/collection"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Retour à la collection
      </Link>
      <h1 className="font-display text-4xl font-semibold">Nouveau bonsaï</h1>
      <p className="mt-1 mb-8 text-sm text-muted-foreground">
        Ajoutez les informations essentielles. Vous pourrez compléter la galerie et les rappels
        ensuite.
      </p>
      <BonsaiForm />
    </AppShell>
  );
}
