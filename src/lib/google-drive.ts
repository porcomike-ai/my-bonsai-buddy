// Synchronisation Google Drive (per-user OAuth via Google Identity Services).
// Scope `drive.file` : l'app ne voit que les fichiers qu'elle a créés.
//
// Format v2 :
//   - chaque photo est stockée en BINAIRE séparé (pas d'encodage base64)
//   - un manifest JSON gzippé (`bonsai-studio-manifest.json.gz`) référence
//     toutes les photos par leur ID Drive + empreinte SHA-256
//   - sauvegardes incrémentales : on ne ré-uploade que les photos modifiées,
//     on supprime les photos retirées en local, et on patche le manifest.

import type {
  LocalSnapshot,
  DriveManifest,
  ManifestPhotoEntry,
  ManifestPoteriePhoto,
} from "./backup";

const SCOPE = "https://www.googleapis.com/auth/drive.file";
const FOLDER_NAME = "Bonsaï Studio";
const MANIFEST_NAME = "bonsai-studio-manifest.json.gz";
const LEGACY_BACKUP_NAMES = ["bonsai-studio-backup.json.gz", "bonsai-studio-backup.json"];
const LS_CLIENT_ID = "bonsai.gdrive.clientId";
const LS_TOKEN = "bonsai.gdrive.token";
const LS_LAST_BACKUP = "bonsai.gdrive.lastBackup";
const LS_FOLDER_ID = "bonsai.gdrive.folderId";

interface TokenClient {
  requestAccessToken: (overrides?: { prompt?: string }) => void;
  callback: (resp: { access_token?: string; error?: string; expires_in?: number }) => void;
}
declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: TokenClient["callback"];
          }) => TokenClient;
          revoke: (token: string, done?: () => void) => void;
        };
      };
    };
  }
}

let gisLoaded: Promise<void> | null = null;
function loadGis(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  if (window.google?.accounts?.oauth2) return Promise.resolve();
  if (gisLoaded) return gisLoaded;
  gisLoaded = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Impossible de charger Google Identity Services"));
    document.head.appendChild(s);
  });
  return gisLoaded;
}

export function getClientId(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(LS_CLIENT_ID) || "";
}
export function setClientId(id: string): void {
  localStorage.setItem(LS_CLIENT_ID, id.trim());
}

interface StoredToken { access_token: string; expires_at: number }

// Persistance du jeton en localStorage pour permettre la reconnexion
// silencieuse au redémarrage de l'app. Le scope `drive.file` limite l'accès
// aux seuls fichiers créés par l'app, ce qui borne le risque en cas de XSS.
const LS_AUTO = "bonsai.gdrive.autoConnect";

function getStoredToken(): StoredToken | null {
  try {
    const raw = localStorage.getItem(LS_TOKEN) || sessionStorage.getItem(LS_TOKEN);
    if (!raw) return null;
    const t = JSON.parse(raw) as StoredToken;
    if (t.expires_at - 30_000 < Date.now()) return null;
    return t;
  } catch { return null; }
}
function storeToken(t: StoredToken): void {
  localStorage.setItem(LS_TOKEN, JSON.stringify(t));
  try { sessionStorage.removeItem(LS_TOKEN); } catch { /* ignore */ }
}
function clearToken(): void {
  try { localStorage.removeItem(LS_TOKEN); } catch { /* ignore */ }
  try { sessionStorage.removeItem(LS_TOKEN); } catch { /* ignore */ }
}

export function isConnected(): boolean { return getStoredToken() !== null; }
export function wasAutoConnectEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(LS_AUTO) === "1";
}

export function getLastBackup(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LS_LAST_BACKUP);
}
function setLastBackup(iso: string): void { localStorage.setItem(LS_LAST_BACKUP, iso); }

function requestToken(prompt: "" | "consent"): Promise<void> {
  const clientId = getClientId();
  if (!clientId) return Promise.reject(new Error("Client ID Google non configuré"));
  return loadGis().then(() => new Promise<void>((resolve, reject) => {
    const client = window.google!.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: SCOPE,
      callback: (resp) => {
        if (resp.error || !resp.access_token) {
          reject(new Error(resp.error || "Connexion refusée"));
          return;
        }
        storeToken({
          access_token: resp.access_token,
          expires_at: Date.now() + (resp.expires_in ?? 3600) * 1000,
        });
        resolve();
      },
    });
    client.requestAccessToken({ prompt });
  }));
}

