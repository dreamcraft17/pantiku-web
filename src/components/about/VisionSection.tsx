import { CheckCircle2 } from "lucide-react";

const visions = [
  "Anak panti memiliki keterampilan dan kepercayaan diri.",
  "Panti memiliki sumber pendapatan produktif.",
  "Donatur dapat melihat dampak dukungannya secara lebih transparan.",
  "Produk karya panti dapat masuk ke pasar yang lebih luas.",
  "Panti menjadi bagian dari ekosistem pengembangan talenta.",
];

export function VisionSection() {
  return (
    <section className="py-20">
      <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm md:p-10">
        <h2 className="text-3xl font-bold text-slate-900">Visi Jangka Panjang</h2>
        <p className="mt-4 max-w-4xl leading-relaxed text-slate-600">
          Pantiku membayangkan panti asuhan bukan lagi hanya dilihat sebagai tempat kekurangan, tetapi sebagai
          komunitas pengembangan manusia. Dalam jangka panjang, panti dapat menjadi ruang tumbuh bagi anak-anak yang
          percaya diri, terampil, dan siap membangun masa depan.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {visions.map((item) => (
            <div key={item} className="flex items-start gap-2 rounded-xl bg-emerald-50/60 p-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <p className="text-sm text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
