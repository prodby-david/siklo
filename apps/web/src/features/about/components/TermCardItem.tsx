"use client";

import React from "react";
import {
  RotateCcw,
  Clock,
  PhilippinePeso,
  CalendarDays,
  UserCheck,
  Crown,
  HelpCircle,
} from "lucide-react";
import { PaluwaganTermItem } from "../types/about.types";

const ICON_MAP: Record<string, React.ElementType> = {
  RotateCcw,
  Clock,
  PhilippinePeso,
  CalendarDays,
  UserCheck,
  Crown,
};

export default function TermCardItem({ item }: { item: PaluwaganTermItem }) {
  const IconComponent = ICON_MAP[item.iconName] || HelpCircle;

  return (
    <div className="h-full rounded-3xl border border-brand-accent/25 bg-card/80 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between gap-4 transition-all duration-300 hover:border-brand-accent/50 shadow-xs">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="w-10 h-10 rounded-2xl bg-brand-accent/15 text-brand-accent border border-brand-accent/25 flex items-center justify-center font-bold">
            <IconComponent className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
            {item.badge}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-extrabold text-foreground tracking-tight">
            {item.term}
          </h3>
          <span className="text-xs font-semibold text-brand-accent">
            {item.simpleTitle}
          </span>
        </div>

        <p className="text-xs text-neutral-subtext leading-relaxed font-normal">
          {item.description}
        </p>
      </div>

      <div className="pt-2 border-t border-neutral-border/60">
        <span className="text-[11px] text-foreground font-semibold block">
          <strong className="text-brand-accent font-bold">Example:</strong> {item.example}
        </span>
      </div>
    </div>
  );
}
