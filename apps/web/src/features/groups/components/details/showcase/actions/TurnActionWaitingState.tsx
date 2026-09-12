import type { TurnActionWaitingStateProps } from "@/features/groups/types/showcase.types";

const DEFAULT_CLASS_NAME =
  "flex w-full items-center justify-center gap-1.5 rounded-2xl border border-neutral-border/60 bg-neutral-table-stripe py-3 text-xs font-bold text-neutral-subtext";

export default function TurnActionWaitingState({
  icon,
  message,
  className = DEFAULT_CLASS_NAME,
}: TurnActionWaitingStateProps) {
  return (
    <div className={className}>
      {icon}
      <span>{message}</span>
    </div>
  );
}
