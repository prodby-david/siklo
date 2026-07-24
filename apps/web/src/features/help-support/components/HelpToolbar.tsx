import { Search } from "lucide-react";

type HelpToolbarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

export default function HelpToolbar({
  searchQuery,
  onSearchChange,
}: HelpToolbarProps) {
  return (
    <div className="w-full max-w-xl mx-auto mb-10">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-subtext" />
        <input
          type="text"
          placeholder="Search for answers (e.g. payout, turn, ledger...)"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 sm:py-3.5 text-xs sm:text-sm border border-neutral-border/60 rounded-2xl bg-background text-foreground shadow-sm focus:outline-none focus:border-brand-accent transition-colors"
        />
      </div>
    </div>
  );
}
