"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { BillingCycle, PayoutSequence } from "@siklo/shared-schemas";
import { updateGroup } from "../api/updateGroup";
import type {
  EditGroupFormField,
  EditGroupFormValues,
} from "../types/edit-group.types";
import type {
  EditGroupModalProps,
  PaymentMethodKey,
} from "../types/group.types";

const DEFAULT_PAYMENT_METHODS: PaymentMethodKey[] = [
  "E_WALLET",
  "BANK_TRANSFER",
  "CASH",
];

type UseEditGroupFormOptions = Pick<
  EditGroupModalProps,
  "groupId" | "initialData" | "onClose" | "onSuccess"
>;

export default function useEditGroupForm({
  groupId,
  initialData,
  onClose,
  onSuccess,
}: UseEditGroupFormOptions) {
  const [values, setValues] = useState<EditGroupFormValues>({
    name: initialData.name || "",
    description: initialData.description || "",
    contributionAmount: initialData.contributionAmount || 1000,
    maxMembers: initialData.maxMembers || 6,
    gracePeriodDays: initialData.gracePeriodDays ?? 0,
    latePenaltyAmount: initialData.latePenaltyAmount ?? 0,
    allowedPaymentMethods:
      (initialData.allowedPaymentMethods as PaymentMethodKey[]) ||
      DEFAULT_PAYMENT_METHODS,
    paymentDetails: initialData.paymentDetails || "",
    billingCycle: (initialData.billingCycle as BillingCycle) || "MONTHLY",
    payoutSequence:
      (initialData.payoutSequence as PayoutSequence) || "MANUAL",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const setValue = <Field extends EditGroupFormField>(
    field: Field,
    value: EditGroupFormValues[Field],
  ) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
  };

  const togglePaymentMethod = (method: PaymentMethodKey) => {
    const isSelected = values.allowedPaymentMethods.includes(method);
    if (isSelected && values.allowedPaymentMethods.length === 1) return;

    setValue(
      "allowedPaymentMethods",
      isSelected
        ? values.allowedPaymentMethods.filter(
            (selectedMethod) => selectedMethod !== method,
          )
        : [...values.allowedPaymentMethods, method],
    );
  };

  const validateValues = () => {
    if (!values.name.trim() || values.name.trim().length < 3) {
      return "Group name must be at least 3 characters long";
    }
    if (values.contributionAmount < 50 || values.contributionAmount > 10000) {
      return "Contribution amount must be between ₱50 and ₱10,000";
    }
    if (values.maxMembers < 3 || values.maxMembers > 15) {
      return "Member capacity must be between 3 and 15 members";
    }
    if (values.allowedPaymentMethods.length === 0) {
      return "Please select at least 1 allowed payment method";
    }
    return "";
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    const validationMessage = validateValues();
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      await updateGroup(groupId, {
        name: values.name.trim(),
        description: values.description.trim() || undefined,
        contributionAmount: values.contributionAmount,
        maxMembers: values.maxMembers,
        gracePeriodDays: values.gracePeriodDays,
        latePenaltyAmount: values.latePenaltyAmount,
        allowedPaymentMethods: values.allowedPaymentMethods,
        paymentDetails: values.paymentDetails.trim() || undefined,
        billingCycle: values.billingCycle,
        payoutSequence: values.payoutSequence,
      });

      onSuccess?.();
      onClose();
    } catch (error: unknown) {
      const responseMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      setErrorMessage(
        responseMessage ||
          "Failed to update group settings. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    setValue,
    togglePaymentMethod,
    handleSubmit,
    isSubmitting,
    errorMessage,
  };
}
