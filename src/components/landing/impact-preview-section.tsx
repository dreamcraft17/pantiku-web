import { BarChart3, HeartHandshake, ShoppingBag, UsersRound } from "lucide-react";

const impactQualitative = [
  {
    title: "Anak Bertumbuh Percaya Diri",
    description: "Anak mendapat ruang untuk mengembangkan keterampilan, karakter, dan masa depan.",
    icon: UsersRound
  },
  {
    title: "Panti Lebih Mandiri",
    description: "Panti memiliki peluang membangun aktivitas produktif dan sumber pendapatan berkelanjutan.",
    icon: HeartHandshake
  },
  {
    title: "Donasi Lebih Transparan",
    description: "Dukungan diarahkan pada kebutuhan nyata dengan pelaporan yang jelas.",
    icon: BarChart3
  },
  {
    title: "Produk Panti Masuk Pasar",
    description: "Karya panti dapat menjangkau pembeli dan membuka peluang ekonomi baru.",
    icon: ShoppingBag
  }
];

export function ImpactPreviewSection() {
  return (
    <section className="py-16">
      <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm md:p-10">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Dampak yang Ingin Kita Bangun Bersama</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Pantiku tidak hanya menyalurkan bantuan, tetapi membangun ekosistem agar anak bertumbuh, panti mandiri, dan dukungan menjadi lebih transparan.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {impactQualitative.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="inline-flex rounded-xl bg-emerald-50 p-2.5">
                <item.icon className="h-5 w-5 text-emerald-700" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
