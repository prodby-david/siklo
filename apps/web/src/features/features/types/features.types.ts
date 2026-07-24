export type FeatureCategory =
  | "all"
  | "rotation"
  | "transparency"
  | "collaboration"
  | "customization";

export interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  category: FeatureCategory;
  highlightBadge?: string;
}

export interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features?: FeatureItem[];
}
