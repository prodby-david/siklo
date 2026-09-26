"use client";

import { useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import { Camera, Trash2, User } from "lucide-react";
import { toast } from "sonner";
import AvatarCropModal from "./AvatarCropModal";

interface AvatarUploaderProps {
  currentAvatarUrl?: string | null;
  name?: string;
  onAvatarChange: (base64Url: string | null) => void;
  disabled?: boolean;
}

export default function AvatarUploader({
  currentAvatarUrl,
  name,
  onAvatarChange,
  disabled = false,
}: AvatarUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const initial = name ? name.charAt(0).toUpperCase() : null;

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PNG, JPG, or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Profile picture must be under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setRawImageSrc(result);
      setIsCropModalOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleRemove = () => {
    onAvatarChange(null);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-5 rounded-3xl bg-neutral-table-stripe/40 border border-neutral-border/60 space-y-3 text-center">
        <div
          onClick={() => !disabled && fileInputRef.current?.click()}
          className="relative group cursor-pointer"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden bg-brand-accent/15 border-2 border-brand-accent/25 ring-4 ring-brand-accent/10 flex items-center justify-center text-brand-accent font-black text-2xl transition-transform duration-200 group-hover:scale-105 shadow-xs">
            {currentAvatarUrl ? (
              <Image
                src={currentAvatarUrl}
                alt={name || "Profile avatar"}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : initial ? (
              <span>{initial}</span>
            ) : (
              <User className="w-9 h-9 text-brand-accent" />
            )}
          </div>

          <div className="absolute inset-0 rounded-full bg-black/45 backdrop-blur-2xs opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-150">
            <Camera className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-bold">Edit</span>
          </div>

          <div className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full bg-card border border-neutral-border/80 shadow-xs flex items-center justify-center text-foreground group-hover:border-brand-accent/50 transition-colors">
            <Camera className="w-3.5 h-3.5 text-neutral-subtext group-hover:text-brand-accent transition-colors" />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={disabled}
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-full border border-neutral-border/80 bg-card hover:bg-neutral-subtext/10 text-xs font-semibold text-foreground transition-colors cursor-pointer shadow-2xs disabled:opacity-50 inline-flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5 text-neutral-subtext" />
              <span>Change photo</span>
            </button>

            {currentAvatarUrl && (
              <button
                type="button"
                disabled={disabled}
                onClick={handleRemove}
                className="px-3 py-1.5 rounded-full hover:bg-danger-bg text-neutral-subtext hover:text-danger text-xs font-medium transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove</span>
              </button>
            )}
          </div>
          <p className="text-[11px] text-neutral-subtext/80">
            JPG, PNG, or WebP · Max 5MB
          </p>
        </div>
      </div>

      {isCropModalOpen && rawImageSrc && (
        <AvatarCropModal
          imageSrc={rawImageSrc}
          isOpen={isCropModalOpen}
          onClose={() => {
            setIsCropModalOpen(false);
            setRawImageSrc(null);
          }}
          onApplyCrop={onAvatarChange}
        />
      )}
    </>
  );
}
