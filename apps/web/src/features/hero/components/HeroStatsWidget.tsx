"use client";

import React from "react";
import { Coins, ShieldCheck, ArrowUpRight, CheckCircle2 } from "lucide-react";

export const HeroStatsWidget = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
      <div className="relative group rounded-3xl border border-neutral-border/80 bg-background/80 backdrop-blur-xl p-4 sm:p-5 transition-all duration-300 hover:border-brand-accent/50">
        <div className="flex items-center justify-between mb-2.5 sm:mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-accent to-brand-accent-hover text-brand-accent-foreground sm:h-10 sm:w-10">
            <Coins className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-success bg-success-bg/80 border border-success/30 px-2 sm:px-2.5 py-0.5 rounded-full">
            <ArrowUpRight className="w-3 h-3" /> +12.4%
          </span>
        </div>
        <span className="text-[11px] sm:text-xs font-semibold text-neutral-subtext block mb-0.5">
          Total Group Money
        </span>
        <div className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
          ₱180,000
        </div>
        <span className="text-[10px] sm:text-[11px] font-medium text-brand-accent mt-1 inline-block">
          Saved Together in Siklo
        </span>
      </div>

      <div className="relative group rounded-3xl border border-neutral-border/80 bg-background/80 backdrop-blur-xl p-4 sm:p-5 transition-all duration-300 hover:border-brand-accent/50">
        <div className="flex items-center justify-between mb-2.5 sm:mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-accent to-success text-brand-accent-foreground sm:h-10 sm:w-10">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-2 sm:px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-brand-accent" /> Verified
          </span>
        </div>
        <span className="text-[11px] sm:text-xs font-semibold text-neutral-subtext block mb-0.5">
          Payment Status
        </span>
        <div className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
          99.4% On Time
        </div>
        <span className="text-[10px] sm:text-[11px] font-medium text-neutral-subtext mt-1 inline-block">
          Honest Rotation Record
        </span>
      </div>
    </div>
  );
};

export default HeroStatsWidget;
