import { describe, test, expect, vi, beforeEach } from "vitest";

const { mockGetPhotoBlob } = vi.hoisted(() => ({
  mockGetPhotoBlob: vi.fn(),
}));

vi.mock("./supabase-data", () => ({
  getPhotoBlob: mockGetPhotoBlob,
}));

import { getCachedPhotoBlob, invalidateCachedPhoto, clearPhotoCache } from "./photo-cache";

describe("photo-cache", () => {
  beforeEach(() => {
    clearPhotoCache();
    mockGetPhotoBlob.mockReset();
  });

  test("récupère bien le blob pour un chemin donné", async () => {
    const fakeBlob = new Blob(["a"]);
    mockGetPhotoBlob.mockResolvedValue(fakeBlob);

    const result = await getCachedPhotoBlob({ storagePath: "u/1/photo.jpg", poterieId: undefined });

    expect(result).toBe(fakeBlob);
    expect(mockGetPhotoBlob).toHaveBeenCalledTimes(1);
  });

  test("dédoublonne les appels concurrents pour le même chemin", async () => {
    let resolveBlob: (b: Blob) => void;
    mockGetPhotoBlob.mockReturnValue(
      new Promise((resolve) => {
        resolveBlob = resolve;
      }),
    );

    const photo = { storagePath: "u/2/photo.jpg", poterieId: undefined };
    const p1 = getCachedPhotoBlob(photo);
    const p2 = getCachedPhotoBlob(photo);

    // Un seul appel réseau doit avoir été déclenché malgré les deux demandes.
    expect(mockGetPhotoBlob).toHaveBeenCalledTimes(1);

    const fakeBlob = new Blob(["b"]);
    resolveBlob!(fakeBlob);
    const [r1, r2] = await Promise.all([p1, p2]);
    expect(r1).toBe(fakeBlob);
    expect(r2).toBe(fakeBlob);
  });

  test("réutilise le cache pour un deuxième appel une fois résolu", async () => {
    const fakeBlob = new Blob(["c"]);
    mockGetPhotoBlob.mockResolvedValue(fakeBlob);
    const photo = { storagePath: "u/3/photo.jpg", poterieId: undefined };

    await getCachedPhotoBlob(photo);
    await getCachedPhotoBlob(photo);

    expect(mockGetPhotoBlob).toHaveBeenCalledTimes(1);
  });

  test("des chemins différents ne partagent pas le cache", async () => {
    mockGetPhotoBlob.mockResolvedValue(new Blob(["d"]));

    await getCachedPhotoBlob({ storagePath: "u/4/a.jpg", poterieId: undefined });
    await getCachedPhotoBlob({ storagePath: "u/4/b.jpg", poterieId: undefined });

    expect(mockGetPhotoBlob).toHaveBeenCalledTimes(2);
  });

  test("invalidateCachedPhoto force un nouveau téléchargement au prochain appel", async () => {
    mockGetPhotoBlob.mockResolvedValue(new Blob(["e"]));
    const photo = { storagePath: "u/5/photo.jpg", poterieId: undefined };

    await getCachedPhotoBlob(photo);
    expect(mockGetPhotoBlob).toHaveBeenCalledTimes(1);

    invalidateCachedPhoto(photo.storagePath);

    await getCachedPhotoBlob(photo);
    expect(mockGetPhotoBlob).toHaveBeenCalledTimes(2);
  });

  test("un storagePath vide ne déclenche aucun appel réseau", async () => {
    const result = await getCachedPhotoBlob({ storagePath: "", poterieId: undefined });
    expect(result).toBeUndefined();
    expect(mockGetPhotoBlob).not.toHaveBeenCalled();
  });
});
