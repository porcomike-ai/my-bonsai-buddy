import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JournalEntryDialog } from "./journal-entry-dialog";
import type { Bonsai } from "@/lib/supabase-data";

const { mockSaveJournal, mockDeleteJournal } = vi.hoisted(() => ({
  mockSaveJournal: vi.fn(async () => ({})),
  mockDeleteJournal: vi.fn(async () => ({})),
}));

vi.mock("@/lib/supabase-data", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/supabase-data")>();
  return {
    ...actual,
    saveJournal: mockSaveJournal,
    deleteJournal: mockDeleteJournal,
    uid: () => "mock-id",
  };
});

const queryClient = new QueryClient();
const renderWithProviders = (ui: React.ReactElement) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

const bonsaiDansCollection: Bonsai = {
  id: "b1",
  nom: "Pin noir",
  espece: "Pinus thunbergii",
  style: "moyogi",
  dansCollection: true,
} as Bonsai;

describe("JournalEntryDialog — sortie de collection", () => {
  beforeEach(() => {
    mockSaveJournal.mockClear();
    mockDeleteJournal.mockClear();
  });

  test("choisir « Mort » puis confirmer retire bien l'arbre de la collection", async () => {
    const onUpdateBonsai = vi.fn();
    const onOpenChange = vi.fn();

    renderWithProviders(
      <JournalEntryDialog
        bonsaiId="b1"
        bonsai={bonsaiDansCollection}
        entry={null}
        open={true}
        onOpenChange={onOpenChange}
        onUpdateBonsai={onUpdateBonsai}
      />,
    );

    fireEvent.change(screen.getByLabelText("Type d'événement"), {
      target: { value: "mort" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Enregistrer" }));

    // La confirmation de sortie de collection doit apparaître.
    expect(
      await screen.findByText("Cet arbre ne fait plus partie de votre collection ?"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Oui, retirer" }));

    await waitFor(() => {
      expect(mockSaveJournal).toHaveBeenCalledWith(
        expect.objectContaining({ bonsaiId: "b1", type: "mort" }),
      );
      expect(onUpdateBonsai).toHaveBeenCalledWith(
        expect.objectContaining({ dansCollection: false }),
      );
    });
  });

  test("choisir « Mort » puis refuser la confirmation garde l'arbre dans la collection", async () => {
    const onUpdateBonsai = vi.fn();

    renderWithProviders(
      <JournalEntryDialog
        bonsaiId="b1"
        bonsai={bonsaiDansCollection}
        entry={null}
        open={true}
        onOpenChange={vi.fn()}
        onUpdateBonsai={onUpdateBonsai}
      />,
    );

    fireEvent.change(screen.getByLabelText("Type d'événement"), {
      target: { value: "mort" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Enregistrer" }));

    expect(
      await screen.findByText("Cet arbre ne fait plus partie de votre collection ?"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Non, garder" }));

    // L'entrée est quand même enregistrée, mais le statut de l'arbre ne bouge pas.
    await waitFor(() => {
      expect(mockSaveJournal).toHaveBeenCalled();
    });
    expect(onUpdateBonsai).not.toHaveBeenCalled();
  });

  test("un type classique (ex. Rempotage) n'ouvre aucune confirmation", async () => {
    const onUpdateBonsai = vi.fn();

    renderWithProviders(
      <JournalEntryDialog
        bonsaiId="b1"
        bonsai={bonsaiDansCollection}
        entry={null}
        open={true}
        onOpenChange={vi.fn()}
        onUpdateBonsai={onUpdateBonsai}
      />,
    );

    fireEvent.change(screen.getByLabelText("Type d'événement"), {
      target: { value: "rempotage" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Enregistrer" }));

    await waitFor(() => {
      expect(mockSaveJournal).toHaveBeenCalledWith(
        expect.objectContaining({ type: "rempotage" }),
      );
    });
    expect(onUpdateBonsai).not.toHaveBeenCalled();
    expect(
      screen.queryByText("Cet arbre ne fait plus partie de votre collection ?"),
    ).not.toBeInTheDocument();
  });

  test("le type « Autre » sans précision bloque l'enregistrement", async () => {
    renderWithProviders(
      <JournalEntryDialog
        bonsaiId="b1"
        bonsai={bonsaiDansCollection}
        entry={null}
        open={true}
        onOpenChange={vi.fn()}
        onUpdateBonsai={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText("Type d'événement"), {
      target: { value: "autre" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Enregistrer" }));

    // Laisse le temps à un éventuel enregistrement asynchrone de se produire.
    await new Promise((r) => setTimeout(r, 50));
    expect(mockSaveJournal).not.toHaveBeenCalled();
  });

  test("le type « Autre » avec une précision s'enregistre normalement", async () => {
    renderWithProviders(
      <JournalEntryDialog
        bonsaiId="b1"
        bonsai={bonsaiDansCollection}
        entry={null}
        open={true}
        onOpenChange={vi.fn()}
        onUpdateBonsai={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText("Type d'événement"), {
      target: { value: "autre" },
    });
    fireEvent.change(screen.getByLabelText("Précisez (obligatoire)"), {
      target: { value: "Attaque de parasites inhabituelle" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Enregistrer" }));

    await waitFor(() => {
      expect(mockSaveJournal).toHaveBeenCalledWith(
        expect.objectContaining({ type: "autre", notes: "Attaque de parasites inhabituelle" }),
      );
    });
  });

  test("aucune confirmation redemandée si l'arbre est déjà sorti de la collection", async () => {
    const onUpdateBonsai = vi.fn();
    const bonsaiDejaSorti: Bonsai = { ...bonsaiDansCollection, dansCollection: false };

    renderWithProviders(
      <JournalEntryDialog
        bonsaiId="b1"
        bonsai={bonsaiDejaSorti}
        entry={null}
        open={true}
        onOpenChange={vi.fn()}
        onUpdateBonsai={onUpdateBonsai}
      />,
    );

    fireEvent.change(screen.getByLabelText("Type d'événement"), {
      target: { value: "don_vente" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Enregistrer" }));

    await waitFor(() => {
      expect(mockSaveJournal).toHaveBeenCalled();
    });
    expect(onUpdateBonsai).not.toHaveBeenCalled();
  });
});
