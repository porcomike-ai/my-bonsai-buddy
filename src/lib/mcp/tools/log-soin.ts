import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, textResult, errorResult } from "../supabase";
import { SOINS_SELECTABLE } from "@/lib/bonsai-meta";
import type { SoinType } from "@/integrations/supabase/domain-types";

// Dérivé de SOINS_SELECTABLE (source unique de vérité) plutôt qu'une liste
// en dur : reste automatiquement synchronisé si la taxonomie évolue, au lieu
// de se figer et diverger silencieusement comme précédemment (cette liste
// référençait encore "arrosage"/"taille"/"fertilisation"/"traitement"/
// "ligature", abandonnés depuis, et ne proposait pas les 7 nouveaux types
// comme "accident", "greffe" ou "exposition").
const SOIN_TYPES = SOINS_SELECTABLE.map((s) => s.value) as [SoinType, ...SoinType[]];

export default defineTool({
  name: "log_soin",
  title: "Enregistrer un soin",
  description:
    "Ajoute une entrée dans le journal d'entretien d'un bonsaï (rempotage, engrais, greffe, etc.).",
  inputSchema: {
    bonsai_id: z.string().uuid(),
    type: z.enum(SOIN_TYPES).describe("Type de soin"),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .describe("Date ISO (YYYY-MM-DD). Par défaut : aujourd'hui."),
    notes: z.string().optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false },
  handler: async ({ bonsai_id, type, date, notes }, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Non authentifié");
    const { data, error } = await supabaseForUser(ctx)
      .from("journal_entries")
      .insert({
        bonsai_id,
        user_id: ctx.getUserId(),
        type,
        date: date ?? new Date().toISOString().slice(0, 10),
        notes: notes ?? null,
      })
      .select()
      .single();
    if (error) return errorResult(error.message);
    return textResult({ ok: true, entry: data });
  },
});
