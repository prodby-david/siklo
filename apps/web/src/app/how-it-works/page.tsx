import HowItWorksSection from "@/features/howitworks/ui/HowItWorksSection";
import RulesPlanner from "@/features/howitworks/components/RulesPlanner";
import PaluwaganGuide from "@/features/howitworks/components/PaluwaganGuide";
import Navbar from "@/shared/components/nav/Navbar";

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-table-stripe/20">
      <Navbar />
      <main className="flex-1 flex flex-col w-full items-center">
        <HowItWorksSection />

        <section className="w-full border-t border-neutral-border py-12 bg-neutral-table-stripe/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RulesPlanner />
            <PaluwaganGuide />
          </div>
        </section>
      </main>
    </div>
  );
}
