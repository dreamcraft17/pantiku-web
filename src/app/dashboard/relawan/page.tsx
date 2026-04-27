"use client";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProtectedDashboard } from "@/components/dashboard/ProtectedDashboard";

export default function RelawanDashboardPage() {
  return (
    <ProtectedDashboard allowedRoles={["VOLUNTEER"]}>
      <section className="mx-auto w-full max-w-7xl py-8">
        <DashboardHeader
          title="Terima kasih sudah ingin terlibat"
          subtitle="Pantiku sedang menyiapkan program relawan untuk mendampingi anak dan panti mitra."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <DashboardCard
            title="Lengkapi Profil Relawan"
            description="Tambahkan minat dan keahlian agar kami bisa mencocokkan program yang relevan."
            ctaLabel="Lengkapi Profil"
            href="/profile"
          />
          <DashboardCard
            title="Program Relawan Segera Hadir"
            description="Program relawan akan dibuka bertahap setelah program pilot panti berjalan."
            ctaLabel="Lihat Pembaruan"
            href="/tentang-kami"
          />
          <DashboardCard
            title="Lihat Dampak Pantiku"
            description="Ikuti perkembangan dampak yang sedang dibangun bersama komunitas Pantiku."
            ctaLabel="Lihat Dampak"
            href="/impact"
          />
        </div>
        <p className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm text-slate-700">
          Program relawan akan dibuka bertahap setelah program pilot panti berjalan.
        </p>
      </section>
    </ProtectedDashboard>
  );
}
