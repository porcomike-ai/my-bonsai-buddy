# Plan — Application de gestion de collection de bonsaïs

Application personnelle (sans compte), données stockées localement dans le navigateur. Style visuel **Terre & sauge** : terracotta (#c4654a), pêche douce (#e8a87c), sauge (#87a878), vert forêt (#4a6741) — typographie éditoriale (serif élégant en titres + sans-serif chaleureux en corps).

## Pages (routes séparées)

- `/` — **Tableau de bord** : aperçu de la collection (compteurs, prochains soins à venir, derniers ajouts)
- `/collection` — **Mes bonsaïs** : galerie en grille avec recherche, filtres (espèce, style, âge)
- `/bonsai/$id` — **Fiche détaillée** : photo principale, infos, onglets Galerie / Journal / Rappels / Poterie associée
- `/bonsai/nouveau` — Formulaire de création
- `/poteries` — **Mes poteries** : grille des contenants avec dimensions, origine, style, bonsaï actuellement planté
- `/poterie/$id` — Fiche poterie + édition
- `/calendrier` — **Calendrier des soins** : vue mensuelle des rappels (arrosage, taille, rempotage, fertilisation)
- `/journal` — Historique global des entretiens, filtrable par bonsaï et type d'action

## Fonctionnalités principales

**Fiche bonsaï** : nom, espèce, style (chokkan, moyogi, shakan, kengai, etc.), âge estimé, date d'acquisition, origine, hauteur, photo principale, notes, poterie associée.

**Galerie photo évolutive** : plusieurs photos datées par bonsaï, vue chronologique pour suivre l'évolution (timeline visuelle).

**Journal d'entretien** : entrées datées avec type (arrosage, taille, rempotage, fertilisation, traitement, autre), notes libres, lien vers le bonsaï.

**Rappels et calendrier** : création de rappels récurrents par bonsaï (ex. arrosage tous les 2 jours, rempotage annuel). Affichage sur le tableau de bord (prochains 7 jours) et calendrier mensuel. Cochable pour marquer comme fait → crée une entrée de journal automatique.

**Gestion des poteries** : catalogue séparé avec photo, dimensions (L×l×H), forme, couleur, matière, artisan/origine, prix, statut (libre/utilisée), lien réciproque avec le bonsaï planté dedans.

## Stockage des données

Sans login : tout est stocké localement avec **IndexedDB** (via la lib `idb`) pour gérer les photos en blob sans saturer localStorage. Une fonction d'export/import JSON permet à l'utilisateur de sauvegarder sa collection.

## Détails techniques

- **Stack** : TanStack Start (template existant), TanStack Router, React 19, Tailwind v4, shadcn/ui
- **Stockage** : IndexedDB via `idb`, photos converties en Blob URLs
- **Formulaires** : react-hook-form + zod
- **Dates** : date-fns (déjà commun), `date-fns/locale/fr` pour le français
- **Calendrier** : shadcn Calendar pour le date picker, vue mensuelle custom pour `/calendrier`
- **Design system** : tokens oklch dans `src/styles.css` (palette Terre & sauge), pas de couleurs en dur dans les composants
- **i18n** : tout en français (interface, libellés, messages)
- **Export/import** : bouton dans les réglages, JSON + photos encodées en base64

## Hors périmètre (à confirmer plus tard si besoin)

- Synchronisation cloud / multi-appareils
- Notifications push (les rappels sont visuels dans l'app uniquement)
- Partage de fiches
- Authentification

Si vous souhaitez plus tard synchroniser entre appareils ou recevoir des notifications, on pourra activer Lovable Cloud.
