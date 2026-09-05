import { CheckCircle2, Clock } from "lucide-react";

interface CycleStatusBadgeProps {
  hasStarted: boolean;
  isCycleDone: boolean;
}

export default function CycleStatusBadge({
  hasStarted,
  isCycleDone,
}: CycleStatusBadgeProps) {
  if (isCycleDone) {
    return (
      <span className="flex items-center gap-1 rounded-full border border-winner-payout/25 bg-winner-payout-bg px-2 py-0.5 text-[10px] font-semibold text-winner-payout">
        <CheckCircle2 className="h-3 w-3" /> Completed
      </span>
    );
  }

  if (hasStarted) {
    return (
      <span className="flex items-center gap-1 rounded-full border border-success/25 bg-success-bg px-2 py-0.5 text-[10px] font-semibold text-success">
        <CheckCircle2 className="h-3 w-3" /> Active
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 rounded-full border border-warning/25 bg-warning-bg px-2 py-0.5 text-[10px] font-semibold text-warning">
      <Clock className="h-3 w-3" /> Pending
    </span>
  );
}
