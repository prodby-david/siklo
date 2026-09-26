import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface SidebarBrandHeaderProps {
  onNavigate?: () => void;
  className?: string;
  action?: ReactNode;
}

export default function SidebarBrandHeader({
  onNavigate,
  className = "",
  action,
}: SidebarBrandHeaderProps) {
  return (
    <div
      className={`flex items-center ${
        action ? "justify-between" : "justify-center"
      } mb-6 px-1 h-14 ${className}`}
    >
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className="flex items-center justify-center cursor-pointer"
      >
        <Image
          src="/images/siklo-logo.svg"
          width={100}
          height={44}
          alt="Siklo Logo"
          priority
          className="h-9 w-auto object-contain"
        />
      </Link>
      {action}
    </div>
  );
}
