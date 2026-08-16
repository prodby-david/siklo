import { AlertCircle } from "lucide-react";
import { PaymentErrorAlertProps } from "../../types/payment.types";

export default function PaymentErrorAlert({ message }: PaymentErrorAlertProps) {
  if (!message) return null;

  return (
    <div className="text-xs text-rose-500 font-semibold bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20 flex items-center gap-1.5 leading-relaxed">
      <AlertCircle className="w-4 h-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
