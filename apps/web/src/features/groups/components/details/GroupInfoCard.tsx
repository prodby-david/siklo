import { Info } from "lucide-react";
import { BILLING_CYCLE_LABELS } from "../../constants/billing-cycle.constants";
import { PAYOUT_SEQUENCE_LABELS } from "../../constants/payout-sequence.constants";
import type { GroupInfoCardProps } from "../../types/group.types";
import GroupInfoRulesSection from "./elements/GroupInfoRulesSection";
import GroupInfoPaymentSection from "./elements/GroupInfoPaymentSection";
import GroupInfoOrganizerSection from "./elements/GroupInfoOrganizerSection";

export default function GroupInfoCard({
  groupName,
  startDate,
  endDate,
  totalDays,
  billingCycle,
  payoutSequence,
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
  allowedMethods = ["E_WALLET", "BANK_TRANSFER", "CASH"],
  paymentDetails,
  gracePeriodDays = 0,
  latePenaltyAmount = 0,
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
        <Info className="w-4 h-4 text-brand-accent" /> Group Details & Rules
      </h3>

      <div className="space-y-3 text-xs sm:text-sm">
        <GroupInfoRulesSection
          startDate={startDate}
          endDate={endDate}
          totalDays={totalDays}
          billingLabel={billingLabel}
          sequenceLabel={sequenceLabel}
          gracePeriodDays={gracePeriodDays}
          latePenaltyAmount={latePenaltyAmount}
        />

        <GroupInfoPaymentSection
          allowedMethods={allowedMethods}
          paymentDetails={paymentDetails}
        />

        <GroupInfoOrganizerSection
          organizerName={organizerName}
          organizerContact={organizerContact}
          isCycleDone={isCycleDone}
          isOrganizer={isOrganizer}
          hasStarted={hasStarted}
          isMembersFull={isMembersFull}
          isOnlyOrganizerLeft={isOnlyOrganizerLeft}
          isStarting={isStarting}
          isDeleting={isDeleting}
          groupName={groupName}
          onStartCycle={onStartCycle}
          onDeleteGroup={onDeleteGroup}
        />
      </div>
    </div>
  );
}
