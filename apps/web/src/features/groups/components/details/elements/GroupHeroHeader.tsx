import { Pencil } from "lucide-react";
import type { GroupHeroHeaderProps } from "../../../types/group.types";

export default function GroupHeroHeader({
  name,
  description,
  billingLabel,
  hasStarted = false,
  isCycleDone = false,
  isOrganizer = false,
  onOpenEdit,
}: GroupHeroHeaderProps) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
            isCycleDone
              ? "border border-success/30 bg-success-bg text-success"
              : hasStarted
              ? "bg-brand-accent/15 text-brand-accent"
              : "bg-warning/15 text-warning"
          }`}
        >
          {isCycleDone ? "Cycle Complete" : hasStarted ? "Active Cycle" : "Unstarted"}
        </span>

        <span className="rounded-full bg-neutral-table-stripe px-3 py-1 text-[10px] font-bold text-neutral-subtext uppercase tracking-wider border border-neutral-border">
          {billingLabel}
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            {name}
          </h1>
          {isOrganizer && !hasStarted && (
            <button
              onClick={onOpenEdit}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-neutral-border bg-background px-2.5 py-1 text-xs font-semibold text-neutral-subtext transition-all duration-150 hover:bg-neutral-table-stripe hover:text-foreground active:scale-95"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          )}
        </div>
        {description ? (
          <p className="text-xs sm:text-sm text-neutral-subtext line-clamp-2">
            {description}
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-neutral-subtext italic">
            No description provided for this group.
          </p>
        )}
      </div>
    </>
  );
}
