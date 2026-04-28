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

export default function RelawanDashboardPage() {
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
  const completedActivities = activities.filter((item) => item.status === "Selesai").length;
  const upcomingSchedules = activities.filter((item) => item.status === "Mendatang").length;

  return (
    <ProtectedDashboard allowedRoles={["VOLUNTEER"]}>
      <DashboardLayout>
        <DashboardHeader
          title="Workspace Relawan"
          subtitle="Temukan program relawan, kelola aktivitas yang diikuti, dan pantau jadwal kontribusi kamu."
          badge={
            isDemoMode ? (
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">Demo data</span>
            ) : null
          }
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
          <DashboardStatCard label="Aktivitas Selesai" value={String(completedActivities)} />
          <DashboardStatCard label="Jadwal Mendatang" value={String(upcomingSchedules)} />
        </div>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          Cari program relawan pertama kamu untuk mulai berkontribusi dalam 30 detik ini.
        </section>

        <DashboardSection title="Peluang Relawan" description="Program yang bisa kamu ikuti dalam waktu dekat.">
          {opportunities.length === 0 ? (
            <EmptyState title="Belum ada program relawan tersedia" description="Tim Pantiku sedang menyiapkan batch program relawan berikutnya." />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {opportunities.map((opportunity) => (
                <QuickActionCard
                  key={opportunity.id}
                  title={opportunity.title}
                  description={opportunity.description}
                  ctaLabel="Lihat Detail"
                  href="/orphanages"
                />
              ))}
            </div>
          )}
        </DashboardSection>

        <DashboardSection title="Aktivitas Saya">
          {activities.length === 0 ? (
            <EmptyState title="Belum ada aktivitas. Cari program relawan." description="Daftar aktivitas akan muncul setelah kamu mengikuti program pertama." />
          ) : (
            <div className="space-y-3">
              {activities.map((activity) => (
                <article key={activity.id} className="rounded-xl border border-slate-200 p-4">
                  <p className="font-semibold text-slate-900">{activity.title}</p>
                  <p className="mt-1 text-xs text-slate-500">Status: {activity.status}</p>
                </article>
              ))}
            </div>
          )}
        </DashboardSection>
      </DashboardLayout>
    </ProtectedDashboard>
  );
}
