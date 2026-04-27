"use client";

import Link from "next/link";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProtectedDashboard } from "@/components/dashboard/ProtectedDashboard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { useAuthStore } from "@/features/auth/store/auth-store";

type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export default function PantiDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const verificationStatus = (user?.orphanageVerificationStatus ?? "PENDING") as VerificationStatus;

  const statusMessage =
    verificationStatus === "VERIFIED"
      ? "Akun panti sudah terverifikasi. Kamu bisa mulai membuat campaign dan menambahkan produk."
      : verificationStatus === "REJECTED"
        ? "Data panti perlu diperbarui sebelum dapat diverifikasi."
        : "Pendaftaran panti sedang ditinjau oleh tim Pantiku. Kamu tetap bisa melengkapi profil panti.";

  return (
    <ProtectedDashboard allowedRoles={["ORPHANAGE_MANAGER"]}>
      <section className="mx-auto w-full max-w-7xl py-8">
        <DashboardHeader
          title="Kelola Panti Bersama Pantiku"
          subtitle="Lengkapi profil panti dan siapkan campaign produktif pertama."
        />

        <div className="mb-6 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StatusBadge status={verificationStatus} />
            {verificationStatus === "VERIFIED" ? (
              <div className="flex gap-2">
                <Link href="/campaigns" className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
                  Buat Campaign
                </Link>
                <Link href="/marketplace" className="rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
                  Tambah Produk
                </Link>
              </div>
            ) : (
              <Link href="/orphanages/manage" className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
                Lengkapi Profil Panti
              </Link>
            )}
          </div>
          <p className="mt-3 text-sm text-slate-600">{statusMessage}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardCard title="Profil Panti" description="Perbarui informasi panti agar data selalu akurat." ctaLabel="Kelola Profil" href="/orphanages/manage" />
          <DashboardCard title="Campaign Saya" description="Pantau campaign aktif dan persiapan program produktif." ctaLabel="Lihat Campaign" href="/campaigns" />
          <DashboardCard title="Produk Saya" description="Kelola produk karya panti sebelum dipublikasikan." ctaLabel="Lihat Produk" href="/marketplace" />
          <DashboardCard title="Dampak Panti" description="Pantau dampak dukungan untuk panti kamu." ctaLabel="Lihat Dampak" href="/impact" />
        </div>
      </section>
    </ProtectedDashboard>
  );
}
