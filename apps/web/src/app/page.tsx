"use client";

import HeroSection from "@/features/hero/ui/HeroSection";
import RotationSystemSection from "@/features/hero/components/RotationSystemSection";
import PaluwaganComparisonSection from "@/features/hero/components/PaluwaganComparisonSection";
import PaluwaganFinalCtaSection from "@/features/hero/components/PaluwaganFinalCtaSection";
import Navbar from "@/shared/components/nav/Navbar";
import Footer from "@/shared/components/footer/Footer";
import DotsBackground from "@/shared/components/ui/DotsBackground";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-clip">
      <Navbar />
      <main className="flex-1 flex flex-col w-full items-center overflow-x-clip">
        <HeroSection />
        <DotsBackground />
        <RotationSystemSection />
        <PaluwaganComparisonSection />
        <PaluwaganFinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
