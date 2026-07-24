"use client";

import Link from "next/link";
import { Mail, Loader2, SendHorizontal, LogIn, Undo2, CheckCircle2, RotateCcw } from "lucide-react";
import Input from "@/features/auth/signup/components/ui/Input";
import { useForgotPassword } from "../hooks/useForgotPassword";

export default function ForgotPasswordForm() {
  const {
    register,
    errors,
    isSubmitting,
    isSubmitted,
    submittedEmail,
    handleResetForm,
    handleSubmit,
  } = useForgotPassword();

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center text-center gap-6 py-2">
        <div className="h-16 w-16 rounded-3xl bg-brand-accent/15 border border-brand-accent/30 flex items-center justify-center text-brand-accent animate-in zoom-in duration-300">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-extrabold text-foreground">
            Check your email
          </h3>
          <p className="text-xs text-neutral-subtext leading-relaxed max-w-sm">
            We sent a password reset link to{" "}
            <span className="font-bold text-foreground">{submittedEmail}</span>.
            Please check your inbox and follow the instructions.
          </p>
        </div>

        <div className="flex flex-col w-full gap-3 mt-2">
          <button
            type="button"
            onClick={handleResetForm}
            className="w-full flex h-11 items-center justify-center gap-2 rounded-2xl border border-brand-accent/20 bg-background/60 hover:bg-brand-accent/10 text-xs sm:text-sm font-bold text-foreground transition-all duration-200 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4 text-brand-accent" />
            <span>Try another email address</span>
          </button>

          <Link
            href="/signin"
            className="w-full flex h-11 items-center justify-center gap-2 rounded-2xl bg-brand-accent text-xs sm:text-sm font-extrabold text-white hover:bg-brand-accent-hover active:scale-[0.98] transition-all duration-200"
          >
            <LogIn className="h-4 w-4" />
            <span>Return to Sign In</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        label="email"
        labelText="Email Address"
        placeholder="juan@example.com"
        register={register}
        errors={errors}
        icon={<Mail className="h-4 w-4" />}
        type="email"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex h-11 items-center justify-center gap-2 rounded-2xl bg-brand-accent text-xs sm:text-sm font-extrabold text-white hover:bg-brand-accent-hover active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-1 transition-all duration-200"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <SendHorizontal className="h-4 w-4" />
            <span>Send Reset Instructions</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-center mt-1">
        <Link
          href="/signin"
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-subtext hover:text-brand-accent transition-colors"
        >
          <Undo2 className="h-3.5 w-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </form>
  );
}
