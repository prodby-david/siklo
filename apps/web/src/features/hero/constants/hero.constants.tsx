import React from "react";
import {
  FileSpreadsheet,
  EyeOff,
  FileX,
  BellOff,
  CalendarX,
  Banknote,
  MessageSquareOff,
  Zap,
  Eye,
  ShieldCheck,
  Tag,
  CalendarCheck,
  Wallet,
  MessageSquare,
  Scale,
  UserCheck,
  FileCheck,
  History,
  Lock,
} from "lucide-react";
import type { ActivityItem, ComparisonItem, TrackerItem } from "../types/hero.types";

export const mockActivities: ActivityItem[] = [
  {
    id: "1",
    user: "Alex Santos",
    action: "received the payout pool",
    amount: 30000,
    time: "2 hours ago",
    type: "payout",
  },
  {
    id: "2",
    user: "David Gaspar",
    action: "paid contribution for Round 3",
    amount: 5000,
    time: "4 hours ago",
    type: "payment",
  },
  {
    id: "3",
    user: "Jane Cruz",
    action: "paid contribution for Round 3",
    amount: 5000,
    time: "1 day ago",
    type: "payment",
  },
  {
    id: "4",
    user: "System Log",
    action: "started Round 3 cycle automatically",
    time: "2 days ago",
    type: "system",
  },
  {
    id: "5",
    user: "Maria Clara",
    action: "paid contribution for Round 2",
    amount: 5000,
    time: "1 week ago",
    type: "payment",
  },
];

export const TRADITIONAL_DRAWBACKS: ComparisonItem[] = [
  {
    text: "Manual math errors in turn calculations",
    icon: <FileSpreadsheet className="h-4 w-4 text-danger shrink-0 mt-0.5" />,
  },
  {
    text: "Zero real-time visibility for group members",
    icon: <EyeOff className="h-4 w-4 text-danger shrink-0 mt-0.5" />,
  },
  {
    text: "Risk of lost, damaged, or altered paper pages",
    icon: <FileX className="h-4 w-4 text-danger shrink-0 mt-0.5" />,
  },
  {
    text: "Awkward payment reminders & missing logs",
    icon: <BellOff className="h-4 w-4 text-danger shrink-0 mt-0.5" />,
  },
  {
    text: "Disputed payout schedules & unclear turn sequence",
    icon: <CalendarX className="h-4 w-4 text-danger shrink-0 mt-0.5" />,
  },
  {
    text: "Cash handling stress & untracked physical receipts",
    icon: <Banknote className="h-4 w-4 text-danger shrink-0 mt-0.5" />,
  },
  {
    text: "No central group communication or updates",
    icon: <MessageSquareOff className="h-4 w-4 text-danger shrink-0 mt-0.5" />,
  },
];

export const SIKLO_ADVANTAGES: ComparisonItem[] = [
  {
    text: "100% automated turn schedule & lump sum payout math",
    icon: <Zap className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />,
  },
  {
    text: "Live shared ledger accessible to all members 24/7",
    icon: <Eye className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />,
  },
  {
    text: "Encrypted cloud backups with unalterable audit trails",
    icon: <ShieldCheck className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />,
  },
  {
    text: "Instant payment status tags & clear rotation visibility",
    icon: <Tag className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />,
  },
  {
    text: "Pre-calculated turn rotation & transparent payout calendar",
    icon: <CalendarCheck className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />,
  },
  {
    text: "Mobile wallet friendly & digital proof logs",
    icon: <Wallet className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />,
  },
  {
    text: "Built-in activity logs & instant activity notifications",
    icon: <MessageSquare className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />,
  },
];

export const TRACKER_ITEMS: TrackerItem[] = [
  {
    id: "shared-transparency",
    icon: Eye,
    label: "Shared Transparency",
    value: () => "100% Open Ledger",
    accent: "text-brand-accent",
    startAngle: 0,
  },
  {
    id: "fair-rotation",
    icon: Scale,
    label: "Fair Rotation",
    value: () => "Equal Turn Order",
    accent: "text-brand-accent",
    startAngle: 60,
  },
  {
    id: "trusted-members",
    icon: UserCheck,
    label: "Trusted Members",
    value: (stats) => `${stats.activeMembersCount} in Circle`,
    accent: "text-brand-accent",
    startAngle: 120,
  },
  {
    id: "payment-proof",
    icon: FileCheck,
    label: "Payment Proof",
    value: () => "Receipt Verified",
    accent: "text-brand-accent",
    startAngle: 180,
  },
  {
    id: "audit-trail",
    icon: History,
    label: "Audit Trail",
    value: () => "Real-Time Logs",
    accent: "text-brand-accent",
    startAngle: 240,
  },
  {
    id: "private-circle",
    icon: Lock,
    label: "Private Circle",
    value: () => "Invite-Only Access",
    accent: "text-brand-accent",
    startAngle: 300,
  },
];
