import PaymentLatePenaltyRow from "./PaymentLatePenaltyRow";
import { PaymentSummaryBreakdownProps } from "../../types/payment.types";

export default function PaymentSummaryBreakdown({
  baseAmount,
  lateFee,
  organizerFee = 0,
  totalAmount,
}: PaymentSummaryBreakdownProps) {
  return (
    <div className="bg-neutral-table-stripe/60 dark:bg-neutral-table-stripe/30 p-3 rounded-2xl border border-neutral-border/60 space-y-1.5">
      <div className="flex justify-between items-center text-xs text-neutral-subtext">
        <span>Base Contribution:</span>
        <span className="font-semibold text-foreground">
          ₱{baseAmount.toLocaleString()}
        </span>
      </div>

      {organizerFee > 0 && (
        <div className="flex justify-between items-center text-xs text-neutral-subtext">
          <span>One-Time Organizer Fee:</span>
          <span className="font-semibold text-foreground">
            ₱{organizerFee.toLocaleString()}
          </span>
        </div>
      )}

      <PaymentLatePenaltyRow lateFee={lateFee} />

      <div className="border-t border-neutral-border/60 pt-1.5 flex justify-between items-center text-sm font-bold text-foreground">
        <span>Total Due:</span>
        <span className="text-brand-accent font-extrabold text-base">
          ₱{totalAmount.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
