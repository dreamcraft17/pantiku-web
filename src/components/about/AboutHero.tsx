import { Leaf, Sparkles } from "lucide-react";
import { PrimaryButton } from "@/components/common/primary-button";
import { Logo } from "@/components/common/Logo";

export function AboutHero() {
  return (
    <section className="rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-[#FFFCF6] to-emerald-50 p-8 shadow-sm md:p-12">
      <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
            <Sparkles className="h-3.5 w-3.5" />
            Tentang Pantiku
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Pantiku Membangun Ekosistem Kemandirian Panti
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
            Pantiku adalah platform digital yang menghubungkan panti asuhan, donatur, relawan, dan pasar dalam
            satu ekosistem untuk membangun anak yang percaya diri, panti yang mandiri, dan dukungan yang lebih
            transparan.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <PrimaryButton href="/campaigns" label="Jelajahi Campaign" />
            <PrimaryButton href="/register" label="Gabung Sekarang" variant="outline" />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-100 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <Logo size="small" />
              <p className="text-sm font-semibold text-emerald-700">Ekosistem Pemberdayaan Pantiku</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Kami sedang mengembangkan fondasi kolaborasi jangka panjang antara panti, komunitas, dan mitra untuk
              menciptakan dukungan yang lebih berkelanjutan.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
              <Leaf className="h-4 w-4" />
              Sedang dikembangkan dengan kolaborasi awal
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
