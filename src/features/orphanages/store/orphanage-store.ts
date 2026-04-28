"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isDemoMode } from "@/lib/config/demo";

export type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export type OrphanageProfile = {
  id: string;
  managerUserId: string;
  name: string;
  location: string;
  description?: string;
  verificationStatus: VerificationStatus;
  submittedAt: string;
  reviewedAt?: string;
  rejectionReason?: string;
};

type OrphanageState = {
  orphanages: OrphanageProfile[];
  submitOrphanageProfile: (profile: OrphanageProfile) => void;
  getOrphanageByManagerId: (userId: string) => OrphanageProfile | undefined;
  getPendingOrphanages: () => OrphanageProfile[];
  approveOrphanage: (id: string) => void;
  rejectOrphanage: (id: string, reason: string) => void;
  clearOrphanages: () => void;
};

const demoSeed: OrphanageProfile[] = isDemoMode
  ? [
      {
        id: "orphanage-demo-1",
        managerUserId: "manager-demo@pantiku.id",
        name: "Panti Demo Harmoni",
        location: "Jakarta",
        description: "Panti demo untuk simulasi alur verifikasi.",
        verificationStatus: "PENDING",
        submittedAt: new Date().toISOString(),
      },
    ]
  : [];

export const useOrphanageStore = create<OrphanageState>()(
  persist(
    (set, get) => ({
      orphanages: demoSeed,
      submitOrphanageProfile: (profile) =>
        set((state) => {
          const existingIndex = state.orphanages.findIndex((item) => item.managerUserId === profile.managerUserId);
          if (existingIndex === -1) {
            return { orphanages: [profile, ...state.orphanages] };
          }
          const updated = [...state.orphanages];
          updated[existingIndex] = profile;
          return { orphanages: updated };
        }),
      getOrphanageByManagerId: (userId) => get().orphanages.find((item) => item.managerUserId === userId),
      getPendingOrphanages: () => get().orphanages.filter((item) => item.verificationStatus === "PENDING"),
      approveOrphanage: (id) =>
        set((state) => ({
          orphanages: state.orphanages.map((item) =>
            item.id === id
              ? {
                  ...item,
                  verificationStatus: "VERIFIED",
                  reviewedAt: new Date().toISOString(),
                  rejectionReason: undefined,
                }
              : item
          ),
        })),
      rejectOrphanage: (id, reason) =>
        set((state) => ({
          orphanages: state.orphanages.map((item) =>
            item.id === id
              ? {
                  ...item,
                  verificationStatus: "REJECTED",
                  reviewedAt: new Date().toISOString(),
                  rejectionReason: reason,
                }
              : item
          ),
        })),
      clearOrphanages: () => set({ orphanages: [] }),
    }),
    { name: "pantiku-web-orphanages" }
  )
);

