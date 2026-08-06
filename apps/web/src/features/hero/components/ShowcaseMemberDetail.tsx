import React from "react";
import { CheckCircle2, ShieldCheck, Coins } from "lucide-react";
import { ShowcaseMemberDetailProps } from "../types/hero.types";

export default function ShowcaseMemberDetail({
  member,
}: ShowcaseMemberDetailProps) {
  return (
    <div className="lg:col-span-5 border border-neutral-border/80 rounded-2xl bg-neutral-table-stripe/80 p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-accent/15 border border-brand-accent/30 text-brand-accent flex items-center justify-center font-extrabold text-base">
          {member.initials}
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-accent">
            Selected Recipient
          </span>
          <h4 className="text-base font-extrabold text-foreground">
            {member.name}
          </h4>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-neutral-border/60 text-xs">
        <div className="flex justify-between py-1 border-b border-neutral-border/40">
          <span className="text-neutral-subtext">Payout Queue Position</span>
          <span className="font-extrabold text-foreground">
            Turn #{member.payoutTurn} of 6
          </span>
        </div>
        <div className="flex justify-between py-1 border-b border-neutral-border/40">
          <span className="text-neutral-subtext">Individual Contribution</span>
          <span className="font-bold text-foreground">
            ₱{member.contributionAmount.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-neutral-subtext">Total Lump Sum Payout</span>
          <span className="font-extrabold text-brand-accent">₱30,000</span>
        </div>
      </div>

      <div className="mt-2 p-3 rounded-xl bg-background border border-neutral-border/60 text-xs space-y-1.5">
        <div className="flex items-center gap-1.5 text-brand-accent font-bold text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Ledger Verification</span>
        </div>
        <p className="text-[11px] text-neutral-subtext leading-relaxed">
          Contributions for this round are verified in real time by the group organizer.
        </p>
      </div>
    </div>
  );
}
