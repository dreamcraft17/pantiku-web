"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOrphanageById } from "@/lib/api/orphanages";
import { LoadingState } from "@/components/common/loading-state";
import { EmptyState } from "@/components/common/empty-state";
import { PrimaryButton } from "@/components/common/primary-button";

export default function OrphanageDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const query = useQuery({ queryKey: ["orphanage", id], queryFn: () => getOrphanageById(id) });

  if (query.isLoading) return <LoadingState message="Memuat profil panti..." />;
  if (!query.data) return <EmptyState title="Profil panti tidak ditemukan" description="Silakan jelajahi panti lain." />;

  const orphanage = query.data;

  return (
    <section className="rounded-xl bg-white p-6">
      <p className="text-sm font-semibold text-emerald-700">Panti Berdaya</p>
      <h1 className="mt-2 text-3xl font-bold">{orphanage.name}</h1>
      <p className="mt-2 text-slate-600">{orphanage.location}</p>
      <p className="mt-4 text-slate-700">{orphanage.description}</p>
      <div className="mt-6">
        <PrimaryButton label="Dukung Campaign" href="/campaigns" />
      </div>
    </section>
  );
}
