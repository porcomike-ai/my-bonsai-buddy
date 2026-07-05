import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, textResult, errorResult } from "../supabase";

export default defineTool({
  name: "list_poteries",
  title: "Lister mes poteries",
  description: "Retourne les poteries de la collection avec leurs dimensions et matières.",
  inputSchema: {
    limit: z.number().int().min(1).max(200).default(50),
    search: z.string().optional().describe("Filtre sur nom / artisan / forme"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, search }, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Non authentifié");
    let q = supabaseForUser(ctx)
      .from("poteries")
      .select(
        "id, nom, forme, matiere, couleur, artisan, longueur_cm, largeur_cm, hauteur_cm, prix",
      )
      .order("nom", { ascending: true })
      .limit(limit);
    if (search && search.trim()) {
      const s = `%${search.trim()}%`;
      q = q.or(`nom.ilike.${s},artisan.ilike.${s},forme.ilike.${s}`);
    }
    const { data, error } = await q;
    if (error) return errorResult(error.message);
    return textResult({ count: data?.length ?? 0, poteries: data ?? [] });
  },
});
