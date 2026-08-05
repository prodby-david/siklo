"use client";

import { useState } from "react";
import { BillingInterval, UsePricingViewReturn } from "../types/pricing.types";

export default function usePricingView(): UsePricingViewReturn {
  const [interval, setInterval] = useState<BillingInterval>("MONTHLY");

  const toggleInterval = () => {
    setInterval((prev) => (prev === "MONTHLY" ? "YEARLY" : "MONTHLY"));
  };

  return {
    interval,
    setInterval,
    toggleInterval,
  };
}
