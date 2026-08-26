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
} from "lucide-react";
import {
  disbursePayoutSchema,
  DisbursePayoutDTO,
} from "@siklo/shared-schemas";
import PaymentReceiptUploader from "../elements/PaymentReceiptUploader";

interface DisbursePayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  roundId?: string;
  cycleNumber?: number;
  recipientName: string;
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
  groupId,
  roundId,
  cycleNumber = 1,
  recipientName,
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
      groupId,
      roundId,
      cycleNumber,
      turnNumber,
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
      setValue("proofUrl", result);
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setPreviewImage(null);
    setValue("proofUrl", "");
  };

  const handleFormSubmit = async (data: DisbursePayoutDTO) => {
    await onDisburse(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
              <CheckCircle2 className="w-5 h-5 text-brand-accent" />
              <span>Disburse Payout & Advance Round</span>
            </DialogTitle>
            <DialogDescription>
              <span className="text-xs text-neutral-subtext block">
                Disburse ₱{poolTotal.toLocaleString()} pooled funds to {recipientName} for Turn #{turnNumber}. This will complete Turn #{turnNumber} and advance the group.
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

          <div className="p-3.5 bg-background border border-neutral-border/80 rounded-2xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-neutral-subtext flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-brand-accent" />
              Recipient Preferred Payment Gateway
            </span>
            <p className="text-xs font-semibold text-foreground">
              {recipientPaymentMethod
                ? `${recipientPaymentMethod.replace("_", " ")}${
                    recipientAccountDetails ? `: ${recipientAccountDetails}` : ""
                  }`
                : "Cash / In-person Handover"}
            </p>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-brand-accent" />
                <span>Disbursement Reference / Notes (Optional)</span>
              </label>
              <input
                type="text"
                {...register("referenceNumber")}
                placeholder="e.g. GCash Ref #987654321 or Bank Transfer Ref"
                className="w-full text-xs p-2.5 rounded-xl border border-neutral-border bg-background text-foreground focus:border-brand-accent focus:outline-none"
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
                label="Transfer Proof Screenshot / Receipt (Optional)"
              />
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
