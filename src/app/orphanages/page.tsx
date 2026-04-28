"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrphanages } from "@/lib/api/orphanages";
import { OrphanageCard } from "@/features/orphanages/components/orphanage-card";
import { SectionHeader } from "@/components/common/section-header";
import { LoadingState } from "@/components/common/loading-state";
import { EmptyState } from "@/components/common/empty-state";
import { useOrphanageStore } from "@/features/orphanages/store/orphanage-store";

export default function OrphanagesPage() {
  const query = useQuery({ queryKey: ["orphanages"], queryFn: getOrphanages });
  const orphanages = useOrphanageStore((state) => state.orphanages);
  const localVerifiedOrphanages = orphanages
    .filter((item) => item.verificationStatus === "VERIFIED")
    .map((item) => ({
      id: item.id,
      name: item.name,
      location: item.location,
      description: item.description ?? "Profil panti terverifikasi di Pantiku.",
      verificationStatus: item.verificationStatus,
    }));
  const mergedOrphanages = [...localVerifiedOrphanages, ...(query.data ?? [])];

  return (
    <section>
      <SectionHeader eyebrow="Panti Berdaya" title="Mitra Panti dalam Ekosistem Pantiku" />
      {query.isLoading && localVerifiedOrphanages.length === 0 ? <LoadingState message="Memuat profil panti..." /> : null}
      {mergedOrphanages.length === 0 ? (
        <EmptyState title="Belum ada panti terdaftar" description="Profil panti akan tersedia segera." />
      ) : null}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {mergedOrphanages.map((item) => <OrphanageCard key={item.id} orphanage={item} />)}
      </div>
    </section>
  );
}
