export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features?: FeatureItem[];
}
