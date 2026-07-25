import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useConfirm } from "@/components/confirm-dialog";
import { ExportZipDialog } from "@/components/export-zip-dialog";
import { toast } from "sonner";
import {
  exportSupabaseBackup,
  importSupabaseBackup,
  getBackupSummary,
  type SupabaseBackupPayload,
  type BackupProgress,
  listBonsais,
  listPhotos,
  saveBonsai,
  savePhoto,
  savePoterie,
  saveJournal,
  saveRappel,
  saveEvenement,
} from "@/lib/supabase-data";
import { pickSaveTarget, writeToSaveTarget } from "@/lib/save-file";
import { formatBytes } from "@/lib/image-utils";
import * as idb from "@/lib/db";
import { useAuth } from "@/components/supabase-auth-provider";
import { subscribeToPush, notificationStatus, checkPushSubscription, unsubscribeFromPush } from "@/lib/notifications";
import { supabase } from "@/integrations/supabase/client";
import {
  CloudUpload as UploadCloud,
  Download,
  HardDriveDownload,
  HardDriveUpload,
  Info,
  LogOut,
  Database,
  Bell,
  BellOff,
  AlertCircle,
  FolderArchive,
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
  const [pushEnabled, setPushEnabled] = useState<boolean | null>(null);
  const [enablingPush, setEnablingPush] = useState(false);
  const [disablingPush, setDisablingPush] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);
  const [compressPhotos, setCompressPhotos] = useState(false);
  const [backupProgress, setBackupProgress] = useState<BackupProgress | null>(null);

  // Récapitulatif du contenu de la sauvegarde (nombre d'arbres, photos, etc.),
  // affiché avant de lancer l'export pour que l'utilisateur sache ce qu'il
  // télécharge. Requête légère : ne télécharge aucune photo, juste les lignes.
  const { data: backupSummary } = useQuery({
    queryKey: ["backup-summary"],
    queryFn: getBackupSummary,
  });

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

  // Vérifie le statut des notifications push (vérifie l'abonnement réel, pas juste la permission)
  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    (async () => {
      try {
        const hasSubscription = await checkPushSubscription();
        if (!cancelled) setPushEnabled(hasSubscription);
      } catch {
        if (!cancelled) setPushEnabled(false);
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

  const doEnablePush = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour activer les notifications");
      return;
    }
    setEnablingPush(true);
    try {
      const success = await subscribeToPush();
      if (success) {
        // Vérifier l'abonnement réel après l'activation
        const hasSubscription = await checkPushSubscription();
        setPushEnabled(hasSubscription);
        toast.success("Notifications push activées");
      } else {
        toast.error("Impossible d'activer les notifications push");
      }
    } catch (e) {
      toast.error("Erreur: " + (e as Error).message);
    } finally {
      setEnablingPush(false);
    }
  };

  const doDisablePush = async () => {
    setDisablingPush(true);
    try {
      const success = await unsubscribeFromPush();
      if (success) {
        setPushEnabled(false);
        toast.success("Notifications push désactivées");
      } else {
        toast.error("Impossible de désactiver les notifications push");
      }
    } catch (e) {
      toast.error("Erreur: " + (e as Error).message);
    } finally {
      setDisablingPush(false);
    }
  };

  const doSendTestNotification = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour envoyer une notification de test");
      return;
    }
    setSendingTest(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-test-push");
      if (error) {
        toast.error("Erreur: " + error.message);
        return;
      }
      toast.success(data?.message || "Notification de test envoyée");
    } catch (e) {
      toast.error("Erreur: " + (e as Error).message);
    } finally {
      setSendingTest(false);
    }
  };

  const doLocalExport = async () => {
    // Le nom de fichier et l'extension ne dépendent d'aucune donnée async
    // (juste de la disponibilité de CompressionStream) : on les calcule tout
    // de suite pour pouvoir ouvrir le sélecteur d'emplacement immédiatement,
    // pendant que le clic est encore "actif" côté navigateur.
    const willGzip = typeof CompressionStream !== "undefined";
    const ext = willGzip ? "gz" : "json";
    const filename = `bonsai-studio-${new Date().toISOString().slice(0, 10)}.json${
      willGzip ? ".gz" : ""
    }`;

    const target = await pickSaveTarget(filename, {
      mimeType: willGzip ? "application/gzip" : "application/json",
      extension: `.${ext}`,
      description: "Sauvegarde Bonsaï Studio",
    });
    if (target.kind === "cancelled") return;

    setBusy("export");
    setBackupProgress({ phase: "donnees", current: 0, total: 1 });
    try {
      const payload = await exportSupabaseBackup({
        compressPhotos,
        onProgress: setBackupProgress,
      });
      const json = JSON.stringify(payload);
      let blob: Blob;
      if (willGzip) {
        const enc = new TextEncoder().encode(json);
        const stream = new Response(new Blob([enc])).body!.pipeThrough(
          new CompressionStream("gzip"),
        );
        blob = await new Response(stream).blob();
      } else {
        blob = new Blob([json], { type: "application/json" });
      }

      await writeToSaveTarget(target, blob);
      toast.success(`Sauvegarde téléchargée (${formatBytes(blob.size)})`);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(null);
      setBackupProgress(null);
    }
  };

  const doLocalImport = async (file: File) => {
    setBusy("import");
    let payload: SupabaseBackupPayload;
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
      payload = JSON.parse(text) as SupabaseBackupPayload;
    } catch (e) {
      toast.error("Fichier invalide : " + (e as Error).message);
      setBusy(null);
      return;
    }

    // On lit et on parse le fichier avant de demander confirmation, pour
    // pouvoir afficher ce que la sauvegarde contient réellement plutôt qu'un
    // message générique.
    const confirmed = await confirm({
      title: "Importer cette sauvegarde ?",
      description: `Cette sauvegarde contient ${payload.bonsais.length} arbre(s), ${payload.photos.length} photo(s), ${payload.poteries.length} poterie(s) (${payload.poteriePhotos?.length ?? 0} photo(s) de galerie), ${payload.journal.length} entrée(s) de journal et ${payload.rappels.length} rappel(s). Les données Supabase actuelles seront remplacées (par id).`,
      confirmLabel: "Importer",
    });
    if (!confirmed) {
      setBusy(null);
      return;
    }

    setBackupProgress({ phase: "donnees", current: 0, total: 1 });
    try {
      await importSupabaseBackup(payload, { onProgress: setBackupProgress });
      await qc.invalidateQueries();
      toast.success("Sauvegarde restaurée depuis le fichier");
    } catch (e) {
      toast.error("Échec de l'import : " + (e as Error).message);
    } finally {
      setBusy(null);
      setBackupProgress(null);
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 sm:flex-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <LogOut className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl font-semibold">Compte</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {user ? `Connecté en tant que ${user.email}` : "Non connecté."}
              </p>
            </div>
          </div>
          {user && (
            <Button variant="outline" onClick={doSignOut} className="w-full sm:w-auto">
              <LogOut className="mr-2 h-4 w-4" />
              Se déconnecter
            </Button>
          )}
        </div>
      </section>

      {/* Notifications push */}
      {typeof window !== "undefined" && (
        <section className="mt-6 rounded-3xl border border-border bg-card p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
              {pushEnabled ? (
                <Bell className="h-5 w-5" />
              ) : (
                <BellOff className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl font-semibold">Notifications push</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {pushEnabled === null
                  ? "Vérification du support des notifications..."
                  : pushEnabled
                  ? "Les notifications push sont activées. Vous recevrez des rappels même si l'application est fermée."
                  : notificationStatus() === "unsupported"
                  ? "Votre navigateur ne supporte pas les notifications push."
                  : "Activez les notifications pour recevoir des rappels même si l'application est fermée."}
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {pushEnabled === null ? (
              <Button disabled className="w-full opacity-50 sm:w-auto">
                <AlertCircle className="mr-2 h-4 w-4" />
                Vérification...
              </Button>
            ) : pushEnabled ? (
              <>
                <Button
                  variant="outline"
                  onClick={doDisablePush}
                  disabled={disablingPush}
                  className="w-full sm:w-auto"
                >
                  <BellOff className="mr-2 h-4 w-4" />
                  {disablingPush ? "Désactivation..." : "Désactiver les notifications"}
                </Button>
                <Button
                  onClick={doSendTestNotification}
                  disabled={sendingTest}
                  className="w-full sm:w-auto"
                >
                  {sendingTest ? "Envoi..." : "Envoyer une notification de test"}
                </Button>
              </>
            ) : notificationStatus() === "unsupported" ? (
              <Button variant="outline" disabled className="w-full opacity-50 sm:w-auto">
                <AlertCircle className="mr-2 h-4 w-4" />
                Non supporté
              </Button>
            ) : (
              <Button onClick={doEnablePush} disabled={enablingPush || !user} className="w-full sm:w-auto">
                <Bell className="mr-2 h-4 w-4" />
                {enablingPush ? "Activation..." : "Activer les notifications"}
              </Button>
            )}
          </div>
        </section>
      )}

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
            {backupSummary && (
              <p className="mt-2 text-sm text-muted-foreground">
                Contenu actuel : <strong className="text-foreground">{backupSummary.bonsais}</strong>{" "}
                arbre(s), <strong className="text-foreground">{backupSummary.photos}</strong> photo(s),{" "}
                {backupSummary.poteries} poterie(s) ({backupSummary.poteriePhotos} photo(s) de
                galerie), {backupSummary.journal} entrée(s) de journal,{" "}
                {backupSummary.rappels} rappel(s), {backupSummary.evenements} évènement(s).
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl border border-border bg-muted/30 p-3">
          <Checkbox
            id="compress-photos"
            checked={compressPhotos}
            onCheckedChange={(v) => setCompressPhotos(v === true)}
            disabled={busy !== null}
          />
          <label htmlFor="compress-photos" className="cursor-pointer text-sm leading-snug">
            <span className="font-medium">Réduire la taille des photos</span>
            <span className="mt-0.5 block text-muted-foreground">
              Redimensionne (max 1280 px) et recompresse les photos en JPEG qualité 70 % avant de
              les inclure dans le fichier, pour une sauvegarde plus légère. Décoché (par défaut) :
              les photos sont sauvegardées dans leur résolution d'origine. Dans tous les cas, vos
              photos restent stockées intactes dans Supabase Storage — seul le fichier exporté est
              concerné.
            </span>
          </label>
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

        {busy !== null && backupProgress && (
          <div className="mt-4">
            <p className="mb-1 text-sm text-muted-foreground">
              {busy === "export"
                ? backupProgress.phase === "photos"
                  ? "Téléchargement et encodage des photos…"
                  : backupProgress.phase === "poteries"
                    ? "Traitement des photos de poteries…"
                    : "Collecte des données…"
                : backupProgress.phase === "photos"
                  ? "Import des photos…"
                  : backupProgress.phase === "poteries"
                    ? "Import des poteries…"
                    : "Import des données…"}
            </p>
            <Progress
              value={Math.round((backupProgress.current / backupProgress.total) * 100)}
            />
            <p className="mt-1 text-right text-xs text-muted-foreground">
              {backupProgress.current} / {backupProgress.total}
            </p>
          </div>
        )}
      </section>

      {/* Export ZIP par arbre (photos + fiche texte) */}
      <section className="mt-6 rounded-3xl border border-border bg-card p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
            <FolderArchive className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-semibold">Export ZIP par arbre</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Exportez toute la collection ou une sélection d'arbres : un dossier par arbre,
              contenant ses photos (nommées par date) et une fiche texte avec ses caractéristiques
              et l'historique complet de ses événements.
            </p>
          </div>
        </div>
        <div className="mt-5">
          <ExportZipDialog />
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
