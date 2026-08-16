"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { CreditCard, Receipt } from "lucide-react";
import { toast } from "sonner";
import { submitPayment } from "../../api/submitPayment";
import { paymentSubmissionSchema } from "../../validator/payment-submission.validator";
import {
  PaymentSubmissionInput,
  PaymentSubmissionModalProps,
} from "../../types/payment.types";
import {
  calculateEffectiveDeadline,
  calculateDaysOverdue,
  calculateLatePenalty,
} from "../../utils/payment.helper";
import { getApiErrorMessage } from "../../utils/error.helper";
import PaymentMethodSelector from "../elements/PaymentMethodSelector";
import PaymentAccountDetailsCopyBox from "../elements/PaymentAccountDetailsCopyBox";
import PaymentReceiptUploader from "../elements/PaymentReceiptUploader";
import PaymentSummaryBreakdown from "../elements/PaymentSummaryBreakdown";
import PaymentErrorAlert from "../elements/PaymentErrorAlert";

export default function PaymentSubmissionModal({
  isOpen,
  onClose,
  groupId,
  roundId,
  cycleNumber,
  turnNumber,
  baseAmount,
  targetDueDate,
  gracePeriodDays = 0,
  latePenaltyRate = 0,
  allowedMethods,
  organizerPaymentDetails,
  onSuccess,
}: PaymentSubmissionModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [currentTimestamp] = useState(() => Date.now());

  const effectiveDeadline = calculateEffectiveDeadline(
    targetDueDate,
    gracePeriodDays,
  );
  const daysOverdue = calculateDaysOverdue(
    effectiveDeadline,
    currentTimestamp,
  );
  const lateFee = calculateLatePenalty(
    baseAmount,
    latePenaltyRate,
    daysOverdue,
  );
  const totalAmount = baseAmount + lateFee;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PaymentSubmissionInput>({
    resolver: zodResolver(paymentSubmissionSchema),
    defaultValues: {
      paymentMethod: allowedMethods[0] || "E_WALLET",
      referenceNumber: "",
      proofUrl: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSubmissionError("Receipt image size must be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      setValue("proofUrl", result, { shouldValidate: true });
      setSubmissionError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setPreviewImage(null);
    setValue("proofUrl", "", { shouldValidate: true });
  };

  const onSubmit = async (data: PaymentSubmissionInput) => {
    setSubmissionError(null);
    try {
      await submitPayment({
        groupId,
        roundId: roundId && roundId !== "current" ? roundId : undefined,
        cycleNumber,
        turnNumber,
        paymentMethod: data.paymentMethod,
        referenceNumber: data.referenceNumber?.trim() || undefined,
        proofUrl: data.proofUrl || undefined,
      });

      toast.success("Payment proof submitted! Awaiting organizer verification.");
      reset();
      setPreviewImage(null);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: unknown) {
      const errorText = getApiErrorMessage(
        err,
        "Failed to submit payment. Please try again.",
      );
      setSubmissionError(errorText);
      toast.error(errorText);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto no-scrollbar">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
              <CreditCard className="w-5 h-5 text-brand-accent" />
              <span>Pay Contribution</span>
            </DialogTitle>
            <DialogDescription>
              <span className="text-xs text-neutral-subtext block">
                Submit your contribution payment proof for verification.
              </span>
            </DialogDescription>
          </DialogHeader>

          <PaymentSummaryBreakdown
            baseAmount={baseAmount}
            lateFee={lateFee}
            totalAmount={totalAmount}
          />

          <Controller
            name="paymentMethod"
            control={control}
            render={({ field }) => (
              <PaymentMethodSelector
                allowedMethods={allowedMethods}
                selectedMethod={field.value}
                onSelectMethod={(method) => field.onChange(method)}
              />
            )}
          />

          <PaymentAccountDetailsCopyBox details={organizerPaymentDetails} />

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-brand-accent" />
              <span>Transaction Reference Number</span>
            </label>
            <input
              type="text"
              {...register("referenceNumber")}
              placeholder="e.g. GCash Ref #123456789 or Bank Ref"
              className={`w-full text-xs p-2.5 rounded-xl border bg-background text-foreground focus:outline-none ${
                errors.referenceNumber
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-neutral-border focus:border-brand-accent"
              }`}
            />
            {errors.referenceNumber && (
              <p className="text-[11px] text-rose-500 font-semibold">
                {errors.referenceNumber.message}
              </p>
            )}
          </div>

          <PaymentReceiptUploader
            previewImage={previewImage}
            onImageChange={handleImageChange}
            onClearImage={handleClearImage}
          />

          <PaymentErrorAlert message={submissionError} />

          <div className="flex gap-2 pt-2 border-t border-neutral-border/60">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-xs py-2.5 rounded-2xl border border-neutral-border bg-background hover:bg-neutral-subtext/5 text-foreground font-semibold cursor-pointer transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 text-xs bg-brand-accent hover:bg-brand-accent-hover text-white py-2.5 rounded-2xl font-bold shadow-sm cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Payment"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
