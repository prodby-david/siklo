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
  Sparkles,
  Wallet,
  FileText,
  Send,
  PhilippinePeso,
} from "lucide-react";
import {
  requestAdvancePayoutSchema,
  RequestAdvancePayoutDTO,
} from "@siklo/shared-schemas";

interface RequestAdvancePayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  roundId?: string;
  cycleNumber: number;
  turnNumber: number;
  poolTotal: number;
  initialAccountDetails?: string;
  onSubmitRequest: (data: RequestAdvancePayoutDTO) => Promise<void>;
  isSubmitting?: boolean;
}

export default function RequestAdvancePayoutModal({
  isOpen,
  onClose,
  groupId,
  roundId,
  cycleNumber,
  turnNumber,
  poolTotal,
  initialAccountDetails = "",
  onSubmitRequest,
  isSubmitting = false,
}: RequestAdvancePayoutModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestAdvancePayoutDTO>({
    resolver: zodResolver(requestAdvancePayoutSchema),
    defaultValues: {
      groupId,
      roundId,
      cycleNumber,
      turnNumber,
      accountDetails: initialAccountDetails,
      notes: "",
    },
  });

  const handleFormSubmit = async (data: RequestAdvancePayoutDTO) => {
    await onSubmitRequest(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
              <Sparkles className="w-5 h-5 text-brand-accent" />
              <span>Request Advance Payout</span>
            </DialogTitle>
            <DialogDescription>
              <span className="text-xs text-neutral-subtext block">
                All members completed their contributions early for Turn #{turnNumber}. Submit your preferred receiving account to request advance release.
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
                  Pooled Lump-Sum Payout
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
                <Wallet className="w-3.5 h-3.5 text-brand-accent" />
                <span>Receiving Account Details <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="text"
                {...register("accountDetails")}
                placeholder="e.g. GCash: 09171234567 or BDO: 1234567890 (Juan Dela Cruz)"
                className={`w-full text-xs p-2.5 rounded-xl border bg-background text-foreground focus:outline-none ${
                  errors.accountDetails
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-neutral-border focus:border-brand-accent"
                }`}
              />
              {errors.accountDetails && (
                <p className="text-[11px] text-rose-500 font-semibold">
                  {errors.accountDetails.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-brand-accent" />
                <span>Note to Organizer (Optional)</span>
              </label>
              <textarea
                rows={2}
                {...register("notes")}
                placeholder="e.g. Please disburse via GCash once verified. Thanks!"
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
                disabled={isSubmitting}
                className="w-full rounded-2xl py-2.5 border-neutral-border text-foreground hover:bg-neutral-subtext/5 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl py-2.5 bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                <Send className="w-4 h-4 mr-1.5" />
                {isSubmitting ? "Submitting..." : "Send Request"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
