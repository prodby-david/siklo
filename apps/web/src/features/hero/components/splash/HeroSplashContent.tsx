"use client";

import Image from "next/image";
import { ShieldCheck, RefreshCw } from "lucide-react";
import { DEFAULT_BRAND_TITLE, DEFAULT_BRAND_SUBTITLE } from "../../constants/splash.constants";
import type { HeroSplashContentProps } from "../../types/splash.types";

export function HeroSplashContent({
  progress,
  brandTitle = DEFAULT_BRAND_TITLE,
  brandSubtitle = DEFAULT_BRAND_SUBTITLE,
}: HeroSplashContentProps) {
  const roundedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className="relative flex flex-col items-center justify-center text-center max-w-md w-full px-6 py-8 z-20">
      <div className="absolute inset-0 bg-brand-accent/10 rounded-3xl blur-3xl -z-10 animate-pulse" />

      <div className="relative mb-4 flex items-center justify-center">
        <Image
          src="/images/siklo-loading.svg"
          alt="Siklo Loading Mascot"
          width={110}
          height={110}
          priority
          className="animate-pulse object-contain"
        />
      </div>

      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-2">
        {brandTitle}
      </h2>

      <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed mb-6 font-medium">
        {brandSubtitle}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Transparent
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
          <RefreshCw className="w-3.5 h-3.5" /> Cycle Tracking
        </span>
      </div>

      <div className="w-full bg-neutral-border/60 dark:bg-neutral-border/40 h-2.5 rounded-full overflow-hidden mb-4 relative">
        <div
          className="h-full bg-brand-accent rounded-full transition-none"
          style={{ width: `${roundedProgress}%` }}
        />
      </div>

      <div className="flex items-center justify-center w-full text-xs text-neutral-subtext">
        <span className="font-bold tracking-wide text-brand-accent">
          Loading {roundedProgress}%
        </span>
      </div>
    </div>
  );
}

export default HeroSplashContent;
