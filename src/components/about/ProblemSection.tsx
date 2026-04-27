import { CalendarClock, CircleAlert, HandCoins, Sprout } from "lucide-react";

const problems = [
  {
    title: "Donasi Masih Musiman",
    description: "Bantuan sering meningkat pada momen tertentu, tetapi kebutuhan panti tetap berjalan setiap hari.",
    icon: CalendarClock,
  },
  {
    title: "Kebutuhan Tidak Selalu Tepat Sasaran",
    description: "Panti sering menerima bantuan yang tidak sepenuhnya sesuai dengan kebutuhan nyata di lapangan.",
    icon: CircleAlert,
  },
  {
    title: "Panti Sulit Mandiri Secara Ekonomi",
    description: "Banyak panti belum memiliki akses ke model usaha produktif, pendampingan, dan pasar.",
    icon: HandCoins,
  },
  {
    title: "Anak Butuh Ruang Bertumbuh",
    description: "Anak-anak membutuhkan dukungan emosional, keterampilan hidup, dan kesempatan untuk mempersiapkan masa depan.",
    icon: Sprout,
  },
];

export function ProblemSection() {
  return (
    <section className="py-20">
      <div className="mb-8 max-w-3xl">
        <h2 className="text-3xl font-bold text-slate-900">Tantangan yang Ingin Kami Selesaikan</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {problems.map((item) => (
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
