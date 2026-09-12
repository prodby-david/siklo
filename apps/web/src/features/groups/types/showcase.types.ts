import React from "react";
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
  inviteCode?: string | null;
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

export interface TurnQueueProps {
  memberships: Membership[];
  rounds: GroupRound[];
  maxMembers: number;
  selectedTurn: number;
  currentCycle: number;
  currentTurn: number;
  hasStarted: boolean;
  startDate?: string | null;
  billingCycle: string;
  completedDisbursementDates: Record<number, Date>;
  confirmedTurns: Set<string>;
  disbursedTurns: Set<string>;
  organizerId?: string;
  onSelectTurn: (turn: number) => void;
}

export interface TurnActionPanelProps {
  selectedTurn: number;
  selectedMemberName: string;
  selectedMembership?: Membership;
  currentRound?: GroupRound;
  group: TurnDetailGroup;
  currentCycle: number;
  currentUserId?: string;
  calculatedPayoutDate: Date | null;
  contributionAmount: number;
  poolTotal: number;
  isOrganizer: boolean;
  isCurrentTurn: boolean;
  isCycleDone: boolean;
  hasStarted: boolean;
  isUserSlotOwner: boolean;
  isSelectedTurnReceived: boolean;
  isSelectedPaid: boolean;
  isSelectedPending: boolean;
  isSelectedRejected: boolean;
  hasCurrentMemberPaidOrganizerFee: boolean;
  isRoundAllContributionsPaid: boolean;
  isSelectingSlot: boolean;
  isDisbursingPayout: boolean;
  onSelectSlot?: (position: number) => Promise<void>;
  onDisbursePayout?: (data: {
    referenceNumber: string;
    proofUrl: string;
  }) => Promise<void>;
}

export interface TurnPaymentStatusPanelProps {
  selectedTurn: number;
  selectedMemberName: string;
  currentTurn?: number;
  contributionAmount: number;
  poolTotal: number;
  hasStarted: boolean;
  hasSelectedMembership: boolean;
  isCurrentBeneficiary: boolean;
  isSelectedTurnReceived: boolean;
  isSelectedTurnDisbursed: boolean;
  isSelectedPaid: boolean;
  isSelectedPending: boolean;
  isSelectedRejected: boolean;
}

export interface TurnDetailHeaderProps {
  selectedTurn: number;
  hasStarted: boolean;
  isSelectedTurnReceived: boolean;
  isSelectedTurnDisbursed: boolean;
  isCurrentBeneficiary: boolean;
  currentCycle: number;
}

export interface TurnDetailBeneficiaryProps {
  selectedMemberName: string;
  initials: string;
  selectedMembership?: Membership;
  isSlotOrganizer: boolean;
  isUserSlotOwner: boolean;
  isRemovableMember: boolean;
  isRemovingMember: boolean;
  feeAmount: number;
  hasSelectedMemberPaidOrganizerFee: boolean;
  selectedTurn: number;
  onRemoveMember?: (memberUserId: string) => Promise<void>;
}

export interface TurnDetailMetricsProps {
  selectedTurn: number;
  maxMembers: number;
  poolTotal: number;
  calculatedPayoutDate: Date | null;
}

export interface TurnDetailHistoryBarProps {
  paymentCount: number;
  onOpenHistory: () => void;
}

export interface TurnActionWaitingStateProps {
  icon: React.ReactNode;
  message: React.ReactNode;
  className?: string;
}

export interface DisbursePayoutActionProps {
  group: TurnDetailGroup;
  currentRound?: GroupRound;
  currentCycle: number;
  selectedMemberName: string;
  selectedMembership?: Membership;
  selectedTurn: number;
  poolTotal: number;
  isDisbursingPayout: boolean;
  onDisbursePayout?: (data: {
    referenceNumber: string;
    proofUrl: string;
  }) => Promise<void>;
}

export interface SubmitContributionActionProps {
  currentRound?: GroupRound;
  group: TurnDetailGroup;
  contributionAmount: number;
  currentUserId?: string;
  calculatedPayoutDate: Date | null;
  isSelectedRejected: boolean;
  hasCurrentMemberPaidOrganizerFee: boolean;
}

export interface GroupRoundsSummaryCardsProps {
  maxMembers: number;
  contributionAmount: number;
  poolTotal: number;
  hasStarted: boolean;
  activeBeneficiaryName: string;
  currentTurn: number;
  isCycleDone: boolean;
  isRoundReceived: boolean;
  isRoundDisbursed: boolean;
  isRoundAllPaid: boolean;
  verifiedPaymentsCount: number;
}

export interface GroupRoundsProgressBarsProps {
  currentTurn: number;
  verifiedPaymentsCount: number;
  maxMembers: number;
  progressPercent: number;
  organizerFeeAmount: number;
  paidOrganizerFeeCount: number;
  nonOrganizerCount: number;
  feeProgressPercent: number;
}

export interface MemberPaymentHistoryItemProps {
  payment: PaymentRecord;
  roundInfo: {
    cycleNumber: number;
    roundNumber: number;
  };
}

export interface GroupTurnShowcaseHeaderProps {
  payoutSequence: "RANDOM" | "MANUAL" | "FREECHOOSING";
  groupId: string;
  isOrganizer: boolean;
  hasStarted: boolean;
  isCycleDone: boolean;
  currentCycle: number;
  cycleDuration: number;
  totalPayoutNum: number;
}
