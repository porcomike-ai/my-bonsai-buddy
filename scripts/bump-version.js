#!/usr/bin/env node
/**
 * Script d'incrémentation automatique de version avec détection automatique du niveau
 * Usage: node scripts/bump-version.js [patch|minor|major|auto]
 * 
 * Détection automatique basée sur les conventions de commit:
 * - feat: → minor
 * - fix: → patch
 * - breaking change / BREAKING CHANGE → major
 * - Autres → patch
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VERSION_FILE = path.join(__dirname, '../src/lib/version.ts');

// Récupérer le type d'incrémentation depuis les arguments
const incrementType = process.argv[2] || 'auto';

if (!['patch', 'minor', 'major', 'auto'].includes(incrementType)) {
  console.error('Usage: node scripts/bump-version.js [patch|minor|major|auto]');
  process.exit(1);
}

// Fonction pour détecter automatiquement le type de version basé sur les commits
function detectVersionType() {
  try {
    // Récupérer les commits depuis la dernière version
    let commits;
    try {
      // Essayer d'abord avec git describe
      const lastTag = execSync('git describe --tags --abbrev=0', {
        encoding: 'utf-8',
        cwd: path.join(__dirname, '..'),
        stdio: ['pipe', 'pipe', 'ignore']
      }).trim();
      commits = execSync(`git log --pretty=format:"%s" ${lastTag}..HEAD`, {
        encoding: 'utf-8',
        cwd: path.join(__dirname, '..')
      }).trim().split('\n').filter(c => c);
    } catch {
      // Si pas de tag, prendre les 10 derniers commits
      commits = execSync('git log -10 --pretty=format:"%s"', {
        encoding: 'utf-8',
        cwd: path.join(__dirname, '..')
      }).trim().split('\n').filter(c => c);
    }

    if (commits.length === 0 || commits[0] === '') {
      console.log('ℹ️  Aucun nouveau commit détecté, version patch par défaut');
      return 'patch';
    }

    console.log(`📊 Analyse de ${commits.length} commit(s) pour déterminer le type de version:`);

    let hasBreakingChange = false;
    let hasFeature = false;
    let hasFix = false;

    for (const commit of commits) {
      const lowerCommit = commit.toLowerCase();
      
      // Vérifier breaking change
      if (lowerCommit.includes('breaking change') || lowerCommit.startsWith('breaking:')) {
        hasBreakingChange = true;
        console.log(`  🔴 Breaking change: ${commit}`);
      }
      // Vérifier feature
      else if (lowerCommit.startsWith('feat:') || lowerCommit.startsWith('feature:')) {
        hasFeature = true;
        console.log(`  🟢 Feature: ${commit}`);
      }
      // Vérifier fix
      else if (lowerCommit.startsWith('fix:')) {
        hasFix = true;
        console.log(`  🟡 Fix: ${commit}`);
      }
      else {
        console.log(`  ⚪ Autre: ${commit}`);
      }
    }

    if (hasBreakingChange) {
      console.log('✨ Détection: MAJOR (breaking change détecté)');
      return 'major';
    } else if (hasFeature) {
      console.log('✨ Détection: MINOR (nouvelle fonctionnalité détectée)');
      return 'minor';
    } else if (hasFix) {
      console.log('✨ Détection: PATCH (correction de bug détectée)');
      return 'patch';
    } else {
      console.log('✨ Détection: PATCH (par défaut)');
      return 'patch';
    }
  } catch (error) {
    console.warn('⚠️  Impossible d\'analyser les commits, version patch par défaut');
    return 'patch';
  }
}

// Déterminer le type d'incrémentation
const finalIncrementType = incrementType === 'auto' ? detectVersionType() : incrementType;

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
switch (finalIncrementType) {
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
