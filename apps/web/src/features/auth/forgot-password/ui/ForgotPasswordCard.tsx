"use client";

import Link from "next/link";
import Image from "next/image";
import { KeyRound, ShieldCheck, MailCheck } from "lucide-react";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import AuthInfoPanel, { FeatureHighlight } from "@/features/auth/shared/components/AuthInfoPanel";

const forgotPasswordHighlights: FeatureHighlight[] = [
  {
    icon: <KeyRound className="h-4 w-4" />,
    title: "Secure Password Reset",
    description: "Encrypted one-time verification link sent directly to you.",
  },
  {
    icon: <MailCheck className="h-4 w-4" />,
    title: "Instant Link Delivery",
    description: "Receive instructions within seconds to restore access.",
  },
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: "Data Protection",
    description: "Your cycle funds and credentials remain 100% protected.",
  },
];

export default function ForgotPasswordCard() {
  return (
    <div className="w-full max-w-4xl bg-background/90 backdrop-blur-xl border border-brand-accent/20 rounded-3xl flex flex-col md:flex-row overflow-hidden transition-all duration-300">
      <AuthInfoPanel
        title="Account Recovery"
        subtitle="Don't worry, it happens. Enter your registered email address and we will help you regain access to your Siklo account safely."
        highlights={forgotPasswordHighlights}
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
              Forgot Password?
            </h2>
            <p className="text-xs text-neutral-subtext max-w-sm">
              Enter your email address below to receive password reset instructions.
            </p>
          </div>
        </div>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}
