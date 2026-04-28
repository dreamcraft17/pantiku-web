"use client";

import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { ProtectedDashboard } from "@/components/dashboard/ProtectedDashboard";
import { EmptyState } from "@/components/common/empty-state";
import { isDemoMode } from "@/lib/config/demo";
import { mockCampaigns } from "@/lib/mock/data";

export function VolunteerDashboard() {
  const opportunities = isDemoMode
    ? mockCampaigns.slice(0, 3).map((campaign) => ({
        id: campaign.id,
        title: `Program Relawan - ${campaign.title}`,
        description: campaign.summary,
      }))
    : [];
  const activities = isDemoMode
    ? [
        { id: "a1", title: "Orientasi Relawan", status: "Selesai" },
        { id: "a2", title: "Sesi Pendampingan Digital", status: "Mendatang" },
      ]
    : [];

  return (
    <ProtectedDashboard allowedRoles={["VOLUNTEER"]}>
      <DashboardLayout>
        <DashboardHeader
          title="Workspace Relawan"
          subtitle="Temukan program relawan, kelola aktivitas yang diikuti, dan pantau jadwal kontribusi kamu."
          actions={
            <>
              <Link href="/orphanages" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
                Cari Program
              </Link>
              <Link href="/profile" className="rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
                Lihat Profil
              </Link>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <DashboardStatCard label="Program Diikuti" value={String(activities.length)} />
          <DashboardStatCard label="Aktivitas Selesai" value={String(activities.filter((item) => item.status === "Selesai").length)} />
          <DashboardStatCard label="Jadwal Mendatang" value={String(activities.filter((item) => item.status === "Mendatang").length)} />
        </div>

        <DashboardSection title="Peluang Relawan">
          {opportunities.length === 0 ? (
            <EmptyState title="Belum ada aktivitas. Cari program relawan." description="Peluang relawan akan muncul bertahap sesuai kebutuhan panti." />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {opportunities.map((opportunity) => (
                <QuickActionCard key={opportunity.id} title={opportunity.title} description={opportunity.description} ctaLabel="Lihat Detail" href="/orphanages" />
              ))}
            </div>
          )}
        </DashboardSection>
      </DashboardLayout>
    </ProtectedDashboard>
  );
}

