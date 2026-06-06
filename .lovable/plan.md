# Plan : Firebase + Croquis IA d'évolution

Ce changement est important : remplacement complet de la couche de données (IndexedDB + Google Drive → Firebase) et ajout d'une nouvelle fonctionnalité IA. Je le découpe en deux livraisons.

## Étape 0 — Création du projet Firebase (à faire par toi avant que je code)

1. Va sur https://console.firebase.google.com/ → **Add project** → nomme-le (ex. `bonsai-studio`).
2. Désactive Google Analytics (pas utile ici).
3. Dans **Build → Authentication → Sign-in method**, active **Google**.
4. Dans **Build → Firestore Database → Create database**, mode **production**, région `eur3` (europe).
5. Dans **Build → Storage → Get started**, mode production, même région.
6. Dans **Project settings → General → Your apps**, clique l'icône `</>` Web, enregistre l'app et copie la config :
   ```
   apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId
   ```
7. Dans **Authentication → Settings → Authorized domains**, ajoute :
   - `my-bonsai-buddy.lovable.app`
   - `id-preview--ed2754e3-1d01-4e23-a32e-b1ebfa380b6b.lovable.app`

Quand c'est fait, colle-moi la config (ces clés sont publiques, c'est normal — la sécurité passe par les Firestore Security Rules + Auth).

## Livraison 1 — Migration Firebase

### Données
- **Collections Firestore** scopées par utilisateur :
  - `users/{uid}/bonsais/{bonsaiId}` — champs identiques à `Bonsai` actuel + `poterieId` (référence) + `updatedAt`
  - `users/{uid}/poteries/{poterieId}`
  - `users/{uid}/bonsais/{bonsaiId}/photos/{photoId}` (sous-collection, métadonnées)
  - `users/{uid}/bonsais/{bonsaiId}/journal/{entryId}`
  - `users/{uid}/bonsais/{bonsaiId}/rappels/{rappelId}`
  - `users/{uid}/evenements/{evenementId}`
  - `users/{uid}/bonsais/{bonsaiId}/croquis/{croquisId}` (nouveau — voir Livraison 2)
- **Storage** pour les images : `users/{uid}/bonsais/{bonsaiId}/photos/{photoId}.jpg` et `.../croquis/{croquisId}.png`
- **Lien bonsaï ↔ poterie** : champ `poterieId` (déjà présent), résolu côté client par `getDoc(doc(db, '.../poteries/' + id))`.

### Sécurité (Firestore Rules)
```
match /users/{uid}/{document=**} {
  allow read, write: if request.auth != null && request.auth.uid == uid;
}
```
Mêmes règles pour Storage.

### Auth
- `signInWithPopup(googleProvider)` au démarrage, bouton dans Paramètres.
- Persistance `browserLocalPersistence` → reconnexion auto.
- `onAuthStateChanged` déclenche le chargement des données.

### Migration des données existantes
- Au premier login Google détecté, je propose un bouton **« Importer mes données locales (IndexedDB) vers Firebase »** dans Paramètres.
- Push de toutes les entrées IndexedDB + upload des blobs photos vers Storage.
- Une fois importé, les lectures viennent uniquement de Firestore (avec cache `enableIndexedDbPersistence` pour fonctionner hors-ligne).

### Suppression
- Suppression de `src/lib/google-drive.ts`, du bloc Drive dans `parametres.tsx`, du module `app-shell.tsx` qui appelle `autoSyncFromDrive`.
- Remplacement de `src/lib/db.ts` (IndexedDB) par `src/lib/firestore.ts` exposant la même API (`listBonsais`, `saveBonsai`, etc.) → aucun composant à réécrire ailleurs.

### Packages
- `firebase` (SDK v10 modulaire)

## Livraison 2 — Croquis IA d'évolution + comparaison

### Génération de croquis
- Server route `src/routes/api/sketch-evolution.ts` (streaming SSE) qui appelle Lovable AI Gateway avec `google/gemini-3.1-flash-image-preview` en mode **édition d'image** (photo actuelle → croquis stylisé botanique noir & blanc).
- Paramètres : `bonsaiId`, `horizonAnnees` (1, 3, 5, 10), `objectifMiseEnForme` (texte libre, ex. « renforcer le nebari, ouvrir la cime »).
- Prompt système : « Esquisse botanique au trait, encre noire sur papier ivoire, projection à N années montrant la croissance du tronc, l'évolution de la ramification et la silhouette future selon le style {style} du bonsaï. »
- Le résultat (base64 PNG) est uploadé dans Storage + métadonnées dans `croquis/{id}` avec `dateCreation`, `horizonAnnees`, `objectif`, `photoSourceId`.

### Interface croquis
- Nouveau bouton **« Simuler l'évolution »** sur la fiche bonsaï.
- Modal avec sélection de l'horizon temporel et du texte d'objectif, prévisualisation streaming (frames partielles floutées qui se précisent).
- Galerie de croquis sauvegardés par bonsaï avec date et horizon.

### Comparaison
- Nouvel onglet **« Progression »** sur la fiche bonsaï avec deux modes :
  1. **Slider avant/après** (composant react-compare-slider) : photo actuelle ↔ croquis sélectionné.
  2. **Timeline annotée** : alignement chronologique photos + croquis ; bouton « Analyser » qui appelle un serverFn IA (`google/gemini-3-flash-preview`) avec les deux images en input et retourne un texte structuré (`{ratificationGain, troncEpaississement, silhouetteEcart, recommandations[]}`).

### Packages
- `react-compare-slider`

## Détails techniques

- `firebase` SDK initialisé dans `src/integrations/firebase/client.ts`, config lue depuis `import.meta.env.VITE_FIREBASE_*` (clés publiques, ok côté client).
- Persistance offline Firestore activée → l'app continue de marcher sans réseau, sync auto au retour.
- Les serverFns/routes IA lisent `process.env.LOVABLE_API_KEY` (déjà provisionné).
- Pas de Lovable Cloud / Supabase nécessaire — Firebase remplace tout côté backend données.

## Risques que je veux signaler

1. **Réinitialisation des données** : les utilisateurs actuels devront cliquer « Importer » pour migrer ; sinon ils repartent à vide. Je peux le faire automatiquement au premier login si tu préfères.
2. **Coût Firebase** : gratuit sous le quota Spark (1 Go Firestore, 5 Go Storage, 50k lectures/jour). Largement suffisant pour un usage personnel.
3. **Croquis IA** : chaque génération consomme des crédits Lovable AI. Je mettrai un compteur visible.

## Ordre d'exécution proposé

Une fois ta config Firebase reçue :
1. Livraison 1 (migration complète + bouton d'import) — je teste avant de te rendre la main.
2. Livraison 2 (croquis + comparaison) dans un second tour.

Confirme la config Firebase et je démarre. Si tu veux ajuster quelque chose dans le plan (auto-import vs bouton, styles de croquis, etc.), dis-le maintenant.
