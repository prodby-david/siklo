import { Quote } from "lucide-react";

export default function GroupHeroWisdomQuoteCard() {
  return (
    <div className="flex flex-col gap-2 bg-background/80 backdrop-blur-sm border border-neutral-border p-4 rounded-2xl min-w-[260px] max-w-xs shadow-sm">
      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent flex items-center gap-1">
        <Quote className="w-3.5 h-3.5 text-brand-accent" /> Financial Wisdom
      </span>
      <p className="text-xs font-semibold text-foreground italic leading-relaxed">
        &quot;Do not save what is left after spending, but spend what is left after saving.&quot;
      </p>
      <span className="text-[10px] text-neutral-subtext font-medium text-right">
        — Warren Buffett
      </span>
    </div>
  );
}
