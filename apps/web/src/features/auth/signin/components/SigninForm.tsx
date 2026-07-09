"use client";

import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { useSignin } from "../hooks/useSignin";
import { CheckCircle2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";

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
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-xs font-bold text-neutral-subtext uppercase tracking-wider"
          >
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext">
              <Mail className="h-4 w-4" />
            </span>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="juan@example.com"
              className={`w-full pl-9 pr-3 py-2 text-xs border rounded-2xl focus:outline-none focus:ring-1 ${
                errors.email
                  ? "border-danger focus:ring-danger focus:border-danger bg-danger-bg/5"
                  : "border-neutral-border focus:ring-brand-accent focus:border-brand-accent bg-background"
              }`}
            />
          </div>
          {errors.email && (
            <span className="text-xs font-semibold text-danger mt-0.5">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label
              htmlFor="password"
              className="text-xs font-bold text-neutral-subtext uppercase tracking-wider"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-brand-accent hover:text-brand-accent-hover"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext">
              <Lock className="h-4 w-4" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              placeholder="••••••••"
              className={`w-full pl-9 pr-10 py-2 text-xs border rounded-2xl focus:outline-none focus:ring-1 ${
                errors.password
                  ? "border-danger focus:ring-danger focus:border-danger bg-danger-bg/5"
                  : "border-neutral-border focus:ring-brand-accent focus:border-brand-accent bg-background"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-subtext hover:text-foreground focus:outline-none cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs font-semibold text-danger mt-0.5">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isRedirecting}
          className="w-full flex h-10 items-center justify-center rounded-2xl bg-brand-accent text-xs font-bold text-white hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Sign In"
          )}
        </button>

        <AlertDialog open={isRedirecting}>
          <AlertDialogContent
            size="sm"
            className="flex flex-col items-center text-center p-6"
          >
            <CheckCircle2 className="h-6 w-6 text-brand-accent" />
            <AlertDialogHeader className="items-center">
              <AlertDialogTitle className="text-base font-bold text-foreground">
                Sign in Success!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs text-neutral-subtext">
                You are now being redirected to your dashboard...
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex items-center gap-2 mt-4 text-xs font-medium text-brand-accent">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Redirecting...
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </>
  );
}
