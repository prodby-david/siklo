"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import {
  CheckCircle2,
  Receipt,
  PhilippinePeso,
  Wallet,
  Send,
  Copy,
  Check,
  Building2,
  Smartphone,
} from "lucide-react";
import { toast } from "sonner";
import {
  disbursePayoutSchema,
  DisbursePayoutDTO,
  PaymentAccountDetailsDTO,
} from "@siklo/shared-schemas";
import PaymentReceiptUploader from "../elements/PaymentReceiptUploader";
import Loader from "@/shared/components/loader/Loader";

interface DisbursePayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  roundId: string;
  cycleNumber?: number;
  recipientName: string;
  recipientPaymentAccounts?: PaymentAccountDetailsDTO | null;
  recipientPaymentMethod?: string | null;
  recipientAccountDetails?: string | null;
  turnNumber: number;
  poolTotal: number;
  onDisburse: (data: DisbursePayoutDTO) => Promise<void>;
  isDisbursing?: boolean;
}

export default function DisbursePayoutModal({
  isOpen,
  onClose,
  roundId,
  recipientName,
  recipientPaymentAccounts,
  recipientPaymentMethod,
  recipientAccountDetails,
  turnNumber,
  poolTotal,
  onDisburse,
  isDisbursing = false,
}: DisbursePayoutModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DisbursePayoutDTO>({
    resolver: zodResolver(disbursePayoutSchema),
    defaultValues: {
      roundId,
      referenceNumber: "",
      proofUrl: "",
    },
  });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`Copied: ${text}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      setValue("proofUrl", result, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setPreviewImage(null);
    setValue("proofUrl", "", { shouldValidate: true });
  };

  const handleFormSubmit = async (data: DisbursePayoutDTO) => {
    await onDisburse(data);
    onClose();
  };

  const hasGcash = Boolean(recipientPaymentAccounts?.gcashNumber?.trim());
  const hasMaya = Boolean(recipientPaymentAccounts?.mayaNumber?.trim());
  const hasBank = Boolean(recipientPaymentAccounts?.bankAccountNumber?.trim());
  const hasLegacyDetails = Boolean(recipientAccountDetails?.trim());
  const hasDigitalAccounts = hasGcash || hasMaya || hasBank || hasLegacyDetails;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto no-scrollbar">
        {isDisbursing && <Loader text="Disbursing payout..." />}
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
              <CheckCircle2 className="w-5 h-5 text-brand-accent" />
              <span>Disburse Payout & Advance Round</span>
            </DialogTitle>
            <DialogDescription>
              <span className="text-xs text-neutral-subtext block">
                Disburse ₱{poolTotal.toLocaleString()} pooled funds to{" "}
                {recipientName} for Turn #{turnNumber}. This will complete Turn
                #{turnNumber} and advance the group.
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <PhilippinePeso className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-subtext block">
                  Total Disbursed Pool
                </span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                  ₱{poolTotal.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-neutral-subtext block">
                Beneficiary
              </span>
              <span className="text-xs font-bold text-foreground">
                {recipientName} (Turn #{turnNumber})
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-background border border-brand-accent/20 dark:border-brand-accent/25 rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-extrabold text-brand-accent flex items-center gap-1.5 tracking-wider">
                <Wallet className="w-3.5 h-3.5" />
                <span>Recipient Payout Accounts</span>
              </span>
              {recipientPaymentMethod && (
                <span className="text-[10px] font-bold text-neutral-subtext bg-neutral-table-stripe px-2 py-0.5 rounded-full border border-neutral-border/60">
                  {recipientPaymentMethod.replace("_", " ")}
                </span>
              )}
            </div>

            {hasDigitalAccounts ? (
              <div className="space-y-2">
                {hasGcash && (
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-neutral-border/70 bg-neutral-table-stripe/60 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <Smartphone className="w-4 h-4 text-blue-500 shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-foreground block truncate">
                          GCash: {recipientPaymentAccounts!.gcashNumber}
                        </span>
                        {recipientPaymentAccounts!.gcashName && (
                          <span className="text-[10px] text-neutral-subtext block truncate">
                            {recipientPaymentAccounts!.gcashName}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(recipientPaymentAccounts!.gcashNumber!, "gcash")
                      }
                      className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold text-brand-accent bg-brand-accent/10 hover:bg-brand-accent/20 px-2.5 py-1 rounded-lg border border-brand-accent/25 transition-all cursor-pointer"
                    >
                      {copiedKey === "gcash" ? (
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
                )}

                {hasMaya && (
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-neutral-border/70 bg-neutral-table-stripe/60 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <Smartphone className="w-4 h-4 text-emerald-500 shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-foreground block truncate">
                          Maya: {recipientPaymentAccounts!.mayaNumber}
                        </span>
                        {recipientPaymentAccounts!.mayaName && (
                          <span className="text-[10px] text-neutral-subtext block truncate">
                            {recipientPaymentAccounts!.mayaName}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(recipientPaymentAccounts!.mayaNumber!, "maya")
                      }
                      className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold text-brand-accent bg-brand-accent/10 hover:bg-brand-accent/20 px-2.5 py-1 rounded-lg border border-brand-accent/25 transition-all cursor-pointer"
                    >
                      {copiedKey === "maya" ? (
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
                )}

                {hasBank && (
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-neutral-border/70 bg-neutral-table-stripe/60 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <Building2 className="w-4 h-4 text-amber-500 shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-foreground block truncate">
                          {recipientPaymentAccounts!.bankName || "Bank"}:{" "}
                          {recipientPaymentAccounts!.bankAccountNumber}
                        </span>
                        {recipientPaymentAccounts!.bankName && (
                          <span className="text-[10px] text-neutral-subtext block truncate">
                            {recipientPaymentAccounts!.bankName}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          recipientPaymentAccounts!.bankAccountNumber!,
                          "bank",
                        )
                      }
                      className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold text-brand-accent bg-brand-accent/10 hover:bg-brand-accent/20 px-2.5 py-1 rounded-lg border border-brand-accent/25 transition-all cursor-pointer"
                    >
                      {copiedKey === "bank" ? (
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
                )}

                {hasLegacyDetails && !hasGcash && !hasMaya && !hasBank && (
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-neutral-border/70 bg-neutral-table-stripe/60 text-xs">
                    <span className="font-bold text-foreground truncate">
                      {recipientAccountDetails}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(recipientAccountDetails!, "legacy")}
                      className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold text-brand-accent bg-brand-accent/10 hover:bg-brand-accent/20 px-2.5 py-1 rounded-lg border border-brand-accent/25 transition-all cursor-pointer"
                    >
                      {copiedKey === "legacy" ? (
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
                )}
              </div>
            ) : (
              <p className="text-xs text-neutral-subtext font-medium py-1">
                Cash / In-person Handover (No digital accounts saved by member)
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-brand-accent" />
                <span>Disbursement Reference Number</span>
              </label>
              <input
                type="text"
                {...register("referenceNumber")}
                placeholder="e.g. GCash Ref #987654321 or Bank Transfer Ref"
                className={`w-full text-xs p-2.5 rounded-xl border bg-background text-foreground focus:outline-none ${
                  errors.referenceNumber
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-neutral-border focus:border-brand-accent"
                }`}
              />
              {errors.referenceNumber && (
                <p className="text-[11px] text-rose-500 font-semibold">
                  {errors.referenceNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <PaymentReceiptUploader
                previewImage={previewImage}
                onImageChange={handleImageUpload}
                onClearImage={handleClearImage}
                label="Transfer Proof Screenshot / Receipt"
              />
              {errors.proofUrl && (
                <p className="text-[11px] text-rose-500 font-semibold">
                  {errors.proofUrl.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isDisbursing}
                className="w-full rounded-2xl py-2.5 border-neutral-border text-foreground hover:bg-neutral-subtext/5 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isDisbursing}
                className="w-full rounded-2xl py-2.5 bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                <Send className="w-4 h-4 mr-1.5" />
                {isDisbursing ? "Disbursing..." : "Disburse & Advance Round"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
