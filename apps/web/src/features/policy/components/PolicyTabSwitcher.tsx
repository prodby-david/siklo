import { ShieldCheck, FileText } from "lucide-react";
import { PolicyTab } from "../types/policy.types";

type PolicyTabSwitcherProps = {
  activeTab: PolicyTab;
  onTabChange: (tab: PolicyTab) => void;
};

export default function PolicyTabSwitcher({
  activeTab,
  onTabChange,
}: PolicyTabSwitcherProps) {
  return (
    <div className="flex gap-2 p-1 bg-neutral-table-stripe rounded-2xl">
      <button
        onClick={() => onTabChange("privacy")}
        className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-2xl transition-all cursor-pointer ${
          activeTab === "privacy"
            ? "bg-brand-accent text-white shadow-sm"
            : "text-neutral-subtext hover:text-foreground hover:bg-neutral-border/30"
        }`}
      >
        <ShieldCheck className="w-4 h-4" />
        Privacy Policy
      </button>
      <button
        onClick={() => onTabChange("terms")}
        className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-2xl transition-all cursor-pointer ${
          activeTab === "terms"
            ? "bg-brand-accent text-white shadow-sm"
            : "text-neutral-subtext hover:text-foreground hover:bg-neutral-border/30"
        }`}
      >
        <FileText className="w-4 h-4" />
        Terms of Service
      </button>
    </div>
  );
}
