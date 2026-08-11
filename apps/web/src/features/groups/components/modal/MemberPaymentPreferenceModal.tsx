"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Wallet, Building2, Banknote, Check, AlertCircle } from "lucide-react";
import { api } from "@/shared/lib/axios";

interface MemberPaymentPreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  allowedMethods: ("E_WALLET" | "BANK_TRANSFER" | "CASH")[];
  initialMethod?: "E_WALLET" | "BANK_TRANSFER" | "CASH" | null;
  initialDetails?: string | null;
  onSuccess?: () => void;
}

export default function MemberPaymentPreferenceModal({
  isOpen,
  onClose,
  groupId,
  allowedMethods,
  initialMethod,
  initialDetails,
  onSuccess,
}: MemberPaymentPreferenceModalProps) {
  const [preferredMethod, setPreferredMethod] = useState<
    "E_WALLET" | "BANK_TRANSFER" | "CASH"
  >(initialMethod || allowedMethods[0] || "E_WALLET");
  const [accountDetails, setAccountDetails] = useState(initialDetails || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const methodMeta: Record<
    "E_WALLET" | "BANK_TRANSFER" | "CASH",
    { label: string; icon: typeof Wallet }
  > = {
    E_WALLET: { label: "E-Wallet", icon: Wallet },
    BANK_TRANSFER: { label: "Bank Transfer", icon: Building2 },
    CASH: { label: "Cash on Hand", icon: Banknote },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (preferredMethod !== "CASH" && !accountDetails.trim()) {
      setErrorMessage("Please enter your receiving account details.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await api.patch(`/groups/${groupId}/members/payment-preference`, {
        preferredPaymentMethod: preferredMethod,
        paymentAccountDetails: accountDetails.trim() || "Cash In-Person",
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      setErrorMessage(
        msg || "Failed to update payout receiving preference."
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
            <DialogTitle className="text-lg font-extrabold flex items-center gap-2 text-foreground">
              <Wallet className="w-5 h-5 text-brand-accent" />
              <span>Payout Receiving Preference</span>
            </DialogTitle>
            <DialogDescription>
              <span className="text-xs text-neutral-subtext block">
                Choose how you wish to receive your payout pool when your turn arrives.
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Preferred Receiving Method
            </label>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {allowedMethods.map((method) => {
                const meta = methodMeta[method];
                const IconComp = meta.icon;
                const isSelected = preferredMethod === method;
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPreferredMethod(method)}
                    className={`relative py-3 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isSelected
                        ? "bg-brand-accent text-white border-brand-accent shadow-xs"
                        : "bg-background border-neutral-border text-neutral-subtext hover:border-neutral-border"
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5 shrink-0" />
                    <span>{meta.label}</span>
                    {isSelected && (
                      <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 bg-emerald-500 text-white rounded-full border-2 border-background shadow-xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {preferredMethod !== "CASH" && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                Receiving Account Details <span className="text-danger">*</span>
              </label>
              <textarea
                rows={3}
                placeholder={
                  preferredMethod === "E_WALLET"
                    ? "e.g. GCash: 09171234567 - Maria Santos"
                    : "e.g. BDO Savings: 1234567890 - Maria Santos"
                }
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-neutral-border bg-background text-foreground focus:outline-none focus:border-brand-accent resize-none leading-relaxed"
              />
            </div>
          )}

          {errorMessage && (
            <p className="text-xs text-danger font-semibold bg-danger/10 p-3 rounded-xl border border-danger/20 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </p>
          )}

          <div className="pt-2 flex justify-end gap-2 border-t border-neutral-border/60">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl border border-neutral-border hover:bg-neutral-subtext/5 text-xs font-bold text-foreground cursor-pointer transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-2xl bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-extrabold cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Saving Preference..." : "Save Receiving Details"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
