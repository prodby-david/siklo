"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import {
  Settings,
  FileText,
  AlignLeft,
  PhilippinePeso,
  Users,
  Clock,
  AlertTriangle,
  CreditCard,
  ShieldCheck,
  Wallet,
  Building2,
  Banknote,
  Check,
  AlertCircle,
  Loader2,
  Save,
} from "lucide-react";
import { api } from "@/shared/lib/axios";
import { BILLING_CYCLE_LABELS } from "@siklo/shared-schemas";
import PayoutSequenceSelector from "../forms/PayoutSequenceSelector";

type PaymentMethodKey = "E_WALLET" | "BANK_TRANSFER" | "CASH";

interface EditGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  initialData: {
    name: string;
    description?: string | null;
    contributionAmount: number;
    maxMembers: number;
    gracePeriodDays?: number;
    latePenaltyAmount?: number;
    allowedPaymentMethods?: string[];
    paymentDetails?: string | null;
    enableBackupFund?: boolean;
    backupFundPerTurn?: number | null;
    billingCycle: string;
    payoutSequence: string;
  };
  onSuccess?: () => void;
}

export default function EditGroupModal({
  isOpen,
  onClose,
  groupId,
  initialData,
  onSuccess,
}: EditGroupModalProps) {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [contributionAmount, setContributionAmount] = useState(
    initialData.contributionAmount || 1000
  );
  const [maxMembers, setMaxMembers] = useState(initialData.maxMembers || 6);
  const [gracePeriodDays, setGracePeriodDays] = useState(
    initialData.gracePeriodDays ?? 0
  );
  const [latePenaltyAmount, setLatePenaltyAmount] = useState(
    initialData.latePenaltyAmount ?? 0
  );
  const [allowedMethods, setAllowedMethods] = useState<PaymentMethodKey[]>(
    (initialData.allowedPaymentMethods as PaymentMethodKey[]) || [
      "E_WALLET",
      "BANK_TRANSFER",
      "CASH",
    ]
  );
  const [paymentDetails, setPaymentDetails] = useState(
    initialData.paymentDetails || ""
  );
  const [enableBackupFund, setEnableBackupFund] = useState(
    Boolean(initialData.enableBackupFund)
  );
  const [backupFundPerTurn, setBackupFundPerTurn] = useState(
    initialData.backupFundPerTurn ?? 0
  );
  const [billingCycle, setBillingCycle] = useState(
    initialData.billingCycle || "MONTHLY"
  );
  const [payoutSequence, setPayoutSequence] = useState(
    initialData.payoutSequence || "MANUAL"
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePaymentMethod = (method: PaymentMethodKey) => {
    let current = [...allowedMethods];
    if (current.includes(method)) {
      if (current.length === 1) return;
      current = current.filter((m) => m !== method);
    } else {
      current.push(method);
    }
    setAllowedMethods(current);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || name.trim().length < 3) {
      setErrorMessage("Group name must be at least 3 characters long");
      return;
    }
    if (contributionAmount < 50 || contributionAmount > 10000) {
      setErrorMessage("Contribution amount must be between ₱50 and ₱10,000");
      return;
    }
    if (maxMembers < 3 || maxMembers > 15) {
      setErrorMessage("Member capacity must be between 3 and 15 members");
      return;
    }
    if (allowedMethods.length === 0) {
      setErrorMessage("Please select at least 1 allowed payment method");
      return;
    }
    if (enableBackupFund && (backupFundPerTurn || 0) < 1) {
      setErrorMessage("Backup fund contribution must be at least ₱1 per turn when enabled");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.patch(`/groups/${groupId}`, {
        name: name.trim(),
        description: description.trim() || undefined,
        contributionAmount,
        maxMembers,
        gracePeriodDays,
        latePenaltyAmount,
        allowedPaymentMethods: allowedMethods,
        paymentDetails: paymentDetails.trim() || undefined,
        enableBackupFund,
        backupFundPerTurn: enableBackupFund ? backupFundPerTurn : 0,
        billingCycle,
        payoutSequence,
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      setErrorMessage(msg || "Failed to update group settings. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-5 p-1">
          <DialogHeader>
            <DialogTitle className="text-lg font-extrabold flex items-center gap-2 text-foreground">
              <Settings className="w-5 h-5 text-brand-accent" />
              <span>Edit Group Settings</span>
            </DialogTitle>
            <DialogDescription>
              <span className="text-xs text-neutral-subtext block">
                Update parameters, contribution amount, penalties, and payment channels before cycle starts.
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-neutral-subtext" />
                <span>Group Name</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Office Savings Pool"
                disabled={isSubmitting}
                className="w-full text-xs p-3 rounded-xl border border-neutral-border bg-background text-foreground focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <AlignLeft className="w-4 h-4 text-neutral-subtext" />
                <span>Group Description (Optional)</span>
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Monthly savings circle for team members"
                disabled={isSubmitting}
                className="w-full text-xs p-3 rounded-xl border border-neutral-border bg-background text-foreground focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <PhilippinePeso className="w-4 h-4 text-neutral-subtext" />
                  <span>Contribution Amount (₱50 - ₱10,000)</span>
                </label>
                <input
                  type="number"
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(Number(e.target.value))}
                  disabled={isSubmitting}
                  className="w-full text-xs p-3 rounded-xl border border-neutral-border bg-background text-foreground focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-neutral-subtext" />
                  <span>Member Capacity</span>
                </label>
                <input
                  type="number"
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(Number(e.target.value))}
                  disabled={isSubmitting}
                  className="w-full text-xs p-3 rounded-xl border border-neutral-border bg-background text-foreground focus:outline-none focus:border-brand-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-accent" />
                  <span>Grace Period (0 - 7 Days)</span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={7}
                  value={gracePeriodDays}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setGracePeriodDays(val > 7 ? 7 : val < 0 ? 0 : val);
                  }}
                  disabled={isSubmitting}
                  className="w-full text-xs p-3 rounded-xl border border-neutral-border bg-background text-foreground focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Daily Late Penalty (1% - 10% per day)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  min={1}
                  max={10}
                  value={latePenaltyAmount}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setLatePenaltyAmount(val > 10 ? 10 : val < 1 ? 1 : val);
                  }}
                  disabled={isSubmitting}
                  className="w-full text-xs p-3 rounded-xl border border-neutral-border bg-background text-foreground focus:outline-none focus:border-brand-accent"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-brand-accent" />
                  <span>Allowed Payment Methods</span>
                </label>
                <span className="text-[10px] text-neutral-subtext block">
                  Select 1 or more payment channels members can use.
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { key: "E_WALLET" as PaymentMethodKey, label: "E-Wallet", icon: Wallet },
                  { key: "BANK_TRANSFER" as PaymentMethodKey, label: "Bank Transfer", icon: Building2 },
                  { key: "CASH" as PaymentMethodKey, label: "Cash on Hand", icon: Banknote },
                ].map(({ key, label, icon: IconComponent }) => {
                  const isSelected = allowedMethods.includes(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => togglePaymentMethod(key)}
                      className={`relative py-3 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        isSelected
                          ? "bg-brand-accent text-white border-brand-accent shadow-xs"
                          : "bg-background border-neutral-border text-neutral-subtext hover:border-neutral-border"
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5 shrink-0" />
                      <span>{label}</span>
                      {isSelected && (
                        <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 bg-emerald-500 text-white rounded-full border-2 border-background shadow-xs">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-1 pt-1">
                <label className="text-xs font-bold text-foreground">
                  Organizer Payment Account Details
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. GCash: 09171234567 (Juan D.)&#10;BDO Bank: 1234567890 (Juan Dela Cruz)&#10;Maya: 09171234567"
                  disabled={isSubmitting}
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                  className="w-full text-xs p-3 min-h-[84px] rounded-xl border border-neutral-border bg-background text-foreground focus:outline-none focus:border-brand-accent resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-brand-accent/5 border border-brand-accent/20 space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="editEnableBackupFundCheck"
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <ShieldCheck
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      enableBackupFund ? "text-brand-accent font-bold" : "text-neutral-subtext"
                    }`}
                  />
                  <div>
                    <span className="text-xs font-extrabold text-foreground block">
                      Emergency Backup Fund (Optional)
                    </span>
                    <span className="text-[10px] text-neutral-subtext block">
                      Safety reserve pool to protect payouts and refund compliant members.
                    </span>
                  </div>
                </label>

                <input
                  id="editEnableBackupFundCheck"
                  type="checkbox"
                  disabled={isSubmitting}
                  checked={enableBackupFund}
                  onChange={(e) => setEnableBackupFund(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-border text-brand-accent focus:ring-brand-accent cursor-pointer"
                />
              </div>

              {enableBackupFund && (
                <div className="pt-2 border-t border-brand-accent/30">
                  <label className="text-xs font-bold text-foreground flex items-center gap-1.5 mb-1">
                    <PhilippinePeso className="w-4 h-4 text-brand-accent" />
                    <span>Backup Fund Amount Per Turn (₱)</span>
                  </label>
                  <input
                    type="number"
                    value={backupFundPerTurn}
                    onChange={(e) => setBackupFundPerTurn(Number(e.target.value))}
                    disabled={isSubmitting}
                    className="w-full text-xs p-3 rounded-xl border border-neutral-border bg-background text-foreground focus:outline-none focus:border-brand-accent"
                  />
                </div>
              )}
            </div>

            <PayoutSequenceSelector
              selectedSequence={payoutSequence}
              isPending={isSubmitting}
              onSelectSequence={(seq) => setPayoutSequence(seq)}
            />

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-neutral-subtext uppercase tracking-wider">
                Billing Cycle
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {Object.entries(BILLING_CYCLE_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setBillingCycle(key)}
                    className={`p-2.5 text-center rounded-2xl border text-xs font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                      billingCycle === key
                        ? "bg-brand-accent text-white border-brand-accent shadow-xs"
                        : "bg-background border-neutral-border text-neutral-subtext hover:border-brand-accent/40"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {errorMessage && (
            <p className="text-xs text-danger font-semibold bg-danger/10 p-3 rounded-xl border border-danger/20 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </p>
          )}

          <div className="pt-3 flex justify-end gap-2 border-t border-neutral-border/60">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl border border-neutral-border hover:bg-neutral-subtext/5 text-xs font-bold text-foreground cursor-pointer transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-extrabold cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
