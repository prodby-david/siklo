"use client";

import React from "react";
import HeroSplashScreen from "./HeroSplashScreen";
import useHeroSplashScreen from "../../hooks/useHeroSplashScreen";
import type { HeroSplashScreenProps } from "../../types/splash.types";

export default function HeroSplashContainer(props: HeroSplashScreenProps) {
  const splash = useHeroSplashScreen({
    duration: props.duration,
    showOncePerSession: props.showOncePerSession,
    onDismiss: props.onDismiss,
  });

  return (
    <HeroSplashScreen
      isVisible={splash.isVisible}
      isFadingOut={splash.isFadingOut}
      progress={splash.progress}
      brandTitle={props.brandTitle}
      brandSubtitle={props.brandSubtitle}
    />
  );
}
