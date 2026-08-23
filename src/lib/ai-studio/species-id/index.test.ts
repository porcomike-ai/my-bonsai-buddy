import { describe, test, expect, vi, beforeEach } from "vitest";

const { mockInvoke } = vi.hoisted(() => ({ mockInvoke: vi.fn() }));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: { functions: { invoke: mockInvoke } },
}));

import { identifySpecies, SpeciesIdFailure } from "./index";

beforeEach(() => {
  mockInvoke.mockReset();
});

describe("identifySpecies", () => {
  test("renvoie les candidats et le quota restant en cas de succès", async () => {
    mockInvoke.mockResolvedValue({
      data: {
        results: [
          {
            scientificName: "Pinus thunbergii",
            commonNames: ["Pin noir du Japon"],
            confidence: 0.87,
          },
        ],
        quotaRemaining: 399,
      },
      error: null,
    });

    const result = await identifySpecies(new Blob(["photo"]), "leaf");

    expect(result.candidates).toHaveLength(1);
    expect(result.candidates[0].scientificName).toBe("Pinus thunbergii");
    expect(result.quotaRemaining).toBe(399);

    // Vérifie que l'organe et le champ image sont bien transmis en FormData.
    const [name, options] = mockInvoke.mock.calls[0];
    expect(name).toBe("identify-species");
    expect(options.body).toBeInstanceOf(FormData);
    expect((options.body as FormData).get("organ")).toBe("leaf");
  });

  test("lève no_match quand l'Edge Function renvoie ce code (statut 200)", async () => {
    mockInvoke.mockResolvedValue({
      data: { code: "no_match", error: "Aucune espèce identifiée", quotaRemaining: 398 },
      error: null,
    });

    await expect(identifySpecies(new Blob(["photo"]))).rejects.toMatchObject({
      cause_: { code: "no_match" },
    });
  });

  test("lève quota_exceeded en lisant le contexte JSON d'une erreur 429", async () => {
    const context = {
      status: 429,
      clone: () => ({
        json: async () => ({ error: "Quota atteint", code: "quota_exceeded", quotaRemaining: 0 }),
      }),
    } as unknown as Response;
    mockInvoke.mockResolvedValue({
      data: null,
      error: { message: "edge function error", context },
    });

    await expect(identifySpecies(new Blob(["photo"]))).rejects.toBeInstanceOf(SpeciesIdFailure);
    await expect(identifySpecies(new Blob(["photo"]))).rejects.toMatchObject({
      cause_: { code: "quota_exceeded" },
    });
  });

  test("retombe sur une classification par message si le contexte n'est pas du JSON exploitable", async () => {
    const context = {
      status: 500,
      clone: () => ({
        json: async () => {
          throw new Error("not json");
        },
      }),
    } as unknown as Response;
    mockInvoke.mockResolvedValue({
      data: null,
      error: { message: "Failed to fetch", context },
    });

    await expect(identifySpecies(new Blob(["photo"]))).rejects.toMatchObject({
      cause_: { code: "network_failed" },
    });
  });

  test("gère une erreur sans contexte (pas de FunctionsHttpError)", async () => {
    mockInvoke.mockResolvedValue({ data: null, error: new Error("réseau down") });

    await expect(identifySpecies(new Blob(["photo"]))).rejects.toMatchObject({
      cause_: { code: "unexpected_error" },
    });
  });
});
