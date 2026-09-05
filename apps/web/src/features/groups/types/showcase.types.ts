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
  organizerFeeAmount?: number;
  onRefresh?: () => void;
}

export interface ShowcaseTurnCardProps {
  position: number;
  membership?: Membership;
  isSelected: boolean;
  isReceived?: boolean;
  isDisbursed?: boolean;
  isCurrent: boolean;
  hasStarted?: boolean;
  calculatedDate: Date | null;
  onSelect: (position: number) => void;
  organizerId?: string;
}

export interface TurnDetailGroup {
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
  organizerFeeAmount?: number;
  rounds?: GroupRound[];
  payments?: PaymentRecord[];
}

export interface TurnDetailPanelProps {
  selectedTurn: number;
  selectedMemberName: string;
  selectedMembership?: Membership;
  isSelectedPaid: boolean;
  isSelectedPending?: boolean;
  isSelectedRejected?: boolean;
  isSelectedTurnReceived?: boolean;
  isSelectedTurnDisbursed?: boolean;
  calculatedPayoutDate: Date | null;
  group: TurnDetailGroup;
  isOrganizer: boolean;
  isCurrentTurn: boolean;
  isCycleDone: boolean;
  currentCycle: number;
  currentTurn?: number;
  onJumpToCurrentTurn?: () => void;
  hasStarted?: boolean;
  currentUserId?: string;
  hasSelectedMemberPaidOrganizerFee?: boolean;
  hasCurrentMemberPaidOrganizerFee?: boolean;
  onSelectSlot?: (position: number) => Promise<void>;
  isSelectingSlot?: boolean;
  onRemoveMember?: (memberUserId: string) => Promise<void>;
  isRemovingMember?: boolean;
  isRoundAllContributionsPaid?: boolean;
  isRoundDisbursed?: boolean;
  isRoundConfirmed?: boolean;
  onDisbursePayout?: (data: { referenceNumber: string; proofUrl: string }) => Promise<void>;
  isDisbursingPayout?: boolean;
  onConfirmPayoutReceipt?: (data: { notes?: string }) => Promise<void>;
  isConfirmingPayoutReceipt?: boolean;
  onRefresh?: () => void;
}

export interface MemberPaymentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  payments: PaymentRecord[];
  rounds?: GroupRound[];
  currentCycle: number;
  selectedTurn: number;
}

export interface GroupRoundsStatusCardProps {
  groupName: string;
  hasStarted: boolean;
  isCycleDone: boolean;
  currentCycle: number;
  currentTurn: number;
  maxMembers: number;
  cycleDuration: number;
  contributionAmount: number | string;
  organizerId?: string;
  organizerFeeAmount?: number;
  rounds?: GroupRound[];
  payments?: PaymentRecord[];
  memberships?: Membership[];
}
