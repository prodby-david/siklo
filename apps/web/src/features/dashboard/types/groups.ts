export type Group = {
  id: string;
  name: string;
  description?: string;
  contributionAmount: number;
  totalPayout: number;
  cycleDuration: number;
  maxMembers: number;
  billingCycle: "DAILY" | "WEEKLY" | "MONTHLY" | "BIMONTHLY" | "QUARTERLY";
  startDate: string;
};

export interface ExtendedGroup extends Group {
  _count?: {
    memberships: number;
  };
}
