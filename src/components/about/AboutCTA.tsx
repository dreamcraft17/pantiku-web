import Link from "next/link";
import { PrimaryButton } from "@/components/common/primary-button";

export function AboutCTA() {
  return (
    <section className="py-20">
      <div className="rounded-[2rem] bg-gradient-to-br from-emerald-700 to-emerald-900 p-8 text-white shadow-xl md:p-12">
        <h2 className="text-3xl font-bold md:text-4xl">Mari Bangun Panti yang Berdaya</h2>
        <p className="mt-4 max-w-3xl text-emerald-50">
          Pantiku membuka ruang bagi donatur, pengelola panti, relawan, dan mitra untuk bersama-sama membangun
          ekosistem yang jujur, hangat, dan berkelanjutan.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <PrimaryButton href="/register" label="Gabung Sekarang" variant="secondary" />
          <Link
            href="/register"
            className="inline-flex h-11 items-center justify-center rounded-md border border-white/70 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Saya Pengelola Panti
          </Link>
          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-md border border-white/70 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Hubungi Tim Pantiku
          </Link>
        </div>
      </div>
    </section>
  );
}
