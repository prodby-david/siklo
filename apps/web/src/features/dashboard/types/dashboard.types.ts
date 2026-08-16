export interface DashboardWelcomeBannerProps {
  firstName: string;
}

export interface ActiveGroupsCardProps {
  count: number;
  nextContributionAmount?: number;
  groupName?: string;
  groupId?: string;
  nearestDueDate?: string | null;
}

export interface NextPayoutCardProps {
  expectedAmount: number;
  expectedDate: string | null;
  groupName: string;
  groupId?: string;
}

export interface TotalSavingsCardProps {
  totalPayoutPool: number;
  totalMonthlyContributions?: number;
  perTurnContribution?: number;
  primaryBillingCycle?: string;
  activeGroupsCount?: number;
}

export interface InviteItem {
  id: string;
  group: {
    id: string;
    name: string;
    description: string | null;
    contributionAmount: number;
    billingCycle: string;
    maxMembers: number;
    organizer: {
      id: string;
      name: string;
    };
  };
  createdAt: string;
}

export interface RequestItem {
  id: string;
  group: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}
