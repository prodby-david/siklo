"use client";

import React from "react";
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
    <div className="w-full bg-background rounded-2xl border border-neutral-border p-6 flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold text-foreground">
          Interactive Cycle Simulator
        </h3>
        <p className="text-xs text-neutral-subtext">
          Configure a savings circle and simulate the round-by-round payment flows.
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
