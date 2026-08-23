import { describe, expect, test } from "vitest";
import { toSpeciesIdError } from "./errors";

describe("toSpeciesIdError", () => {
  test("un statut HTTP 429 est toujours classé quota_exceeded", () => {
    expect(toSpeciesIdError({ code: "unexpected_error" }, 429).code).toBe("quota_exceeded");
  });

  test("reprend le code renvoyé par l'Edge Function quand il est reconnu", () => {
    expect(toSpeciesIdError({ code: "no_match", error: "Aucune espèce" }).code).toBe("no_match");
    expect(toSpeciesIdError({ code: "not_configured", error: "manquant" }).code).toBe(
      "not_configured",
    );
    expect(toSpeciesIdError({ code: "invalid_image", error: "mauvais format" }).code).toBe(
      "invalid_image",
    );
  });

  test("reconnaît les codes propres à l'Edge Function identify-species", () => {
    expect(toSpeciesIdError({ code: "unauthorized", error: "Missing token" }).code).toBe(
      "unauthorized",
    );
    expect(toSpeciesIdError({ code: "quota_check_failed", error: "table manquante" }).code).toBe(
      "quota_check_failed",
    );
    expect(toSpeciesIdError({ code: "provider_failed", error: "Pl@ntNet 502" }).code).toBe(
      "provider_failed",
    );
  });

  test("ignore un code non reconnu et retombe sur une classification par message", () => {
    expect(toSpeciesIdError({ code: "some_unknown_code", error: "fetch failed" }).code).toBe(
      "network_failed",
    );
  });

  test("classe une erreur réseau/fetch en network_failed", () => {
    expect(toSpeciesIdError(new Error("Failed to fetch")).code).toBe("network_failed");
  });

  test("retombe sur unexpected_error pour toute autre erreur", () => {
    expect(toSpeciesIdError(new Error("boom")).code).toBe("unexpected_error");
  });
});
