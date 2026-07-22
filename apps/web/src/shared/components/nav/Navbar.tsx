"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/shared/components/theme/ThemeToggle";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "How it works", href: "/how-it-works" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || isOpen
          ? "bg-background/80 backdrop-blur-xl border-b border-neutral-border shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
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

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((navLink) => {
            const isActive = navLink.href === pathname;
            return (
              <Link
                key={navLink.href}
                href={navLink.href}
                className={`text-xs font-semibold hover:text-brand-accent transition-colors duration-150 ${
                  isActive ? "text-brand-accent font-bold" : "text-neutral-subtext"
                }`}
              >
                {navLink.name}
              </Link>
            );
          })}

          <Link
            href={"/signin"}
            className="flex h-8 px-3.5 items-center justify-center gap-1.5 rounded-2xl bg-brand-accent text-xs font-bold text-white hover:bg-brand-accent-hover cursor-pointer transition-all duration-150 active:scale-95 shadow-xs"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <ThemeToggle />
        </nav>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-2xl text-neutral-subtext hover:text-foreground hover:bg-neutral-border/50 cursor-pointer transition-all duration-150"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-14 left-0 w-full grid transition-all duration-300 ease-in-out border-b border-neutral-border bg-background/95 backdrop-blur-xl ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 p-4">
            {navLinks.map((navLink) => {
              const isActive = navLink.href === pathname;
              return (
                <Link
                  key={navLink.href}
                  href={navLink.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-xs font-semibold py-2 px-3 rounded-2xl hover:bg-neutral-border/30 transition-colors ${
                    isActive ? "text-brand-accent bg-brand-accent/10 font-bold" : "text-neutral-subtext"
                  }`}
                >
                  {navLink.name}
                </Link>
              );
            })}

            <Link
              href={"/signin"}
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-2xl bg-brand-accent text-xs font-bold text-white hover:bg-brand-accent-hover cursor-pointer transition-all duration-150"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex flex-col items-center justify-center pt-2 border-t border-neutral-border/50">
              <Image
                src="/images/siklo-waving.svg"
                alt="Siklo Mobile Menu Mascot"
                width={80}
                height={80}
              />
              <span className="text-[10px] font-bold text-neutral-subtext mt-1">
                Welcome to Siklo!
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
