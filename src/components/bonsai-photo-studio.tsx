import { useEffect, useState } from "react";
import { Wand2, Loader as Loader2, X, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { usePhotoStudio } from "@/hooks/use-photo-studio";
import { useBlobUrl } from "@/lib/blob-url";
import type { BackgroundMode } from "@/lib/ai-studio/background-removal";
import { AI_STUDIO_MODULES } from "@/lib/ai-studio/registry";

interface BonsaiPhotoStudioProps {
  /** Photo d'origine à retoucher (déjà compressée par le pipeline d'upload). */
  originalBlob: Blob;
  /** Appelé quand l'utilisateur valide le résultat : remplace la photo à enregistrer. */
  onApply: (blob: Blob) => void;
}

const DEFAULT_COLOR = "#f4f1ea";
const DEFAULT_BLUR = 12;

/**
 * Panneau "Studio photo" intégré au flux d'ajout de photo. Un seul module
 * actif pour l'instant (fond), les deux autres onglets sont volontairement
 * grisés : ils matérialisent l'extensibilité prévue sans exposer de
 * fonctionnalité non implémentée.
 */
export function BonsaiPhotoStudio({ originalBlob, onApply }: BonsaiPhotoStudioProps) {
  const [mode, setMode] = useState<BackgroundMode>("blur");
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [blur, setBlur] = useState(DEFAULT_BLUR);
  const studio = usePhotoStudio();
  const previewUrl = useBlobUrl(studio.result);

  // Affiche le message d'erreur utilisateur (jamais l'erreur technique brute).
  useEffect(() => {
    if (studio.status === "error" && studio.errorMessage) {
      toast.error(studio.errorMessage);
    }
  }, [studio.status, studio.errorMessage]);

  const runPreview = () => {
    void studio.process(originalBlob, { mode, color, blurAmount: blur });
  };

  const plannedModules = AI_STUDIO_MODULES.filter(
    (m) => m.availability === "planned",
  );

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card p-4">
      <Tabs defaultValue="background-removal">
        <TabsList>
          <TabsTrigger value="background-removal">Fond</TabsTrigger>
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
                <img src={previewUrl} alt="Aperçu retouché" className="max-h-56 w-full object-contain" />
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
      </Tabs>
    </div>
  );
}
