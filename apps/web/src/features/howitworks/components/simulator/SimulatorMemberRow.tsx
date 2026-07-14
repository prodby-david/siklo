import React from "react";
import { SimulatorMember } from "../../types/simulator.types";
import { User, ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface SimulatorMemberRowProps {
  member: SimulatorMember;
  amount: number;
  isCurrentRecipient: boolean;
  simulationFinished: boolean;
  membersCount: number;
}

export default function SimulatorMemberRow({
  member,
  amount,
  isCurrentRecipient,
  simulationFinished,
  membersCount,
}: SimulatorMemberRowProps) {
  return (
    <div
      className={`p-3 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
        isCurrentRecipient && !simulationFinished
          ? "border-brand-accent/35 bg-brand-accent/5 ring-1 ring-brand-accent/20"
          : "border-neutral-border bg-background"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            isCurrentRecipient && !simulationFinished
              ? "bg-brand-accent/15 text-brand-accent"
              : "bg-neutral-subtext/10 text-neutral-subtext"
          }`}
        >
          <User className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
            {member.name}
            {isCurrentRecipient && !simulationFinished && (
              <span className="text-[9px] font-bold text-brand-accent bg-brand-accent/10 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                Recipient
              </span>
            )}
          </div>
          <div className="text-[10px] text-neutral-subtext font-semibold">
            Payout Slot: Round {member.payoutRound}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 text-right">
        <div className="flex flex-col text-left sm:text-right">
          <div className="text-[10px] text-neutral-subtext font-semibold uppercase tracking-wider">
            Current Action
          </div>
          <div className="text-[11px] font-bold text-foreground flex items-center gap-1">
            {simulationFinished ? (
              <span className="text-neutral-subtext">Cycle Finished</span>
            ) : isCurrentRecipient ? (
              <span className="text-success flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                Receiving ₱{(amount * membersCount).toLocaleString()}
              </span>
            ) : (
              <span className="text-neutral-subtext flex items-center gap-0.5">
                <ArrowDownLeft className="w-3 h-3 text-neutral-subtext/70" />
                Paying ₱{amount.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col text-right">
          <div className="text-[10px] text-neutral-subtext font-semibold uppercase tracking-wider">
            Net Balance
          </div>
          <div
            className={`text-xs font-extrabold ${
              member.netBalance > 0
                ? "text-success"
                : member.netBalance < 0
                ? "text-danger"
                : "text-foreground"
            }`}
          >
            {member.netBalance > 0 ? "+" : ""}₱{member.netBalance.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
