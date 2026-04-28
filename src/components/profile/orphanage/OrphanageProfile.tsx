import Link from "next/link";
import { EmptyState } from "../EmptyState";
import { StatCard } from "../StatCard";
import { OrphanageProfileData } from "@/lib/profile/profile-types";

type Props = {
  data: OrphanageProfileData;
};

function getVerificationBadge(status: "PENDING" | "VERIFIED" | "REJECTED") {
  if (status === "VERIFIED") {
    return <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">Panti Terverifikasi</span>;
  }
  if (status === "REJECTED") {
    return <span className="inline-flex rounded-full border border-rose-200 bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800">Perlu Perbaikan</span>;
  }
  return <span className="inline-flex rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Menunggu Verifikasi</span>;
}

export function OrphanageProfile({ data }: Props) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Halo, {data.managerName}</h2>
        <p className="mt-2 text-sm text-slate-600">{data.welcomeMessage}</p>
        <div className="mt-3">{getVerificationBadge(data.verificationStatus)}</div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={data.ctas[0].href} className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
            {data.ctas[0].label}
          </Link>
          <Link href={data.ctas[1].href} className="rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
            {data.ctas[1].label}
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Identitas Panti</h3>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <article className="rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500">Nama Panti</p>
            <p className="mt-1 font-semibold text-slate-900">{data.orphanageName}</p>
          </article>
          <article className="rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500">Lokasi</p>
            <p className="mt-1 font-semibold text-slate-900">{data.location}</p>
          </article>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data.stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} helper={stat.helper} />
        ))}
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Ringkasan Campaign</h3>
        {data.campaignSummary.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="Belum ada campaign" description="Mulai buat campaign pertama untuk mendukung kebutuhan produktif panti." actionLabel="Buat Campaign" actionHref="/campaigns" />
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {data.campaignSummary.map((campaign) => (
              <article key={campaign.name} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-slate-900">{campaign.name}</p>
                  <span className="text-sm font-semibold text-emerald-700">{campaign.raised}</span>
                </div>
                <p className="mt-2 text-xs text-slate-600">Progress: {campaign.progress}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Ringkasan Produk Marketplace</h3>
        {data.productSummary.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="Belum ada produk" description="Tambahkan produk karya panti agar bisa menjangkau lebih banyak pembeli." actionLabel="Kelola Produk" actionHref="/marketplace" />
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {data.productSummary.map((product) => (
              <article key={product.name} className="rounded-xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">{product.name}</p>
                <p className="mt-2 inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">{product.status}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
