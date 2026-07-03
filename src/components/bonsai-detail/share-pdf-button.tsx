import { useState } from "react";
import { Share2, Image as ImageIcon, Images } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { shareBonsaiPdf } from "@/lib/share-pdf";

export function SharePdfButton({
  id,
  bonsai,
  photosCount,
}: {
  id: string;
  bonsai: { nom: string };
  photosCount: number;
}) {
  const [busy, setBusy] = useState(false);
  const run = async (photos: "principale" | "toutes") => {
    setBusy(true);
    try {
      const r = await shareBonsaiPdf(id, bonsai.nom, { photos });
      toast.success(r === "shared" ? "Fiche partagée" : "Fiche téléchargée");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="mt-2 w-full" disabled={busy}>
          <Share2 className="mr-1.5 h-4 w-4" /> {busy ? "Génération…" : "Partager la fiche"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuItem onClick={() => run("principale")}>
          <ImageIcon className="mr-2 h-4 w-4" />
          <div className="flex flex-col">
            <span>Photo principale</span>
            <span className="text-xs text-muted-foreground">Fiche compacte sur 1 page</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => run("toutes")} disabled={photosCount === 0}>
          <Images className="mr-2 h-4 w-4" />
          <div className="flex flex-col">
            <span>Toutes les photos</span>
            <span className="text-xs text-muted-foreground">
              {photosCount > 0
                ? `Inclut la galerie (${photosCount})`
                : "Aucune photo dans la galerie"}
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
