import React from "react";
import * as Icons from "lucide-react";
import { FeatureItem } from "../types/features.types";

export default function FeatureCard({ feature }: { feature: FeatureItem }) {
  const IconComponent = (Icons as any)[feature.iconName] || Icons.HelpCircle;

  return (
    <div className="flex flex-col gap-3 p-6 bg-background border border-neutral-border/80 rounded-2xl hover:border-brand-accent/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-center h-10 w-10 rounded-2xl bg-brand-accent/10 text-brand-accent">
        <IconComponent className="h-5 w-5" />
      </div>
      <h4 className="text-sm font-bold text-foreground">{feature.title}</h4>
      <p className="text-xs text-neutral-subtext leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}
