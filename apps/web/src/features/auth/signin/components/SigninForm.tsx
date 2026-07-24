"use client";

import Link from "next/link";
import { Mail, Lock, Loader2, LogIn, CheckCircle2 } from "lucide-react";
import { useSignin } from "../hooks/useSignin";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import Input from "@/features/auth/signup/components/ui/Input";
import PasswordInput from "@/features/auth/signup/components/ui/PasswordInput";

export default function SigninForm() {
  const {
    register,
    errors,
    isSubmitting,
    handleSubmit,
    isRedirecting,
    showPassword,
    setShowPassword,
  } = useSignin();

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="email"
          labelText="Email Address"
          placeholder="juan@example.com"
          register={register}
          errors={errors}
          icon={<Mail className="h-4 w-4" />}
          type="email"
        />

        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="password"
              className="text-[11px] font-bold text-neutral-subtext uppercase tracking-wider"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-brand-accent hover:text-brand-accent-hover transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            label="password"
            labelText=""
            placeholder="••••••••"
            register={register}
            errors={errors}
            icon={<Lock className="h-4 w-4" />}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isRedirecting}
          className="w-full flex h-11 items-center justify-center gap-2 rounded-2xl bg-brand-accent text-xs sm:text-sm font-extrabold text-white hover:bg-brand-accent-hover active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2 transition-all duration-200"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </>
          )}
        </button>

        <AlertDialog open={isRedirecting}>
          <AlertDialogContent
            size="sm"
            className="flex flex-col items-center text-center p-6 rounded-3xl border border-brand-accent/20"
          >
            <CheckCircle2 className="h-7 w-7 text-brand-accent" />
            <AlertDialogHeader className="items-center">
              <AlertDialogTitle className="text-base font-bold text-foreground">
                Sign in Success!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs text-neutral-subtext">
                You are now being redirected to your dashboard...
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex items-center gap-2 mt-4 text-xs font-medium text-brand-accent">
              Redirecting...
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </>
  );
}
