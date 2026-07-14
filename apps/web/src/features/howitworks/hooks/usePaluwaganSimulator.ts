import { useState } from "react";
import { SimulationConfig, SimulationState, SimulatorMember } from "../types/simulator.types";
import { DEFAULT_CONFIG, SIMULATED_NAMES } from "../constants/simulator.constants";

export function usePaluwaganSimulator() {
  const [config, setConfig] = useState<SimulationConfig>(DEFAULT_CONFIG);
  const [state, setState] = useState<SimulationState>({
    currentRound: 0,
    isActive: false,
    config: DEFAULT_CONFIG,
    members: [],
  });

  const updateConfig = <K extends keyof SimulationConfig>(
    key: K,
    value: SimulationConfig[K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const startSimulation = () => {
    const membersCount = config.membersCount;
    const names = SIMULATED_NAMES.slice(0, membersCount);
    let rounds = Array.from({ length: membersCount }, (_, i) => i + 1);

    if (config.payoutScheme === "draw-lots") {
      rounds = [...rounds].sort(() => Math.random() - 0.5);
    }

    const initialMembers: SimulatorMember[] = names.map((name, index) => ({
      id: `member-${index}`,
      name,
      payoutRound: rounds[index],
      netBalance: 0,
      status: "pending",
    }));

    setState({
      currentRound: 1,
      isActive: true,
      config,
      members: initialMembers,
    });
  };

  const nextRound = () => {
    if (state.currentRound > state.config.membersCount) return;

    const round = state.currentRound;
    const amount = state.config.contributionAmount;
    const count = state.config.membersCount;

    const updatedMembers = state.members.map((member) => {
      const isRecipient = member.payoutRound === round;
      const balanceChange = isRecipient ? amount * (count - 1) : -amount;
      const newStatus = isRecipient
        ? ("received" as const)
        : member.status === "received"
        ? ("received" as const)
        : ("paid" as const);

      return {
        ...member,
        netBalance: member.netBalance + balanceChange,
        status: newStatus,
      };
    });

    setState((prev) => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      members: updatedMembers,
    }));
  };

  const resetSimulation = () => {
    startSimulation();
  };

  const goBackToSetup = () => {
    setState({
      currentRound: 0,
      isActive: false,
      config,
      members: [],
    });
  };

  return {
    config,
    state,
    updateConfig,
    startSimulation,
    nextRound,
    resetSimulation,
    goBackToSetup,
  };
}
