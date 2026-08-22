/**
 * Types partagés par tous les modules du "Studio IA" (détourage aujourd'hui,
 * identification d'espèce / diagnostic santé plus tard). Poser ce socle
 * commun maintenant évite de devoir changer la signature du hook ou de l'UI
 * quand un futur module (à quota, contrairement au détourage) sera ajouté.
 */

/** Identifiant stable de chaque module, utilisé comme clé dans le registre. */
export type AiModuleId = "background-removal" | "species-id" | "health-diagnostic";

/**
 * - "client"    : traitement 100% local, gratuit et illimité (ex. détourage).
 * - "api-quota" : appelle une API externe avec un quota gratuit journalier
 *                 (ex. futur module espèce via Pl@ntNet, santé via Gemini).
 * - "planned"   : listé pour mémoire, aucune logique branchée pour l'instant.
 */
export type AiModuleAvailability = "client" | "api-quota" | "planned";

export interface AiModuleDescriptor {
  id: AiModuleId;
  label: string;
  availability: AiModuleAvailability;
  /** true si le module ne consomme jamais de quota, quelle que soit l'utilisation. */
  isFree: boolean;
}

/**
 * Erreurs typées communes à tous les modules IA. Chaque module peut définir
 * ses propres codes en plus (voir background-removal/errors.ts), mais tous
 * doivent porter un `code` + un `message` technique (pour les logs/tests) —
 * le message affiché à l'utilisateur est résolu séparément via
 * `error-messages.ts`, jamais construit inline dans l'UI.
 */
export interface AiStudioError<TCode extends string = string> {
  code: TCode;
  message: string;
}

export type AiStudioState<TResult, TError extends AiStudioError = AiStudioError> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; result: TResult }
  | { status: "error"; error: TError };
