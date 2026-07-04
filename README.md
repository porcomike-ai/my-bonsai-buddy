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
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

- `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` : utilisées côté client (build Vite).
- `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` : utilisées côté serveur (SSR).
- `SUPABASE_SERVICE_ROLE_KEY` : clé admin, réservée aux routes serveur (`client.server.ts`). Ne jamais l'exposer côté client.

Ces valeurs se trouvent dans le dashboard Supabase du projet, sous **Project Settings → API**.

## Lancer le projet

```bash
npm install
npm run dev
```

L'application est ensuite disponible sur `http://localhost:3000` (ou le port affiché dans le terminal).

## Pourquoi ce fichier

Ce README sert de mémoire externe : il évite d'avoir à redécouvrir la configuration nécessaire (variables, commandes) à chaque fois qu'on revient sur le projet après une pause.
