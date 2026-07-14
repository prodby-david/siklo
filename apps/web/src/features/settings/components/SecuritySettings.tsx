"use client";

import React, { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import PasswordInput from "@/features/auth/signup/components/ui/PasswordInput";

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
        <PasswordInput
          id="currentPassword"
          labelText="Current Password"
          value={passwords.currentPassword}
          onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
          icon={<Lock className="w-4 h-4" />}
        />

        <PasswordInput
          id="newPassword"
          labelText="New Password"
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          icon={<Lock className="w-4 h-4" />}
        />

        <PasswordInput
          id="confirmPassword"
          labelText="Confirm New Password"
          value={passwords.confirmPassword}
          onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
          icon={<Lock className="w-4 h-4" />}
        />

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
