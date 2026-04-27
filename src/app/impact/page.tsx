"use client";

import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { PrimaryButton } from "@/components/common/primary-button";
import { SkeletonState } from "@/components/common/skeleton-state";
import { ImpactStatCard } from "@/features/impact/components/impact-stat-card";
import { useImpactStories, useImpactSummary } from "@/features/impact/api/use-impact-summary";
import { isDemoMode } from "@/lib/utils/isDemoMode";

type ImpactData = {
  totalChildren?: number;
  totalOrphanages?: number;
  totalCampaigns?: number;
  totalProductsSold?: number;
  totalDonations?: number;
  total_children_supported?: number;
  total_orphanages?: number;
  total_campaigns?: number;
  total_products_sold?: number;
  total_donations_amount?: number;
  growth?: {
    totalChildren?: number;
    totalOrphanages?: number;
    totalCampaigns?: number;
    totalProductsSold?: number;
    totalDonations?: number;
    total_children_supported?: number;
    total_orphanages?: number;
    total_campaigns?: number;
    total_products_sold?: number;
    total_donations_amount?: number;
  };
};

type ImpactStory = {
  title: string;
  description: string;
  orphanageName: string;
  impact: string;
};

export default function ImpactPage() {
  const query = useImpactSummary();
  const storiesQuery = useImpactStories();
  const data = (query.data ?? null) as ImpactData | null;
  const stories = (storiesQuery.data ?? []) as ImpactStory[];
  const demoMode = isDemoMode();

  if (query.isLoading) {
    return (
      <section className="space-y-4">
        <div className="rounded-xl bg-white p-6">
          <div className="h-5 w-52 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-4 w-96 animate-pulse rounded bg-slate-200" />
          <p className="mt-4 text-sm text-slate-600">Memuat data...</p>
        </div>
        <SkeletonState count={5} />
      </section>
    );
  }

  if (query.isError && !data) {
    return <ErrorState message="Gagal memuat dampak. Silakan coba lagi." onRetry={() => query.refetch()} />;
  }

  const totalChildren = data?.totalChildren ?? data?.total_children_supported ?? null;
  const totalOrphanages = data?.totalOrphanages ?? data?.total_orphanages ?? null;
  const totalCampaigns = data?.totalCampaigns ?? data?.total_campaigns ?? null;
  const totalProductsSold = data?.totalProductsSold ?? data?.total_products_sold ?? null;
  const totalDonations = data?.totalDonations ?? data?.total_donations_amount ?? null;
  const growthDonations = data?.growth?.totalDonations ?? data?.growth?.total_donations_amount;

  const hasAnyMetric =
    [totalChildren, totalOrphanages, totalCampaigns, totalProductsSold, totalDonations].filter(
      (value): value is number => typeof value === "number"
    ).length > 0;

  const isEmpty = !hasAnyMetric;
  if (isEmpty) {
    return (
      <section className="space-y-4">
        {demoMode ? (
          <div className="flex justify-end">
            <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Mode Demo</span>
          </div>
        ) : null}
        <EmptyState title="Data dampak belum tersedia" description="Data dampak sedang disiapkan seiring bertumbuhnya ekosistem Pantiku" />
        {demoMode ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Angka yang ditampilkan adalah simulasi untuk kebutuhan demonstrasi
          </p>
        ) : null}
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <header className="relative rounded-xl bg-white p-6">
        {demoMode ? (
          <span className="absolute right-4 top-4 rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            Demo Mode
          </span>
        ) : null}
        <p className="text-sm font-semibold text-emerald-700">Impact Dashboard</p>
        <h1 className="mt-2 text-3xl font-bold">Dampak Nyata Bersama Pantiku</h1>
        <p className="mt-2 text-slate-600">Setiap dukungan membantu anak bertumbuh dan panti menjadi mandiri</p>
        {demoMode ? (
          <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            Angka yang ditampilkan adalah simulasi untuk kebutuhan demonstrasi
          </p>
        ) : null}
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <ImpactStatCard
          label="Anak Terjangkau"
          numericValue={totalChildren}
          growth={data?.growth?.totalChildren ?? data?.growth?.total_children_supported}
          icon="🧒"
        />
        <ImpactStatCard
          label="Panti Terdaftar"
          numericValue={totalOrphanages}
          growth={data?.growth?.totalOrphanages ?? data?.growth?.total_orphanages}
          icon="🏠"
        />
        <ImpactStatCard
          label="Campaign Aktif"
          numericValue={totalCampaigns}
          growth={data?.growth?.totalCampaigns ?? data?.growth?.total_campaigns}
          icon="🎯"
        />
        <ImpactStatCard
          label="Produk Terjual"
          numericValue={totalProductsSold}
          growth={data?.growth?.totalProductsSold ?? data?.growth?.total_products_sold}
          icon="🛍️"
        />
        <ImpactStatCard
          label="Total Dukungan (IDR)"
          numericValue={totalDonations}
          isCurrency
          growth={growthDonations}
          icon="💚"
        />
      </div>

      {typeof growthDonations === "number" ? (
        <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm font-medium text-emerald-900">Pertumbuhan Dukungan</p>
          <p className="mt-1 text-lg font-bold text-emerald-800">{`${growthDonations >= 0 ? "+" : ""}${growthDonations}%`} bulan ini</p>
        </section>
      ) : null}

      <section className="rounded-xl bg-white p-6">
        <h2 className="text-xl font-bold">Dari Donasi ke Kemandirian</h2>
        <p className="mt-2 text-slate-700">
          Setiap kontribusi menggerakkan siklus dampak berkelanjutan: campaign produktif mendanai pelatihan keterampilan, keterampilan menghasilkan produk karya panti, lalu penjualan produk
          menghadirkan pemasukan untuk program berikutnya. Dampak tidak berhenti di satu transaksi, tetapi tumbuh menjadi ekosistem kemandirian.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {["Campaign", "Skill", "Produk", "Income"].map((item) => (
            <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center text-sm font-medium text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      {stories.length ? (
        <section className="rounded-xl bg-white p-6">
          <h3 className="text-lg font-semibold">Cerita Dampak</h3>
          <p className="mt-1 text-sm text-slate-600">Perubahan kecil yang terus bertumbuh menjadi masa depan yang lebih mandiri.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {stories.slice(0, 3).map((story) => (
              <article key={story.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-emerald-800">{story.title}</p>
                <p className="mt-2 text-sm text-slate-700">{story.description}</p>
                <p className="mt-3 text-xs font-medium text-slate-600">{story.orphanageName}</p>
                <p className="mt-1 text-xs font-semibold text-emerald-700">{story.impact}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="rounded-xl bg-white p-6">
        <h3 className="text-lg font-semibold">Ayo lanjutkan dampaknya</h3>
        <p className="mt-1 text-slate-600">Pilih campaign produktif dan bantu panti membangun kemandirian jangka panjang.</p>
        <div className="mt-4">
          <PrimaryButton href="/campaigns" label="Dukung Campaign Sekarang" />
        </div>
      </section>
    </section>
  );
}
