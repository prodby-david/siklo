import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Coins } from "lucide-react";
import GetStartedButton from "@/shared/components/buttons/GetStartedButton";
import ThemeToggle from "@/shared/components/theme/ThemeToggle";
import { NAV_LINKS } from "@/shared/constants/nav.constants";

interface DesktopNavigationProps {
  pathname: string;
  activeMenu: string | null;
  onActiveMenuChange: (menu: string | null) => void;
}

export default function DesktopNavigation({
  pathname,
  activeMenu,
  onActiveMenuChange,
}: DesktopNavigationProps) {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      {NAV_LINKS.map((navLink) => {
        const isActive = navLink.href === pathname;
        const hasSubItems = Boolean(navLink.subItems?.length);
        const isHovered = activeMenu === navLink.name;

        return (
          <div
            key={navLink.name}
            className="relative py-2"
            onMouseLeave={() => onActiveMenuChange(null)}
          >
            <Link
              href={navLink.href}
              onMouseEnter={() => onActiveMenuChange(navLink.name)}
              className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors duration-150 hover:text-brand-accent ${
                isActive
                  ? "font-bold text-brand-accent"
                  : "text-neutral-subtext"
              }`}
            >
              <span>{navLink.name}</span>
              {hasSubItems && (
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${
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
                  className="absolute -left-4 top-full z-50 flex w-72 flex-col gap-1 rounded-3xl border border-neutral-border/80 bg-card/95 p-3 shadow-xl backdrop-blur-2xl"
                >
                  {navLink.subItems?.map((subItem) => {
                    const SubItemIcon = subItem.icon;
                    return (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        onClick={() => onActiveMenuChange(null)}
                        className="group flex items-start gap-3 rounded-2xl border border-transparent p-2.5 transition-colors hover:border-brand-accent/20 hover:bg-brand-accent/10"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent transition-colors group-hover:bg-brand-accent group-hover:text-brand-accent-foreground">
                          <SubItemIcon className="h-4 w-4" />
                        </span>
                        <span className="flex flex-col text-left">
                          <span className="text-xs font-bold text-foreground transition-colors group-hover:text-brand-accent">
                            {subItem.name}
                          </span>
                          <span className="mt-0.5 text-[10px] leading-tight text-neutral-subtext">
                            {subItem.description}
                          </span>
                        </span>
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
        icon={<Coins className="h-3.5 w-3.5" />}
      />
      <ThemeToggle />
    </nav>
  );
}
