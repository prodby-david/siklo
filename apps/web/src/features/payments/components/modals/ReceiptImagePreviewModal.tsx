"use client";

import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { ReceiptImagePreviewModalProps } from "../../types/payment.types";

export default function ReceiptImagePreviewModal({
  isOpen,
  onClose,
  imageUrl,
  title = "Payment Receipt Proof",
}: ReceiptImagePreviewModalProps) {
  if (!imageUrl) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] p-4 flex flex-col items-center">
        <DialogHeader className="w-full pb-2 border-b border-neutral-border/60">
          <DialogTitle className="text-sm font-bold text-foreground">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-[60vh] max-h-[500px] mt-3 rounded-2xl overflow-hidden bg-neutral-subtext/5 flex items-center justify-center border border-neutral-border/60">
          <Image
            src={imageUrl}
            alt="Receipt Proof"
            fill
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
