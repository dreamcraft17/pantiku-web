import { HeartHandshake, Lightbulb, Store } from "lucide-react";

const approaches = [
  {
    title: "Care & Empowerment",
    description: "Dukungan emosional, mentoring, pelatihan keterampilan, dan pengembangan karakter anak.",
    icon: HeartHandshake,
  },
  {
    title: "Economic Enablement",
    description:
      "Campaign produktif untuk alat, modal, pelatihan, dan pendampingan agar panti dapat membangun kegiatan ekonomi.",
    icon: Lightbulb,
  },
  {
    title: "Digital Marketplace",
    description: "Produk karya panti dipasarkan secara digital sehingga dukungan dapat berlanjut melalui transaksi yang bernilai.",
    icon: Store,
  },
];

export function ApproachSection() {
  return (
    <section className="py-20">
      <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm md:p-10">
        <h2 className="text-3xl font-bold text-slate-900">Pendekatan Pantiku</h2>
        <p className="mt-4 max-w-4xl leading-relaxed text-slate-600">
          Pantiku mengubah paradigma donasi dari bantuan satu arah menjadi kolaborasi berkelanjutan. Dukungan tidak
          berhenti pada pemberian barang atau dana, tetapi diarahkan untuk membangun program produktif, pelatihan
          keterampilan, pendampingan, dan akses pasar bagi produk karya panti.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {approaches.map((item) => (
            <article key={item.title} className="rounded-2xl border border-emerald-100 bg-[#FFFCF6] p-5">
              <div className="inline-flex rounded-xl bg-emerald-100 p-2.5">
                <item.icon className="h-5 w-5 text-emerald-700" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
