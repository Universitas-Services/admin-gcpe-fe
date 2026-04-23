import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthOnLoad: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  status: "idle",
  user: null,

  login: async (email: string, password: string) => {
    set({ status: "loading" });
    try {
      // TODO: Integrar con authService.login()
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({
        isAuthenticated: true,
        status: "authenticated",
        user: {
          id: "1",
          name: "Admin GCPE",
          email: email || "admin@universitas.edu",
          role: "admin",
        },
      });
    } catch {
      set({ status: "unauthenticated", isAuthenticated: false, user: null });
    }
  },

  logout: async () => {
    set({ status: "loading" });
    try {
      // TODO: Integrar con authService.logout()
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      set({ isAuthenticated: false, status: "unauthenticated", user: null });
    }
  },

  checkAuthOnLoad: () => {
    // TODO: Verificar token en localStorage/cookies
    // Por ahora, simular usuario autenticado para desarrollo
    set({
      isAuthenticated: true,
      status: "authenticated",
      user: {
        id: "1",
        name: "Admin GCPE",
        email: "admin@universitas.edu",
        role: "admin",
      },
    });
  },
}));
