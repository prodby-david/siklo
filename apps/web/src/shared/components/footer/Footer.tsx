import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-neutral-border/60 py-5 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-neutral-subtext tracking-tight">
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <Link
              href="/policy?tab=privacy"
              className="hover:underline hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-neutral-border/40">|</span>
            <Link
              href="/policy?tab=terms"
              className="hover:underline hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-neutral-border/40">|</span>
            <Link
              href="/help"
              className="hover:underline hover:text-foreground transition-colors"
            >
              Help & Support
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
            <p>
              Copyright &copy; {currentYear}{" "}
              <span className="text-foreground font-medium">Siklo</span>. All
              rights reserved.
            </p>
            <span className="hidden md:block text-neutral-border/60">|</span>
          </div>
          <div className="hover:text-foreground transition-colors cursor-pointer font-medium self-start md:self-auto">
            Philippines
          </div>
        </div>
      </div>
    </footer>
  );
}
