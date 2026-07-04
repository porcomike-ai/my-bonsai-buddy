import { vi, describe, test, expect, beforeEach } from "vitest";
import {
  deleteBonsai,
  saveBonsai,
  savePhoto,
  importSupabaseBackup,
  type SupabaseBackupPayload,
} from "./supabase-data";

// 1. On utilise vi.hoisted pour créer les fonctions mock avant même que le mock soit exécuté
const { mockStorageRemove, mockStorageUpload, mockFrom } = vi.hoisted(() => ({
  mockStorageRemove: vi.fn(),
  mockStorageUpload: vi.fn(),
  mockFrom: vi.fn(),
}));

// 2. On injecte ces fonctions dans le mock
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u1" } }, error: null }) },
    storage: {
      from: vi.fn(() => ({
        remove: mockStorageRemove,
        upload: mockStorageUpload,
      })),
    },
    from: mockFrom,
  },
}));

describe("Supabase Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Valeur par défaut : un upload réussit sauf si un test la surcharge.
    mockStorageUpload.mockResolvedValue({ error: null });
  });

  test("deleteBonsai: supprime les photos du Storage avant de supprimer le bonsaï", async () => {
    mockFrom.mockImplementation((table: string) => {
      if (table === "photos") {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockResolvedValue({ data: [{ storage_path: "test.jpg" }], error: null }),
        };
      }
      return { delete: vi.fn().mockReturnThis(), eq: vi.fn().mockResolvedValue({ error: null }) };
    });

    mockStorageRemove.mockResolvedValue({ error: null });

    await deleteBonsai("bonsai-1");

    expect(mockStorageRemove).toHaveBeenCalledWith(["test.jpg"]);
  });

  test("saveBonsai: rejette l'erreur si l'upsert BDD échoue", async () => {
    mockFrom.mockImplementation((table: string) => {
      if (table === "bonsais") {
        return { upsert: vi.fn().mockResolvedValue({ error: new Error("Erreur BDD fatale") }) };
      }
      return { select: vi.fn().mockReturnThis() };
    });

    const bonsaiMock = { id: "b1", nom: "Pin" } as any;
    await expect(saveBonsai(bonsaiMock)).rejects.toThrow("Erreur BDD fatale");
  });

  describe("savePhoto: upload Storage + insert BDD", () => {
    const photoMock = {
      id: "photo-1",
      bonsaiId: "bonsai-1",
      date: "2024-06-01",
      blob: new Blob(["fake-image-bytes"], { type: "image/jpeg" }),
    } as any;

    test("cas nominal : n'appelle jamais Storage.remove quand tout réussit", async () => {
      mockFrom.mockImplementation((table: string) => {
        if (table === "photos") {
          return { upsert: vi.fn().mockResolvedValue({ error: null }) };
        }
        return { select: vi.fn().mockReturnThis() };
      });

      const path = await savePhoto(photoMock);

      expect(mockStorageUpload).toHaveBeenCalledTimes(1);
      expect(path).toBe("u1/bonsai-1/photo-1.jpg");
      expect(mockStorageRemove).not.toHaveBeenCalled();
    });

    test("rollback : si l'upsert échoue après l'upload, le fichier est supprimé du Storage", async () => {
      mockFrom.mockImplementation((table: string) => {
        if (table === "photos") {
          return { upsert: vi.fn().mockResolvedValue({ error: new Error("Erreur BDD fatale") }) };
        }
        return { select: vi.fn().mockReturnThis() };
      });
      mockStorageRemove.mockResolvedValue({ error: null });

      await expect(savePhoto(photoMock)).rejects.toThrow("Erreur BDD fatale");

      // Le fichier uploadé (chemin déterminé par uid/bonsaiId/photoId.jpg) doit être
      // nettoyé du Storage pour éviter un fichier orphelin.
      expect(mockStorageUpload).toHaveBeenCalledTimes(1);
      expect(mockStorageRemove).toHaveBeenCalledWith(["u1/bonsai-1/photo-1.jpg"]);
    });

    test("si l'upload lui-même échoue, aucun rollback n'est tenté (rien n'a été créé)", async () => {
      mockStorageUpload.mockResolvedValue({ error: new Error("Storage indisponible") });
      mockFrom.mockImplementation(() => ({ upsert: vi.fn() }));

      await expect(savePhoto(photoMock)).rejects.toThrow("Storage indisponible");

      expect(mockStorageRemove).not.toHaveBeenCalled();
    });
  });

  test("importSupabaseBackup: ne plante pas avec un payload vide", async () => {
    mockFrom.mockReturnValue({
      upsert: vi.fn().mockResolvedValue({ error: null }),
    });

    const emptyPayload: SupabaseBackupPayload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      bonsais: [],
      poteries: [],
      photos: [],
      journal: [],
      rappels: [],
      evenements: [],
    };

    await expect(importSupabaseBackup(emptyPayload)).resolves.not.toThrow();
  });
});
