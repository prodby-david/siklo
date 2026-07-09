"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { SETTINGS_TABS } from "../constants/settings.constant";
import { SettingsTabId } from "../types/settings.type";
import { SETTINGS_COMPONENTS } from "../utils/renderComponent";

export default function SettingsUI() {
  const [activeTab, setActiveTab] = useState<SettingsTabId>("profile");

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 w-full">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Account Settings
        </h1>
        <p className="text-sm text-neutral-subtext">
          Manage your personal details, secure your account, and set up payout
          channels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <aside className="md:col-span-4 lg:col-span-3 bg-background border border-neutral-border rounded-2xl p-4 shadow-sm space-y-1">
          {SETTINGS_TABS.map((tab) => {
            const IconComponent = tab.icon || Settings;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-150 active:scale-[0.98] cursor-pointer ${
                  isActive
                    ? "bg-brand-accent text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-neutral-subtext/5 hover:text-foreground"
                }`}
              >
                <IconComponent
                  className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        <main className="md:col-span-8 lg:col-span-9 bg-background border border-neutral-border rounded-2xl p-6 md:p-8 shadow-sm min-h-[450px] transition-all duration-200">
          {SETTINGS_COMPONENTS[activeTab]}
        </main>
      </div>
    </div>
  );
}
