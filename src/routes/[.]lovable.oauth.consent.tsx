import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

type AuthOAuth = {
  getAuthorizationDetails: (id: string) => Promise<{
    data: {
      client?: { name?: string; client_uri?: string } | null;
      redirect_url?: string;
      redirect_to?: string;
    } | null;
    error: { message: string } | null;
  }>;
  approveAuthorization: (id: string) => Promise<{
    data: { redirect_url?: string; redirect_to?: string } | null;
    error: { message: string } | null;
  }>;
  denyAuthorization: (id: string) => Promise<{
    data: { redirect_url?: string; redirect_to?: string } | null;
    error: { message: string } | null;
  }>;
};
const authOAuth = () => (supabase.auth as unknown as { oauth: AuthOAuth }).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("authorization_id manquant");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({ to: "/connexion", search: { redirect: next } });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await authOAuth().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="flex min-h-screen items-center justify-center p-6 text-sm text-muted-foreground">
      Impossible de charger la demande d'autorisation : {String((error as Error)?.message ?? error)}
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientName = details?.client?.name ?? "cette application";

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await authOAuth().approveAuthorization(authorization_id)
      : await authOAuth().denyAuthorization(authorization_id);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("Le serveur d'autorisation n'a pas renvoyé d'URL de redirection.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm">
            <Leaf className="h-6 w-6" strokeWidth={2.25} />
          </div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Connecter {clientName}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {clientName} pourra lire vos bonsaïs, vos poteries et vos rappels, et écrire dans votre
            journal d'entretien, en votre nom.
          </p>
        </div>
        {error && (
          <p role="alert" className="mb-4 text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="flex flex-col gap-2">
          <Button disabled={busy} onClick={() => decide(true)} className="w-full">
            Autoriser
          </Button>
          <Button
            disabled={busy}
            variant="outline"
            onClick={() => decide(false)}
            className="w-full"
          >
            Refuser
          </Button>
        </div>
      </div>
    </main>
  );
}
