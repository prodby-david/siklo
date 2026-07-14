import React from "react";
import { SimulationState } from "../../types/simulator.types";
import SimulatorMemberRow from "./SimulatorMemberRow";
import { Play, RotateCcw, ArrowLeft, Landmark } from "lucide-react";

interface SimulatorDashboardProps {
  state: SimulationState;
  onNext: () => void;
  onReset: () => void;
  onBack: () => void;
}

export default function SimulatorDashboard({
  state,
  onNext,
  onReset,
  onBack,
}: SimulatorDashboardProps) {
  const { currentRound, config, members } = state;
  const simulationFinished = currentRound > config.membersCount;
  const currentRecipient = members.find(
    (m) => m.payoutRound === currentRound
  );
  const potSize = config.contributionAmount * config.membersCount;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-neutral-border pb-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider">
            Simulation Mode
          </span>
          <h4 className="text-sm font-bold text-foreground">
            {simulationFinished
              ? "Simulation Complete"
              : `Round ${currentRound} of ${config.membersCount}`}
          </h4>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-neutral-subtext hover:text-foreground cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Adjust Settings
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-neutral-table-stripe/50 border border-neutral-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
              Total Payout Pot
            </div>
            <div className="text-xl font-extrabold text-foreground">
              ₱{potSize.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="text-[10px] text-neutral-subtext font-semibold bg-background border border-neutral-border/60 px-2.5 py-1 rounded-2xl">
          ₱{config.contributionAmount.toLocaleString()} × {config.membersCount} Members
        </div>
      </div>

      <div className="p-3.5 rounded-2xl border bg-background flex flex-col gap-1 border-neutral-border/60">
        <div className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
          Cycle Status Message
        </div>
        <p className="text-xs text-foreground font-medium leading-relaxed">
          {simulationFinished ? (
            <span className="text-success font-bold">
              Success! The rotating cycle is finished. Notice how all member balances returned to exactly zero. Everyone successfully saved their goal amount!
            </span>
          ) : currentRecipient ? (
            <span>
              <strong>{currentRecipient.name}</strong> receives the payout of{" "}
              <strong>₱{potSize.toLocaleString()}</strong> this round. All other members contribute{" "}
              <strong>₱{config.contributionAmount.toLocaleString()}</strong>.
            </span>
          ) : null}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider mb-1">
          Member Balance Sheets
        </div>
        {members.map((member) => (
          <SimulatorMemberRow
            key={member.id}
            member={member}
            amount={config.contributionAmount}
            isCurrentRecipient={member.payoutRound === currentRound}
            simulationFinished={simulationFinished}
            membersCount={config.membersCount}
          />
        ))}
      </div>

      <div className="flex items-center gap-3 mt-4 border-t border-neutral-border pt-4">
        <button
          type="button"
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 border border-neutral-border bg-background hover:bg-neutral-table-stripe text-foreground py-2.5 rounded-2xl text-xs font-semibold cursor-pointer active:scale-95 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5 text-neutral-subtext" />
          Restart Simulation
        </button>

        {!simulationFinished && (
          <button
            type="button"
            onClick={onNext}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-accent text-white py-2.5 rounded-2xl text-xs font-semibold cursor-pointer hover:opacity-95 active:scale-95 transition-all shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Next Round
          </button>
        )}
      </div>
    </div>
  );
}
