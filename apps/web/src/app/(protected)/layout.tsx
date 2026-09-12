"use client";

import type { ReactNode } from "react";
import DashboardClientLayout from "@/features/dashboard/layout/DashboardClientLayout";
import { useAuthGuard } from "@/features/auth/shared/hooks/useAuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isAuthenticated } = useAuthGuard();

  if (!isAuthenticated) return null;

  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
