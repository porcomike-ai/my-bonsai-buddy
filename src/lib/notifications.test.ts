import type { Evenement } from "./supabase-data";
import { triggerTimeFor } from "./notifications";
import { describe, expect, test } from "vitest";

const baseEvenement: Evenement = {
  id: "evt-1",
  titre: "Rempotage",
  dateHeure: "2024-06-15T14:30:00.000Z",
  createdAt: "2024-06-01T10:00:00.000Z",
};

describe("triggerTimeFor", () => {
  test("retourne l'heure de l'événement sans rappel", () => {
    const eventTime = new Date(baseEvenement.dateHeure).getTime();

    expect(triggerTimeFor(baseEvenement)).toBe(eventTime);
    expect(triggerTimeFor({ ...baseEvenement, rappelMinutes: undefined })).toBe(eventTime);
    expect(triggerTimeFor({ ...baseEvenement, rappelMinutes: 0 })).toBe(eventTime);
  });

  test("soustrait rappelMinutes avant l'heure de l'événement", () => {
    const eventTime = new Date(baseEvenement.dateHeure).getTime();

    expect(triggerTimeFor({ ...baseEvenement, rappelMinutes: 15 })).toBe(
      eventTime - 15 * 60_000,
    );
    expect(triggerTimeFor({ ...baseEvenement, rappelMinutes: 60 })).toBe(
      eventTime - 60 * 60_000,
    );
    expect(triggerTimeFor({ ...baseEvenement, rappelMinutes: 1440 })).toBe(
      eventTime - 1440 * 60_000,
    );
  });
});
