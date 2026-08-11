"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { XCircle, AlertCircle } from "lucide-react";
import { api } from "@/shared/lib/axios";

interface PaymentRejectionReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string;
  memberName: string;
  onSuccess?: () => void;
}

export default function PaymentRejectionReasonModal({
  isOpen,
  onClose,
  paymentId,
  memberName,
  onSuccess,
}: PaymentRejectionReasonModalProps) {
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionProofUrl, setRejectionProofUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectionReason.trim() || rejectionReason.length < 5) {
      setErrorMessage("Please enter a detailed rejection reason (min 5 chars).");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await api.post(`/groups/payments/${paymentId}/reject`, {
        paymentId,
        rejectionReason: rejectionReason.trim(),
        rejectionProofUrl: rejectionProofUrl.trim() || undefined,
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      setErrorMessage(
        msg || "Failed to reject payment. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <XCircle className="w-5 h-5" />
              <span>Reject Payment Proof</span>
            </DialogTitle>
            <DialogDescription>
              <span className="text-xs text-neutral-subtext block">
                Provide a reason for rejecting <strong className="text-foreground">{memberName}&apos;s</strong> payment so they can rectify and resubmit.
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Rejection Reason <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Reference number does not match receipt screenshot or transaction statement."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-border bg-background text-foreground focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Organizer Rejection Proof Image (Optional)
            </label>
            <input
              type="url"
              placeholder="https://example.com/organizer-proof.jpg"
              value={rejectionProofUrl}
              onChange={(e) => setRejectionProofUrl(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-border bg-background text-foreground focus:outline-none focus:border-brand-accent"
            />
            <span className="text-[10px] text-neutral-subtext block">
              Attach a bank statement or e-wallet screenshot showing non-receipt if needed.
            </span>
          </div>

          {errorMessage && (
            <p className="text-xs text-rose-500 font-semibold bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-xs py-2.5 rounded-2xl border border-neutral-border bg-background hover:bg-neutral-subtext/5 text-foreground font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 text-xs bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-2xl font-bold cursor-pointer transition-all shadow-xs disabled:opacity-50"
            >
              {isSubmitting ? "Rejecting..." : "Confirm Rejection"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
