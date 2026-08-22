import { describe, expect, test } from "vitest";
import { toBackgroundRemovalError } from "./errors";

describe("toBackgroundRemovalError", () => {
  test("classe une erreur réseau/fetch en model_load_failed", () => {
    expect(toBackgroundRemovalError(new Error("Failed to fetch")).code).toBe(
      "model_load_failed",
    );
    expect(toBackgroundRemovalError(new Error("Network error occurred")).code).toBe(
      "model_load_failed",
    );
  });

  test("classe une erreur de décodage/format en unsupported_format", () => {
    expect(toBackgroundRemovalError(new Error("Could not decode image")).code).toBe(
      "unsupported_format",
    );
    expect(toBackgroundRemovalError(new Error("Unsupported image format")).code).toBe(
      "unsupported_format",
    );
  });

  test("retombe sur processing_failed pour toute autre erreur", () => {
    expect(toBackgroundRemovalError(new Error("Something unexpected")).code).toBe(
      "processing_failed",
    );
  });

  test("gère les erreurs non-Error (string, undefined)", () => {
    expect(toBackgroundRemovalError("network down").code).toBe("model_load_failed");
    expect(toBackgroundRemovalError(undefined).message).toBe("undefined");
  });
});
