export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bonsais: {
        Row: {
          age_estime: number | null
          created_at: string
          dans_collection: boolean
          date_acquisition: string | null
          espece: string
          etape: string | null
          favori: boolean
          hauteur_cm: number | null
          id: string
          nom: string
          notes: string | null
          origine: string | null
          photo_principale_path: string | null
          poterie_id: string | null
          prix_achat: number | null
          style: string
          updated_at: string
          user_id: string
          valeur_estimee: number | null
        }
        Insert: {
          age_estime?: number | null
          created_at?: string
          dans_collection?: boolean
          date_acquisition?: string | null
          espece: string
          etape?: string | null
          favori?: boolean
          hauteur_cm?: number | null
          id?: string
          nom: string
          notes?: string | null
          origine?: string | null
          photo_principale_path?: string | null
          poterie_id?: string | null
          prix_achat?: number | null
          style: string
          updated_at?: string
          user_id?: string
          valeur_estimee?: number | null
        }
        Update: {
          age_estime?: number | null
          created_at?: string
          dans_collection?: boolean
          date_acquisition?: string | null
          espece?: string
          etape?: string | null
          favori?: boolean
          hauteur_cm?: number | null
          id?: string
          nom?: string
          notes?: string | null
          origine?: string | null
          photo_principale_path?: string | null
          poterie_id?: string | null
          prix_achat?: number | null
          style?: string
          updated_at?: string
          user_id?: string
          valeur_estimee?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bonsais_poterie_id_fkey"
            columns: ["poterie_id"]
            isOneToOne: false
            referencedRelation: "poteries"
            referencedColumns: ["id"]
          },
        ]
      }
      evenements: {
        Row: {
          bonsai_id: string | null
          created_at: string
          date_heure: string
          description: string | null
          id: string
          notified_at: string | null
          rappel_minutes: number | null
          titre: string
          user_id: string
        }
        Insert: {
          bonsai_id?: string | null
          created_at?: string
          date_heure: string
          description?: string | null
          id?: string
          notified_at?: string | null
          rappel_minutes?: number | null
          titre: string
          user_id?: string
        }
        Update: {
          bonsai_id?: string | null
          created_at?: string
          date_heure?: string
          description?: string | null
          id?: string
          notified_at?: string | null
          rappel_minutes?: number | null
          titre?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evenements_bonsai_id_fkey"
            columns: ["bonsai_id"]
            isOneToOne: false
            referencedRelation: "bonsais"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_entries: {
        Row: {
          bonsai_id: string
          created_at: string
          date: string
          id: string
          notes: string | null
          rappel_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          bonsai_id: string
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          rappel_id?: string | null
          type: string
          user_id?: string
        }
        Update: {
          bonsai_id?: string
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          rappel_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_bonsai_id_fkey"
            columns: ["bonsai_id"]
            isOneToOne: false
            referencedRelation: "bonsais"
            referencedColumns: ["id"]
          },
        ]
      }
      photos: {
        Row: {
          bonsai_id: string | null
          created_at: string
          date: string
          id: string
          legende: string | null
          poterie_id: string | null
          storage_path: string
          user_id: string
        }
        Insert: {
          bonsai_id?: string | null
          created_at?: string
          date?: string
          id?: string
          legende?: string | null
          poterie_id?: string | null
          storage_path: string
          user_id?: string
        }
        Update: {
          bonsai_id?: string | null
          created_at?: string
          date?: string
          id?: string
          legende?: string | null
          poterie_id?: string | null
          storage_path?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "photos_bonsai_id_fkey"
            columns: ["bonsai_id"]
            isOneToOne: false
            referencedRelation: "bonsais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photos_poterie_id_fkey"
            columns: ["poterie_id"]
            isOneToOne: false
            referencedRelation: "poteries"
            referencedColumns: ["id"]
          },
        ]
      }
      poteries: {
        Row: {
          artisan: string | null
          couleur: string | null
          created_at: string
          forme: string | null
          hauteur_cm: number | null
          id: string
          largeur_cm: number | null
          longueur_cm: number | null
          matiere: string | null
          nom: string
          notes: string | null
          origine: string | null
          photo_path: string | null
          prix: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          artisan?: string | null
          couleur?: string | null
          created_at?: string
          forme?: string | null
          hauteur_cm?: number | null
          id?: string
          largeur_cm?: number | null
          longueur_cm?: number | null
          matiere?: string | null
          nom: string
          notes?: string | null
          origine?: string | null
          photo_path?: string | null
          prix?: number | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          artisan?: string | null
          couleur?: string | null
          created_at?: string
          forme?: string | null
          hauteur_cm?: number | null
          id?: string
          largeur_cm?: number | null
          longueur_cm?: number | null
          matiere?: string | null
          nom?: string
          notes?: string | null
          origine?: string | null
          photo_path?: string | null
          prix?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string
          endpoint: string
          id: string
          p256dh: string
          user_id: string
        }
        Insert: {
          auth: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh: string
          user_id: string
        }
        Update: {
          auth?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh?: string
          user_id?: string
        }
        Relationships: []
      }
      rappels: {
        Row: {
          actif: boolean
          bonsai_id: string
          created_at: string
          id: string
          intervalle_jours: number | null
          notes: string | null
          prochaine_date: string
          type: string
          user_id: string
        }
        Insert: {
          actif?: boolean
          bonsai_id: string
          created_at?: string
          id?: string
          intervalle_jours?: number | null
          notes?: string | null
          prochaine_date: string
          type: string
          user_id?: string
        }
        Update: {
          actif?: boolean
          bonsai_id?: string
          created_at?: string
          id?: string
          intervalle_jours?: number | null
          notes?: string | null
          prochaine_date?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rappels_bonsai_id_fkey"
            columns: ["bonsai_id"]
            isOneToOne: false
            referencedRelation: "bonsais"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
