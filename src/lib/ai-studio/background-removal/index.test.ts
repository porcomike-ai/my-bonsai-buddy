import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

const { mockRemoveBackground } = vi.hoisted(() => ({
  mockRemoveBackground: vi.fn(),
}));

vi.mock("@imgly/background-removal", () => ({
  removeBackground: mockRemoveBackground,
}));

import { isolateBonsaiImage, composeBackground, BackgroundRemovalFailure } from "./index";

function fakeBitmap(width = 100, height = 80) {
  return { width, height, close: vi.fn() } as unknown as ImageBitmap;
}

/** Installe un mock minimal de canvas 2D (fillRect/drawImage/filter/toBlob). */
function mockCanvas(options: { getContextReturnsNull?: boolean; toBlobReturnsNull?: boolean } = {}) {
  const ctx = {
    fillStyle: "",
    filter: "none",
    fillRect: vi.fn(),
    drawImage: vi.fn(),
  };
  const canvas = {
    width: 0,
    height: 0,
    getContext: vi.fn(() => (options.getContextReturnsNull ? null : ctx)),
    toBlob: vi.fn((cb: (b: Blob | null) => void) => {
      cb(options.toBlobReturnsNull ? null : new Blob(["résultat"], { type: "image/jpeg" }));
    }),
  };
  const realCreateElement = document.createElement.bind(document);
  vi.spyOn(document, "createElement").mockImplementation((tag: string) =>
    tag === "canvas" ? (canvas as unknown as HTMLCanvasElement) : realCreateElement(tag),
  );
  return { ctx, canvas };
}

beforeEach(() => {
  mockRemoveBackground.mockReset();
  vi.stubGlobal(
    "createImageBitmap",
    vi.fn(async () => fakeBitmap()),
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("isolateBonsaiImage", () => {
  test("renvoie le blob détouré en cas de succès", async () => {
    const cutout = new Blob(["cutout"]);
    mockRemoveBackground.mockResolvedValue(cutout);

    const result = await isolateBonsaiImage(new Blob(["original"]));

    expect(result).toBe(cutout);
  });

  test("propage une BackgroundRemovalFailure classée en cas d'échec réseau", async () => {
    mockRemoveBackground.mockRejectedValue(new Error("Failed to fetch model"));

    await expect(isolateBonsaiImage(new Blob(["original"]))).rejects.toMatchObject({
      cause_: { code: "model_load_failed" },
    });
  });

  test("rejette immédiatement avec 'cancelled' si le signal est déjà aborted", async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(
      isolateBonsaiImage(new Blob(["original"]), controller.signal),
    ).rejects.toMatchObject({ cause_: { code: "cancelled" } });
    expect(mockRemoveBackground).not.toHaveBeenCalled();
  });

  test("rejette avec 'cancelled' si le signal s'annule pendant le traitement", async () => {
    const controller = new AbortController();
    let resolveRemoval: (b: Blob) => void;
    mockRemoveBackground.mockReturnValue(
      new Promise((resolve) => {
        resolveRemoval = resolve;
      }),
    );

    const promise = isolateBonsaiImage(new Blob(["original"]), controller.signal);
    controller.abort();

    await expect(promise).rejects.toMatchObject({ cause_: { code: "cancelled" } });
    resolveRemoval!(new Blob(["trop tard"])); // ne doit plus rien affecter
  });
});

describe("composeBackground", () => {
  test("mode transparent : renvoie le détourage tel quel, sans toucher au canvas", async () => {
    const cutout = new Blob(["cutout"]);
    const createElementSpy = vi.spyOn(document, "createElement");

    const result = await composeBackground(new Blob(["original"]), cutout, {
      mode: "transparent",
    });

    expect(result).toBe(cutout);
    expect(createElementSpy).not.toHaveBeenCalledWith("canvas");
  });

  test("mode color : remplit le fond de la couleur choisie avant de dessiner le détourage", async () => {
    const { ctx } = mockCanvas();

    await composeBackground(new Blob(["original"]), new Blob(["cutout"]), {
      mode: "color",
      color: "#123456",
    });

    expect(ctx.fillStyle).toBe("#123456");
    expect(ctx.fillRect).toHaveBeenCalledTimes(1);
    expect(ctx.drawImage).toHaveBeenCalledTimes(1); // seul le détourage est dessiné
  });

  test("mode blur : dessine l'original flouté puis le détourage net par-dessus", async () => {
    const { ctx } = mockCanvas();

    await composeBackground(new Blob(["original"]), new Blob(["cutout"]), {
      mode: "blur",
      blurAmount: 20,
    });

    expect(ctx.drawImage).toHaveBeenCalledTimes(2); // original flouté + détourage net
    expect(ctx.filter).toBe("none"); // réinitialisé après le dessin de l'original
  });

  test("lève canvas_unavailable si getContext('2d') renvoie null", async () => {
    mockCanvas({ getContextReturnsNull: true });

    await expect(
      composeBackground(new Blob(["original"]), new Blob(["cutout"]), { mode: "color" }),
    ).rejects.toMatchObject({ cause_: { code: "canvas_unavailable" } });
  });

  test("lève processing_failed si canvas.toBlob() renvoie null", async () => {
    mockCanvas({ toBlobReturnsNull: true });

    await expect(
      composeBackground(new Blob(["original"]), new Blob(["cutout"]), { mode: "color" }),
    ).rejects.toMatchObject({ cause_: { code: "processing_failed" } });
  });

  test("propage une erreur classée si createImageBitmap échoue", async () => {
    vi.stubGlobal(
      "createImageBitmap",
      vi.fn(async () => {
        throw new Error("Unsupported image format");
      }),
    );

    await expect(
      composeBackground(new Blob(["original"]), new Blob(["cutout"]), { mode: "color" }),
    ).rejects.toMatchObject({ cause_: { code: "unsupported_format" } });
  });
});

// Vérifie que BackgroundRemovalFailure reste bien une Error exploitable (stack, instanceof).
describe("BackgroundRemovalFailure", () => {
  test("est une instance d'Error avec le message technique du code d'erreur", () => {
    const failure = new BackgroundRemovalFailure({ code: "processing_failed", message: "boom" });
    expect(failure).toBeInstanceOf(Error);
    expect(failure.message).toBe("boom");
    expect(failure.cause_.code).toBe("processing_failed");
  });
});
