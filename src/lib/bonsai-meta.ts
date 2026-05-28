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

export interface Espece {
  latin: string;
  fr: string;
}

// Principales espèces utilisées en bonsaï (intérieur, extérieur, feuillus, conifères)
export const ESPECES: Espece[] = [
  { latin: "Acer buergerianum", fr: "Érable trident" },
  { latin: "Acer palmatum", fr: "Érable du Japon" },
  { latin: "Carmona retusa", fr: "Arbre à thé de Fukien" },
  { latin: "Carpinus betulus", fr: "Charme commun" },
  { latin: "Carpinus turczaninovii", fr: "Charme coréen" },
  { latin: "Celtis sinensis", fr: "Micocoulier de Chine" },
  { latin: "Chaenomeles japonica", fr: "Cognassier du Japon" },
  { latin: "Cotoneaster horizontalis", fr: "Cotonéaster rampant" },
  { latin: "Crassula ovata", fr: "Arbre de jade" },
  { latin: "Crataegus monogyna", fr: "Aubépine" },
  { latin: "Cryptomeria japonica", fr: "Cèdre du Japon" },
  { latin: "Cupressus macrocarpa", fr: "Cyprès de Monterey" },
  { latin: "Diospyros kaki", fr: "Plaqueminier (kaki)" },
  { latin: "Fagus sylvatica", fr: "Hêtre commun" },
  { latin: "Ficus retusa", fr: "Ficus ginseng" },
  { latin: "Ficus benjamina", fr: "Ficus pleureur" },
  { latin: "Ginkgo biloba", fr: "Ginkgo" },
  { latin: "Ilex crenata", fr: "Houx crénelé" },
  { latin: "Juniperus chinensis", fr: "Genévrier de Chine" },
  { latin: "Juniperus procumbens", fr: "Genévrier rampant" },
  { latin: "Juniperus rigida", fr: "Genévrier rigide" },
  { latin: "Lagerstroemia indica", fr: "Lilas des Indes" },
  { latin: "Larix decidua", fr: "Mélèze d'Europe" },
  { latin: "Ligustrum sinense", fr: "Troène de Chine" },
  { latin: "Malus sp.", fr: "Pommier d'ornement" },
  { latin: "Morus alba", fr: "Mûrier blanc" },
  { latin: "Olea europaea", fr: "Olivier" },
  { latin: "Picea abies", fr: "Épicéa commun" },
  { latin: "Picea glauca", fr: "Épicéa blanc" },
  { latin: "Pinus mugo", fr: "Pin des montagnes" },
  { latin: "Pinus parviflora", fr: "Pin blanc du Japon" },
  { latin: "Pinus sylvestris", fr: "Pin sylvestre" },
  { latin: "Pinus thunbergii", fr: "Pin noir du Japon" },
  { latin: "Pistacia lentiscus", fr: "Lentisque" },
  { latin: "Pithecellobium tortum", fr: "Brésilien (Pithecellobium)" },
  { latin: "Prunus mume", fr: "Abricotier du Japon" },
  { latin: "Punica granatum", fr: "Grenadier" },
  { latin: "Pyracantha sp.", fr: "Buisson ardent" },
  { latin: "Quercus robur", fr: "Chêne pédonculé" },
  { latin: "Quercus suber", fr: "Chêne-liège" },
  { latin: "Sageretia theezans", fr: "Sagéretia" },
  { latin: "Serissa japonica", fr: "Serissa (arbre aux mille étoiles)" },
  { latin: "Taxus baccata", fr: "If commun" },
  { latin: "Ulmus parvifolia", fr: "Orme de Chine" },
  { latin: "Wisteria floribunda", fr: "Glycine du Japon" },
  { latin: "Zelkova serrata", fr: "Zelkova du Japon" },
];