export async function connect(): Promise<void> {
  await requestToken("consent");
  localStorage.setItem(LS_AUTO, "1");
}

/**
 * Tentative de reconnexion silencieuse au démarrage : utilise `prompt: ""`
 * pour réutiliser le consentement déjà accordé sans afficher de pop-up.
 * Résout `true` si un jeton valide a été obtenu, `false` sinon.
 */
export async function silentConnect(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (isConnected()) return true;
  if (!wasAutoConnectEnabled() || !getClientId()) return false;
  try {
    // Timeout de sécurité au cas où GIS ne rappellerait jamais (ex. cookies
    // tiers bloqués, fenêtre silencieuse fermée par le navigateur).
    await Promise.race([
      requestToken(""),
      new Promise<void>((_, rej) => setTimeout(() => rej(new Error("timeout")), 8000)),
    ]);
    return isConnected();
  } catch {
    return false;
  }
}

export async function disconnect(): Promise<void> {
  const tok = getStoredToken();
  if (tok && window.google?.accounts?.oauth2) {
    await new Promise<void>((r) => window.google!.accounts.oauth2.revoke(tok.access_token, () => r()));
  }
  clearToken();
  localStorage.removeItem(LS_FOLDER_ID);
  localStorage.removeItem(LS_AUTO);
}

async function readError(res: Response, fallback: string): Promise<string> {
  try {
    const data = await res.clone().json() as { error?: { message?: string; status?: string; errors?: { reason?: string; domain?: string }[] } };
    const msg = data.error?.message;
    const reason = data.error?.errors?.[0]?.reason;
    if (reason === "accessNotConfigured" || /Drive API has not been used/i.test(msg ?? "")) {
      return `Google Drive API non activée dans votre projet Google Cloud. Ouvrez « APIs & Services → Library », recherchez « Google Drive API » et cliquez sur « Activer », puis réessayez (${res.status}).`;
    }
    if (reason === "storageQuotaExceeded" || /quota/i.test(msg ?? "")) {
      return `Espace Google Drive insuffisant — libérez de la place ou videz la corbeille puis réessayez (${res.status}).`;
    }
    if (res.status === 429 || reason === "rateLimitExceeded" || reason === "userRateLimitExceeded") {
      return `Limite de débit Google Drive atteinte — patientez quelques secondes puis réessayez (${res.status}).`;
    }
    if (msg) return `${fallback} : ${msg} (${res.status})`;
  } catch { /* ignore */ }
  return `${fallback} (${res.status})`;
}

// Retry sur erreurs réseau / 5xx / 429 avec back-off exponentiel.
async function fetchWithRetry(url: string, init: RequestInit, attempts = 3): Promise<Response> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, init);
      if (res.status < 500 && res.status !== 429) return res;
      lastErr = new Error(`HTTP ${res.status}`);
    } catch (e) {
      lastErr = e;
    }
    if (i < attempts - 1) {
      await new Promise((r) => setTimeout(r, 400 * Math.pow(2, i) + Math.random() * 200));
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("Échec réseau Google Drive");
}

async function authedFetch(url: string, init: RequestInit = {}): Promise<Response> {
  const tok = getStoredToken();
  if (!tok) throw new Error("Non connecté à Google Drive — reconnectez-vous depuis Paramètres");
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${tok.access_token}`);
  const res = await fetchWithRetry(url, { ...init, headers });
  if (res.status === 401) {
    clearToken();
    throw new Error("Session Google expirée — reconnectez-vous");
  }
  return res;
}

async function verifyFolder(id: string): Promise<boolean> {
  const res = await authedFetch(`https://www.googleapis.com/drive/v3/files/${id}?fields=id,trashed`);
  if (!res.ok) return false;
  const data = await res.json() as { id?: string; trashed?: boolean };
  return !!data.id && !data.trashed;
}

