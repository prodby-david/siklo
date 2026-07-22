import React from "react";
import { CheckCircle2 } from "lucide-react";
import { AboutItem } from "../types/about.types";

interface AboutCardProps {
  item: AboutItem;
}

export default function AboutCard({ item }: AboutCardProps) {
  return (
    <div className="group rounded-2xl border border-neutral-border/80 bg-neutral-table-stripe/80 p-5 flex flex-col gap-2.5 hover:border-brand-accent/40 hover:bg-neutral-table-stripe transition-all duration-300">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
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
