"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Activity } from "lucide-react";
import GroupActivityLogs from "@/features/groups/components/details/GroupActivityLogs";
import { useGroupDetails } from "@/features/groups/hooks/useGroupDetails";
import Loader from "@/shared/components/loader/Loader";

export default function GroupLogsPage() {
  const params = useParams();
  const groupId = typeof params.groupId === "string" ? params.groupId : "";
  const { data, isLoading } = useGroupDetails();

  if (isLoading) {
    return (
      <main className="flex-1 bg-neutral-subtext/5 p-6 md:p-10 min-h-screen flex items-center justify-center">
        <Loader text="Loading group activity logs..." />
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex-1 bg-neutral-subtext/5 p-6 md:p-10 min-h-screen flex items-center justify-center">
        <p className="text-sm font-semibold text-neutral-subtext">
          Group not found
        </p>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-neutral-subtext/5 p-6 md:p-10 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href={`/group/${groupId}`}
            className="p-2 rounded-2xl hover:bg-neutral-subtext/10 text-neutral-subtext hover:text-foreground transition-all duration-150 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-accent" />
            <h1 className="text-xl font-bold text-foreground">
              Detailed Activity Logs
            </h1>
          </div>
        </div>

        <GroupActivityLogs
          group={data}
          memberships={data.memberships}
        />
      </div>
    </main>
  );
}
