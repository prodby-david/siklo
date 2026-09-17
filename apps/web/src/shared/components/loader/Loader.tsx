"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

type LoaderProps = {
  text?: string;
  variant?: "fullScreen" | "container" | "inline";
};

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function ConnectedCycleNode({
  cx,
  cy,
}: {
  cx: number;
  cy: number;
}) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={8.5}
        className="fill-brand-accent"
      />
      <circle
        cx={cx}
        cy={cy}
        r={4.2}
        className="fill-background dark:fill-card"
      />
    </g>
  );
}

function ConnectedCycleSpinner({
  className = "h-16 w-16",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} animate-spin [animation-duration:2.5s]`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="55"
        y1="28"
        x2="72"
        y2="45"
        strokeWidth="5"
        strokeLinecap="round"
        className="stroke-brand-accent"
      />
      <line
        x1="72"
        y1="55"
        x2="55"
        y2="72"
        strokeWidth="5"
        strokeLinecap="round"
        className="stroke-brand-accent"
      />
      <line
        x1="45"
        y1="72"
        x2="28"
        y2="55"
        strokeWidth="5"
        strokeLinecap="round"
        className="stroke-brand-accent"
      />
      <line
        x1="28"
        y1="45"
        x2="45"
        y2="28"
        strokeWidth="5"
        strokeLinecap="round"
        className="stroke-brand-accent"
      />

      <ConnectedCycleNode cx={50} cy={23} />
      <ConnectedCycleNode cx={77} cy={50} />
      <ConnectedCycleNode cx={50} cy={77} />
      <ConnectedCycleNode cx={23} cy={50} />
    </svg>
  );
}

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
    <div className="relative flex flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute -inset-2 rounded-full bg-brand-accent/15 blur-lg" />
        <div className="relative flex items-center justify-center">
          <ConnectedCycleSpinner className="h-16 w-16" />
        </div>
      </div>

      {text && (
        <p className="max-w-[220px] text-center text-[11px] font-extrabold uppercase tracking-widest text-neutral-subtext">
          {text}
        </p>
      )}
    </div>
  );

  if (variant === "inline") {
    return (
      <div className="relative inline-flex items-center gap-2">
        <div className="relative flex h-5 w-5 items-center justify-center shrink-0">
          <ConnectedCycleSpinner className="h-5 w-5" />
        </div>
        {text && (
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-subtext">
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === "container") {
    return (
      <div className="flex min-h-[240px] w-full items-center justify-center rounded-3xl border border-neutral-border bg-card p-8 shadow-xs">
        {spinnerElement}
      </div>
    );
  }

  const fullScreenOverlay = (
    <div className="pointer-events-auto fixed inset-0 z-[99999] flex items-center justify-center bg-background/60 backdrop-blur-md animate-fade-in">
      <div className="relative mx-4 flex w-full max-w-[260px] flex-col items-center justify-center rounded-3xl border border-neutral-border bg-card p-7 shadow-2xl">
        {spinnerElement}
      </div>
    </div>
  );

  if (!isMounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(fullScreenOverlay, document.body);
}
