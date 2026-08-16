import { PaymentLatePenaltyRowProps } from "../../types/payment.types";

export default function PaymentLatePenaltyRow({
  lateFee,
}: PaymentLatePenaltyRowProps) {
  if (lateFee <= 0) return null;

  return (
    <div className="flex justify-between items-center text-xs text-amber-600 dark:text-amber-400 font-semibold">
      <span>Daily Late Penalty:</span>
      <span>+₱{lateFee.toLocaleString()}</span>
    </div>
  );
}
