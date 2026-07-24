"use client";

import Link from "next/link";
import SigninForm from "../components/SigninForm";
import { Coins, ShieldCheck, RefreshCw } from "lucide-react";
import Image from "next/image";
import AuthInfoPanel, { FeatureHighlight } from "@/features/auth/shared/components/AuthInfoPanel";

const signinHighlights: FeatureHighlight[] = [
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: "Secure & Transparent",
    description: "Every transaction and payout is visible to all members.",
  },
  {
    icon: <RefreshCw className="h-4 w-4" />,
    title: "Automated Cycles",
    description: "Systematically handles turns and payouts automatically.",
  },
  {
    icon: <Coins className="h-4 w-4" />,
    title: "Track Progress",
    description: "Monitor personal and group savings milestones in real-time.",
  },
];

export default function SigninCard() {
  return (
    <div className="w-full max-w-4xl bg-background/90 backdrop-blur-xl border border-brand-accent/20 rounded-3xl flex flex-col md:flex-row overflow-hidden transition-all duration-300">
      <AuthInfoPanel
        title="Manage your funds, together."
        subtitle="Siklo makes Paluwagan transparent, secure, and hassle-free. Keep track of cycle turns, contribution logs, and group status in one place."
        highlights={signinHighlights}
      />

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
