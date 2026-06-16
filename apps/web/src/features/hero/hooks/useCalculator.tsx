"use client";

import { useState } from "react";

export default function useCalculator() {
  const [contribution, setContribution] = useState<number>(1000);
  const [membersCount, setMembersCount] = useState<number>(10);
  const [interval, setInterval] = useState<
    "weekly" | "semi-monthly" | "monthly"
  >("monthly");

  const totalPool = contribution * membersCount;

  const durationText = (() => {
    switch (interval) {
      case "weekly":
        return `${membersCount} weeks`;
      case "semi-monthly":
        return `${membersCount * 2} weeks (${membersCount} payouts)`;
      case "monthly":
        return `${membersCount} months`;
    }
  })();

  const simulatedTurns = (() => {
    const turns = [];
    const now = new Date();

    for (let i = 1; i <= membersCount; i++) {
      const payoutDate = new Date(now.getTime());
      if (interval === "weekly") {
        payoutDate.setDate(now.getDate() + (i - 1) * 7);
      } else if (interval === "semi-monthly") {
        payoutDate.setDate(now.getDate() + (i - 1) * 15);
      } else {
        payoutDate.setMonth(now.getMonth() + (i - 1));
      }

      turns.push({
        turn: i,
        amount: totalPool,
        date: payoutDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      });
    }
    return turns;
  })();

  return {
    contribution,
    setContribution,
    membersCount,
    setMembersCount,
    interval,
    setInterval,
    totalPool,
    durationText,
    simulatedTurns,
  };
}
