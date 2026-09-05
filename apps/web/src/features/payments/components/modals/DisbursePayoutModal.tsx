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
  Send,
} from "lucide-react";
import {
  disbursePayoutSchema,
  DisbursePayoutDTO,
  PaymentAccountDetailsDTO,
} from "@siklo/shared-schemas";
import PaymentReceiptUploader from "../elements/PaymentReceiptUploader";
import PayoutRecipientAccounts from "../elements/PayoutRecipientAccounts";
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

          <div className="flex items-center justify-between rounded-2xl border border-success/25 bg-success-bg p-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-success-bg font-bold text-success">
                <PhilippinePeso className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-subtext block">
                  Total Disbursed Pool
                </span>
                <span className="text-base font-black text-success">
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

          <PayoutRecipientAccounts
            paymentAccounts={recipientPaymentAccounts}
            preferredPaymentMethod={recipientPaymentMethod}
            legacyAccountDetails={recipientAccountDetails}
          />

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
                    ? "border-danger-border focus:border-danger"
                    : "border-neutral-border focus:border-brand-accent"
                }`}
              />
              {errors.referenceNumber && (
                <p className="text-[11px] font-semibold text-danger">
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
                <p className="text-[11px] font-semibold text-danger">
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
                className="w-full cursor-pointer rounded-2xl bg-brand-accent py-2.5 text-xs font-bold text-brand-accent-foreground shadow-sm hover:bg-brand-accent-hover"
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
