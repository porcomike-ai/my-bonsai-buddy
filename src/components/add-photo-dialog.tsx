import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Camera, Calendar, FileText, Sparkles, Loader as Loader2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { readExifDate, dateFromFilename } from "@/lib/photo-metadata";
import { fileToBlob } from "@/lib/blob-url";

export type PhotoSource = "camera" | "gallery";

interface AddPhotoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source: PhotoSource;
  file: File | null;
  onConfirm: (data: { blob: Blob; date: string; legende: string }) => Promise<void>;
  currentIndex?: number;
  totalCount?: number;
}

type DateMode = "exif" | "filename" | "custom" | "today";

interface DateOption {
  mode: DateMode;
  label: string;
  date: string | undefined;
  available: boolean;
}

export function AddPhotoDialog({
  open,
  onOpenChange,
  source,
  file,
  onConfirm,
  currentIndex = 0,
  totalCount = 1,
}: AddPhotoDialogProps) {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [exifDate, setExifDate] = useState<string | undefined>(undefined);
  const [filenameDate, setFilenameDate] = useState<string | undefined>(undefined);
  const [selectedMode, setSelectedMode] = useState<DateMode>("today");
  const [customDate, setCustomDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [legende, setLegende] = useState("");
  const [busy, setBusy] = useState(false);

  // Réinitialise/analyse le fichier à chaque ouverture.
  useEffect(() => {
    if (!open || !file) {
      setBlob(null);
      setPreview(undefined);
      setExifDate(undefined);
      setFilenameDate(undefined);
      setLegende("");
      return;
    }

    let cancelled = false;
    (async () => {
      // Prévisualisation.
      const url = URL.createObjectURL(file);
      if (!cancelled) setPreview(url);

      // Compression/normalisation via fileToBlob.
      const processed = await fileToBlob(file);
      if (cancelled) return;
      setBlob(processed);

      // Pour la galerie : extraction EXIF + nom de fichier en parallèle.
      if (source === "gallery") {
        const [exif, fromName] = await Promise.all([
          readExifDate(file),
          Promise.resolve(dateFromFilename(file.name)),
        ]);
        if (cancelled) return;
        setExifDate(exif);
        setFilenameDate(fromName);

        // Sélection auto : EXIF > nom de fichier > aujourd'hui.
        if (exif) setSelectedMode("exif");
        else if (fromName) setSelectedMode("filename");
        else setSelectedMode("custom");
      } else {
        // Appareil photo : date du jour.
        setSelectedMode("today");
      }

      // Date personnalisée par défaut = aujourd'hui.
      setCustomDate(new Date().toISOString().slice(0, 10));
    })();

    return () => {
      cancelled = true;
      if (preview) URL.revokeObjectURL(preview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, file, source]);

  const options: DateOption[] =
    source === "camera"
      ? [
          {
            mode: "today",
            label: `Aujourd'hui — ${format(new Date(), "d MMMM yyyy", { locale: fr })}`,
            date: new Date().toISOString(),
            available: true,
          },
        ]
      : [
          {
            mode: "exif",
            label: exifDate
              ? `Date de prise de vue (EXIF) — ${format(parseISO(exifDate), "d MMMM yyyy 'à' HH:mm", { locale: fr })}`
              : "Date de prise de vue d'origine (EXIF indisponible)",
            date: exifDate,
            available: !!exifDate,
          },
          {
            mode: "filename",
            label: filenameDate
              ? `Date détectée dans le nom — ${format(parseISO(filenameDate), "d MMMM yyyy", { locale: fr })}`
              : "Aucune date détectée dans le nom du fichier",
            date: filenameDate,
            available: !!filenameDate,
          },
          { mode: "custom", label: "Date personnalisée", date: undefined, available: true },
        ];

  const selectedDate =
    selectedMode === "today"
      ? new Date().toISOString()
      : selectedMode === "custom"
        ? new Date(customDate + "T12:00:00").toISOString()
        : (options.find((o) => o.mode === selectedMode)?.date ?? new Date().toISOString());

  const submit = async () => {
    if (!blob) return;
    setBusy(true);
    try {
      await onConfirm({ blob, date: selectedDate, legende: legende.trim() });
      onOpenChange(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {source === "camera" ? (
              <Camera className="h-5 w-5" />
            ) : (
              <Sparkles className="h-5 w-5" />
            )}
            {source === "camera" 
              ? "Photo prise à l'instant" 
              : totalCount > 1 
                ? `Photo ${currentIndex + 1} / ${totalCount}` 
                : "Importer une photo"}
          </DialogTitle>
        </DialogHeader>

        {/* Prévisualisation */}
        {preview && (
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <img src={preview} alt="Aperçu" className="max-h-64 w-full object-contain" />
          </div>
        )}

        {/* Section date */}
        <div className="space-y-3">
          <Label className="flex items-center gap-1.5 text-sm font-medium">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Date de la photo
          </Label>

          {source === "camera" ? (
            <p className="rounded-xl bg-secondary/50 px-3 py-2 text-sm text-muted-foreground">
              {options[0].label}
            </p>
          ) : (
            <RadioGroup
              value={selectedMode}
              onValueChange={(v) => setSelectedMode(v as DateMode)}
              className="space-y-2"
            >
              {options.map((opt) => {
                const id = `date-opt-${opt.mode}`;
                return (
                  <div
                    key={opt.mode}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition ${
                      opt.available
                        ? "border-border hover:border-accent/40"
                        : "cursor-not-allowed border-border/40 opacity-50"
                    }`}
                  >
                    <RadioGroupItem value={opt.mode} id={id} disabled={!opt.available} />
                    <Label
                      htmlFor={id}
                      className={`flex-1 text-sm ${opt.available ? "cursor-pointer" : ""}`}
                    >
                      {opt.label}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          )}

          {selectedMode === "custom" && (
            <Input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="w-auto"
            />
          )}
        </div>

        {/* Commentaire / Note */}
        <div className="space-y-2">
          <Label htmlFor="legende" className="flex items-center gap-1.5 text-sm font-medium">
            <FileText className="h-4 w-4 text-muted-foreground" />
            Commentaire / Note
          </Label>
          <Textarea
            id="legende"
            value={legende}
            onChange={(e) => setLegende(e.target.value)}
            rows={2}
            placeholder="Décrivez le soin ou l'état de l'arbre à cet instant…"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
            Annuler
          </Button>
          <Button onClick={submit} disabled={!blob || busy}>
            {busy ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Enregistrement…
              </>
            ) : (
              "Enregistrer la photo"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Hook utilitaire : crée une référence de fichier contrôlée pour un input file.
 * Retourne la valeur, un setter et un reset.
 */
export function useFileInput() {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const reset = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };
  return { file, setFile, inputRef, reset };
}
