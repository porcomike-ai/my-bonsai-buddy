import { useCallback, useEffect, useRef, useState } from "react";
import {
  isolateBonsaiImage,
  composeBackground,
  BackgroundRemovalFailure,
  BACKGROUND_REMOVAL_ERROR_MESSAGES,
  type BackgroundEditOptions,
  type BackgroundRemovalError,
} from "@/lib/ai-studio/background-removal";

type PhotoStudioState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; result: Blob }
  | { status: "error"; error: BackgroundRemovalError; userMessage: string };

// Bolt.new (WebContainer) restreint certaines requêtes réseau externes dans
// son aperçu — le téléchargement du modèle de détourage (hébergé sur le CDN
// d'IMG.LY) peut alors rester bloqué indéfiniment sans jamais rejeter ni
// résoudre. Un timeout matériel garantit que l'UI ne reste jamais figée,
// indépendamment de la cause exacte du blocage réseau.
const PROCESS_TIMEOUT_MS = 45_000;

function timeoutAfter(ms: number, controller: AbortController): Promise<never> {
  return new Promise((_, reject) => {
    const timer = setTimeout(() => {
      // On rejette d'abord avec notre propre erreur "timeout", puis on
      // déclenche l'abort ensuite : ça garantit que le Promise.race externe
      // se résout avec le message "timeout" plutôt qu'avec le "cancelled"
      // interne à isolateBonsaiImage (qui écoute le même signal et
      // rejetterait sinon en premier, masquant la vraie cause).
      reject(new BackgroundRemovalFailure({ code: "timeout", message: `Timeout après ${ms}ms` }));
      controller.abort();
    }, ms);
    controller.signal.addEventListener("abort", () => clearTimeout(timer), { once: true });
  });
}

/**
 * Pilote le module de détourage/fond depuis un composant React.
 *
 * Forme volontairement générique (nom, forme de l'état) pour que les futurs
 * modules à quota (espèce, santé) puissent réutiliser le même contrat plutôt
 * que d'introduire un hook différent par module : `quotaRemaining` est déjà
 * présent dans la valeur retournée, toujours `null` ici puisque le détourage
 * est local et illimité — les modules futurs le rempliront sans que l'UI qui
 * consomme ce hook ait à changer.
 *
 * Gère aussi l'annulation propre : si le composant se démonte pendant un
 * traitement en cours, on ne fait ni `setState` sur un composant démonté, ni
 * ne laisse un résultat obsolète s'appliquer après un nouvel appel.
 */
export function usePhotoStudio() {
  const [state, setState] = useState<PhotoStudioState>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);
  // Incrémenté à chaque nouvel appel : permet d'ignorer le résultat d'un
  // appel devenu obsolète (l'utilisateur a relancé un traitement avant que
  // le précédent ne se termine) sans dépendre uniquement de l'AbortController.
  const callIdRef = useRef(0);

  useEffect(
    () => () => {
      mountedRef.current = false;
      abortRef.current?.abort();
    },
    [],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setState({ status: "idle" });
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const process = useCallback(
    async (originalBlob: Blob, options: BackgroundEditOptions): Promise<Blob | undefined> => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const callId = ++callIdRef.current;

      setState({ status: "loading" });

      try {
        const cutout = await Promise.race([
          isolateBonsaiImage(originalBlob, controller.signal),
          timeoutAfter(PROCESS_TIMEOUT_MS, controller),
        ]);
        const result = await composeBackground(originalBlob, cutout, options);

        if (!mountedRef.current || callIdRef.current !== callId) return undefined;
        setState({ status: "success", result });
        return result;
      } catch (err) {
        if (!mountedRef.current || callIdRef.current !== callId) return undefined;

        const bgError: BackgroundRemovalError =
          err instanceof BackgroundRemovalFailure
            ? err.cause_
            : {
                code: "processing_failed",
                message: err instanceof Error ? err.message : String(err),
              };

        // Une annulation volontaire ne doit pas s'afficher comme une erreur
        // à l'utilisateur : on repasse simplement à l'état idle.
        if (bgError.code === "cancelled") {
          setState({ status: "idle" });
          return undefined;
        }

        setState({
          status: "error",
          error: bgError,
          userMessage: BACKGROUND_REMOVAL_ERROR_MESSAGES[bgError.code],
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
    /** Toujours `null` pour ce module (local, illimité). Réservé aux futurs modules à quota. */
    quotaRemaining: null as number | null,
    process,
    cancel,
    reset,
  };
}
