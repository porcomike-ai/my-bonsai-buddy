import type { BonsaiStyle, SoinType, BonsaiEtape } from "./db";

export const STYLES: { value: BonsaiStyle; label: string }[] = [
  { value: "chokkan", label: "Chokkan — droit formel" },
  { value: "moyogi", label: "Moyogi — droit informel" },
  { value: "shakan", label: "Shakan — incliné" },
  { value: "kengai", label: "Kengai — cascade" },
  { value: "han-kengai", label: "Han-kengai — semi-cascade" },
  { value: "bunjin", label: "Bunjin(-gi) — lettré" },
  { value: "fukinagashi", label: "Fukinagashi — battu par le vent" },
  { value: "hokidachi", label: "Hokidachi — balai" },
  { value: "sokan", label: "Sokan — double tronc" },
  { value: "sankan", label: "Sankan — triple tronc" },
  { value: "kabudachi", label: "Kabudachi — touffe (multi-troncs)" },
  { value: "yose-ue", label: "Yose-ue — forêt" },
  { value: "ikadabuki", label: "Ikadabuki — radeau" },
  { value: "netsuranari", label: "Netsuranari — radeau sinueux" },
  { value: "ishitsuki", label: "Ishitsuki — sur roche" },
  { value: "sekijoju", label: "Sekijoju — racines sur roche" },
  { value: "neagari", label: "Neagari — racines exposées" },
  { value: "sharimiki", label: "Sharimiki — bois mort (shari)" },
  { value: "sabamiki", label: "Sabamiki — tronc creusé" },
  { value: "nejikan", label: "Nejikan — tronc tordu" },
  { value: "takozukuri", label: "Takozukuri — style poulpe" },
  { value: "bankan", label: "Bankan — tronc enroulé" },
  { value: "autre", label: "Autre" },
];

export const ETAPES: { value: BonsaiEtape; label: string; short: string }[] = [
  { value: "culture", label: "En culture", short: "Culture" },
  { value: "pre-bonsai", label: "Pré-bonsaï", short: "Pré-bonsaï" },
  { value: "bonsai", label: "Bonsaï", short: "Bonsaï" },
];

export function etapeLabel(e?: BonsaiEtape) {
  if (!e) return "Non renseigné";
  return ETAPES.find((x) => x.value === e)?.label ?? e;
}

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

