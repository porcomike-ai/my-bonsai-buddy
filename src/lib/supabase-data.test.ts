import type { BonsaiRow, PoterieRow } from "@/integrations/supabase/domain-types";
import type { Bonsai, Poterie } from "./supabase-data";
import {
  bonsaiToRow,
  base64ToBlob,
  blobToBase64,
  poterieToRow,
  rowToBonsai,
  rowToPoterie,
  ageActuel,
} from "./supabase-data";
import { describe, expect, test } from "vitest";

const bonsaiRowBase: BonsaiRow = {
  id: "bonsai-1",
  user_id: "user-1",
  nom: "Mon pin",
  espece: "Pin noir",
  style: "moyogi",
  etape: "bonsai",
  age_estime: 12,
  date_acquisition: "2020-03-15",
  origine: "Japon",
  hauteur_cm: 35,
  prix_achat: 120,
  valeur_estimee: 450,
  photo_principale_path: "user-1/bonsai-1/photo-1.jpg",
  poterie_id: "poterie-1",
  notes: "Belle nebari",
  dans_collection: true,
  favori: true,
  created_at: "2024-01-10T08:00:00.000Z",
  updated_at: "2024-06-01T12:00:00.000Z",
};

const poterieRowBase: PoterieRow = {
  id: "poterie-1",
  user_id: "user-1",
  nom: "Tokoname ovale",
  longueur_cm: 18,
  largeur_cm: 14,
  hauteur_cm: 6,
  forme: "ovale",
  couleur: "brun",
  matiere: "grès",
  artisan: "Yamada",
  origine: "Japon",
  prix: 85,
  photo_path: "user-1/poterie-1.jpg",
  notes: "Émaillée",
  created_at: "2024-02-01T09:00:00.000Z",
  updated_at: "2024-02-01T09:00:00.000Z",
};

describe("rowToBonsai / bonsaiToRow", () => {
  test("mappe snake_case vers camelCase", () => {
    const bonsai = rowToBonsai(bonsaiRowBase);

    expect(bonsai).toEqual({
      id: "bonsai-1",
      nom: "Mon pin",
      espece: "Pin noir",
      style: "moyogi",
      etape: "bonsai",
      ageEstime: 12,
      dateAcquisition: "2020-03-15",
      origine: "Japon",
      hauteurCm: 35,
      prixAchat: 120,
      valeurEstimee: 450,
      photoPrincipale: "user-1/bonsai-1/photo-1.jpg",
      poterieId: "poterie-1",
      notes: "Belle nebari",
      dansCollection: true,
      favori: true,
      createdAt: "2024-01-10T08:00:00.000Z",
    } satisfies Bonsai);
  });

  test("convertit null en undefined", () => {
    const bonsai = rowToBonsai({
      ...bonsaiRowBase,
      etape: null,
      age_estime: null,
      date_acquisition: null,
      origine: null,
      hauteur_cm: null,
      prix_achat: null,
      valeur_estimee: null,
      photo_principale_path: null,
      poterie_id: null,
      notes: null,
    });

    expect(bonsai.etape).toBeUndefined();
    expect(bonsai.ageEstime).toBeUndefined();
    expect(bonsai.dateAcquisition).toBeUndefined();
    expect(bonsai.origine).toBeUndefined();
    expect(bonsai.hauteurCm).toBeUndefined();
    expect(bonsai.prixAchat).toBeUndefined();
    expect(bonsai.valeurEstimee).toBeUndefined();
    expect(bonsai.photoPrincipale).toBeUndefined();
    expect(bonsai.poterieId).toBeUndefined();
    expect(bonsai.notes).toBeUndefined();
  });

  test("aller-retour row → domaine → row", () => {
    const bonsai = rowToBonsai(bonsaiRowBase);
    const row = bonsaiToRow(bonsai);

    expect(row).toEqual({
      id: "bonsai-1",
      nom: "Mon pin",
      espece: "Pin noir",
      style: "moyogi",
      etape: "bonsai",
      age_estime: 12,
      date_acquisition: "2020-03-15",
      origine: "Japon",
      hauteur_cm: 35,
      prix_achat: 120,
      valeur_estimee: 450,
      photo_principale_path: "user-1/bonsai-1/photo-1.jpg",
      poterie_id: "poterie-1",
      notes: "Belle nebari",
      dans_collection: true,
      favori: true,
    });
  });

  test("ignore les champs undefined dans bonsaiToRow", () => {
    expect(bonsaiToRow({})).toEqual({});
    expect(bonsaiToRow({ nom: "Sans champs optionnels", espece: "Érable" })).toEqual({
      nom: "Sans champs optionnels",
      espece: "Érable",
    });
    expect(bonsaiToRow({ notes: undefined, favori: false })).toEqual({ favori: false });
  });
});

