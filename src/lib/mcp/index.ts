import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listBonsais from "./tools/list-bonsais";
import getBonsai from "./tools/get-bonsai";
import listRappels from "./tools/list-rappels";
import logSoin from "./tools/log-soin";
import listPoteries from "./tools/list-poteries";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

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
