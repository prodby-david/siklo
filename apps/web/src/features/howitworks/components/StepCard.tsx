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
  const IconComponent = step.icon;

  return (
    <div className="group backdrop-blur-xl relative z-10 rounded-3xl border border-brand-accent/20 dark:border-brand-accent/25 bg-background/80 dark:bg-card/80 p-6 sm:p-7 flex flex-col justify-start gap-4 hover:border-brand-accent/50 transition-all duration-300 h-full min-h-[220px] flex-1 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-brand-accent/10 px-3 py-1 text-xs font-extrabold text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 border border-brand-accent/20">
          Step 0{step.stepNumber}
        </span>
        <div className="h-10 w-10 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center group-hover:bg-brand-accent transition-all duration-300">
          {IconComponent ? (
            <IconComponent className="h-5 w-5 text-brand-accent group-hover:text-white transition-colors duration-300" />
          ) : (
            getStepIcon(step.stepNumber)
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5 flex-1">
        <h4 className="text-base font-extrabold text-foreground min-h-[2.5rem] flex items-center leading-snug">
          {step.title}
        </h4>
        <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal min-h-[4.5rem]">
          {step.description}
        </p>
      </div>
    </div>
  );
};

export default StepCard;
