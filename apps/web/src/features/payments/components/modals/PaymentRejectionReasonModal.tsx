"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { XCircle } from "lucide-react";
import { toast } from "sonner";
import { rejectPayment } from "../../api/rejectPayment";
import { rejectPaymentSchema } from "../../validator/payment-confirmation.validator";
import {
  PaymentRejectionInput,
  PaymentRejectionReasonModalProps,
} from "../../types/payment.types";
import { getApiErrorMessage } from "../../utils/error.helper";
import PaymentReceiptUploader from "../elements/PaymentReceiptUploader";
import PaymentErrorAlert from "../elements/PaymentErrorAlert";

export default function PaymentRejectionReasonModal({
  isOpen,
  onClose,
  paymentId,
  memberName,
  onSuccess,
}: PaymentRejectionReasonModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PaymentRejectionInput>({
    resolver: zodResolver(rejectPaymentSchema),
    defaultValues: {
      rejectionReason: "",
      rejectionProofUrl: "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Proof image size must be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      setValue("rejectionProofUrl", result);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setPreviewImage(null);
    setValue("rejectionProofUrl", "");
  };

  const onSubmit = async (data: PaymentRejectionInput) => {
    setErrorMessage(null);
    try {
      await rejectPayment(paymentId, {
        paymentId,
        rejectionReason: data.rejectionReason.trim(),
        rejectionProofUrl: data.rejectionProofUrl?.trim() || undefined,
      });

      toast.info("Payment rejected and member notified.");
      reset();
      setPreviewImage(null);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = getApiErrorMessage(
        err,
        "Failed to reject payment. Please try again.",
      );
      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto no-scrollbar">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <XCircle className="w-5 h-5" />
              <span>Reject Payment Proof</span>
            </DialogTitle>
            <DialogDescription>
              <span className="text-xs text-neutral-subtext block">
                Provide a reason for rejecting <strong className="text-foreground">{memberName}&apos;s</strong> payment.
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Rejection Reason <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              {...register("rejectionReason")}
              placeholder="e.g. Reference number does not match receipt screenshot or transaction statement."
              className={`w-full text-xs p-2.5 rounded-xl border bg-background text-foreground focus:outline-none ${
                errors.rejectionReason
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-neutral-border focus:border-rose-500"
              }`}
            />
            {errors.rejectionReason && (
              <p className="text-[11px] text-rose-500 font-semibold">
                {errors.rejectionReason.message}
              </p>
            )}
          </div>

          <PaymentReceiptUploader
            previewImage={previewImage}
            onImageChange={handleImageUpload}
            onClearImage={handleClearImage}
            label="Organizer Rejection Proof Image (Optional)"
            isRejection={true}
          />

          <PaymentErrorAlert message={errorMessage} />

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
              className="flex-1 text-xs bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-2xl font-bold cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Rejecting..." : "Confirm Rejection"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
