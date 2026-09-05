import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { PaymentAccountDetailsCopyBoxProps } from "../../types/payment.types";

export default function PaymentAccountDetailsCopyBox({
  details,
}: PaymentAccountDetailsCopyBoxProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!details || !details.trim()) return null;

  const lines = details.split("\n").filter((line) => line.trim().length > 0);

  const copyNumber = (text: string, key: string) => {
    const numbersOnly = text.replace(/\D/g, "");
    const toCopy = numbersOnly || text;
    navigator.clipboard.writeText(toCopy);
    setCopiedKey(key);
    toast.success(`Copied: ${toCopy}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="p-3 bg-brand-accent/5 rounded-2xl border border-brand-accent/20 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-brand-accent uppercase tracking-wider">
          Organizer Account Details
        </span>
        <button
          type="button"
          onClick={() => copyNumber(details, "all")}
          className="text-brand-accent hover:text-brand-accent-hover text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
        >
          {copiedKey === "all" ? (
            <>
              <Check className="h-3 w-3 text-success" />
              <span className="text-success">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy Number</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-1.5">
        {lines.map((line, index) => {
          const numbersOnly = line.replace(/\D/g, "");
          const lineKey = `line-${index}`;
          const isCopied = copiedKey === lineKey;

          return (
            <div
              key={index}
              className="flex items-center justify-between gap-2 text-xs text-foreground font-mono bg-background/80 px-3 py-2 rounded-xl border border-brand-accent/10"
            >
              <span className="truncate">{line}</span>
              {numbersOnly && (
                <button
                  type="button"
                  onClick={() => copyNumber(line, lineKey)}
                  className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold text-brand-accent hover:underline px-2 py-0.5 rounded-lg border border-brand-accent/20 bg-brand-accent/10 cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-2.5 w-2.5 text-success" />
                      <span className="text-success">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-2.5 h-2.5" />
                      <span>{numbersOnly}</span>
                    </>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
