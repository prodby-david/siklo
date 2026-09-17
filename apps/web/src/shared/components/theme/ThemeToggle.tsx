"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  showLabel?: boolean;
  isCollapsed?: boolean;
  variant?: "icon" | "full" | "segmented";
  className?: string;
}

export default function ThemeToggle({
  showLabel = false,
  isCollapsed = false,
  variant = "icon",
  className = "",
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const effectiveVariant =
    variant !== "icon" ? variant : showLabel ? "full" : "icon";

  if (!mounted) {
    if (effectiveVariant === "segmented") {
      return (
        <div
          className={`h-9 w-full rounded-2xl bg-neutral-table-stripe/60 border border-neutral-border/60 ${className}`}
        />
      );
    }
    return (
      <div
        className={
          isCollapsed
            ? "h-9 w-9"
            : effectiveVariant === "full"
            ? "h-10 w-full"
            : "h-8 w-8"
        }
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  if (effectiveVariant === "segmented") {
    return (
      <div
        role="group"
        aria-label="Theme switcher"
        className={`grid grid-cols-2 gap-1 p-1 rounded-2xl bg-neutral-table-stripe/80 border border-neutral-border/60 ${className}`}
      >
        <button
          type="button"
          onClick={() => setTheme("light")}
          aria-label="Switch to light mode"
          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
            !isDark
              ? "bg-card text-foreground shadow-2xs border border-neutral-border/60"
              : "text-neutral-subtext hover:text-foreground hover:bg-card/40 border border-transparent"
          }`}
        >
          <Sun className="w-3.5 h-3.5 text-warning" />
          <span>Light</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          aria-label="Switch to dark mode"
          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
            isDark
              ? "bg-card text-foreground shadow-2xs border border-neutral-border/60"
              : "text-neutral-subtext hover:text-foreground hover:bg-card/40 border border-transparent"
          }`}
        >
          <Moon className="w-3.5 h-3.5 text-brand-accent" />
          <span>Dark</span>
        </button>
      </div>
    );
  }

  if (isCollapsed) {
    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Light mode" : "Dark mode"}
        className={`w-9 h-9 flex items-center justify-center rounded-2xl text-neutral-subtext hover:text-foreground hover:bg-neutral-subtext/10 border border-neutral-border hover:border-brand-accent/40 transition-all duration-200 cursor-pointer ${className}`}
      >
        {isDark ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4 text-brand-accent" />
        )}
      </button>
    );
  }

  if (effectiveVariant === "full") {
    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium text-neutral-subtext hover:bg-neutral-subtext/5 hover:text-foreground transition-all duration-150 active:scale-95 cursor-pointer ${className}`}
      >
        {isDark ? (
          <Sun className="h-5 w-5 text-warning" />
        ) : (
          <Moon className="w-5 h-5 text-brand-accent" />
        )}
        <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex h-8 w-8 items-center justify-center rounded-2xl text-neutral-subtext hover:text-foreground hover:bg-neutral-border/50 cursor-pointer ${className}`}
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4 text-brand-accent" />
      )}
    </button>
  );
}
