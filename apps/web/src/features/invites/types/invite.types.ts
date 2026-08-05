export interface GroupInvite {
  id: string;
  name: string;
  contributionAmount: number;
  maxMembers: number;
  billingCycle: string;
  inviteCode: string;
  _count?: {
    memberships: number;
  };
}

export type InviteTabFilter = "ALL" | "INVITES" | "REQUESTS";

export interface UseInvitesViewReturn {
  tab: InviteTabFilter;
  setTab: (tab: InviteTabFilter) => void;
  isLoading: boolean;
  receivedInvites: GroupInvite[];
  sentRequests: GroupInvite[];
  handleAcceptInvite: (id: string) => void;
  handleDeclineInvite: (id: string) => void;
  handleCancelRequest: (id: string) => void;
  showInvites: boolean;
  showRequests: boolean;
  totalCount: number;
}