describe("rowToPoterie / poterieToRow", () => {
  test("mappe snake_case vers camelCase", () => {
    const poterie = rowToPoterie(poterieRowBase);

    expect(poterie).toEqual({
      id: "poterie-1",
      nom: "Tokoname ovale",
      longueurCm: 18,
      largeurCm: 14,
      hauteurCm: 6,
      forme: "ovale",
      couleur: "brun",
      matiere: "grès",
      artisan: "Yamada",
      origine: "Japon",
      prix: 85,
      photoPath: "user-1/poterie-1.jpg",
      notes: "Émaillée",
      createdAt: "2024-02-01T09:00:00.000Z",
    } satisfies Poterie);
  });

  test("convertit null en undefined", () => {
    const poterie = rowToPoterie({
      ...poterieRowBase,
      longueur_cm: null,
      largeur_cm: null,
      hauteur_cm: null,
      forme: null,
      couleur: null,
      matiere: null,
      artisan: null,
      origine: null,
      prix: null,
      photo_path: null,
      notes: null,
    });

    expect(poterie.longueurCm).toBeUndefined();
    expect(poterie.largeurCm).toBeUndefined();
    expect(poterie.hauteurCm).toBeUndefined();
    expect(poterie.forme).toBeUndefined();
    expect(poterie.couleur).toBeUndefined();
    expect(poterie.matiere).toBeUndefined();
    expect(poterie.artisan).toBeUndefined();
    expect(poterie.origine).toBeUndefined();
    expect(poterie.prix).toBeUndefined();
    expect(poterie.photoPath).toBeUndefined();
    expect(poterie.notes).toBeUndefined();
  });

  test("aller-retour row → domaine → row", () => {
    const poterie = rowToPoterie(poterieRowBase);
    const row = poterieToRow(poterie);

    expect(row).toEqual({
      id: "poterie-1",
      nom: "Tokoname ovale",
      longueur_cm: 18,
      largeur_cm: 14,
      hauteur_cm: 6,
      forme: "ovale",
      couleur: "brun",
      matiere: "grès",
      artisan: "Yamada",
      origine: "Japon",
      prix: 85,
      photo_path: "user-1/poterie-1.jpg",
      notes: "Émaillée",
    });
  });

  test("ignore les champs undefined dans poterieToRow", () => {
    expect(poterieToRow({})).toEqual({});
    expect(poterieToRow({ nom: "Pot simple" })).toEqual({ nom: "Pot simple" });
    expect(poterieToRow({ prix: undefined, forme: "rond" })).toEqual({ forme: "rond" });
  });
});

describe("blobToBase64 / base64ToBlob", () => {
  test("préserve les octets après encodage puis décodage", async () => {
    const originalBytes = Uint8Array.from([0, 1, 2, 127, 128, 255, 42, 99]);
    const originalBlob = new Blob([originalBytes], { type: "image/jpeg" });

    const encoded = await blobToBase64(originalBlob);
    expect(encoded.type).toBe("image/jpeg");

    const decodedBlob = base64ToBlob(encoded.data, encoded.type);
    const decodedBytes = new Uint8Array(await decodedBlob.arrayBuffer());

    expect(decodedBytes).toEqual(originalBytes);
    expect(decodedBlob.type).toBe("image/jpeg");
  });

  test("utilise application/octet-stream quand le blob n'a pas de type", async () => {
    const blob = new Blob([Uint8Array.from([10, 20, 30])]);
    const encoded = await blobToBase64(blob);

    expect(encoded.type).toBe("application/octet-stream");
    expect(new Uint8Array(await base64ToBlob(encoded.data, encoded.type).arrayBuffer())).toEqual(
      Uint8Array.from([10, 20, 30]),
    );
  });
});

describe("ageActuel", () => {
  test("retourne undefined si ageEstime n'est pas renseigné", () => {
    expect(ageActuel({ ageEstime: undefined, dateAcquisition: "2020-01-01" })).toBeUndefined();
    expect(ageActuel({ ageEstime: null, dateAcquisition: "2020-01-01" } as unknown as Parameters<typeof ageActuel>[0])).toBeUndefined();
  });

  test("retourne ageEstime tel quel si pas de date d'acquisition", () => {
    expect(ageActuel({ ageEstime: 35, dateAcquisition: undefined })).toBe(35);
    expect(ageActuel({ ageEstime: 10, dateAcquisition: "" as unknown as undefined })).toBe(10);
  });

  test("calcule l'âge actuel avec date d'acquisition dans le passé", () => {
    // Acquisition le 15 mars 2020, âge estimé 10 ans à l'acquisition
    // Au 1er janvier 2025 : pas encore passé le 15 mars → 10 + 4 = 14 ans
    const today = new Date("2025-01-01");
    expect(ageActuel({ ageEstime: 10, dateAcquisition: "2020-03-15" }, today)).toBe(14);

    // Au 20 mars 2025 : après le 15 mars → 10 + 5 = 15 ans
    const afterAnniversary = new Date("2025-03-20");
    expect(ageActuel({ ageEstime: 10, dateAcquisition: "2020-03-15" }, afterAnniversary)).toBe(15);

    // Le jour même de l'anniversaire
    const onAnniversary = new Date("2025-03-15");
    expect(ageActuel({ ageEstime: 10, dateAcquisition: "2020-03-15" }, onAnniversary)).toBe(15);
  });

  test("gère le cas où l'anniversaire n'est pas encore passé cette année", () => {
    // Acquisition le 1er décembre 2020,âge 5 ans
    // Au 15 juin 2025 : pas encore passé le 1er décembre → 5 + 4 = 9 ans
    const today = new Date("2025-06-15");
    expect(ageActuel({ ageEstime: 5, dateAcquisition: "2020-12-01" }, today)).toBe(9);
  });

  test("retourne au minimum ageEstime (pas d'âge négatif)", () => {
    // Si la date d'acquisition est dans le futur (donnée invalide), ne pas retourner d'âge négatif
    const today = new Date("2025-01-01");
    expect(ageActuel({ ageEstime: 10, dateAcquisition: "2026-01-01" }, today)).toBe(10);
  });

  test("calcul correct sur plusieurs années", () => {
    // Acquisition en 2015, âge 20 ans → en 2025, âge = 20 + 10 = 30 ans
    const today = new Date("2025-06-01");
    expect(ageActuel({ ageEstime: 20, dateAcquisition: "2015-03-01" }, today)).toBe(30);
  });
});
