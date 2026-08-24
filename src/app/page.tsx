import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { FutureSection } from "@/components/sections/FutureSection";
import { Hero } from "@/components/sections/Hero";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { OwnershipSection } from "@/components/sections/OwnershipSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ProtectedAssetsSection } from "@/components/sections/ProtectedAssetsSection";
import { RiskSection } from "@/components/sections/RiskSection";
import { SettlementSection } from "@/components/sections/SettlementSection";
import { VisionSection } from "@/components/sections/VisionSection";

export default function HomePage() {
  return (
    <main id="main" className="relative min-w-0 overflow-x-clip">
      <Hero />
      <ProblemSection />
      <ProtectedAssetsSection />
      <OwnershipSection />
      <HowItWorksSection />
      <SettlementSection />
      <FeaturesSection />
      <ArchitectureSection />
      <RiskSection />
      <FutureSection />
      <VisionSection />
      <FinalCtaSection />
    </main>
  );
}
