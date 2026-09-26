import { LifeBuoy, Send } from "lucide-react";
import { SupportSection } from "../types/support.types";

interface SupportHeaderProps {
  activeSection: SupportSection;
  onNavigateSection: (section: SupportSection) => void;
}

export default function SupportHeader({
  activeSection,
  onNavigateSection,
}: SupportHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-border/60 pb-5">
      <div className="space-y-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-2xl bg-brand-accent/15 text-brand-accent border border-brand-accent/25 shrink-0">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Support & Assistance
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-neutral-subtext">
          Find practical solutions for your savings cycles, verify group rules, or reach out to customer care.
        </p>
      </div>

      <div className="flex items-center justify-center sm:justify-end gap-2">
        <button
          type="button"
          onClick={() =>
            onNavigateSection(
              activeSection === "inquiry" ? "concerns" : "inquiry",
            )
          }
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-2xl bg-brand-accent text-brand-accent-foreground shadow-xs hover:bg-brand-accent-hover transition-all cursor-pointer active:scale-98"
        >
          <Send className="w-3.5 h-3.5" />
          <span>
            {activeSection === "inquiry"
              ? "Browse Concerns"
              : "Submit a Concern"}
          </span>
        </button>
      </div>
    </div>
  );
}
