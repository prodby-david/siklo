"use client";

import Link from "next/link";
import SigninForm from "../components/SigninForm";
import { Coins, ShieldCheck, RefreshCw } from "lucide-react";
import Image from "next/image";

export default function SigninCard() {
  return (
    <div className="w-full max-w-4xl bg-background border border-neutral-border rounded-2xl shadow-sm flex flex-col md:flex-row overflow-hidden animate-fade-in">
      <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-brand-primary/5 via-brand-accent/5 to-transparent border-r border-neutral-border p-8 flex-col">
        <div className="flex flex-col gap-3 relative">
          <Link
            href="/"
            className="flex items-center text-lg font-bold text-foreground absolute"
          >
            <Image src="/images/logo.svg" alt="Siklo" width={60} height={60} />
          </Link>

          <div className="flex flex-col gap-2 mt-15">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Manage your funds, together.
            </h2>
            <p className="text-xs text-neutral-subtext leading-relaxed">
              Siklo makes Paluwagan transparent, secure, and hassle-free. Keep
              track of cycle turns, contribution logs, and group status in one
              place.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <div className="flex gap-3 items-start">
              <div className="h-8 w-8 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">
                  Secure & Transparent
                </h4>
                <p className="text-[11px] text-neutral-subtext leading-snug">
                  Every transaction and payout is visible to all members,
                  ensuring trust.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="h-8 w-8 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                <RefreshCw className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">
                  Automated Cycles
                </h4>
                <p className="text-[11px] text-neutral-subtext leading-snug">
                  Systematically handles turns and payouts, keeping everyone
                  aligned on schedules.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="h-8 w-8 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                <Coins className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">
                  Track Progress
                </h4>
                <p className="text-[11px] text-neutral-subtext leading-snug">
                  Monitor your personal and group savings milestones in
                  real-time.
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
            <Image
              src="/images/logo.svg"
              alt="Siklo"
              width={40}
              height={40}
              priority
            />
          </Link>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Welcome Back
            </h2>
            <p className="text-xs text-neutral-subtext">
              Sign in to access your Paluwagan cycles, contributions, and logs.
            </p>
          </div>
        </div>

        <SigninForm />

        <div className="border-t border-neutral-border pt-4 text-center">
          <p className="text-xs text-neutral-subtext">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-brand-accent hover:text-brand-accent-hover"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
