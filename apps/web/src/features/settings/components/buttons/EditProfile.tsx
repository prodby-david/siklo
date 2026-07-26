import { SquarePen } from "lucide-react";

export default function EditProfileButton({
  handleEdit,
}: {
  handleEdit: () => void;
}) {
  return (
    <button
      onClick={handleEdit}
      type="button"
      className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:hover:bg-slate-200 dark:text-slate-900 text-white rounded-2xl text-xs font-semibold active:scale-[0.98] transition-all shadow-sm cursor-pointer"
    >
      <SquarePen className="w-4 h-4" />
      <span>Edit Profile</span>
    </button>
  );
}
