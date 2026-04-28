"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LocalCampaign = {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  createdAt: string;
  createdBy: string;
  status: "DRAFT" | "ACTIVE" | "PAUSED" | "REJECTED";
  rejectionReason?: string;
};

type CampaignState = {
  campaigns: LocalCampaign[];
  addCampaign: (campaign: LocalCampaign) => void;
  updateCampaign: (id: string, payload: Partial<LocalCampaign>) => void;
  getCampaigns: () => LocalCampaign[];
  getCampaignById: (id: string) => LocalCampaign | undefined;
  clearCampaigns: () => void;
};

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set, get) => ({
      campaigns: [],
      addCampaign: (campaign) =>
        set((state) => ({
          campaigns: [campaign, ...state.campaigns],
        })),
      updateCampaign: (id, payload) =>
        set((state) => ({
          campaigns: state.campaigns.map((item) => (item.id === id ? { ...item, ...payload } : item)),
        })),
      getCampaigns: () => get().campaigns,
      getCampaignById: (id) => get().campaigns.find((campaign) => campaign.id === id),
      clearCampaigns: () => set({ campaigns: [] }),
    }),
    { name: "pantiku-web-campaigns" }
  )
);

