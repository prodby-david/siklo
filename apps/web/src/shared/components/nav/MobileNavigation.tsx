import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Coins, Menu, X } from "lucide-react";
import GetStartedButton from "@/shared/components/buttons/GetStartedButton";
import ThemeToggle from "@/shared/components/theme/ThemeToggle";
import { NAV_LINKS } from "@/shared/constants/nav.constants";

interface MobileNavigationProps {
  pathname: string;
  isOpen: boolean;
  expandedMenu: string | null;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onToggleSubmenu: (menu: string) => void;
}

export default function MobileNavigation({
  pathname,
  isOpen,
  expandedMenu,
  onToggleMenu,
  onCloseMenu,
  onToggleSubmenu,
}: MobileNavigationProps) {
  return (
    <>
      <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          onClick={onToggleMenu}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-2xl text-neutral-subtext transition-colors duration-150 hover:bg-neutral-table-stripe hover:text-foreground"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <div
        className={`absolute left-0 top-14 grid w-full border-b border-neutral-border bg-card/95 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-3 p-4">
            {NAV_LINKS.map((navLink) => {
              const isActive = navLink.href === pathname;
              const hasSubItems = Boolean(navLink.subItems?.length);
              const isExpanded = expandedMenu === navLink.name;

              return (
                <div key={navLink.name} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <Link
                      href={navLink.href}
                      onClick={onCloseMenu}
                      className={`flex-1 rounded-2xl px-3 py-2 text-xs font-semibold transition-colors hover:bg-neutral-table-stripe ${
                        isActive
                          ? "bg-brand-accent/10 font-bold text-brand-accent"
                          : "text-neutral-subtext"
                      }`}
                    >
                      {navLink.name}
                    </Link>

                    {hasSubItems && (
                      <button
                        onClick={() => onToggleSubmenu(navLink.name)}
                        className="cursor-pointer p-2 text-neutral-subtext hover:text-foreground"
                        aria-label={`Toggle ${navLink.name} submenu`}
                        aria-expanded={isExpanded}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-brand-accent" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {hasSubItems && isExpanded && (
                    <div className="flex flex-col gap-1 pb-2 pl-4 pt-1">
                      {navLink.subItems?.map((subItem) => {
                        const SubItemIcon = subItem.icon;
                        return (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            onClick={onCloseMenu}
                            className="flex items-center gap-2.5 rounded-xl p-2 text-xs text-neutral-subtext transition-colors hover:bg-neutral-table-stripe hover:text-foreground"
                          >
                            <SubItemIcon className="h-3.5 w-3.5 text-brand-accent" />
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
              icon={<Coins className="h-4 w-4" />}
              className="mt-2 w-full"
              onClick={onCloseMenu}
            />

            <div className="flex flex-col items-center justify-center border-t border-neutral-border/50 pt-2">
              <Image
                src="/images/siklo-waving.png"
                alt="Siklo Mobile Menu Mascot"
                width={80}
                height={80}
              />
              <span className="mt-1 text-[10px] font-bold text-neutral-subtext">
                Welcome to Siklo!
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
