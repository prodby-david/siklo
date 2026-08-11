"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { CreditCard, AlertTriangle, Wallet, Building2, Banknote, Check } from "lucide-react";
import { api } from "@/shared/lib/axios";

interface PaymentSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  roundId: string;
  baseAmount: number;
  lateFee: number;
  backupFundAmount: number;
  allowedMethods: ("E_WALLET" | "BANK_TRANSFER" | "CASH")[];
  organizerPaymentDetails?: string | null;
  onSuccess?: () => void;
}

export default function PaymentSubmissionModal({
  isOpen,
  onClose,
  groupId,
  roundId,
  baseAmount,
  lateFee,
  backupFundAmount,
  allowedMethods,
  organizerPaymentDetails,
  onSuccess,
}: PaymentSubmissionModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<
    "E_WALLET" | "BANK_TRANSFER" | "CASH"
  >(allowedMethods[0] || "E_WALLET");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [proofUrl, setProofUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const totalAmount = baseAmount + lateFee + backupFundAmount;

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
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await api.post("/groups/payments/submit", {
        groupId,
        roundId,
        paymentMethod: selectedMethod,
        referenceNumber: referenceNumber || undefined,
        proofUrl: proofUrl || undefined,
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      setErrorMessage(
        msg || "Failed to submit payment proof. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-extrabold flex items-center gap-2 text-foreground">
              <CreditCard className="w-5 h-5 text-brand-accent" />
              <span>Pay Contribution</span>
            </DialogTitle>
            <DialogDescription>
              <span className="text-xs text-neutral-subtext block">
                Select your payment method, enter reference details, and attach receipt image proof.
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 rounded-2xl bg-neutral-subtext/5 border border-neutral-border/60 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-subtext">Base Contribution:</span>
              <span className="font-bold text-foreground">₱{baseAmount.toLocaleString()}</span>
            </div>
            {lateFee > 0 && (
              <div className="flex justify-between items-center text-xs text-amber-600 dark:text-amber-400 font-semibold">
                <span>Daily Late Penalty:</span>
                <span>+₱{lateFee.toLocaleString()}</span>
              </div>
            )}
            {backupFundAmount > 0 && (
              <div className="flex justify-between items-center text-xs text-brand-accent font-semibold">
                <span>Backup Reserve Fee:</span>
                <span>+₱{backupFundAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm font-extrabold border-t border-neutral-border/50 pt-2">
              <span>Total Payable Amount:</span>
              <span className="text-brand-accent">₱{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">Payment Method</label>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {allowedMethods.map((method) => {
                const meta = methodMeta[method];
                const IconComp = meta.icon;
                const isSelected = selectedMethod === method;
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setSelectedMethod(method)}
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

          {organizerPaymentDetails && selectedMethod !== "CASH" && (
            <div className="p-3 rounded-xl bg-brand-accent/5 border border-brand-accent/20 text-xs space-y-1">
              <span className="font-bold text-brand-accent block">
                Organizer Payment Account Details:
              </span>
              <p className="text-neutral-subtext font-mono whitespace-pre-line leading-relaxed">
                {organizerPaymentDetails}
              </p>
            </div>
          )}

          {selectedMethod !== "CASH" && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                Transaction Reference Number (Optional)
              </label>
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="e.g. GCash Ref #123456789"
                className="w-full text-xs p-3 rounded-xl border border-neutral-border bg-background text-foreground focus:outline-none focus:border-brand-accent"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Receipt / Proof Image URL (Optional)
            </label>
            <input
              type="text"
              value={proofUrl}
              onChange={(e) => setProofUrl(e.target.value)}
              placeholder="e.g. https://example.com/receipt-proof.jpg"
              className="w-full text-xs p-3 rounded-xl border border-neutral-border bg-background text-foreground focus:outline-none focus:border-brand-accent"
            />
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="pt-3 flex justify-end gap-2 border-t border-neutral-border/60">
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
              {isSubmitting ? "Submitting..." : "Submit Payment"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
