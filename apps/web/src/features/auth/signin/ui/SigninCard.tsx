"use client";

import Link from "next/link";
import SigninForm from "../components/SigninForm";
import { Coins, ShieldCheck, RefreshCw } from "lucide-react";
import Image from "next/image";

export default function SigninCard() {
  return (
    <div className="w-full max-w-4xl bg-background/90 backdrop-blur-xl border border-brand-accent/20 rounded-3xl flex flex-col md:flex-row overflow-hidden transition-all duration-300">
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
              Manage your funds, together.
            </h2>
            <p className="text-xs text-neutral-subtext leading-relaxed">
              Siklo makes Paluwagan transparent, secure, and hassle-free. Keep
              track of cycle turns, contribution logs, and group status in one place.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center p-3 rounded-2xl bg-background/60 border border-brand-accent/15 backdrop-blur-xs hover:border-brand-accent/30 transition-all duration-200">
              <div className="h-9 w-9 rounded-2xl bg-brand-accent/15 flex items-center justify-center text-brand-accent shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">
                  Secure & Transparent
                </h4>
                <p className="text-[11px] text-neutral-subtext leading-snug">
                  Every transaction and payout is visible to all members.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-center p-3 rounded-2xl bg-background/60 border border-brand-accent/15 backdrop-blur-xs hover:border-brand-accent/30 transition-all duration-200">
              <div className="h-9 w-9 rounded-2xl bg-brand-accent/15 flex items-center justify-center text-brand-accent shrink-0">
                <RefreshCw className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">
                  Automated Cycles
                </h4>
                <p className="text-[11px] text-neutral-subtext leading-snug">
                  Systematically handles turns and payouts automatically.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-center p-3 rounded-2xl bg-background/60 border border-brand-accent/15 backdrop-blur-xs hover:border-brand-accent/30 transition-all duration-200">
              <div className="h-9 w-9 rounded-2xl bg-brand-accent/15 flex items-center justify-center text-brand-accent shrink-0">
                <Coins className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">
                  Track Progress
                </h4>
                <p className="text-[11px] text-neutral-subtext leading-snug">
                  Monitor personal and group savings milestones in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-7/12 p-6 sm:p-10 flex flex-col gap-6 justify-center">
        <div className="flex flex-col items-center text-center gap-2">
          <Link
            href="/"
            className="flex md:hidden items-center gap-2 text-lg font-bold text-foreground mb-2"
          >
            <Image src="/images/logo.svg" alt="Siklo" width={56} height={56} priority />
          </Link>

          <div className="flex flex-col gap-1.5 items-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Welcome Back
            </h2>
            <p className="text-xs text-neutral-subtext max-w-sm">
              Sign in to access your Paluwagan cycles, contributions, and group logs.
            </p>
          </div>
        </div>

        <SigninForm />

        <div className="border-t border-neutral-border/80 pt-4 text-center">
          <p className="text-xs text-neutral-subtext font-medium">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-extrabold text-brand-accent hover:text-brand-accent-hover transition-colors hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
