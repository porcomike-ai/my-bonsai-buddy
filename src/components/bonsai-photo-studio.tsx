import { useEffect, useState } from "react";
import { Wand2, Loader as Loader2, X, Check, Sprout } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePhotoStudio } from "@/hooks/use-photo-studio";
import { useSpeciesId } from "@/hooks/use-species-id";
import { useBlobUrl } from "@/lib/blob-url";
import type { BackgroundMode } from "@/lib/ai-studio/background-removal";
import type { SpeciesCandidate } from "@/lib/ai-studio/species-id";
import { AI_STUDIO_MODULES } from "@/lib/ai-studio/registry";

interface BonsaiPhotoStudioProps {
  /** Photo d'origine à retoucher (déjà compressée par le pipeline d'upload). */
  originalBlob: Blob;
  /** Appelé quand l'utilisateur valide le résultat du détourage/fond. */
  onApply: (blob: Blob) => void;
  /**
   * Appelé quand l'utilisateur choisit d'utiliser une espèce identifiée
   * (ex. pour préremplir la fiche du bonsaï). Si absent, l'onglet "Espèce"
   * reste utilisable mais affiche les résultats en lecture seule, sans
   * bouton d'application — utile dans un contexte où il n'y a pas encore de
   * fiche à mettre à jour.
   */
  onSpeciesIdentified?: (candidate: SpeciesCandidate) => void;
}

const DEFAULT_COLOR = "#f4f1ea";
const DEFAULT_BLUR = 12;

const ORGAN_OPTIONS: { value: string; label: string }[] = [
  { value: "auto", label: "Automatique" },
  { value: "leaf", label: "Feuillage" },
  { value: "bark", label: "Écorce / tronc" },
  { value: "flower", label: "Fleur" },
  { value: "fruit", label: "Fruit" },
  { value: "habit", label: "Silhouette entière" },
];

/**
 * Panneau "Studio photo" intégré au flux d'ajout/retouche de photo.
 * "Fond" (détourage local, gratuit et illimité) et "Espèce" (Pl@ntNet, à
 * quota gratuit journalier) sont actifs ; "Santé" reste grisé pour l'instant.
 */
export function BonsaiPhotoStudio({
  originalBlob,
  onApply,
  onSpeciesIdentified,
}: BonsaiPhotoStudioProps) {
  const [mode, setMode] = useState<BackgroundMode>("blur");
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [blur, setBlur] = useState(DEFAULT_BLUR);
  const studio = usePhotoStudio();
  const previewUrl = useBlobUrl(studio.result);

  const [organ, setOrgan] = useState("auto");
  const species = useSpeciesId();

  // Affiche le message d'erreur utilisateur (jamais l'erreur technique brute).
  useEffect(() => {
    if (studio.status === "error" && studio.errorMessage) {
      toast.error(studio.errorMessage);
    }
  }, [studio.status, studio.errorMessage]);

  useEffect(() => {
    if (species.status === "error" && species.errorMessage) {
      toast.error(species.errorMessage);
    }
  }, [species.status, species.errorMessage]);

  const runPreview = () => {
    void studio.process(originalBlob, { mode, color, blurAmount: blur });
  };

  const runIdentify = () => {
    void species.identify(originalBlob, organ);
  };

  const plannedModules = AI_STUDIO_MODULES.filter((m) => m.availability === "planned");

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card p-4">
      <Tabs defaultValue="background-removal">
        <TabsList>
          <TabsTrigger value="background-removal">Fond</TabsTrigger>
          <TabsTrigger value="species-id">Espèce</TabsTrigger>
          {plannedModules.map((m) => (
            <TabsTrigger key={m.id} value={m.id} disabled>
              {m.label.split(" ")[0]}
              <span className="ml-1 text-[10px] text-muted-foreground">(bientôt)</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="background-removal" className="space-y-4 pt-3">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Traitement du fond</Label>
            <ToggleGroup
              type="single"
              value={mode}
              onValueChange={(v) => v && setMode(v as BackgroundMode)}
              className="justify-start"
            >
              <ToggleGroupItem value="transparent">Transparent</ToggleGroupItem>
              <ToggleGroupItem value="color">Couleur unie</ToggleGroupItem>
              <ToggleGroupItem value="blur">Flou artistique</ToggleGroupItem>
            </ToggleGroup>
          </div>

          {mode === "color" && (
            <div className="flex items-center gap-3">
              <Label htmlFor="studio-color" className="text-sm">
                Couleur de fond
              </Label>
              <input
                id="studio-color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-8 w-14 cursor-pointer rounded border border-border bg-transparent"
              />
            </div>
          )}

          {mode === "blur" && (
            <div className="space-y-2">
              <Label className="text-sm">Intensité du flou : {blur}px</Label>
              <Slider
                min={2}
                max={30}
                step={1}
                value={[blur]}
                onValueChange={([v]) => setBlur(v)}
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              onClick={runPreview}
              disabled={studio.status === "loading"}
            >
              {studio.status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Traitement…
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" /> Générer l'aperçu
                </>
              )}
            </Button>
            {studio.status === "loading" && (
              <Button type="button" size="sm" variant="ghost" onClick={studio.cancel}>
                <X className="h-4 w-4" /> Annuler
              </Button>
            )}
          </div>

          {previewUrl && studio.status === "success" && (
            <div className="space-y-2">
              <div className="overflow-hidden rounded-xl border border-border">
                <img
                  src={previewUrl}
                  alt="Aperçu retouché"
                  className="max-h-56 w-full object-contain"
                />
              </div>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => studio.result && onApply(studio.result)}
              >
                <Check className="h-4 w-4" /> Utiliser cette version
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="species-id" className="space-y-4 pt-3">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Partie de l'arbre photographiée</Label>
            <Select value={organ} onValueChange={setOrgan}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ORGAN_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Préciser aide l'identification, mais reste indicatif — vérifiez auprès d'un
              spécialiste avant d'appliquer un traitement spécifique à une espèce.
            </p>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={runIdentify}
            disabled={species.status === "loading"}
          >
            {species.status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Identification…
              </>
            ) : (
              <>
                <Sprout className="h-4 w-4" /> Identifier l'espèce
              </>
            )}
          </Button>

          {species.status === "success" && species.result && (
            <div className="space-y-2">
              {species.result.candidates.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun résultat exploitable.</p>
              ) : (
                <ul className="space-y-1.5">
                  {species.result.candidates.map((c) => (
                    <li
                      key={c.scientificName}
                      className="flex items-center justify-between gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium italic">{c.scientificName}</p>
                        {c.commonNames.length > 0 && (
                          <p className="truncate text-xs text-muted-foreground">
                            {c.commonNames.slice(0, 2).join(", ")}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {Math.round(c.confidence * 100)}%
                        </span>
                        {onSpeciesIdentified && (
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => onSpeciesIdentified(c)}
                          >
                            Utiliser
                          </Button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-xs text-muted-foreground">
                {species.result.quotaRemaining} identification
                {species.result.quotaRemaining > 1 ? "s" : ""} restante
                {species.result.quotaRemaining > 1 ? "s" : ""} aujourd'hui.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
