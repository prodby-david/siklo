import { BILLING_CYCLE_LABELS } from "@/features/groups/constants/billing-cycle.constants";
import { PAYOUT_SEQUENCE_LABELS } from "@/features/groups/constants/payout-sequence.constants";
import { Info, Clock, AlertTriangle, Crown } from "lucide-react";
import { CreateGroupPreviewProps } from "@/features/groups/types/group.types";

export default function CreateGroupPreview({
  watchedFields,
  totalPayout,
  totalRounds,
  totalDays,
}: CreateGroupPreviewProps) {
  const allowedMethods = watchedFields.allowedPaymentMethods || ["E_WALLET", "BANK_TRANSFER", "CASH"];
  const graceDays = Number(watchedFields.gracePeriodDays || 0);
  const penaltyRate = Number(watchedFields.latePenaltyAmount || 0);
  const organizerFee = Number(watchedFields.organizerFeeAmount || 0);
  const isParticipating = watchedFields.isOrganizerParticipating !== false;
  const estimatedDailyPenalty = Math.round(
    Number(watchedFields.contributionAmount || 0) * (penaltyRate / 100)
  );

  return (
    <div className="lg:col-span-5 lg:sticky lg:top-6 self-start flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-2xl border border-brand-accent/20 bg-gradient-to-tr from-brand-accent/15 to-indigo-500/10 p-5 backdrop-blur-md dark:from-brand-accent/10 dark:to-indigo-500/5 shadow-xs h-auto">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-brand-accent/15 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-brand-accent">
            Live Preview
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-neutral-subtext">
            <Crown className="w-3 h-3 text-amber-500" />
            <span>{isParticipating ? "Participating Saver" : "Manager Only"}</span>
          </span>
        </div>

        <div className="mb-4 space-y-0.5">
          <h3 className="truncate text-lg font-extrabold text-foreground">
            {watchedFields.name || "Untitled Group"}
          </h3>
          <p className="line-clamp-2 text-xs text-neutral-subtext">
            {watchedFields.description || "No description provided yet."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-neutral-border/20 pt-4 text-xs">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-subtext">
              Base Contribution
            </p>
            <p className="text-base font-extrabold text-foreground">
              ₱{Number(watchedFields.contributionAmount || 0).toLocaleString()}
            </p>
            <span className="text-[10px] text-neutral-subtext">
              every {(BILLING_CYCLE_LABELS[watchedFields.billingCycle] || "Day").toLowerCase()}
            </span>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-subtext">
              Payout Per Round
            </p>
            <p className="text-base font-extrabold text-brand-accent">
              ₱{totalPayout.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-subtext">
              Members & Cycles
            </p>
            <p className="text-xs font-semibold text-foreground">
              {Number(watchedFields.maxMembers || 0)} members ({Number(watchedFields.cycleDuration || 0)} rot.)
            </p>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-subtext">
              Payout Sequence
            </p>
            <p className="text-xs font-semibold text-foreground">
              {PAYOUT_SEQUENCE_LABELS[watchedFields.payoutSequence] || "Randomized"}
            </p>
          </div>
        </div>

        {(graceDays > 0 || penaltyRate > 0 || organizerFee > 0) && (
          <div className="mt-3 grid grid-cols-2 gap-2 pt-3 border-t border-neutral-border/20 text-[10px]">
            {graceDays > 0 && (
              <div className="flex items-center gap-1 text-neutral-subtext">
                <Clock className="w-3 h-3 text-brand-accent shrink-0" />
                <span>Grace: <strong>{graceDays}d</strong></span>
              </div>
            )}
            {penaltyRate > 0 && (
              <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-3 h-3 shrink-0" />
                <span>Penalty: <strong>{penaltyRate}% (₱{estimatedDailyPenalty}/d)</strong></span>
              </div>
            )}
            {organizerFee > 0 && (
              <div className="flex items-center gap-1 text-foreground col-span-2">
                <Crown className="w-3 h-3 text-amber-500 shrink-0" />
                <span>One-Time Organizer Fee: <strong>₱{organizerFee.toLocaleString()}</strong></span>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 border-t border-neutral-border/20 pt-3">
          <div className="flex items-start gap-2.5 rounded-xl border border-neutral-border/10 bg-neutral-subtext/5 p-3">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-accent" />
            <div className="flex-1 text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-neutral-subtext">Organizer Role:</span>
                <span className="font-bold text-foreground">
                  {isParticipating ? "Saver & Recipient" : "Facilitator (No Rotation)"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-subtext">Total Payout Rounds:</span>
                <span className="font-bold text-foreground">{totalRounds}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-subtext">Est. Duration:</span>
                <span className="font-bold text-foreground">{totalDays} day(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-subtext">Allowed Payments:</span>
                <span className="font-bold text-brand-accent">
                  {allowedMethods.map((m) => (m === "E_WALLET" ? "E-Wallet" : m === "BANK_TRANSFER" ? "Bank" : "Cash on Hand")).join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
