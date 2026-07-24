import { describe, test, expect } from "vitest";
import { SOINS, SOINS_SELECTABLE, soinLabel, soinEmoji } from "./bonsai-meta";

// Ces deux valeurs sont utilisées telles quelles par unified-timeline.tsx /
// journal-entry-dialog.tsx pour déclencher la sortie de collection
// (isCollectionExit). Si l'un de ces tests casse, ne renomme JAMAIS ces
// valeurs pour le faire passer — corrige plutôt l'endroit qui a changé.
const VALEURS_SORTIE_COLLECTION = ["mort", "don_vente"] as const;

describe("bonsai-meta — types d'événements", () => {
  test("SOINS_SELECTABLE contient exactement les 13 nouveaux types", () => {
    expect(SOINS_SELECTABLE).toHaveLength(13);
  });

  test("SOINS_SELECTABLE ne propose pas les anciens types (historique uniquement)", () => {
    const anciens = ["arrosage", "taille", "fertilisation", "traitement", "ligature"];
    const valeursSelectionnables = SOINS_SELECTABLE.map((s) => s.value);
    for (const ancien of anciens) {
      expect(valeursSelectionnables).not.toContain(ancien);
    }
  });

  test.each(VALEURS_SORTIE_COLLECTION)(
    "la valeur technique %s existe bien dans SOINS_SELECTABLE, inchangée",
    (valeur) => {
      const entree = SOINS_SELECTABLE.find((s) => s.value === valeur);
      expect(entree).toBeDefined();
    },
  );

  test("don_vente s'affiche bien sous le libellé « Vendu/don »", () => {
    expect(soinLabel("don_vente")).toBe("Vendu/don");
  });

  test("soinLabel/soinEmoji résolvent toujours les anciens types (historique)", () => {
    expect(soinLabel("arrosage")).toBe("Arrosage");
    expect(soinEmoji("arrosage")).toBe("💧");
    expect(soinLabel("ligature")).toBe("Ligature");
  });

  test("soinLabel retombe sur la valeur brute pour un type totalement inconnu", () => {
    // @ts-expect-error - valeur volontairement hors du type SoinType, pour tester le repli
    expect(soinLabel("valeur-inexistante")).toBe("valeur-inexistante");
  });

  test("soinEmoji retombe sur un point neutre pour un type totalement inconnu", () => {
    // @ts-expect-error - valeur volontairement hors du type SoinType, pour tester le repli
    expect(soinEmoji("valeur-inexistante")).toBe("•");
  });

  test("chaque entrée de SOINS a un libellé et un emoji non vides", () => {
    for (const s of SOINS) {
      expect(s.label.length).toBeGreaterThan(0);
      expect(s.emoji.length).toBeGreaterThan(0);
    }
  });
});
