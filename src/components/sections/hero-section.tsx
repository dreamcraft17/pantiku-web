import { PrimaryButton } from "../common/primary-button";

export function HeroSection() {
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-20 md:px-10 md:pb-20 md:pt-24">
        <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">Bangun Kemandirian Panti, Bukan Sekadar Donasi</h1>
        <p className="mt-5 max-w-3xl text-emerald-50">
          Pantiku menghubungkan panti asuhan, donatur, relawan, dan pasar dalam satu ekosistem digital untuk membangun anak
          yang percaya diri dan panti yang mandiri.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryButton href="/campaigns" label="Jelajahi Campaign" variant="secondary" />
          <PrimaryButton href="/impact" label="Lihat Dampak" variant="outline" />
        </div>
      </div>
    </section>
  );
}
