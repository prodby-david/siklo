"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSubmissionSchema } from "../validator/payment-submission.validator";
import type { PaymentSubmissionInput, PaymentMethod } from "../types/payment.types";
import {
  calculateEffectiveDeadline,
  calculateDaysOverdue,
  calculateLatePenalty,
} from "../utils/payment.helper";
import useSubmitPayment from "./useSubmitPayment";
import { getApiErrorMessage } from "@/shared/utils/error.helper";

interface UsePaymentSubmissionFormOptions {
  roundId: string;
  baseAmount: number;
  organizerFeeAmount?: number;
  isOrganizer?: boolean;
  hasAlreadyPaidOrganizerFee?: boolean;
  targetDueDate?: Date | string | null;
  gracePeriodDays?: number;
  latePenaltyRate?: number;
  allowedMethods: PaymentMethod[];
  onSuccess?: () => void;
  overrideLateFee?: number;
}

export function usePaymentSubmissionForm({
  roundId,
  baseAmount,
  organizerFeeAmount = 0,
  isOrganizer = false,
  hasAlreadyPaidOrganizerFee = false,
  targetDueDate,
  gracePeriodDays = 0,
  latePenaltyRate = 0,
  allowedMethods,
  onSuccess,
  overrideLateFee,
}: UsePaymentSubmissionFormOptions) {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [currentTimestamp] = useState(() => Date.now());

  const isFeeEligible =
    !isOrganizer && !hasAlreadyPaidOrganizerFee && organizerFeeAmount > 0;
  const [payOrganizerFeeNow, setPayOrganizerFeeNow] = useState(true);

  const effectiveDeadline = calculateEffectiveDeadline(
    targetDueDate,
    gracePeriodDays,
  );
  const daysOverdue = calculateDaysOverdue(effectiveDeadline, currentTimestamp);
  const computedLateFee = calculateLatePenalty(
    baseAmount,
    latePenaltyRate,
    daysOverdue,
  );
  const lateFee =
    overrideLateFee !== undefined ? overrideLateFee : computedLateFee;
  const effectiveOrganizerFee =
    isFeeEligible && payOrganizerFeeNow ? organizerFeeAmount : 0;
  const totalAmount = baseAmount + lateFee + effectiveOrganizerFee;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<PaymentSubmissionInput>({
    resolver: zodResolver(paymentSubmissionSchema),
    defaultValues: {
      paymentMethod: allowedMethods[0] || "E_WALLET",
      referenceNumber: "",
      proofUrl: "",
    },
  });

  const selectedPaymentMethod = watch("paymentMethod");
  const { submit, isSubmitting } = useSubmitPayment();

  const handleFormSubmit = async (data: PaymentSubmissionInput) => {
    setSubmissionError(null);
    try {
      await submit({
        roundId,
        paymentMethod: data.paymentMethod,
        referenceNumber:
          data.paymentMethod === "CASH"
            ? undefined
            : data.referenceNumber?.trim() || undefined,
        proofUrl: data.proofUrl || undefined,
        includeOrganizerFee: isFeeEligible ? payOrganizerFeeNow : undefined,
      });
      reset();
      onSuccess?.();
    } catch (err: unknown) {
      setSubmissionError(getApiErrorMessage(err, "Failed to submit payment"));
    }
  };

  return {
    register,
    control,
    setValue,
    errors,
    isSubmitting,
    submissionError,
    setSubmissionError,
    selectedPaymentMethod,
    isFeeEligible,
    payOrganizerFeeNow,
    setPayOrganizerFeeNow,
    lateFee,
    effectiveOrganizerFee,
    totalAmount,
    daysOverdue,
    handleSubmit: handleSubmit(handleFormSubmit),
    reset,
  };
}

export default usePaymentSubmissionForm;
