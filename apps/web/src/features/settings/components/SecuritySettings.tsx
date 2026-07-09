"use client";

import React, { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";

export default function SecuritySettings() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFactor, setTwoFactor] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-base font-bold text-foreground">Login & Security</h3>
        <p className="text-xs text-neutral-subtext">Manage your password and secure your account access.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="currentPassword" className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
            Current Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext/70">
              <Lock className="w-4 h-4" />
            </span>
            <input
              id="currentPassword"
              type="password"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
              className="w-full pl-9 pr-4 py-2 text-xs bg-background border border-neutral-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all text-foreground"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="newPassword" className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
            New Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext/70">
              <Lock className="w-4 h-4" />
            </span>
            <input
              id="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              className="w-full pl-9 pr-4 py-2 text-xs bg-background border border-neutral-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all text-foreground"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPassword" className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
            Confirm New Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext/70">
              <Lock className="w-4 h-4" />
            </span>
            <input
              id="confirmPassword"
              type="password"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              className="w-full pl-9 pr-4 py-2 text-xs bg-background border border-neutral-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all text-foreground"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:hover:bg-slate-200 dark:text-slate-900 text-white rounded-2xl text-xs font-semibold active:scale-[0.98] transition-all shadow-sm cursor-pointer"
          >
            Update Password
          </button>
          {saved && (
            <span className="text-xs font-semibold text-color-success animate-fade-in">
              Password updated successfully!
            </span>
          )}
        </div>
      </form>

      <div className="border-t border-neutral-border/50 pt-6 max-w-xl">
        <div className="flex items-center justify-between gap-4 bg-neutral-subtext/5 border border-neutral-border/50 p-4 rounded-2xl">
          <div className="flex gap-3">
            <ShieldCheck className="w-8 h-8 text-brand-accent shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-foreground">Two-Factor Authentication (2FA)</h4>
              <p className="text-[11px] text-neutral-subtext mt-0.5 leading-relaxed">
                Add an extra layer of security to your savings account by requiring a code from your authentication app.
              </p>
            </div>
          </div>
          <button
            onClick={() => setTwoFactor(!twoFactor)}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-200 ${
              twoFactor ? "bg-brand-accent justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
            }`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-sm"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
