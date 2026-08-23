import type { AiModuleDescriptor } from "./types";

/**
 * Registre central des modules du Studio IA. Aucune logique métier ici —
 * juste la liste des modules et leur statut, pour que l'UI (onglets actifs
 * vs grisés) et une future page de réglages ("désactiver tel module IA")
 * lisent une seule source de vérité plutôt que des booléens éparpillés.
 *
 * "species-id" et "health-diagnostic" sont volontairement listés sans
 * implémentation : ça matérialise l'extensibilité prévue sans figer un choix
 * d'API avant d'avoir tranché (voir conversation : Pl@ntNet pour l'espèce,
 * Gemini free tier pour la santé, tous deux à quota gratuit journalier).
 */
export const AI_STUDIO_MODULES: readonly AiModuleDescriptor[] = [
  {
    id: "background-removal",
    label: "Fond (détourage, couleur, flou)",
    availability: "client",
    isFree: true,
  },
  {
    id: "species-id",
    label: "Identification d'espèce",
    availability: "api-quota",
    isFree: true, // Pl@ntNet : gratuit jusqu'à 500 requêtes/jour (marge prise à 400 côté Edge Function).
  },
  {
    id: "health-diagnostic",
    label: "Diagnostic santé",
    availability: "planned",
    isFree: true, // Gemini Flash free tier : gratuit avec quota journalier, à intégrer plus tard.
  },
] as const;

export function getAiModule(id: string): AiModuleDescriptor | undefined {
  return AI_STUDIO_MODULES.find((m) => m.id === id);
}
