"use client";

import Link from "next/link";
import SigninForm from "../components/SigninForm";

export default function SigninCard() {
  return (
    <div className="w-full max-w-md bg-background border border-neutral-border rounded-xl shadow-sm p-6 sm:p-8 flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col items-center text-center gap-2">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <span className="h-3 w-3 rounded-sm bg-brand-accent" />
          <span>Siklo</span>
        </Link>
        <div className="flex flex-col gap-1 mt-2">
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
          <Link href="/signup" className="font-semibold text-brand-accent hover:text-brand-accent-hover">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
