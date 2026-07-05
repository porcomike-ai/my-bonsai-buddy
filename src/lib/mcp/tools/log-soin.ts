import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, textResult, errorResult } from "../supabase";

const SOIN_TYPES = [
  "arrosage",
  "taille",
  "rempotage",
  "fertilisation",
  "traitement",
  "ligature",
  "don_vente",
  "mort",
  "autre",
] as const;

export default defineTool({
  name: "log_soin",
  title: "Enregistrer un soin",
  description:
    "Ajoute une entrée dans le journal d'entretien d'un bonsaï (arrosage, taille, rempotage, etc.).",
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
