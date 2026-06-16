"use client";

import React, { useState } from "react";
import { PaluwaganRules } from "../types/howitworks.types";
import {
  defaultPlannerRules,
  frequencyOptions,
  payoutSchemeOptions,
  gracePeriodOptions,
} from "../constants/howitworks.constants";
import { ButtonGroup, SelectField, InputField } from "./ui";

const contributionOptions = [
  { label: "₱500", value: 500 },
  { label: "₱1,000", value: 1000 },
  { label: "₱2,000", value: 2000 },
  { label: "₱5,000", value: 5000 },
] as const;

export const RulesPlanner = () => {
  const [rules, setRules] = useState<PaluwaganRules>(defaultPlannerRules);

  const updateRule = <K extends keyof PaluwaganRules>(
    key: K,
    value: PaluwaganRules[K],
  ) => {
    setRules((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="w-full bg-background rounded-lg border border-neutral-border p-6 flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold text-foreground">
          Paluwagan Rules Planner
        </h3>
        <p className="text-xs text-neutral-subtext">
          Configure rules, penalties, and payment details for your savings
          group.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <ButtonGroup
          label="Contribution Amount per Member"
          options={contributionOptions}
          value={rules.contributionAmount}
          columns={4}
          onChange={(value) => updateRule("contributionAmount", value)}
        />

        <ButtonGroup
          label="Contribution Frequency"
          options={frequencyOptions}
          value={rules.frequency}
          columns={3}
          onChange={(value) => updateRule("frequency", value)}
        />

        <SelectField
          label="Payout Turn Scheme"
          options={payoutSchemeOptions}
          value={rules.payoutScheme}
          onChange={(value) => updateRule("payoutScheme", value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Grace Period"
            options={gracePeriodOptions}
            value={rules.gracePeriodDays}
            onChange={(value) => updateRule("gracePeriodDays", value)}
          />

          <InputField
            label="Late Penalty (₱/Day)"
            type="number"
            value={rules.latePenalty}
            placeholder="Penalty per day"
            onChange={(value) =>
              updateRule("latePenalty", Math.max(0, Number(value)))
            }
          />
        </div>

        <InputField
          label="Payment Collection Channel"
          value={rules.paymentChannel}
          placeholder="e.g. GCash (0917xxxxxxx), Bank Transfer"
          onChange={(value) => updateRule("paymentChannel", value)}
        />
      </div>
    </div>
  );
};

export default RulesPlanner;
