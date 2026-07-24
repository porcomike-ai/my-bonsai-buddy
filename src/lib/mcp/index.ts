import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listBonsais from "./tools/list-bonsais";
import getBonsai from "./tools/get-bonsai";
import listRappels from "./tools/list-rappels";
import logSoin from "./tools/log-soin";
import listPoteries from "./tools/list-poteries";

const projectRef =
  import.meta.env.VITE_SUPABASE_PROJECT_ID || "xvvqffgchelmszpbdvde";

if (!import.meta.env.VITE_SUPABASE_PROJECT_ID) {
  // Ne bloque plus le démarrage du serveur : ce module est chargé au niveau
  // de l'arbre de routes (routeTree.gen.ts), donc une exception ici plantait
  // TOUTE l'application (pas seulement les routes MCP), pour une variable
  // d'environnement qui ne concerne qu'une fonctionnalité annexe.
  console.error(
    "VITE_SUPABASE_PROJECT_ID n'est pas défini : utilisation de la valeur de repli " +
      "'xvvqffgchelmszpbdvde'. Ajoutez VITE_SUPABASE_PROJECT_ID à vos variables " +
      "d'environnement de build pour éviter de dépendre de cette valeur codée en dur " +
      "(voir README.md, section Variables d'environnement).",
  );
}

export default defineMcp({
  name: "bonsai-studio-mcp",
  title: "Bonsaï Studio",
  version: "0.1.0",
  instructions:
    "Outils pour interagir avec votre carnet Bonsaï Studio : lister vos bonsaïs et poteries, consulter les rappels d'entretien à venir, et enregistrer les soins effectués dans le journal.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listBonsais, getBonsai, listRappels, logSoin, listPoteries],
});
