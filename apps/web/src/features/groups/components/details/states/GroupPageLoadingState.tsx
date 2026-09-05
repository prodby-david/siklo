import Loader from "@/shared/components/loader/Loader";

export default function GroupPageLoadingState() {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-neutral-table-stripe p-6 md:p-10">
      <Loader text="Loading group details..." />
    </main>
  );
}
