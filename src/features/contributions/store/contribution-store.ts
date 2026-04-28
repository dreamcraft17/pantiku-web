"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ContributionRecord = {
  campaignId: string;
  amount: number;
  date: string;
};

type ContributionState = {
  contributions: ContributionRecord[];
  addContribution: (contribution: ContributionRecord) => void;
  clearContributions: () => void;
};

export const useContributionStore = create<ContributionState>()(
  persist(
    (set) => ({
      contributions: [],
      addContribution: (contribution) =>
        set((state) => ({
          contributions: [contribution, ...state.contributions],
        })),
      clearContributions: () => set({ contributions: [] }),
    }),
    { name: "pantiku-web-contributions" }
  )
);

