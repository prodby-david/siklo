"use client";

import { useState } from "react";
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
import { rejectPaymentSchema, type RejectPaymentDTO } from "@siklo/shared-schemas";
import type { PaymentRejectionReasonModalProps } from "../../types/payment.types";
import PaymentReceiptUploader from "../elements/PaymentReceiptUploader";
import PaymentErrorAlert from "../elements/PaymentErrorAlert";
import Loader from "@/shared/components/loader/Loader";
import useRejectPayment from "../../hooks/useRejectPayment";
import useReceiptImageUpload from "../../hooks/useReceiptImageUpload";

export default function PaymentRejectionReasonModal({
  isOpen,
  onClose,
  paymentId,
  memberName,
  onSuccess,
}: PaymentRejectionReasonModalProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { reject, isRejecting } = useRejectPayment();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RejectPaymentDTO>({
    resolver: zodResolver(rejectPaymentSchema),
    defaultValues: {
      rejectionReason: "",
      rejectionProofUrl: "",
    },
  });

  const {
    previewImage,
    handleImageUpload,
    handleClearImage,
  } = useReceiptImageUpload({
    onImageSet: (base64Url) => setValue("rejectionProofUrl", base64Url),
    onImageClear: () => setValue("rejectionProofUrl", ""),
  });

  const onSubmit = async (data: RejectPaymentDTO) => {
    setErrorMessage(null);
    try {
      await reject({
        paymentId,
        data: {
          rejectionReason: data.rejectionReason.trim(),
          rejectionProofUrl: data.rejectionProofUrl?.trim() || undefined,
        },
      });

      reset();
      handleClearImage();
      await onSuccess?.();
      onClose();
    } catch {
      setErrorMessage("Failed to reject payment. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto no-scrollbar">
        {isRejecting && <Loader text="Rejecting payment..." />}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold text-danger">
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
              Rejection Reason <span className="text-danger">*</span>
            </label>
            <textarea
              rows={3}
              {...register("rejectionReason")}
              placeholder="e.g. Reference number does not match receipt screenshot or transaction statement."
              className={`w-full text-xs p-2.5 rounded-xl border bg-background text-foreground focus:outline-none ${
                errors.rejectionReason
                  ? "border-danger-border focus:border-danger"
                  : "border-neutral-border focus:border-danger"
              }`}
            />
            {errors.rejectionReason && (
              <p className="text-[11px] font-semibold text-danger">
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
              disabled={isRejecting}
              className="flex-1 cursor-pointer rounded-2xl bg-danger py-2.5 text-xs font-bold text-brand-accent-foreground transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
            >
              {isRejecting ? "Rejecting..." : "Confirm Rejection"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
