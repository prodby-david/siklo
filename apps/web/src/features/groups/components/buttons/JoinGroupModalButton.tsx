import { LogIn } from "lucide-react";

export default function JoinGroupModalButton() {
  return (
    <button
      type="submit"
      className="w-full text-xs flex items-center justify-center gap-2 bg-brand-accent text-background px-4 py-2.5 rounded-2xl font-semibold active:opacity-90 transition-all shadow-sm cursor-pointer mt-3"
    >
      <LogIn size={14} />
      Join Group
    </button>
  );
}
