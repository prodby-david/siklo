import AboutSection from "@/features/about/ui/AboutSection";
import TrustCards from "@/features/about/components/TrustCards";
import FaqSection from "@/features/about/components/FaqSection";
import Navbar from "@/shared/components/nav/Navbar";
import Footer from "@/shared/components/footer/Footer";
import { defaultAboutItems } from "@/features/about/constants/about.constants";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-table-stripe/20">
      <Navbar />
      <main className="flex-1 flex flex-col w-full items-center">
        <AboutSection
          title="A simple, clear way to save together"
          description="Siklo is a clean online notebook for your Paluwagan. It helps everyone see who has paid, who gets the money next, and keeps your records safe and clear."
          items={defaultAboutItems}
        />

        <section className="w-full border-t border-neutral-border py-12 bg-neutral-table-stripe/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
            <TrustCards />
            <FaqSection />
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
