import type { ReactNode } from "react";

export interface HeroSplashScreenProps {
  duration?: number;
  showOncePerSession?: boolean;
  storageKey?: string;
  onDismiss?: () => void;
  brandTitle?: ReactNode;
  brandSubtitle?: string;
}

export interface UseHeroSplashScreenOptions {
  duration?: number;
  showOncePerSession?: boolean;
  storageKey?: string;
  onDismiss?: () => void;
}

export interface UseHeroSplashScreenReturn {
  isVisible: boolean;
  isFadingOut: boolean;
  progress: number;
  dismiss: () => void;
}

export interface HeroSplashContentProps {
  progress: number;
  brandTitle?: ReactNode;
  brandSubtitle?: string;
}

export interface HeroSplashTriggerProps {
  onReplay?: () => void;
  className?: string;
  label?: string;
}
