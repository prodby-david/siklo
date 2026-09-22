import { ShieldCheck, Clock, AlertCircle } from "lucide-react";
import formatDate, { formatDateTime12h } from "@/shared/utils/formatDate";
import type { MemberPaymentHistoryItemProps } from "@/features/groups/types/showcase.types";

export default function MemberPaymentHistoryItem({
  payment,
  roundInfo,
}: MemberPaymentHistoryItemProps) {
  const isVerified = payment.status === "VERIFIED";
  const isPending = payment.status === "PENDING";
  const isRejected = payment.status === "REJECTED";
  const isOrganizerSelfAttested =
    payment.verificationSource === "ORGANIZER_SELF_ATTESTED";

  return (
    <div className="p-4 rounded-2xl border border-neutral-border bg-card flex flex-col gap-2.5 shadow-xs hover:border-brand-accent/30 transition-all">
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
              <span className="text-[10px] text-neutral-subtext font-semibold uppercase px-2 py-0.5 rounded-md bg-neutral-table-stripe/80 border border-neutral-border/50">
                {payment.paymentMethod.replace("_", " ")}
              </span>
            </div>
            <span className="text-[11px] text-neutral-subtext block mt-0.5">
              {payment.createdAt
                ? formatDateTime12h(payment.createdAt)
                : formatDate(new Date())}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-sm font-black text-foreground">
            ₱{Number(payment.totalAmount || 0).toLocaleString()}
          </span>
          {Number(payment.penaltyAmount) > 0 && (
            <span className="text-[10px] font-semibold text-warning">
              Incl. ₱{Number(payment.penaltyAmount).toLocaleString()} penalty
            </span>
          )}
          {isVerified ? (
            <span className="flex items-center gap-1 rounded-full border border-success/30 bg-success-bg px-2 py-0.5 text-[9px] font-bold text-success">
              <ShieldCheck className="w-3 h-3" />
              {isOrganizerSelfAttested
                ? "Organizer Self-Declared"
                : "Verified"}
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

      {payment.referenceNumber && (
        <div className="text-[11px] font-mono text-neutral-subtext bg-neutral-table-stripe/60 px-2.5 py-1 rounded-lg border border-neutral-border/60">
          Ref: {payment.referenceNumber}
        </div>
      )}

      {isRejected && payment.rejectionReason && (
        <div className="space-y-0.5 rounded-xl border border-danger-border bg-danger-bg p-2.5 text-xs text-danger">
          <span className="text-[10px] font-bold uppercase tracking-wider block">
            Rejection Reason
          </span>
          <p className="text-[11px] leading-relaxed">{payment.rejectionReason}</p>
        </div>
      )}
    </div>
  );
}
