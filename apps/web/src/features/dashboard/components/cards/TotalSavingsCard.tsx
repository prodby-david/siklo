import { HandCoins, ArrowUpRight } from "lucide-react";

interface TotalSavingsCardProps {
  totalPayoutPool: number;
  totalMonthlyContributions: number;
}

export default function TotalSavingsCard({
  totalPayoutPool,
  totalMonthlyContributions,
}: TotalSavingsCardProps) {
  return (
    <div className="p-6 border border-neutral-border rounded-2xl w-full bg-background shadow-sm hover:border-brand-accent/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 items-start w-full">
          <span className="text-xs font-semibold text-neutral-subtext uppercase tracking-wider">
            Total Expected Payout
          </span>
          <p className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
            ₱{totalPayoutPool.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-1.5 mt-2 bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded-2xl text-[11px] font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>₱{totalMonthlyContributions.toLocaleString()} monthly equivalent</span>
          </div>
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-brand-accent/10 rounded-full shrink-0">
          <HandCoins className="w-6 h-6 text-brand-accent" />
        </div>
      </div>
    </div>
  );
}

