import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { N as Route, B as Button, O as authOAuth } from "./_ssr/router-lnbQiR3D.mjs";
import "./_libs/sonner.mjs";
import "./_libs/lovable.dev__mcp-js.mjs";
import "./_libs/modelcontextprotocol__sdk.mjs";
import "./_libs/zod-to-json-schema.mjs";
import "./_libs/ajv-formats.mjs";
import { p as Leaf } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/tanstack__react-router.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_ssr/client-CWZp_xfH.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-label.mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/radix-ui__react-select.mjs";
import "./_libs/radix-ui__number.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-collection.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-direction.mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/radix-ui__react-popper.mjs";
import "./_libs/floating-ui__react-dom.mjs";
import "./_libs/floating-ui__dom.mjs";
import "./_libs/floating-ui__core.mjs";
import "./_libs/floating-ui__utils.mjs";
import "./_libs/radix-ui__react-arrow.mjs";
import "./_libs/radix-ui__react-use-size.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/radix-ui__react-use-previous.mjs";
import "./_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./_libs/aria-hidden.mjs";
import "./_libs/react-remove-scroll.mjs";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/radix-ui__react-dialog.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/radix-ui__react-radio-group.mjs";
import "./_libs/radix-ui__react-roving-focus.mjs";
import "./_libs/date-fns.mjs";
import "./_libs/zod.mjs";
import "./_libs/jose.mjs";
import "./_libs/ajv.mjs";
import "./_libs/fast-deep-equal.mjs";
import "./_libs/json-schema-traverse.mjs";
import "./_libs/fast-uri.mjs";
function Consent() {
  const details = Route.useLoaderData();
  const {
    authorization_id
  } = Route.useSearch();
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const clientName = details?.client?.name ?? "cette application";
  async function decide(approve) {
    setBusy(true);
    setError(null);
    const {
      data,
      error: error2
    } = approve ? await authOAuth().approveAuthorization(authorization_id) : await authOAuth().denyAuthorization(authorization_id);
    if (error2) {
      setBusy(false);
      setError(error2.message);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex min-h-screen items-center justify-center bg-background px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-3xl border border-border bg-card p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-6 w-6", strokeWidth: 2.25 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-semibold tracking-tight", children: [
        "Connecter ",
        clientName
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
        clientName,
        " pourra lire vos bonsaïs, vos poteries et vos rappels, et écrire dans votre journal d'entretien, en votre nom."
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "mb-4 text-sm text-destructive", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: busy, onClick: () => decide(true), className: "w-full", children: "Autoriser" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: busy, variant: "outline", onClick: () => decide(false), className: "w-full", children: "Refuser" })
    ] })
  ] }) });
}
export {
  Consent as component
};
