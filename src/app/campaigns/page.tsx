"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { CampaignCard } from "@/features/campaigns/components/campaign-card";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { SectionHeader } from "@/components/common/section-header";
import { PrimaryButton } from "@/components/common/primary-button";
import { useCampaigns } from "@/features/campaigns/api/use-campaigns";
import { SkeletonState } from "@/components/common/skeleton-state";
import { LoadingState } from "@/components/common/loading-state";
import { isDemoMode } from "@/lib/config/demo";
import { useCampaignStore } from "@/features/campaigns/store/campaign-store";
import { Campaign } from "@/lib/mock/data";
import { useOrphanageStore, VerificationStatus } from "@/features/orphanages/store/orphanage-store";

type CampaignListItem = Campaign & {
  orphanageVerificationStatus?: VerificationStatus;
};

export default function CampaignsPage() {
  const query = useCampaigns();
  const localCampaigns = useCampaignStore((state) => state.campaigns);
  const orphanages = useOrphanageStore((state) => state.orphanages);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const mergedCampaigns = useMemo<CampaignListItem[]>(() => {
    const remoteCampaigns = query.data ?? [];
    const normalizedLocalCampaigns: CampaignListItem[] = localCampaigns.map((campaign) => {
      const orphanage = orphanages.find((item) => item.managerUserId === campaign.createdBy);
      return {
      id: campaign.id,
      title: campaign.title,
      orphanageName: orphanage?.name ?? "Panti Kamu",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
      location: orphanage?.location ?? "Indonesia",
      category: "Pendidikan",
      summary: campaign.description,
      story: campaign.description,
      itemsNeeded: [],
      impactExplanation: "Campaign lokal dibuat oleh pengelola panti di Pantiku.",
      anonymizedImpactStories: [],
      collected: campaign.currentAmount,
      goal: campaign.targetAmount,
      orphanageVerificationStatus: orphanage?.verificationStatus,
    };
    });

    if (isDemoMode) {
      const localIds = new Set(normalizedLocalCampaigns.map((item) => item.id));
      const dedupedRemote = remoteCampaigns.filter((item) => !localIds.has(item.id));
      return [...normalizedLocalCampaigns, ...dedupedRemote];
    }

    return normalizedLocalCampaigns;
  }, [localCampaigns, orphanages, query.data]);

  const categories = useMemo(() => {
    const items = mergedCampaigns.map((item) => item.category);
    return ["Semua", ...Array.from(new Set(items))];
  }, [mergedCampaigns]);

  const filteredCampaigns = useMemo(() => {
    return mergedCampaigns.filter((campaign) => {
      const matchSearch =
        campaign.title.toLowerCase().includes(search.toLowerCase()) ||
        campaign.orphanageName.toLowerCase().includes(search.toLowerCase()) ||
        campaign.location.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "Semua" || campaign.category === category;
      return matchSearch && matchCategory;
    });
  }, [mergedCampaigns, search, category]);

  if (!hydrated) {
    return <LoadingState message="Memuat campaign..." />;
  }

  return (
    <section>
      <SectionHeader
        eyebrow="Campaign Produktif"
        title="Jelajahi Campaign"
        description="Pilih program yang mendorong anak bertumbuh dan panti menjadi lebih mandiri."
      />
      {isDemoMode ? (
        <div className="mb-4 inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
          Mode Demo — data hanya contoh
        </div>
      ) : null}
      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_220px]">
        <input
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2"
          placeholder="Cari campaign, panti, atau lokasi..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          className="rounded-md border border-slate-300 bg-white px-3 py-2"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {query.isLoading && localCampaigns.length === 0 ? <SkeletonState count={6} /> : null}
      {query.isError && localCampaigns.length === 0 && !isDemoMode ? <ErrorState onRetry={() => query.refetch()} /> : null}
      {!query.isLoading && filteredCampaigns.length === 0 ? (
        <div className="space-y-4">
          <EmptyState
            title="Belum ada campaign tersedia"
            description="Belum ada campaign aktif. Pengelola panti bisa mulai membuat campaign dari dashboard panti."
          />
          <div className="flex flex-wrap gap-2">
            <PrimaryButton href="/dashboard/panti/create-campaign" label="Buat Campaign" variant="outline" />
            <PrimaryButton href="/login" label="Masuk sebagai Panti" />
          </div>
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  );
}
