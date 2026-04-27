import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { AboutCTA } from "@/components/about/AboutCTA";
import { AboutHero } from "@/components/about/AboutHero";
import { ApproachSection } from "@/components/about/ApproachSection";
import { DifferenceSection } from "@/components/about/DifferenceSection";
import { EcosystemFlow } from "@/components/about/EcosystemFlow";
import { FounderSection } from "@/components/about/FounderSection";
import { ProblemSection } from "@/components/about/ProblemSection";
import { VisionSection } from "@/components/about/VisionSection";

export const metadata: Metadata = {
  title: "Tentang Kami | Pantiku",
  description:
    "Pantiku adalah ekosistem digital untuk membangun kemandirian panti asuhan melalui campaign produktif, pemberdayaan anak, marketplace, dan transparansi dampak.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl overflow-x-hidden bg-[#FFFCF6]">
      <AboutHero />

      <section className="py-20">
        <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-3xl font-bold text-slate-900">Mengapa Pantiku Hadir?</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Selama ini, banyak panti asuhan bergantung pada donasi satu arah. Bantuan sering datang secara musiman,
            tidak selalu sesuai kebutuhan, dan belum cukup untuk membangun kemandirian jangka panjang. Anak-anak di
            panti tidak hanya membutuhkan pemenuhan kebutuhan dasar, tetapi juga dukungan emosional, pengembangan
            keterampilan, kepercayaan diri, dan kesiapan untuk hidup mandiri.
          </p>
          <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
            <p className="flex items-center gap-2 text-lg font-semibold text-emerald-800">
              <Quote className="h-5 w-5" />
              Pantiku tidak hanya membangun platform. Pantiku membangun manusia.
            </p>
          </div>
        </div>
      </section>

      <ProblemSection />
      <ApproachSection />
      <EcosystemFlow />
      <DifferenceSection />
      <VisionSection />
      <FounderSection />
      <AboutCTA />
    </div>
  );
}
