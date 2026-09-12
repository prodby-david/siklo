import type { ReactNode } from "react";

export interface FeatureHighlight {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface AuthInfoPanelProps {
  title: string;
  subtitle: string;
  highlights: FeatureHighlight[];
}
