"use client";

import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Check, UserX, Users, FileImage } from "lucide-react";
import { ReceiptImagePreviewModalProps } from "../../types/payment.types";

export default function ReceiptImagePreviewModal({
  isOpen,
  onClose,
  imageUrl,
  title = "Payment Receipt Verification",
  payment,
  onApprove,
  onReject,
  isProcessing = false,
}: ReceiptImagePreviewModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[92vh] p-5 flex flex-col gap-3">
        <DialogHeader className="w-full pb-2.5 border-b border-neutral-border/60">
          <div className="flex items-center justify-between gap-2 pr-6">
            <DialogTitle className="text-sm font-extrabold text-foreground">
              {title}
            </DialogTitle>
            {payment?.group && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-subtext bg-neutral-table-stripe px-2 py-0.5 rounded-full border border-neutral-border/60">
                <Users className="w-3 h-3 text-brand-accent" />
                <span>{payment.group.name}</span>
              </span>
            )}
          </div>
        </DialogHeader>

        {payment && (
          <div className="p-3 rounded-2xl border border-brand-accent/20 bg-brand-accent/5 flex flex-wrap items-center justify-between gap-2.5 text-xs">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-foreground">
                  {payment.user?.name || "Member"}
                </span>
                <span className="text-[10px] font-bold text-brand-accent bg-brand-accent/15 px-2 py-0.5 rounded-full">
                  Turn #{payment.round?.roundNumber || 1}
                </span>
                <span className="text-[10px] font-bold text-neutral-subtext">
                  {payment.paymentMethod}
                </span>
              </div>
              {payment.referenceNumber && (
                <span className="text-[11px] text-neutral-subtext">
                  Ref: <strong className="text-foreground">{payment.referenceNumber}</strong>
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-[10px] text-neutral-subtext font-semibold uppercase">Total:</span>
              <span className="text-base font-black text-foreground">
                ₱{payment.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        <div className="relative w-full h-[52vh] max-h-[460px] rounded-2xl overflow-hidden bg-neutral-subtext/5 flex items-center justify-center border border-neutral-border/60">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Receipt Proof"
              fill
              sizes="(max-width: 672px) 100vw, 672px"
              className="object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-neutral-subtext">
              <FileImage className="w-8 h-8 opacity-40" />
              <span className="text-xs font-semibold">No Receipt Image Uploaded</span>
            </div>
          )}
        </div>

        {payment && (onApprove || onReject) && (
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-neutral-border/60">
            {onReject && (
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => {
                  onClose();
                  onReject(payment.id, payment.user?.name || "Member");
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-xs font-bold transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <UserX className="w-3.5 h-3.5" />
                <span>Reject</span>
              </button>
            )}

            {onApprove && (
              <button
                type="button"
                disabled={isProcessing}
                onClick={async () => {
                  await onApprove(payment.id);
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs disabled:opacity-50"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isProcessing ? "Approving..." : "Approve Payment"}</span>
              </button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
