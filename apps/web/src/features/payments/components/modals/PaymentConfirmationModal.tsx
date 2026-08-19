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
import { Button } from "@/shared/components/ui/button";
import {
  CheckCircle2,
  FileText,
  UserCheck,
  UserX,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import {
  confirmApprovalSchema,
  confirmRejectionSchema,
} from "../../validator/payment-confirmation.validator";
import {
  ConfirmApprovalInput,
  ConfirmRejectionInput,
  PaymentConfirmationModalProps,
} from "../../types/payment.types";
import PaymentReceiptUploader from "../elements/PaymentReceiptUploader";

export default function PaymentConfirmationModal({
  isOpen,
  onClose,
  memberName,
  turnNumber,
  contributionAmount,
  isConfirming,
  isRejecting,
  initialReferenceNumber = "",
  initialProofUrl = "",
  onApprove,
  onReject,
}: PaymentConfirmationModalProps) {
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialProofUrl || null,
  );
  const [rejectionPreviewImage, setRejectionPreviewImage] = useState<
    string | null
  >(null);

  const approvalForm = useForm<ConfirmApprovalInput>({
    resolver: zodResolver(confirmApprovalSchema),
    defaultValues: {
      referenceNumber: initialReferenceNumber,
      proofUrl: initialProofUrl,
    },
  });

  const rejectionForm = useForm<ConfirmRejectionInput>({
    resolver: zodResolver(confirmRejectionSchema),
    defaultValues: {
      reason: "",
      rejectionProofUrl: "",
    },
  });

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    isForRejection = false,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (isForRejection) {
        setRejectionPreviewImage(result);
        rejectionForm.setValue("rejectionProofUrl", result);
      } else {
        setPreviewImage(result);
        approvalForm.setValue("proofUrl", result, { shouldValidate: true });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = (isForRejection = false) => {
    if (isForRejection) {
      setRejectionPreviewImage(null);
      rejectionForm.setValue("rejectionProofUrl", "");
    } else {
      setPreviewImage(null);
      approvalForm.setValue("proofUrl", "", { shouldValidate: true });
    }
  };

  const handleApprovalSubmit = (data: ConfirmApprovalInput) => {
    onApprove({
      referenceNumber: data.referenceNumber?.trim() || undefined,
      proofUrl: data.proofUrl || undefined,
    });
  };

  const handleRejectionSubmit = (data: ConfirmRejectionInput) => {
    onReject({
      reason: data.reason.trim(),
      rejectionProofUrl: data.rejectionProofUrl?.trim() || undefined,
    });
  };

  const handleClose = () => {
    setShowRejectReason(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
              {showRejectReason ? (
                <>
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <span>Reject Payment</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-5 h-5 text-brand-accent" />
                  <span>Verify & Mark Payment</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              <span className="text-xs text-neutral-subtext block">
                {showRejectReason
                  ? `Provide reasons for rejecting ${memberName}'s payment.`
                  : `Verify in-person cash handover and attach proof for ${memberName} (Turn #${turnNumber}).`}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="p-3 bg-neutral-table-stripe/60 dark:bg-neutral-table-stripe/30 rounded-2xl border border-neutral-border/60 flex items-center justify-between text-xs">
            <span className="text-neutral-subtext">Member Turn & Amount:</span>
            <span className="font-bold text-foreground">
              Turn #{turnNumber} • ₱{contributionAmount.toLocaleString()}
            </span>
          </div>

          {!showRejectReason ? (
            <form
              onSubmit={approvalForm.handleSubmit(handleApprovalSubmit)}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Notes / Remarks (Optional)</span>
                </label>
                <input
                  type="text"
                  {...approvalForm.register("referenceNumber")}
                  placeholder="e.g. In-person cash collection, physical receipt acknowledgment"
                  className={`w-full text-xs p-2.5 rounded-xl border bg-background text-foreground focus:outline-none ${
                    approvalForm.formState.errors.referenceNumber
                      ? "border-rose-500 focus:border-rose-500"
                      : "border-neutral-border focus:border-brand-accent"
                  }`}
                />
                {approvalForm.formState.errors.referenceNumber && (
                  <p className="text-[11px] text-rose-500 font-semibold">
                    {approvalForm.formState.errors.referenceNumber.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <PaymentReceiptUploader
                  previewImage={previewImage}
                  onImageChange={(e) => handleImageUpload(e, false)}
                  onClearImage={() => handleClearImage(false)}
                  label="Cash Handover Proof / Receipt Image *"
                />
                {approvalForm.formState.errors.proofUrl && (
                  <p className="text-[11px] text-rose-500 font-semibold">
                    {approvalForm.formState.errors.proofUrl.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowRejectReason(true)}
                  disabled={isConfirming || isRejecting}
                  className="w-full rounded-2xl py-2.5 border-danger/30 text-danger hover:bg-danger/10 text-xs font-bold cursor-pointer"
                >
                  <UserX className="w-4 h-4 mr-1.5" />
                  Reject Payment
                </Button>

                <Button
                  type="submit"
                  disabled={isConfirming || isRejecting}
                  className="w-full rounded-2xl py-2.5 bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold shadow-sm cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  {isConfirming ? "Approving..." : "Approve & Mark Paid"}
                </Button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={rejectionForm.handleSubmit(handleRejectionSubmit)}
              className="space-y-4 pt-1 border-t border-neutral-border/60"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground block">
                  Rejection Reason <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  {...rejectionForm.register("reason")}
                  placeholder="e.g. Reference number not found, incorrect amount, or invalid screenshot"
                  className={`w-full text-xs p-2.5 rounded-xl border bg-background text-foreground focus:outline-none ${
                    rejectionForm.formState.errors.reason
                      ? "border-rose-500 focus:border-rose-500"
                      : "border-neutral-border focus:border-rose-500"
                  }`}
                />
                {rejectionForm.formState.errors.reason && (
                  <p className="text-[11px] text-rose-500 font-semibold">
                    {rejectionForm.formState.errors.reason.message}
                  </p>
                )}
              </div>

              <PaymentReceiptUploader
                previewImage={rejectionPreviewImage}
                onImageChange={(e) => handleImageUpload(e, true)}
                onClearImage={() => handleClearImage(true)}
                label="Organizer Rejection Proof Image (Optional)"
                isRejection={true}
              />

              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-amber-700 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Rejecting will keep this member unpaid for this turn and send a notification with your stated reason.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowRejectReason(false)}
                  disabled={isConfirming || isRejecting}
                  className="w-full rounded-2xl py-2.5 border-neutral-border text-foreground hover:bg-neutral-subtext/5 text-xs font-semibold cursor-pointer"
                >
                  Back to Approval
                </Button>

                <Button
                  type="submit"
                  disabled={isConfirming || isRejecting}
                  className="w-full rounded-2xl py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm cursor-pointer"
                >
                  <XCircle className="w-4 h-4 mr-1.5" />
                  {isRejecting ? "Rejecting..." : "Confirm Rejection"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
