"use client";

import Image from "next/image";
import iconSvg from "@/app/icon.svg";

export default function Loader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="pointer-events-auto fixed inset-0 z-[99999] flex items-center justify-center bg-background/80 backdrop-blur-xs"
    >
      <div className="relative flex h-14 w-14 items-center justify-center">
        <Image
          src={iconSvg}
          alt="Loading"
          width={56}
          height={56}
          className="h-14 w-14 object-contain animate-spin [animation-duration:2.5s]"
          priority
        />
      </div>
    </div>
  );
}
