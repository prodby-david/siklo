import AboutSection from "./AboutSection";
import TrustCards from "../components/TrustCards";
import PaluwaganSafetyStandards from "../components/PaluwaganSafetyStandards";
import AboutCoreValues from "../components/AboutCoreValues";
import PaluwaganTermsGuide from "../components/PaluwaganTermsGuide";
import { defaultAboutItems } from "../constants/about.constants";

export default function AboutUI() {
  return (
    <>
      <div id="overview" className="w-full scroll-mt-24">
        <AboutSection
          title="A simple, clear way to save together"
          description="Siklo is a clean online notebook for your Paluwagan. It helps everyone see who has paid, who gets the money next, and keeps your records safe and clear."
          items={defaultAboutItems}
        />
      </div>

      <section id="core-pillars" className="w-full bg-transparent relative z-10 border-y border-brand-accent/20 py-16 sm:py-24 transition-colors duration-300 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AboutCoreValues />
        </div>
      </section>

      <section id="terms-guide" className="w-full bg-transparent relative z-10 py-16 sm:py-24 border-b border-brand-accent/20 transition-colors duration-300 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PaluwaganTermsGuide />
        </div>
      </section>

      <section id="transparency" className="w-full bg-transparent relative z-10 py-16 sm:py-24 border-b border-brand-accent/20 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TrustCards />
        </div>
      </section>

      <section id="safety-standards" className="w-full bg-transparent relative z-10 border-y border-brand-accent/20 py-16 sm:py-24 transition-colors duration-300 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PaluwaganSafetyStandards />
        </div>
      </section>
    </>
  );
}
