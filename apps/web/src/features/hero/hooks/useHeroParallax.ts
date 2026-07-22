"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  UseHeroParallaxOptions,
  UseHeroParallaxReturn,
} from "../types/parallax.types";

export function useHeroParallax(
  options: UseHeroParallaxOptions = {}
): UseHeroParallaxReturn {
  const { speedSlow = 0.15, speedMedium = 0.3, speedFast = 0.45 } = options;

  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;
    if (currentScroll < 1200) {
      setScrollY(currentScroll);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const slowOffset = scrollY * speedSlow;
  const mediumOffset = scrollY * speedMedium;
  const fastOffset = scrollY * speedFast;
  const opacity = Math.max(0, 1 - scrollY / 700);

  return {
    slowStyle: {
      transform: `translate3d(0, ${slowOffset}px, 0)`,
      willChange: "transform",
    },
    mediumStyle: {
      transform: `translate3d(0, ${mediumOffset}px, 0)`,
      willChange: "transform",
    },
    fastStyle: {
      transform: `translate3d(0, ${fastOffset}px, 0)`,
      willChange: "transform",
    },
    opacityStyle: {
      opacity,
      willChange: "opacity",
    },
  };
}

export default useHeroParallax;
