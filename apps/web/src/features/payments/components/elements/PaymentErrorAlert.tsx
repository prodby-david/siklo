import { AlertCircle } from "lucide-react";
import { PaymentErrorAlertProps } from "../../types/payment.types";

export default function PaymentErrorAlert({ message }: PaymentErrorAlertProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-1.5 rounded-xl border border-danger-border bg-danger-bg p-2.5 text-xs font-semibold leading-relaxed text-danger">
      <AlertCircle className="w-4 h-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
