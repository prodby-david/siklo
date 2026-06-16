import React from "react";
import StepCard from "../components/StepCard";
import { HowItWorksProps } from "../types/howitworks.types";
import { defaultSteps } from "../constants/howitworks.constants";

export const HowItWorksSection = ({
  title = "How to use this tool",
  description = "A simple 3-step guide to run your saving group without any stress or math.",
  steps = defaultSteps,
}: HowItWorksProps) => {
  return (
    <section className="w-full bg-background py-12 md:py-20 flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        <div className="max-w-2xl mb-12 text-center flex flex-col items-center gap-3">
          <span className="text-xs font-bold text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded">
            Operational Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal max-w-lg">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
          {steps.map((step) => (
            <StepCard key={step.stepNumber} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
