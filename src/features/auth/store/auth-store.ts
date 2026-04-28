"use client";

import { persist } from "zustand/middleware";
import { create } from "zustand";
import { AppUser } from "@/lib/api/auth";

type AuthState = {
  token: string | null;
  refreshToken: string | null;
  role: "ADMIN" | "ORPHANAGE_MANAGER" | "DONOR" | "VOLUNTEER" | null;
  user: AppUser | null;
  setTokens: (token: string | null, refreshToken: string | null, role?: AuthState["role"], user?: AppUser | null) => void;
  setRole: (role: AuthState["role"]) => void;
  setUser: (user: AppUser | null) => void;
  clearAuth: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      role: null,
      user: null,
      setTokens: (token, refreshToken, role, user) =>
        set((state) => ({
          token,
          refreshToken,
          role: role ?? state.role,
          user: user ?? state.user,
        })),
      setRole: (role) => set({ role }),
      setUser: (user) => set({ user }),
      clearAuth: () => set({ token: null, refreshToken: null, role: null, user: null }),
      logout: () => set({ token: null, refreshToken: null, role: null, user: null }),
    }),
    { name: "pantiku-web-auth" }
  )
);
