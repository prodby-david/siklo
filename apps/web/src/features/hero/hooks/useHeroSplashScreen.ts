"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  DEFAULT_SPLASH_DURATION_MS,
  DEFAULT_FADE_OUT_DURATION_MS,
  DEFAULT_SPLASH_STORAGE_KEY,
} from "../constants/splash.constants";
import type {
  UseHeroSplashScreenOptions,
  UseHeroSplashScreenReturn,
} from "../types/splash.types";

export function useHeroSplashScreen(
  options: UseHeroSplashScreenOptions = {}
): UseHeroSplashScreenReturn {
  const {
    duration = DEFAULT_SPLASH_DURATION_MS,
    showOncePerSession = true,
    storageKey = DEFAULT_SPLASH_STORAGE_KEY,
    onDismiss,
  } = options;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && showOncePerSession) {
      const alreadySeen = sessionStorage.getItem(storageKey);
      if (alreadySeen) return;
    }
    setIsVisible(true);
  }, [showOncePerSession, storageKey]);

  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const dismiss = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    setIsFadingOut(true);

    fadeTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      setIsFadingOut(false);
      if (typeof window !== "undefined" && showOncePerSession) {
        sessionStorage.setItem(storageKey, "true");
      }
      if (onDismiss) onDismiss();
    }, DEFAULT_FADE_OUT_DURATION_MS);
  }, [onDismiss, showOncePerSession, storageKey]);

  const startProgressAnimation = useCallback(() => {
    const startTime = performance.now();

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const calculatedProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(calculatedProgress);

      if (elapsed < duration) {
        animRef.current = requestAnimationFrame(updateProgress);
      } else {
        dismiss();
      }
    };

    animRef.current = requestAnimationFrame(updateProgress);
  }, [duration, dismiss]);

  useEffect(() => {
    if (!isVisible || isFadingOut) return;

    startProgressAnimation();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [isVisible, isFadingOut, startProgressAnimation]);

  return {
    isVisible,
    isFadingOut,
    progress,
    dismiss,
  };
}

export default useHeroSplashScreen;
