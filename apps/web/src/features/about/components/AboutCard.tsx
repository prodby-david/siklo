import React from "react";
import { CheckCircle2 } from "lucide-react";
import { AboutItem } from "../types/about.types";

interface AboutCardProps {
  item: AboutItem;
}

export default function AboutCard({ item }: AboutCardProps) {
  return (
    <div className="group rounded-2xl border border-brand-accent/25 bg-card/80 backdrop-blur-xl p-5 flex flex-col gap-2.5 hover:border-brand-accent/50 transition-all duration-300 shadow-xs">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-brand-accent/20 bg-brand-accent/10 text-brand-accent transition-all duration-300 group-hover:bg-brand-accent group-hover:text-brand-accent-foreground">
          <CheckCircle2 className="h-4 w-4" />
        </span>
        <h4 className="text-sm font-extrabold text-foreground">
          {item.title}
        </h4>
      </div>
      <p className="text-xs text-neutral-subtext leading-relaxed font-normal">
        {item.description}
      </p>
    </div>
  );
}
