"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Sparkles, ArrowRight } from "lucide-react";
import { PayoutSetupGateModalProps } from "../../types/payment.types";

export default function PayoutSetupGateModal({
  isOpen,
  onClose,
  onConfirm,
}: PayoutSetupGateModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20 shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>

          <DialogHeader>
            <DialogTitle className="text-base font-bold text-foreground text-center">
              Receiving Account Required
            </DialogTitle>
            <DialogDescription>
              <span className="text-xs text-neutral-subtext block text-center mt-1.5 leading-relaxed">
                Before selecting your payout turn, please set up your receiving payment account so the organizer knows where to send your payout pool.
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-2 w-full pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-xs py-2.5 rounded-2xl border border-neutral-border bg-background hover:bg-neutral-subtext/5 text-foreground font-semibold cursor-pointer transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onConfirm();
              }}
              className="flex-1 text-xs bg-brand-accent hover:bg-brand-accent-hover text-white py-2.5 rounded-2xl font-bold shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <span>Set Up Account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
