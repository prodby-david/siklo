import type { Metadata } from "next";
import HowItWorksSection from "@/features/howitworks/ui/HowItWorksSection";
import PaluwaganSimulator from "@/features/howitworks/components/simulator/PaluwaganSimulator";
import PaluwaganGuide from "@/features/howitworks/components/PaluwaganGuide";
import Navbar from "@/shared/components/nav/Navbar";
import Footer from "@/shared/components/footer/Footer";

export const metadata: Metadata = {
  title: "How It Works | Siklo - 3-Step Rotation Savings Guide",
  description: "Learn how Siklo simplifies Paluwagan rotation savings in 3 easy steps. Simulate contributions, preview payout turns, and follow circle best practices.",
};

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-clip">
      <Navbar />
      <main className="flex-1 flex flex-col w-full items-center overflow-x-clip">
        <HowItWorksSection />

        <section className="w-full bg-brand-accent/10 border-y border-brand-accent/20 py-16 sm:py-24 transition-colors duration-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <PaluwaganSimulator />
          </div>
        </section>

        <section className="w-full bg-background py-16 sm:py-24 border-b border-neutral-border/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <PaluwaganGuide />
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
