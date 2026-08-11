"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Image as ImageIcon, ExternalLink } from "lucide-react";

interface ReceiptImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
}

export default function ReceiptImagePreviewModal({
  isOpen,
  onClose,
  imageUrl,
  title = "Receipt Proof Image",
}: ReceiptImagePreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-base font-bold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-brand-accent" />
              <span>{title}</span>
            </span>
            <a
              href={imageUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-brand-accent hover:underline flex items-center gap-1"
            >
              Open Original <ExternalLink className="w-3 h-3" />
            </a>
          </DialogTitle>
        </DialogHeader>

        <div className="w-full flex items-center justify-center p-2 rounded-2xl bg-neutral-subtext/5 border border-neutral-border/60 overflow-hidden min-h-[250px] max-h-[500px]">
          <img
            src={imageUrl}
            alt="Submitted Payment Proof"
            className="max-h-[460px] w-auto object-contain rounded-xl shadow-xs"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
