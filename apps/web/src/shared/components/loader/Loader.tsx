"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type LoaderProps = {
  text?: string;
  variant?: "fullScreen" | "container" | "inline";
};

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Loader({
  text = "Loading...",
  variant = "fullScreen",
}: LoaderProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const spinnerElement = (
    <div className="relative flex flex-col items-center justify-center gap-5">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute inset-0 border border-neutral-border/20 dark:border-neutral-border/10 rounded-full" />
        <div className="absolute inset-0 border border-brand-accent border-t-transparent rounded-full animate-spin [animation-duration:1.6s]" />
        <div className="relative w-20 h-20 animate-siklo-float flex items-center justify-center">
          <Image
            src="/images/siklo-loading.png"
            alt="Siklo Loading Mascot"
            width={80}
            height={80}
            className="object-contain select-none"
            priority
          />
        </div>
      </div>
      {text && (
        <p className="max-w-[200px] animate-pulse text-center text-[10px] font-bold uppercase leading-relaxed tracking-widest text-neutral-subtext">
          {text}
        </p>
      )}
    </div>
  );

  if (variant === "inline") {
    return (
      <div className="relative inline-flex items-center gap-2">
        <div className="relative w-6 h-6 flex items-center justify-center">
          <div className="absolute inset-0 border border-neutral-border/20 dark:border-neutral-border/10 rounded-full" />
          <div className="absolute inset-0 border border-brand-accent border-t-transparent rounded-full animate-spin [animation-duration:1.2s]" />
          <div className="relative w-4 h-4 animate-siklo-float flex items-center justify-center">
            <Image
              src="/images/siklo-loading.png"
              alt="Siklo Loading Mascot"
              width={16}
              height={16}
              className="object-contain select-none"
              priority
            />
          </div>
        </div>
        {text && (
          <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-subtext">
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === "container") {
    return (
      <div className="flex min-h-[250px] w-full items-center justify-center rounded-[20px] border border-neutral-border/20 bg-neutral-table-stripe/30 p-8 backdrop-blur-sm">
        {spinnerElement}
      </div>
    );
  }

  const fullScreenOverlay = (
    <div className="pointer-events-auto fixed inset-0 z-[99999] flex items-center justify-center bg-background/50 backdrop-blur-md animate-fade-in">
      <div className="relative mx-4 flex w-full max-w-[260px] flex-col items-center justify-center rounded-[24px] border border-neutral-border/40 bg-card/90 px-10 py-8 shadow-xl backdrop-blur-xl">
        {spinnerElement}
      </div>
    </div>
  );

  if (!isMounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(fullScreenOverlay, document.body);
}
