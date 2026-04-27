import { LandingHeroSection } from "@/components/landing/hero-section";
import { FeatureCardsSection } from "@/components/landing/feature-cards-section";
import { PilotProgramSection } from "@/components/landing/pilot-program-section";
import { ImpactPreviewSection } from "@/components/landing/impact-preview-section";
import { LandingCtaSection } from "@/components/landing/cta-section";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-[#FFFCF6]">
      <LandingHeroSection />
      <FeatureCardsSection />
      <PilotProgramSection />
      <ImpactPreviewSection />
      <LandingCtaSection />
    </div>
  );
}
