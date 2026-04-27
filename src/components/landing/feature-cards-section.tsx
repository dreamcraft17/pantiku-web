import { BarChart3, Heart, ShoppingBag, Users } from "lucide-react";

const features = [
  {
    title: "Dukung Campaign",
    description: "Bantu panti mengembangkan program produktif dan berkelanjutan.",
    icon: Heart
  },
  {
    title: "Beli Produk Karya Panti",
    description: "Dukung kemandirian panti melalui produk berkualitas.",
    icon: ShoppingBag
  },
  {
    title: "Jadi Relawan",
    description: "Berbagi waktu dan keahlian untuk dampak yang lebih besar.",
    icon: Users
  },
  {
    title: "Lihat Dampak Nyata",
    description: "Pantau transparansi dan dampak setiap dukungan.",
    icon: BarChart3
  }
];

export function FeatureCardsSection() {
  return (
    <section className="py-16">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Cara Berkontribusi</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Banyak Cara untuk Membangun Panti yang Berdaya</h2>
        <p className="mt-3 text-slate-600">
          Pantiku membuka ruang kolaborasi untuk donatur, pengelola panti, relawan, dan mitra.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="inline-flex rounded-xl bg-emerald-100 p-2.5">
                <Icon className="h-5 w-5 text-emerald-700" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
