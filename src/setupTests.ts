import { vi } from "vitest";

// On simule ResizeObserver qui manque à jsdom
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));