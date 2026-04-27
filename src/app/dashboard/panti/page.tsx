"use client";

import Link from "next/link";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { ProgressChecklist } from "@/components/dashboard/ProgressChecklist";
import { EmptyDashboardState } from "@/components/dashboard/EmptyDashboardState";
import { ProtectedDashboard } from "@/components/dashboard/ProtectedDashboard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { PrimaryButton } from "@/components/common/primary-button";

type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export default function PantiDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const verificationStatus = (user?.orphanageVerificationStatus ?? "PENDING") as VerificationStatus;
  const isVerified = verificationStatus === "VERIFIED";
  const isRejected = verificationStatus === "REJECTED";

  const statusMessage =
    isVerified
      ? "Akun panti sudah terverifikasi. Kamu bisa mulai membuat campaign dan menambahkan produk."
      : isRejected
        ? "Data panti perlu diperbarui sebelum dapat diverifikasi."
        : "Pendaftaran panti sedang ditinjau oleh tim Pantiku. Kamu tetap bisa melengkapi profil panti.";

  const primaryAction = isVerified ? (
    <PrimaryButton href="/campaigns" label="Buat Campaign" />
  ) : isRejected ? (
    <PrimaryButton href="/orphanages/manage" label="Perbarui Data Panti" />
  ) : (
    <PrimaryButton href="/orphanages/manage" label="Lengkapi Profil Panti" />
  );

  const secondaryAction = isVerified ? <PrimaryButton href="/marketplace" label="Tambah Produk" variant="outline" /> : undefined;

  return (
    <ProtectedDashboard allowedRoles={["ORPHANAGE_MANAGER"]}>
      <section className="space-y-6 py-10">
        <DashboardHero
          title="Kelola Panti Bersama Pantiku"
          subtitle="Lengkapi profil panti, siapkan campaign produktif, dan mulai bangun kemandirian."
          primaryCta={primaryAction}
          secondaryCta={secondaryAction}
          extra={
            <div className="flex flex-col gap-3">
              <StatusBadge status={verificationStatus} />
              <p className="text-sm text-slate-600">{statusMessage}</p>
            </div>
          }
        />

        <ProgressChecklist
          title="Progress Checklist"
          items={[
            { label: "Lengkapi profil panti", done: Boolean(user?.orphanageVerificationStatus) },
            { label: "Menunggu verifikasi", done: verificationStatus !== "REJECTED" },
            { label: "Buat campaign produktif", done: isVerified },
            { label: "Tambah produk karya panti", done: isVerified },
            { label: "Pantau dampak", done: true },
          ]}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <DashboardCard title="Profil Panti" description="Perbarui informasi panti agar data selalu akurat." ctaLabel="Kelola Profil" href="/orphanages/manage" />
          <DashboardCard
            title="Campaign Saya"
            description="Pantau campaign aktif dan persiapan program produktif."
            ctaLabel={isVerified ? "Lihat Campaign" : "Buat Campaign"}
            href="/campaigns"
            disabled={!isVerified}
            disabledReason="Campaign dapat dibuat setelah panti terverifikasi."
          />
          <DashboardCard
            title="Produk Saya"
            description="Kelola produk karya panti sebelum dipublikasikan."
            ctaLabel={isVerified ? "Lihat Produk" : "Tambah Produk"}
            href="/marketplace"
            disabled={!isVerified}
            disabledReason="Produk dapat ditambahkan setelah verifikasi dan kurasi."
          />
          <DashboardCard title="Dampak Panti" description="Pantau dampak dukungan untuk panti kamu." ctaLabel="Lihat Dampak" href="/impact" />
        </div>

        {!isVerified ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <EmptyDashboardState
              title="Belum ada campaign"
              description="Setelah panti terverifikasi, kamu dapat membuat campaign produktif pertama."
              action={<Link href="/orphanages/manage" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">Lengkapi Profil Panti</Link>}
            />
            <EmptyDashboardState
              title="Produk karya panti belum tersedia"
              description="Produk karya panti dapat ditambahkan setelah proses verifikasi dan kurasi."
            />
          </div>
        ) : null}
      </section>
    </ProtectedDashboard>
  );
}
