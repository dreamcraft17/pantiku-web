"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { ProtectedDashboard } from "@/components/dashboard/ProtectedDashboard";
import { EmptyState } from "@/components/common/empty-state";
import { useToast } from "@/components/common/toast-provider";
import { ModerationCard } from "@/components/admin/ModerationCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useCampaignStore } from "@/features/campaigns/store/campaign-store";
import { useProductStore } from "@/features/marketplace/store/product-store";
import { useImpactUpdateStore } from "@/features/impact/store/impact-update-store";
import { useOrphanageStore } from "@/features/orphanages/store/orphanage-store";
import { isDemoMode } from "@/lib/config/demo";

export default function AdminDashboardPage() {
  const { showToast } = useToast();
  const orphanages = useOrphanageStore((state) => state.orphanages);
  const approveOrphanage = useOrphanageStore((state) => state.approveOrphanage);
  const rejectOrphanage = useOrphanageStore((state) => state.rejectOrphanage);
  const campaigns = useCampaignStore((state) => state.campaigns);
  const updateCampaign = useCampaignStore((state) => state.updateCampaign);
  const products = useProductStore((state) => state.products);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const impactUpdates = useImpactUpdateStore((state) => state.updates);
  const updateImpactReviewStatus = useImpactUpdateStore((state) => state.updateImpactReviewStatus);
  const pendingOrphanages = orphanages.filter((item) => item.verificationStatus === "PENDING");
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const activeCampaigns = campaigns.filter((item) => item.status === "ACTIVE");
  const activeProducts = products.filter((item) => item.status === "ACTIVE");
  const visibleImpactUpdates = impactUpdates.filter((item) => item.reviewStatus !== "HIDDEN");

  const summary = {
    pendingOrphanages: pendingOrphanages.length,
    activeCampaigns: activeCampaigns.length,
    activeProducts: activeProducts.length,
    impactUpdates: visibleImpactUpdates.length,
  };

  return (
    <ProtectedDashboard allowedRoles={["ADMIN"]}>
      <DashboardLayout>
        <DashboardHeader
          title="Workspace Admin Pantiku"
          subtitle="Pantau kepercayaan platform lewat ringkasan moderasi, verifikasi panti, dan review campaign."
          badge={
            isDemoMode ? (
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">Demo data</span>
            ) : null
          }
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardStatCard label="Panti Pending Verification" value={String(summary.pendingOrphanages)} />
          <DashboardStatCard label="Campaign Aktif" value={String(summary.activeCampaigns)} />
          <DashboardStatCard label="Produk Aktif" value={String(summary.activeProducts)} />
          <DashboardStatCard label="Impact Updates" value={String(summary.impactUpdates)} />
        </div>

        <DashboardSection title="Orphanage Verification Queue">
          {pendingOrphanages.length === 0 ? (
            <EmptyState title="Belum ada panti menunggu verifikasi" description="Pengajuan verifikasi panti baru akan muncul di sini." />
          ) : (
            <div className="space-y-3">
              {pendingOrphanages.map((item) => (
                <ModerationCard
                  key={item.id}
                  title={item.name}
                  meta={`Manager: ${item.managerUserId} · Lokasi: ${item.location} · Diajukan: ${new Date(item.submittedAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}`}
                  actions={
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          approveOrphanage(item.id);
                          showToast("Panti berhasil diverifikasi.");
                        }}
                        className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => setRejectingId((prev) => (prev === item.id ? null : item.id))}
                        className="rounded-lg border border-rose-300 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
                      >
                        Reject
                      </button>
                    </>
                  }
                >
                  <StatusBadge label="PENDING" tone="warning" />
                  {rejectingId === item.id ? (
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => {
                          const reason = window.prompt("Alasan penolakan verifikasi panti:");
                          if (!reason || !reason.trim()) return;
                          rejectOrphanage(item.id, reason.trim());
                          setRejectingId(null);
                          showToast("Pengajuan panti ditolak.");
                        }}
                        className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700"
                      >
                        Isi Alasan & Konfirmasi Reject
                      </button>
                    </div>
                  ) : null}
                </ModerationCard>
              ))}
            </div>
          )}
        </DashboardSection>

        <DashboardSection title="Campaign Moderation">
          {campaigns.length === 0 ? (
            <EmptyState title="Belum ada campaign untuk dimoderasi" description="Campaign baru akan muncul di sini setelah dibuat oleh panti." />
          ) : (
            <div className="space-y-3">
              {campaigns.map((item) => (
                <ModerationCard
                  key={item.id}
                  title={item.title}
                  meta={`Target: Rp ${item.targetAmount.toLocaleString("id-ID")} · Created by: ${item.createdBy} · Dibuat: ${new Date(item.createdAt).toLocaleDateString(
                    "id-ID",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}`}
                  actions={
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          updateCampaign(item.id, { status: "ACTIVE", rejectionReason: undefined });
                          showToast("Campaign diaktifkan.");
                        }}
                        className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                      >
                        Activate
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updateCampaign(item.id, { status: "PAUSED" });
                          showToast("Campaign dijeda.");
                        }}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        Pause
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const reason = window.prompt("Alasan penolakan campaign:");
                          if (!reason || !reason.trim()) return;
                          updateCampaign(item.id, { status: "REJECTED", rejectionReason: reason.trim() });
                          showToast("Campaign ditolak.");
                        }}
                        className="rounded-lg border border-rose-300 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
                      >
                        Reject
                      </button>
                    </>
                  }
                >
                  <StatusBadge
                    label={item.status}
                    tone={item.status === "ACTIVE" ? "success" : item.status === "REJECTED" ? "danger" : item.status === "PAUSED" ? "warning" : "neutral"}
                  />
                  {item.rejectionReason ? <p className="mt-2 text-xs text-rose-700">Alasan reject: {item.rejectionReason}</p> : null}
                </ModerationCard>
              ))}
            </div>
          )}
        </DashboardSection>

        <DashboardSection title="Product Moderation">
          {products.length === 0 ? (
            <EmptyState title="Belum ada produk untuk dimoderasi" description="Produk baru akan muncul di sini setelah dibuat oleh panti." />
          ) : (
            <div className="space-y-3">
              {products.map((item) => (
                <ModerationCard
                  key={item.id}
                  title={item.name}
                  meta={`Harga: Rp ${item.price.toLocaleString("id-ID")} · Stok: ${item.stock} · Owner: ${item.createdBy} · Dibuat: ${new Date(item.createdAt).toLocaleDateString(
                    "id-ID",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}`}
                  actions={
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          updateProduct(item.id, { status: "ACTIVE", rejectionReason: undefined });
                          showToast("Produk diaktifkan.");
                        }}
                        className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                      >
                        Activate
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updateProduct(item.id, { status: "INACTIVE" });
                          showToast("Produk dinonaktifkan.");
                        }}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        Deactivate
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const reason = window.prompt("Alasan penolakan produk:");
                          if (!reason || !reason.trim()) return;
                          updateProduct(item.id, { status: "REJECTED", rejectionReason: reason.trim() });
                          showToast("Produk ditolak.");
                        }}
                        className="rounded-lg border border-rose-300 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
                      >
                        Reject
                      </button>
                    </>
                  }
                >
                  <StatusBadge
                    label={item.status}
                    tone={item.status === "ACTIVE" ? "success" : item.status === "REJECTED" ? "danger" : item.status === "INACTIVE" ? "warning" : "neutral"}
                  />
                  {item.rejectionReason ? <p className="mt-2 text-xs text-rose-700">Alasan reject: {item.rejectionReason}</p> : null}
                </ModerationCard>
              ))}
            </div>
          )}
        </DashboardSection>

        <DashboardSection title="Impact Update Review">
          {impactUpdates.length === 0 ? (
            <EmptyState title="Belum ada update dampak" description="Update dampak dari panti akan muncul di sini untuk direview admin." />
          ) : (
            <div className="space-y-3">
              {impactUpdates.map((item) => (
                <ModerationCard
                  key={item.id}
                  title={item.title}
                  meta={`Campaign: ${item.campaignId} · Author: ${item.authorRole} · Tanggal: ${new Date(item.date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}`}
                  actions={
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          updateImpactReviewStatus(item.id, "REVIEWED");
                          showToast("Update dampak ditandai reviewed.");
                        }}
                        className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                      >
                        Mark Reviewed
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updateImpactReviewStatus(item.id, "HIDDEN");
                          showToast("Update dampak disembunyikan.");
                        }}
                        className="rounded-lg border border-rose-300 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
                      >
                        Hide Update
                      </button>
                    </>
                  }
                >
                  <StatusBadge
                    label={item.reviewStatus}
                    tone={item.reviewStatus === "REVIEWED" ? "success" : item.reviewStatus === "HIDDEN" ? "danger" : "warning"}
                  />
                </ModerationCard>
              ))}
            </div>
          )}
        </DashboardSection>
      </DashboardLayout>
    </ProtectedDashboard>
  );
}
