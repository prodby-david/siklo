import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { PaymentAccountDetailsCopyBoxProps } from "../../types/payment.types";

export default function PaymentAccountDetailsCopyBox({
  details,
}: PaymentAccountDetailsCopyBoxProps) {
  const [copied, setCopied] = useState(false);

  if (!details || !details.trim()) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(details);
    setCopied(true);
    toast.success("Account details copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-3 bg-brand-accent/5 rounded-2xl border border-brand-accent/20 space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-brand-accent uppercase tracking-wider">
          Organizer Account Details
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-brand-accent hover:text-brand-accent-hover text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-500">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <p className="text-xs text-foreground font-mono bg-background/80 p-2 rounded-xl border border-brand-accent/10 whitespace-pre-wrap select-all">
        {details}
      </p>
    </div>
  );
}
