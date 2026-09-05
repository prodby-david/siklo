"use client";

import { useState } from "react";
import { Building2, Smartphone, Wallet } from "lucide-react";
import { toast } from "sonner";
import type { PaymentAccountDetailsDTO } from "@siklo/shared-schemas";
import PayoutAccountRow from "./PayoutAccountRow";

interface PayoutRecipientAccountsProps {
  paymentAccounts?: PaymentAccountDetailsDTO | null;
  preferredPaymentMethod?: string | null;
  legacyAccountDetails?: string | null;
}

export default function PayoutRecipientAccounts({
  paymentAccounts,
  preferredPaymentMethod,
  legacyAccountDetails,
}: PayoutRecipientAccountsProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const hasGcash = Boolean(paymentAccounts?.gcashNumber?.trim());
  const hasMaya = Boolean(paymentAccounts?.mayaNumber?.trim());
  const hasBank = Boolean(paymentAccounts?.bankAccountNumber?.trim());
  const hasSavedAccount = hasGcash || hasMaya || hasBank;
  const hasLegacyDetails = Boolean(legacyAccountDetails?.trim());

  const handleCopy = (value: string, accountKey: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(accountKey);
    toast.success(`Copied: ${value}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section className="space-y-2.5 rounded-2xl border border-brand-accent/20 bg-card p-3.5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-brand-accent">
          <Wallet className="h-3.5 w-3.5" />
          <span>Recipient Payout Accounts</span>
        </span>
        {preferredPaymentMethod && (
          <span className="rounded-full border border-neutral-border/60 bg-neutral-table-stripe px-2 py-0.5 text-[10px] font-bold text-neutral-subtext">
            {preferredPaymentMethod.replace("_", " ")}
          </span>
        )}
      </div>

      {hasSavedAccount ? (
        <div className="space-y-2">
          {hasGcash && paymentAccounts?.gcashNumber && (
            <PayoutAccountRow
              accountKey="gcash"
              label="GCash"
              value={paymentAccounts.gcashNumber}
              accountName={paymentAccounts.gcashName}
              icon={Smartphone}
              iconClassName="text-brand-accent"
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
          )}
          {hasMaya && paymentAccounts?.mayaNumber && (
            <PayoutAccountRow
              accountKey="maya"
              label="Maya"
              value={paymentAccounts.mayaNumber}
              accountName={paymentAccounts.mayaName}
              icon={Smartphone}
              iconClassName="text-success"
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
          )}
          {hasBank && paymentAccounts?.bankAccountNumber && (
            <PayoutAccountRow
              accountKey="bank"
              label={paymentAccounts.bankName || "Bank"}
              value={paymentAccounts.bankAccountNumber}
              accountName={paymentAccounts.bankName}
              icon={Building2}
              iconClassName="text-warning"
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
          )}
        </div>
      ) : hasLegacyDetails && legacyAccountDetails ? (
        <PayoutAccountRow
          accountKey="legacy"
          label="Account"
          value={legacyAccountDetails}
          icon={Wallet}
          iconClassName="text-brand-accent"
          copiedKey={copiedKey}
          onCopy={handleCopy}
        />
      ) : (
        <p className="py-1 text-xs font-medium text-neutral-subtext">
          Cash / In-person Handover (No digital accounts saved by member)
        </p>
      )}
    </section>
  );
}
