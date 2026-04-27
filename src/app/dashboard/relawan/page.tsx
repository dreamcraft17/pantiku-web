"use client";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { EmptyDashboardState } from "@/components/dashboard/EmptyDashboardState";
import { ProtectedDashboard } from "@/components/dashboard/ProtectedDashboard";
import { PrimaryButton } from "@/components/common/primary-button";

export default function RelawanDashboardPage() {
  return (
    <ProtectedDashboard allowedRoles={["VOLUNTEER"]}>
      <section className="space-y-6 py-10">
        <DashboardHero
          title="Terima Kasih Sudah Ingin Terlibat"
          subtitle="Relawan Pantiku akan berperan dalam pendampingan, pelatihan keterampilan, dan penguatan anak serta panti."
          primaryCta={<PrimaryButton href="/profile" label="Lengkapi Profil Relawan" />}
          secondaryCta={<PrimaryButton href="/impact" label="Lihat Dampak Pantiku" variant="outline" />}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <DashboardCard
            title="Mentoring Anak"
            description="Berbagi pengalaman, motivasi, dan pendampingan untuk membantu anak lebih percaya diri."
            ctaLabel="Pelajari Peran"
            href="/tentang-kami"
          />
          <DashboardCard
            title="Pelatihan Keterampilan"
            description="Membantu program skill seperti digital, kuliner, kerajinan, komunikasi, atau kesiapan kerja."
            ctaLabel="Lihat Dampak"
            href="/impact"
          />
          <DashboardCard
            title="Dukungan Program Panti"
            description="Mendukung kegiatan panti agar program pemberdayaan berjalan lebih terstruktur."
            ctaLabel="Lihat Pembaruan"
            href="/tentang-kami"
          />
        </div>
        <EmptyDashboardState
          title="Program Relawan Sedang Disiapkan"
          description="Pantiku akan membuka program relawan secara bertahap setelah program pilot bersama panti mitra berjalan."
        />
        <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Profil Relawan</h2>
          <p className="mt-2 text-sm text-slate-600">Lengkapi data berikut agar tim Pantiku bisa mencocokkan kontribusi yang paling relevan.</p>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {["Keahlian", "Kota", "Ketersediaan waktu", "Minat kontribusi"].map((field) => (
              <div key={field} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                {field}
              </div>
            ))}
          </div>
        </section>
      </section>
    </ProtectedDashboard>
  );
}
