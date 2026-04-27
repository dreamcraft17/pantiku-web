import { Eye, Gem, ShieldCheck, Target } from "lucide-react";

const differentiators = [
  {
    title: "Bukan Sekadar Donasi",
    description: "Pantiku mendorong dukungan yang produktif, terarah, dan berkelanjutan.",
    icon: Target,
  },
  {
    title: "Fokus pada Kemandirian",
    description: "Tujuan akhirnya bukan hanya membantu panti bertahan, tetapi membantu panti menjadi lebih berdaya.",
    icon: Gem,
  },
  {
    title: "Anak sebagai Potensi",
    description: "Kami melihat anak panti bukan sebagai objek belas kasihan, tetapi sebagai generasi yang punya potensi untuk tumbuh.",
    icon: Eye,
  },
  {
    title: "Transparansi Dampak",
    description: "Setiap dukungan diarahkan agar dapat dipantau melalui laporan dan indikator dampak.",
    icon: ShieldCheck,
  },
];

export function DifferenceSection() {
  return (
    <section className="py-20">
      <div className="mb-8 max-w-3xl">
        <h2 className="text-3xl font-bold text-slate-900">Apa yang Membuat Pantiku Berbeda?</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {differentiators.map((item) => (
          <article key={item.title} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="inline-flex rounded-xl bg-emerald-50 p-2.5">
              <item.icon className="h-5 w-5 text-emerald-700" />
            </div>
            <h3 className="mt-3 text-base font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
