export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type BonsaiStyle =
  | "chokkan"
  | "moyogi"
  | "shakan"
  | "kengai"
  | "han-kengai"
  | "bunjin"
  | "yose-ue"
  | "ishitsuki"
  | "sokan"
  | "sankan"
  | "kabudachi"
  | "ikadabuki"
  | "netsuranari"
  | "sekijoju"
  | "neagari"
  | "fukinagashi"
  | "hokidachi"
  | "sharimiki"
  | "sabamiki"
  | "nejikan"
  | "takozukuri"
  | "bankan"
  | "autre";

export type BonsaiEtape = "culture" | "pre-bonsai" | "bonsai";

export type SoinType =
  | "arrosage"
  | "taille"
  | "rempotage"
  | "fertilisation"
  | "traitement"
  | "ligature"
  | "autre";

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
}

export interface PhotoRow {
  id: string;
  user_id: string;
  bonsai_id: string;
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

export type Database = {
  public: {
    Tables: {
      bonsais: {
        Row: BonsaiRow;
        Insert: { [K in keyof BonsaiRow]?: BonsaiRow[K] } & { id?: string; user_id?: string };
        Update: { [K in keyof BonsaiRow]?: BonsaiRow[K] };
      };
      poteries: {
        Row: PoterieRow;
        Insert: { [K in keyof PoterieRow]?: PoterieRow[K] } & { id?: string; user_id?: string };
        Update: { [K in keyof PoterieRow]?: PoterieRow[K] };
      };
      photos: {
        Row: PhotoRow;
        Insert: { [K in keyof PhotoRow]?: PhotoRow[K] } & { id?: string; user_id?: string };
        Update: { [K in keyof PhotoRow]?: PhotoRow[K] };
      };
      journal_entries: {
        Row: JournalEntryRow;
        Insert: { [K in keyof JournalEntryRow]?: JournalEntryRow[K] } & {
          id?: string;
          user_id?: string;
        };
        Update: { [K in keyof JournalEntryRow]?: JournalEntryRow[K] };
      };
      rappels: {
        Row: RappelRow;
        Insert: { [K in keyof RappelRow]?: RappelRow[K] } & { id?: string; user_id?: string };
        Update: { [K in keyof RappelRow]?: RappelRow[K] };
      };
      evenements: {
        Row: EvenementRow;
        Insert: { [K in keyof EvenementRow]?: EvenementRow[K] } & { id?: string; user_id?: string };
        Update: { [K in keyof EvenementRow]?: EvenementRow[K] };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
