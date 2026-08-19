"use client";

import { Wallet, Landmark, ShieldCheck, Building2, CreditCard, User } from "lucide-react";
import { FormInput as Input } from "@/shared/components/inputs";
import { usePaymentSettings } from "../hooks/usePaymentSettings";

export default function PaymentSettings() {
  const { formData, handleChange, handleSubmit, isSubmitting } =
    usePaymentSettings();

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h3 className="text-base font-bold text-foreground">
          Payment & Payout Accounts
        </h3>
        <p className="text-xs text-neutral-subtext">
          Save your default payment details for creating groups or receiving payouts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-neutral-subtext/5 border border-neutral-border/50 p-4 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-border/50 pb-2">
            <Wallet className="w-4 h-4 text-brand-accent" />
            <h4 className="text-xs font-bold text-foreground">GCash Account</h4>
          </div>

          <div className="space-y-4">
            <Input
              id="gcashName"
              labelText="Account Holder Name"
              type="text"
              value={formData.gcashName || ""}
              onChange={(e) => handleChange("gcashName", e.target.value)}
              placeholder="e.g. Juan Dela Cruz"
              icon={<User className="w-4 h-4 text-brand-accent" />}
            />

            <Input
              id="gcashNumber"
              labelText="GCash Mobile Number"
              type="text"
              inputMode="numeric"
              value={formData.gcashNumber || ""}
              onChange={(e) => handleChange("gcashNumber", e.target.value)}
              placeholder="e.g. 09171234567"
              icon={<ShieldCheck className="w-4 h-4 text-brand-accent" />}
            />
          </div>
        </div>

        <div className="bg-neutral-subtext/5 border border-neutral-border/50 p-4 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-border/50 pb-2">
            <Wallet className="w-4 h-4 text-brand-accent" />
            <h4 className="text-xs font-bold text-foreground">Maya Account</h4>
          </div>

          <div className="space-y-4">
            <Input
              id="mayaName"
              labelText="Account Holder Name"
              type="text"
              value={formData.mayaName || ""}
              onChange={(e) => handleChange("mayaName", e.target.value)}
              placeholder="e.g. Juan Dela Cruz"
              icon={<User className="w-4 h-4 text-brand-accent" />}
            />

            <Input
              id="mayaNumber"
              labelText="Maya Mobile Number"
              type="text"
              inputMode="numeric"
              value={formData.mayaNumber || ""}
              onChange={(e) => handleChange("mayaNumber", e.target.value)}
              placeholder="e.g. 09187654321"
              icon={<ShieldCheck className="w-4 h-4 text-brand-accent" />}
            />
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
              value={formData.bankName || ""}
              onChange={(e) => handleChange("bankName", e.target.value)}
              placeholder="e.g. BDO, BPI, UnionBank"
              icon={<Building2 className="w-4 h-4 text-brand-accent" />}
            />

            <Input
              id="bankAccountNumber"
              labelText="Bank Account Number"
              type="text"
              inputMode="numeric"
              value={formData.bankAccountNumber || ""}
              onChange={(e) =>
                handleChange("bankAccountNumber", e.target.value)
              }
              placeholder="e.g. 123456789012"
              icon={<CreditCard className="w-4 h-4 text-brand-accent" />}
            />
          </div>
        </div>


        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-2xl text-xs font-semibold active:scale-[0.98] transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Payment Details"}
          </button>
        </div>
      </form>
    </div>
  );
}
