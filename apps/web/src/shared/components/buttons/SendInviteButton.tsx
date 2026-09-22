import { Send } from "lucide-react";

export default function SendInviteButton() {
  return (
    <button className="flex items-center gap-x-2 text-sm bg-brand-accent hover:bg-brand-accent/90 text-white px-4 py-2 rounded-lg cursor-pointer">
      <Send className="w-4 h-4" />
      <span>Send Group Invite</span>
    </button>
  );
}
