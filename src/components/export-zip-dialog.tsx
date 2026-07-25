import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FolderArchive } from "lucide-react";
import { listBonsais } from "@/lib/supabase-data";
import { exportBonsaisAsZip, type ExportProgress } from "@/lib/export-zip";

type Portee = "toute" | "selection";

function phaseLabel(p: ExportProgress): string {
  if (p.phase === "compression") return "Compression du fichier ZIP…";
  if (p.phase === "photos") return `${p.bonsaiNom} — téléchargement des photos…`;
  return `${p.bonsaiNom} — préparation de la fiche…`;
}

export function ExportZipDialog() {
  const [open, setOpen] = useState(false);
  const [portee, setPortee] = useState<Portee>("toute");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [progress, setProgress] = useState<ExportProgress | null>(null);
  const [exporting, setExporting] = useState(false);

  const { data: bonsais = [], isLoading } = useQuery({
    queryKey: ["bonsais"],
    queryFn: listBonsais,
    enabled: open,
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return bonsais;
    return bonsais.filter(
      (b) => b.nom.toLowerCase().includes(q) || b.espece.toLowerCase().includes(q),
    );
  }, [bonsais, search]);

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAllFiltered = () => {
    setSelectedIds((prev) => {
      const allSelected = filtered.every((b) => prev.has(b.id));
      const next = new Set(prev);
      for (const b of filtered) {
        if (allSelected) next.delete(b.id);
        else next.add(b.id);
      }
      return next;
    });
  };

  const resetState = () => {
    setPortee("toute");
    setSelectedIds(new Set());
    setSearch("");
    setProgress(null);
    setExporting(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (exporting) return; // empêche la fermeture pendant un export en cours
    setOpen(next);
    if (!next) resetState();
  };

  const doExport = async () => {
    const cible =
      portee === "toute" ? bonsais : bonsais.filter((b) => selectedIds.has(b.id));

    if (cible.length === 0) {
      toast.error("Sélectionnez au moins un arbre à exporter");
      return;
    }

    setExporting(true);
    setProgress({ current: 0, total: cible.length, bonsaiNom: "", phase: "donnees" });
    try {
      await exportBonsaisAsZip(cible, { onProgress: setProgress });
      toast.success(
        cible.length === 1
          ? `Export de "${cible[0].nom}" terminé`
          : `Export de ${cible.length} arbre(s) terminé`,
      );
      setOpen(false);
      resetState();
    } catch (e) {
      toast.error("Échec de l'export : " + (e as Error).message);
      setExporting(false);
      setProgress(null);
    }
  };

  const percent = progress && progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-auto py-4">
          <FolderArchive className="mr-2 h-4 w-4" />
          <div className="text-left">
            <div className="font-medium">Exporter en ZIP (par arbre)</div>
            <div className="text-xs font-normal text-muted-foreground">
              Photos + fiche texte, un dossier par arbre
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Exporter la collection en ZIP</DialogTitle>
          <DialogDescription>
            Chaque arbre sera exporté dans son propre dossier : ses photos (nommées par date) et
            une fiche texte avec ses caractéristiques et son historique.
          </DialogDescription>
        </DialogHeader>

        {!exporting ? (
          <>
            <RadioGroup
              value={portee}
              onValueChange={(v) => setPortee(v as Portee)}
              className="gap-3"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="toute" id="portee-toute" />
                <Label htmlFor="portee-toute" className="cursor-pointer font-normal">
                  Toute la collection ({bonsais.length} arbre{bonsais.length > 1 ? "s" : ""})
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="selection" id="portee-selection" />
                <Label htmlFor="portee-selection" className="cursor-pointer font-normal">
                  Une sélection d'arbres ({selectedIds.size} sélectionné
                  {selectedIds.size > 1 ? "s" : ""})
                </Label>
              </div>
            </RadioGroup>

            {portee === "selection" && (
              <div className="mt-2 rounded-xl border border-border">
                <div className="flex items-center gap-2 border-b border-border p-2">
                  <Input
                    placeholder="Rechercher un arbre…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-8"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="shrink-0"
                    onClick={toggleAllFiltered}
                  >
                    Tout {filtered.length > 0 && filtered.every((b) => selectedIds.has(b.id)) ? "désélectionner" : "sélectionner"}
                  </Button>
                </div>
                <div className="max-h-64 overflow-y-auto p-2">
                  {isLoading ? (
                    <p className="p-2 text-sm text-muted-foreground">Chargement…</p>
                  ) : filtered.length === 0 ? (
                    <p className="p-2 text-sm text-muted-foreground">Aucun arbre trouvé.</p>
                  ) : (
                    filtered.map((b) => (
                      <label
                        key={b.id}
                        htmlFor={`bonsai-${b.id}`}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-accent/10"
                      >
                        <Checkbox
                          id={`bonsai-${b.id}`}
                          checked={selectedIds.has(b.id)}
                          onCheckedChange={() => toggle(b.id)}
                        />
                        <span className="text-sm">
                          {b.nom} <span className="text-muted-foreground">— {b.espece}</span>
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </div>
            )}

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                Annuler
              </Button>
              <Button onClick={doExport} disabled={isLoading}>
                <FolderArchive className="mr-2 h-4 w-4" />
                Générer le ZIP
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-4">
            <p className="mb-2 text-sm font-medium">{progress ? phaseLabel(progress) : "Préparation…"}</p>
            <Progress value={percent} />
            <p className="mt-2 text-right text-xs text-muted-foreground">
              {progress?.current ?? 0} / {progress?.total ?? 0} · {percent}%
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
