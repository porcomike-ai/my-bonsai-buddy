import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/components/confirm-dialog";
import { toast } from "sonner";
import {
  exportSupabaseBackup,
  importSupabaseBackup,
  type SupabaseBackupPayload,
  listBonsais,
  listPhotos,
  saveBonsai,
  savePhoto,
  savePoterie,
  saveJournal,
  saveRappel,
  saveEvenement,
} from "@/lib/supabase-data";
import * as idb from "@/lib/db";
import { useAuth } from "@/components/supabase-auth-provider";
import {
  CloudUpload as UploadCloud,
  Download,
  HardDriveDownload,
  HardDriveUpload,
  Info,
  LogOut,
  Database,
  Wand as Wand2,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { APP_VERSION, APP_VERSION_DATE } from "@/lib/version";

export const Route = createFileRoute("/parametres")({
  head: () => ({
    meta: [
      { title: "Paramètres — Bonsaï Studio" },
      {
        name: "description",
        content:
          "Paramètres et sauvegarde : exporter/importer vos données Supabase, migrer depuis IndexedDB et options de l'application.",
      },
      { property: "og:title", content: "Paramètres — Bonsaï Studio" },
      {
        property: "og:description",
        content: "Sauvegardes Supabase et options de l'application.",
      },
      { property: "og:url", content: "/parametres" },
    ],
  }),
  component: ParametresPage,
});

type Busy = null | "export" | "import" | "migrate";

function ParametresPage() {
  const qc = useQueryClient();
  const { user, signOut } = useAuth();
  const [busy, setBusy] = useState<Busy>(null);
  const [hasLocalData, setHasLocalData] = useState(false);
  const [checkingLocal, setCheckingLocal] = useState(true);
  const { confirm, dialog: confirmDialog } = useConfirm();

  // Détecte la présence d'anciennes données dans IndexedDB (côté client uniquement).
  // On utilise le module idb (IndexedDB) et son listBonsais — les données Supabase
  // sont lues séparément via les fonctions de supabase-data.ts.
  useEffect(() => {
    if (typeof window === "undefined") {
      setCheckingLocal(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const bonsais = await idb.listBonsais();
        if (!cancelled) setHasLocalData(bonsais.length > 0);
      } catch {
        // IndexedDB indisponible ou base inexistante.
        if (!cancelled) setHasLocalData(false);
      } finally {
        if (!cancelled) setCheckingLocal(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const doSignOut = async () => {
    try {
      await signOut();
      toast.success("Déconnecté");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const doLocalExport = async () => {
    setBusy("export");
    try {
      const payload = await exportSupabaseBackup();
      const json = JSON.stringify(payload);
      let blob: Blob;
      if (typeof CompressionStream !== "undefined") {
        const enc = new TextEncoder().encode(json);
        const stream = new Response(new Blob([enc])).body!.pipeThrough(
          new CompressionStream("gzip"),
        );
        blob = await new Response(stream).blob();
      } else {
        blob = new Blob([json], { type: "application/json" });
      }
      const ext =
        blob.type.includes("gzip") || typeof CompressionStream !== "undefined" ? "json.gz" : "json";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bonsai-studio-${new Date().toISOString().slice(0, 10)}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success("Sauvegarde téléchargée");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const doLocalImport = async (file: File) => {
    const confirmed = await confirm({
      title: "Importer cette sauvegarde ?",
      description: "Les données Supabase actuelles seront remplacées par le contenu du fichier.",
      confirmLabel: "Importer",
    });
    if (!confirmed) return;
    setBusy("import");
    try {
      const buf = await file.arrayBuffer();
      const bytes = new Uint8Array(buf);
      const isGzip = bytes.length > 2 && bytes[0] === 0x1f && bytes[1] === 0x8b;
      let text: string;
      if (isGzip && typeof DecompressionStream !== "undefined") {
        const stream = new Response(new Blob([bytes])).body!.pipeThrough(
          new DecompressionStream("gzip"),
        );
        text = await new Response(stream).text();
      } else {
        text = new TextDecoder().decode(bytes);
      }
      const payload = JSON.parse(text) as SupabaseBackupPayload;
      await importSupabaseBackup(payload);
      await qc.invalidateQueries();
      toast.success("Sauvegarde restaurée depuis le fichier");
    } catch (e) {
      toast.error("Fichier invalide : " + (e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  // --- Migration IndexedDB → Supabase ---
  // Lit toutes les données locales (IndexedDB) et les uploade vers Supabase.
  const doMigrateLocal = async () => {
    const confirmed = await confirm({
      title: "Migrer les données locales vers Supabase ?",
      description: "Toutes les données IndexedDB seront importées. Les doublons (même id) seront écrasés.",
      confirmLabel: "Migrer",
    });
    if (!confirmed) return;
    setBusy("migrate");
    try {
      // 1. Lire toutes les données depuis IndexedDB via les fonctions de db.ts.
      //    On utilise le namespace idb pour éviter le conflit de noms avec
      //    supabase-data.ts (qui exporte aussi listBonsais, listPhotos, etc.).
      const [bonsais, poteries, journal, rappels, evenements] = await Promise.all([
        idb.listBonsais(),
        idb.listPoteries(),
        idb.listJournal(),
        idb.listRappels(),
        idb.listEvenements().catch(() => [] as idb.Evenement[]),
      ]);

      // Photos : on doit les récupérer par bonsai (listPhotos prend un bonsaiId).
      const photosParBonsai = await Promise.all(bonsais.map((b) => idb.listPhotos(b.id)));
      const allPhotos = photosParBonsai.flat();

      // 2. Uploader vers Supabase via les fonctions de supabase-data.ts.
      //    Ordre : bonsais d'abord (clés étrangères), puis photos/journal/rappels,
      //    poteries (avec photo éventuelle) et évènements.
      for (const b of bonsais) {
        await saveBonsai({
          id: b.id,
          nom: b.nom,
          espece: b.espece,
          style: b.style,
          etape: b.etape,
          ageEstime: b.ageEstime,
          dateAcquisition: b.dateAcquisition,
          origine: b.origine,
          hauteurCm: b.hauteurCm,
          prixAchat: b.prixAchat,
          valeurEstimee: b.valeurEstimee,
          poterieId: b.poterieId,
          notes: b.notes,
          dansCollection: b.dansCollection,
          favori: b.favori,
          createdAt: b.createdAt,
        });
      }

      for (const p of allPhotos) {
        await savePhoto({
          id: p.id,
          bonsaiId: p.bonsaiId,
          date: p.date,
          legende: p.legende,
          blob: p.blob,
        });
      }

      for (const j of journal) {
        await saveJournal({
          id: j.id,
          bonsaiId: j.bonsaiId,
          type: j.type,
          date: j.date,
          notes: j.notes,
          rappelId: j.rappelId,
        });
      }

      for (const r of rappels) {
        await saveRappel({
          id: r.id,
          bonsaiId: r.bonsaiId,
          type: r.type,
          prochaineDate: r.prochaineDate,
          intervalleJours: r.intervalleJours,
          notes: r.notes,
          actif: r.actif,
        });
      }

      for (const p of poteries) {
        await savePoterie({
          id: p.id,
          nom: p.nom,
          longueurCm: p.longueurCm,
          largeurCm: p.largeurCm,
          hauteurCm: p.hauteurCm,
          forme: p.forme,
          couleur: p.couleur,
          matiere: p.matiere,
          artisan: p.artisan,
          origine: p.origine,
          prix: p.prix,
          notes: p.notes,
          createdAt: p.createdAt,
          photoBlob: p.photoBlob,
        });
      }

      for (const e of evenements) {
        await saveEvenement({
          id: e.id,
          titre: e.titre,
          description: e.description,
          dateHeure: e.dateHeure,
          rappelMinutes: e.rappelMinutes,
          notifiedAt: e.notifiedAt,
          bonsaiId: e.bonsaiId,
          createdAt: e.createdAt,
        });
      }

      await qc.invalidateQueries();
      setHasLocalData(false);
      toast.success(
        `Migration terminée : ${bonsais.length} arbre(s), ${allPhotos.length} photo(s), ${poteries.length} poterie(s), ${journal.length} entrée(s) de journal, ${rappels.length} rappel(s), ${evenements.length} évènement(s).`,
      );
    } catch (e) {
      toast.error("Migration échouée : " + (e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  return (
    <AppShell>
      <h1 className="font-display text-4xl font-semibold">Paramètres</h1>
      <p className="mt-2 text-muted-foreground">
        Gérez vos données synchronisées via Supabase, importez vos anciennes données locales et
        exportez une sauvegarde de sécurité.
      </p>

      {/* Déconnexion Supabase */}
      <section className="mt-10 rounded-3xl border border-border bg-card p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
            <LogOut className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-semibold">Compte</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {user ? `Connecté en tant que ${user.email}` : "Non connecté."}
            </p>
          </div>
          {user && (
            <Button variant="outline" onClick={doSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Se déconnecter
            </Button>
          )}
        </div>
      </section>

      {/* Import IndexedDB → Supabase */}
      {typeof window !== "undefined" && !checkingLocal && hasLocalData && (
        <section className="mt-6 rounded-3xl border border-border bg-card p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Database className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl font-semibold">
                Importer mes données locales (IndexedDB) vers Supabase
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Des données locales (IndexedDB) ont été détectées sur cet appareil. Importez-les
                vers Supabase pour les synchroniser dans le cloud. Les éléments existants avec le
                même identifiant seront écrasés.
              </p>
            </div>
          </div>
          <div className="mt-5">
            <Button onClick={doMigrateLocal} disabled={busy !== null}>
              <UploadCloud className="mr-2 h-4 w-4" />
              {busy === "migrate" ? "Migration en cours…" : "Importer vers Supabase"}
            </Button>
          </div>
        </section>
      )}

      {/* Sauvegarde locale (filet de sécurité) */}
      <section className="mt-6 rounded-3xl border border-border bg-card p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
            <HardDriveDownload className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-semibold">
              Sauvegarde locale (filet de sécurité)
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Téléchargez un fichier <code>.json.gz</code> contenant toute votre collection (photos
              comprises), lue depuis Supabase. Utile pour archiver ou transférer vers un autre
              appareil.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Button
            variant="outline"
            onClick={doLocalExport}
            disabled={busy !== null}
            className="h-auto py-4"
          >
            <HardDriveDownload className="mr-2 h-4 w-4" />
            <div className="text-left">
              <div className="font-medium">
                {busy === "export" ? "Préparation…" : "Télécharger la sauvegarde"}
              </div>
              <div className="text-xs font-normal text-muted-foreground">
                Fichier compressé sur votre appareil
              </div>
            </div>
          </Button>
          <label
            className={`flex h-auto cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-4 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground ${busy !== null ? "pointer-events-none opacity-50" : ""}`}
          >
            <HardDriveUpload className="h-4 w-4" />
            <div className="text-left">
              <div className="font-medium">
                {busy === "import" ? "Import…" : "Importer un fichier"}
              </div>
              <div className="text-xs font-normal text-muted-foreground">.json ou .json.gz</div>
            </div>
            <input
              type="file"
              accept=".json,.gz,application/json,application/gzip"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  doLocalImport(f);
                  e.target.value = "";
                }
              }}
            />
          </label>
        </div>
      </section>

      {/* Réduire la taille de la sauvegarde */}
      <section className="mt-6 rounded-3xl border border-border bg-card p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Wand2 className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-semibold">
              Réduire la taille de la sauvegarde
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Les photos sont <strong>recompressées automatiquement</strong> côté navigateur lors de
              l'export local (max 1280 px, JPEG qualité 70 %) pour limiter la taille du fichier de
              sauvegarde.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Vos photos restent stockées intactes dans Supabase Storage — seuls les exports en
              bénéficient.
            </p>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section className="mt-6 rounded-3xl border border-border bg-card p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Info className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-semibold">À propos</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Bonsaï Studio — version <strong className="text-foreground">{APP_VERSION}</strong>
              {" · "}
              publiée le {format(parseISO(APP_VERSION_DATE), "d MMMM yyyy", { locale: fr })}
            </p>
          </div>
        </div>
      </section>
      {confirmDialog}
    </AppShell>
  );
}
