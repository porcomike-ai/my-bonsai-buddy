import type { AiStudioError } from "../types";

export type SpeciesIdErrorCode =
  | "quota_exceeded"
  | "no_match"
  | "invalid_image"
  | "not_configured"
  | "network_failed"
  | "unexpected_error";

export type SpeciesIdError = AiStudioError<SpeciesIdErrorCode>;

/** Messages affichés à l'utilisateur — jamais l'erreur technique brute de l'Edge Function. */
export const SPECIES_ID_ERROR_MESSAGES: Record<SpeciesIdErrorCode, string> = {
  quota_exceeded:
    "Quota quotidien d'identification atteint. Réessayez demain — le compteur se réinitialise chaque jour.",
  no_match:
    "Aucune espèce n'a pu être identifiée sur cette photo. Essayez une photo plus nette du feuillage ou de l'écorce.",
  invalid_image: "Cette image n'a pas pu être envoyée pour identification.",
  not_configured:
    "L'identification d'espèce n'est pas encore configurée sur ce projet (clé Pl@ntNet manquante côté serveur).",
  network_failed:
    "Impossible de contacter le service d'identification. Vérifiez votre connexion et réessayez.",
  unexpected_error: "L'identification a échoué de façon inattendue. Réessayez.",
};

/** Classe la réponse d'erreur de l'Edge Function (ou une exception réseau) en code stable. */
export function toSpeciesIdError(payload: unknown, httpStatus?: number): SpeciesIdError {
  if (httpStatus === 429) {
    return { code: "quota_exceeded", message: "429 quota_exceeded" };
  }
  if (payload && typeof payload === "object" && "code" in payload) {
    const code = String((payload as { code?: unknown }).code ?? "");
    const message = String((payload as { error?: unknown }).error ?? code);
    if (
      code === "quota_exceeded" ||
      code === "no_match" ||
      code === "invalid_image" ||
      code === "not_configured"
    ) {
      return { code, message };
    }
  }
  const raw =
    payload instanceof Error
      ? payload.message
      : payload && typeof payload === "object" && ("message" in payload || "error" in payload)
        ? String(
            (payload as { message?: unknown; error?: unknown }).message ??
              (payload as { message?: unknown; error?: unknown }).error ??
              "",
          )
        : String(payload ?? "erreur inconnue");
  const lower = raw.toLowerCase();
  if (lower.includes("fetch") || lower.includes("network")) {
    return { code: "network_failed", message: raw };
  }
  return { code: "unexpected_error", message: raw };
}
