"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

interface NotificationEmptyStateProps {
  filter: string;
}

export default function NotificationEmptyState({ filter }: NotificationEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center my-auto min-h-[280px]">
      <div className="relative mb-4">
        <Image
          src="/images/siklo-waving.png"
          alt="Siklo Mascot"
          width={140}
          height={140}
          priority
          className="mx-auto drop-shadow-sm"
        />
        <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
          <CheckCircle2 className="w-4 h-4" />
        </span>
      </div>
      <h4 className="text-base font-extrabold text-foreground">You&apos;re all caught up!</h4>
      <p className="text-xs text-neutral-subtext mt-1.5 max-w-xs leading-relaxed">
        {filter === "UNREAD"
          ? "No unread notifications at the moment."
          : "You have no active notifications right now."}
      </p>
    </div>
  );
}
