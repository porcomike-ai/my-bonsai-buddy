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
  uploadBackup, downloadBackup, getLastBackup,
} from "@/lib/google-drive";
import { buildBackup, restoreBackup, type BackupPayload } from "@/lib/backup";
import { Cloud, CloudOff, Upload, Download, ExternalLink, ShieldCheck } from "lucide-react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

export const Route = createFileRoute("/parametres")({
  head: () => ({ meta: [{ title: "Paramètres — Bonsaï Studio" }] }),
  component: ParametresPage,
});

function ParametresPage() {
  const qc = useQueryClient();
  const [clientId, setClientIdState] = useState("");
  const [connected, setConnected] = useState(false);
  const [last, setLast] = useState<string | null>(null);
  const [busy, setBusy] = useState<null | "save" | "load">(null);

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
      const payload = await buildBackup();
      await uploadBackup(payload);
      setLast(getLastBackup());
      toast.success("Sauvegarde envoyée sur Google Drive");
    } catch (e) {
      toast.error((e as Error).message);
    } finally { setBusy(null); }
  };

  const doRestore = async () => {
    if (!confirm("Restaurer remplacera toutes les données locales par celles de la sauvegarde. Continuer ?")) return;
    setBusy("load");
    try {
      const payload = await downloadBackup<BackupPayload>();
      if (!payload) { toast.error("Aucune sauvegarde trouvée"); return; }
      await restoreBackup(payload);
      await qc.invalidateQueries();
      toast.success(`Restauration : ${payload.bonsais.length} arbre(s), ${payload.photos.length} photo(s)`);
    } catch (e) {
      toast.error((e as Error).message);
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
    </AppShell>
  );
}
