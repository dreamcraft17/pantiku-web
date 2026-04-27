"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrphanages } from "@/lib/api/orphanages";
import { OrphanageCard } from "@/features/orphanages/components/orphanage-card";
import { SectionHeader } from "@/components/common/section-header";
import { LoadingState } from "@/components/common/loading-state";
import { EmptyState } from "@/components/common/empty-state";

export default function OrphanagesPage() {
  const query = useQuery({ queryKey: ["orphanages"], queryFn: getOrphanages });

  return (
    <section>
      <SectionHeader eyebrow="Panti Berdaya" title="Mitra Panti dalam Ekosistem Pantiku" />
      {query.isLoading ? <LoadingState message="Memuat profil panti..." /> : null}
      {query.data && query.data.length === 0 ? (
        <EmptyState title="Belum ada panti terdaftar" description="Profil panti akan tersedia segera." />
      ) : null}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {query.data?.map((item) => <OrphanageCard key={item.id} orphanage={item} />)}
      </div>
    </section>
  );
}
