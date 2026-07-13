import type { CreateGroupInput } from "@/features/groups/validator/create-group.validator";
import { BILLING_CYCLE_LABELS } from "@/features/groups/constants/billing-cycle.constants";
import { PAYOUT_SEQUENCE_LABELS } from "@/features/groups/constants/payout-sequence.constants";
import { Info } from "lucide-react";

interface CreateGroupPreviewProps {
  watchedFields: CreateGroupInput;
  totalPayout: number;
  totalRounds: number;
  totalDays: number;
}

export default function CreateGroupPreview({
  watchedFields,
  totalPayout,
  totalRounds,
  totalDays,
}: CreateGroupPreviewProps) {
  return (
    <div className="lg:col-span-5 flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-2xl border border-brand-accent/20 bg-gradient-to-tr from-brand-accent/15 to-indigo-500/10 p-6 backdrop-blur-md dark:from-brand-accent/10 dark:to-indigo-500/5 flex-1 flex flex-col justify-between min-h-[420px]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full bg-brand-accent/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-brand-accent">
              Live Preview
            </span>
          </div>

          <div className="mb-6 space-y-1">
            <h3 className="truncate text-xl font-bold text-foreground">
              {watchedFields.name || "Untitled Group"}
            </h3>

            <p className="line-clamp-3 text-xs text-neutral-subtext">
              {watchedFields.description || "No description provided yet."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 border-t border-neutral-border/20 pt-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-subtext">
                Contribution
              </p>

              <p className="text-lg font-bold text-foreground">
                ₱
                {Number(watchedFields.contributionAmount || 0).toLocaleString()}
              </p>

              <span className="text-xs text-neutral-subtext">
                every{" "}
                {(
                  BILLING_CYCLE_LABELS[watchedFields.billingCycle] || "Day"
                ).toLowerCase()}
              </span>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-subtext">
                Payout Per Round
              </p>

              <p className="text-lg font-bold text-brand-accent">
                ₱{totalPayout.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-subtext">
                Members
              </p>

              <p className="text-sm font-semibold text-foreground">
                {Number(watchedFields.maxMembers || 0)} member(s)
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-subtext">
                Cycles
              </p>

              <p className="text-sm font-semibold text-foreground">
                {Number(watchedFields.cycleDuration || 0)} rotation(s)
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-subtext">
                Payout Sequence
              </p>

              <p className="text-sm font-semibold text-foreground">
                {PAYOUT_SEQUENCE_LABELS[watchedFields.payoutSequence] || "Randomized"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-neutral-border/20 pt-5">
          <div className="flex items-start gap-3 rounded-2xl border border-neutral-border/10 bg-neutral-subtext/5 p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />

            <div className="flex-1">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                Cycle Summary
              </h4>

              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-subtext">Rounds per Cycle</span>

                  <span className="font-semibold text-foreground">
                    {Number(watchedFields.maxMembers || 0)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-subtext">
                    Total Payout Rounds
                  </span>

                  <span className="font-semibold text-foreground">
                    {totalRounds}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-subtext">
                    Estimated Duration
                  </span>

                  <span className="font-semibold text-foreground">
                    {totalDays} day(s)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-subtext">
                    Every Member Receives
                  </span>

                  <span className="font-semibold text-brand-accent">
                    {Number(watchedFields.cycleDuration || 0)} payout(s)
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-brand-accent/10 p-3 text-xs text-neutral-subtext">
                Every member contributes{" "}
                <span className="font-bold text-foreground">
                  ₱
                  {Number(
                    watchedFields.contributionAmount || 0,
                  ).toLocaleString()}
                </span>{" "}
                every{" "}
                <span className="font-bold text-foreground">
                  {(
                    BILLING_CYCLE_LABELS[watchedFields.billingCycle] || "Day"
                  ).toLowerCase()}
                </span>
                . Each payout round distributes{" "}
                <span className="font-bold text-brand-accent">
                  ₱{totalPayout.toLocaleString()}
                </span>{" "}
                to the scheduled member.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
