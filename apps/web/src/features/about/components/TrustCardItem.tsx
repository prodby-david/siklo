import React from "react";
import { TrustItem } from "../types/about.types";
import getIcon from "../utils/getIcon";

interface TrustCardItemProps {
  item: TrustItem;
}

export default function TrustCardItem({ item }: TrustCardItemProps) {
  return (
    <div className="h-full p-6 rounded-3xl border border-brand-accent/20 dark:border-brand-accent/25 bg-background/80 dark:bg-card/80 backdrop-blur-xl flex flex-col justify-between gap-4 hover:border-brand-accent/50 transition-all duration-300 shadow-xs">
      <div className="h-10 w-10 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent flex items-center justify-center">
        {getIcon(item.id)}
      </div>

      <div className="flex flex-col gap-1.5">
        <h4 className="text-sm font-extrabold text-foreground">
          {item.title}
        </h4>
        <p className="text-xs text-neutral-subtext leading-relaxed font-normal">
          {item.description}
        </p>
      </div>
    </div>
  );
}
