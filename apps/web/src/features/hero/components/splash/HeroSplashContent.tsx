"use client";

import Image from "next/image";
import { DEFAULT_BRAND_SUBTITLE } from "../../constants/splash.constants";
import type { HeroSplashContentProps } from "../../types/splash.types";

export function HeroSplashContent({
  progress,
  brandSubtitle = DEFAULT_BRAND_SUBTITLE,
}: HeroSplashContentProps) {
  const roundedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className="relative flex flex-col items-center justify-center text-center max-w-md w-full px-6 py-8 z-20">
      <div className="relative mb-6 flex items-center justify-center">
        <Image
          src="/images/siklo-loading.png"
          alt="Siklo Loading Mascot"
          width={180}
          height={180}
          priority
          className="object-contain"
        />
      </div>

      <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed mb-6 font-medium">
        {brandSubtitle}
      </p>

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
