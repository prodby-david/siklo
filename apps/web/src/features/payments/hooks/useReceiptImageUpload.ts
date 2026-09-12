"use client";

import { useState, ChangeEvent } from "react";

interface UseReceiptImageUploadOptions {
  onImageSet?: (base64Url: string) => void;
  onImageClear?: () => void;
}

export function useReceiptImageUpload(options?: UseReceiptImageUploadOptions) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Receipt image size must be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      setErrorMessage(null);
      options?.onImageSet?.(result);
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setPreviewImage(null);
    setErrorMessage(null);
    options?.onImageClear?.();
  };

  return {
    previewImage,
    errorMessage,
    setErrorMessage,
    handleImageUpload,
    handleClearImage,
  };
}

export default useReceiptImageUpload;
