import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

const { mockIdentify } = vi.hoisted(() => ({ mockIdentify: vi.fn() }));

vi.mock("@/lib/ai-studio/species-id", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ai-studio/species-id")>(
    "@/lib/ai-studio/species-id",
  );
  return { ...actual, identifySpecies: mockIdentify };
});

import { useSpeciesId } from "./use-species-id";
import { SpeciesIdFailure } from "@/lib/ai-studio/species-id";

beforeEach(() => {
  mockIdentify.mockReset();
});

describe("useSpeciesId", () => {
  test("état initial : idle, quota null", () => {
    const { result } = renderHook(() => useSpeciesId());
    expect(result.current.status).toBe("idle");
    expect(result.current.quotaRemaining).toBeNull();
  });

  test("succès : expose les candidats et le quota restant", async () => {
    mockIdentify.mockResolvedValue({
      candidates: [{ scientificName: "Pinus thunbergii", commonNames: [], confidence: 0.9 }],
      quotaRemaining: 397,
    });

    const { result } = renderHook(() => useSpeciesId());
    await act(async () => {
      await result.current.identify(new Blob(["photo"]));
    });

    expect(result.current.status).toBe("success");
    expect(result.current.result?.candidates).toHaveLength(1);
    expect(result.current.quotaRemaining).toBe(397);
  });

  test("quota_exceeded : expose le message utilisateur correspondant", async () => {
    mockIdentify.mockRejectedValue(
      new SpeciesIdFailure({ code: "quota_exceeded", message: "429" }),
    );

    const { result } = renderHook(() => useSpeciesId());
    await act(async () => {
      await result.current.identify(new Blob(["photo"]));
    });

    expect(result.current.status).toBe("error");
    expect(result.current.error?.code).toBe("quota_exceeded");
    expect(result.current.errorMessage).toMatch(/Quota quotidien/);
  });

  test("un second appel plus rapide fait ignorer le résultat obsolète du premier", async () => {
    let resolveFirst!: (v: unknown) => void;
    mockIdentify
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolveFirst = resolve;
          }),
      )
      .mockImplementationOnce(async () => ({
        candidates: [{ scientificName: "Second", commonNames: [], confidence: 0.5 }],
        quotaRemaining: 100,
      }));

    const { result } = renderHook(() => useSpeciesId());

    let firstPromise!: Promise<unknown>;
    act(() => {
      firstPromise = result.current.identify(new Blob(["a"]));
    });

    await act(async () => {
      await result.current.identify(new Blob(["b"]));
    });

    await act(async () => {
      resolveFirst({ candidates: [], quotaRemaining: 999 });
      await firstPromise;
    });

    expect(result.current.result?.candidates[0]?.scientificName).toBe("Second");
    expect(result.current.quotaRemaining).toBe(100);
  });

  test("reset() repasse le hook en idle", async () => {
    mockIdentify.mockResolvedValue({ candidates: [], quotaRemaining: 400 });
    const { result } = renderHook(() => useSpeciesId());

    await act(async () => {
      await result.current.identify(new Blob(["photo"]));
    });
    expect(result.current.status).toBe("success");

    act(() => result.current.reset());
    expect(result.current.status).toBe("idle");
  });
});
