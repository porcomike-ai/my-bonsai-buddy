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
import { listPoteries, listBonsais } from "@/lib/supabase-data";
import { exportPoteriesAsZip, type ExportPoterieProgress } from "@/lib/export-poterie-zip";

type Portee = "toute" | "selection";

function phaseLabel(p: ExportPoterieProgress): string {
  if (p.phase === "compression") return "Compression du fichier ZIP…";
  if (p.phase === "photos") return `${p.poterieNom} — téléchargement des photos…`;
  return `${p.poterieNom} — préparation de la fiche…`;
}

export function ExportPoterieZipDialog() {
  const [open, setOpen] = useState(false);
  const [portee, setPortee] = useState<Portee>("toute");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [progress, setProgress] = useState<ExportPoterieProgress | null>(null);
  const [exporting, setExporting] = useState(false);

  const { data: poteries = [], isLoading } = useQuery({
    queryKey: ["poteries"],
    queryFn: listPoteries,
    enabled: open,
  });
  // Utilisé uniquement pour lister, dans la fiche texte de chaque poterie,
  // les arbres actuellement plantés dedans (bonsai.poterieId) — déjà en
  // cache la plupart du temps sous la même clé ["bonsais"] que le reste de
  // l'app.
  const { data: bonsais = [] } = useQuery({
    queryKey: ["bonsais"],
    queryFn: listBonsais,
    enabled: open,
  });

  // Tri alphabétique (insensible à la casse/accents), même logique que pour
  // la sélection d'arbres.
  const sorted = useMemo(
    () => [...poteries].sort((a, b) => a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" })),
    [poteries],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(
      (p) =>
        p.nom.toLowerCase().includes(q) ||
        (p.forme ?? "").toLowerCase().includes(q) ||
        (p.matiere ?? "").toLowerCase().includes(q),
    );
  }, [sorted, search]);

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
      const allSelected = filtered.every((p) => prev.has(p.id));
      const next = new Set(prev);
      for (const p of filtered) {
        if (allSelected) next.delete(p.id);
        else next.add(p.id);
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
      portee === "toute" ? sorted : sorted.filter((p) => selectedIds.has(p.id));

    if (cible.length === 0) {
      toast.error("Sélectionnez au moins une poterie à exporter");
      return;
    }

    setExporting(true);
    setProgress({ current: 0, total: cible.length, poterieNom: "", phase: "donnees" });
    try {
      await exportPoteriesAsZip(cible, bonsais, { onProgress: setProgress });
      toast.success(
        cible.length === 1
          ? `Export de "${cible[0].nom}" terminé`
          : `Export de ${cible.length} poterie(s) terminé`,
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
            <div className="font-medium">Exporter en ZIP (par poterie)</div>
            <div className="text-xs font-normal text-muted-foreground">
              Photos + fiche texte, un dossier par poterie
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Exporter les poteries en ZIP</DialogTitle>
          <DialogDescription>
            Chaque poterie sera exportée dans son propre dossier : sa photo principale, ses photos
            de galerie (nommées par date) et une fiche texte avec ses caractéristiques.
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
                <RadioGroupItem value="toute" id="portee-poteries-toute" />
                <Label htmlFor="portee-poteries-toute" className="cursor-pointer font-normal">
                  Toutes les poteries ({poteries.length})
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="selection" id="portee-poteries-selection" />
                <Label htmlFor="portee-poteries-selection" className="cursor-pointer font-normal">
                  Une sélection de poteries ({selectedIds.size} sélectionnée
                  {selectedIds.size > 1 ? "s" : ""})
                </Label>
              </div>
            </RadioGroup>

            {portee === "selection" && (
              <div className="mt-2 rounded-xl border border-border">
                <div className="flex items-center gap-2 border-b border-border p-2">
                  <Input
                    placeholder="Rechercher une poterie…"
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
                    Tout {filtered.length > 0 && filtered.every((p) => selectedIds.has(p.id)) ? "désélectionner" : "sélectionner"}
                  </Button>
                </div>
                <div className="max-h-64 overflow-y-auto p-2">
                  {isLoading ? (
                    <p className="p-2 text-sm text-muted-foreground">Chargement…</p>
                  ) : filtered.length === 0 ? (
                    <p className="p-2 text-sm text-muted-foreground">Aucune poterie trouvée.</p>
                  ) : (
                    filtered.map((p) => (
                      <label
                        key={p.id}
                        htmlFor={`poterie-${p.id}`}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-accent/10"
                      >
                        <Checkbox
                          id={`poterie-${p.id}`}
                          checked={selectedIds.has(p.id)}
                          onCheckedChange={() => toggle(p.id)}
                        />
                        <span className="text-sm">
                          {p.nom}
                          {p.forme ? (
                            <span className="text-muted-foreground"> — {p.forme}</span>
                          ) : null}
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
