"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/shared/components/theme/ThemeToggle";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Coins, ChevronDown } from "lucide-react";
import GetStartedButton from "@/shared/components/buttons/GetStartedButton";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/shared/constants/nav.constants";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileSubmenu = (name: string) => {
    setExpandedMobile(expandedMobile === name ? null : name);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-out ${
        isScrolled || isOpen || activeHover
          ? "bg-background border-b border-neutral-border shadow-xs"
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
          {NAV_LINKS.map((navLink) => {
            const isActive = navLink.href === pathname;
            const hasSubItems = navLink.subItems && navLink.subItems.length > 0;
            const isHovered = activeHover === navLink.name;

            return (
              <div
                key={navLink.name}
                className="relative py-2"
                onMouseLeave={() => setActiveHover(null)}
              >
                <Link
                  href={navLink.href}
                  onMouseEnter={() => setActiveHover(navLink.name)}
                  className={`inline-flex items-center gap-1 text-xs font-semibold hover:text-brand-accent transition-colors duration-150 ${
                    isActive ? "text-brand-accent font-bold" : "text-neutral-subtext"
                  }`}
                >
                  <span>{navLink.name}</span>
                  {hasSubItems && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isHovered ? "rotate-180 text-brand-accent" : ""
                      }`}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {hasSubItems && isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full -left-4 w-72 rounded-3xl border border-neutral-border/80 bg-background/95 backdrop-blur-2xl shadow-xl p-3 flex flex-col gap-1 z-50"
                    >
                      {navLink.subItems?.map((subItem) => {
                        const SubIcon = subItem.icon;
                        return (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            onClick={() => setActiveHover(null)}
                            className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-brand-accent/10 hover:border-brand-accent/20 border border-transparent transition-all group"
                          >
                            <div className="w-8 h-8 rounded-xl bg-brand-accent/10 text-brand-accent group-hover:bg-brand-accent group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                              <SubIcon className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col text-left">
                              <span className="text-xs font-bold text-foreground group-hover:text-brand-accent transition-colors">
                                {subItem.name}
                              </span>
                              <span className="text-[10px] text-neutral-subtext leading-tight mt-0.5">
                                {subItem.description}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <GetStartedButton
            size="sm"
            text="Get Started"
            icon={<Coins className="w-3.5 h-3.5" />}
          />

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
          <div className="flex flex-col gap-3 p-4">
            {NAV_LINKS.map((navLink) => {
              const isActive = navLink.href === pathname;
              const hasSubItems = navLink.subItems && navLink.subItems.length > 0;
              const isExpanded = expandedMobile === navLink.name;

              return (
                <div key={navLink.name} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <Link
                      href={navLink.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-xs font-semibold py-2 px-3 rounded-2xl hover:bg-neutral-border/30 transition-colors flex-1 ${
                        isActive ? "text-brand-accent bg-brand-accent/10 font-bold" : "text-neutral-subtext"
                      }`}
                    >
                      {navLink.name}
                    </Link>

                    {hasSubItems && (
                      <button
                        onClick={() => toggleMobileSubmenu(navLink.name)}
                        className="p-2 text-neutral-subtext hover:text-foreground"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-brand-accent" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {hasSubItems && isExpanded && (
                    <div className="flex flex-col gap-1 pl-4 pt-1 pb-2">
                      {navLink.subItems?.map((subItem) => {
                        const SubIcon = subItem.icon;
                        return (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2.5 p-2 rounded-xl text-xs text-neutral-subtext hover:text-foreground hover:bg-neutral-border/20 transition-colors"
                          >
                            <SubIcon className="w-3.5 h-3.5 text-brand-accent" />
                            <span>{subItem.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <GetStartedButton
              size="md"
              text="Get Started"
              icon={<Coins className="w-4 h-4" />}
              className="w-full mt-2"
              onClick={() => setIsOpen(false)}
            />

            <div className="flex flex-col items-center justify-center pt-2 border-t border-neutral-border/50">
              <Image
                src="/images/siklo-waving.png"
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
    </motion.header>
  );
}
