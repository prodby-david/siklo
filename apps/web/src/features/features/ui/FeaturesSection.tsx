import React from "react";
import FeatureCard from "../components/FeatureCard";
import { FeaturesSectionProps } from "../types/features.types";
import { defaultFeatures } from "../constants/features.constants";
import { Layers } from "lucide-react";

export default function FeaturesSection({
  title = "Everything you need to run your group",
  subtitle = "Simple, transparent, and built to keep your savings circle running smoothly without any awkward notebooks.",
  features = defaultFeatures,
}: FeaturesSectionProps) {
  return (
    <section className="w-full bg-background py-16 sm:py-24 flex items-center border-t border-neutral-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        <div className="max-w-2xl mb-12 sm:mb-16 text-center flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>Key Capabilities</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal max-w-lg">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
