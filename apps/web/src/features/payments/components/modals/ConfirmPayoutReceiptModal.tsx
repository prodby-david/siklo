"use client";

import React from "react";
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
  ShieldCheck,
  PhilippinePeso,
  FileText,
} from "lucide-react";
import {
  confirmPayoutReceiptSchema,
  ConfirmPayoutReceiptDTO,
} from "@siklo/shared-schemas";
import Loader from "@/shared/components/loader/Loader";

interface ConfirmPayoutReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  roundId: string;
  cycleNumber: number;
  turnNumber: number;
  poolTotal: number;
  onConfirmReceipt: (data: ConfirmPayoutReceiptDTO) => Promise<void>;
  isConfirming?: boolean;
}

export default function ConfirmPayoutReceiptModal({
  isOpen,
  onClose,
  roundId,
  cycleNumber,
  turnNumber,
  poolTotal,
  onConfirmReceipt,
  isConfirming = false,
}: ConfirmPayoutReceiptModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmPayoutReceiptDTO>({
    resolver: zodResolver(confirmPayoutReceiptSchema),
    defaultValues: {
      roundId,
      notes: "",
    },
  });

  const handleFormSubmit = async (data: ConfirmPayoutReceiptDTO) => {
    await onConfirmReceipt(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto no-scrollbar">
        {isConfirming && <Loader text="Confirming payout receipt..." />}
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <span>Confirm Payout Received</span>
            </DialogTitle>
            <DialogDescription>
              <span className="text-xs text-neutral-subtext block">
                Please verify that you have successfully received your lump-sum
                payout of ₱{poolTotal.toLocaleString()} for Turn #{turnNumber}.
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
                  Lump-Sum Payout Received
                </span>
                <span className="text-base font-black text-success">
                  ₱{poolTotal.toLocaleString()}
                </span>
              </div>
            </div>
            <span className="rounded-xl border border-success/30 bg-success-bg px-2.5 py-1 text-xs font-bold text-success">
              Turn #{turnNumber} • Cycle {cycleNumber}
            </span>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-brand-accent" />
                <span>Acknowledgment Note (Optional)</span>
              </label>
              <textarea
                rows={2}
                {...register("notes")}
                placeholder="e.g. Received via GCash transfer. Thank you organizer!"
                className="w-full text-xs p-2.5 rounded-xl border border-neutral-border bg-background text-foreground focus:border-brand-accent focus:outline-none"
              />
              {errors.notes && (
                <p className="text-[11px] font-semibold text-danger">
                  {errors.notes.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isConfirming}
                className="w-full rounded-2xl py-2.5 border-neutral-border text-foreground hover:bg-neutral-subtext/5 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isConfirming}
                className="w-full cursor-pointer rounded-2xl bg-success py-2.5 text-xs font-bold text-brand-accent-foreground shadow-sm hover:opacity-90"
              >
                <ShieldCheck className="w-4 h-4 mr-1.5" />
                {isConfirming ? "Confirming..." : "I Received My Payout"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
