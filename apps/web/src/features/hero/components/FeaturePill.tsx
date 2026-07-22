import React from "react";
import { CheckCircle2 } from "lucide-react";

interface FeaturePillProps {
  label: string;
}

export const FeaturePill = ({ label }: FeaturePillProps) => {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-neutral-border/60 bg-neutral-table-stripe/50 px-3.5 py-2 text-xs md:text-sm font-medium text-neutral-subtext backdrop-blur-sm shadow-xs">
      <CheckCircle2 className="h-4 w-4 text-brand-accent shrink-0" />
      <span>{label}</span>
    </div>
  );
};

export default FeaturePill;
