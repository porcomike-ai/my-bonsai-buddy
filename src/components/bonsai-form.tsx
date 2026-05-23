import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  saveBonsai, savePhoto, uid, listPoteries, type Bonsai, type BonsaiStyle,
} from "@/lib/db";
import { fileToBlob } from "@/lib/blob-url";
import { STYLES } from "@/lib/bonsai-meta";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";

const schema = z.object({
  nom: z.string().min(1, "Donnez un nom à votre bonsaï"),
  espece: z.string().min(1, "Indiquez l'espèce"),
  style: z.enum([
    "chokkan", "moyogi", "shakan", "kengai", "han-kengai", "bunjin", "yose-ue", "ishitsuki", "autre",
  ]),
  ageEstime: z.string().optional(),
  hauteurCm: z.string().optional(),
  dateAcquisition: z.string().optional(),
  origine: z.string().optional(),
  poterieId: z.string().optional(),
  notes: z.string().optional(),
  dansCollection: z.boolean(),
});
type FormValues = z.infer<typeof schema>;

export function BonsaiForm({ initial, onSaved }: { initial?: Bonsai; onSaved?: (b: Bonsai) => void }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: poteries = [] } = useQuery({ queryKey: ["poteries"], queryFn: listPoteries });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nom: initial?.nom ?? "",
      espece: initial?.espece ?? "",
      style: initial?.style ?? "moyogi",
      ageEstime: initial?.ageEstime != null ? String(initial.ageEstime) : "",
      hauteurCm: initial?.hauteurCm != null ? String(initial.hauteurCm) : "",
      dateAcquisition: initial?.dateAcquisition?.slice(0, 10) ?? "",
      origine: initial?.origine ?? "",
      poterieId: initial?.poterieId ?? "",
      notes: initial?.notes ?? "",
      dansCollection: initial?.dansCollection ?? true,
    },
  });

  const onFile = (f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const submit = form.handleSubmit(async (values) => {
    const id = initial?.id ?? uid();
    let photoId = initial?.photoPrincipale;

    if (file) {
      const blob = await fileToBlob(file);
      photoId = uid();
      await savePhoto({
        id: photoId,
        bonsaiId: id,
        blob,
        date: new Date().toISOString(),
        legende: "Photo principale",
      });
    }

    const b: Bonsai = {
      id,
      nom: values.nom.trim(),
      espece: values.espece.trim(),
      style: values.style as BonsaiStyle,
      ageEstime: values.ageEstime ? Number(values.ageEstime) : undefined,
      hauteurCm: values.hauteurCm ? Number(values.hauteurCm) : undefined,
      dateAcquisition: values.dateAcquisition || undefined,
      origine: values.origine?.trim() || undefined,
      poterieId: values.poterieId || undefined,
      notes: values.notes?.trim() || undefined,
      photoPrincipale: photoId,
      createdAt: initial?.createdAt ?? new Date().toISOString(),
    };

    await saveBonsai(b);
    await qc.invalidateQueries();
    toast.success(initial ? "Bonsaï mis à jour" : "Bonsaï ajouté à votre collection");
    if (onSaved) onSaved(b);
    else navigate({ to: "/bonsai/$id", params: { id } });
  });

  return (
    <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div>
        <Label className="mb-2 block">Photo principale</Label>
        <label className="group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-card transition hover:border-accent/60">
          {preview ? (
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="text-center text-muted-foreground">
              <ImagePlus className="mx-auto h-8 w-8" />
              <p className="mt-2 text-xs">Cliquer pour téléverser</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />
        </label>
      </div>

      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom" error={form.formState.errors.nom?.message}>
            <Input {...form.register("nom")} placeholder="Vieux pin du jardin" />
          </Field>
          <Field label="Espèce" error={form.formState.errors.espece?.message}>
            <Input {...form.register("espece")} placeholder="Pinus parviflora" />
          </Field>
          <Field label="Style">
            <select
              {...form.register("style")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {STYLES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </Field>
          <Field label="Poterie associée">
            <select
              {...form.register("poterieId")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">Aucune</option>
              {poteries.map((p) => <option key={p.id} value={p.id}>{p.nom}</option>)}
            </select>
          </Field>
          <Field label="Âge estimé (années)">
            <Input type="number" min={0} {...form.register("ageEstime")} placeholder="35" />
          </Field>
          <Field label="Hauteur (cm)">
            <Input type="number" min={0} {...form.register("hauteurCm")} placeholder="45" />
          </Field>
          <Field label="Date d'acquisition">
            <Input type="date" {...form.register("dateAcquisition")} />
          </Field>
          <Field label="Origine / pépinière">
            <Input {...form.register("origine")} placeholder="Pépinière Saulieu" />
          </Field>
        </div>

        <Field label="Notes">
          <Textarea {...form.register("notes")} rows={4} placeholder="Histoire, observations, projets de mise en forme…" />
        </Field>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate({ to: "/collection" })}>
            Annuler
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {initial ? "Enregistrer" : "Ajouter à la collection"}
          </Button>
        </div>
      </div>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block text-sm">{label}</Label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