async function ensureFolder(): Promise<string> {
  const cached = localStorage.getItem(LS_FOLDER_ID);
  if (cached && await verifyFolder(cached)) return cached;
  const q = encodeURIComponent(`name='${FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`);
  const res = await authedFetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name)&spaces=drive`);
  if (res.ok) {
    const data = await res.json() as { files: { id: string }[] };
    if (data.files.length > 0) {
      localStorage.setItem(LS_FOLDER_ID, data.files[0].id);
      return data.files[0].id;
    }
  } else if (res.status !== 404) {
    throw new Error(await readError(res, "Recherche du dossier échouée"));
  }
  const create = await authedFetch("https://www.googleapis.com/drive/v3/files", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: FOLDER_NAME, mimeType: "application/vnd.google-apps.folder" }),
  });
  if (!create.ok) throw new Error(await readError(create, "Création du dossier échouée"));
  const folder = await create.json() as { id: string };
  localStorage.setItem(LS_FOLDER_ID, folder.id);
  return folder.id;
}

async function findInFolder(folderId: string, name: string): Promise<{ id: string } | null> {
  const q = encodeURIComponent(`name='${name}' and '${folderId}' in parents and trashed=false`);
  const res = await authedFetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name)&spaces=drive`);
  if (!res.ok) return null;
  const data = await res.json() as { files: { id: string }[] };
  return data.files[0] ?? null;
}

async function gzipString(json: string): Promise<Blob> {
  const enc = new TextEncoder().encode(json);
  if (typeof CompressionStream !== "undefined") {
    const stream = new Response(new Blob([enc])).body!.pipeThrough(new CompressionStream("gzip"));
    return await new Response(stream).blob();
  }
  return new Blob([enc], { type: "application/json" });
}
async function maybeGunzip(buf: ArrayBuffer): Promise<string> {
  const bytes = new Uint8Array(buf);
  const isGzip = bytes.length > 2 && bytes[0] === 0x1f && bytes[1] === 0x8b;
  if (isGzip && typeof DecompressionStream !== "undefined") {
    const stream = new Response(new Blob([bytes])).body!.pipeThrough(new DecompressionStream("gzip"));
    return await new Response(stream).text();
  }
  return new TextDecoder().decode(bytes);
}

// ============================================================================
//  Upload binaire simple (Drive multipart : metadata + media)
// ============================================================================

async function uploadBinary(
  folderId: string,
  name: string,
  blob: Blob,
  existingId?: string,
): Promise<string> {
  const boundary = "-------bonsai" + Math.random().toString(36).slice(2);
  const metadata = existingId ? { name } : { name, parents: [folderId] };
  const head =
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\nContent-Type: ${blob.type || "application/octet-stream"}\r\n\r\n`;
  const tail = `\r\n--${boundary}--`;
  const body = new Blob([head, blob, tail], { type: `multipart/related; boundary=${boundary}` });
  const url = existingId
    ? `https://www.googleapis.com/upload/drive/v3/files/${existingId}?uploadType=multipart&fields=id`
    : `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id`;
  const res = await authedFetch(url, {
    method: existingId ? "PATCH" : "POST",
    headers: { "Content-Type": `multipart/related; boundary=${boundary}` },
    body,
  });
  if (!res.ok) {
    if (existingId && res.status === 404) {
      // L'ID en cache est mort — on retombe sur un POST.
      return uploadBinary(folderId, name, blob);
    }
    throw new Error(await readError(res, "Envoi d'un fichier échoué"));
  }
  const data = await res.json() as { id: string };
  return data.id;
}

