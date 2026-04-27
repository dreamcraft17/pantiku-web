import { safeGet } from "./client";

export type ImpactSummaryResponse = {
  mode: "real" | "demo";
  isDemo: boolean;
  summary: {
    totalChildren: number;
    totalOrphanages: number;
    totalCampaigns: number;
    totalProductsSold: number;
    totalDonationsAmount: number;
  };
  message?: string | null;
};

export async function getImpactSummary() {
  return safeGet<ImpactSummaryResponse | null>("/api/v1/impact/summary", null);
}

export async function getImpactStories() {
  return safeGet("/api/v1/impact/stories", []);
}
