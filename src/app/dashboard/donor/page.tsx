"use client";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { EmptyDashboardState } from "@/components/dashboard/EmptyDashboardState";
import { ProtectedDashboard } from "@/components/dashboard/ProtectedDashboard";
import { PrimaryButton } from "@/components/common/primary-button";

export default function DonorDashboardPage() {
  return (
    <ProtectedDashboard allowedRoles={["DONOR"]}>
      <section className="space-y-6 py-10">
        <DashboardHero
          title="Selamat Datang di Pantiku"
          subtitle="Dukung campaign produktif, beli produk karya panti, dan lihat dampak dari kontribusimu."
          primaryCta={<PrimaryButton href="/campaigns" label="Jelajahi Campaign" />}
          secondaryCta={<PrimaryButton href="/marketplace" label="Lihat Produk Karya Panti" variant="outline" />}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <DashboardCard
            title="Dukung Campaign Produktif"
            description="Bantu panti mendapatkan alat, pelatihan, dan modal produktif."
            ctaLabel="Lihat Campaign"
            href="/campaigns"
          />
          <DashboardCard
            title="Beli Produk Karya Panti"
            description="Dukung kemandirian panti melalui produk yang mereka hasilkan."
            ctaLabel="Lihat Marketplace"
            href="/marketplace"
          />
          <DashboardCard
            title="Pantau Dampak"
            description="Lihat bagaimana dukungan berkembang menjadi dampak."
            ctaLabel="Lihat Dampak"
            href="/impact"
          />
        </div>

        <EmptyDashboardState
          title="Campaign pertama sedang disiapkan bersama panti mitra terverifikasi."
          description="Jelajahi campaign secara berkala. Pantiku akan menampilkan campaign produktif yang sudah siap didukung."
        />
      </section>
    </ProtectedDashboard>
  );
}
