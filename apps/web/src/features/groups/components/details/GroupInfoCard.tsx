import { Info, Shield, Phone, RefreshCw } from "lucide-react";
import formatDate from "@/shared/utils/formatDate";
import { BILLING_CYCLE_LABELS } from "../../constants/billing-cycle.constants";
import { PAYOUT_SEQUENCE_LABELS } from "../../constants/payout-sequence.constants";
import DeleteGroupDialog from "./DeleteGroupDialog";

interface GroupInfoCardProps {
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  totalDays: number;
  billingCycle: string;
  payoutSequence: string;
  organizerId: string;
  organizerName?: string;
  organizerContact?: string;
  isOrganizer?: boolean;
  hasStarted?: boolean;
  onStartCycle?: () => void;
  isStarting?: boolean;
  isMembersFull?: boolean;
  onDeleteGroup?: () => void;
  isDeleting?: boolean;
  membershipsCount?: number;
  isCycleDone?: boolean;
}

export default function GroupInfoCard({
  startDate,
  endDate,
  totalDays,
  billingCycle,
  payoutSequence,
  organizerId,
  organizerName,
  organizerContact,
  isOrganizer = false,
  hasStarted = false,
  onStartCycle,
  isStarting = false,
  isMembersFull = false,
  onDeleteGroup,
  isDeleting = false,
  membershipsCount = 0,
  isCycleDone = false,
}: GroupInfoCardProps) {
  const billingLabel =
    BILLING_CYCLE_LABELS[billingCycle as keyof typeof BILLING_CYCLE_LABELS] ||
    billingCycle;
  const sequenceLabel =
    PAYOUT_SEQUENCE_LABELS[payoutSequence as keyof typeof PAYOUT_SEQUENCE_LABELS] ||
    payoutSequence;
  const isOnlyOrganizerLeft = membershipsCount === 1;

  return (
    <div className="p-5 border border-neutral-border rounded-2xl bg-background shadow-sm space-y-4">
      <h3 className="text-sm sm:text-base font-bold text-foreground border-b border-neutral-border pb-3 flex items-center gap-2">
        <Info className="w-4 h-4 text-brand-accent" /> Group Details
      </h3>
      <div className="space-y-3.5 text-xs sm:text-sm">
        <div className="flex justify-between items-center">
          <span className="text-neutral-subtext">Start Date</span>
          <span className="font-semibold text-foreground">
            {startDate ? formatDate(startDate) : "Pending (Not Started)"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-subtext">Est. End Date</span>
          <span className="font-semibold text-foreground">
            {endDate ? formatDate(endDate) : "Pending"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-subtext">Est. Duration</span>
          <span className="font-semibold text-foreground">
            {totalDays} day(s)
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-subtext">Payout Frequency</span>
          <span className="font-semibold text-brand-accent">{billingLabel}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-subtext">Payout Sequence</span>
          <span className="font-semibold text-foreground">{sequenceLabel}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-neutral-border/50">
          <span className="text-neutral-subtext flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-brand-accent" /> Organizer
          </span>
          <span className="font-bold text-foreground">
            {organizerName || "Organizer"}
          </span>
        </div>
        {organizerContact && !isCycleDone && (
          <div className="flex justify-between items-center">
            <span className="text-neutral-subtext flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-accent" /> Contact No.
            </span>
            <span className="font-mono text-xs font-semibold text-foreground">
              {organizerContact}
            </span>
          </div>
        )}
        {isOrganizer && !hasStarted && !isCycleDone && (
          <div className="pt-3 border-t border-neutral-border/50 flex flex-col gap-2.5 w-full">
            {isMembersFull && onStartCycle && (
              <button
                disabled={isStarting || isDeleting}
                onClick={onStartCycle}
                className="w-full h-11 text-xs flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-background px-4 rounded-2xl font-bold active:opacity-90 transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={isStarting ? "animate-spin" : ""}
                />
                {isStarting ? "Starting..." : "Start Cycle"}
              </button>
            )}
            {onDeleteGroup && isOnlyOrganizerLeft && (
              <DeleteGroupDialog
                isDeleting={isDeleting}
                isStarting={isStarting}
                onDelete={onDeleteGroup}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
