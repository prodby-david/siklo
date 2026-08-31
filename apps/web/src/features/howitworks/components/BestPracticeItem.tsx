import React from "react";
import { BestPracticeItem as BestPracticeType } from "../types/howitworks.types";

interface BestPracticeItemProps {
  practice: BestPracticeType;
}

export default function BestPracticeItem({ practice }: BestPracticeItemProps) {
  return (
    <div className="p-5 rounded-2xl border border-brand-accent/20 dark:border-brand-accent/25 bg-background/80 dark:bg-card/80 backdrop-blur-xl flex flex-col gap-2 hover:border-brand-accent/50 transition-all duration-300 shadow-xs">
      <div className="flex items-center gap-2.5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 border border-brand-accent/30 text-xs font-black text-brand-accent">
          {practice.stepNumber}
        </span>
        <h4 className="text-sm font-extrabold text-foreground">
          {practice.title}
        </h4>
      </div>
      <p className="text-xs text-neutral-subtext leading-relaxed font-normal ml-8">
        {practice.description}
      </p>
    </div>
  );
}
