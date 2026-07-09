import { Search, Printer, Share2 } from "lucide-react";

type PolicyToolbarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onPrint: () => void;
  onShare: () => void;
};

export default function PolicyToolbar({ onShare }: PolicyToolbarProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onShare}
        className="p-2 border border-neutral-border/60 rounded-2xl hover:bg-neutral-table-stripe text-neutral-subtext hover:text-foreground cursor-pointer transition-colors"
        title="Share Link"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
}
