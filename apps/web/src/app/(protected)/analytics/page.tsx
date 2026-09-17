import AnalyticsUI from "@/features/analytics/ui/AnalyticsUI";

export default function AnalyticsPage() {
  return (
    <main className="flex-1 bg-neutral-subtext/5 p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <AnalyticsUI />
      </div>
    </main>
  );
}

