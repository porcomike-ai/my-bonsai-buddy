import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  saveBonsai,
  savePhoto,
  uid,
  listPoteries,
  type Bonsai,
  type BonsaiStyle,
  type BonsaiEtape,
} from "@/lib/db";
import { fileToBlob } from "@/lib/blob-url";
import { STYLES, ETAPES, getAllEspeces, addCustomEspece } from "@/lib/bonsai-meta";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ImagePlus } from "lucide-react";

const schema = z.object({
  nom: z.string().min(1, "Donnez un nom à votre bonsaï"),
  espece: z.string().min(1, "Indiquez l'espèce"),
  style: z.enum([
    "chokkan",
    "moyogi",
    "shakan",
    "kengai",
    "han-kengai",
    "bunjin",
    "yose-ue",
    "ishitsuki",
    "sokan",
    "sankan",
    "kabudachi",
    "ikadabuki",
    "netsuranari",
    "sekijoju",
    "neagari",
    "fukinagashi",
    "hokidachi",
    "sharimiki",
    "sabamiki",
    "nejikan",
    "takozukuri",
    "bankan",
    "autre",
  ]),
  etape: z.enum(["culture", "pre-bonsai", "bonsai"]),
  ageEstime: z.string().optional(),
  hauteurCm: z.string().optional(),
  prixAchat: z.string().optional(),
  valeurEstimee: z.string().optional(),
  dateAcquisition: z.string().optional(),
  origine: z.string().optional(),
  poterieId: z.string().optional(),
  notes: z.string().optional(),
  dansCollection: z.boolean(),
});
type FormValues = z.infer<typeof schema>;

export function BonsaiForm({
  initial,
  onSaved,
}: {
  initial?: Bonsai;
  onSaved?: (b: Bonsai) => void;
}) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: poteries = [] } = useQuery({ queryKey: ["poteries"], queryFn: listPoteries });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [especeLang, setEspeceLang] = useState<"latin" | "fr">(() => {
    if (typeof window === "undefined") return "latin";
    return (localStorage.getItem("bonsai.espece.lang") as "latin" | "fr") ?? "latin";
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nom: initial?.nom ?? "",
      espece: initial?.espece ?? "",
      style: initial?.style ?? "moyogi",
      etape: initial?.etape ?? "culture",
      ageEstime: initial?.ageEstime != null ? String(initial.ageEstime) : "",
      hauteurCm: initial?.hauteurCm != null ? String(initial.hauteurCm) : "",
      prixAchat: initial?.prixAchat != null ? String(initial.prixAchat) : "",
      valeurEstimee: initial?.valeurEstimee != null ? String(initial.valeurEstimee) : "",
      dateAcquisition: initial?.dateAcquisition?.slice(0, 10) ?? "",
      origine: initial?.origine ?? "",
      poterieId: initial?.poterieId ?? "",
      notes: initial?.notes ?? "",
      dansCollection: initial?.dansCollection ?? true,
    },
  });

  const especesList = useMemo(() => getAllEspeces(), []);

  const toggleEspeceLang = () => {
    const next = especeLang === "latin" ? "fr" : "latin";
    setEspeceLang(next);
    if (typeof window !== "undefined") localStorage.setItem("bonsai.espece.lang", next);
    const current = form.getValues("espece").trim();
    const match = especesList.find((e) => e.latin === current || e.fr === current);
    if (match) form.setValue("espece", next === "latin" ? match.latin : match.fr);
  };

  const onFile = (f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const submit = form.handleSubmit(async (values) => {
    const id = initial?.id ?? uid();
    let photoId = initial?.photoPrincipale;
    addCustomEspece(values.espece);

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
      etape: values.etape as BonsaiEtape,
      ageEstime: values.ageEstime ? Number(values.ageEstime) : undefined,
      hauteurCm: values.hauteurCm ? Number(values.hauteurCm) : undefined,
      prixAchat: values.prixAchat ? Number(values.prixAchat) : undefined,
      valeurEstimee: values.valeurEstimee ? Number(values.valeurEstimee) : undefined,
      dateAcquisition: values.dateAcquisition || undefined,
      origine: values.origine?.trim() || undefined,
      poterieId: values.poterieId || undefined,
      notes: values.notes?.trim() || undefined,
      photoPrincipale: photoId,
      dansCollection: values.dansCollection,
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
          <Field
            label="Espèce"
            error={form.formState.errors.espece?.message}
            action={
              <button
                type="button"
                onClick={toggleEspeceLang}
                className="text-xs text-accent hover:underline"
                title="Basculer entre nom scientifique et nom français"
              >
                {especeLang === "latin" ? "Afficher en français" : "Afficher en latin"}
              </button>
            }
          >
            <Input
              {...form.register("espece")}
              list="especes-list"
              placeholder={especeLang === "latin" ? "Pinus parviflora" : "Pin blanc du Japon"}
            />
            <datalist id="especes-list">
              {especesList.map((e) => {
                const value = especeLang === "latin" ? e.latin : e.fr;
                const other = especeLang === "latin" ? e.fr : e.latin;
                return (
                  <option key={`${e.latin}|${e.fr}`} value={value}>
                    {other}
                  </option>
                );
              })}
            </datalist>
          </Field>
          <Field label="Style">
            <select
              {...form.register("style")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {STYLES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Étape">
            <select
              {...form.register("etape")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {ETAPES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Poterie associée">
            <select
              {...form.register("poterieId")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">Aucune</option>
              {poteries.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nom}
                </option>
              ))}
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
          <Field label="Prix d'achat (€)">
            <Input
              type="number"
              min={0}
              step="0.01"
              {...form.register("prixAchat")}
              placeholder="120"
            />
          </Field>
          <Field label="Valeur estimée (€)">
            <Input
              type="number"
              min={0}
              step="0.01"
              {...form.register("valeurEstimee")}
              placeholder="350"
            />
          </Field>
        </div>

        <Field label="Notes">
          <Textarea
            {...form.register("notes")}
            rows={4}
            placeholder="Histoire, observations, projets de mise en forme…"
          />
        </Field>

        <Controller
          control={form.control}
          name="dansCollection"
          render={({ field }) => (
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4">
              <div>
                <p className="text-sm font-medium">Dans la collection</p>
                <p className="text-xs text-muted-foreground">
                  {field.value
                    ? "Cet arbre fait partie de votre collection active."
                    : "Cet arbre est sorti de la collection (vendu, donné, perdu…)."}
                </p>
              </div>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </div>
          )}
        />

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

function Field({
  label,
  error,
  action,
  children,
}: {
  label: string;
  error?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <Label className="block text-sm">{label}</Label>
        {action}
      </div>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
