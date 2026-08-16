import { UseFormRegister, FieldErrors, Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { CreateGroupInput } from "../validator/create-group.validator";

export type PaymentMethodKey = "E_WALLET" | "BANK_TRANSFER" | "CASH";

export interface User {
  id: string;
  name: string;
  contactNumber?: string;
}

export interface Membership {
  userId: string;
  position: number;
  preferredPaymentMethod?: "E_WALLET" | "BANK_TRANSFER" | "CASH" | null;
  paymentAccountDetails?: string | null;
  joinedAt?: string | Date;
  user: User;
}

export interface PaymentRecord {
  id: string;
  groupId: string;
  roundId: string;
  userId: string;
  paymentMethod: "E_WALLET" | "BANK_TRANSFER" | "CASH";
  baseAmount: number;
  penaltyAmount: number;
  totalAmount: number;
  referenceNumber?: string | null;
  proofUrl?: string | null;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  rejectionReason?: string | null;
  rejectionProofUrl?: string | null;
  verifiedAt?: string | Date | null;
  createdAt: string | Date;
}

export interface GroupRound {
  id: string;
  groupId: string;
  cycleNumber: number;
  roundNumber: number;
  recipientId: string;
  targetDate: string | Date;
  status: "PENDING" | "PAID";
  payments?: PaymentRecord[];
}

export interface Group {
  id: string;
  name: string;
  description?: string | null;
  inviteCode?: string;
  organizerId: string;
  organizer?: {
    id: string;
    name: string;
    contactNumber: string;
  };
  createdAt: string | Date;
  startDate?: string | Date | null;
  billingCycle: string;
  contributionAmount: number;
  maxMembers: number;
  cycleDuration: number;
  payoutSequence: string;
  gracePeriodDays?: number;
  latePenaltyAmount?: number;
  allowedPaymentMethods?: ("E_WALLET" | "BANK_TRANSFER" | "CASH")[];
  paymentDetails?: string | null;
  memberships?: Membership[];
  rounds?: GroupRound[];
  payments?: PaymentRecord[];
}

export interface ExtendedGroup extends Omit<Group, "billingCycle"> {
  billingCycle: string;
  currentTurn?: number;
  _count?: {
    memberships: number;
  };
  isCycleDone?: boolean;
}

export interface GroupCardItemProps {
  group: ExtendedGroup;
}

export interface GroupHeroProps {
  groupId?: string;
  name: string;
  description: string | null;
  billingCycle: string;
  inviteCode: string;
  copied: boolean;
  onCopyInviteCode: () => void;
  hasStarted?: boolean;
  isCycleDone?: boolean;
  isOrganizer?: boolean;
  allowedMethods?: ("E_WALLET" | "BANK_TRANSFER" | "CASH")[];
  organizerPaymentDetails?: string | null;
  contributionAmount?: number;
  gracePeriodDays?: number;
  latePenaltyAmount?: number;
  roundId?: string;
  currentMemberMethod?: "E_WALLET" | "BANK_TRANSFER" | "CASH" | null;
  currentMemberAccountDetails?: string | null;
  maxMembers?: number;
  payoutSequence?: string;
  onRefresh?: () => void;
}

export interface GroupRotationSlotsProps {
  maxMembers: number;
  membershipsCount: number;
  memberships?: Membership[];
}

export interface GroupStatsGridProps {
  contributionAmount: number;
  maxMembers: number;
  cycleDuration: number;
  billingCycle: string;
  membershipsCount: number;
  totalPayout: number;
  totalRounds: number;
}

export interface DeleteGroupDialogProps {
  isDeleting: boolean;
  isStarting?: boolean;
  onDelete: () => void;
  groupName?: string;
}

export interface GroupAnnouncementDialogProps {
  groupId: string;
}

export interface GroupInfoCardProps {
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  totalDays: number;
  billingCycle: string;
  payoutSequence: string;
  organizerId: string;
  organizerName?: string;
  organizerContact?: string;
  isOrganizer?: boolean;
  hasStarted?: boolean;
  onStartCycle?: () => void;
  isStarting?: boolean;
  isMembersFull?: boolean;
  onDeleteGroup?: () => void;
  isDeleting?: boolean;
  membershipsCount?: number;
  isCycleDone?: boolean;
  allowedMethods?: string[];
  paymentDetails?: string | null;
  gracePeriodDays?: number;
  latePenaltyAmount?: number;
}

export interface GroupPayoutProgressProps {
  groupId?: string;
  memberships?: Membership[];
  maxMembers: number;
  contributionAmount: number;
  startDate?: string | Date | null;
  billingCycle: string;
  currentCycle?: number;
  cycleDuration?: number;
  isCycleDone?: boolean;
}

export interface UnstartedCyclePreparationGuideProps {
  isOrganizer: boolean;
  membershipsCount: number;
  maxMembers: number;
  inviteCode?: string;
  copied: boolean;
  onCopyInviteCode: () => void;
  payoutSequence: string;
  contributionAmount: number;
  billingCycle: string;
}

export interface GroupHeroInviteCodeCardProps {
  inviteCode?: string | null;
  copied: boolean;
  onCopyInviteCode: () => void;
}

export interface CreateGroupPreviewProps {
  watchedFields: CreateGroupInput;
  totalPayout: number;
  totalRounds: number;
  totalDays: number;
}

export interface CycleCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupName: string;
  totalPayout: number;
  membersCount: number;
  cycleDuration: number;
}

export interface EditGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  initialData: {
    name: string;
    description?: string | null;
    contributionAmount: number;
    maxMembers: number;
    gracePeriodDays?: number;
    latePenaltyAmount?: number;
    allowedPaymentMethods?: string[];
    paymentDetails?: string | null;
    billingCycle: string;
    payoutSequence: string;
  };
  onSuccess?: () => void;
}

export interface JoinGroupProps {
  onClick: () => void;
}

export interface PayoutSequenceSelectorProps {
  selectedSequence: string;
  isPending: boolean;
  onSelectSequence: (sequence: "RANDOM" | "MANUAL" | "FREECHOOSING") => void;
}

export interface CreateGroupFormFieldsProps {
  register: UseFormRegister<CreateGroupInput>;
  errors: FieldErrors<CreateGroupInput>;
  isPending: boolean;
  billingCycle: string;
  onSelectBillingCycle: (cycle: string) => void;
  payoutSequence: string;
  onSelectPayoutSequence: (seq: "RANDOM" | "MANUAL" | "FREECHOOSING") => void;
  control: Control<CreateGroupInput>;
  setValue: UseFormSetValue<CreateGroupInput>;
  watch: UseFormWatch<CreateGroupInput>;
}
