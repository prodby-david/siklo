"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  showLabel?: boolean;
  isCollapsed?: boolean;
  className?: string;
}

export default function ThemeToggle({
  showLabel = false,
  isCollapsed = false,
  className = "",
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div className={isCollapsed ? "h-9 w-9" : "h-10 w-full"} />;
  }

  const isDark = resolvedTheme === "dark";

  if (isCollapsed) {
    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Light mode" : "Dark mode"}
        className={`w-9 h-9 flex items-center justify-center rounded-2xl text-neutral-subtext hover:text-foreground hover:bg-neutral-subtext/10 border border-neutral-border hover:border-brand-accent/40 transition-all duration-200 cursor-pointer ${className}`}
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-brand-accent" />}
      </button>
    );
  }

  if (showLabel) {
    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={`w-full flex items-center justify-center gap-2.5 px-3 py-2.5 rounded-2xl text-xs font-medium border border-neutral-border text-neutral-subtext hover:text-foreground hover:bg-neutral-subtext/10 hover:border-brand-accent/40 transition-all duration-200 cursor-pointer ${className}`}
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-brand-accent" />}
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
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4 text-brand-accent" />}
    </button>
  );
}
