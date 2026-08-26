import { Membership, PaymentRecord, GroupRound } from "@/features/groups/types/group.types";

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
  payments?: PaymentRecord[];
  rounds?: GroupRound[];
  allowedPaymentMethods?: ("E_WALLET" | "BANK_TRANSFER" | "CASH")[];
  paymentDetails?: string | null;
  gracePeriodDays?: number;
  latePenaltyAmount?: number;
  onRefresh?: () => void;
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

export interface TurnPaidBadgeProps {
  currentCycle: number;
  isOrganizer?: boolean;
}

export interface TurnDetailPanelProps {
  selectedTurn: number;
  selectedMemberName: string;
  selectedMembership?: Membership;
  isSelectedPaid: boolean;
  isSelectedPending?: boolean;
  isSelectedRejected?: boolean;
  calculatedPayoutDate: Date | null;
  group: {
    id?: string;
    contributionAmount: number | string;
    maxMembers: number;
    billingCycle: string;
    startDate?: string | null;
    payoutSequence?: "RANDOM" | "MANUAL" | "FREECHOOSING";
    organizerId?: string;
    allowedPaymentMethods?: ("E_WALLET" | "BANK_TRANSFER" | "CASH")[];
    paymentDetails?: string | null;
    gracePeriodDays?: number;
    latePenaltyAmount?: number;
    rounds?: GroupRound[];
    payments?: PaymentRecord[];
  };
  isOrganizer: boolean;
  isCurrentTurn: boolean;
  isCycleDone: boolean;
  currentCycle: number;
  currentTurn?: number;
  onJumpToCurrentTurn?: () => void;
  hasStarted?: boolean;
  currentUserId?: string;
  onSelectSlot?: (position: number) => Promise<void>;
  isSelectingSlot?: boolean;
  onRemoveMember?: (memberUserId: string) => Promise<void>;
  isRemovingMember?: boolean;
  isRoundAllContributionsPaid?: boolean;
  isRoundDisbursed?: boolean;
  isRoundConfirmed?: boolean;
  onDisbursePayout?: (data: { referenceNumber?: string; proofUrl?: string }) => Promise<void>;
  isDisbursingPayout?: boolean;
  onConfirmPayoutReceipt?: (data: { notes?: string }) => Promise<void>;
  isConfirmingPayoutReceipt?: boolean;
  onRefresh?: () => void;
}
