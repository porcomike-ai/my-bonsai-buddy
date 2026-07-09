import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, textResult, errorResult } from "../supabase";

export default defineTool({
  name: "list_rappels_a_venir",
  title: "Rappels à venir",
  description:
    "Liste les rappels d'entretien actifs à venir (par défaut sur les 30 prochains jours), triés par date.",
  inputSchema: {
    days_ahead: z.number().int().min(1).max(365).default(30),
    overdue_only: z.boolean().default(false).describe("Ne renvoyer que les rappels en retard"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ days_ahead, overdue_only }, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Non authentifié");
    const today = new Date();
    const limitDate = new Date(today.getTime() + days_ahead * 86400_000);
    let q = supabaseForUser(ctx)
      .from("rappels")
      .select("id, bonsai_id, type, prochaine_date, intervalle_jours, notes, actif")
      .eq("actif", true)
      .order("prochaine_date", { ascending: true });
    if (overdue_only) {
      q = q.lt("prochaine_date", today.toISOString().slice(0, 10));
    } else {
      q = q.lte("prochaine_date", limitDate.toISOString().slice(0, 10));
    }
    const { data, error } = await q;
    if (error) return errorResult(error.message);
    return textResult({ count: data?.length ?? 0, rappels: data ?? [] });
  },
});
