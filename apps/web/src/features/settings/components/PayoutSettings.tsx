"use client";

import React, { useState } from "react";
import { CreditCard, Landmark } from "lucide-react";
import Input from "@/features/auth/signup/components/ui/Input";

export default function PayoutSettings() {
  const [payouts, setPayouts] = useState({
    gcashNumber: "09171234567",
    paymayaNumber: "",
    bankName: "",
    bankAccountNumber: "",
    bankAccountHolderName: "",
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-foreground">Payout Methods</h3>
        <p className="text-xs text-neutral-subtext">Configure where you want to receive your rotation payouts when it is your round.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <div className="bg-neutral-subtext/5 border border-neutral-border/50 p-4 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-border/50 pb-2">
            <CreditCard className="w-4 h-4 text-brand-accent" />
            <h4 className="text-xs font-bold text-foreground">E-Wallets</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="gcash" className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
                G-Cash Number
              </label>
              <input
                id="gcash"
                type="text"
                value={payouts.gcashNumber}
                onChange={(e) => setPayouts({ ...payouts, gcashNumber: e.target.value })}
                placeholder="e.g. 09171234567"
                className="w-full px-3 py-2 text-xs bg-background border border-neutral-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all text-foreground"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="paymaya" className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
                Maya Number
              </label>
              <input
                id="paymaya"
                type="text"
                value={payouts.paymayaNumber}
                onChange={(e) => setPayouts({ ...payouts, paymayaNumber: e.target.value })}
                placeholder="e.g. 09171234567"
                className="w-full px-3 py-2 text-xs bg-background border border-neutral-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all text-foreground"
              />
            </div>
          </div>
        </div>

        <div className="bg-neutral-subtext/5 border border-neutral-border/50 p-4 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-border/50 pb-2">
            <Landmark className="w-4 h-4 text-brand-accent" />
            <h4 className="text-xs font-bold text-foreground">Bank Transfer</h4>
          </div>

          <div className="space-y-4">
            <Input
              id="bankName"
              labelText="Bank Name"
              type="text"
              value={payouts.bankName}
              onChange={(e) => setPayouts({ ...payouts, bankName: e.target.value })}
              placeholder="e.g. BDO, BPI, Metrobank"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="accountNumber"
                labelText="Account Number"
                type="text"
                value={payouts.bankAccountNumber}
                onChange={(e) => setPayouts({ ...payouts, bankAccountNumber: e.target.value })}
                placeholder="e.g. 1234567890"
              />

              <Input
                id="accountHolder"
                labelText="Account Holder Name"
                type="text"
                value={payouts.bankAccountHolderName}
                onChange={(e) => setPayouts({ ...payouts, bankAccountHolderName: e.target.value })}
                placeholder="e.g. Juan dela Cruz"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:hover:bg-slate-200 dark:text-slate-900 text-white rounded-2xl text-xs font-semibold active:scale-[0.98] transition-all shadow-sm cursor-pointer"
          >
            Save Payout Details
          </button>
          {saved && (
            <span className="text-xs font-semibold text-color-success animate-fade-in">
              Payout methods updated successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
