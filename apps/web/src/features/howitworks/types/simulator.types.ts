export interface SimulationConfig {
  contributionAmount: number;
  membersCount: number;
  payoutScheme: "draw-lots" | "seniority" | "custom";
}

export interface SimulatorMember {
  id: string;
  name: string;
  payoutRound: number;
  netBalance: number;
  status: "pending" | "paid" | "received";
}

export interface SimulationState {
  currentRound: number;
  isActive: boolean;
  config: SimulationConfig;
  members: SimulatorMember[];
}
