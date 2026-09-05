"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function useNavbarState() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(
    null,
  );
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleMobileSubmenu = (name: string) => {
    setExpandedMobileMenu((currentMenu) =>
      currentMenu === name ? null : name,
    );
  };

  const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

  return {
    pathname,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isScrolled,
    activeDesktopMenu,
    setActiveDesktopMenu,
    expandedMobileMenu,
    handleToggleMobileSubmenu,
    handleCloseMobileMenu,
  };
}
