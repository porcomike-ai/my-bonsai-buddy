import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";

const { mockIsolate, mockCompose } = vi.hoisted(() => ({
  mockIsolate: vi.fn(),
  mockCompose: vi.fn(),
}));

vi.mock("@/lib/ai-studio/background-removal", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ai-studio/background-removal")>(
    "@/lib/ai-studio/background-removal",
  );
  return {
    ...actual,
    isolateBonsaiImage: mockIsolate,
    composeBackground: mockCompose,
  };
});

import { usePhotoStudio } from "./use-photo-studio";
import { BackgroundRemovalFailure } from "@/lib/ai-studio/background-removal";

beforeEach(() => {
  mockIsolate.mockReset();
  mockCompose.mockReset();
});

describe("usePhotoStudio", () => {
  test("état initial : idle, sans résultat ni erreur", () => {
    const { result } = renderHook(() => usePhotoStudio());
    expect(result.current.status).toBe("idle");
    expect(result.current.result).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    expect(result.current.quotaRemaining).toBeNull();
  });

  test("passe par loading puis success avec le blob composé", async () => {
    const cutout = new Blob(["cutout"]);
    const composed = new Blob(["composed"]);
    mockIsolate.mockResolvedValue(cutout);
    mockCompose.mockResolvedValue(composed);

    const { result } = renderHook(() => usePhotoStudio());

    let returned: Blob | undefined;
    await act(async () => {
      returned = await result.current.process(new Blob(["original"]), { mode: "blur" });
    });

    expect(result.current.status).toBe("success");
    expect(result.current.result).toBe(composed);
    expect(returned).toBe(composed);
  });

  test("passe en erreur avec le message utilisateur correspondant au code", async () => {
    mockIsolate.mockRejectedValue(
      new BackgroundRemovalFailure({ code: "model_load_failed", message: "fetch échoué" }),
    );

    const { result } = renderHook(() => usePhotoStudio());

    await act(async () => {
      await result.current.process(new Blob(["original"]), { mode: "transparent" });
    });

    expect(result.current.status).toBe("error");
    expect(result.current.error?.code).toBe("model_load_failed");
    expect(result.current.errorMessage).toMatch(/téléchargé/);
  });

  test("une annulation volontaire repasse en idle plutôt qu'en erreur", async () => {
    mockIsolate.mockRejectedValue(
      new BackgroundRemovalFailure({ code: "cancelled", message: "annulé" }),
    );

    const { result } = renderHook(() => usePhotoStudio());

    await act(async () => {
      await result.current.process(new Blob(["original"]), { mode: "transparent" });
    });

    expect(result.current.status).toBe("idle");
    expect(result.current.error).toBeUndefined();
  });

  test("un second appel plus rapide fait ignorer le résultat du premier appel obsolète", async () => {
    let resolveFirst!: (b: Blob) => void;
    mockIsolate
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolveFirst = resolve;
          }),
      )
      .mockImplementationOnce(async () => new Blob(["cutout-2"]));
    mockCompose.mockImplementation(async (_orig: Blob, cutout: Blob) => cutout);

    const { result } = renderHook(() => usePhotoStudio());

    // Premier appel lancé mais jamais résolu avant le second. On utilise un
    // `act` synchrone (pas `await`) juste pour flusher le setState("loading")
    // immédiat déclenché par `process`, sans attendre sa résolution — on
    // veut volontairement le laisser en vol pendant le second appel.
    let firstCallPromise!: Promise<Blob | undefined>;
    act(() => {
      firstCallPromise = result.current.process(new Blob(["original-1"]), {
        mode: "transparent",
      });
    });

    await act(async () => {
      await result.current.process(new Blob(["original-2"]), { mode: "transparent" });
    });

    // Le premier appel se résout enfin, mais tardivement : son résultat doit être ignoré.
    let firstResult: Blob | undefined;
    await act(async () => {
      resolveFirst(new Blob(["cutout-1-tardif"]));
      firstResult = await firstCallPromise;
    });

    expect(firstResult).toBeUndefined();
    await waitFor(() => expect(result.current.status).toBe("success"));
    const text = await result.current.result?.text();
    expect(text).toBe("cutout-2");
  });
});
