"use client";

import { useRef, ChangeEvent } from "react";
import Image from "next/image";
import { Camera, Trash2, User } from "lucide-react";
import { toast } from "sonner";

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

  const initial = name ? name.charAt(0).toUpperCase() : null;

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PNG, JPG, or WEBP image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Profile picture must be under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      onAvatarChange(result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleRemove = () => {
    onAvatarChange(null);
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-table-stripe/60 border border-neutral-border/60">
      <div className="relative group shrink-0">
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-brand-accent/15 border border-brand-accent/25 flex items-center justify-center text-brand-accent font-black text-xl">
          {currentAvatarUrl ? (
            <Image
              src={currentAvatarUrl}
              alt={name || "Profile avatar"}
              width={64}
              height={64}
              className="w-full h-full object-cover"
              unoptimized
            />
          ) : initial ? (
            <span>{initial}</span>
          ) : (
            <User className="w-8 h-8 text-brand-accent" />
          )}
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer disabled:pointer-events-none"
          title="Change profile picture"
        >
          <Camera className="w-5 h-5" />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />
      </div>

      <div className="flex-1 min-w-0 space-y-1.5">
        <div>
          <p className="text-xs font-bold text-foreground">Profile Picture</p>
          <p className="text-[11px] text-neutral-subtext">
            PNG, JPG, or WEBP (Max 2MB)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={disabled}
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] font-bold text-brand-accent hover:underline cursor-pointer disabled:opacity-50"
          >
            Upload New
          </button>

          {currentAvatarUrl && (
            <>
              <span className="text-neutral-subtext text-xs">·</span>
              <button
                type="button"
                disabled={disabled}
                onClick={handleRemove}
                className="text-[11px] font-bold text-danger hover:underline inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
