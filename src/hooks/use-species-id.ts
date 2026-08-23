import { useCallback, useRef, useState } from "react";
import {
  identifySpecies,
  SpeciesIdFailure,
  SPECIES_ID_ERROR_MESSAGES,
  type SpeciesIdResult,
  type SpeciesIdError,
} from "@/lib/ai-studio/species-id";

type SpeciesIdState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; result: SpeciesIdResult }
  | { status: "error"; error: SpeciesIdError; userMessage: string };

/**
 * Pilote le module d'identification d'espèce. Même forme que
 * `usePhotoStudio` (idle/loading/success/error + `quotaRemaining`), mais ici
 * `quotaRemaining` est réellement renseigné par l'Edge Function après chaque
 * appel — contrairement au détourage qui est local et illimité.
 *
 * Pas de gestion d'annulation façon AbortController ici : un appel réseau à
 * une Edge Function est bien plus court qu'un traitement WASM local, et un
 * résultat arrivant après démontage est de toute façon ignoré grâce à
 * `callIdRef` (comparaison d'identifiant d'appel).
 */
export function useSpeciesId() {
  const [state, setState] = useState<SpeciesIdState>({ status: "idle" });
  const callIdRef = useRef(0);

  const reset = useCallback(() => setState({ status: "idle" }), []);

  const identify = useCallback(
    async (imageBlob: Blob, organ?: string): Promise<SpeciesIdResult | undefined> => {
      const callId = ++callIdRef.current;
      setState({ status: "loading" });

      try {
        const result = await identifySpecies(imageBlob, organ);
        if (callIdRef.current !== callId) return undefined;
        setState({ status: "success", result });
        return result;
      } catch (err) {
        if (callIdRef.current !== callId) return undefined;

        const speciesError: SpeciesIdError =
          err instanceof SpeciesIdFailure
            ? err.cause_
            : {
                code: "unexpected_error",
                message: err instanceof Error ? err.message : String(err),
              };

        setState({
          status: "error",
          error: speciesError,
          userMessage: SPECIES_ID_ERROR_MESSAGES[speciesError.code],
        });
        return undefined;
      }
    },
    [],
  );

  return {
    status: state.status,
    result: state.status === "success" ? state.result : undefined,
    error: state.status === "error" ? state.error : undefined,
    errorMessage: state.status === "error" ? state.userMessage : undefined,
    quotaRemaining: state.status === "success" ? state.result.quotaRemaining : null,
    identify,
    reset,
  };
}
