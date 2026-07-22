import { Users, TrendingUp, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SignupInfoPanel() {
  return (
    <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-brand-accent/10 via-brand-accent/5 to-transparent border-r border-brand-accent/15 p-8 flex-col justify-between relative overflow-hidden">
      <div className="absolute -top-12 -left-12 w-40 h-40 bg-brand-accent/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-brand-accent/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col gap-6 relative z-10">
        <Link
          href="/"
          className="flex items-center text-lg font-bold text-foreground self-start transition-transform hover:scale-105"
        >
          <Image src="/images/logo.svg" alt="Siklo" width={64} height={64} priority />
        </Link>

        <div className="flex flex-col gap-2 mt-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground leading-tight">
            Start your savings cycle today.
          </h2>
          <p className="text-xs text-neutral-subtext leading-relaxed">
            Create an account to join or build a transparent, secure, and
            collaborative Paluwagan group with people you trust.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center p-3 rounded-2xl bg-background/60 border border-brand-accent/15 backdrop-blur-xs hover:border-brand-accent/30 transition-all duration-200">
            <div className="h-9 w-9 rounded-2xl bg-brand-accent/15 flex items-center justify-center text-brand-accent shrink-0">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Build Trust</h4>
              <p className="text-[11px] text-neutral-subtext leading-snug">
                Share contributions and coordinate payouts with full visibility.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-center p-3 rounded-2xl bg-background/60 border border-brand-accent/15 backdrop-blur-xs hover:border-brand-accent/30 transition-all duration-200">
            <div className="h-9 w-9 rounded-2xl bg-brand-accent/15 flex items-center justify-center text-brand-accent shrink-0">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">
                Reach Goals Faster
              </h4>
              <p className="text-[11px] text-neutral-subtext leading-snug">
                Leverage group saving power to hit milestones efficiently.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-center p-3 rounded-2xl bg-background/60 border border-brand-accent/15 backdrop-blur-xs hover:border-brand-accent/30 transition-all duration-200">
            <div className="h-9 w-9 rounded-2xl bg-brand-accent/15 flex items-center justify-center text-brand-accent shrink-0">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">
                Simplify Finance
              </h4>
              <p className="text-[11px] text-neutral-subtext leading-snug">
                Eliminate manual spreadsheets with automated group logs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
