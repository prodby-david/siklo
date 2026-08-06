import React from "react";
import { InvitesFilterBarProps } from "../types/invites.types";

export default function InvitesFilterBar({
  tab,
  totalCount,
  receivedCount,
  sentCount,
  onTabChange,
}: InvitesFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border-b border-neutral-border/60 pb-3 w-full">
      <button
        type="button"
        onClick={() => onTabChange("ALL")}
        className={`inline-flex items-center justify-center gap-1.5 h-9 sm:h-8 px-4 text-xs font-bold rounded-2xl transition-all duration-150 border cursor-pointer select-none whitespace-nowrap w-full sm:w-auto ${
          tab === "ALL"
            ? "bg-brand-accent text-background border-brand-accent shadow-sm"
            : "bg-background text-neutral-subtext hover:text-foreground border-neutral-border hover:bg-neutral-subtext/5"
        }`}
      >
        All ({totalCount})
      </button>
      <button
        type="button"
        onClick={() => onTabChange("INVITES")}
        className={`inline-flex items-center justify-center gap-1.5 h-9 sm:h-8 px-4 text-xs font-bold rounded-2xl transition-all duration-150 border cursor-pointer select-none whitespace-nowrap w-full sm:w-auto ${
          tab === "INVITES"
            ? "bg-brand-accent text-background border-brand-accent shadow-sm"
            : "bg-background text-neutral-subtext hover:text-foreground border-neutral-border hover:bg-neutral-subtext/5"
        }`}
      >
        Received Invites ({receivedCount})
      </button>
      <button
        type="button"
        onClick={() => onTabChange("REQUESTS")}
        className={`inline-flex items-center justify-center gap-1.5 h-9 sm:h-8 px-4 text-xs font-bold rounded-2xl transition-all duration-150 border cursor-pointer select-none whitespace-nowrap w-full sm:w-auto ${
          tab === "REQUESTS"
            ? "bg-brand-accent text-background border-brand-accent shadow-sm"
            : "bg-background text-neutral-subtext hover:text-foreground border-neutral-border hover:bg-neutral-subtext/5"
        }`}
      >
        Sent Requests ({sentCount})
      </button>
    </div>
  );
}
