"use client";

import { useState } from "react";
import { useSignin } from "../hooks/useSignin";
import { Eye, EyeOff, Mail, Lock, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface SigninFormProps {
  onSuccess?: () => void;
}

export default function SigninForm({ onSuccess }: SigninFormProps) {
  const {
    formData,
    errors,
    isLoading,
    submitError,
    isSuccess,
    handleChange,
    handleSubmit,
  } = useSignin(onSuccess);

  const [showPassword, setShowPassword] = useState(false);

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
        <div className="h-12 w-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-4">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-1">Welcome Back!</h3>
        <p className="text-xs text-neutral-subtext max-w-xs">
          Successfully signed in. Redirecting to your dashboard...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {submitError && (
        <div className="p-3 text-xs font-semibold text-danger bg-danger-bg border border-danger-border rounded-md animate-fade-in">
          {submitError}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs font-bold text-neutral-subtext uppercase tracking-wider">
          Email Address
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext">
            <Mail className="h-4 w-4" />
          </span>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="juan@example.com"
            className={`w-full pl-9 pr-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 ${
              errors.email
                ? "border-danger focus:ring-danger focus:border-danger bg-danger-bg/5"
                : "border-neutral-border focus:ring-brand-accent focus:border-brand-accent bg-background"
            }`}
          />
        </div>
        {errors.email && (
          <span className="text-xs font-semibold text-danger mt-0.5">{errors.email}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="text-xs font-bold text-neutral-subtext uppercase tracking-wider">
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
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={`w-full pl-9 pr-10 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 ${
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
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <span className="text-xs font-semibold text-danger mt-0.5">{errors.password}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex h-10 items-center justify-center rounded bg-brand-accent text-xs font-bold text-white hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}
