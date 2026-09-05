"use client";

import { useState } from "react";
import { NOTIFICATION_PREFERENCE_OPTIONS } from "../constants/settings.constants";
import type {
  NotificationPreferenceKey,
  NotificationPreferences,
} from "../types/settings.types";
import NotificationPreferenceRow from "./NotificationPreferenceRow";

const INITIAL_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  emailAlerts: true,
  smsAlerts: false,
  pushAlerts: true,
};

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState(
    INITIAL_NOTIFICATION_PREFERENCES,
  );

  const handleTogglePreference = (key: NotificationPreferenceKey) => {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      [key]: !currentPreferences[key],
    }));
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

      <div className="max-w-xl space-y-4">
        {NOTIFICATION_PREFERENCE_OPTIONS.map((option) => (
          <NotificationPreferenceRow
            key={option.key}
            title={option.title}
            description={option.description}
            icon={option.icon}
            isEnabled={preferences[option.key]}
            onToggle={() => handleTogglePreference(option.key)}
          />
        ))}
      </div>
    </div>
  );
}
