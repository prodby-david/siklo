import HowItWorksSection from "./HowItWorksSection";
import PaluwaganSimulator from "../components/simulator/PaluwaganSimulator";
import PaluwaganGuide from "../components/PaluwaganGuide";

export default function HowItWorksUI() {
  return (
    <>
      <div id="how-it-works-steps" className="w-full scroll-mt-24">
        <HowItWorksSection />
      </div>

      <section id="cycle-calculator" className="w-full bg-transparent relative z-10 border-y border-brand-accent/20 py-16 sm:py-24 transition-colors duration-300 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PaluwaganSimulator />
        </div>
      </section>

      <section id="best-practices" className="w-full bg-transparent relative z-10 py-16 sm:py-24 border-b border-brand-accent/20 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PaluwaganGuide />
        </div>
      </section>
    </>
  );
}
