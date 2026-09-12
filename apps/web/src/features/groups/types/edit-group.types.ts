import type { BillingCycle, PayoutSequence } from "@siklo/shared-schemas";
import type { PaymentMethodKey } from "./group.types";

export interface EditGroupFormValues {
  name: string;
  description: string;
  contributionAmount: number;
  maxMembers: number;
  gracePeriodDays: number;
  latePenaltyAmount: number;
  allowedPaymentMethods: PaymentMethodKey[];
  paymentDetails: string;
  billingCycle: BillingCycle;
  payoutSequence: PayoutSequence;
}

export type EditGroupFormField = keyof EditGroupFormValues;

export interface EditGroupScheduleFieldsProps {
  billingCycle: BillingCycle;
  payoutSequence: PayoutSequence;
  isSubmitting: boolean;
  onBillingCycleChange: (cycle: BillingCycle) => void;
  onPayoutSequenceChange: (sequence: PayoutSequence) => void;
}

export interface EditGroupBasicsFieldsProps {
  values: EditGroupFormValues;
  isSubmitting: boolean;
  onChange: <Field extends EditGroupFormField>(
    field: Field,
    value: EditGroupFormValues[Field],
  ) => void;
}

export interface EditGroupPaymentFieldsProps {
  allowedMethods: PaymentMethodKey[];
  paymentDetails: string;
  isSubmitting: boolean;
  onToggleMethod: (method: PaymentMethodKey) => void;
  onPaymentDetailsChange: (value: string) => void;
}
