import Image from "next/image";
import { BarChart3, Heart, Sprout } from "lucide-react";
import { PrimaryButton } from "@/components/common/primary-button";

export function LandingHeroSection() {
  return (
    <section className="py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-800">
            Ekosistem Pemberdayaan Panti
          </span>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Bangun Kemandirian Panti,
            <br />
            Bukan Sekadar Donasi
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            Pantiku menghubungkan panti asuhan, donatur, relawan, dan pasar dalam satu ekosistem digital untuk membangun anak
            yang percaya diri dan panti yang mandiri.
          </p>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton href="/campaigns" label="Jelajahi Campaign" />
            <PrimaryButton href="/impact" label="Lihat Dampak" variant="outline" />
          </div>
          <p className="text-sm text-slate-500">Bersama komunitas awal Pantiku, kita wujudkan panti yang berdaya.</p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute right-10 top-10 h-32 w-32 rounded-full bg-emerald-200 opacity-50 blur-2xl" />
          <div className="relative h-[350px] w-full overflow-hidden rounded-[2rem] border border-emerald-100 shadow-xl sm:h-[420px] md:h-[450px]">
            <Image
              src="/homepage/hp.png"
              alt="Anak-anak program Pantiku"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute -right-4 top-6 rounded-2xl bg-amber-200 p-3 shadow-md">
            <Heart className="h-5 w-5 text-amber-700" />
          </div>
          <div className="absolute -bottom-4 left-4 rounded-2xl bg-emerald-200 p-3 shadow-md">
            <Sprout className="h-5 w-5 text-emerald-800" />
          </div>
          <div className="absolute bottom-8 right-6 rounded-2xl bg-white/90 p-3 shadow-md">
            <BarChart3 className="h-5 w-5 text-emerald-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
