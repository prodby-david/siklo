import type { LucideIcon } from "lucide-react";
import { Check, Copy } from "lucide-react";

interface PayoutAccountRowProps {
  accountKey: string;
  label: string;
  value: string;
  accountName?: string | null;
  icon: LucideIcon;
  iconClassName: string;
  copiedKey: string | null;
  onCopy: (value: string, accountKey: string) => void;
}

export default function PayoutAccountRow({
  accountKey,
  label,
  value,
  accountName,
  icon: AccountIcon,
  iconClassName,
  copiedKey,
  onCopy,
}: PayoutAccountRowProps) {
  const isCopied = copiedKey === accountKey;

  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-neutral-border/70 bg-neutral-table-stripe/60 p-2.5 text-xs">
      <div className="flex min-w-0 items-center gap-2">
        <AccountIcon className={`h-4 w-4 shrink-0 ${iconClassName}`} />
        <div className="truncate">
          <span className="block truncate font-bold text-foreground">
            {label}: {value}
          </span>
          {accountName && (
            <span className="block truncate text-[10px] text-neutral-subtext">
              {accountName}
            </span>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onCopy(value, accountKey)}
        className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-brand-accent/25 bg-brand-accent/10 px-2.5 py-1 text-[10px] font-bold text-brand-accent transition-colors hover:bg-brand-accent/20"
      >
        {isCopied ? (
          <>
            <Check className="h-3 w-3 text-success" />
            <span className="text-success">Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
