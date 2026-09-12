import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

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
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  amount?: number;
  time: string;
  type: "payment" | "payout" | "system";
}

export interface ComparisonItem {
  text: string;
  icon: ReactNode;
}

export interface ComparisonCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  items: ComparisonItem[];
  variant: "drawback" | "advantage";
  direction: number;
  rotation: number;
}

export interface ShowcaseTurnCardProps {
  member: Member;
  isSelected: boolean;
  onSelect: (turn: number) => void;
}

export interface ShowcaseMemberDetailProps {
  member: Member;
}

export interface BadgeProps {
  text: string;
  linkText?: string;
  href?: string;
}

export interface FeaturePillProps {
  label: string;
}

export interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export interface TrackerItem {
  id: string;
  icon: LucideIcon;
  label: string;
  value: (stats: CycleStats) => string;
  accent: string;
  startAngle: number;
}

export interface FloatingTrackerVisualizerProps {
  members?: Member[];
  stats?: CycleStats;
}

export interface CycleVisualizerProps {
  members?: Member[];
  stats?: CycleStats;
}
