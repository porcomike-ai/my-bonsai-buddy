import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useForm, C as Controller } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as useAuth, u as uid, n as saveBonsai, o as savePhoto, L as Label, I as Input, T as Textarea, B as Button, A as AddPhotoDialog, w as cn, a as listPoteries$1 } from "./router-lnbQiR3D.mjs";
import { g as getAllEspeces, d as addCustomEspece, S as STYLES, E as ETAPES } from "./bonsai-meta-6FZGZ_0u.mjs";
import { R as Root, T as Thumb } from "../_libs/radix-ui__react-switch.mjs";
import { I as ImagePlus } from "../_libs/lucide-react.mjs";
import { f as object, k as boolean, d as string, _ as _enum } from "../_libs/zod.mjs";
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Root.displayName;
const schema = object({
  nom: string().min(1, "Donnez un nom à votre bonsaï"),
  espece: string().min(1, "Indiquez l'espèce"),
  style: _enum([
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
    "autre"
  ]),
  etape: _enum(["culture", "pre-bonsai", "bonsai"]),
  ageEstime: string().optional(),
  hauteurCm: string().optional(),
  prixAchat: string().optional(),
  valeurEstimee: string().optional(),
  dateAcquisition: string().optional(),
  origine: string().optional(),
  poterieId: string().optional(),
  notes: string().optional(),
  dansCollection: boolean()
});
function BonsaiForm({
  initial,
  onSaved
}) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { user } = useAuth();
  const { data: poteries = [] } = useQuery({ queryKey: ["poteries"], queryFn: listPoteries$1 });
  const [file, setFile] = reactExports.useState(null);
  const [preview, setPreview] = reactExports.useState(null);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [dialogSource, setDialogSource] = reactExports.useState("gallery");
  const [photoData, setPhotoData] = reactExports.useState(null);
  const [especeLang, setEspeceLang] = reactExports.useState(() => {
    if (typeof window === "undefined") return "latin";
    return localStorage.getItem("bonsai.espece.lang") ?? "latin";
  });
  reactExports.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);
  const form = useForm({
    resolver: u(schema),
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
      dansCollection: initial?.dansCollection ?? true
    }
  });
  const especesList = reactExports.useMemo(() => getAllEspeces(), []);
  const toggleEspeceLang = () => {
    const next = especeLang === "latin" ? "fr" : "latin";
    setEspeceLang(next);
    if (typeof window !== "undefined") localStorage.setItem("bonsai.espece.lang", next);
    const current = form.getValues("espece").trim();
    const match = especesList.find((e) => e.latin === current || e.fr === current);
    if (match) form.setValue("espece", next === "latin" ? match.latin : match.fr);
  };
  const onFile = (f) => {
    setFile(f);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(f);
    });
    setDialogSource("gallery");
    setDialogOpen(true);
  };
  const handlePhotoConfirm = async (data) => {
    setPhotoData(data);
    setDialogOpen(false);
  };
  const submit = form.handleSubmit(async (values) => {
    if (!user) {
      toast.error("Vous devez être connecté pour ajouter un bonsaï à votre collection");
      navigate({ to: "/connexion" });
      return;
    }
    const id = initial?.id ?? uid();
    let photoId = initial?.photoPrincipale;
    addCustomEspece(values.espece);
    try {
      const b = {
        id,
        nom: values.nom.trim(),
        espece: values.espece.trim(),
        style: values.style,
        etape: values.etape,
        ageEstime: values.ageEstime ? Number(values.ageEstime) : void 0,
        hauteurCm: values.hauteurCm ? Number(values.hauteurCm) : void 0,
        prixAchat: values.prixAchat ? Number(values.prixAchat) : void 0,
        valeurEstimee: values.valeurEstimee ? Number(values.valeurEstimee) : void 0,
        dateAcquisition: values.dateAcquisition || void 0,
        origine: values.origine?.trim() || void 0,
        poterieId: values.poterieId || void 0,
        notes: values.notes?.trim() || void 0,
        photoPrincipale: photoId,
        dansCollection: values.dansCollection,
        createdAt: initial?.createdAt ?? (/* @__PURE__ */ new Date()).toISOString()
      };
      await saveBonsai(b);
      if (photoData) {
        photoId = await savePhoto({
          id: uid(),
          bonsaiId: id,
          blob: photoData.blob,
          date: photoData.date,
          legende: photoData.legende || "Photo principale"
        });
        b.photoPrincipale = photoId;
        await saveBonsai(b);
      }
      await qc.invalidateQueries();
      toast.success(initial ? "Bonsaï mis à jour" : "Bonsaï ajouté à votre collection");
      if (onSaved) onSaved(b);
      else navigate({ to: "/bonsai/$id", params: { id } });
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement: " + error.message);
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "grid gap-8 lg:grid-cols-[280px_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-2 block", children: "Photo principale" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-card transition hover:border-accent/60", children: [
        preview ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "mx-auto h-8 w-8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs", children: "Cliquer pour téléverser" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            accept: "image/*",
            className: "absolute inset-0 cursor-pointer opacity-0",
            onChange: (e) => e.target.files?.[0] && onFile(e.target.files[0])
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nom", error: form.formState.errors.nom?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...form.register("nom"), placeholder: "Vieux pin du jardin" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Field,
          {
            label: "Espèce",
            error: form.formState.errors.espece?.message,
            action: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: toggleEspeceLang,
                className: "text-xs text-accent hover:underline",
                title: "Basculer entre nom scientifique et nom français",
                children: especeLang === "latin" ? "Afficher en français" : "Afficher en latin"
              }
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  ...form.register("espece"),
                  list: "especes-list",
                  placeholder: especeLang === "latin" ? "Pinus parviflora" : "Pin blanc du Japon"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "especes-list", children: especesList.map((e) => {
                const value = especeLang === "latin" ? e.latin : e.fr;
                const other = especeLang === "latin" ? e.fr : e.latin;
                return /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value, children: other }, `${e.latin}|${e.fr}`);
              }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Style", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            ...form.register("style"),
            className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
            children: STYLES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.value, children: s.label }, s.value))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Étape", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            ...form.register("etape"),
            className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
            children: ETAPES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.value, children: s.label }, s.value))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Poterie associée", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            ...form.register("poterieId"),
            className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Aucune" }),
              poteries.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id, children: p.nom }, p.id))
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Âge estimé à l'acquisition (années)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 0,
              inputMode: "numeric",
              ...form.register("ageEstime"),
              placeholder: "35"
            }
          ),
          form.watch("ageEstime") && !form.watch("dateAcquisition") && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Renseignez une date d'acquisition pour que l'âge se mette à jour automatiquement chaque année." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Hauteur (cm)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 0,
            inputMode: "numeric",
            ...form.register("hauteurCm"),
            placeholder: "45"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date d'acquisition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", ...form.register("dateAcquisition") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Origine / pépinière", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...form.register("origine"), placeholder: "Pépinière Saulieu" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Prix d'achat (€)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 0,
            step: "0.01",
            ...form.register("prixAchat"),
            placeholder: "120"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Valeur estimée (€)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 0,
            step: "0.01",
            ...form.register("valeurEstimee"),
            placeholder: "350"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Notes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          ...form.register("notes"),
          rows: 4,
          placeholder: "Histoire, observations, projets de mise en forme…"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Controller,
        {
          control: form.control,
          name: "dansCollection",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Dans la collection" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: field.value ? "Cet arbre fait partie de votre collection active." : "Cet arbre est sorti de la collection (vendu, donné, perdu…)." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: field.value, onCheckedChange: field.onChange })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => navigate({ to: "/collection" }), children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: form.formState.isSubmitting, children: initial ? "Enregistrer" : "Ajouter à la collection" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddPhotoDialog,
      {
        open: dialogOpen,
        onOpenChange: setDialogOpen,
        source: dialogSource,
        file,
        onConfirm: handlePhotoConfirm
      }
    )
  ] });
}
function Field({
  label,
  error,
  action,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "block text-sm", children: label }),
      action
    ] }),
    children,
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: error })
  ] });
}
export {
  BonsaiForm as B
};
