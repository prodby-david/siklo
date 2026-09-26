import { Award, Coins, ShieldCheck } from "lucide-react";
import type { GroupRoundsSummaryCardsProps } from "@/features/groups/types/showcase.types";

export default function GroupRoundsSummaryCards({
  maxMembers,
  contributionAmount,
  poolTotal,
  hasStarted,
  activeBeneficiaryName,
  currentTurn,
  isCycleDone,
  isRoundReceived,
  isRoundDisbursed,
  isRoundAllPaid,
  verifiedPaymentsCount,
}: GroupRoundsSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="p-3.5 rounded-2xl border border-neutral-border/70 bg-neutral-subtext/3 flex flex-col justify-between gap-1.5">
        <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider flex items-center gap-1">
          <Coins className="w-3 h-3 text-brand-accent" /> Round Concept
        </span>
        <p className="text-xs font-semibold text-foreground leading-snug">
          Each round is 1 rotation where all {maxMembers} members contribute ₱
          {contributionAmount.toLocaleString()} for 1 recipient.
        </p>
        <span className="text-[10px] text-neutral-subtext">
          Pool total: ₱{poolTotal.toLocaleString()} per round
        </span>
      </div>

      <div className="p-3.5 rounded-2xl border border-neutral-border/70 bg-neutral-subtext/3 flex flex-col justify-between gap-1.5">
        <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider flex items-center gap-1">
          <Award className="w-3 h-3 text-brand-accent" /> Current Round
          Recipient
        </span>
        <p className="text-sm font-extrabold text-foreground truncate">
          {hasStarted ? activeBeneficiaryName : "Pending Cycle Start"}
        </p>
        <span className="text-[10px] text-brand-accent font-bold">
          {hasStarted
            ? `Turn #${currentTurn} Beneficiary`
            : "Waiting for organizer"}
        </span>
      </div>

      <div className="p-3.5 rounded-2xl border border-neutral-border/70 bg-neutral-subtext/3 flex flex-col justify-between gap-1.5">
        <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-brand-accent" /> Payout Stage
        </span>
        <div>
          {isCycleDone ? (
            <span className="text-xs font-extrabold text-success">
              Completed
            </span>
          ) : isRoundReceived ? (
            <span className="text-xs font-extrabold text-success">
              Payout Confirmed Received
            </span>
          ) : isRoundDisbursed ? (
            <span className="text-xs font-extrabold text-winner-payout">
              Payout Disbursed
            </span>
          ) : isRoundAllPaid ? (
            <span className="text-xs font-extrabold text-success">
              Ready for Payout Release
            </span>
          ) : hasStarted ? (
            <span className="text-xs font-extrabold text-warning">
              Collecting Contributions
            </span>
          ) : (
            <span className="text-xs font-extrabold text-neutral-subtext">
              Waiting for Start
            </span>
          )}
        </div>
        <span className="text-[10px] text-neutral-subtext">
          {hasStarted
            ? `${verifiedPaymentsCount} of ${maxMembers} contributions completed`
            : "0 members contributed"}
        </span>
      </div>
    </div>
  );
}
