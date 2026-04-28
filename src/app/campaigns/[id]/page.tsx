"use client";

import { FormEvent, useMemo, useState, useSyncExternalStore } from "react";
import { useParams, useRouter } from "next/navigation";
import { EmptyState } from "@/components/common/empty-state";
import { LoadingState } from "@/components/common/loading-state";
import { CampaignProgressBar } from "@/features/campaigns/components/campaign-progress-bar";
import { CampaignCard } from "@/features/campaigns/components/campaign-card";
import { useToast } from "@/components/common/toast-provider";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useContributionStore } from "@/features/contributions/store/contribution-store";
import { useImpactUpdateStore } from "@/features/impact/store/impact-update-store";
import { useCampaignStore } from "@/features/campaigns/store/campaign-store";
import { useOrphanageStore } from "@/features/orphanages/store/orphanage-store";
import { mockCampaigns } from "@/lib/mock/data";
import { formatRupiah } from "@/lib/utils/format";
import { isDemoMode } from "@/lib/config/demo";

const PRESET_AMOUNTS = [10000, 50000, 100000];

export default function CampaignDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { showToast } = useToast();
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  const localCampaigns = useCampaignStore((state) => state.campaigns);
  const orphanages = useOrphanageStore((state) => state.orphanages);
  const addContribution = useContributionStore((state) => state.addContribution);
  const contributions = useContributionStore((state) => state.contributions);
  const getUpdatesByCampaign = useImpactUpdateStore((state) => state.getUpdatesByCampaign);
  const [isContributionOpen, setIsContributionOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(PRESET_AMOUNTS[0]);
  const [customAmount, setCustomAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latestContribution, setLatestContribution] = useState<{ amount: number; date: string } | null>(null);
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const campaign = useMemo(() => {
    const local = localCampaigns.find((item) => item.id === params.id);
    if (local) {
      const orphanage = orphanages.find((item) => item.managerUserId === local.createdBy);
      return {
        id: local.id,
        title: local.title,
        summary: local.description,
        story: local.description,
        goal: local.targetAmount,
        collected: local.currentAmount,
        orphanageName: orphanage?.name ?? "Panti Mitra Pantiku",
        orphanageVerificationStatus: orphanage?.verificationStatus,
      };
    }
    const remote = isDemoMode ? mockCampaigns.find((item) => item.id === params.id) : undefined;
    if (!remote) return null;
    return {
      id: remote.id,
      title: remote.title,
      summary: remote.summary,
      story: remote.story,
      goal: remote.goal,
      collected: remote.collected,
      orphanageName: remote.orphanageName,
      orphanageVerificationStatus: "VERIFIED" as const,
    };
  }, [localCampaigns, orphanages, params.id]);
  const relatedCampaigns = useMemo(
    () =>
      isDemoMode
        ? mockCampaigns
            .filter((item) => item.id !== params.id)
            .slice(0, 3)
        : [],
    [params.id]
  );
  const additionalCollected = useMemo(
    () => contributions.filter((item) => item.campaignId === params.id).reduce((sum, item) => sum + item.amount, 0),
    [contributions, params.id]
  );
  const impactUpdates = useMemo(() => getUpdatesByCampaign(params.id), [getUpdatesByCampaign, params.id]);
  const currentCollected = (campaign?.collected ?? 0) + additionalCollected;
  const effectiveAmount = customAmount ? Number(customAmount) : selectedAmount;

  if (!hydrated) {
    return <LoadingState message="Memuat detail campaign..." />;
  }

  if (!campaign) {
    return <EmptyState title="Campaign tidak ditemukan" description="Periksa kembali campaign yang ingin kamu dukung." />;
  }

  const handleConfirm = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!token) {
      showToast("Silakan login dulu untuk mendukung campaign.", "error");
      router.push("/login");
      return;
    }
    if (!Number.isFinite(effectiveAmount) || effectiveAmount < 10000) {
      showToast("Minimal dukungan Rp 10.000.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const contribution = {
        campaignId: campaign.id,
        amount: Math.floor(effectiveAmount),
        date: new Date().toISOString(),
      };
      addContribution(contribution);
      setLatestContribution({ amount: contribution.amount, date: contribution.date });
      setCustomAmount("");
      setSelectedAmount(PRESET_AMOUNTS[0]);
      setIsContributionOpen(false);
      showToast("Terima kasih! Dukungan kamu berhasil dicatat.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_360px]">
        <div className="rounded-xl bg-white p-6">
          <p className="text-sm font-semibold text-emerald-700">Campaign Produktif</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <p className="text-sm text-slate-700">{campaign.orphanageName}</p>
            {campaign.orphanageVerificationStatus === "VERIFIED" ? (
              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">Panti Terverifikasi</span>
            ) : null}
            {(role === "ADMIN" || role === "ORPHANAGE_MANAGER") && campaign.orphanageVerificationStatus === "PENDING" ? (
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">Menunggu Verifikasi</span>
            ) : null}
          </div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">{campaign.title}</h1>
          <p className="mt-3 text-slate-700">{campaign.story || campaign.summary}</p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-600">Target Dukungan</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{formatRupiah(campaign.goal)}</p>
            <div className="mt-3">
              <CampaignProgressBar collected={currentCollected} goal={campaign.goal} />
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Terkumpul: <span className="font-semibold text-slate-900">{formatRupiah(currentCollected)}</span>
            </p>
          </div>

          {latestContribution ? (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-800">Kontribusi terakhir berhasil dicatat</p>
              <p className="mt-1 text-sm text-slate-700">
                {formatRupiah(latestContribution.amount)} ·{" "}
                {new Date(latestContribution.date).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="mt-2 text-xs text-slate-600">Kontribusi kamu sudah tercatat secara lokal di profil donor.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => router.push("/profile")}
                  className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                  Lihat di Profil
                </button>
                <button
                  type="button"
                  onClick={() => setIsContributionOpen(true)}
                  className="rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
                >
                  Dukung Lagi
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <aside className="xl:sticky xl:top-24 xl:h-fit">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-emerald-700">Dukung Campaign</p>
            <p className="mt-2 text-sm text-slate-600">Kontribusi kamu akan langsung tercatat dan tampil di profil donor.</p>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setIsContributionOpen((prev) => !prev)}
                className="w-full rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Dukung Campaign
              </button>
            </div>

            {isContributionOpen ? (
              <form onSubmit={handleConfirm} className="mt-4 space-y-4 rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
                <div className="flex flex-wrap gap-2">
                  {PRESET_AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`rounded-md border px-3 py-2 text-sm font-semibold ${
                        !customAmount && selectedAmount === amount
                          ? "border-emerald-700 bg-emerald-700 text-white"
                          : "border-emerald-200 bg-white text-emerald-700"
                      }`}
                    >
                      {formatRupiah(amount)}
                    </button>
                  ))}
                </div>

                <div>
                  <label htmlFor="custom-amount" className="text-sm font-medium text-slate-700">
                    Atau nominal custom
                  </label>
                  <input
                    id="custom-amount"
                    type="number"
                    min={10000}
                    value={customAmount}
                    onChange={(event) => setCustomAmount(event.target.value)}
                    placeholder="Contoh: 75000"
                    className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Menyimpan..." : "Konfirmasi Dukungan"}
                </button>
              </form>
            ) : null}
          </div>
        </aside>
      </div>

      <section className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-slate-900">Update Dampak</h2>
          {isDemoMode ? <span className="inline-flex rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">Demo data</span> : null}
        </div>
        {impactUpdates.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="Belum ada update dampak"
              description="Update akan muncul setelah panti membagikan perkembangan campaign ini."
            />
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {impactUpdates.map((update) => (
              <article key={`${update.id}-${update.date}`} className="rounded-xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">{update.title}</p>
                <p className="mt-2 text-sm text-slate-700">{update.description}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {new Date(update.date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  · {update.authorRole === "ADMIN" ? "Admin Pantiku" : "Pengelola Panti"}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      {relatedCampaigns.length > 0 ? (
        <div>
          <h2 className="mb-4 text-xl font-bold">Campaign Terkait</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedCampaigns.map((item) => (
              <CampaignCard key={item.id} campaign={item} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
