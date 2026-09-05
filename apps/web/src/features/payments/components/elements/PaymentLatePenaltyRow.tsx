import { PaymentLatePenaltyRowProps } from "../../types/payment.types";

export default function PaymentLatePenaltyRow({
  lateFee,
}: PaymentLatePenaltyRowProps) {
  if (lateFee <= 0) return null;

  return (
    <div className="flex items-center justify-between text-xs font-semibold text-warning">
      <span>Daily Late Penalty:</span>
      <span>+₱{lateFee.toLocaleString()}</span>
    </div>
  );
}
