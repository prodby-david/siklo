"use client";

import useCalculator from "../hooks/useCalculator";

export const PaluwaganCalculator = () => {
  const {
    contribution,
    setContribution,
    membersCount,
    setMembersCount,
    interval,
    setInterval,
    totalPool,
    durationText,
    simulatedTurns,
  } = useCalculator();

  return (
    <div className="w-full bg-background rounded-2xl border border-neutral-border p-6 flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold text-foreground">
          Interactive Payout Calculator
        </h3>
        <p className="text-xs text-neutral-subtext">
          Estimate savings pots, turn payouts, and cycle lengths for your group.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-semibold text-neutral-subtext">
              <span>Contribution Amount</span>
              <span className="text-brand-accent font-bold text-sm">
                ₱{contribution.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="500"
              value={contribution}
              onChange={(e) => setContribution(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-table-stripe rounded-2xl appearance-none cursor-pointer accent-brand-accent"
            />
            <div className="flex justify-between text-xs text-neutral-subtext">
              <span>₱500</span>
              <span>₱5,000</span>
              <span>₱10,000</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-semibold text-neutral-subtext">
              <span>Number of Members</span>
              <span className="text-brand-accent font-bold text-sm">
                {membersCount} members
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="15"
              step="1"
              value={membersCount}
              onChange={(e) => setMembersCount(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-table-stripe rounded-2xl appearance-none cursor-pointer accent-brand-accent"
            />
            <div className="flex justify-between text-xs text-neutral-subtext">
              <span>4 members</span>
              <span>10 members</span>
              <span>15 members</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-neutral-subtext">
              Contribution Frequency
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(["weekly", "semi-monthly", "monthly"] as const).map((freq) => (
                <button
                  key={freq}
                  onClick={() => setInterval(freq)}
                  className={`py-1.5 text-xs font-semibold border rounded-2xl ${
                    interval === freq
                      ? "bg-brand-accent/10 border-brand-accent text-brand-accent"
                      : "bg-background border-neutral-border text-neutral-subtext hover:bg-neutral-table-stripe"
                  }`}
                >
                  {freq === "semi-monthly"
                    ? "Semi-Monthly"
                    : freq.charAt(0).toUpperCase() + freq.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-neutral-table-stripe/50 p-4 border border-neutral-border">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-neutral-subtext">
                Total Payout per Turn
              </span>
              <span className="text-xl font-bold text-foreground mt-0.5">
                ₱{totalPool.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-neutral-subtext">
                Total Cycle Duration
              </span>
              <span className="text-sm font-bold text-foreground mt-1">
                {durationText}
              </span>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-1.5">
            <span className="text-xs font-bold text-neutral-subtext">
              Estimated Payout Schedule
            </span>
            <div className="flex flex-col gap-1 max-h-36 overflow-y-auto pr-1">
              {simulatedTurns.map((turn) => (
                <div
                  key={turn.turn}
                  className="flex justify-between items-center py-1 text-xs border-b border-neutral-border/40 last:border-b-0"
                >
                  <span className="font-medium text-neutral-subtext">
                    Turn {turn.turn} Payout
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-subtext">{turn.date}</span>
                    <span className="font-bold text-brand-accent">
                      ₱{turn.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaluwaganCalculator;
