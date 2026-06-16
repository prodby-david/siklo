"use client";

import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Eye, EyeOff, User, Mail, Lock, Phone, Loader2, CheckCircle2 } from "lucide-react";

interface SignupFormProps {
  onSuccess?: () => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const {
    formData,
    errors,
    isLoading,
    submitError,
    isSuccess,
    handleChange,
    handleSubmit,
  } = useSignup(onSuccess);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
        <div className="h-12 w-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-4">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-1">Account Created!</h3>
        <p className="text-xs text-neutral-subtext max-w-xs">
          Registration successful. You can now log in to access your Paluwagan cycles.
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="name" className="text-xs font-bold text-neutral-subtext uppercase tracking-wider">
            Full Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext">
              <User className="h-4 w-4" />
            </span>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Juan Dela Cruz"
              className={`w-full pl-9 pr-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 ${
                errors.name
                  ? "border-danger focus:ring-danger focus:border-danger bg-danger-bg/5"
                  : "border-neutral-border focus:ring-brand-accent focus:border-brand-accent bg-background"
              }`}
            />
          </div>
          {errors.name && (
            <span className="text-xs font-semibold text-danger mt-0.5">{errors.name}</span>
          )}
        </div>

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
          <label htmlFor="contactNumber" className="text-xs font-bold text-neutral-subtext uppercase tracking-wider">
            Contact Number <span className="text-xs font-normal text-neutral-subtext/75 lowercase">(optional)</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext">
              <Phone className="h-4 w-4" />
            </span>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber || ""}
              onChange={handleChange}
              placeholder="09123456789"
              className={`w-full pl-9 pr-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 ${
                errors.contactNumber
                  ? "border-danger focus:ring-danger focus:border-danger bg-danger-bg/5"
                  : "border-neutral-border focus:ring-brand-accent focus:border-brand-accent bg-background"
              }`}
            />
          </div>
          {errors.contactNumber && (
            <span className="text-xs font-semibold text-danger mt-0.5">{errors.contactNumber}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-xs font-bold text-neutral-subtext uppercase tracking-wider">
            Password
          </label>
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

        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="text-xs font-bold text-neutral-subtext uppercase tracking-wider">
            Confirm Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext">
              <Lock className="h-4 w-4" />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full pl-9 pr-10 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 ${
                errors.confirmPassword
                  ? "border-danger focus:ring-danger focus:border-danger bg-danger-bg/5"
                  : "border-neutral-border focus:ring-brand-accent focus:border-brand-accent bg-background"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-subtext hover:text-foreground focus:outline-none cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-xs font-semibold text-danger mt-0.5">{errors.confirmPassword}</span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex h-10 items-center justify-center rounded bg-brand-accent text-xs font-bold text-white hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}
