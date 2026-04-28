"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ProtectedDashboard } from "@/components/dashboard/ProtectedDashboard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useToast } from "@/components/common/toast-provider";
import { useCampaignStore } from "@/features/campaigns/store/campaign-store";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useOrphanageStore } from "@/features/orphanages/store/orphanage-store";
import Link from "next/link";

function buildCampaignId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `local-campaign-${Date.now()}`;
}

export default function CreateCampaignPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const addCampaign = useCampaignStore((state) => state.addCampaign);
  const currentUser = useAuthStore((state) => state.user);
  const orphanages = useOrphanageStore((state) => state.orphanages);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const managerUserId = currentUser?.id ?? currentUser?.email ?? "orphanage-manager-local";
  const orphanageProfile = orphanages.find((item) => item.managerUserId === managerUserId);
  const isVerified = orphanageProfile?.verificationStatus === "VERIFIED";
  const canCreateCampaign = Boolean(orphanageProfile) && isVerified;

  const handleSubmit = (event: FormEvent) => {
    if (!canCreateCampaign) {
      showToast("Campaign hanya bisa dibuat oleh panti terverifikasi.", "error");
      return;
    }

    event.preventDefault();
    if (isSubmitting) return;

    const normalizedTitle = title.trim();
    const normalizedDescription = description.trim();
    const parsedTarget = Number(targetAmount);

    if (!normalizedTitle || !normalizedDescription || !Number.isFinite(parsedTarget) || parsedTarget <= 0) {
      showToast("Lengkapi semua field dengan valid.", "error");
      return;
    }

    const campaignId = buildCampaignId();
    const createdBy = managerUserId;

    setIsSubmitting(true);
    try {
      addCampaign({
        id: campaignId,
        title: normalizedTitle,
        description: normalizedDescription,
        targetAmount: Math.floor(parsedTarget),
        currentAmount: 0,
        createdAt: new Date().toISOString(),
        createdBy,
        status: "DRAFT",
      });
      showToast("Campaign berhasil dibuat.");
      router.push(`/campaigns/${campaignId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedDashboard allowedRoles={["ORPHANAGE_MANAGER"]}>
      <DashboardLayout>
        <DashboardHeader
          title="Buat Campaign Baru"
          subtitle="Isi informasi dasar campaign. Data akan disimpan lokal untuk MVP flow supply-demand."
        />

        <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          {!canCreateCampaign ? (
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-800">Campaign belum bisa dibuat</p>
              <p className="mt-1 text-sm text-amber-700">
                Kamu perlu mengajukan verifikasi panti dan mendapatkan status <span className="font-semibold">VERIFIED</span> dulu.
              </p>
              <Link href="/dashboard/panti/verification" className="mt-2 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                Ajukan Verifikasi Panti
              </Link>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="campaign-title" className="text-sm font-medium text-slate-700">
                Judul Campaign
              </label>
              <input
                id="campaign-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Contoh: Program Kelas Menjahit Batch 1"
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                required
                disabled={!canCreateCampaign}
              />
            </div>

            <div>
              <label htmlFor="campaign-description" className="text-sm font-medium text-slate-700">
                Deskripsi
              </label>
              <textarea
                id="campaign-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Jelaskan tujuan campaign, manfaat, dan kebutuhan utama."
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                rows={5}
                required
                disabled={!canCreateCampaign}
              />
            </div>

            <div>
              <label htmlFor="campaign-target-amount" className="text-sm font-medium text-slate-700">
                Target Dana (Rp)
              </label>
              <input
                id="campaign-target-amount"
                type="number"
                min={1}
                value={targetAmount}
                onChange={(event) => setTargetAmount(event.target.value)}
                placeholder="Contoh: 25000000"
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                required
                disabled={!canCreateCampaign}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !canCreateCampaign}
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Campaign"}
            </button>
          </form>
        </section>
      </DashboardLayout>
    </ProtectedDashboard>
  );
}

