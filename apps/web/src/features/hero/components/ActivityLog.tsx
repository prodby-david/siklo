"use client";

import React from "react";

import { mockActivities } from "../constants/hero.constants";

export const ActivityLog = () => {
  return (
    <div className="w-full bg-background rounded-lg border border-neutral-border p-6 flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-bold text-foreground">
          Circle Activity Feed
        </h3>
        <p className="text-xs text-neutral-subtext">
          Real-time transparency updates for your Paluwagan group.
        </p>
      </div>

      <div className="flex flex-col divide-y divide-neutral-border">
        {mockActivities.map((activity) => (
          <div
            key={activity.id}
            className="py-3 flex items-start justify-between gap-3 text-xs"
          >
            <div className="flex gap-2.5 items-start">
              <span
                className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${
                  activity.type === "payout"
                    ? "bg-brand-accent"
                    : activity.type === "payment"
                      ? "bg-success"
                      : "bg-neutral-subtext"
                }`}
              />
              <div className="flex flex-col">
                <span className="text-foreground font-normal">
                  <span className="font-semibold text-foreground">
                    {activity.user}
                  </span>{" "}
                  {activity.action}
                </span>
                {activity.amount && (
                  <span className="text-xs text-neutral-subtext font-semibold mt-0.5">
                    Amount: ₱{activity.amount.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <span className="text-xs text-neutral-subtext shrink-0 self-start">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
