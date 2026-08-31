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
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Confirm Payout Received</span>
            </DialogTitle>
            <DialogDescription>
              <span className="text-xs text-neutral-subtext block">
                Please verify that you have successfully received your lump-sum
                payout of ₱{poolTotal.toLocaleString()} for Turn #{turnNumber}.
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
                  Lump-Sum Payout Received
                </span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                  ₱{poolTotal.toLocaleString()}
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-xl border border-emerald-500/30">
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
                <p className="text-[11px] text-rose-500 font-semibold">
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
                className="w-full rounded-2xl py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm cursor-pointer"
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
