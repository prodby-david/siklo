import { Membership } from "@/features/groups/types/group.types";

export interface GroupTurnShowcaseProps {
  groupId: string;
  name?: string;
  organizerId?: string;
  startDate?: string | null;
  maxMembers: number;
  contributionAmount: number | string;
  billingCycle: string;
  cycleDuration: number;
  payoutSequence: "RANDOM" | "MANUAL" | "FREECHOOSING";
  memberships: Membership[];
  isOrganizer: boolean;
  hasStarted?: boolean;
  currentUserId?: string;
  isCycleDone?: boolean;
}

export interface ShowcaseTurnCardProps {
  position: number;
  membership?: Membership;
  isSelected: boolean;
  isPaid: boolean;
  isCurrent: boolean;
  calculatedDate: Date | null;
  onSelect: (position: number) => void;
  organizerId?: string;
}

export interface TurnDetailPanelProps {
  selectedTurn: number;
  selectedMemberName: string;
  selectedMembership?: Membership;
  isSelectedPaid: boolean;
  calculatedPayoutDate: Date | null;
  group: {
    contributionAmount: number | string;
    maxMembers: number;
    billingCycle: string;
    startDate?: string | null;
    payoutSequence?: "RANDOM" | "MANUAL" | "FREECHOOSING";
    organizerId?: string;
  };
  isOrganizer: boolean;
  isCurrentTurn: boolean;
  isCycleDone: boolean;
  currentCycle: number;
  onMarkAsPaid: () => void;
  isMarkingPaid: boolean;
  hasStarted?: boolean;
  currentUserId?: string;
  onSelectSlot?: (position: number) => Promise<void>;
  isSelectingSlot?: boolean;
  onRemoveMember?: (memberUserId: string) => Promise<void>;
  isRemovingMember?: boolean;
}
