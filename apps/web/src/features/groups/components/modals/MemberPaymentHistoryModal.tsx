"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import {
  Receipt,
  ShieldCheck,
  Clock,
  AlertCircle,
  CreditCard,
} from "lucide-react";
import formatDate, { formatDateTime12h } from "@/shared/utils/formatDate";
import { MemberPaymentHistoryModalProps } from "@/features/groups/types/showcase.types";

export default function MemberPaymentHistoryModal({
  isOpen,
  onClose,
  memberName,
  payments,
  rounds = [],
  currentCycle,
  selectedTurn,
}: MemberPaymentHistoryModalProps) {
  const getPaymentRoundInfo = (roundId: string) => {
    const round = rounds.find((r) => r.id === roundId);
    return {
      cycleNumber: round?.cycleNumber ?? currentCycle,
      roundNumber: round?.roundNumber ?? selectedTurn,
    };
  };

  const totalVerifiedAmount = payments
    .filter((p) => p.status === "VERIFIED")
    .reduce((sum, p) => sum + Number(p.totalAmount || 0), 0);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden rounded-3xl border border-neutral-border">
        <div className="p-6 border-b border-neutral-border/70 bg-neutral-subtext/5">
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

          <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-neutral-border/60">
            <div className="p-2.5 rounded-xl bg-background border border-neutral-border/60">
              <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider block">
                Total Payments
              </span>
              <span className="text-sm font-extrabold text-foreground">
                {payments.length} {payments.length === 1 ? "Record" : "Records"}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-background border border-neutral-border/60">
              <span className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider block">
                Verified Total
              </span>
              <span className="text-sm font-extrabold text-brand-accent">
                ₱{totalVerifiedAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[50vh] space-y-3">
          {payments.length > 0 ? (
            payments.map((p) => {
              const roundInfo = getPaymentRoundInfo(p.roundId);
              const isVerified = p.status === "VERIFIED";
              const isPending = p.status === "PENDING";
              const isRejected = p.status === "REJECTED";

              return (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl border border-neutral-border/80 bg-background flex flex-col gap-2.5 shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                          isVerified
                            ? "border border-success/30 bg-success-bg text-success"
                            : isPending
                            ? "border border-warning/30 bg-warning-bg text-warning"
                            : "border border-danger-border bg-danger-bg text-danger"
                        }`}
                      >
                        #{roundInfo.roundNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-foreground">
                            Cycle {roundInfo.cycleNumber} • Turn #{roundInfo.roundNumber}
                          </span>
                          <span className="text-[10px] text-neutral-subtext font-semibold uppercase px-1.5 py-0.5 rounded-md bg-neutral-subtext/10">
                            {p.paymentMethod.replace("_", " ")}
                          </span>
                        </div>
                        <span className="text-[11px] text-neutral-subtext block mt-0.5">
                          {p.createdAt ? formatDateTime12h(p.createdAt) : formatDate(new Date())}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-sm font-black text-foreground">
                        ₱{Number(p.totalAmount || 0).toLocaleString()}
                      </span>
                      {isVerified ? (
                        <span className="flex items-center gap-1 rounded-full border border-success/30 bg-success-bg px-2 py-0.5 text-[9px] font-bold text-success">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      ) : isPending ? (
                        <span className="flex items-center gap-1 rounded-full border border-warning/30 bg-warning-bg px-2 py-0.5 text-[9px] font-bold text-warning">
                          <Clock className="w-3 h-3" /> Pending Approval
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 rounded-full border border-danger-border bg-danger-bg px-2 py-0.5 text-[9px] font-bold text-danger">
                          <AlertCircle className="w-3 h-3" /> Rejected
                        </span>
                      )}
                    </div>
                  </div>

                  {p.referenceNumber && (
                    <div className="text-[11px] font-mono text-neutral-subtext bg-neutral-subtext/5 px-2.5 py-1 rounded-lg border border-neutral-border/50">
                      Ref: {p.referenceNumber}
                    </div>
                  )}

                  {isRejected && p.rejectionReason && (
                    <div className="space-y-0.5 rounded-xl border border-danger-border bg-danger-bg p-2.5 text-xs text-danger">
                      <span className="text-[10px] font-bold uppercase tracking-wider block">
                        Rejection Reason
                      </span>
                      <p className="text-[11px] leading-relaxed">{p.rejectionReason}</p>
                    </div>
                  )}
                </div>
              );
            })
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

        <div className="p-4 border-t border-neutral-border/70 bg-background flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-2xl border border-neutral-border bg-neutral-table-stripe hover:bg-neutral-subtext/10 text-xs font-bold text-foreground transition-all cursor-pointer active:scale-95 shadow-2xs"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
