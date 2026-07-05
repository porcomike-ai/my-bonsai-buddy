import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, textResult, errorResult } from "../supabase";

export default defineTool({
  name: "get_bonsai",
  title: "Détail d'un bonsaï",
  description:
    "Retourne la fiche complète d'un bonsaï (métadonnées, derniers soins, prochains rappels).",
  inputSchema: {
    bonsai_id: z.string().uuid().describe("Identifiant du bonsaï"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ bonsai_id }, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Non authentifié");
    const sb = supabaseForUser(ctx);
    const [bonsai, journal, rappels] = await Promise.all([
      sb.from("bonsais").select("*").eq("id", bonsai_id).maybeSingle(),
      sb
        .from("journal_entries")
        .select("id, type, date, notes")
        .eq("bonsai_id", bonsai_id)
        .order("date", { ascending: false })
        .limit(10),
      sb
        .from("rappels")
        .select("id, type, prochaine_date, intervalle_jours, actif, notes")
        .eq("bonsai_id", bonsai_id)
        .eq("actif", true)
        .order("prochaine_date", { ascending: true }),
    ]);
    if (bonsai.error) return errorResult(bonsai.error.message);
    if (!bonsai.data) return errorResult("Bonsaï introuvable");
    return textResult({
      bonsai: bonsai.data,
      derniers_soins: journal.data ?? [],
      rappels_actifs: rappels.data ?? [],
    });
  },
});
