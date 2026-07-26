import {
  HelpCircle,
  ShieldCheck,
  CreditCard,
  UserCheck,
  Zap,
  LucideIcon,
} from "lucide-react";
import { HelpCategory } from "../types/help.type";

const ICON_MAP: Record<string, LucideIcon> = {
  ShieldCheck,
  CreditCard,
  UserCheck,
  Zap,
  HelpCircle,
};

type HelpCategorySelectorProps = {
  categories: HelpCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
};

export default function HelpCategorySelector({
  categories,
  activeCategoryId,
  onSelectCategory,
}: HelpCategorySelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {categories.map((category) => {
        const IconComponent = ICON_MAP[category.icon] || HelpCircle;
        const isActive = category.id === activeCategoryId;

        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl border text-center transition-all cursor-pointer ${
              isActive
                ? "bg-brand-accent/5 border-brand-accent text-brand-accent shadow-sm"
                : "bg-background border-neutral-border/60 text-neutral-subtext hover:text-foreground hover:border-neutral-border"
            }`}
          >
            <IconComponent className="w-6 h-6 mb-3" />
            <span className="text-xs font-semibold">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}
