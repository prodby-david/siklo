"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import useNavbarState from "@/shared/hooks/useNavbarState";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

export default function Navbar() {
  const {
    pathname,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isScrolled,
    activeDesktopMenu,
    setActiveDesktopMenu,
    expandedMobileMenu,
    handleToggleMobileSubmenu,
    handleCloseMobileMenu,
  } = useNavbarState();

  const hasSolidBackground =
    isScrolled || isMobileMenuOpen || Boolean(activeDesktopMenu);

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ease-out ${
        hasSolidBackground
          ? "border-neutral-border bg-background shadow-xs"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-bold text-foreground"
        >
          <Image
            src="/images/logo.svg"
            width={70}
            height={70}
            alt="Logo"
            priority
          />
        </Link>

        <DesktopNavigation
          pathname={pathname}
          activeMenu={activeDesktopMenu}
          onActiveMenuChange={setActiveDesktopMenu}
        />
        <MobileNavigation
          pathname={pathname}
          isOpen={isMobileMenuOpen}
          expandedMenu={expandedMobileMenu}
          onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onCloseMenu={handleCloseMobileMenu}
          onToggleSubmenu={handleToggleMobileSubmenu}
        />
      </div>
    </motion.header>
  );
}
