import type { ReactNode } from "react";

export interface Member {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  status: "paid" | "current" | "pending";
  payoutTurn: number;
  contributionAmount: number;
}

export interface CycleStats {
  totalPool: number;
  activeMembersCount: number;
  onTimeRate: number;
  nextPayoutAmount: number;
  nextPayoutDate: string;
}

export interface HeroProps {
  badgeText?: string;
  badgeLink?: string;
  title?: ReactNode;
  subtitle?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
  members?: Member[];
  stats?: CycleStats;
  enableSplashScreen?: boolean;
  splashDuration?: number;
  showOncePerSession?: boolean;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  amount?: number;
  time: string;
  type: "payment" | "payout" | "system";
}
