"use client";

import React from "react";
import { Parallax } from "react-scroll-parallax";
import {
  HandCoins,
  Wallet,
  ShieldCheck,
  Coins,
  Users,
  BellRing,
} from "lucide-react";
import { Member, CycleStats } from "../types/hero.types";
import { defaultStats } from "@/shared/constants/sampleData";

interface FloatingTrackerVisualizerProps {
  members?: Member[];
  stats?: CycleStats;
}

export const FloatingTrackerVisualizer = ({
  stats = defaultStats,
}: FloatingTrackerVisualizerProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/15 via-brand-accent/10 to-teal-400/10 rounded-full blur-3xl -z-10" />

      <Parallax
        translateY={[25, -15]}
        scale={[0.75, 1]}
        opacity={[0.2, 0.85]}
        easing="easeOutQuad"
        className="hidden sm:flex absolute -top-8 sm:-top-12 -left-6 sm:-left-20 pointer-events-auto"
      >
        <div className="flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-background/90 border border-brand-accent/30 backdrop-blur-md animate-siklo-float shadow-md hover:opacity-100 hover:border-brand-accent/60 transition-all opacity-85">
          <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-gradient-to-tr from-brand-accent to-teal-400 text-white shadow-sm">
            <HandCoins className="w-3.5 h-3.5 animate-icon-bounce" />
          </div>
          <div className="text-left">
            <span className="text-[9px] text-neutral-subtext block font-semibold">
              Instant Payout
            </span>
            <span className="text-[11px] font-black text-brand-accent">
              ₱180,000 Total
            </span>
          </div>
        </div>
      </Parallax>

      <Parallax
        translateY={[20, -10]}
        scale={[0.75, 1]}
        opacity={[0.2, 0.85]}
        easing="easeOutQuad"
        className="hidden sm:flex absolute -top-8 sm:-top-12 -right-6 sm:-right-20 pointer-events-auto"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-background/90 border border-emerald-500/30 backdrop-blur-md animate-float-delayed shadow-md hover:opacity-100 hover:border-emerald-500/60 transition-all opacity-85">
          <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 animate-icon-bounce" />
          </div>
          <div className="text-left">
            <span className="text-[9px] text-neutral-subtext block font-semibold">
              Protection
            </span>
            <span className="text-[11px] font-extrabold text-foreground">
              100% Guaranteed
            </span>
          </div>
        </div>
      </Parallax>

      <Parallax
        translateY={[10, -15]}
        scale={[0.8, 1]}
        opacity={[0.2, 0.85]}
        easing="easeOutQuad"
        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-10 sm:-left-28 pointer-events-auto"
      >
        <div className="flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-background/90 border border-brand-accent/30 backdrop-blur-md animate-float shadow-md hover:opacity-100 hover:border-brand-accent/60 transition-all opacity-85">
          <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 shadow-sm">
            <Users className="w-3.5 h-3.5 animate-slow-pulse" />
          </div>
          <div className="text-left">
            <span className="text-[9px] text-neutral-subtext block font-semibold">
              Active Circle
            </span>
            <span className="text-[11px] font-black text-brand-accent">
              {stats.activeMembersCount} Members
            </span>
          </div>
        </div>
      </Parallax>

      <Parallax
        translateY={[10, -15]}
        scale={[0.8, 1]}
        opacity={[0.2, 0.85]}
        easing="easeOutQuad"
        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-10 sm:-right-28 pointer-events-auto"
      >
        <div className="flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-background/90 border border-brand-accent/30 backdrop-blur-md animate-float-reverse shadow-md hover:opacity-100 hover:border-brand-accent/60 transition-all opacity-85">
          <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 shadow-sm">
            <BellRing className="w-3.5 h-3.5 animate-bell-shake" />
          </div>
          <div className="text-left">
            <span className="text-[9px] text-neutral-subtext block font-semibold">
              Auto Reminders
            </span>
            <span className="text-[11px] font-black text-foreground">
              Instant Logs
            </span>
          </div>
        </div>
      </Parallax>

      <Parallax
        translateY={[15, -20]}
        scale={[0.75, 1]}
        opacity={[0.2, 0.85]}
        easing="easeOutQuad"
        className="hidden sm:flex absolute -bottom-8 sm:-bottom-12 -left-4 sm:-left-16 pointer-events-auto"
      >
        <div className="flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-background/90 border border-brand-accent/30 backdrop-blur-md animate-float-reverse shadow-md hover:opacity-100 hover:border-brand-accent/60 transition-all opacity-85">
          <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-gradient-to-tr from-brand-accent to-teal-400 text-white shadow-sm">
            <Wallet className="w-3.5 h-3.5 animate-slow-pulse" />
          </div>
          <div className="text-left">
            <span className="text-[9px] text-neutral-subtext block font-semibold">
              Rotation Mode
            </span>
            <span className="text-[11px] font-black text-brand-accent">
              Auto Turn Order
            </span>
          </div>
        </div>
      </Parallax>

      <Parallax
        translateY={[15, -20]}
        scale={[0.75, 1]}
        opacity={[0.2, 0.85]}
        easing="easeOutQuad"
        className="hidden sm:flex absolute -bottom-8 sm:-bottom-12 -right-4 sm:-right-16 pointer-events-auto"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-background/90 border border-brand-accent/30 backdrop-blur-md animate-float-slow shadow-md hover:border-brand-accent/60 transition-all opacity-85">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-accent/10 text-brand-accent border border-brand-accent/20 shadow-sm">
            <Coins className="w-3.5 h-3.5 animate-slow-pulse" />
          </div>
          <div className="text-left">
            <span className="text-[9px] text-neutral-subtext block font-semibold">
              Pot Status
            </span>
            <span className="text-[11px] font-extrabold text-brand-accent">
              ₱{stats.totalPool.toLocaleString()} Total
            </span>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default FloatingTrackerVisualizer;
