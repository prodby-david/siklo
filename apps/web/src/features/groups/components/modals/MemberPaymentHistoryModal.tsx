"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Receipt, CreditCard } from "lucide-react";
import type { MemberPaymentHistoryModalProps } from "@/features/groups/types/showcase.types";
import MemberPaymentHistoryItem from "./elements/MemberPaymentHistoryItem";
import ReceiptImagePreviewModal from "@/features/payments/components/modals/ReceiptImagePreviewModal";

export default function MemberPaymentHistoryModal({
  isOpen,
  onClose,
  memberName,
  payments,
  rounds = [],
  currentCycle,
  selectedTurn,
}: MemberPaymentHistoryModalProps) {
  const [selectedReceiptUrl, setSelectedReceiptUrl] = useState<string | null>(
    null,
  );

  const getPaymentRoundInfo = (roundId: string) => {
    const round = rounds.find((r) => r.id === roundId);
    return {
      cycleNumber: round?.cycleNumber ?? currentCycle,
      roundNumber: round?.roundNumber ?? selectedTurn,
    };
  };

  const totalCompletedAmount = payments
    .filter((payment) => payment.status === "VERIFIED")
    .reduce(
      (total, payment) => total + Number(payment.totalAmount || 0),
      0,
    );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-lg max-h-[90dvh] flex flex-col p-0 gap-0 overflow-hidden rounded-3xl border border-neutral-border">
        <div className="p-4 sm:p-6 border-b border-neutral-border/80 bg-card">
          <DialogHeader className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-brand-accent/15 text-brand-accent border border-brand-accent/25">
                <Receipt className="w-4 h-4" />
              </div>
              <DialogTitle className="text-base sm:text-lg font-extrabold text-foreground">
                Payment History
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-neutral-subtext">
              Ledger transactions for <strong className="text-foreground">{memberName}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-4 pt-3 border-t border-neutral-border/60">
            <div className="p-2.5 rounded-2xl bg-neutral-table-stripe/40 border border-neutral-border/70">
              <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider block">
                Total Payments
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-foreground">
                {payments.length} {payments.length === 1 ? "Record" : "Records"}
              </span>
            </div>
            <div className="p-2.5 rounded-2xl bg-neutral-table-stripe/40 border border-neutral-border/70">
              <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider block">
                Completed Total
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-brand-accent">
                ₱{totalCompletedAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto max-h-[55dvh] flex-1 space-y-3">
          {payments.length > 0 ? (
            payments.map((p) => (
              <MemberPaymentHistoryItem
                key={p.id}
                payment={p}
                roundInfo={getPaymentRoundInfo(p.roundId)}
                onViewReceipt={setSelectedReceiptUrl}
              />
            ))
          ) : (
            <div className="py-12 px-4 rounded-2xl border border-dashed border-neutral-border text-center flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-neutral-subtext/10 flex items-center justify-center text-neutral-subtext">
                <CreditCard className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-foreground">No Payment History</p>
              <p className="text-[11px] text-neutral-subtext max-w-xs leading-relaxed">
                No payment contributions have been recorded for {memberName} yet.
              </p>
            </div>
          )}
        </div>

        <div className="p-3.5 sm:p-4 border-t border-neutral-border/70 bg-card flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 sm:py-2 rounded-2xl border border-neutral-border bg-card hover:bg-neutral-table-stripe text-xs font-bold text-foreground transition-all cursor-pointer active:scale-95 shadow-2xs"
          >
            Close
          </button>
        </div>
        </DialogContent>
      </Dialog>

      <ReceiptImagePreviewModal
        isOpen={Boolean(selectedReceiptUrl)}
        onClose={() => setSelectedReceiptUrl(null)}
        imageUrl={selectedReceiptUrl}
        title={`${memberName}'s Payment Receipt`}
      />
    </>
  );
}
