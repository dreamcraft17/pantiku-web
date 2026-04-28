"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type OnboardingState = {
  hasOnboardedByUser: Record<string, boolean>;
  setOnboarded: (userKey: string, value: boolean) => void;
  hasOnboarded: (userKey: string) => boolean;
  clearOnboarding: () => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      hasOnboardedByUser: {},
      setOnboarded: (userKey, value) =>
        set((state) => ({
          hasOnboardedByUser: {
            ...state.hasOnboardedByUser,
            [userKey]: value,
          },
        })),
      hasOnboarded: (userKey) => Boolean(get().hasOnboardedByUser[userKey]),
      clearOnboarding: () => set({ hasOnboardedByUser: {} }),
    }),
    { name: "pantiku-web-onboarding" }
  )
);

