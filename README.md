# Bonsaï Studio

Carnet personnel pour gérer une collection de bonsaïs (fiches, journal de soins, rappels, calendrier, poteries).

## Prérequis

- Node.js 20 ou supérieur
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
npm install
npm run dev
```

L'application est ensuite disponible sur `http://localhost:3000` (ou le port affiché dans le terminal).

## Pourquoi ce fichier

Ce README sert de mémoire externe : il évite d'avoir à redécouvrir la configuration nécessaire (variables, commandes) à chaque fois qu'on revient sur le projet après une pause.
