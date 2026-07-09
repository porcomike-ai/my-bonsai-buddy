import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, textResult, errorResult } from "../supabase";

export default defineTool({
  name: "list_bonsais",
  title: "Lister mes bonsaïs",
  description:
    "Retourne les bonsaïs de la collection de l'utilisateur connecté (nom, espèce, style, étape, favori).",
  inputSchema: {
    limit: z.number().int().min(1).max(200).default(50).describe("Nombre maximum de résultats"),
    favoris_only: z.boolean().default(false).describe("Ne renvoyer que les bonsaïs favoris"),
    search: z.string().optional().describe("Filtre plein-texte sur nom / espèce"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, favoris_only, search }, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Non authentifié");
    let query = supabaseForUser(ctx)
      .from("bonsais")
      .select(
        "id, nom, espece, style, etape, favori, dans_collection, date_acquisition, hauteur_cm, valeur_estimee",
      )
      .eq("dans_collection", true)
      .order("nom", { ascending: true })
      .limit(limit);
    if (favoris_only) query = query.eq("favori", true);
    if (search && search.trim()) {
      const s = `%${search.trim()}%`;
      query = query.or(`nom.ilike.${s},espece.ilike.${s}`);
    }
    const { data, error } = await query;
    if (error) return errorResult(error.message);
    return textResult({ count: data?.length ?? 0, bonsais: data ?? [] });
  },
});
