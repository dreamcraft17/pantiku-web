"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useOnboardingStore } from "@/features/onboarding/store/onboarding-store";
import { useOrphanageStore } from "@/features/orphanages/store/orphanage-store";
import { useCampaignStore } from "@/features/campaigns/store/campaign-store";
import { AppRole } from "@/lib/auth/permissions";

function getIntentLabel(role: AppRole) {
  if (role === "DONOR") return "Saya ingin membantu panti";
  if (role === "ORPHANAGE_MANAGER") return "Saya ingin mengembangkan panti saya";
  return "Saya ingin berkontribusi sebagai relawan";
}

function getActivationPath(role: AppRole, isVerifiedPanti: boolean, hasCampaign: boolean) {
  if (role === "DONOR") return "/campaigns";
  if (role === "ORPHANAGE_MANAGER") {
    if (!isVerifiedPanti) return "/dashboard/panti/verification";
    if (!hasCampaign) return "/dashboard/panti/create-campaign";
    return "/dashboard/panti";
  }
  return "/dashboard/relawan";
}

export function OnboardingGate() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  const user = useAuthStore((state) => state.user);
  const orphanages = useOrphanageStore((state) => state.orphanages);
  const campaigns = useCampaignStore((state) => state.campaigns);
  const setOnboarded = useOnboardingStore((state) => state.setOnboarded);
  const hasOnboardedByUser = useOnboardingStore((state) => state.hasOnboardedByUser);
  const [step, setStep] = useState(1);

  const userKey = useMemo(() => user?.id ?? user?.email ?? role ?? "guest", [role, user?.email, user?.id]);
  const hasOnboarded = Boolean(hasOnboardedByUser[userKey]);
  const currentUserId = user?.id ?? user?.email ?? "orphanage-manager-local";
  const orphanageProfile = orphanages.find((item) => item.managerUserId === currentUserId);
  const isVerifiedPanti = orphanageProfile?.verificationStatus === "VERIFIED";
  const hasCampaign = campaigns.some((item) => item.createdBy === currentUserId);
  const shouldOpen = Boolean(token) && (role === "DONOR" || role === "ORPHANAGE_MANAGER" || role === "VOLUNTEER") && !hasOnboarded;
  if (!shouldOpen || !role) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-emerald-100 bg-white p-6 shadow-xl">
        {step === 1 ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Onboarding Pantiku</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Selamat datang di Pantiku</h2>
            <p className="mt-3 text-sm text-slate-700">Pantiku membantu panti menjadi mandiri melalui campaign dan marketplace.</p>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Lanjut
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Langkah Aktivasi</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Tujuan kamu di Pantiku</h2>
            <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
              <p className="text-sm font-medium text-emerald-800">{getIntentLabel(role)}</p>
            </div>
            <p className="mt-3 text-sm text-slate-700">
              {role === "DONOR" ? "Pilih campaign pertama kamu untuk memulai kontribusi." : null}
              {role === "ORPHANAGE_MANAGER" ? "Mulai dari verifikasi panti lalu buat campaign pertama." : null}
              {role === "VOLUNTEER" ? "Cari program relawan pertama kamu dari dashboard." : null}
            </p>
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setOnboarded(userKey, true);
                  setStep(1);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Lewati
              </button>
              <button
                type="button"
                onClick={() => {
                  setOnboarded(userKey, true);
                  setStep(1);
                  router.push(getActivationPath(role, isVerifiedPanti, hasCampaign));
                }}
                className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Mulai Sekarang
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

