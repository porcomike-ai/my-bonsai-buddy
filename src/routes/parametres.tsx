import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  getClientId, setClientId, connect, disconnect, isConnected,
  syncBackup, restoreFromDrive, getLastBackup,
} from "@/lib/google-drive";
import { buildSnapshot, buildBackup, restoreBackup, optimizeStoredImages, type BackupPayload } from "@/lib/backup";
import { Cloud, CloudOff, Upload, Download, ExternalLink, ShieldCheck, Wand2, HardDriveDownload, HardDriveUpload } from "lucide-react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

export const Route = createFileRoute("/parametres")({
  head: () => ({
    meta: [
      { title: "Paramètres — Bonsaï Studio" },
      { name: "description", content: "Paramètres et sauvegarde : connexion à Google Drive, export local compressé et optimisation des photos." },
      { property: "og:title", content: "Paramètres — Bonsaï Studio" },
      { property: "og:description", content: "Sauvegardes Google Drive et options de l'application." },
      { property: "og:url", content: "/parametres" },
    ],
  }),
  component: ParametresPage,
});


function ParametresPage() {
  const qc = useQueryClient();
  const [clientId, setClientIdState] = useState("");
  const [connected, setConnected] = useState(false);
  const [last, setLast] = useState<string | null>(null);
  const [busy, setBusy] = useState<null | "save" | "load" | "optim" | "export" | "import">(null);

  useEffect(() => {
    setClientIdState(getClientId());
    setConnected(isConnected());
    setLast(getLastBackup());
  }, []);

  const saveClientId = () => {
    setClientId(clientId);
    toast.success("Client ID enregistré");
  };

  const doConnect = async () => {
    try {
      await connect();
      setConnected(true);
      toast.success("Connecté à Google Drive");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };
  const doDisconnect = async () => {
    await disconnect();
    setConnected(false);
    toast.success("Déconnecté");
  };

  const doBackup = async () => {
    setBusy("save");
    try {
      const snap = await buildSnapshot();
      const stats = await syncBackup(snap);
      setLast(getLastBackup());
      toast.success(
        `Sauvegarde envoyée — ${stats.uploaded} photo(s) envoyée(s), ${stats.skipped} inchangée(s)${stats.deleted ? `, ${stats.deleted} supprimée(s)` : ""}.`,
      );
    } catch (e) {
      toast.error((e as Error).message);
    } finally { setBusy(null); }
  };

  const doRestore = async () => {
    if (!confirm("Restaurer remplacera toutes les données locales par celles de la sauvegarde. Continuer ?")) return;
    setBusy("load");
    try {
      const r = await restoreFromDrive();
      if (!r) { toast.error("Aucune sauvegarde trouvée"); return; }
      if ("legacy" in r) {
        await restoreBackup(r.payload as BackupPayload);
        await qc.invalidateQueries();
        toast.success("Sauvegarde (ancien format) restaurée");
      } else {
        await qc.invalidateQueries();
        toast.success(
          `Restauration : ${r.manifest.bonsais.length} arbre(s), ${r.manifest.photos.length} photo(s)`,
        );
      }
    } catch (e) {
      toast.error((e as Error).message);
    } finally { setBusy(null); }
  };

  const doOptimize = async () => {
    if (!confirm("Recompresser toutes les photos en local (max 1280 px, JPEG qualité 70 %) ? Les fichiers d'origine ne pourront pas être restaurés.")) return;
    setBusy("optim");
    try {
      const { count, saved } = await optimizeStoredImages();
      await qc.invalidateQueries();
      const mb = (saved / 1024 / 1024).toFixed(2);
      toast.success(count > 0 ? `${count} photo(s) optimisée(s) — ${mb} Mo économisés` : "Aucune photo n'a pu être réduite davantage");
    } catch (e) {
      toast.error((e as Error).message);
    } finally { setBusy(null); }
  };

  const doLocalExport = async () => {
    setBusy("export");
    try {
      const payload = await buildBackup();
      const json = JSON.stringify(payload);
      let blob: Blob;
      if (typeof CompressionStream !== "undefined") {
        const enc = new TextEncoder().encode(json);
        const stream = new Response(new Blob([enc])).body!.pipeThrough(new CompressionStream("gzip"));
        blob = await new Response(stream).blob();
      } else {
        blob = new Blob([json], { type: "application/json" });
      }
      const ext = blob.type.includes("gzip") || typeof CompressionStream !== "undefined" ? "json.gz" : "json";
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
    } finally { setBusy(null); }
  };

  const doLocalImport = async (file: File) => {
    if (!confirm("Importer ce fichier remplacera toutes les données locales. Continuer ?")) return;
    setBusy("import");
    try {
      const buf = await file.arrayBuffer();
      const bytes = new Uint8Array(buf);
      const isGzip = bytes.length > 2 && bytes[0] === 0x1f && bytes[1] === 0x8b;
      let text: string;
      if (isGzip && typeof DecompressionStream !== "undefined") {
        const stream = new Response(new Blob([bytes])).body!.pipeThrough(new DecompressionStream("gzip"));
        text = await new Response(stream).text();
      } else {
        text = new TextDecoder().decode(bytes);
      }
      const payload = JSON.parse(text) as BackupPayload;
      await restoreBackup(payload);
      await qc.invalidateQueries();
      toast.success("Sauvegarde restaurée depuis le fichier");
    } catch (e) {
      toast.error("Fichier invalide : " + (e as Error).message);
    } finally { setBusy(null); }
  };

  return (
    <AppShell>
      <h1 className="font-display text-4xl font-semibold">Paramètres</h1>
      <p className="mt-2 text-muted-foreground">Sauvegardez votre collection sur Google Drive pour la retrouver sur un autre appareil.</p>

      <section className="mt-10 rounded-3xl border border-border bg-card p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold">Configuration unique</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pour des raisons de sécurité, vous devez créer votre propre identifiant OAuth Google (gratuit) — ainsi vous restez seul propriétaire de vos données.
            </p>
          </div>
        </div>

        <ol className="mt-5 space-y-2 text-sm text-muted-foreground">
          <li><strong className="text-foreground">1.</strong> Ouvrez <a className="text-accent hover:underline" href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer">Google Cloud Console → Credentials <ExternalLink className="inline h-3 w-3" /></a> et créez un projet.</li>
          <li><strong className="text-foreground">2.</strong> <strong className="text-foreground">Activez l'API Google Drive</strong> : ouvrez <a className="text-accent hover:underline" href="https://console.cloud.google.com/apis/library/drive.googleapis.com" target="_blank" rel="noreferrer">API Library → Google Drive API <ExternalLink className="inline h-3 w-3" /></a> et cliquez sur <em>Activer</em>. <span className="text-foreground">(Étape indispensable — sans cela, une erreur 403 apparaît.)</span></li>
          <li><strong className="text-foreground">3.</strong> Configurez l'écran OAuth (mode Externe, ajoutez votre email comme testeur).</li>
          <li><strong className="text-foreground">4.</strong> Créez un identifiant OAuth de type <em>Application Web</em>. Dans <em>Origines JavaScript autorisées</em>, ajoutez : <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">{typeof window !== "undefined" ? window.location.origin : ""}</code></li>
          <li><strong className="text-foreground">5.</strong> Copiez le <em>Client ID</em> et collez-le ci-dessous.</li>
        </ol>

        <div className="mt-5">
          <Label htmlFor="cid" className="mb-1.5 block">Google OAuth Client ID</Label>
          <div className="flex gap-2">
            <Input id="cid" value={clientId} onChange={(e) => setClientIdState(e.target.value)} placeholder="xxxxx.apps.googleusercontent.com" />
            <Button onClick={saveClientId}>Enregistrer</Button>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-border bg-card p-6">
        <div className="flex items-start gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${connected ? "bg-accent/15 text-accent" : "bg-secondary text-muted-foreground"}`}>
            {connected ? <Cloud className="h-5 w-5" /> : <CloudOff className="h-5 w-5" />}
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-semibold">Compte Google Drive</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {connected ? "Connecté. Vous pouvez sauvegarder et restaurer." : "Non connecté."}
            </p>
            {last && (
              <p className="mt-1 text-xs text-muted-foreground">
                Dernière sauvegarde : {format(parseISO(last), "d MMM yyyy 'à' HH:mm", { locale: fr })}
              </p>
            )}
          </div>
          {connected ? (
            <Button variant="outline" onClick={doDisconnect}>Se déconnecter</Button>
          ) : (
            <Button onClick={doConnect} disabled={!clientId}>Connecter Google</Button>
          )}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Button variant="outline" onClick={doBackup} disabled={!connected || busy !== null} className="h-auto py-4">
            <Upload className="mr-2 h-4 w-4" />
            <div className="text-left">
              <div className="font-medium">{busy === "save" ? "Envoi en cours…" : "Sauvegarder maintenant"}</div>
              <div className="text-xs font-normal text-muted-foreground">Dossier « Bonsaï Studio » sur votre Drive</div>
            </div>
          </Button>
          <Button variant="outline" onClick={doRestore} disabled={!connected || busy !== null} className="h-auto py-4">
            <Download className="mr-2 h-4 w-4" />
            <div className="text-left">
              <div className="font-medium">{busy === "load" ? "Restauration…" : "Restaurer depuis Drive"}</div>
              <div className="text-xs font-normal text-muted-foreground">Remplace les données locales</div>
            </div>
          </Button>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          L'application n'a accès qu'aux fichiers qu'elle crée elle-même (scope <code>drive.file</code>) — elle ne peut pas lire le reste de votre Drive.
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-border bg-card p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Wand2 className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-semibold">Réduire la taille de la sauvegarde</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Les sauvegardes envoyées sur Drive sont déjà <strong>compressées en gzip</strong> et les photos sont <strong>recompressées automatiquement</strong> (max 1280 px, JPEG 70 %) pendant l'export — sans toucher à vos fichiers locaux.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Pour libérer aussi de l'espace sur votre téléphone, vous pouvez recompresser les photos directement dans la base locale.
            </p>
          </div>
        </div>
        <div className="mt-5">
          <Button variant="outline" onClick={doOptimize} disabled={busy !== null}>
            <Wand2 className="mr-2 h-4 w-4" />
            {busy === "optim" ? "Optimisation…" : "Optimiser les photos locales"}
          </Button>
        </div>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
          <li>Sauvegardes <strong>incrémentales</strong> : seules les photos nouvelles ou modifiées sont ré-envoyées (empreinte SHA-256).</li>
          <li>Chaque photo est stockée en <strong>binaire séparé</strong> sur Drive — pas d'encodage base64 (~ −33 % par rapport au format précédent).</li>
          <li>Manifest JSON gzippé → <strong>−60 à −80 %</strong> sur les métadonnées.</li>
          <li>Redimensionnement à 1280 px, qualité JPEG 70 % → <strong>−70 à −90 %</strong> sur le poids des images.</li>
          <li>Évitez de stocker plusieurs photos quasi identiques par arbre — gardez les meilleures.</li>
        </ul>
      </section>

      <section className="mt-6 rounded-3xl border border-border bg-card p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
            <HardDriveDownload className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-semibold">Sauvegarde locale (filet de sécurité)</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Téléchargez un fichier <code>.json.gz</code> contenant toute votre collection (photos comprises). Utile si Google Drive est indisponible, ou pour transférer manuellement vers un autre appareil.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Button variant="outline" onClick={doLocalExport} disabled={busy !== null} className="h-auto py-4">
            <HardDriveDownload className="mr-2 h-4 w-4" />
            <div className="text-left">
              <div className="font-medium">{busy === "export" ? "Préparation…" : "Télécharger la sauvegarde"}</div>
              <div className="text-xs font-normal text-muted-foreground">Fichier compressé sur votre appareil</div>
            </div>
          </Button>
          <label className={`flex h-auto cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-4 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground ${busy !== null ? "pointer-events-none opacity-50" : ""}`}>
            <HardDriveUpload className="h-4 w-4" />
            <div className="text-left">
              <div className="font-medium">{busy === "import" ? "Import…" : "Importer un fichier"}</div>
              <div className="text-xs font-normal text-muted-foreground">.json ou .json.gz</div>
            </div>
            <input
              type="file"
              accept=".json,.gz,application/json,application/gzip"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) { doLocalImport(f); e.target.value = ""; } }}
            />
          </label>
        </div>
      </section>

    </AppShell>
  );
}
