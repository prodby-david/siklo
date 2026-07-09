import React from "react";
import { Check } from "lucide-react";
import { AboutItem } from "../types/about.types";

interface AboutCardProps {
  item: AboutItem;
}

export default function AboutCard({ item }: AboutCardProps) {
  return (
    <div className="group rounded-r-2xl border border-l-4 border-neutral-border bg-background p-5 flex flex-col gap-2.5 hover:border-l-brand-accent hover:bg-neutral-table-stripe/30 transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-2xl bg-brand-accent/10 text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 ease-in-out">
          <Check className="h-4 w-4" />
        </span>
        <h4 className="text-xs font-bold text-foreground group-hover:text-foreground">
          {item.title}
        </h4>
      </div>
      <p className="text-xs text-neutral-subtext leading-relaxed font-normal">
        {item.description}
      </p>
    </div>
  );
}
