"use client";

import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { ProtectedDashboard } from "@/components/dashboard/ProtectedDashboard";
import { EmptyState } from "@/components/common/empty-state";
import { useCampaignStore } from "@/features/campaigns/store/campaign-store";
import { useContributionStore } from "@/features/contributions/store/contribution-store";
import { useImpactUpdateStore } from "@/features/impact/store/impact-update-store";
import { mockCampaigns } from "@/lib/mock/data";
import { formatRupiah } from "@/lib/utils/format";
import { isDemoMode } from "@/lib/config/demo";

export default function DonorDashboardPage() {
  const localCampaigns = useCampaignStore((state) => state.campaigns);
  const contributions = useContributionStore((state) => state.contributions);
  const impactUpdates = useImpactUpdateStore((state) => state.updates);
  const totalContributions = contributions.reduce((sum, item) => sum + item.amount, 0);
  const uniqueCampaignIds = Array.from(new Set(contributions.map((item) => item.campaignId)));
  const impactUpdatesFromSupportedCampaigns = impactUpdates
    .filter((item) => uniqueCampaignIds.includes(item.campaignId))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latestContribution = contributions
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  const recommendedCampaigns = (isDemoMode
    ? [
        ...localCampaigns.map((campaign) => ({
          id: campaign.id,
          title: campaign.title,
          summary: campaign.description,
        })),
        ...mockCampaigns.map((campaign) => ({
          id: campaign.id,
          title: campaign.title,
          summary: campaign.summary,
        })),
      ]
    : localCampaigns.map((campaign) => ({
        id: campaign.id,
        title: campaign.title,
        summary: campaign.description,
      }))
  ).slice(0, 3);
  const campaignTitleMap = new Map<string, string>([
    ...localCampaigns.map((campaign) => [campaign.id, campaign.title] as const),
    ...(isDemoMode ? mockCampaigns.map((campaign) => [campaign.id, campaign.title] as const) : []),
  ]);

  return (
    <ProtectedDashboard allowedRoles={["DONOR"]}>
      <DashboardLayout>
        <DashboardHeader
          title="Workspace Donor"
          subtitle="Kelola kontribusi, temukan campaign baru, dan pantau update dampak dari campaign yang kamu dukung."
          badge={
            isDemoMode ? (
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">Demo data</span>
            ) : null
          }
          actions={
            <>
              <Link href="/campaigns" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
                Jelajahi Campaign
              </Link>
              <Link href="/profile" className="rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
                Lihat Profil
              </Link>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <DashboardStatCard label="Total Kontribusi" value={formatRupiah(totalContributions)} helper="Akumulasi dukungan kamu" />
          <DashboardStatCard label="Campaign Didukung" value={String(uniqueCampaignIds.length)} helper="Campaign unik yang pernah didukung" />
          <DashboardStatCard
            label="Update Dampak Tersedia"
            value={String(impactUpdatesFromSupportedCampaigns.length)}
            helper="Update dari campaign yang kamu dukung"
          />
        </div>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          Mulai dengan mendukung campaign pertama kamu agar dampaknya bisa langsung kamu pantau.
        </section>

        <DashboardSection title="Recommended Campaigns" description="Pilih campaign produktif berikut untuk kontribusi berikutnya.">
          {recommendedCampaigns.length === 0 ? (
            <EmptyState title="Belum ada campaign tersedia" description="Campaign baru akan muncul setelah panti mitra mempublikasikan program." />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {recommendedCampaigns.map((campaign) => (
                <QuickActionCard
                  key={campaign.id}
                  title={campaign.title}
                  description={campaign.summary}
                  ctaLabel="Dukung Campaign"
                  href={`/campaigns/${campaign.id}`}
                />
              ))}
            </div>
          )}
        </DashboardSection>

        <DashboardSection title="Latest Contribution">
          {!latestContribution ? (
            <EmptyState title="Belum ada kontribusi. Mulai dengan mendukung campaign pertama kamu." description="Pilih campaign yang paling relevan untuk kamu dukung sekarang." />
          ) : (
            <article className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Kontribusi terakhir</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{formatRupiah(latestContribution.amount)}</p>
              <p className="mt-1 text-xs text-slate-500">
                {new Date(latestContribution.date).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </article>
          )}
        </DashboardSection>

        <DashboardSection title="Latest Impact Updates">
          {impactUpdatesFromSupportedCampaigns.length === 0 ? (
            <EmptyState
              title="Belum ada update dampak dari campaign yang kamu dukung"
              description="Update akan muncul setelah panti membagikan perkembangan campaign terkait."
            />
          ) : (
            <div className="space-y-3">
              {impactUpdatesFromSupportedCampaigns.slice(0, 5).map((update) => {
                return (
                  <article key={update.id} className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold text-emerald-700">{campaignTitleMap.get(update.campaignId) ?? "Campaign"}</p>
                    <p className="mt-1 font-semibold text-slate-900">{update.title}</p>
                    <p className="mt-2 text-sm text-slate-700">{update.description}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      {new Date(update.date).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </article>
                );
              })}
            </div>
          )}
        </DashboardSection>
      </DashboardLayout>
    </ProtectedDashboard>
  );
}
