"use client";

import React, { useState } from "react";
import { User, Mail, Phone, Coins } from "lucide-react";
import Input from "@/features/auth/signup/components/ui/Input";
import ContactNumberInput from "@/features/auth/signup/components/ui/ContactNumberInput";

export default function ProfileSettings() {
  const [formData, setFormData] = useState({
    name: "Juan dela Cruz",
    email: "juan.delacruz@siklo.ph",
    phone: "09171234567",
    currency: "PHP",
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-foreground">Profile Information</h3>
        <p className="text-xs text-neutral-subtext">Update your personal details and currency preferences.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <Input
          id="name"
          labelText="Full Name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          icon={<User className="w-4 h-4" />}
        />

        <Input
          id="email"
          labelText="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          icon={<Mail className="w-4 h-4" />}
        />

        <ContactNumberInput
          id="phone"
          labelText="Phone Number"
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          icon={<Phone className="w-4 h-4" />}
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="currency" className="text-[10px] font-bold text-neutral-subtext uppercase tracking-wider">
            Preferred Currency
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-subtext/70">
              <Coins className="w-4 h-4" />
            </span>
            <select
              id="currency"
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="w-full pl-9 pr-4 py-2 text-xs bg-background border border-neutral-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all text-foreground appearance-none cursor-pointer"
            >
              <option value="PHP">Philippine Peso (₱)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:hover:bg-slate-200 dark:text-slate-900 text-white rounded-2xl text-xs font-semibold active:scale-[0.98] transition-all shadow-sm cursor-pointer"
          >
            Save Changes
          </button>
          {saved && (
            <span className="text-xs font-semibold text-color-success animate-fade-in">
              Profile updated successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
