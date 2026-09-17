import { RotateCw, CheckCircle2 } from "lucide-react";
import GroupAnnouncementDialog from "../../GroupAnnouncementDialog";
import type { GroupTurnShowcaseHeaderProps } from "@/features/groups/types/showcase.types";

export default function GroupTurnShowcaseHeader({
  payoutSequence,
  groupId,
  isOrganizer,
  hasStarted,
  isCycleDone,
  currentCycle,
  cycleDuration,
  totalPayoutNum,
}: GroupTurnShowcaseHeaderProps) {
  const sequenceBadge =
    payoutSequence === "RANDOM" ? (
      <span className="text-[10px] font-bold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-2 py-0.5 rounded-full">
        Random Sequence
      </span>
    ) : payoutSequence === "FREECHOOSING" ? (
      <span className="text-[10px] font-bold text-winner-payout bg-winner-payout-bg border border-winner-payout/20 px-2 py-0.5 rounded-full">
        Free Choice Slots
      </span>
    ) : (
      <span className="rounded-full border border-winner-payout/20 bg-winner-payout-bg px-2 py-0.5 text-[10px] font-bold text-winner-payout">
        First Come First Served
      </span>
    );

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-neutral-border/60 pb-4 gap-3">
      <div>
        <div className="flex items-center gap-2.5 mb-1 flex-wrap">
          <div className="flex items-center justify-center w-8 h-8 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/25 shrink-0">
            <RotateCw className="w-4 h-4" />
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-foreground flex items-center gap-2 flex-wrap">
            Cycle Turn Queue & Rotations {sequenceBadge}
          </h3>
        </div>
        <p className="text-xs text-neutral-subtext">
          Select any member slot in the rotation to view details, contribute, or release payouts.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {isOrganizer && hasStarted && !isCycleDone && (
          <GroupAnnouncementDialog groupId={groupId} />
        )}

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-neutral-table-stripe p-1 rounded-2xl border border-neutral-border/60">
          {isCycleDone ? (
            <span className="flex items-center gap-1 rounded-xl border border-success/30 bg-success-bg px-3 py-1 text-[11px] font-bold text-success">
              <CheckCircle2 className="w-3 h-3" /> Cycle Finished
            </span>
          ) : (
            <>
              <span className="text-[11px] font-bold text-brand-accent px-2.5 py-1 bg-transparent rounded-xl border border-neutral-border/40">
                Cycle {currentCycle} of {cycleDuration}
              </span>
              <span className="text-[11px] font-semibold text-neutral-subtext px-2">
                ₱{totalPayoutNum.toLocaleString()} Pool
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
