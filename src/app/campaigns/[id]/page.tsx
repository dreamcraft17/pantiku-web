"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { LoadingState } from "@/components/common/loading-state";
import { EmptyState } from "@/components/common/empty-state";
import { CampaignProgressBar } from "@/features/campaigns/components/campaign-progress-bar";
import { formatRupiah } from "@/lib/utils/format";
import { PrimaryButton } from "@/components/common/primary-button";
import { CampaignCard } from "@/features/campaigns/components/campaign-card";
import { useCampaignDetail, useCampaigns } from "@/features/campaigns/api/use-campaigns";
import { useToast } from "@/components/common/toast-provider";
import { useAnalytics } from "@/lib/analytics/use-analytics";
import { useCreateDonation, useSimulatePaymentSuccess } from "@/features/payments/api/use-payments";
import { useAuthStore } from "@/features/auth/store/auth-store";

export default function CampaignDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const { showToast } = useToast();
  const token = useAuthStore((state) => state.token);
  const analytics = useAnalytics();
  const query = useCampaignDetail(id);
  const relatedQuery = useCampaigns();
  const createDonationMutation = useCreateDonation();
  const simulateSuccessMutation = useSimulatePaymentSuccess();
  const [donationAmount, setDonationAmount] = useState(50000);
  const [customAmount, setCustomAmount] = useState("");
  const relatedCampaigns = useMemo(
    () => (relatedQuery.data ?? []).filter((item) => item.id !== id).slice(0, 2),
    [relatedQuery.data, id]
  );
  const campaign = query.data;

  useEffect(() => {
    if (!campaign) return;
    analytics.track("view_campaign", { campaignId: campaign.id, title: campaign.title });
  }, [analytics, campaign]);

  if (query.isLoading) return <LoadingState message="Memuat detail campaign..." />;
  if (!campaign) return <EmptyState title="Campaign tidak ditemukan" description="Silakan kembali ke daftar campaign." />;

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_360px]">
        <div className="rounded-xl bg-white p-6">
        <p className="text-sm font-semibold text-emerald-700">Campaign Produktif</p>
        <h1 className="mt-2 text-3xl font-bold">{campaign.title}</h1>
        <div className="relative mt-4 h-56 w-full overflow-hidden rounded-lg">
          <Image src={campaign.image} alt={campaign.title} fill sizes="100vw" className="object-cover" />
        </div>
        <p className="mt-3 text-slate-600">{campaign.summary}</p>
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h2 className="font-semibold">Info Panti</h2>
          <p className="mt-1 text-sm text-slate-700">{campaign.orphanageName}</p>
          <p className="text-sm text-slate-600">{campaign.location}</p>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold">Cerita Campaign</h2>
          <p className="mt-2 text-slate-700">{campaign.story}</p>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold">Progress Pendanaan</h2>
          <div className="mt-3">
            <CampaignProgressBar collected={campaign.collected} goal={campaign.goal} />
          </div>
          <p className="mt-2 text-slate-700">
            {formatRupiah(campaign.collected)} / {formatRupiah(campaign.goal)}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold">Kebutuhan Program</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
            {campaign.itemsNeeded.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold">Dampak yang Diharapkan</h2>
          <p className="mt-2 text-slate-700">{campaign.impactExplanation}</p>
          <p className="mt-3 text-sm font-medium text-slate-800">Cerita dampak (anonim):</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-slate-700">
            {campaign.anonymizedImpactStories.map((story) => (
              <li key={story}>{story}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <h2 className="font-semibold text-emerald-900">Pilih Nominal Dukungan</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {[25000, 50000, 100000, 250000].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setDonationAmount(amount)}
                className={`rounded-md border px-3 py-2 text-sm ${
                  donationAmount === amount
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "border-emerald-300 bg-white text-emerald-800"
                }`}
              >
                {formatRupiah(amount)}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <label htmlFor="custom-donation" className="text-sm font-medium text-emerald-900">
              Atau masukkan nominal sendiri
            </label>
            <input
              id="custom-donation"
              type="number"
              min={10000}
              className="mt-1 w-full rounded-md border border-emerald-300 px-3 py-2 text-sm"
              placeholder="Contoh: 75000"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                const parsed = Number(e.target.value);
                if (Number.isFinite(parsed) && parsed > 0) setDonationAmount(parsed);
              }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-700">Nominal dipilih: {formatRupiah(donationAmount)}</p>
          {createDonationMutation.data?.paymentId ? (
            <div className="mt-4 rounded-md border border-slate-200 bg-white p-4">
              <p className="text-sm font-medium text-slate-800">Pembayaran Demo Siap</p>
              <p className="mt-1 text-xs text-slate-600 break-all">URL: {createDonationMutation.data.paymentUrl}</p>
              <div className="mt-3">
                <PrimaryButton
                  label={simulateSuccessMutation.isPending ? "Memproses..." : "Simulasikan Pembayaran Berhasil"}
                  onClick={async () => {
                    if (simulateSuccessMutation.isPending) return;
                    try {
                      await simulateSuccessMutation.mutateAsync(createDonationMutation.data!.paymentId);
                      analytics.track("complete_donation", { campaignId: campaign.id, amount: donationAmount });
                      router.push("/payment/demo-success?type=donation");
                    } catch {
                      router.push("/payment/demo-failed?type=donation");
                    }
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
        </div>
        <aside className="xl:sticky xl:top-24 xl:h-fit">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-emerald-700">Aksi Cepat</p>
            <p className="mt-2 text-sm text-slate-600">Dukung campaign ini sekarang atau bagikan ke jejaring kamu.</p>
            <div className="mt-4 space-y-2">
              <PrimaryButton
                label="Dukung Sekarang"
                onClick={async () => {
                  if (!token) {
                    showToast("Silakan login terlebih dahulu untuk mendukung campaign.");
                    router.push("/login");
                    return;
                  }
                  if (donationAmount <= 0) {
                    showToast("Nominal dukungan belum valid.");
                    return;
                  }
                  analytics.track("click_donate", { campaignId: campaign.id, amount: donationAmount });
                  try {
                    const result = await createDonationMutation.mutateAsync({ campaignId: campaign.id, amount: donationAmount });
                    showToast("Sesi pembayaran demo berhasil dibuat.");
                    if (!result.paymentId) return;
                  } catch {
                    showToast("Gagal membuat sesi pembayaran. Coba lagi.");
                  }
                }}
              />
              <PrimaryButton
                label="Bagikan Campaign"
                variant="outline"
                onClick={async () => {
                  const shareUrl = `${window.location.origin}/campaigns/${campaign.id}`;
                  if (navigator.share) {
                    await navigator.share({
                      title: campaign.title,
                      text: "Dukung campaign produktif bersama Pantiku.",
                      url: shareUrl
                    });
                    showToast("Campaign berhasil dibagikan.");
                  } else {
                    await navigator.clipboard.writeText(shareUrl);
                    showToast("Link campaign berhasil disalin.");
                  }
                }}
              />
            </div>
          </div>
        </aside>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold">Campaign Terkait</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedCampaigns.map((item) => (
            <CampaignCard key={item.id} campaign={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
