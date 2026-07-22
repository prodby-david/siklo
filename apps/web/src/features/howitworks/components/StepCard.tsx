import React from "react";
import { UserPlus, ClipboardCheck, Coins } from "lucide-react";
import { HowItWorksStep } from "../types/howitworks.types";

interface StepCardProps {
  step: HowItWorksStep;
}

const getStepIcon = (stepNumber: number) => {
  const className = "h-5 w-5 text-brand-accent group-hover:text-white transition-colors duration-300";
  switch (stepNumber) {
    case 1:
      return <UserPlus className={className} />;
    case 2:
      return <ClipboardCheck className={className} />;
    case 3:
      return <Coins className={className} />;
    default:
      return null;
  }
};

export const StepCard = ({ step }: StepCardProps) => {
  return (
    <div className="group rounded-3xl border border-neutral-border/80 bg-neutral-table-stripe/80 p-6 sm:p-7 flex flex-col gap-4 hover:border-brand-accent/40 hover:bg-neutral-table-stripe transition-all duration-300">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-brand-accent/10 px-3 py-1 text-xs font-extrabold text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 border border-brand-accent/20">
          Step 0{step.stepNumber}
        </span>
        <div className="h-10 w-10 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center group-hover:bg-brand-accent transition-all duration-300">
          {getStepIcon(step.stepNumber)}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h4 className="text-base font-extrabold text-foreground">{step.title}</h4>
        <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal">
          {step.description}
        </p>
      </div>
    </div>
  );
};

export default StepCard;
