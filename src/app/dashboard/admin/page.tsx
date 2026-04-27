"use client";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProtectedDashboard } from "@/components/dashboard/ProtectedDashboard";

export default function AdminDashboardPage() {
  return (
    <ProtectedDashboard allowedRoles={["ADMIN"]}>
      <section className="py-10">
        <DashboardHeader
          title="Dashboard Admin Pantiku"
          subtitle="Kelola verifikasi panti, campaign, produk, dan aktivitas platform."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <DashboardCard title="Verifikasi Panti" description="Tinjau pengajuan panti baru dan status verifikasinya." ctaLabel="Tinjau Panti" href="/orphanages" />
          <DashboardCard title="Campaign" description="Pantau kualitas campaign sebelum dipublikasikan lebih luas." ctaLabel="Kelola Campaign" href="/campaigns" />
          <DashboardCard title="Produk" description="Lihat produk karya panti yang sedang aktif atau menunggu moderasi." ctaLabel="Kelola Produk" href="/marketplace" />
          <DashboardCard title="Pengguna" description="Tinjau peran pengguna dan aktivitas dasar platform." ctaLabel="Lihat Pengguna" href="/profile" />
          <DashboardCard title="Donasi" description="Pantau alur donasi dan status pembayaran di sistem." ctaLabel="Pantau Donasi" href="/impact" />
          <DashboardCard title="Dampak" description="Lihat ringkasan dampak lintas program untuk evaluasi awal." ctaLabel="Lihat Dampak" href="/impact" />
        </div>
        <p className="mt-6 text-xs text-slate-500">Data pada dashboard admin saat ini masih tahap awal dan akan diperkaya bertahap seiring program pilot berjalan.</p>
      </section>
    </ProtectedDashboard>
  );
}
