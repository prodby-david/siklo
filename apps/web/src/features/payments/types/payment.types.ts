import { LucideIcon } from "lucide-react";
import React from "react";

export type PaymentMethod = "E_WALLET" | "BANK_TRANSFER" | "CASH";

export interface PaymentMethodMeta {
  label: string;
  icon: LucideIcon;
}

export type { PaymentSubmissionInput } from "../validator/payment-submission.validator";

export interface IncomingPaymentItem {
  id: string;
  groupId: string;
  userId: string;
  paymentMethod: PaymentMethod;
  baseAmount: number;
  penaltyAmount: number;
  totalAmount: number;
  referenceNumber?: string | null;
  proofUrl?: string | null;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  round?: {
    roundNumber: number;
    cycleNumber?: number;
  };
  group?: {
    id: string;
    name: string;
  };
}

export interface PaymentLatePenaltyRowProps {
  lateFee: number;
}

export interface PaymentErrorAlertProps {
  message?: string | null;
}

export interface PaymentSummaryBreakdownProps {
  baseAmount: number;
  lateFee: number;
  organizerFee?: number;
  totalAmount: number;
}

export interface PaymentAccountDetailsCopyBoxProps {
  details?: string | null;
}

export interface PaymentMethodSelectorProps {
  allowedMethods: PaymentMethod[];
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
}

export interface PaymentReceiptUploaderProps {
  previewImage: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearImage: () => void;
  label?: string;
  isRejection?: boolean;
}

export interface PaymentSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  roundId: string;
  baseAmount: number;
  organizerFeeAmount?: number;
  isOrganizer?: boolean;
  hasAlreadyPaidOrganizerFee?: boolean;
  targetDueDate?: Date | string | null;
  gracePeriodDays?: number;
  latePenaltyRate?: number;
  allowedMethods: PaymentMethod[];
  organizerPaymentDetails?: string | null;
  onSuccess?: () => void;
}

export interface PaymentRejectionReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string;
  memberName: string;
  onSuccess?: () => void;
}

export interface ReceiptImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  title?: string;
  payment?: IncomingPaymentItem | null;
  onApprove?: (paymentId: string) => Promise<void>;
  onReject?: (paymentId: string, memberName: string) => void;
  isProcessing?: boolean;
}

export interface IncomingPaymentsVerificationSectionProps {
  groupId?: string;
  isOrganizer?: boolean;
  onRefreshGroup?: () => void;
}
