import { PrimaryButton } from "@/components/common/primary-button";
import Link from "next/link";

export function LandingCtaSection() {
  return (
    <section className="py-16">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-700 to-emerald-900 p-10 text-white shadow-xl md:p-12">
        <div className="pointer-events-none absolute -right-10 top-8 h-44 w-44 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-6 bottom-0 h-36 w-36 rounded-full bg-amber-200/20 blur-2xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Mulai Langkah Awal Bersama Pantiku</h2>
            <p className="mt-3 max-w-2xl text-sm text-emerald-50 md:text-base">
              Bergabung sebagai donatur, relawan, atau pengelola panti untuk membangun ekosistem pemberdayaan yang jujur, hangat, dan berkelanjutan.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryButton href="/register" label="Gabung Sekarang" variant="secondary" />
              <Link
                href="/campaigns"
                className="inline-flex h-11 items-center justify-center rounded-md border border-white/70 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Jelajahi Campaign
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {["Campaign Produktif", "Marketplace Panti", "Laporan Dampak"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/20 bg-white/10 p-4 text-sm font-medium text-white">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
