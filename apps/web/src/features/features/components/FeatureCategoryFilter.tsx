import React from "react";
import { FeatureCategory } from "../types/features.types";
import { Layers, RotateCcw, ShieldCheck, Users, Settings } from "lucide-react";

interface FeatureCategoryFilterProps {
  activeCategory: FeatureCategory;
  onSelectCategory: (category: FeatureCategory) => void;
}

const categories: { id: FeatureCategory; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Features", icon: <Layers className="w-3.5 h-3.5" /> },
  { id: "rotation", label: "Rotation & Payouts", icon: <RotateCcw className="w-3.5 h-3.5" /> },
  { id: "transparency", label: "Ledger & Security", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  { id: "collaboration", label: "Group & Chat", icon: <Users className="w-3.5 h-3.5" /> },
  { id: "customization", label: "Personalization", icon: <Settings className="w-3.5 h-3.5" /> },
];

export default function FeatureCategoryFilter({
  activeCategory,
  onSelectCategory,
}: FeatureCategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-10 w-full">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-brand-accent text-white shadow-md shadow-brand-accent/20 border border-brand-accent"
                : "bg-background/80 text-neutral-subtext border border-neutral-border hover:border-brand-accent/30 hover:text-foreground"
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