async function downloadBinary(fileId: string): Promise<Blob> {
  const res = await authedFetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`);
  if (!res.ok) throw new Error(await readError(res, "Téléchargement d'une photo échoué"));
  return await res.blob();
}

async function deleteDriveFile(fileId: string): Promise<void> {
  await authedFetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, { method: "DELETE" });
}

async function fetchManifest(folderId: string): Promise<DriveManifest | null> {
  const file = await findInFolder(folderId, MANIFEST_NAME);
  if (!file) return null;
  const res = await authedFetch(`https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`);
  if (!res.ok) return null;
  const text = await maybeGunzip(await res.arrayBuffer());
  try {
    return JSON.parse(text) as DriveManifest;
  } catch {
    return null;
  }
}

async function uploadManifest(folderId: string, manifest: DriveManifest): Promise<void> {
  const existing = await findInFolder(folderId, MANIFEST_NAME);
  const gz = await gzipString(JSON.stringify(manifest));
  const blob = new Blob([gz], { type: gz.type === "application/json" ? "application/json" : "application/gzip" });
  await uploadBinary(folderId, MANIFEST_NAME, blob, existing?.id);
}

// ============================================================================
//  Synchronisation incrémentale
// ============================================================================

export interface SyncStats {
  uploaded: number;
  skipped: number;
  deleted: number;
  bytesUploaded: number;
}

export async function syncBackup(
  snapshot: LocalSnapshot,
  onProgress?: (msg: string, current: number, total: number) => void,
): Promise<SyncStats> {
  const folderId = await ensureFolder();
  const prev = await fetchManifest(folderId);

  const prevPhotos = new Map<string, ManifestPhotoEntry>();
  prev?.photos?.forEach((p) => prevPhotos.set(p.id, p));
  const prevPoterie = new Map<string, ManifestPoteriePhoto>();
  prev?.poteriePhotos?.forEach((p) => prevPoterie.set(p.poterieId, p));

  const stats: SyncStats = { uploaded: 0, skipped: 0, deleted: 0, bytesUploaded: 0 };
  const photoEntries: ManifestPhotoEntry[] = [];
  const poterieEntries: ManifestPoteriePhoto[] = [];

  const total = snapshot.photos.length + snapshot.poteriePhotos.length;
  let done = 0;

  for (const ph of snapshot.photos) {
    const prevEntry = prevPhotos.get(ph.id);
    let driveFileId: string;
    if (prevEntry && prevEntry.hash === ph.hash) {
      driveFileId = prevEntry.driveFileId;
      stats.skipped++;
    } else {
      onProgress?.(`Envoi photo ${ph.id.slice(0, 6)}…`, done, total);
      driveFileId = await uploadBinary(
        folderId,
        `photo-${ph.id}.jpg`,
        ph.blob,
        prevEntry?.driveFileId,
      );
      stats.uploaded++;
      stats.bytesUploaded += ph.blob.size;
    }
    photoEntries.push({
      id: ph.id,
      bonsaiId: ph.bonsaiId,
      date: ph.date,
      legende: ph.legende,
      hash: ph.hash,
      mime: ph.blob.type || "image/jpeg",
      size: ph.blob.size,
      driveFileId,
    });
    prevPhotos.delete(ph.id);
    onProgress?.("", ++done, total);
  }

  for (const pp of snapshot.poteriePhotos) {
    const prevEntry = prevPoterie.get(pp.poterieId);
    let driveFileId: string;
    if (prevEntry && prevEntry.hash === pp.hash) {
      driveFileId = prevEntry.driveFileId;
      stats.skipped++;
    } else {
      onProgress?.(`Envoi photo poterie ${pp.poterieId.slice(0, 6)}…`, done, total);
      driveFileId = await uploadBinary(
        folderId,
        `poterie-${pp.poterieId}.jpg`,
        pp.blob,
        prevEntry?.driveFileId,
      );
      stats.uploaded++;
      stats.bytesUploaded += pp.blob.size;
    }
    poterieEntries.push({
      poterieId: pp.poterieId,
      hash: pp.hash,
      mime: pp.blob.type || "image/jpeg",
      size: pp.blob.size,
      driveFileId,
    });
    prevPoterie.delete(pp.poterieId);
    onProgress?.("", ++done, total);
  }

  // Supprime les fichiers Drive devenus orphelins
  for (const orphan of prevPhotos.values()) {
    try { await deleteDriveFile(orphan.driveFileId); stats.deleted++; } catch { /* ignore */ }
  }
  for (const orphan of prevPoterie.values()) {
    try { await deleteDriveFile(orphan.driveFileId); stats.deleted++; } catch { /* ignore */ }
  }

  const manifest: DriveManifest = {
    version: 2,
    exportedAt: new Date().toISOString(),
    bonsais: snapshot.bonsais,
    poteries: snapshot.poteries,
    journal: snapshot.journal,
    rappels: snapshot.rappels,
    evenements: snapshot.evenements,
    photos: photoEntries,
    poteriePhotos: poterieEntries,
  };
  onProgress?.("Envoi du manifest…", done, total);
  await uploadManifest(folderId, manifest);

  // Nettoyage : supprime d'éventuelles anciennes sauvegardes v1 monolithiques.
  for (const legacy of LEGACY_BACKUP_NAMES) {
    const f = await findInFolder(folderId, legacy);
    if (f) { try { await deleteDriveFile(f.id); } catch { /* ignore */ } }
  }

  setLastBackup(new Date().toISOString());
  return stats;
}

export interface RestoreResult {
  manifest: DriveManifest;
  photosDownloaded: number;
}

export async function restoreFromDrive(
  onProgress?: (current: number, total: number) => void,
): Promise<RestoreResult | { legacy: true; payload: unknown } | null> {
  const folderId = await ensureFolder();
  const manifest = await fetchManifest(folderId);
  if (manifest) {
    const { applyManifest } = await import("./backup");
    await applyManifest(manifest, downloadBinary, onProgress);
    return { manifest, photosDownloaded: manifest.photos.length + manifest.poteriePhotos.length };
  }
  // Fallback : ancienne sauvegarde v1 monolithique
  for (const legacy of LEGACY_BACKUP_NAMES) {
    const file = await findInFolder(folderId, legacy);
    if (!file) continue;
    const res = await authedFetch(`https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`);
    if (!res.ok) continue;
    const text = await maybeGunzip(await res.arrayBuffer());
    return { legacy: true, payload: JSON.parse(text) };
  }
  return null;
}

// ============================================================================
//  Taille de la sauvegarde sur Drive
// ============================================================================

export interface BackupSize {
  totalBytes: number;
  fileCount: number;
  photoCount: number;
  manifestBytes: number;
}

export async function getBackupSize(): Promise<BackupSize | null> {
  if (!isConnected()) return null;
  const folderId = await ensureFolder();
  let totalBytes = 0;
  let fileCount = 0;
  let photoCount = 0;
  let manifestBytes = 0;
  let pageToken: string | undefined;
  do {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and trashed=false`,
      fields: "nextPageToken, files(id,name,size,mimeType)",
      spaces: "drive",
      pageSize: "1000",
    });
    if (pageToken) params.set("pageToken", pageToken);
    const res = await authedFetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`);
    if (!res.ok) throw new Error(await readError(res, "Lecture du dossier Drive échouée"));
    const data = await res.json() as {
      nextPageToken?: string;
      files: { id: string; name: string; size?: string; mimeType?: string }[];
    };
    for (const f of data.files) {
      const size = f.size ? Number(f.size) : 0;
      totalBytes += size;
      fileCount++;
      if (f.name === MANIFEST_NAME) manifestBytes = size;
      else if (f.name.startsWith("photo-") || f.name.startsWith("poterie-")) photoCount++;
    }
    pageToken = data.nextPageToken;
  } while (pageToken);
  return { totalBytes, fileCount, photoCount, manifestBytes };
}


// ============================================================================
//  Auto-sync au démarrage : si Drive est plus récent → on tire
// ============================================================================

export interface AutoSyncResult {
  status: "skipped" | "no-remote" | "up-to-date" | "pulled";
  reason?: string;
  remoteDate?: string;
  localDate?: string | null;
}

/**
 * Au démarrage de l'app :
 *  1. tente une reconnexion silencieuse,
 *  2. lit l'`exportedAt` du manifest distant,
 *  3. si plus récent que la dernière sauvegarde locale → restaure depuis Drive.
 */
export async function autoSyncFromDrive(
  onProgress?: (current: number, total: number) => void,
): Promise<AutoSyncResult> {
  const ok = await silentConnect();
  if (!ok) return { status: "skipped", reason: "Non connecté" };
  let folderId: string;
  try { folderId = await ensureFolder(); }
  catch { return { status: "skipped", reason: "Dossier Drive inaccessible" }; }
  const manifest = await fetchManifest(folderId);
  if (!manifest) return { status: "no-remote" };
  const remoteDate = manifest.exportedAt;
  const localDate = getLastBackup();
  if (localDate && Date.parse(remoteDate) <= Date.parse(localDate)) {
    return { status: "up-to-date", remoteDate, localDate };
  }
  const { applyManifest } = await import("./backup");
  await applyManifest(manifest, downloadBinary, onProgress);
  // Aligne la date locale avec celle du manifest restauré pour éviter
  // une boucle de re-téléchargement à chaque démarrage.
  localStorage.setItem(LS_LAST_BACKUP, remoteDate);
  return { status: "pulled", remoteDate, localDate };
}
