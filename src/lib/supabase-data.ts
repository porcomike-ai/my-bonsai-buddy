// ============================================================================
//  Couche données Supabase — point d'entrée public
//
//  Ce fichier ne contient plus de logique lui-même : il réexporte les
//  modules de src/lib/supabase/, découpés par domaine (bonsaïs, photos,
//  journal, rappels, poteries, événements, sauvegarde) pour rester lisibles
//  individuellement, tout en gardant un seul chemin d'import stable pour le
//  reste de l'application : `@/lib/supabase-data`.
//
//  Ne rien importer directement depuis `@/lib/supabase/*` ailleurs dans
//  l'app — toujours passer par ce fichier.
// ============================================================================

export * from "./supabase/core";
export * from "./supabase/bonsai";
export * from "./supabase/photo";
export * from "./supabase/journal";
export * from "./supabase/rappel";
export * from "./supabase/poterie";
export * from "./supabase/evenement";
export * from "./supabase/backup";
