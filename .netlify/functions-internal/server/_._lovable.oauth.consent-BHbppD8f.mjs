import { j as jsxRuntimeExports } from "./_libs/react.mjs";
const SplitErrorComponent = ({
  error
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex min-h-screen items-center justify-center p-6 text-sm text-muted-foreground", children: [
  "Impossible de charger la demande d'autorisation : ",
  String(error?.message ?? error)
] });
export {
  SplitErrorComponent as errorComponent
};
