import { vi, describe, test, expect, beforeEach } from "vitest";
import { deleteBonsai, saveBonsai, importSupabaseBackup, type SupabaseBackupPayload } from "./supabase-data";

// 1. On utilise vi.hoisted pour créer les fonctions mock avant même que le mock soit exécuté
const { mockStorageRemove, mockFrom } = vi.hoisted(() => ({
  mockStorageRemove: vi.fn(),
  mockFrom: vi.fn(),
}));

// 2. On injecte ces fonctions dans le mock
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: "u1" } }, error: null }) },
    storage: {
      from: vi.fn(() => ({
        remove: mockStorageRemove,
        upload: vi.fn().mockResolvedValue({ error: null }),
      })),
    },
    from: mockFrom,
  },
}));

describe("Supabase Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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