export type ProfileStat = {
  label: string;
  value: string;
  helper?: string;
};

export type ProfileCta = {
  label: string;
  href: string;
};

export type DonorContributionHistoryItem = {
  title: string;
  date: string;
  amount: string;
  status: string;
};

export type DonorRecommendationItem = {
  title: string;
  href: string;
  tag: string;
};

export type DonorProfileData = {
  isDemoData: boolean;
  userName: string;
  welcomeMessage: string;
  ctas: [ProfileCta, ProfileCta];
  stats: [ProfileStat, ProfileStat, ProfileStat];
  contributionHistory: DonorContributionHistoryItem[];
  recommendations: DonorRecommendationItem[];
};

export type OrphanageCampaignSummaryItem = {
  name: string;
  progress: string;
  raised: string;
};

export type OrphanageProductSummaryItem = {
  name: string;
  status: string;
};

export type OrphanageProfileData = {
  isDemoData: boolean;
  managerName: string;
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED";
  welcomeMessage: string;
  ctas: [ProfileCta, ProfileCta];
  orphanageName: string;
  location: string;
  stats: [ProfileStat, ProfileStat, ProfileStat];
  campaignSummary: OrphanageCampaignSummaryItem[];
  productSummary: OrphanageProductSummaryItem[];
};

export type VolunteerUpcomingActivityItem = {
  title: string;
  date: string;
  location: string;
};

export type VolunteerOpportunityItem = {
  title: string;
  href: string;
  type: string;
};

export type VolunteerProfileData = {
  isDemoData: boolean;
  userName: string;
  welcomeMessage: string;
  ctas: [ProfileCta, ProfileCta];
  focusArea: string;
  stats: [ProfileStat, ProfileStat, ProfileStat];
  upcomingActivities: VolunteerUpcomingActivityItem[];
  opportunities: VolunteerOpportunityItem[];
};
