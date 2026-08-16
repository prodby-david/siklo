"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Wallet, ArrowRight } from "lucide-react";
import { PaymentSetupGateModalProps } from "../../types/payment.types";

export default function PaymentSetupGateModal({
  isOpen,
  onClose,
  onConfirm,
}: PaymentSetupGateModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 shadow-xs">
            <Wallet className="w-6 h-6" />
          </div>

          <DialogHeader>
            <DialogTitle className="text-base font-bold text-foreground text-center">
              Payment Method Required
            </DialogTitle>
            <DialogDescription>
              <span className="text-xs text-neutral-subtext block text-center mt-1.5 leading-relaxed">
                Before you can pay your contribution, please set up your preferred payment method in your profile settings.
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
              <span>Go to Settings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
