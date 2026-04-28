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
import { mockProducts } from "@/lib/mock/data";
import { formatRupiah } from "@/lib/utils/format";

export default function PantiDashboardPage() {
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
  const ownedLocalProducts = localProducts.filter((item) => item.createdBy === currentUserId);
  const ownedProducts = isDemoMode
    ? [
        ...ownedLocalProducts.map((product) => ({
          id: product.id,
          name: product.name,
          shortStory: product.description,
          stock: product.stock,
          status: product.status,
        })),
        ...mockProducts.slice(0, 2).map((product) => ({
          id: product.id,
          name: product.name,
          shortStory: product.shortStory,
          stock: product.stock,
          status: "ACTIVE" as const,
        })),
      ]
    : ownedLocalProducts.map((product) => ({
        id: product.id,
        name: product.name,
        shortStory: product.description,
        stock: product.stock,
        status: product.status,
      }));
  const activeProductsCount = ownedLocalProducts.filter((product) => product.status === "ACTIVE").length;
  const totalProductStock = ownedLocalProducts.reduce((sum, product) => sum + product.stock, 0);
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
          subtitle="Kelola campaign, produk marketplace, dan bagikan update dampak secara terstruktur."
          badge={
            isDemoMode ? (
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">Demo data</span>
            ) : null
          }
          actions={
            <>
              <Link href="/profile" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
                Bagikan Update Dampak
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
          <DashboardStatCard label="Total Dana Terkumpul" value={formatRupiah(totalFundsCollected)} />
          <DashboardStatCard label="Update Dampak Dibagikan" value={String(orphanageUpdates.length)} />
        </div>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          Buat campaign pertama untuk memulai activation panti dan membuka dukungan donor.
        </section>

        <DashboardSection title="Status Verifikasi Panti" description="Status ini menentukan apakah panti dapat membuat campaign publik.">
          {!orphanageProfile ? (
            <div className="space-y-3">
              <EmptyState title="Profil verifikasi belum diajukan" description="Ajukan verifikasi agar campaign dari panti kamu tampil sebagai campaign terpercaya." />
              <Link href="/dashboard/panti/verification" className="inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
                Ajukan Verifikasi Panti
              </Link>
            </div>
          ) : null}
          {verificationStatus === "PENDING" ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-800">Menunggu verifikasi</p>
              <p className="mt-1 text-sm text-amber-700">Tim admin sedang meninjau data panti kamu.</p>
            </div>
          ) : null}
          {verificationStatus === "VERIFIED" ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-800">Panti terverifikasi</p>
              <p className="mt-1 text-sm text-emerald-700">Campaign kamu dapat dipublikasikan dengan badge kepercayaan.</p>
            </div>
          ) : null}
          {verificationStatus === "REJECTED" ? (
            <div className="space-y-3 rounded-xl border border-rose-200 bg-rose-50 p-4">
              <p className="text-sm font-semibold text-rose-800">Pengajuan ditolak</p>
              <p className="text-sm text-rose-700">Alasan: {orphanageProfile?.rejectionReason ?? "Belum ada catatan."}</p>
              <Link href="/dashboard/panti/verification" className="inline-flex rounded-lg border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100">
                Ajukan Ulang Verifikasi
              </Link>
            </div>
          ) : null}
        </DashboardSection>

        <DashboardSection title="Manajemen Campaign" description="Pantau campaign yang dikelola panti kamu.">
          {ownedCampaigns.length === 0 ? (
            <EmptyState title="Belum ada campaign. Buat campaign pertama kamu." description="Campaign pertama adalah langkah awal untuk mulai menggalang dukungan produktif." />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {ownedCampaigns.map((campaign) => (
                <QuickActionCard
                  key={campaign.id}
                  title={campaign.title}
                  description={campaign.description}
                  ctaLabel="Lihat Detail"
                  href={`/campaigns/${campaign.id}`}
                />
              ))}
            </div>
          )}
        </DashboardSection>

        <DashboardSection title="Manajemen Produk" description="Kelola katalog marketplace panti.">
          {ownedProducts.length === 0 ? (
            <EmptyState title="Belum ada produk" description="Tambah produk karya panti untuk membuka pemasukan berkelanjutan." />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {ownedProducts.map((product) => (
                <article key={product.id} className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm font-semibold text-slate-900">{product.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{product.shortStory}</p>
                  <p className="mt-2 text-xs text-slate-500">Stok: {product.stock}</p>
                  <p className="mt-1 text-xs text-slate-500">Status: {product.status}</p>
                </article>
              ))}
            </div>
          )}
        </DashboardSection>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <QuickActionCard
            title="Bagikan Update Dampak"
            description="Publikasikan progres terbaru campaign agar donor bisa memantau dampak nyata."
            ctaLabel="Ke Halaman Profil"
            href="/profile"
          />
          <QuickActionCard
            title="Buat Campaign Baru"
            description="Mulai campaign baru untuk kebutuhan alat, pelatihan, atau pengembangan program panti."
            ctaLabel="Buka Campaign"
            href="/dashboard/panti/create-campaign"
          />
          <QuickActionCard
            title="Tambah Produk"
            description={`Total produk: ${ownedLocalProducts.length} · Produk aktif: ${activeProductsCount} · Total stok: ${totalProductStock}`}
            ctaLabel="Buka Form Produk"
            href="/dashboard/panti/create-product"
          />
        </div>
      </DashboardLayout>
    </ProtectedDashboard>
  );
}
