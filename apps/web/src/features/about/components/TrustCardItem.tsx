import React from "react";
import { TrustItem } from "../types/about.types";
import getIcon from "../utils/getIcon";

interface TrustCardItemProps {
  item: TrustItem;
}

export default function TrustCardItem({ item }: TrustCardItemProps) {
  return (
    <div className="p-6 rounded-3xl border border-neutral-border/80 bg-neutral-table-stripe/80 flex flex-col gap-4 hover:border-brand-accent/40 transition-all duration-300">
      <div className="h-10 w-10 rounded-2xl bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center">
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
