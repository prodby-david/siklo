"use client";

import React from "react";
import { RotateCw } from "lucide-react";
import { usePaluwaganSimulator } from "../../hooks/usePaluwaganSimulator";
import SimulatorSetup from "./SimulatorSetup";
import SimulatorDashboard from "./SimulatorDashboard";

export default function PaluwaganSimulator() {
  const {
    config,
    state,
    updateConfig,
    startSimulation,
    nextRound,
    resetSimulation,
    goBackToSetup,
  } = usePaluwaganSimulator();

  return (
    <div className="w-full bg-background rounded-3xl border border-brand-accent/30 p-6 sm:p-10 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/15 border border-brand-accent/30 text-brand-accent text-xs font-bold self-start">
          <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Interactive Simulator</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
          Paluwagan Cycle Simulator
        </h3>

        <p className="text-xs sm:text-sm text-neutral-subtext leading-relaxed font-normal max-w-xl">
          Configure a savings circle and simulate the round-by-round payment flows in real-time.
        </p>
      </div>

      {!state.isActive ? (
        <SimulatorSetup
          config={config}
          onChange={updateConfig}
          onStart={startSimulation}
        />
      ) : (
        <SimulatorDashboard
          state={state}
          onNext={nextRound}
          onReset={resetSimulation}
          onBack={goBackToSetup}
        />
      )}
    </div>
  );
}
