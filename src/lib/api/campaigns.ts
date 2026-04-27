import { Campaign, mockCampaigns } from "../mock/data";
import { safeGet, safePost } from "./client";
import { isDemoMode } from "../config/demo";

type CampaignApiItem = {
  id?: string;
  title?: string;
  description?: string;
  goalAmount?: string | number;
  collectedAmount?: string | number;
  orphanage?: {
    publicAlias?: string;
    location?: string;
  };
};

function inferCampaignCategory(title: string): Campaign["category"] {
  const lower = title.toLowerCase();
  if (lower.includes("digital") || lower.includes("teknologi")) return "Teknologi";
  if (lower.includes("oven") || lower.includes("kuliner")) return "Kuliner";
  if (lower.includes("jahit") || lower.includes("skill")) return "Keterampilan";
  return "Pendidikan";
}

function normalizeCampaign(input: CampaignApiItem): Campaign {
  const title = input?.title ?? "Campaign Produktif";
  const description = input?.description ?? "Program produktif panti sedang disiapkan.";
  return {
    id: String(input?.id ?? `campaign-${Date.now()}`),
    title,
    orphanageName: input?.orphanage?.publicAlias ?? "Panti Mitra Pantiku",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    location: input?.orphanage?.location ?? "Indonesia",
    category: inferCampaignCategory(title),
    summary: description.slice(0, 120),
    story: description,
    itemsNeeded: [],
    impactExplanation: "Dukungan diarahkan untuk program produktif dan kemandirian panti.",
    anonymizedImpactStories: [],
    collected: Number(input?.collectedAmount ?? 0),
    goal: Number(input?.goalAmount ?? 0),
  };
}

export async function getCampaigns() {
  const response = await safeGet<CampaignApiItem[] | unknown>("/api/v1/campaigns", isDemoMode ? mockCampaigns : []);
  if (!Array.isArray(response)) return [];
  return response.map((item) => normalizeCampaign(item as CampaignApiItem));
}

export async function getCampaignById(id: string) {
  const fallback = isDemoMode ? mockCampaigns.find((item) => item.id === id) ?? null : null;
  const response = await safeGet<CampaignApiItem | unknown>(`/api/v1/campaigns/${id}`, fallback);
  if (!response) return null;
  return normalizeCampaign(response as CampaignApiItem);
}

export async function donateToCampaign(id: string, amount: number) {
  return safePost(`/api/v1/campaigns/${id}/donate`, { amount }, { success: true });
}
