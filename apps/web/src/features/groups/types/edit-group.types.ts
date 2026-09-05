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
