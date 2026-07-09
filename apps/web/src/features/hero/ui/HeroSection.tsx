"use client";

import Badge from "../components/Badge";
import StatsCard from "../components/StatsCard";
import CycleVisualizer from "../components/CycleVisualizer";
import Link from "next/link";
import { HeroProps } from "../types/hero.types";

export const HeroSection = ({
  badgeText = "Paluwagan Savings Notebook",
  badgeLink = "Simple & Safe",
  title = (
    <>
      Keep track of your{" "}
      <span className="text-brand-accent font-extrabold">Paluwagan</span>{" "}
      savings group
    </>
  ),
  subtitle = "Siklo is a simple online notebook for your saving group. Easily see who has paid, who gets paid next, and keep your savings organized without any stress.",
  primaryCtaText = "Let's Get Started",
  secondaryCtaText = "How Siklo Works",
  members,
  stats,
}: HeroProps) => {
  return (
    <section className="w-full bg-background py-12 md:py-16 flex items-center ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col items-start text-left gap-5">
            <Badge text={badgeText} linkText={badgeLink} />

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {title}
            </h1>

            <p className="max-w-lg text-sm sm:text-base text-neutral-subtext leading-relaxed font-normal">
              {subtitle}
            </p>

            <div className="flex flex-row items-center gap-3 w-full sm:w-auto mt-2">
              <Link
                href="/signin"
                className="flex h-10 px-5 items-center justify-center rounded-2xl bg-brand-accent text-xs font-semibold text-white hover:bg-brand-accent-hover cursor-pointer"
              >
                {primaryCtaText}
              </Link>
              <Link
                href="/how-it-works"
                className="flex h-10 px-5 items-center justify-center rounded-2xl border border-neutral-border bg-background text-xs font-semibold text-neutral-subtext hover:bg-neutral-table-stripe cursor-pointer"
              >
                {secondaryCtaText}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-4 w-full">
            <CycleVisualizer members={members} stats={stats} />

            <div className="grid grid-cols-2 gap-4">
              <StatsCard
                title="Total Group Money"
                value="₱180,000"
                trend={{ value: "Saved Together", positive: true }}
              />
              <StatsCard
                title="Payment Status"
                value="99.4% On Time"
                trend={{ value: "Very Honest", positive: true }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
