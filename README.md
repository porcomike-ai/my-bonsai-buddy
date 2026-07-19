# Bonsaï Studio

Carnet personnel pour gérer une collection de bonsaïs (fiches, journal de soins, rappels, calendrier, poteries).

## ⚠️ Un seul gestionnaire de paquets : Bun

Ce projet utilise **exclusivement Bun**. `bun.lock` fait foi.

**Ne jamais committer de `package-lock.json`, `yarn.lock` ou `pnpm-lock.yaml`.** La plateforme d'hébergement (Netlify, derrière Bolt) choisit automatiquement le gestionnaire de paquets en fonction des fichiers de verrouillage présents dans le dépôt — si `package-lock.json` traîne à côté de `bun.lock`, npm reprend la main silencieusement, malgré cette consigne. Les deux gestionnaires finissent alors par installer des versions de dépendances légèrement différentes, ce qui peut provoquer des bugs qui n'apparaissent que sur un seul des deux environnements (Bolt vs local), en plus de gros diffs Git parasites à chaque régénération.

**Si un `package-lock.json` réapparaît dans le dépôt** (par exemple après une session Bolt) :
1. Supprime-le.
2. Vérifie qu'aucun champ `"packageManager"` n'a été ajouté dans `package.json`.
3. Republie, et confirme que le déploiement suivant n'en régénère pas un nouveau.

## Prérequis

- [Bun](https://bun.sh) (gestionnaire de paquets et runtime utilisés par ce projet — voir `bun.lock`)
- Un projet Supabase (base de données + authentification + storage)

## Variables d'environnement

Créer un fichier `.env` à la racine avec :

```
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_PROJECT_ID=
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
VITE_VAPID_PUBLIC_KEY=
VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
```

- `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` : utilisées côté client (build Vite).
- `VITE_SUPABASE_PROJECT_ID` : identifiant du projet Supabase (`xvvqffgchelmszpbdvde`), utilisé pour construire l'issuer OAuth du serveur MCP (`src/lib/mcp/index.ts`). Sans elle, les routes MCP (`/mcp`, `/.mcp/invoke-tool/...`) refusent de démarrer.
- `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` : utilisées côté serveur (SSR).
- `SUPABASE_SERVICE_ROLE_KEY` : clé admin, réservée aux routes serveur (`client.server.ts`). Ne jamais l'exposer côté client.
- `VITE_VAPID_PUBLIC_KEY` : clé publique VAPID pour les notifications push (côté client). Obligatoire : aucune valeur par défaut n'est fournie si elle est absente.
- `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` : clés VAPID pour l'envoi des notifications push (côté serveur).

Pour générer les clés VAPID :
```bash
npx web-push generate-vapid-keys
```

Une fois les clés générées, configurez-les :
- Côté client : ajoutez `VITE_VAPID_PUBLIC_KEY` dans votre fichier `.env`
- Côté serveur (Edge Functions) : configurez les secrets Supabase :
```bash
supabase secrets set VAPID_PUBLIC_KEY="votre_clé_publique"
supabase secrets set VAPID_PRIVATE_KEY="votre_clé_privée"
```

Ces valeurs se trouvent dans le dashboard Supabase du projet, sous **Project Settings → API**.

## Lancer le projet

```bash
bun install
bun run dev
```

L'application est ensuite disponible sur `http://localhost:3000` (ou le port affiché dans le terminal).

Utilisez toujours `bun install` (pas `npm install`) pour ce projet : `bun.lock` fait foi. Mélanger les deux génère un `package-lock.json` en doublon qui finit par diverger et provoquer des conflits git (voir l'avertissement en haut de ce fichier).

## Structure des données (Supabase)

La couche d'accès aux données vit dans `src/lib/supabase/`, découpée par domaine plutôt que dans un seul fichier :

- `core.ts` — types, mappers, infrastructure Storage partagée
- `bonsai.ts`, `photo.ts`, `journal.ts`, `rappel.ts`, `poterie.ts`, `evenement.ts` — CRUD par domaine
- `backup.ts` — export/import de sauvegarde

`src/lib/supabase-data.ts` reste le seul point d'import utilisé ailleurs dans l'app (`@/lib/supabase-data`) — il réexporte tout ce qui précède. Ne pas importer directement depuis `@/lib/supabase/*` en dehors de ce dossier.

## Pourquoi ce fichier

Ce README sert de mémoire externe : il évite d'avoir à redécouvrir la configuration nécessaire (variables, commandes) à chaque fois qu'on revient sur le projet après une pause.
