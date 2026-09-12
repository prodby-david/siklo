import { Clock, AlertTriangle } from "lucide-react";
import formatDate from "@/shared/utils/formatDate";
import type { GroupInfoRulesSectionProps } from "../../../types/group.types";

export default function GroupInfoRulesSection({
  startDate,
  endDate,
  totalDays,
  billingLabel,
  sequenceLabel,
  gracePeriodDays = 0,
  latePenaltyAmount = 0,
}: GroupInfoRulesSectionProps) {
  return (
    <>
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
        <span className="text-neutral-subtext">Total Duration</span>
        <span className="font-semibold text-foreground">
          {totalDays > 0 ? `${totalDays} Days` : "Calculating..."}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-neutral-subtext">Billing Frequency</span>
        <span className="font-semibold text-foreground">{billingLabel}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-neutral-subtext">Payout Distribution</span>
        <span className="font-semibold text-foreground">{sequenceLabel}</span>
      </div>

      <div className="pt-2 border-t border-neutral-border/50 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-neutral-subtext flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-brand-accent" /> Grace Period
          </span>
          <span className="font-semibold text-foreground">
            {gracePeriodDays && gracePeriodDays > 0
              ? `${gracePeriodDays} Day(s)`
              : "None (Due Immediately)"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-neutral-subtext flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-warning" /> Daily Late Penalty
          </span>
          <span className="font-bold text-warning">
            {latePenaltyAmount && latePenaltyAmount > 0
              ? `${latePenaltyAmount}% / day`
              : "None"}
          </span>
        </div>
      </div>
    </>
  );
}
