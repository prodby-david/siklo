import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background/80 backdrop-blur-xl border-t border-neutral-border py-6 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-neutral-subtext tracking-tight">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <Link
              href="/policy?tab=privacy"
              className="hover:text-brand-accent transition-colors font-medium"
            >
              Privacy Policy
            </Link>
            <span className="text-neutral-border">|</span>
            <Link
              href="/policy?tab=terms"
              className="hover:text-brand-accent transition-colors font-medium"
            >
              Terms of Service
            </Link>
            <span className="text-neutral-border">|</span>
            <Link
              href="/help"
              className="hover:text-brand-accent transition-colors font-medium"
            >
              Help & Support
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 font-medium">
            <p>
              Copyright &copy; {currentYear}{" "}
              <span className="text-foreground font-bold">Siklo</span>. All
              rights reserved.
            </p>
            <span className="hidden md:block text-neutral-border">|</span>
          </div>
          <div className="hover:text-brand-accent transition-colors cursor-pointer font-semibold self-start md:self-auto">
            Philippines
          </div>
        </div>
      </div>
    </footer>
  );
}
