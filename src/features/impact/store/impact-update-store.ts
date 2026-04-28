"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ImpactUpdate = {
  id: string;
  campaignId: string;
  title: string;
  description: string;
  date: string;
  authorRole: "ORPHANAGE_MANAGER" | "ADMIN";
  reviewStatus: "PENDING" | "REVIEWED" | "HIDDEN";
};

type ImpactUpdateState = {
  updates: ImpactUpdate[];
  addImpactUpdate: (update: Omit<ImpactUpdate, "reviewStatus"> & { reviewStatus?: ImpactUpdate["reviewStatus"] }) => void;
  updateImpactReviewStatus: (id: string, reviewStatus: ImpactUpdate["reviewStatus"]) => void;
  getUpdatesByCampaign: (campaignId: string) => ImpactUpdate[];
  clearImpactUpdates: () => void;
};

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

const demoUpdates: ImpactUpdate[] = [
  {
    id: "demo-impact-1",
    campaignId: "c1",
    title: "Mesin jahit pertama sudah dipakai",
    description: "Dua peserta sudah menyelesaikan sesi praktik pola dasar dan mulai produksi tote bag sederhana.",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    authorRole: "ORPHANAGE_MANAGER",
    reviewStatus: "PENDING",
  },
  {
    id: "demo-impact-2",
    campaignId: "c2",
    title: "Kelas baking batch awal berjalan",
    description: "Program dapur produktif dimulai. Fokus minggu ini pada standar higienitas dan pengemasan.",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    authorRole: "ORPHANAGE_MANAGER",
    reviewStatus: "PENDING",
  },
];

export const useImpactUpdateStore = create<ImpactUpdateState>()(
  persist(
    (set, get) => ({
      updates: isDemoMode ? demoUpdates : [],
      addImpactUpdate: (update) =>
        set((state) => ({
          updates: [{ ...update, reviewStatus: update.reviewStatus ?? "PENDING" }, ...state.updates],
        })),
      updateImpactReviewStatus: (id, reviewStatus) =>
        set((state) => ({
          updates: state.updates.map((item) => (item.id === id ? { ...item, reviewStatus } : item)),
        })),
      getUpdatesByCampaign: (campaignId) =>
        get()
          .updates.filter((item) => item.campaignId === campaignId && item.reviewStatus !== "HIDDEN")
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      clearImpactUpdates: () => set({ updates: [] }),
    }),
    { name: "pantiku-web-impact-updates" }
  )
);

