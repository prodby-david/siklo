import { CreditCard, Wallet } from "lucide-react";
import { PAYMENT_METHOD_ICONS } from "../../../constants/group.constants";
import type { GroupInfoPaymentSectionProps } from "../../../types/group.types";

export default function GroupInfoPaymentSection({
  allowedMethods = ["E_WALLET", "BANK_TRANSFER", "CASH"],
  paymentDetails,
}: GroupInfoPaymentSectionProps) {
  return (
    <>
      <div className="pt-2 border-t border-neutral-border/50 space-y-2">
        <span className="text-neutral-subtext flex items-center gap-1.5 text-xs font-semibold">
          <CreditCard className="w-3.5 h-3.5 text-brand-accent" /> Allowed Payment Methods
        </span>
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {allowedMethods.map((m) => {
            const info = PAYMENT_METHOD_ICONS[m] || { label: m, icon: Wallet };
            const IconComp = info.icon;
            return (
              <span
                key={m}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[11px] font-bold"
              >
                <IconComp className="w-3 h-3" />
                <span>{info.label}</span>
              </span>
            );
          })}
        </div>
      </div>

      {paymentDetails && (
        <div className="p-3 rounded-xl bg-neutral-subtext/5 border border-neutral-border/60 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-subtext block">
            Organizer Payment Account Details
          </span>
          <p className="text-xs font-mono font-medium text-foreground whitespace-pre-wrap leading-relaxed">
            {paymentDetails}
          </p>
        </div>
      )}
    </>
  );
}
