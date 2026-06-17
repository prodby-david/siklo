"use client";

import Link from "next/link";
import SignupForm from "../components/SignupForm";
import { Users, TrendingUp, Sparkles } from "lucide-react";

export default function SignupCard() {
  return (
    <div className="w-full max-w-4xl bg-background border border-neutral-border rounded-xl shadow-sm flex flex-col md:flex-row overflow-hidden animate-fade-in">
      <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-brand-primary/5 via-brand-accent/5 to-transparent border-r border-neutral-border p-8 flex-col">
        <div className="flex flex-col gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-foreground"
          >
            <span className="h-3 w-3 rounded-sm bg-brand-accent" />
            <span>Siklo</span>
          </Link>

          <div className="flex flex-col gap-2 mt-4">
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
              <div className="h-8 w-8 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">
                  Build Trust
                </h4>
                <p className="text-[11px] text-neutral-subtext leading-snug">
                  Share contributions and coordinate payouts with full
                  visibility and zero friction.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="h-8 w-8 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
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
              <div className="h-8 w-8 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
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

      <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col gap-6 justify-center">
        <div className="flex flex-col items-center text-center gap-2">
          <Link
            href="/"
            className="flex md:hidden items-center gap-2 text-lg font-bold text-foreground mb-2"
          >
            <span className="h-3 w-3 rounded-sm bg-brand-accent" />
            <span>Siklo</span>
          </Link>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Create your Account
            </h2>
            <p className="text-xs text-neutral-subtext">
              Start saving, contributing, and cycling funds securely with your
              group.
            </p>
          </div>
        </div>

        <SignupForm />

        <div className="border-t border-neutral-border pt-4 text-center">
          <p className="text-xs text-neutral-subtext">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-brand-accent hover:text-brand-accent-hover"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
