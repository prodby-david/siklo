import React from "react";
import { UserPlus, ClipboardCheck, Coins } from "lucide-react";
import { HowItWorksStep } from "../types/howitworks.types";

interface StepCardProps {
  step: HowItWorksStep;
}

const getStepIcon = (stepNumber: number) => {
  const className =
    "h-5 w-5 text-brand-accent group-hover:text-white";
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
    <div className="group rounded-2xl border border-neutral-border bg-background p-6 flex flex-col gap-4 hover:border-brand-accent hover:shadow-[0_8px_30px_rgba(13,148,136,0.04)]">
      <div className="flex items-center justify-between">
        <span className="rounded-2xl bg-brand-accent/10 px-2.5 py-1 text-xs font-bold text-brand-accent group-hover:bg-brand-accent group-hover:text-white">
          Step 0{step.stepNumber}
        </span>
        <div className="h-8 w-8 rounded-2xl bg-brand-accent/10 flex items-center justify-center group-hover:bg-brand-accent">
          {getStepIcon(step.stepNumber)}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h4 className="text-xs font-bold text-foreground">{step.title}</h4>
        <p className="text-xs text-neutral-subtext leading-relaxed font-normal">
          {step.description}
        </p>
      </div>
    </div>
  );
};

export default StepCard;
