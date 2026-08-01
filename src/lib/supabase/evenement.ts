import type { EvenementRow } from "@/integrations/supabase/domain-types";
import { db, fetchAllRows, currentUserId, type Evenement } from "./core";

function rowToEvenement(r: EvenementRow): Evenement {
  return {
    id: r.id,
    titre: r.titre,
    description: r.description ?? undefined,
    dateHeure: r.date_heure,
    rappelMinutes: r.rappel_minutes ?? undefined,
    notifiedAt: r.notified_at ?? undefined,
    bonsaiId: r.bonsai_id ?? undefined,
    createdAt: r.created_at,
  };
}

export async function listEvenements(): Promise<Evenement[]> {
  const rows = await fetchAllRows<EvenementRow>((from, to) =>
    db
      .from("evenements")
      .select("*")
      .order("date_heure", { ascending: true })
      .range(from, to),
  );
  return rows.map(rowToEvenement);
}

export async function saveEvenement(e: Evenement): Promise<void> {
  const uidStr = await currentUserId();
  // N'inclure `notified_at` que s'il a une vraie valeur (spread conditionnel).
  // PostgREST ne modifie que les colonnes présentes dans le payload d'un
  // upsert : l'omettre préserve la valeur existante en base (utile pour la
  // restauration de sauvegarde : `backup.ts` / `parametres.tsx` appellent
  // cette même fonction avec le `notifiedAt` tel qu'il était au moment de
  // l'export, qui peut être vide s'il a été notifié depuis — l'écraser à
  // null referait passer un évènement déjà notifié pour "non notifié" et
  // risquerait une renotification). Sur une vraie création (calendrier.tsx),
  // `notifiedAt` est de toute façon toujours vide, donc ce changement ne
  // modifie rien dans ce cas : la colonne reste NULL par défaut (pas de
  // DEFAULT explicite dans le schéma), exactement comme avant.
  const { error } = await db.from("evenements").upsert({
    id: e.id,
    titre: e.titre,
    description: e.description ?? null,
    date_heure: e.dateHeure,
    rappel_minutes: e.rappelMinutes ?? null,
    bonsai_id: e.bonsaiId ?? null,
    user_id: uidStr,
    ...(e.notifiedAt ? { notified_at: e.notifiedAt } : {}),
  });
  if (error) throw error;
}

/**
 * Met à jour les champs éditables d'un évènement existant, SANS jamais
 * toucher `created_at` ni `notified_at`.
 *
 * IMPORTANT : ne jamais inclure ces deux colonnes dans ce payload.
 * `notified_at` est géré exclusivement par l'Edge Function
 * send-due-notifications (même principe que `saveRappel`, voir
 * rappel.ts) ; PostgREST ne modifie que les colonnes présentes dans le
 * payload d'un upsert, donc les omettre ici préserve leurs valeurs
 * existantes. Les réintroduire réintroduirait le bug corrigé le
 * 25/07/2026 : éditer un évènement (ex. corriger une faute dans le
 * titre) remettait `notified_at` à null (risque de renotification) et
 * écrasait la date de création d'origine.
 */
export async function updateEvenement(
  id: string,
  patch: Pick<Evenement, "titre" | "description" | "dateHeure" | "rappelMinutes" | "bonsaiId">,
): Promise<void> {
  const { error } = await db
    .from("evenements")
    .update({
      titre: patch.titre,
      description: patch.description ?? null,
      date_heure: patch.dateHeure,
      rappel_minutes: patch.rappelMinutes ?? null,
      bonsai_id: patch.bonsaiId ?? null,
    })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteEvenement(id: string): Promise<void> {
  const { error } = await db.from("evenements").delete().eq("id", id);
  if (error) throw error;
}
