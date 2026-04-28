"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { EmptyState } from "../EmptyState";
import { StatCard } from "../StatCard";
import { OrphanageProfileData } from "@/lib/profile/profile-types";
import { useToast } from "@/components/common/toast-provider";
import { useImpactUpdateStore } from "@/features/impact/store/impact-update-store";
import { useCampaignStore } from "@/features/campaigns/store/campaign-store";
import { useContributionStore } from "@/features/contributions/store/contribution-store";
import { useProductStore } from "@/features/marketplace/store/product-store";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useOrphanageStore } from "@/features/orphanages/store/orphanage-store";
import { formatRupiah } from "@/lib/utils/format";

type Props = {
  data: OrphanageProfileData;
};

function getVerificationBadge(status: "PENDING" | "VERIFIED" | "REJECTED") {
  if (status === "VERIFIED") {
    return <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">Panti Terverifikasi</span>;
  }
  if (status === "REJECTED") {
    return <span className="inline-flex rounded-full border border-rose-200 bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800">Perlu Perbaikan</span>;
  }
  return <span className="inline-flex rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Menunggu Verifikasi</span>;
}

export function OrphanageProfile({ data }: Props) {
  const { showToast } = useToast();
  const user = useAuthStore((state) => state.user);
  const orphanages = useOrphanageStore((state) => state.orphanages);
  const localCampaigns = useCampaignStore((state) => state.campaigns);
  const localProducts = useProductStore((state) => state.products);
  const contributions = useContributionStore((state) => state.contributions);
  const addImpactUpdate = useImpactUpdateStore((state) => state.addImpactUpdate);
  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const currentUserId = user?.id ?? user?.email ?? "orphanage-manager-local";
  const orphanageProfile = orphanages.find((item) => item.managerUserId === currentUserId);
  const resolvedVerificationStatus = orphanageProfile?.verificationStatus ?? data.verificationStatus;
  const availableCampaigns = useMemo(
    () => localCampaigns.filter((campaign) => campaign.createdBy === currentUserId),
    [currentUserId, localCampaigns]
  );
  const ownedProducts = useMemo(
    () => localProducts.filter((product) => product.createdBy === currentUserId),
    [currentUserId, localProducts]
  );
  const localCampaignFunds = useMemo(
    () =>
      availableCampaigns.reduce((sum, campaign) => {
        const contributionTotal = contributions.filter((item) => item.campaignId === campaign.id).reduce((acc, item) => acc + item.amount, 0);
        return sum + campaign.currentAmount + contributionTotal;
      }, 0),
    [availableCampaigns, contributions]
  );

  const handleSubmitImpactUpdate = (event: FormEvent) => {
    event.preventDefault();
    if (!selectedCampaignId || !title.trim() || !description.trim()) {
      showToast("Lengkapi campaign, judul, dan deskripsi update.", "error");
      return;
    }
    addImpactUpdate({
      id: `${selectedCampaignId}-${Date.now()}`,
      campaignId: selectedCampaignId,
      title: title.trim(),
      description: description.trim(),
      date: new Date().toISOString(),
      authorRole: "ORPHANAGE_MANAGER",
    });
    setSelectedCampaignId("");
    setTitle("");
    setDescription("");
    showToast("Update dampak berhasil dibagikan.");
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold text-slate-900">Halo, {data.managerName}</h2>
          {data.isDemoData ? <span className="inline-flex rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">Demo data</span> : null}
        </div>
        <p className="mt-2 text-sm text-slate-600">{data.welcomeMessage}</p>
        <div className="mt-3">{getVerificationBadge(resolvedVerificationStatus)}</div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={data.ctas[0].href} className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
            {data.ctas[0].label}
          </Link>
          <Link href={data.ctas[1].href} className="rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
            {data.ctas[1].label}
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Identitas Panti</h3>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <article className="rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500">Nama Panti</p>
            <p className="mt-1 font-semibold text-slate-900">{data.orphanageName}</p>
          </article>
          <article className="rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500">Lokasi</p>
            <p className="mt-1 font-semibold text-slate-900">{data.location}</p>
          </article>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data.stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} helper={stat.helper} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StatCard label="Campaign Dibuat (Lokal)" value={String(availableCampaigns.length)} helper="Campaign yang kamu buat dari dashboard panti" />
        <StatCard label="Total Dana Campaign Lokal" value={formatRupiah(localCampaignFunds)} helper="Termasuk kontribusi donor yang sudah tercatat" />
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StatCard label="Produk Dibuat (Lokal)" value={String(ownedProducts.length)} helper="Produk dari panti kamu yang tersimpan lokal" />
        <StatCard
          label="Produk Aktif"
          value={String(ownedProducts.filter((product) => product.status === "ACTIVE").length)}
          helper="Produk aktif yang tampil di marketplace"
        />
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Ringkasan Campaign</h3>
        {data.campaignSummary.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="Belum ada campaign" description="Mulai buat campaign pertama untuk mendukung kebutuhan produktif panti." actionLabel="Buat Campaign" actionHref="/campaigns" />
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {data.campaignSummary.map((campaign) => (
              <article key={campaign.name} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-slate-900">{campaign.name}</p>
                  <span className="text-sm font-semibold text-emerald-700">{campaign.raised}</span>
                </div>
                <p className="mt-2 text-xs text-slate-600">Progress: {campaign.progress}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Campaign Lokal Dibuat</h3>
        {availableCampaigns.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="Belum ada campaign" description="Buat campaign dari dashboard panti untuk mulai membuka dukungan donor." />
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {availableCampaigns.map((campaign) => (
              <article key={campaign.id} className="rounded-xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">{campaign.title}</p>
                <p className="mt-2 text-sm text-slate-700">{campaign.description}</p>
                <p className="mt-2 text-xs text-slate-500">Target: {formatRupiah(campaign.targetAmount)}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Ringkasan Produk Marketplace</h3>
        {ownedProducts.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="Belum ada produk" description="Tambahkan produk karya panti agar bisa menjangkau lebih banyak pembeli." actionLabel="Tambah Produk" actionHref="/dashboard/panti/create-product" />
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {ownedProducts.map((product) => (
              <article key={product.id} className="rounded-xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">{product.name}</p>
                <p className="mt-2 text-sm text-slate-700">{product.description}</p>
                <p className="mt-2 text-xs text-slate-500">Harga: {formatRupiah(product.price)}</p>
                <p className="mt-1 text-xs text-slate-500">Stok: {product.stock}</p>
                <p className="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">{product.status}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Bagikan Update Dampak</h3>
        {availableCampaigns.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="Belum ada campaign untuk diberi update." description="Buat campaign dulu untuk mulai membagikan perkembangan dampaknya." />
          </div>
        ) : (
          <form onSubmit={handleSubmitImpactUpdate} className="mt-4 space-y-3">
            <div>
              <label htmlFor="impact-campaign" className="text-sm font-medium text-slate-700">
                Pilih Campaign
              </label>
              <select
                id="impact-campaign"
                value={selectedCampaignId}
                onChange={(event) => setSelectedCampaignId(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                <option value="">Pilih campaign</option>
                {availableCampaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="impact-title" className="text-sm font-medium text-slate-700">
                Judul Update
              </label>
              <input
                id="impact-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Contoh: Pelatihan batch pertama selesai"
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="impact-description" className="text-sm font-medium text-slate-700">
                Deskripsi
              </label>
              <textarea
                id="impact-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Ceritakan progres utama secara singkat dan jelas."
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                rows={4}
              />
            </div>
            <button type="submit" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
              Bagikan Update
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
