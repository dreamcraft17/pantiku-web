import Link from "next/link";
import { EmptyState } from "../EmptyState";
import { StatCard } from "../StatCard";
import { VolunteerProfileData } from "@/lib/profile/profile-types";

type Props = {
  data: VolunteerProfileData;
};

export function VolunteerProfile({ data }: Props) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold text-slate-900">Halo, {data.userName}</h2>
          {data.isDemoData ? <span className="inline-flex rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">Demo data</span> : null}
        </div>
        <p className="mt-2 text-sm text-slate-600">{data.welcomeMessage}</p>
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
        <h3 className="text-lg font-semibold text-slate-900">Identitas Relawan</h3>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <article className="rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500">Nama</p>
            <p className="mt-1 font-semibold text-slate-900">{data.userName}</p>
          </article>
          <article className="rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500">Fokus Kontribusi</p>
            <p className="mt-1 font-semibold text-slate-900">{data.focusArea}</p>
          </article>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data.stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} helper={stat.helper} />
        ))}
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Aktivitas Mendatang</h3>
        {data.upcomingActivities.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="Belum ada agenda" description="Jelajahi program panti untuk mulai kontribusi pertamamu." actionLabel="Cari Program" actionHref="/orphanages" />
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {data.upcomingActivities.map((item) => (
              <article key={`${item.title}-${item.date}`} className="rounded-xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.date} · {item.location}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Peluang Relawan</h3>
        {data.opportunities.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="Belum ada peluang tersedia" description="Kami akan menampilkan peluang baru sesuai minat relawanmu." />
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {data.opportunities.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">{item.type}</p>
                <div className="mt-3">
                  <Link href={item.href} className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                    Lihat Detail
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
