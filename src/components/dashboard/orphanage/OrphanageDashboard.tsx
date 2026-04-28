"use client";

import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { ProtectedDashboard } from "@/components/dashboard/ProtectedDashboard";
import { EmptyState } from "@/components/common/empty-state";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useCampaignStore } from "@/features/campaigns/store/campaign-store";
import { useContributionStore } from "@/features/contributions/store/contribution-store";
import { useImpactUpdateStore } from "@/features/impact/store/impact-update-store";
import { useProductStore } from "@/features/marketplace/store/product-store";
import { useOrphanageStore } from "@/features/orphanages/store/orphanage-store";
import { isDemoMode } from "@/lib/config/demo";
import { formatRupiah } from "@/lib/utils/format";

export function OrphanageDashboard() {
  const user = useAuthStore((state) => state.user);
  const localCampaigns = useCampaignStore((state) => state.campaigns);
  const localProducts = useProductStore((state) => state.products);
  const contributions = useContributionStore((state) => state.contributions);
  const impactUpdates = useImpactUpdateStore((state) => state.updates);
  const orphanages = useOrphanageStore((state) => state.orphanages);
  const currentUserId = user?.id ?? user?.email ?? "orphanage-manager-local";
  const orphanageProfile = orphanages.find((item) => item.managerUserId === currentUserId);
  const verificationStatus = orphanageProfile?.verificationStatus;
  const ownedCampaigns = localCampaigns.filter((campaign) => campaign.createdBy === currentUserId);
  const ownedProducts = localProducts.filter((item) => item.createdBy === currentUserId);
  const activeProductsCount = ownedProducts.filter((product) => product.status === "ACTIVE").length;
  const ownedCampaignIds = new Set(ownedCampaigns.map((campaign) => campaign.id));
  const totalFundsCollected = contributions
    .filter((item) => ownedCampaignIds.has(item.campaignId))
    .reduce((sum, item) => sum + item.amount, ownedCampaigns.reduce((sum, item) => sum + item.currentAmount, 0));
  const orphanageUpdates = impactUpdates.filter((item) => item.authorRole === "ORPHANAGE_MANAGER" && ownedCampaignIds.has(item.campaignId));

  return (
    <ProtectedDashboard allowedRoles={["ORPHANAGE_MANAGER"]}>
      <DashboardLayout>
        <DashboardHeader
          title="Workspace Pengelola Panti"
          subtitle="Kelola panti, campaign, produk, dan update dampak dari satu dashboard operasional."
          badge={
            isDemoMode ? (
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">Demo data</span>
            ) : null
          }
          actions={
            <>
              <Link href="/dashboard/panti/verification" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
                Ajukan Verifikasi Panti
              </Link>
              <Link href="/dashboard/panti/create-campaign" className="rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
                Buat Campaign
              </Link>
              <Link href="/dashboard/panti/create-product" className="rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
                Tambah Produk
              </Link>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardStatCard label="Campaign Aktif" value={String(ownedCampaigns.length)} />
          <DashboardStatCard label="Produk Aktif" value={String(activeProductsCount)} />
          <DashboardStatCard label="Dana Terkumpul" value={formatRupiah(totalFundsCollected)} />
          <DashboardStatCard label="Update Dampak Dibagikan" value={String(orphanageUpdates.length)} />
        </div>

        <DashboardSection title="Status Verifikasi Panti">
          {!orphanageProfile ? (
            <EmptyState title="Belum ada status verifikasi" description="Ajukan verifikasi panti agar bisa mengelola campaign dan produk publik." />
          ) : null}
          {verificationStatus === "PENDING" ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">Menunggu verifikasi dari admin.</div>
          ) : null}
          {verificationStatus === "VERIFIED" ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">Panti terverifikasi. Kamu bisa lanjut operasional campaign dan produk.</div>
          ) : null}
          {verificationStatus === "REJECTED" ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
              Pengajuan ditolak. Alasan: {orphanageProfile?.rejectionReason ?? "Belum ada catatan."}
            </div>
          ) : null}
        </DashboardSection>

        <DashboardSection title="Campaign Management">
          {ownedCampaigns.length === 0 ? (
            <EmptyState title="Belum ada campaign" description="Belum ada campaign. Buat campaign pertama kamu." />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {ownedCampaigns.map((campaign) => (
                <QuickActionCard key={campaign.id} title={campaign.title} description={campaign.description} ctaLabel="Lihat Detail" href={`/campaigns/${campaign.id}`} />
              ))}
            </div>
          )}
        </DashboardSection>

        <DashboardSection title="Product Management">
          {ownedProducts.length === 0 ? (
            <EmptyState title="Belum ada produk" description="Belum ada produk. Tambah produk pertama kamu." />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {ownedProducts.map((product) => (
                <article key={product.id} className="rounded-xl border border-slate-200 p-4">
                  <p className="font-semibold text-slate-900">{product.name}</p>
                  <p className="mt-1 text-sm text-slate-600">Stok: {product.stock}</p>
                </article>
              ))}
            </div>
          )}
        </DashboardSection>

        <DashboardSection title="Impact Update Shortcut">
          {orphanageUpdates.length === 0 ? (
            <EmptyState title="Belum ada update dampak" description="Belum ada update dampak. Bagikan progres campaign dari profile." />
          ) : (
            <p className="text-sm text-slate-600">Kamu sudah membagikan {orphanageUpdates.length} update dampak.</p>
          )}
          <div className="mt-3">
            <Link href="/profile" className="rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
              Bagikan Update Dampak
            </Link>
          </div>
        </DashboardSection>
      </DashboardLayout>
    </ProtectedDashboard>
  );
}

