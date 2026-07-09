import { LogIn } from "lucide-react";

type JoinGroupProps = {
  onClick: () => void;
};

export default function JoinGroupButton({ onClick }: JoinGroupProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-brand-accent text-background px-4 py-2.5 rounded-2xl font-semibold active:opacity-90 transition-all shadow-sm cursor-pointer"
    >
      <LogIn size={14} />
      Join Group
    </button>
  );
}
