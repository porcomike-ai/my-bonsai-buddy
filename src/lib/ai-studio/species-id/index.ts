import { supabase } from "@/integrations/supabase/client";
import { toSpeciesIdError, type SpeciesIdError } from "./errors";

export type { SpeciesIdError, SpeciesIdErrorCode } from "./errors";
export { SPECIES_ID_ERROR_MESSAGES } from "./errors";

export class SpeciesIdFailure extends Error {
  readonly cause_: SpeciesIdError;
  constructor(error: SpeciesIdError) {
    super(error.message);
    this.name = "SpeciesIdFailure";
    this.cause_ = error;
  }
}

export interface SpeciesCandidate {
  scientificName: string;
  commonNames: string[];
  family?: string;
  /** Score de confiance Pl@ntNet, entre 0 et 1. */
  confidence: number;
}

export interface SpeciesIdResult {
  candidates: SpeciesCandidate[];
  /** Requêtes restantes aujourd'hui, telles que renvoyées par l'Edge Function. */
  quotaRemaining: number;
}

/**
 * Identifie l'espèce d'un bonsaï à partir d'une photo, via l'Edge Function
 * `identify-species` (qui proxifie Pl@ntNet et applique un quota quotidien
 * par utilisateur — voir supabase/functions/identify-species/index.ts).
 *
 * `organ` aide Pl@ntNet à mieux cibler l'analyse ("leaf", "bark", "flower",
 * "fruit", "habit" pour une vue d'ensemble de l'arbre) ; "auto" par défaut
 * laisse le modèle deviner, au prix d'une précision parfois moindre.
 */
export async function identifySpecies(
  imageBlob: Blob,
  organ: string = "auto",
): Promise<SpeciesIdResult> {
  const formData = new FormData();
  formData.append("image", imageBlob, "photo.jpg");
  formData.append("organ", organ);

  const { data, error } = await supabase.functions.invoke("identify-species", {
    body: formData,
  });

  if (error) {
    // supabase-js expose la réponse brute sous `error.context` pour les
    // erreurs HTTP (FunctionsHttpError) — on tente de lire le JSON renvoyé
    // par notre Edge Function pour récupérer le `code` précis (quota_exceeded,
    // not_configured…) plutôt que de se rabattre sur un message générique.
    let payload: unknown = error;
    let status: number | undefined;
    const context = (error as { context?: Response }).context;
    if (context) {
      status = context.status;
      try {
        payload = await context.clone().json();
      } catch {
        /* Réponse non-JSON : on retombe sur `error` tel quel pour la classification. */
      }
    }
    throw new SpeciesIdFailure(toSpeciesIdError(payload, status));
  }

  if (data?.code === "no_match") {
    throw new SpeciesIdFailure(toSpeciesIdError(data));
  }

  const candidates: SpeciesCandidate[] = Array.isArray(data?.results) ? data.results : [];
  return {
    candidates,
    quotaRemaining: typeof data?.quotaRemaining === "number" ? data.quotaRemaining : 0,
  };
}
