import type { AiStudioError } from "../types";

export type BackgroundRemovalErrorCode =
  | "model_load_failed"
  | "processing_failed"
  | "canvas_unavailable"
  | "unsupported_format"
  | "timeout"
  | "cancelled";

export type BackgroundRemovalError = AiStudioError<BackgroundRemovalErrorCode>;

/**
 * Messages affichés à l'utilisateur (toasts sonner), volontairement séparés
 * des messages techniques (`error.message`, réservés aux logs/tests) pour ne
 * jamais faire fuiter une erreur brute type "Failed to fetch" dans l'UI.
 */
export const BACKGROUND_REMOVAL_ERROR_MESSAGES: Record<BackgroundRemovalErrorCode, string> = {
  model_load_failed:
    "Le modèle de détourage n'a pas pu être téléchargé. Vérifiez votre connexion et réessayez.",
  processing_failed:
    "Le traitement de la photo a échoué. Réessayez, ou choisissez une autre photo si le problème persiste.",
  canvas_unavailable:
    "Votre navigateur ne supporte pas cette fonctionnalité. Essayez avec un navigateur à jour.",
  unsupported_format:
    "Ce format d'image n'est pas pris en charge pour le détourage. Utilisez un JPEG ou PNG.",
  timeout:
    "Le détourage prend trop de temps (probablement un souci réseau pour télécharger le modèle) et a été interrompu automatiquement. Réessayez, idéalement hors de l'aperçu Bolt (sur le site déployé), qui restreint parfois les requêtes réseau externes.",
  cancelled: "Traitement annulé.",
};

/**
 * Classe une erreur inconnue (réseau, WASM, etc.) en code stable. Best-effort :
 * on inspecte le message plutôt que le type exact, la librairie
 * @imgly/background-removal ne documentant pas de hiérarchie d'erreurs typée.
 */
export function toBackgroundRemovalError(err: unknown): BackgroundRemovalError {
  const raw = err instanceof Error ? err.message : String(err);
  const lower = raw.toLowerCase();

  if (lower.includes("fetch") || lower.includes("network") || lower.includes("load")) {
    return { code: "model_load_failed", message: raw };
  }
  if (lower.includes("decode") || lower.includes("format") || lower.includes("image")) {
    return { code: "unsupported_format", message: raw };
  }
  return { code: "processing_failed", message: raw };
}
