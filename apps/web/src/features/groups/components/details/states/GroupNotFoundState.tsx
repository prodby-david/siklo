import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GroupNotFoundState() {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-neutral-table-stripe p-6 md:p-10">
      <div className="max-w-md space-y-3 rounded-2xl border border-neutral-border bg-card p-8 text-center shadow-sm">
        <p className="text-lg font-bold text-foreground">Group not found</p>
        <p className="text-sm text-neutral-subtext">
          The group you are looking for does not exist or you do not have
          permission to view it.
        </p>
        <Link
          href="/group"
          className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-brand-accent px-4 py-2.5 text-sm font-semibold text-brand-accent-foreground shadow-sm transition-colors hover:bg-brand-accent-hover active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
