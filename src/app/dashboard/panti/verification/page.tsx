"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProtectedDashboard } from "@/components/dashboard/ProtectedDashboard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useToast } from "@/components/common/toast-provider";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useOrphanageStore } from "@/features/orphanages/store/orphanage-store";

function buildOrphanageId(userId: string) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `orphanage-${userId}-${Date.now()}`;
}

export default function VerificationSubmissionPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const user = useAuthStore((state) => state.user);
  const submitOrphanageProfile = useOrphanageStore((state) => state.submitOrphanageProfile);
  const orphanages = useOrphanageStore((state) => state.orphanages);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const managerUserId = user?.id ?? user?.email ?? "orphanage-manager-local";
  const existingProfile = useMemo(
    () => orphanages.find((item) => item.managerUserId === managerUserId),
    [managerUserId, orphanages]
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    const normalizedName = name.trim();
    const normalizedLocation = location.trim();
    const normalizedDescription = description.trim();

    if (!normalizedName || !normalizedLocation) {
      showToast("Nama panti dan lokasi wajib diisi.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      submitOrphanageProfile({
        id: existingProfile?.id ?? buildOrphanageId(managerUserId),
        managerUserId,
        name: normalizedName,
        location: normalizedLocation,
        description: normalizedDescription || undefined,
        verificationStatus: "PENDING",
        submittedAt: new Date().toISOString(),
        reviewedAt: undefined,
        rejectionReason: undefined,
      });
      showToast("Pengajuan verifikasi berhasil dikirim.");
      router.push("/dashboard/panti");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRejected = existingProfile?.verificationStatus === "REJECTED";
  const canResubmit = !existingProfile || isRejected;

  return (
    <ProtectedDashboard allowedRoles={["ORPHANAGE_MANAGER"]}>
      <DashboardLayout>
        <DashboardHeader
          title="Verifikasi Panti"
          subtitle="Ajukan data panti agar campaign kamu dapat tampil sebagai sumber dukungan terpercaya."
        />

        {existingProfile ? (
          <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Status Verifikasi Saat Ini</h2>
            {existingProfile.verificationStatus === "PENDING" ? (
              <p className="mt-3 inline-flex rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">Menunggu verifikasi</p>
            ) : null}
            {existingProfile.verificationStatus === "VERIFIED" ? (
              <p className="mt-3 inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">Panti terverifikasi</p>
            ) : null}
            {isRejected ? (
              <div className="mt-3 space-y-2">
                <p className="inline-flex rounded-full border border-rose-200 bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-800">Pengajuan ditolak</p>
                <p className="text-sm text-slate-700">Alasan: {existingProfile.rejectionReason ?? "Belum ada catatan alasan."}</p>
              </div>
            ) : null}
            <p className="mt-3 text-sm text-slate-600">
              Nama panti: <span className="font-semibold text-slate-900">{existingProfile.name}</span>
            </p>
          </section>
        ) : null}

        {canResubmit ? (
          <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{isRejected ? "Ajukan Ulang Verifikasi" : "Form Pengajuan Verifikasi"}</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="verification-name" className="text-sm font-medium text-slate-700">
                  Nama Panti
                </label>
                <input
                  id="verification-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Contoh: Panti Harapan Baru"
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="verification-location" className="text-sm font-medium text-slate-700">
                  Lokasi
                </label>
                <input
                  id="verification-location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Contoh: Bandung"
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="verification-description" className="text-sm font-medium text-slate-700">
                  Deskripsi Singkat
                </label>
                <textarea
                  id="verification-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Ceritakan fokus program dan kebutuhan utama panti."
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Menyimpan..." : "Kirim Pengajuan"}
              </button>
            </form>
          </section>
        ) : (
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            Pengajuan sudah diproses. Kamu bisa kembali ke dashboard panti untuk lanjut mengelola workspace.
            <div className="mt-3">
              <Link href="/dashboard/panti" className="font-semibold text-emerald-700 hover:text-emerald-800">
                Kembali ke Dashboard Panti
              </Link>
            </div>
          </section>
        )}
      </DashboardLayout>
    </ProtectedDashboard>
  );
}

