import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/supabase-auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf } from "lucide-react";
import { toast } from "sonner";

type ConnexionSearch = { redirect?: string };

export const Route = createFileRoute("/connexion")({
  validateSearch: (s: Record<string, unknown>): ConnexionSearch => ({
    redirect: typeof s.redirect === "string" && s.redirect.startsWith("/") ? s.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Connexion — Bonsaï Studio" },
      {
        name: "description",
        content:
          "Connectez-vous à votre carnet de bonsaïs pour synchroniser vos arbres sur tous vos appareils.",
      },
    ],
  }),
  component: ConnexionPage,
});

function ConnexionPage() {
  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const goRedirect = () => {
    const target = redirect ?? "/";
    // window.location for full URL fidelity (preserves query strings like ?authorization_id=…)
    if (target.includes("?") || target.startsWith("/.")) window.location.assign(target);
    else navigate({ to: target, replace: true });
  };

  // Déjà connecté → on quitte la page d'auth
  useEffect(() => {
    if (!loading && user) goRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await signIn(email.trim(), password);
      toast.success("Connexion réussie");
      goRedirect();
    } catch (err) {
      toast.error("Connexion impossible : " + (err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm">
            <Leaf className="h-6 w-6" strokeWidth={2.25} />
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Bonsaï Studio</h1>
          <p className="mt-1 text-sm text-muted-foreground">Carnet de collection</p>
        </div>

        <form onSubmit={submit} className="space-y-4 rounded-3xl border border-border bg-card p-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? "Connexion…" : "Se connecter"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link to="/inscription" className="font-medium text-accent hover:underline">
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
