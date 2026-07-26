import { Save, Ban } from "lucide-react";

type SaveButtonProps = {
  isSubmitting: boolean;
  handleCancel: () => void;
};

export default function SaveButton({
  isSubmitting,
  handleCancel,
}: SaveButtonProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        disabled={isSubmitting}
        type="submit"
        className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:hover:bg-slate-200 dark:text-slate-900 text-white rounded-2xl text-xs font-semibold active:scale-[0.98] transition-all shadow-sm cursor-pointer"
      >
        <Save className="w-4 h-4" />
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
      <button
        onClick={handleCancel}
        type="button"
        className="flex items-center gap-2 px-6 py-2.5 bg-danger hover:bg-danger/70 dark:bg-danger/50 dark:hover:bg-danger text-white rounded-2xl text-xs font-semibold active:scale-[0.98] transition-all shadow-sm cursor-pointer"
      >
        <Ban className="w-4 h-4" />
        <span>Cancel</span>
      </button>
    </div>
  );
}
