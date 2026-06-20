import { useFirebaseAuth } from "@/integrations/firebase/auth";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, ShieldCheck, TriangleAlert as AlertTriangle } from "lucide-react";

export function FirebaseAccountCard() {
  const { user, loading, configured, signIn, signOutUser } = useFirebaseAuth();

  if (!configured) {
    return (
      <div className="rounded-2xl border border-amber-300/60 bg-amber-50/60 p-5 dark:border-amber-500/40 dark:bg-amber-950/30">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />
          <div className="space-y-2 text-sm">
            <p className="font-medium text-foreground">Compte Google (Firebase) — non configuré</p>
            <p className="text-muted-foreground">
              Pour activer la synchronisation Firestore et la connexion automatique, les variables
              d'environnement Firebase doivent être renseignées :
            </p>
            <ul className="list-inside list-disc text-xs text-muted-foreground">
              <li>
                <code>VITE_FIREBASE_API_KEY</code>
              </li>
              <li>
                <code>VITE_FIREBASE_AUTH_DOMAIN</code>
              </li>
              <li>
                <code>VITE_FIREBASE_PROJECT_ID</code>
              </li>
              <li>
                <code>VITE_FIREBASE_STORAGE_BUCKET</code>
              </li>
              <li>
                <code>VITE_FIREBASE_MESSAGING_SENDER_ID</code>
              </li>
              <li>
                <code>VITE_FIREBASE_APP_ID</code>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground">
              Crée le projet Firebase, copie la config Web puis communique-la dans le chat pour
              finaliser la migration.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
        Vérification de la session…
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" />
        <div className="flex-1 space-y-3">
          {user ? (
            <>
              <div>
                <p className="text-sm font-medium">
                  Connecté en tant que {user.displayName ?? user.email}
                </p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => signOutUser()}>
                <LogOut className="mr-2 h-4 w-4" /> Se déconnecter
              </Button>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm font-medium">Compte Google</p>
                <p className="text-xs text-muted-foreground">
                  Connecte-toi pour synchroniser ta collection sur Firestore et la retrouver sur
                  tous tes appareils.
                </p>
              </div>
              <Button size="sm" onClick={() => signIn().catch((e) => console.error(e))}>
                <LogIn className="mr-2 h-4 w-4" /> Se connecter avec Google
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
