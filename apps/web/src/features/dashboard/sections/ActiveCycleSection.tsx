import ViewAllButton from "@/shared/components/buttons/ViewAll";

export default function ActiveCycleSection() {
  return (
    <div className="flex flex-col gap-5 mt-3">
      <div className="flex items-center justify-between">
        <h2 className="text-md font-semibold">Active groups</h2>
        <ViewAllButton href="/group" />
      </div>
    </div>
  );
}
