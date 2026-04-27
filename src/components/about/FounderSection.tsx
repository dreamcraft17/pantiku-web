import { Mail, Phone } from "lucide-react";

export function FounderSection() {
  return (
    <section className="py-20">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900">Dibangun dari Kepedulian dan Aksi</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Pantiku digagas oleh Eko Kristino Butar-Butar sebagai inisiatif untuk membangun sistem yang lebih
            berkelanjutan bagi panti asuhan dan anak-anak di dalamnya. Saat ini Pantiku berada pada tahap
            pengembangan awal dan membuka ruang kolaborasi dengan CTO, relawan, mitra panti, dan pihak yang memiliki
            semangat membangun dampak sosial berkelanjutan.
          </p>
        </article>

        <article className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">Founder Pantiku</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">Eko Kristino Butar-Butar</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Memimpin arah strategi, pengembangan ekosistem, kemitraan, desain produk, dan program sosial Pantiku.
          </p>
          <div className="mt-5 space-y-2 text-sm text-slate-700">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-700" />
              butarbutarkristino@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-700" />
              0811 6121 146
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
