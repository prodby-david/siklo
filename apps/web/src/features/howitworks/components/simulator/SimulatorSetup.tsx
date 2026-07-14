import React from "react";
import { SimulationConfig } from "../../types/simulator.types";
import {
  CONTRIBUTION_OPTIONS,
  MEMBER_COUNT_OPTIONS,
  SCHEME_OPTIONS,
} from "../../constants/simulator.constants";

interface SimulatorSetupProps {
  config: SimulationConfig;
  onChange: <K extends keyof SimulationConfig>(
    key: K,
    value: SimulationConfig[K]
  ) => void;
  onStart: () => void;
}

export default function SimulatorSetup({
  config,
  onChange,
  onStart,
}: SimulatorSetupProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-neutral-subtext uppercase tracking-wider">
          Contribution per Member
        </label>
        <div className="grid grid-cols-4 gap-2">
          {CONTRIBUTION_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange("contributionAmount", option.value)}
              className={`py-2 text-xs font-semibold border rounded-2xl cursor-pointer transition-all ${
                config.contributionAmount === option.value
                  ? "bg-brand-accent/15 border-brand-accent text-brand-accent shadow-sm"
                  : "bg-background border-neutral-border text-neutral-subtext hover:bg-neutral-table-stripe"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-neutral-subtext uppercase tracking-wider">
          Number of Members
        </label>
        <div className="grid grid-cols-4 gap-2">
          {MEMBER_COUNT_OPTIONS.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => onChange("membersCount", count)}
              className={`py-2 text-xs font-semibold border rounded-2xl cursor-pointer transition-all ${
                config.membersCount === count
                  ? "bg-brand-accent/15 border-brand-accent text-brand-accent shadow-sm"
                  : "bg-background border-neutral-border text-neutral-subtext hover:bg-neutral-table-stripe"
              }`}
            >
              {count} Members
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-neutral-subtext uppercase tracking-wider">
          Payout Turn Scheme
        </label>
        <div className="grid grid-cols-3 gap-2">
          {SCHEME_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange("payoutScheme", option.value)}
              className={`py-2 text-[10px] sm:text-xs font-semibold border rounded-2xl cursor-pointer transition-all ${
                config.payoutScheme === option.value
                  ? "bg-brand-accent/15 border-brand-accent text-brand-accent shadow-sm"
                  : "bg-background border-neutral-border text-neutral-subtext hover:bg-neutral-table-stripe"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="w-full mt-4 bg-brand-accent hover:opacity-95 text-white py-3 rounded-2xl font-semibold active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2 text-xs cursor-pointer"
      >
        Initialize Paluwagan Simulation
      </button>
    </div>
  );
}
