import React from "react";
import { LucideIcon } from "lucide-react";

interface PayoutSchemeItemProps {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export default function PayoutSchemeItem({
  title,
  desc,
  icon: Icon,
}: PayoutSchemeItemProps) {
  return (
    <div className="p-5 rounded-2xl border border-neutral-border/80 bg-neutral-table-stripe/80 flex flex-col justify-start gap-2.5 hover:border-brand-accent/40 transition-all duration-300 h-full min-h-[160px] flex-1">
      <div className="flex items-center gap-2.5 min-h-[2.5rem]">
        <div className="h-8 w-8 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 text-brand-accent" />
        </div>
        <h4 className="text-sm font-extrabold text-foreground leading-snug">{title}</h4>
      </div>
      <p className="text-xs text-neutral-subtext leading-relaxed font-normal min-h-[4.5rem]">
        {desc}
      </p>
    </div>
  );
}
