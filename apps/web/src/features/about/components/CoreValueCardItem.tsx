import React from "react";
import * as Icons from "lucide-react";
import { CoreValueItem } from "../types/about.types";

interface CoreValueCardItemProps {
  item: CoreValueItem;
}

export default function CoreValueCardItem({ item }: CoreValueCardItemProps) {
  const IconComponent = (Icons as any)[item.iconName] || Icons.ShieldCheck;

  return (
    <div className="flex flex-col gap-4 p-6 sm:p-7 rounded-3xl border border-brand-accent/20 bg-background hover:border-brand-accent/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="h-11 w-11 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent flex items-center justify-center">
          <IconComponent className="h-5 w-5" />
        </div>
        <span className="text-[10px] font-extrabold text-brand-accent bg-brand-accent/10 px-2.5 py-1 rounded-full border border-brand-accent/20">
          {item.highlightText}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h4 className="text-base font-extrabold text-foreground">
          {item.title}
        </h4>
        <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal">
          {item.description}
        </p>
      </div>
    </div>
  );
}
