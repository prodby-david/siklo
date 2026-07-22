import { CSSProperties } from "react";

export interface UseHeroParallaxOptions {
  speedSlow?: number;
  speedMedium?: number;
  speedFast?: number;
}

export interface UseHeroParallaxReturn {
  slowStyle: CSSProperties;
  mediumStyle: CSSProperties;
  fastStyle: CSSProperties;
  opacityStyle: CSSProperties;
}
