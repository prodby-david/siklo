import { ChevronDown, CheckCircle2, Info } from "lucide-react";
import { ConcernItem } from "../types/support.types";

interface SupportConcernCardProps {
  item: ConcernItem;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function SupportConcernCard({
  item,
  isExpanded,
  onToggle,
}: SupportConcernCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-border/70 bg-card overflow-hidden transition-all duration-200 hover:border-brand-accent/30 shadow-2xs">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-foreground leading-snug">
            {item.question}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-neutral-subtext shrink-0 transition-transform duration-200 ${
            isExpanded ? "rotate-180 text-brand-accent" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-5 pt-1 sm:px-5 sm:pb-5 border-t border-neutral-border/40 space-y-3 bg-neutral-table-stripe/30">
          <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed">
            {item.answer}
          </p>
          {item.actionHint && (
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-brand-accent/5 border border-brand-accent/20 text-[11px] sm:text-xs text-foreground font-medium">
              <Info className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
              <span>{item.actionHint}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
