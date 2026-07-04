// Types domaine (schéma des tables + enums) — séparés de types.ts (auto-généré).

export type BonsaiStyle =
  | "chokkan" | "moyogi" | "shakan" | "kengai" | "han-kengai" | "bunjin"
  | "fukinagashi" | "hokidachi" | "sokan" | "sankan" | "kabudachi" | "yose-ue"
  | "ikadabuki" | "netsuranari" | "ishitsuki" | "sekijoju" | "neagari"
  | "sharimiki" | "sabamiki" | "nejikan" | "takozukuri" | "bankan" | "autre";

export type BonsaiEtape = "culture" | "pre-bonsai" | "bonsai";

export type SoinType =
  | "arrosage" | "taille" | "rempotage" | "fertilisation"
  | "traitement" | "ligature" | "don_vente" | "mort" | "autre";

export interface BonsaiRow {
  id: string;
  user_id: string;
  nom: string;
  espece: string;
  style: BonsaiStyle;
  etape: BonsaiEtape | null;
  age_estime: number | null;
  date_acquisition: string | null;
  origine: string | null;
  hauteur_cm: number | null;
  prix_achat: number | null;
  valeur_estimee: number | null;
  photo_principale_path: string | null;
  poterie_id: string | null;
  notes: string | null;
  dans_collection: boolean;
  favori: boolean;
  created_at: string;
  updated_at: string;
}

export interface PoterieRow {
  id: string;
  user_id: string;
  nom: string;
  longueur_cm: number | null;
  largeur_cm: number | null;
  hauteur_cm: number | null;
  forme: string | null;
  couleur: string | null;
  matiere: string | null;
  artisan: string | null;
  origine: string | null;
  prix: number | null;
  photo_path: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PhotoRow {
  id: string;
  user_id: string;
  bonsai_id: string | null;
  poterie_id: string | null;
  storage_path: string;
  date: string;
  legende: string | null;
  created_at: string;
}

export interface JournalEntryRow {
  id: string;
  user_id: string;
  bonsai_id: string;
  type: SoinType;
  date: string;
  notes: string | null;
  rappel_id: string | null;
  created_at: string;
}

export interface RappelRow {
  id: string;
  user_id: string;
  bonsai_id: string;
  type: SoinType;
  prochaine_date: string;
  intervalle_jours: number | null;
  notes: string | null;
  actif: boolean;
  created_at: string;
}

export interface EvenementRow {
  id: string;
  user_id: string;
  titre: string;
  description: string | null;
  date_heure: string;
  rappel_minutes: number | null;
  notified_at: string | null;
  bonsai_id: string | null;
  created_at: string;
}
