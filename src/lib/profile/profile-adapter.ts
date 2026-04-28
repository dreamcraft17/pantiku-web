import { AppUser } from "@/lib/api/auth";
import { formatRupiah } from "@/lib/utils/format";
import { mockCampaigns } from "@/lib/mock/data";
import { donorProfileDemo, orphanageProfileDemo, volunteerProfileDemo } from "./profile-demo-data";
import { donorProfileEmpty, orphanageProfileEmpty, volunteerProfileEmpty } from "./profile-empty-data";
import { DonorProfileData, OrphanageProfileData, VolunteerProfileData } from "./profile-types";
import type { ContributionRecord } from "@/features/contributions/store/contribution-store";
import type { ImpactUpdate } from "@/features/impact/store/impact-update-store";

function resolveUserName(user: AppUser | null | undefined) {
  return user?.fullName?.trim() || "Sahabat Pantiku";
}

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

function parseNumericValue(value: string) {
  const numeric = value.replace(/[^\d]/g, "");
  return Number.parseInt(numeric || "0", 10);
}

export function getDonorProfileData(
  user: AppUser | null | undefined,
  contributions: ContributionRecord[] = [],
  impactUpdates: ImpactUpdate[] = []
): DonorProfileData {
  const source = isDemoMode ? donorProfileDemo : donorProfileEmpty;
  const contributedAmount = contributions.reduce((sum, item) => sum + item.amount, 0);
  const uniqueCampaignCount = new Set(contributions.map((item) => item.campaignId)).size;
  const generatedHistory = contributions.map((item) => {
    const campaign = mockCampaigns.find((candidate) => candidate.id === item.campaignId);
    return {
      title: campaign?.title ?? "Campaign",
      date: new Date(item.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
      amount: formatRupiah(item.amount),
      status: "Berhasil",
    };
  });
  const totalDonations = isDemoMode ? parseNumericValue(source.stats[0].value) + contributedAmount : contributedAmount;
  const campaignsSupported = isDemoMode ? parseNumericValue(source.stats[1].value) + uniqueCampaignCount : uniqueCampaignCount;
  const contributionHistory = isDemoMode ? [...generatedHistory, ...source.contributionHistory] : generatedHistory;
  const supportedCampaignIds = new Set(contributions.map((item) => item.campaignId));
  const updatesFromSupportedCampaigns = impactUpdates
    .filter((item) => supportedCampaignIds.has(item.campaignId))
    .map((item) => {
      const campaign = mockCampaigns.find((candidate) => candidate.id === item.campaignId);
      return {
        campaignId: item.campaignId,
        campaignTitle: campaign?.title ?? "Campaign",
        title: item.title,
        description: item.description,
        date: item.date,
        authorRole: item.authorRole,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const resolvedImpactUpdates = isDemoMode ? [...updatesFromSupportedCampaigns, ...source.impactUpdates] : updatesFromSupportedCampaigns;

  return {
    ...source,
    userName: resolveUserName(user),
    stats: [
      { ...source.stats[0], value: formatRupiah(totalDonations) },
      { ...source.stats[1], value: String(campaignsSupported) },
      { ...source.stats[2], value: "0" },
    ],
    contributionHistory,
    recommendations: [],
    impactUpdates: resolvedImpactUpdates,
  };
}

export function getOrphanageProfileData(user: AppUser | null | undefined): OrphanageProfileData {
  const source = isDemoMode ? orphanageProfileDemo : orphanageProfileEmpty;
  return {
    ...source,
    managerName: resolveUserName(user),
    verificationStatus: user?.orphanageVerificationStatus ?? "PENDING",
  };
}

export function getVolunteerProfileData(user: AppUser | null | undefined): VolunteerProfileData {
  const source = isDemoMode ? volunteerProfileDemo : volunteerProfileEmpty;
  return {
    ...source,
    userName: resolveUserName(user),
  };
}