// Espèces couramment utilisées en bonsaï (feuillus, conifères, intérieur, tropicaux, fruitiers, fleurissants)
export const ESPECES: Espece[] = [
  // Érables
  { latin: "Acer buergerianum", fr: "Érable trident" },
  { latin: "Acer palmatum", fr: "Érable du Japon" },
  { latin: "Acer palmatum 'Deshojo'", fr: "Érable du Japon Deshojo" },
  { latin: "Acer palmatum 'Kiyohime'", fr: "Érable du Japon Kiyohime" },
  { latin: "Acer palmatum 'Arakawa'", fr: "Érable à écorce de pin" },
  { latin: "Acer palmatum 'Shishigashira'", fr: "Érable tête de lion" },
  { latin: "Acer japonicum", fr: "Érable du Japon (à feuilles larges)" },
  { latin: "Acer monspessulanum", fr: "Érable de Montpellier" },
  { latin: "Acer campestre", fr: "Érable champêtre" },
  { latin: "Acer ginnala", fr: "Érable de l'Amour" },
  { latin: "Acer rubrum", fr: "Érable rouge" },
  { latin: "Acer saccharinum", fr: "Érable argenté" },

  // Charmes, hêtres, ormes
  { latin: "Carpinus betulus", fr: "Charme commun" },
  { latin: "Carpinus turczaninovii", fr: "Charme coréen" },
  { latin: "Carpinus japonica", fr: "Charme du Japon" },
  { latin: "Fagus sylvatica", fr: "Hêtre commun" },
  { latin: "Fagus crenata", fr: "Hêtre du Japon" },
  { latin: "Ulmus parvifolia", fr: "Orme de Chine" },
  { latin: "Ulmus minor", fr: "Orme champêtre" },
  { latin: "Ulmus procera", fr: "Orme anglais" },
  { latin: "Zelkova serrata", fr: "Zelkova du Japon" },
  { latin: "Celtis sinensis", fr: "Micocoulier de Chine" },
  { latin: "Celtis australis", fr: "Micocoulier de Provence" },

  // Chênes
  { latin: "Quercus robur", fr: "Chêne pédonculé" },
  { latin: "Quercus petraea", fr: "Chêne sessile" },
  { latin: "Quercus suber", fr: "Chêne-liège" },
  { latin: "Quercus ilex", fr: "Chêne vert" },
  { latin: "Quercus pubescens", fr: "Chêne pubescent" },
  { latin: "Quercus cerris", fr: "Chêne chevelu" },

  // Genévriers
  { latin: "Juniperus chinensis", fr: "Genévrier de Chine" },
  { latin: "Juniperus chinensis 'Itoigawa'", fr: "Genévrier Itoigawa" },
  { latin: "Juniperus chinensis 'Kishu'", fr: "Genévrier Kishu" },
  { latin: "Juniperus chinensis 'Shimpaku'", fr: "Genévrier Shimpaku" },
  { latin: "Juniperus procumbens", fr: "Genévrier rampant" },
  { latin: "Juniperus rigida", fr: "Genévrier rigide" },
  { latin: "Juniperus communis", fr: "Genévrier commun" },
  { latin: "Juniperus sabina", fr: "Genévrier sabine" },
  { latin: "Juniperus squamata", fr: "Genévrier écailleux" },

  // Pins
  { latin: "Pinus mugo", fr: "Pin des montagnes" },
  { latin: "Pinus parviflora", fr: "Pin blanc du Japon" },
  { latin: "Pinus sylvestris", fr: "Pin sylvestre" },
  { latin: "Pinus thunbergii", fr: "Pin noir du Japon" },
  { latin: "Pinus nigra", fr: "Pin noir d'Autriche" },
  { latin: "Pinus halepensis", fr: "Pin d'Alep" },
  { latin: "Pinus pinea", fr: "Pin parasol" },
  { latin: "Pinus pinaster", fr: "Pin maritime" },
  { latin: "Pinus densiflora", fr: "Pin rouge du Japon" },
  { latin: "Pinus strobus", fr: "Pin Weymouth" },
  { latin: "Pinus contorta", fr: "Pin tordu" },

  // Autres conifères
  { latin: "Picea abies", fr: "Épicéa commun" },
  { latin: "Picea glauca", fr: "Épicéa blanc" },
  { latin: "Picea jezoensis", fr: "Épicéa de Yeddo" },
  { latin: "Picea mariana", fr: "Épinette noire" },
  { latin: "Larix decidua", fr: "Mélèze d'Europe" },
  { latin: "Larix kaempferi", fr: "Mélèze du Japon" },
  { latin: "Taxus baccata", fr: "If commun" },
  { latin: "Taxus cuspidata", fr: "If du Japon" },
  { latin: "Cryptomeria japonica", fr: "Cèdre du Japon" },
  { latin: "Cupressus macrocarpa", fr: "Cyprès de Monterey" },
  { latin: "Cupressus sempervirens", fr: "Cyprès de Provence" },
  { latin: "Chamaecyparis obtusa", fr: "Faux-cyprès hinoki" },
  { latin: "Chamaecyparis pisifera", fr: "Faux-cyprès sawara" },
  { latin: "Thuja occidentalis", fr: "Thuya du Canada" },
  { latin: "Thuja orientalis", fr: "Thuya d'Orient" },
  { latin: "Metasequoia glyptostroboides", fr: "Métaséquoia" },
  { latin: "Taxodium distichum", fr: "Cyprès chauve" },
  { latin: "Sequoia sempervirens", fr: "Séquoia toujours vert" },
  { latin: "Cedrus atlantica", fr: "Cèdre de l'Atlas" },
  { latin: "Cedrus libani", fr: "Cèdre du Liban" },
  { latin: "Cedrus deodara", fr: "Cèdre de l'Himalaya" },
  { latin: "Abies koreana", fr: "Sapin de Corée" },
  { latin: "Tsuga canadensis", fr: "Pruche du Canada" },
  { latin: "Ginkgo biloba", fr: "Ginkgo" },

  // Fruitiers et fleurissants
  { latin: "Malus sp.", fr: "Pommier d'ornement" },
  { latin: "Malus halliana", fr: "Pommier de Hall" },
  { latin: "Pyrus communis", fr: "Poirier commun" },
  { latin: "Prunus mume", fr: "Abricotier du Japon" },
  { latin: "Prunus serrulata", fr: "Cerisier du Japon" },
  { latin: "Prunus persica", fr: "Pêcher" },
  { latin: "Prunus spinosa", fr: "Prunellier" },
  { latin: "Prunus avium", fr: "Merisier" },
  { latin: "Punica granatum", fr: "Grenadier" },
  { latin: "Punica granatum 'Nana'", fr: "Grenadier nain" },
  { latin: "Diospyros kaki", fr: "Plaqueminier (kaki)" },
  { latin: "Diospyros rhombifolia", fr: "Plaqueminier princesse" },
  { latin: "Chaenomeles japonica", fr: "Cognassier du Japon" },
  { latin: "Chaenomeles speciosa", fr: "Cognassier de Chine" },
  { latin: "Cydonia oblonga", fr: "Cognassier commun" },
  { latin: "Citrus sinensis", fr: "Oranger" },
  { latin: "Citrus limon", fr: "Citronnier" },
  { latin: "Fortunella margarita", fr: "Kumquat" },
  { latin: "Olea europaea", fr: "Olivier" },
  { latin: "Olea europaea 'Sylvestris'", fr: "Olivier sauvage" },
  { latin: "Morus alba", fr: "Mûrier blanc" },
  { latin: "Morus nigra", fr: "Mûrier noir" },
  { latin: "Ficus carica", fr: "Figuier commun" },

  // Arbustes décoratifs / haies
  { latin: "Cotoneaster horizontalis", fr: "Cotonéaster rampant" },
  { latin: "Cotoneaster microphyllus", fr: "Cotonéaster à petites feuilles" },
  { latin: "Pyracantha sp.", fr: "Buisson ardent" },
  { latin: "Crataegus monogyna", fr: "Aubépine monogyne" },
  { latin: "Crataegus laevigata", fr: "Aubépine à deux styles" },
  { latin: "Berberis thunbergii", fr: "Épine-vinette du Japon" },
  { latin: "Buxus sempervirens", fr: "Buis commun" },
  { latin: "Buxus microphylla", fr: "Buis à petites feuilles" },
  { latin: "Ilex crenata", fr: "Houx crénelé" },
  { latin: "Ilex serrata", fr: "Houx denté du Japon" },
  { latin: "Ilex aquifolium", fr: "Houx commun" },
  { latin: "Ligustrum sinense", fr: "Troène de Chine" },
  { latin: "Ligustrum ovalifolium", fr: "Troène ovale" },
  { latin: "Ligustrum vulgare", fr: "Troène commun" },
  { latin: "Euonymus europaeus", fr: "Fusain d'Europe" },
  { latin: "Euonymus alatus", fr: "Fusain ailé" },
  { latin: "Lonicera nitida", fr: "Chèvrefeuille à feuilles de buis" },
  { latin: "Hibiscus syriacus", fr: "Althéa" },
  { latin: "Lagerstroemia indica", fr: "Lilas des Indes" },
  { latin: "Wisteria floribunda", fr: "Glycine du Japon" },
  { latin: "Wisteria sinensis", fr: "Glycine de Chine" },
  { latin: "Bougainvillea glabra", fr: "Bougainvillier" },
  { latin: "Rhododendron indicum", fr: "Azalée satsuki" },
  { latin: "Rhododendron obtusum", fr: "Azalée du Japon" },
  { latin: "Camellia japonica", fr: "Camélia du Japon" },
  { latin: "Camellia sinensis", fr: "Théier" },
  { latin: "Gardenia jasminoides", fr: "Gardénia" },
  { latin: "Pistacia lentiscus", fr: "Lentisque" },
  { latin: "Pistacia terebinthus", fr: "Térébinthe" },

  // Intérieur / tropicaux
  { latin: "Ficus retusa", fr: "Ficus ginseng" },
  { latin: "Ficus microcarpa", fr: "Ficus microcarpa" },
  { latin: "Ficus benjamina", fr: "Ficus pleureur" },
  { latin: "Ficus religiosa", fr: "Figuier des pagodes" },
  { latin: "Ficus salicaria", fr: "Ficus à feuilles de saule" },
  { latin: "Carmona retusa", fr: "Arbre à thé de Fukien" },
  { latin: "Sageretia theezans", fr: "Sagéretia" },
  { latin: "Serissa japonica", fr: "Serissa (arbre aux mille étoiles)" },
  { latin: "Crassula ovata", fr: "Arbre de jade" },
  { latin: "Portulacaria afra", fr: "Pourpier en arbre" },
  { latin: "Pithecellobium tortum", fr: "Brésilien (Pithecellobium)" },
  { latin: "Schefflera arboricola", fr: "Schefflera nain" },
  { latin: "Bougainvillea spectabilis", fr: "Bougainvillier spectaculaire" },
  { latin: "Tamarindus indica", fr: "Tamarinier" },
  { latin: "Adenium obesum", fr: "Rose du désert" },
  { latin: "Operculicarya decaryi", fr: "Operculicaria" },
  { latin: "Murraya paniculata", fr: "Bois jasmin" },

  // Bouleaux / saules / autres
  { latin: "Betula pendula", fr: "Bouleau verruqueux" },
  { latin: "Betula pubescens", fr: "Bouleau blanc" },
  { latin: "Alnus glutinosa", fr: "Aulne glutineux" },
  { latin: "Salix babylonica", fr: "Saule pleureur" },
  { latin: "Salix caprea", fr: "Saule marsault" },
  { latin: "Tilia cordata", fr: "Tilleul à petites feuilles" },
  { latin: "Fraxinus excelsior", fr: "Frêne commun" },
  { latin: "Robinia pseudoacacia", fr: "Robinier faux-acacia" },
  { latin: "Sorbus aucuparia", fr: "Sorbier des oiseleurs" },
  { latin: "Liquidambar styraciflua", fr: "Copalme d'Amérique" },
];

// --- Espèces personnalisées (ajoutées par l'utilisateur, mémorisées localement) ---
const LS_CUSTOM = "bonsai.especes.custom";

export function getCustomEspeces(): Espece[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_CUSTOM);
    if (!raw) return [];
    return JSON.parse(raw) as Espece[];
  } catch {
    return [];
  }
}

export function addCustomEspece(value: string): void {
  if (typeof window === "undefined") return;
  const v = value.trim();
  if (!v) return;
  const all = [...ESPECES, ...getCustomEspeces()];
  if (all.some((e) => e.latin.toLowerCase() === v.toLowerCase() || e.fr.toLowerCase() === v.toLowerCase())) return;
  const custom = getCustomEspeces();
  custom.push({ latin: v, fr: v });
  localStorage.setItem(LS_CUSTOM, JSON.stringify(custom));
}

export function removeCustomEspece(value: string): void {
  if (typeof window === "undefined") return;
  const custom = getCustomEspeces().filter((e) => e.latin !== value && e.fr !== value);
  localStorage.setItem(LS_CUSTOM, JSON.stringify(custom));
}

export function getAllEspeces(): Espece[] {
  return [...ESPECES, ...getCustomEspeces()];
}
