export interface GroupInviteItem {
  id: string;
  name: string;
  billingCycle: string;
  contributionAmount: number;
  maxMembers: number;
  status?: string;
  _count?: {
    memberships: number;
  };
}

export interface GroupRequestItem {
  id: string;
  name: string;
  status?: string;
}

export interface InvitesFilterBarProps {
  tab: "ALL" | "INVITES" | "REQUESTS";
  totalCount: number;
  receivedCount: number;
  sentCount: number;
  onTabChange: (tab: "ALL" | "INVITES" | "REQUESTS") => void;
}

export interface ReceivedInviteCardProps {
  item: GroupInviteItem;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export interface SentRequestCardProps {
  item: GroupRequestItem;
  onCancel: (id: string) => void;
}
