"use client";

import { useMemo, useState } from "react";
import { CampaignCard } from "@/features/campaigns/components/campaign-card";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { SectionHeader } from "@/components/common/section-header";
import { PrimaryButton } from "@/components/common/primary-button";
import { useCampaigns } from "@/features/campaigns/api/use-campaigns";
import { SkeletonState } from "@/components/common/skeleton-state";
import { isDemoMode } from "@/lib/config/demo";

export default function CampaignsPage() {
  const query = useCampaigns();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  const categories = useMemo(() => {
    const items = query.data?.map((item) => item.category) ?? [];
    return ["Semua", ...Array.from(new Set(items))];
  }, [query.data]);

  const filteredCampaigns = useMemo(() => {
    const list = query.data ?? [];
    return list.filter((campaign) => {
      const matchSearch =
        campaign.title.toLowerCase().includes(search.toLowerCase()) ||
        campaign.orphanageName.toLowerCase().includes(search.toLowerCase()) ||
        campaign.location.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "Semua" || campaign.category === category;
      return matchSearch && matchCategory;
    });
  }, [query.data, search, category]);

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
      {query.isLoading ? <SkeletonState count={6} /> : null}
      {query.isError ? <ErrorState onRetry={() => query.refetch()} /> : null}
      {query.data && filteredCampaigns.length === 0 ? (
        <div className="space-y-4">
          <EmptyState
            title="Campaign pertama sedang disiapkan"
            description="Pantiku sedang menyiapkan campaign produktif bersama panti mitra. Nantikan campaign pertama yang sudah terverifikasi."
          />
          <div className="flex flex-wrap gap-2">
            <PrimaryButton href="/register" label="Daftarkan Panti" variant="outline" />
            <PrimaryButton href="/login" label="Hubungi Tim Pantiku" />
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
