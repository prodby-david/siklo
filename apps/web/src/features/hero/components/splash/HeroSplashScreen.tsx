"use client";

import HeroSplashContent from "./HeroSplashContent";
import type { HeroSplashScreenProps } from "../../types/splash.types";

export interface HeroSplashScreenOverlayProps extends HeroSplashScreenProps {
  isVisible: boolean;
  isFadingOut: boolean;
  progress: number;
}

export function HeroSplashScreen({
  isVisible,
  isFadingOut,
  progress,
  brandTitle,
  brandSubtitle,
}: HeroSplashScreenOverlayProps) {
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl transition-all duration-400 ease-in-out ${
        isFadingOut
          ? "opacity-0 scale-95 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      aria-label="Welcome Splash Screen"
      role="dialog"
      aria-modal="true"
    >
      <HeroSplashContent
        progress={progress}
        brandTitle={brandTitle}
        brandSubtitle={brandSubtitle}
      />
    </div>
  );
}

export default HeroSplashScreen;
