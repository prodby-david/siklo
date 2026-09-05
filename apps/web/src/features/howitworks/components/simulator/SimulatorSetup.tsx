import React from "react";
import { Play } from "lucide-react";
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
                  ? "bg-brand-accent/15 border-brand-accent text-brand-accent shadow-xs"
                  : "bg-card/80 border-brand-accent/25 text-neutral-subtext hover:border-brand-accent/40"
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
                  ? "bg-brand-accent/15 border-brand-accent text-brand-accent shadow-xs"
                  : "bg-card/80 border-brand-accent/25 text-neutral-subtext hover:border-brand-accent/40"
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
                  ? "bg-brand-accent/15 border-brand-accent text-brand-accent shadow-xs"
                  : "bg-card/80 border-brand-accent/25 text-neutral-subtext hover:border-brand-accent/40"
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
        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-brand-accent py-3 text-xs font-bold text-brand-accent-foreground shadow-xs transition-all hover:bg-brand-accent-hover active:scale-[0.98]"
      >
        <Play className="w-3.5 h-3.5 fill-current" />
        <span>Initialize Paluwagan Simulation</span>
      </button>
    </div>
  );
}
