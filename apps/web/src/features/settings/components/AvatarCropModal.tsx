"use client";

import { useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { X, ZoomIn, ZoomOut, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cropImage } from "../utils/cropImage";

interface AvatarCropModalProps {
  imageSrc: string;
  isOpen: boolean;
  onClose: () => void;
  onApplyCrop: (croppedDataUrl: string) => void;
}

export default function AvatarCropModal({
  imageSrc,
  isOpen,
  onClose,
  onApplyCrop,
}: AvatarCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  if (!isOpen) return null;

  const handleCropComplete = (
    _croppedArea: Area,
    croppedAreaPixels: Area
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleApply = async () => {
    if (!croppedAreaPixels) return;

    try {
      setIsCropping(true);
      const croppedUrl = await cropImage(imageSrc, croppedAreaPixels);
      onApplyCrop(croppedUrl);
      onClose();
    } catch {
      toast.error("Failed to crop image. Please try again.");
    } finally {
      setIsCropping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-3xl bg-card border border-neutral-border/80 shadow-2xl p-5 space-y-4 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground">Adjust photo</h3>
            <p className="text-[11px] text-neutral-subtext">
              Drag and zoom to frame your picture
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isCropping}
            className="w-7 h-7 rounded-xl flex items-center justify-center text-neutral-subtext hover:text-foreground hover:bg-neutral-subtext/10 transition-colors cursor-pointer disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-border/40 shadow-inner">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        <div className="flex items-center gap-3 px-1">
          <ZoomOut className="w-4 h-4 text-neutral-subtext shrink-0" />
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-table-stripe rounded-lg appearance-none cursor-pointer accent-brand-accent"
            aria-label="Zoom photo"
          />
          <ZoomIn className="w-4 h-4 text-neutral-subtext shrink-0" />
        </div>

        <div className="flex items-center justify-end gap-2 pt-1 border-t border-neutral-border/60">
          <button
            type="button"
            onClick={onClose}
            disabled={isCropping}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-subtext hover:text-foreground hover:bg-neutral-subtext/10 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={isCropping}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-accent text-brand-accent-foreground hover:bg-brand-accent-hover transition-colors shadow-xs cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
          >
            {isCropping && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Apply</span>
          </button>
        </div>
      </div>
    </div>
  );
}
