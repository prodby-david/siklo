export interface OrganizerInviteSectionProps {
  groupId: string;
  inviteCode?: string | null;
  maxMembers: number;
  membershipsCount: number;
  isOrganizer?: boolean;
}

export type InviteStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "EXPIRED";

export type InviteType = "received" | "sent";

export interface ReceivedInvite {
  id: string;
  groupId: string;
  groupName?: string;
  groupDescription?: string;
  contributionAmount?: number;
  billingCycle?: string;
  maxMembers?: number;
  currentMembers?: number;
  invitedBy?: {
    id?: string;
    name: string;
    email?: string;
    avatarUrl?: string;
  };
  group?: {
    id: string;
    name: string;
    contributionAmount: number;
    billingCycle: string;
  };
  organizer?: {
    id: string;
    name: string;
  };
  status: InviteStatus;
  createdAt: string;
  expiresAt?: string;
  slotPosition?: number;
}

export interface SentInvite {
  id: string;
  groupId: string;
  groupName: string;
  recipientEmail: string;
  recipientName?: string;
  status: InviteStatus;
  sentAt: string;
  expiresAt?: string;
  inviteCode?: string;
}

export interface InviteCounts {
  receivedTotal: number;
  receivedPending: number;
  sentTotal: number;
  sentPending: number;
}

export interface InviteStatusBadgeProps {
  status: InviteStatus;
  className?: string;
}

export interface ReceivedInviteCardProps {
  type?: "received";
  invite: ReceivedInvite;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  isProcessing?: boolean;
}

export interface ReceivedInvitesListProps {
  invites: ReceivedInvite[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export interface SentInviteCardProps {
  type: "sent";
  invite: SentInvite;
  onRevoke?: (id: string) => void;
  onResend?: (id: string) => void;
  isProcessing?: boolean;
}

export type InviteCardProps = ReceivedInviteCardProps | SentInviteCardProps;

export interface SentInvitesListProps {
  invites: SentInvite[];
  onRevoke: (id: string) => void;
  onResend: (id: string) => void;
}

export interface InvitesHeaderProps {
  counts?: InviteCounts;
}

export interface InvitesEmptyStateProps {
  type?: InviteType;
}
