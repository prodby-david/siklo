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

function SikloCycleMark({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 50 50"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M 18.5,3.5 C 31.3972,2.35594 40.2306,7.68928 45,19.5C 45.4966,21.8098 45.6633,24.1432 45.5,26.5C 46.552,26.3505 47.552,26.5172 48.5,27C 39.5845,40.0688 36.9178,38.4021 40.5,22C 35.6685,10.5085 27.3352,6.50853 15.5,10C 14.7069,8.91476 14.0402,7.7481 13.5,6.5C 15.1446,5.30374 16.8113,4.30374 18.5,3.5 Z" />
      <path
        opacity="0.9"
        d="M 20.5,12.5 C 26.5374,11.1008 30.8707,13.1008 33.5,18.5C 32.6667,18.8333 31.8333,19.1667 31,19.5C 29.1664,18.1643 27.1664,17.1643 25,16.5C 21.7155,16.7003 20.8821,18.2003 22.5,21C 25.9033,21.5783 29.0699,22.7449 32,24.5C 34.4619,28.8689 33.6285,32.3689 29.5,35C 24.1602,36.534 19.6602,35.3674 16,31.5C 15.5172,30.552 15.3505,29.552 15.5,28.5C 18.8696,28.7206 21.8696,29.7206 24.5,31.5C 28.1657,31.631 29.1657,30.131 27.5,27C 23.5492,26.4638 20.0492,24.9638 17,22.5C 15.5812,18.0823 16.7478,14.7489 20.5,12.5 Z"
      />
      <path
        opacity="0.75"
        d="M 9.5,19.5 C 9.01394,22.3817 9.01394,25.0483 9.5,27.5C 11.5047,35.4408 16.6713,39.7742 25,40.5C 27.8733,40.5545 30.5399,39.8878 33,38.5C 36.7763,41.7625 36.2763,43.9292 31.5,45C 21.306,46.9373 13.1393,43.7706 7,35.5C 5.16166,30.7918 3.32833,26.1251 1.5,21.5C 3.81675,18.6826 6.31675,16.0159 9,13.5C 9.49546,15.4727 9.66212,17.4727 9.5,19.5 Z"
      />
      <path
        opacity="0.45"
        d="M 9.5,19.5 C 10.7671,22.0613 10.7671,24.728 9.5,27.5C 10.7671,24.728 10.7671,22.0613 9.5,19.5 Z"
      />
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
        <div className="absolute -inset-2 rounded-full bg-brand-accent/15 blur-md" />

        <div className="relative h-16 w-16 flex items-center justify-center">
          <svg
            className="absolute inset-0 h-full w-full animate-spin [animation-duration:2.5s]"
            viewBox="0 0 64 64"
            fill="none"
          >
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="40 140"
              strokeLinecap="round"
              className="text-brand-accent"
            />
          </svg>

          <svg
            className="absolute inset-0 h-full w-full animate-spin [animation-duration:4s] [animation-direction:reverse]"
            viewBox="0 0 64 64"
            fill="none"
          >
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="20 70"
              strokeLinecap="round"
              className="text-neutral-border"
            />
          </svg>

          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-accent/25 bg-brand-accent/10 text-brand-accent shadow-xs">
            <SikloCycleMark className="h-6 w-6" />
          </div>
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
          <svg
            className="absolute inset-0 h-full w-full animate-spin [animation-duration:2s]"
            viewBox="0 0 20 20"
            fill="none"
          >
            <circle
              cx="10"
              cy="10"
              r="8"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="16 36"
              strokeLinecap="round"
              className="text-brand-accent"
            />
          </svg>
          <div className="text-brand-accent">
            <SikloCycleMark className="h-2.5 w-2.5" />
          </div>
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
      <div className="flex min-h-[240px] w-full items-center justify-center rounded-3xl border border-neutral-border bg-card/60 p-8 shadow-xs">
        {spinnerElement}
      </div>
    );
  }

  const fullScreenOverlay = (
    <div className="pointer-events-auto fixed inset-0 z-[99999] flex items-center justify-center bg-background/60 backdrop-blur-md animate-fade-in">
      <div className="relative mx-4 flex w-full max-w-[260px] flex-col items-center justify-center rounded-3xl border border-neutral-border bg-card/95 p-7 shadow-2xl">
        {spinnerElement}
      </div>
    </div>
  );

  if (!isMounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(fullScreenOverlay, document.body);
}
