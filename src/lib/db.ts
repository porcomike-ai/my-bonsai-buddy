import { openDB, type DBSchema, type IDBPDatabase } from "idb";

export type BonsaiStyle =
  | "chokkan"
  | "moyogi"
  | "shakan"
  | "kengai"
  | "han-kengai"
  | "bunjin"
  | "yose-ue"
  | "ishitsuki"
  | "autre";

export interface Bonsai {
  id: string;
  nom: string;
  espece: string;
  style: BonsaiStyle;
  ageEstime?: number;
  dateAcquisition?: string;
  origine?: string;
  hauteurCm?: number;
  prixAchat?: number;
  valeurEstimee?: number;
  photoPrincipale?: string;
  poterieId?: string;
  notes?: string;
  dansCollection?: boolean;
  createdAt: string;
}

export interface Photo {
  id: string;
  bonsaiId: string;
  blob: Blob;
  date: string;
  legende?: string;
}

export type SoinType =
  | "arrosage"
  | "taille"
  | "rempotage"
  | "fertilisation"
  | "traitement"
  | "ligature"
  | "autre";

export interface JournalEntry {
  id: string;
  bonsaiId: string;
  type: SoinType;
  date: string;
  notes?: string;
  rappelId?: string;
}

export interface Rappel {
  id: string;
  bonsaiId: string;
  type: SoinType;
  prochaineDate: string;
  intervalleJours?: number;
  notes?: string;
  actif: boolean;
}

export interface Poterie {
  id: string;
  nom: string;
  longueurCm?: number;
  largeurCm?: number;
  hauteurCm?: number;
  forme?: string;
  couleur?: string;
  matiere?: string;
  artisan?: string;
  origine?: string;
  prix?: number;
  photoBlob?: Blob;
  notes?: string;
  createdAt: string;
}

export interface Evenement {
  id: string;
  titre: string;
  description?: string;
  dateHeure: string; // ISO datetime
  rappelMinutes?: number; // minutes avant pour notifier
  notifiedAt?: string; // ISO date when notification was sent (anti-dup)
  bonsaiId?: string;
  createdAt: string;
}

interface BonsaiDB extends DBSchema {
  bonsais: { key: string; value: Bonsai };
  photos: { key: string; value: Photo; indexes: { "by-bonsai": string } };
  journal: { key: string; value: JournalEntry; indexes: { "by-bonsai": string; "by-date": string } };
  rappels: { key: string; value: Rappel; indexes: { "by-bonsai": string; "by-date": string } };
  poteries: { key: string; value: Poterie };
  evenements: { key: string; value: Evenement; indexes: { "by-date": string } };
}

let dbPromise: Promise<IDBPDatabase<BonsaiDB>> | null = null;

export function getDB() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB n'est disponible que côté client");
  }
  if (!dbPromise) {
    dbPromise = openDB<BonsaiDB>("bonsai-studio", 2, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore("bonsais", { keyPath: "id" });
          const photos = db.createObjectStore("photos", { keyPath: "id" });
          photos.createIndex("by-bonsai", "bonsaiId");
          const journal = db.createObjectStore("journal", { keyPath: "id" });
          journal.createIndex("by-bonsai", "bonsaiId");
          journal.createIndex("by-date", "date");
          const rappels = db.createObjectStore("rappels", { keyPath: "id" });
          rappels.createIndex("by-bonsai", "bonsaiId");
          rappels.createIndex("by-date", "prochaineDate");
          db.createObjectStore("poteries", { keyPath: "id" });
        }
        if (oldVersion < 2) {
          const ev = db.createObjectStore("evenements", { keyPath: "id" });
          ev.createIndex("by-date", "dateHeure");
        }
      },
    });
  }
  return dbPromise;
}

export function uid() {
  return crypto.randomUUID();
}

// --- Bonsais ---
export async function listBonsais(): Promise<Bonsai[]> {
  const db = await getDB();
  return db.getAll("bonsais");
}
export async function getBonsai(id: string) {
  const db = await getDB();
  return db.get("bonsais", id);
}
export async function saveBonsai(b: Bonsai) {
  const db = await getDB();
  await db.put("bonsais", b);
}
export async function deleteBonsai(id: string) {
  const db = await getDB();
  const tx = db.transaction(["bonsais", "photos", "journal", "rappels"], "readwrite");
  await tx.objectStore("bonsais").delete(id);
  for (const p of await tx.objectStore("photos").index("by-bonsai").getAllKeys(id)) {
    await tx.objectStore("photos").delete(p);
  }
  for (const j of await tx.objectStore("journal").index("by-bonsai").getAllKeys(id)) {
    await tx.objectStore("journal").delete(j);
  }
  for (const r of await tx.objectStore("rappels").index("by-bonsai").getAllKeys(id)) {
    await tx.objectStore("rappels").delete(r);
  }
  await tx.done;
}

// --- Photos ---
export async function listPhotos(bonsaiId: string): Promise<Photo[]> {
  const db = await getDB();
  return db.getAllFromIndex("photos", "by-bonsai", bonsaiId);
}
export async function getPhoto(id: string) {
  const db = await getDB();
  return db.get("photos", id);
}
export async function savePhoto(p: Photo) {
  const db = await getDB();
  await db.put("photos", p);
}
export async function deletePhoto(id: string) {
  const db = await getDB();
  await db.delete("photos", id);
}

// --- Journal ---
export async function listJournal(bonsaiId?: string): Promise<JournalEntry[]> {
  const db = await getDB();
  const all = bonsaiId
    ? await db.getAllFromIndex("journal", "by-bonsai", bonsaiId)
    : await db.getAll("journal");
  return all.sort((a, b) => b.date.localeCompare(a.date));
}
export async function saveJournal(e: JournalEntry) {
  const db = await getDB();
  await db.put("journal", e);
}
export async function deleteJournal(id: string) {
  const db = await getDB();
  await db.delete("journal", id);
}

// --- Rappels ---
export async function listRappels(bonsaiId?: string): Promise<Rappel[]> {
  const db = await getDB();
  const all = bonsaiId
    ? await db.getAllFromIndex("rappels", "by-bonsai", bonsaiId)
    : await db.getAll("rappels");
  return all.sort((a, b) => a.prochaineDate.localeCompare(b.prochaineDate));
}
export async function saveRappel(r: Rappel) {
  const db = await getDB();
  await db.put("rappels", r);
}
export async function deleteRappel(id: string) {
  const db = await getDB();
  await db.delete("rappels", id);
}

// --- Poteries ---
export async function listPoteries(): Promise<Poterie[]> {
  const db = await getDB();
  return db.getAll("poteries");
}
export async function getPoterie(id: string) {
  const db = await getDB();
  return db.get("poteries", id);
}
export async function savePoterie(p: Poterie) {
  const db = await getDB();
  await db.put("poteries", p);
}
export async function deletePoterie(id: string) {
  const db = await getDB();
  await db.delete("poteries", id);
}

// --- Évènements ---
export async function listEvenements(): Promise<Evenement[]> {
  const db = await getDB();
  const all = await db.getAll("evenements");
  return all.sort((a, b) => a.dateHeure.localeCompare(b.dateHeure));
}
export async function saveEvenement(e: Evenement) {
  const db = await getDB();
  await db.put("evenements", e);
}
export async function deleteEvenement(id: string) {
  const db = await getDB();
  await db.delete("evenements", id);
}
