import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { BonsaiForm } from "./bonsai-form";
import * as db from "@/lib/supabase-data";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1. Création d'un client de test pour le provider
const queryClient = new QueryClient();

// Fonction utilitaire pour envelopper le composant
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

// Mocks
vi.mock("@/lib/supabase-data", () => {
    return {
      saveBonsai: vi.fn(async () => ({})), // Déclaré comme une fonction fléchée explicite
      listPoteries: vi.fn(async () => []),
      uid: () => "mock-id",
      // Ajoutez ici tous les autres exports utilisés par le composant si nécessaire
    };
  });

vi.mock("@/components/supabase-auth-provider", () => ({
  useAuth: () => ({ user: { id: "user-123" } }),
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
}));

describe("BonsaiForm", () => {
  test("affiche des erreurs si on soumet sans nom ni espèce", async () => {
    renderWithProviders(<BonsaiForm />);
    
    const submitButton = screen.getByRole("button", { name: /ajouter à la collection/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/donnez un nom à votre bonsaï/i)).toBeInTheDocument();
    expect(await screen.findByText(/indiquez l'espèce/i)).toBeInTheDocument();
    expect(db.saveBonsai).not.toHaveBeenCalled();
  });

  test("appelle saveBonsai avec les bonnes données quand le formulaire est valide", async () => {
    renderWithProviders(<BonsaiForm />);

    fireEvent.change(screen.getByPlaceholderText(/vieux pin du jardin/i), { target: { value: "Mon Bonsaï" } });
    fireEvent.change(screen.getByPlaceholderText(/pinus parviflora/i), { target: { value: "Pinus" } });

    const submitButton = screen.getByRole("button", { name: /ajouter à la collection/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(db.saveBonsai).toHaveBeenCalled();
    });
  });
});