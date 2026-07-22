"use client";

import { Play } from "lucide-react";
import type { HeroSplashTriggerProps } from "../../types/splash.types";

export function HeroSplashTrigger({
  onReplay,
  className = "",
  label = "Watch Intro Splash",
}: HeroSplashTriggerProps) {
  return (
    <button
      onClick={onReplay}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20 hover:bg-brand-accent/20 text-xs font-medium cursor-pointer transition-all duration-150 active:scale-95 ${className}`}
      title="Replay intro splash screen"
      aria-label="Replay intro splash screen"
    >
      <Play className="w-3 h-3 fill-current" />
      <span>{label}</span>
    </button>
  );
}

export default HeroSplashTrigger;
