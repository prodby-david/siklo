import HeroSection from "@/features/hero/ui/HeroSection";
import PaluwaganCalculator from "@/features/hero/components/PaluwaganCalculator";
import ActivityLog from "@/features/hero/components/ActivityLog";
import Navbar from "@/shared/components/nav/Navbar";
import FeaturesSection from "@/features/features/ui/FeaturesSection";
import Footer from "@/shared/components/footer/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col w-full items-center">
        <HeroSection />

        <section className="w-full border-t border-neutral-border py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <PaluwaganCalculator />
              </div>
              <div className="lg:col-span-5">
                <ActivityLog />
              </div>
            </div>
          </div>
        </section>

        <FeaturesSection />

        <Footer />
      </main>
    </div>
  );
}
