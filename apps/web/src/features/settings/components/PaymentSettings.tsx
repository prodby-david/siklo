"use client";

import { useState, type FormEvent } from "react";
import { usePaymentSettings } from "../hooks/usePaymentSettings";
import Loader from "@/shared/components/loader/Loader";
import PaymentAccountSection from "./PaymentAccountSection";
import { PAYMENT_ACCOUNT_SECTIONS } from "../constants/settings.constants";
import type { PaymentAccountId } from "../types/payment-settings.types";
import {
  hasSavedAccountValue,
  restoreSavedAccount,
} from "../utils/paymentSettings.utils";

export default function PaymentSettings() {
  const {
    formData,
    userAccounts,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = usePaymentSettings();

  const [editingAccount, setEditingAccount] =
    useState<PaymentAccountId | null>(null);

  const handleToggleEditing = (accountId: PaymentAccountId) => {
    if (editingAccount === accountId) {
      restoreSavedAccount(accountId, userAccounts, handleChange);
      setEditingAccount(null);
      return;
    }
    setEditingAccount(accountId);
  };

  const handleFormSubmit = (e: FormEvent) => {
    handleSubmit(e, () => {
      setEditingAccount(null);
    });
  };

  return (
    <div className="space-y-6 max-w-xl">
      {isSubmitting && <Loader />}
      <div>
        <h3 className="text-base font-bold text-foreground">
          Payment & Payout Accounts
        </h3>
        <p className="text-xs text-neutral-subtext">
          Save your default payment details for creating groups or receiving payouts.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {PAYMENT_ACCOUNT_SECTIONS.map((account) => (
          <PaymentAccountSection
            key={account.id}
            config={account}
            values={formData}
            hasSavedValue={hasSavedAccountValue(account.id, userAccounts)}
            isEditing={editingAccount === account.id}
            onChange={handleChange}
            onToggleEditing={() => handleToggleEditing(account.id)}
          />
        ))}

        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer rounded-2xl bg-brand-accent px-6 py-2.5 text-xs font-semibold text-brand-accent-foreground shadow-sm transition-colors hover:bg-brand-accent-hover active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Payment Details"}
          </button>
        </div>
      </form>
    </div>
  );
}
