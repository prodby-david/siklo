import { Loader2, Plus } from "lucide-react";

interface CreateGroupSubmitButtonProps {
  isPending: boolean;
}

export default function CreateGroupSubmitButton({
  isPending,
}: CreateGroupSubmitButtonProps) {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-neutral-border/60 pt-4">
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-brand-accent px-6 py-3 text-xs font-extrabold text-brand-accent-foreground shadow-sm transition-colors hover:bg-brand-accent-hover active:scale-95 disabled:opacity-50 sm:w-auto"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Creating Group...
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" /> Create Paluwagan Group
          </>
        )}
      </button>
    </div>
  );
}
