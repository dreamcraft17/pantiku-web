import { PrimaryButton } from "@/components/common/primary-button";

const upcoming = [
  {
    title: "Campaign Produktif Terverifikasi",
    description: "Campaign disusun berdasarkan kebutuhan nyata dan diverifikasi."
  },
  {
    title: "Marketplace Produk Karya Panti",
    description: "Produk panti akan dikurasi sebelum ditampilkan ke publik."
  },
  {
    title: "Laporan Dampak Transparan",
    description: "Setiap dukungan diarahkan pada dampak yang bisa dipantau."
  }
];

export function PilotProgramSection() {
  return (
    <section className="py-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-emerald-50/60 p-8 md:p-10">
        <div className="pointer-events-none absolute -top-8 right-10 h-40 w-40 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-emerald-800">
              Program Pilot
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900">
              Campaign Pertama Sedang Disiapkan Bersama Panti Mitra
            </h2>
            <p className="mt-3 max-w-xl text-slate-600">
              Pantiku sedang membuka kolaborasi awal dengan panti mitra untuk menyiapkan campaign produktif dan produk karya panti pertama yang terverifikasi.
            </p>
            <div className="mt-6">
              <PrimaryButton href="/register" label="Saya Pengelola Panti" />
            </div>
          </div>

          <div className="space-y-3">
            {upcoming.map((item) => (
              <article key={item.title} className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
