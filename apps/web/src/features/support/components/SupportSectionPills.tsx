import { HelpCircle, Send, Headphones } from "lucide-react";
import { SupportSection } from "../types/support.types";

interface SupportSectionPillsProps {
  activeSection: SupportSection;
  onSelectSection: (section: SupportSection) => void;
}

export default function SupportSectionPills({
  activeSection,
  onSelectSection,
}: SupportSectionPillsProps) {
  const sections: { id: SupportSection; label: string; icon: typeof HelpCircle }[] = [
    { id: "concerns", label: "Common Concerns", icon: HelpCircle },
    { id: "inquiry", label: "Submit a Concern", icon: Send },
    { id: "channels", label: "Customer Care Channels", icon: Headphones },
  ];

  return (
    <div className="flex items-center gap-2 p-1 bg-neutral-table-stripe rounded-2xl border border-neutral-border/60 flex-wrap">
      {sections.map(({ id, label, icon: Icon }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelectSection(id)}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer select-none ${
              isActive
                ? "bg-brand-accent text-brand-accent-foreground shadow-xs"
                : "text-neutral-subtext hover:text-foreground hover:bg-neutral-border/30"
            }`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
