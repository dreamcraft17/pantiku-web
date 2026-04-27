"use client";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProtectedDashboard } from "@/components/dashboard/ProtectedDashboard";

export default function DonorDashboardPage() {
  return (
    <ProtectedDashboard allowedRoles={["DONOR"]}>
      <section className="mx-auto w-full max-w-7xl py-8">
        <DashboardHeader
          title="Selamat datang kembali"
          subtitle="Lanjutkan dukunganmu untuk membangun panti yang lebih mandiri."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <DashboardCard
            title="Campaign Produktif"
            description="Lihat campaign yang sedang berjalan dan dukung program yang relevan."
            ctaLabel="Jelajahi Campaign"
            href="/campaigns"
          />
          <DashboardCard
            title="Produk Karya Panti"
            description="Temukan produk karya panti dan bantu keberlanjutan ekonomi panti."
            ctaLabel="Lihat Marketplace"
            href="/marketplace"
          />
          <DashboardCard
            title="Dampak Dukungan"
            description="Pantau arah dukungan dan perkembangan dampak yang dibangun bersama."
            ctaLabel="Lihat Dampak"
            href="/impact"
          />
        </div>
        <p className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm text-slate-700">
          Pantiku sedang menyiapkan campaign pertama yang terverifikasi bersama panti mitra.
        </p>
      </section>
    </ProtectedDashboard>
  );
}
