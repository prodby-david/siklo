import type { Metadata } from "next";
import AboutSection from "@/features/about/ui/AboutSection";
import TrustCards from "@/features/about/components/TrustCards";
import FaqSection from "@/features/about/components/FaqSection";
import AboutCoreValues from "@/features/about/components/AboutCoreValues";
import Navbar from "@/shared/components/nav/Navbar";
import Footer from "@/shared/components/footer/Footer";
import { defaultAboutItems } from "@/features/about/constants/about.constants";

export const metadata: Metadata = {
  title: "About Us | Siklo - Simple & Clear Paluwagan Savings Notebook",
  description: "Siklo is a clean online notebook for your Paluwagan. Easily see who has paid, who gets the money next, and keep your group savings records clear.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-clip">
      <Navbar />
      <main className="flex-1 flex flex-col w-full items-center overflow-x-clip">
        <AboutSection
          title="A simple, clear way to save together"
          description="Siklo is a clean online notebook for your Paluwagan. It helps everyone see who has paid, who gets the money next, and keeps your records safe and clear."
          items={defaultAboutItems}
        />

        <section className="w-full bg-brand-accent/10 border-y border-brand-accent/20 py-16 sm:py-24 transition-colors duration-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AboutCoreValues />
          </div>
        </section>

        <section className="w-full bg-background py-16 sm:py-24 border-b border-neutral-border/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TrustCards />
          </div>
        </section>

        <section className="w-full bg-brand-accent/10 border-y border-brand-accent/20 py-16 sm:py-24 transition-colors duration-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FaqSection />
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
