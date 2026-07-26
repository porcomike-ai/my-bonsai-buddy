import { describe, it, expect } from "vitest";
import { folderNameError, sanitizeForFilesystem } from "./folder-name";

describe("sanitizeForFilesystem", () => {
  it("remplace TOUS les caractères interdits, pas seulement le premier", () => {
    // Régression : avant le correctif du 25/07/2026, la regex non-globale
    // utilisée par .replace() ne remplaçait que la première occurrence,
    // laissant ":" et "*" intacts ci-dessous.
    expect(sanitizeForFilesystem('A/B:C*D?E"F<G>H|I')).toBe("A-B-C-D-E-F-G-H-I");
  });

  it("retire tous les caractères de contrôle, pas seulement le premier", () => {
    expect(sanitizeForFilesystem("A\x01B\x02C")).toBe("ABC");
  });

  it("laisse un nom déjà valide inchangé", () => {
    expect(sanitizeForFilesystem("Erable du Japon")).toBe("Erable du Japon");
  });

  it("retombe sur un nom par défaut si tout est supprimé", () => {
    expect(sanitizeForFilesystem("\x01\x02\x03")).toBe("sans-nom");
  });
});

describe("folderNameError", () => {
  it("refuse un nom contenant plusieurs caractères interdits", () => {
    expect(folderNameError("A/B:C")).not.toBeNull();
  });

  it("accepte un nom valide", () => {
    expect(folderNameError("Erable du Japon")).toBeNull();
  });
});
