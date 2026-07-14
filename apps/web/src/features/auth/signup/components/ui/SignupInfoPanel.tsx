import { Users, TrendingUp, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SignupInfoPanel() {
  return (
    <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-brand-primary/5 via-brand-accent/5 to-transparent border-r border-neutral-border p-8 flex-col">
      <div className="flex flex-col gap-8">
        <Link
          href="/"
          className="flex items-center text-lg font-bold text-foreground absolute"
        >
          <Image src="/images/logo.svg" alt="Siklo" width={60} height={60} />
        </Link>

        <div className="flex flex-col gap-2 mt-15">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Start your savings cycle today.
          </h2>
          <p className="text-xs text-neutral-subtext leading-relaxed">
            Create an account to join or build a transparent, secure, and
            collaborative Paluwagan group with people you trust.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          <div className="flex gap-3 items-start">
            <div className="h-8 w-8 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Build Trust</h4>
              <p className="text-[11px] text-neutral-subtext leading-snug">
                Share contributions and coordinate payouts with full visibility
                and zero friction.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="h-8 w-8 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">
                Reach Goals Faster
              </h4>
              <p className="text-[11px] text-neutral-subtext leading-snug">
                Leverage group saving power to hit your milestones more
                efficiently.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="h-8 w-8 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">
                Simplify Finance
              </h4>
              <p className="text-[11px] text-neutral-subtext leading-snug">
                Eliminate manual spreadsheets with automated logs and
                calculations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
