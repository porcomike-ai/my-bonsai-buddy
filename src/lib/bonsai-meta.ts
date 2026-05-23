import type { BonsaiStyle, SoinType } from "./db";

export const STYLES: { value: BonsaiStyle; label: string }[] = [
  { value: "chokkan", label: "Chokkan — droit formel" },
  { value: "moyogi", label: "Moyogi — droit informel" },
  { value: "shakan", label: "Shakan — incliné" },
  { value: "kengai", label: "Kengai — cascade" },
  { value: "han-kengai", label: "Han-kengai — semi-cascade" },
  { value: "bunjin", label: "Bunjin — lettré" },
  { value: "yose-ue", label: "Yose-ue — forêt" },
  { value: "ishitsuki", label: "Ishitsuki — sur roche" },
  { value: "autre", label: "Autre" },
];

export const SOINS: { value: SoinType; label: string; emoji: string }[] = [
  { value: "arrosage", label: "Arrosage", emoji: "💧" },
  { value: "taille", label: "Taille", emoji: "✂️" },
  { value: "rempotage", label: "Rempotage", emoji: "🪴" },
  { value: "fertilisation", label: "Fertilisation", emoji: "🌱" },
  { value: "traitement", label: "Traitement", emoji: "🧪" },
  { value: "ligature", label: "Ligature", emoji: "🧵" },
  { value: "autre", label: "Autre", emoji: "•" },
];

export function styleLabel(s: BonsaiStyle) {
  return STYLES.find((x) => x.value === s)?.label ?? s;
}
export function soinLabel(s: SoinType) {
  return SOINS.find((x) => x.value === s)?.label ?? s;
}
export function soinEmoji(s: SoinType) {
  return SOINS.find((x) => x.value === s)?.emoji ?? "•";
}
