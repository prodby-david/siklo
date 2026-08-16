import React from "react";
import Image from "next/image";
import { Upload, X, FileText } from "lucide-react";
import { PaymentReceiptUploaderProps } from "../../types/payment.types";

export default function PaymentReceiptUploader({
  previewImage,
  onImageChange,
  onClearImage,
  label = "Payment Receipt / Proof Image",
  isRejection = false,
}: PaymentReceiptUploaderProps) {
  const accentBorder = isRejection ? "border-rose-500/40" : "border-brand-accent/40";
  const hoverBorder = isRejection ? "hover:border-rose-500/40" : "hover:border-brand-accent/40";
  const iconColor = isRejection ? "text-rose-500" : "text-brand-accent";

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-foreground flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <FileText className={`w-3.5 h-3.5 ${iconColor}`} />
          <span>{label}</span>
        </span>
        {previewImage && (
          <button
            type="button"
            onClick={onClearImage}
            className="text-danger hover:underline text-[10px] flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3 h-3" /> Clear Image
          </button>
        )}
      </label>

      {previewImage ? (
        <div className={`relative w-full h-36 sm:h-40 rounded-2xl overflow-hidden border ${accentBorder} bg-neutral-subtext/5 flex items-center justify-center`}>
          <Image
            src={previewImage}
            alt="Receipt Preview"
            fill
            className="object-contain"
          />
        </div>
      ) : (
        <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-neutral-border rounded-2xl bg-neutral-table-stripe/50 hover:bg-neutral-subtext/5 ${hoverBorder} transition-all cursor-pointer`}>
          <div className="flex flex-col items-center justify-center pt-3 pb-3 text-center px-4">
            <Upload className={`w-5 h-5 ${iconColor} mb-1`} />
            <p className="text-xs font-bold text-foreground">
              Upload receipt or screenshot
            </p>
            <p className="text-[10px] text-neutral-subtext">
              PNG, JPG, or WEBP (Max 5MB)
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
