import React from "react";
import * as Icons from "lucide-react";
import { FeatureItem } from "../types/features.types";

export default function FeatureCard({ feature }: { feature: FeatureItem }) {
  const IconComponent = (Icons as any)[feature.iconName] || Icons.HelpCircle;

  return (
    <div className="flex flex-col gap-3.5 p-6 bg-neutral-table-stripe/80 border border-neutral-border/80 rounded-2xl hover:border-brand-accent/50 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-center h-10 w-10 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent">
        <IconComponent className="h-5 w-5" />
      </div>
      <div>
        <h4 className="text-sm sm:text-base font-bold text-foreground">
          {feature.title}
        </h4>
        <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed mt-1">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
