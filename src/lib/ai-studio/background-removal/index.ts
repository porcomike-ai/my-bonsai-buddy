import { removeBackground } from "@imgly/background-removal";
import { toBackgroundRemovalError, type BackgroundRemovalError } from "./errors";

export type { BackgroundRemovalError, BackgroundRemovalErrorCode } from "./errors";
export { BACKGROUND_REMOVAL_ERROR_MESSAGES } from "./errors";

export type BackgroundMode = "transparent" | "color" | "blur";

export interface BackgroundEditOptions {
  mode: BackgroundMode;
  /** Couleur hex (ex. '#f4f1ea'), utilisée si mode === 'color'. */
  color?: string;
  /** Rayon de flou en pixels, utilisé si mode === 'blur'. */
  blurAmount?: number;
}

export class BackgroundRemovalFailure extends Error {
  readonly cause_: BackgroundRemovalError;
  constructor(error: BackgroundRemovalError) {
    super(error.message);
    this.name = "BackgroundRemovalFailure";
    this.cause_ = error;
  }
}

/**
 * Détoure une image (fond → transparent). 100% local : la librairie
 * @imgly/background-removal proxifie déjà le calcul vers un Web Worker
 * interne par défaut (option `proxyToWorker`, activée par défaut) — il ne
 * faut donc PAS l'envelopper dans un second Worker maison : ça ajouterait de
 * la complexité de bundling (résolution des assets WASM dans un worker
 * imbriqué) sans aucun bénéfice, le vrai calcul étant déjà hors du thread
 * principal.
 *
 * Le modèle (~quelques dizaines de Mo) est téléchargé au premier appel puis
 * mis en cache par le navigateur (Cache Storage géré par la librairie elle-
 * même) — les appels suivants sont nettement plus rapides.
 *
 * `signal` permet d'annuler un traitement en cours (ex. fermeture du dialog) :
 * la promesse de removeBackground elle-même n'est pas annulable côté
 * librairie, donc on résout la course entre le résultat et l'annulation —
 * le calcul continue en arrière-plan jusqu'à son terme mais son résultat est
 * ignoré, ce qui est le comportement attendu pour ce cas d'usage (aucune
 * fuite mémoire critique, juste un calcul dont le résultat n'est pas exploité).
 */
export async function isolateBonsaiImage(
  imageSource: Blob,
  signal?: AbortSignal,
): Promise<Blob> {
  if (signal?.aborted) {
    throw new BackgroundRemovalFailure({ code: "cancelled", message: "Annulé avant démarrage" });
  }

  const removalPromise = removeBackground(imageSource).catch((err) => {
    throw new BackgroundRemovalFailure(toBackgroundRemovalError(err));
  });

  if (!signal) return removalPromise;

  const abortPromise = new Promise<never>((_, reject) => {
    signal.addEventListener(
      "abort",
      () => reject(new BackgroundRemovalFailure({ code: "cancelled", message: "Annulé par l'utilisateur" })),
      { once: true },
    );
  });

  return Promise.race([removalPromise, abortPromise]);
}

/**
 * Recompose le fond d'une photo à partir de l'image d'origine et de son
 * détourage (canal alpha). Pur Canvas 2D, aucun appel réseau.
 *
 * - "transparent" : renvoie le détourage tel quel.
 * - "color"       : remplit le canvas de `color` puis dessine le détourage par-dessus.
 * - "blur"        : dessine l'original flouté en arrière-plan, puis le détourage
 *                   net par-dessus (le sujet reste net, le fond devient flou).
 */
export async function composeBackground(
  originalImage: Blob,
  cutoutBlob: Blob,
  options: BackgroundEditOptions,
): Promise<Blob> {
  if (options.mode === "transparent") return cutoutBlob;

  let originalBitmap: ImageBitmap;
  let cutoutBitmap: ImageBitmap;
  try {
    [originalBitmap, cutoutBitmap] = await Promise.all([
      createImageBitmap(originalImage),
      createImageBitmap(cutoutBlob),
    ]);
  } catch (err) {
    throw new BackgroundRemovalFailure(toBackgroundRemovalError(err));
  }

  const canvas = document.createElement("canvas");
  canvas.width = originalBitmap.width;
  canvas.height = originalBitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new BackgroundRemovalFailure({
      code: "canvas_unavailable",
      message: "canvas.getContext('2d') a renvoyé null",
    });
  }

  if (options.mode === "color") {
    ctx.fillStyle = options.color ?? "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(cutoutBitmap, 0, 0);
  } else {
    // mode "blur"
    ctx.filter = `blur(${options.blurAmount ?? 12}px)`;
    ctx.drawImage(originalBitmap, 0, 0, canvas.width, canvas.height);
    ctx.filter = "none";
    ctx.drawImage(cutoutBitmap, 0, 0);
  }

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else
          reject(
            new BackgroundRemovalFailure({
              code: "processing_failed",
              message: "canvas.toBlob() a renvoyé null",
            }),
          );
      },
      "image/jpeg",
      0.9,
    );
  });
}
