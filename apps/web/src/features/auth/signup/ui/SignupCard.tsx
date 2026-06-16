"use client";

import Link from "next/link";
import SignupForm from "../components/SignupForm";

export default function SignupCard() {
  return (
    <div className="w-full max-w-xl bg-background border border-neutral-border rounded-xl shadow-sm p-6 sm:p-8 flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col items-center text-center gap-2">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <span className="h-3 w-3 rounded-sm bg-brand-accent" />
          <span>Siklo</span>
        </Link>
        <div className="flex flex-col gap-1 mt-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Create your Account
          </h2>
          <p className="text-xs text-neutral-subtext">
            Start saving, contributing, and cycling funds securely with your group.
          </p>
        </div>
      </div>

      <SignupForm />

      <div className="border-t border-neutral-border pt-4 text-center">
        <p className="text-xs text-neutral-subtext">
          Already have an account?{" "}
          <Link href="/signin" className="font-semibold text-brand-accent hover:text-brand-accent-hover">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
