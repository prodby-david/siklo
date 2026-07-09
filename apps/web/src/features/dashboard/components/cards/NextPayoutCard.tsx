import { Calendar, Banknote, Coins } from "lucide-react";

interface NextPayoutCardProps {
  expectedAmount: number;
  expectedDate: string | null;
  groupName: string;
}

export default function NextPayoutCard({
  expectedAmount,
  expectedDate,
  groupName,
}: NextPayoutCardProps) {
  return (
    <div className="p-6 border border-transparent rounded-2xl w-full bg-brand-accent text-white shadow-md hover:bg-brand-accent-hover transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Coins className="w-24 h-24 text-white" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex flex-col items-start gap-3 w-full">
          <span className="text-xs font-semibold text-white/85 uppercase tracking-wider">
            Next Payout
          </span>
          <div className="space-y-1 w-full">
            <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">
              Expected Amount
            </p>
            <p className="text-3xl font-extrabold text-white tracking-tight">
              ₱
              {expectedAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
            {groupName && (
              <p
                className="text-xs font-semibold text-white/95 truncate max-w-[200px]"
                title={groupName}
              >
                {groupName}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2 bg-white/10 border border-white/20 px-2.5 py-1 rounded-2xl">
            <Calendar className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full shrink-0">
          <Banknote className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
