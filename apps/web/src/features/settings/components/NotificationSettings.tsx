"use client";

import { useState } from "react";
import { Mail, Phone, BellRing, Sparkles } from "lucide-react";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushAlerts: true,
    marketing: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-foreground">
          Notification Preferences
        </h3>
        <p className="text-xs text-neutral-subtext">
          Manage how you receive alerts about your Paluwagan cycles and payouts.
        </p>
      </div>

      <div className="space-y-4 max-w-xl">
        <div className="flex items-center justify-between gap-4 p-4 border border-neutral-border rounded-2xl bg-background hover:shadow-sm transition-all duration-200">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">
                Email Notifications
              </h4>
              <p className="text-[11px] text-neutral-subtext mt-0.5 leading-relaxed">
                Receive contribution invoices, rotation schedule updates, and
                payment receipts.
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleSetting("emailAlerts")}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-200 ${
              settings.emailAlerts
                ? "bg-brand-accent justify-end"
                : "bg-slate-300 dark:bg-slate-700 justify-start"
            }`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-sm"></div>
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 p-4 border border-neutral-border rounded-2xl bg-background hover:shadow-sm transition-all duration-200">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">SMS Alerts</h4>
              <p className="text-[11px] text-neutral-subtext mt-0.5 leading-relaxed">
                Receive instant payout availability notifications and urgent
                cycle payment reminders.
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleSetting("smsAlerts")}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-200 ${
              settings.smsAlerts
                ? "bg-brand-accent justify-end"
                : "bg-slate-300 dark:bg-slate-700 justify-start"
            }`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-sm"></div>
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 p-4 border border-neutral-border rounded-2xl bg-background hover:shadow-sm transition-all duration-200">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
              <BellRing className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">
                Push Notifications
              </h4>
              <p className="text-[11px] text-neutral-subtext mt-0.5 leading-relaxed">
                Get notifications on your dashboard when it is your rotation
                payout round or someone requests an invite.
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleSetting("pushAlerts")}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-200 ${
              settings.pushAlerts
                ? "bg-brand-accent justify-end"
                : "bg-slate-300 dark:bg-slate-700 justify-start"
            }`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-sm"></div>
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 p-4 border border-neutral-border rounded-2xl bg-background hover:shadow-sm transition-all duration-200">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">
                Marketing & Tips
              </h4>
              <p className="text-[11px] text-neutral-subtext mt-0.5 leading-relaxed">
                Receive saving tips, rotation hacks, and updates about new
                feature releases on Siklo.
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleSetting("marketing")}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-200 ${
              settings.marketing
                ? "bg-brand-accent justify-end"
                : "bg-slate-300 dark:bg-slate-700 justify-start"
            }`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-sm"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
