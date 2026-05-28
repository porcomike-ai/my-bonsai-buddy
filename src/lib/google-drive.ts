// Synchronisation Google Drive (per-user OAuth via Google Identity Services).
// Utilise le scope `drive.file` : l'application ne voit QUE les fichiers
// qu'elle a créés (dossier "Bonsaï Studio" et la sauvegarde).

const SCOPE = "https://www.googleapis.com/auth/drive.file";
const FOLDER_NAME = "Bonsaï Studio";
const BACKUP_NAME = "bonsai-studio-backup.json";
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
function getStoredToken(): StoredToken | null {
  try {
    const raw = localStorage.getItem(LS_TOKEN);
    if (!raw) return null;
    const t = JSON.parse(raw) as StoredToken;
    if (t.expires_at - 30_000 < Date.now()) return null;
    return t;
  } catch { return null; }
}
function storeToken(t: StoredToken): void { localStorage.setItem(LS_TOKEN, JSON.stringify(t)); }
function clearToken(): void { localStorage.removeItem(LS_TOKEN); }

export function isConnected(): boolean { return getStoredToken() !== null; }

export function getLastBackup(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LS_LAST_BACKUP);
}
function setLastBackup(iso: string): void { localStorage.setItem(LS_LAST_BACKUP, iso); }

export async function connect(): Promise<void> {
  const clientId = getClientId();
  if (!clientId) throw new Error("Client ID Google non configuré");
  await loadGis();
  return new Promise<void>((resolve, reject) => {
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
    client.requestAccessToken({ prompt: "consent" });
  });
}

export async function disconnect(): Promise<void> {
  const tok = getStoredToken();
  if (tok && window.google?.accounts?.oauth2) {
    await new Promise<void>((r) => window.google!.accounts.oauth2.revoke(tok.access_token, () => r()));
  }
  clearToken();
}

async function authedFetch(url: string, init: RequestInit = {}): Promise<Response> {
  const tok = getStoredToken();
  if (!tok) throw new Error("Non connecté à Google Drive");
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${tok.access_token}`);
  const res = await fetch(url, { ...init, headers });
  if (res.status === 401) {
    clearToken();
    throw new Error("Session Google expirée — reconnectez-vous");
  }
  return res;
}

async function ensureFolder(): Promise<string> {
  const q = encodeURIComponent(
    `name='${FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
  );
  const res = await authedFetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name)&spaces=drive`);
  if (!res.ok) throw new Error(`Recherche du dossier échouée (${res.status})`);
  const data = await res.json() as { files: { id: string }[] };
  if (data.files.length > 0) return data.files[0].id;

  const create = await authedFetch("https://www.googleapis.com/drive/v3/files", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: FOLDER_NAME, mimeType: "application/vnd.google-apps.folder" }),
  });
  if (!create.ok) throw new Error(`Création du dossier échouée (${create.status})`);
  const folder = await create.json() as { id: string };
  return folder.id;
}

async function findBackupFile(folderId: string): Promise<string | null> {
  const q = encodeURIComponent(`name='${BACKUP_NAME}' and '${folderId}' in parents and trashed=false`);
  const res = await authedFetch(
    `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,modifiedTime)&spaces=drive`,
  );
  if (!res.ok) return null;
  const data = await res.json() as { files: { id: string }[] };
  return data.files[0]?.id ?? null;
}

export async function uploadBackup(payload: unknown): Promise<void> {
  const folderId = await ensureFolder();
  const existingId = await findBackupFile(folderId);
  const json = JSON.stringify(payload);

  const boundary = "-------bonsai" + Math.random().toString(36).slice(2);
  const metadata = existingId
    ? { name: BACKUP_NAME }
    : { name: BACKUP_NAME, parents: [folderId] };
  const body =
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\nContent-Type: application/json\r\n\r\n${json}\r\n--${boundary}--`;

  const url = existingId
    ? `https://www.googleapis.com/upload/drive/v3/files/${existingId}?uploadType=multipart`
    : `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`;
  const res = await authedFetch(url, {
    method: existingId ? "PATCH" : "POST",
    headers: { "Content-Type": `multipart/related; boundary=${boundary}` },
    body,
  });
  if (!res.ok) throw new Error(`Envoi de la sauvegarde échoué (${res.status})`);
  setLastBackup(new Date().toISOString());
}

export async function downloadBackup<T = unknown>(): Promise<T | null> {
  const folderId = await ensureFolder();
  const fileId = await findBackupFile(folderId);
  if (!fileId) return null;
  const res = await authedFetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`);
  if (!res.ok) throw new Error(`Téléchargement échoué (${res.status})`);
  return (await res.json()) as T;
}
