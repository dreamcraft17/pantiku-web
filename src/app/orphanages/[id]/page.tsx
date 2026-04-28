"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOrphanageById } from "@/lib/api/orphanages";
import { LoadingState } from "@/components/common/loading-state";
import { EmptyState } from "@/components/common/empty-state";
import { PrimaryButton } from "@/components/common/primary-button";
import { useOrphanageStore } from "@/features/orphanages/store/orphanage-store";

export default function OrphanageDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const query = useQuery({ queryKey: ["orphanage", id], queryFn: () => getOrphanageById(id) });
  const orphanages = useOrphanageStore((state) => state.orphanages);
  const localOrphanage = orphanages.find((item) => item.id === id && item.verificationStatus === "VERIFIED");

  if (query.isLoading && !localOrphanage) return <LoadingState message="Memuat profil panti..." />;
  if (!query.data && !localOrphanage) return <EmptyState title="Profil panti tidak ditemukan" description="Silakan jelajahi panti lain." />;

  const orphanage = localOrphanage ?? query.data;
  if (!orphanage) return <EmptyState title="Profil panti tidak ditemukan" description="Silakan jelajahi panti lain." />;

  return (
    <section className="rounded-xl bg-white p-6">
      <p className="text-sm font-semibold text-emerald-700">Panti Berdaya</p>
      <h1 className="mt-2 text-3xl font-bold">{orphanage.name}</h1>
      {"verificationStatus" in orphanage && orphanage.verificationStatus === "VERIFIED" ? (
        <p className="mt-2 inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">Panti Terverifikasi</p>
      ) : null}
      <p className="mt-2 text-slate-600">{orphanage.location}</p>
      <p className="mt-4 text-slate-700">{orphanage.description}</p>
      <div className="mt-6">
        <PrimaryButton label="Dukung Campaign" href="/campaigns" />
      </div>
    </section>
  );
}
