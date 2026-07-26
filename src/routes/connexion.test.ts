import { describe, it, expect } from "vitest";
import { isSafeRedirect } from "./connexion";

describe("isSafeRedirect", () => {
  it("accepte les chemins internes normaux", () => {
    expect(isSafeRedirect("/")).toBe(true);
    expect(isSafeRedirect("/collection")).toBe(true);
    expect(isSafeRedirect("/bonsai/123?tab=galerie")).toBe(true);
  });

  it("rejette le contournement par backslash (open redirect confirmé)", () => {
    // Régression : les navigateurs normalisent "\" en "/" dans une URL
    // relative, donc "/\evil.com" devient "//evil.com" une fois résolu —
    // une redirection protocole-relative vers un domaine externe.
    expect(isSafeRedirect("/\\evil.com?x=1")).toBe(false);
    expect(isSafeRedirect("/\\\\evil.com")).toBe(false);
  });

  it("rejette une URL protocole-relative directe", () => {
    expect(isSafeRedirect("//evil.com")).toBe(false);
  });

  it("rejette tout ce qui ne commence pas par un seul \"/\"", () => {
    expect(isSafeRedirect("https://evil.com")).toBe(false);
    expect(isSafeRedirect("evil.com")).toBe(false);
    expect(isSafeRedirect("")).toBe(false);
  });
});
