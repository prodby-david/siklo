"use client";

import HeroSection from "@/features/hero/ui/HeroSection";
import CycleTurnShowcase from "@/features/hero/components/CycleTurnShowcase";
import SmartLedgerGuarantee from "@/features/hero/components/SmartLedgerGuarantee";
import HeroSplashContainer from "@/features/hero/components/splash/HeroSplashContainer";
import Navbar from "@/shared/components/nav/Navbar";
import FeaturesSection from "@/features/features/ui/FeaturesSection";
import Footer from "@/shared/components/footer/Footer";
import { ParallaxProvider } from "react-scroll-parallax";
import { RotateCw } from "lucide-react";

export default function Home() {
  return (
    <ParallaxProvider>
      <HeroSplashContainer />
      <div className="flex flex-col min-h-screen bg-background overflow-x-clip">
        <Navbar />
        <main className="flex-1 flex flex-col w-full items-center overflow-x-clip">
          <HeroSection />

          <section className="w-full bg-brand-accent/10 border-y border-brand-accent/20 py-16 sm:py-24 flex flex-col gap-10 sm:gap-14 transition-colors duration-300">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center flex flex-col items-center gap-3.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/15 border border-brand-accent/30 text-brand-accent text-xs font-bold">
                <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Rotation System</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
                Automated Turn Scheduling & Guaranteed Payouts
              </h2>
              <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal max-w-xl">
                Track every payout turn, contribution progress, and payout lump sum in real-time with full group transparency.
              </p>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
              <CycleTurnShowcase />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
              <SmartLedgerGuarantee />
            </div>
          </section>

          <FeaturesSection />

          <Footer />
        </main>
      </div>
    </ParallaxProvider>
  );
}
