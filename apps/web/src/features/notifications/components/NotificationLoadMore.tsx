"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

interface NotificationLoadMoreProps {
  totalCount: number;
  visibleCount: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function NotificationLoadMore({
  totalCount,
  visibleCount,
  isExpanded,
  onToggleExpand,
}: NotificationLoadMoreProps) {
  if (totalCount <= 4) return null;

  const remaining = totalCount - visibleCount;

  return (
    <div className="pt-2 pb-1 flex flex-col items-center gap-2">
      <button
        onClick={onToggleExpand}
        className="w-full py-2.5 px-4 rounded-2xl bg-neutral-table-stripe hover:bg-neutral-subtext/10 border border-neutral-border/60 text-foreground text-xs font-bold transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
      >
        {isExpanded ? (
          <>
            <span>Show Less</span>
            <ChevronUp className="w-4 h-4 text-brand-accent" />
          </>
        ) : (
          <>
            <span>Show More ({remaining} remaining)</span>
            <ChevronDown className="w-4 h-4 text-brand-accent" />
          </>
        )}
      </button>

      <span className="text-[10px] font-semibold text-neutral-subtext">
        Showing {visibleCount} of {totalCount} notifications
      </span>
    </div>
  );
}
