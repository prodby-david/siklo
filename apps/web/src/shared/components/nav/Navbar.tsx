"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/shared/components/theme/ThemeToggle";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "How it works", href: "/how-it-works" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-neutral-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-bold text-foreground"
        >
          <Image
            src={"/images/logo.svg"}
            width={70}
            height={70}
            alt="Logo"
            priority
          />
        </Link>

        <nav className="flex items-center gap-6">
          {navLinks.map((navLink) => {
            const isActive = navLink.href === pathname;
            return (
              <Link
                key={navLink.href}
                href={navLink.href}
                className={`text-xs font-semibold hover:text-brand-accent ${
                  isActive ? "text-brand-accent" : "text-neutral-subtext"
                }`}
              >
                {navLink.name}
              </Link>
            );
          })}

          <Link
            href={"/signin"}
            className="flex h-8 px-3 items-center justify-center rounded-2xl bg-brand-accent text-xs font-bold text-white hover:opacity-90 cursor-pointer"
          >
            Get Started
          </Link>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
