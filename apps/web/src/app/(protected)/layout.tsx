"use client";

import { api } from "@/shared/lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardClientLayout from "@/features/dashboard/layout/DashboardClientLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    api
      .get("/users/me")
      .then(() => setChecked(true))
      .catch(() => router.push("/signin"));
  }, [router]);

  if (!checked) return null;

  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
