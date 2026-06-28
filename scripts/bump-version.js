#!/usr/bin/env node
/**
 * Script d'incrémentation automatique de version
 * Usage: node scripts/bump-version.js [patch|minor|major]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VERSION_FILE = path.join(__dirname, '../src/lib/version.ts');

// Récupérer le type d'incrémentation depuis les arguments
const incrementType = process.argv[2] || 'patch';

if (!['patch', 'minor', 'major'].includes(incrementType)) {
  console.error('Usage: node scripts/bump-version.js [patch|minor|major]');
  process.exit(1);
}

// Lire le fichier version actuel
let versionContent;
try {
  versionContent = fs.readFileSync(VERSION_FILE, 'utf-8');
} catch (error) {
  console.error('Erreur: impossible de lire le fichier version.ts');
  process.exit(1);
}

// Extraire la version actuelle
const versionMatch = versionContent.match(/export const APP_VERSION = "(\d+)\.(\d+)\.(\d+)"/);
if (!versionMatch) {
  console.error('Erreur: format de version non trouvé dans version.ts');
  process.exit(1);
}

const [_, major, minor, patch] = versionMatch.map(Number);
let newMajor = major;
let newMinor = minor;
let newPatch = patch;

// Incrémenter selon le type
switch (incrementType) {
  case 'patch':
    newPatch++;
    break;
  case 'minor':
    newMinor++;
    newPatch = 0;
    break;
  case 'major':
    newMajor++;
    newMinor = 0;
    newPatch = 0;
    break;
}

const newVersion = `${newMajor}.${newMinor}.${newPatch}`;
const newDate = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD

// Mettre à jour le fichier
const newVersionContent = versionContent.replace(
  /export const APP_VERSION = "\d+\.\d+\.\d+"/,
  `export const APP_VERSION = "${newVersion}"`
).replace(
  /export const APP_VERSION_DATE = "\d{4}-\d{2}-\d{2}"/,
  `export const APP_VERSION_DATE = "${newDate}"`
);

try {
  fs.writeFileSync(VERSION_FILE, newVersionContent, 'utf-8');
  console.log(`✅ Version mise à jour: ${newVersion} (${newDate})`);
  console.log(`📝 Fichier modifié: ${VERSION_FILE}`);
} catch (error) {
  console.error('Erreur: impossible d\'écrire le fichier version.ts');
  process.exit(1);
}
