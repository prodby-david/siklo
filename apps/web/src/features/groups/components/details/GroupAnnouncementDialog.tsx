"use client";

import { useState, FormEvent } from "react";
import { Megaphone, X, Loader2, Send } from "lucide-react";
import { useSendAnnouncement } from "../../hooks/useSendAnnouncement";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/shared/utils/error.helper";
import { GroupAnnouncementDialogProps } from "@/features/groups/types/group.types";
import Loader from "@/shared/components/loader/Loader";

export default function GroupAnnouncementDialog({
  groupId,
}: GroupAnnouncementDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { mutateAsync: sendAnnouncement, isPending } =
    useSendAnnouncement(groupId);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await sendAnnouncement(message.trim());
      toast.success("Announcement posted to group!");
      setMessage("");
      setIsOpen(false);
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to send announcement"));
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-accent/30 bg-brand-accent/10 hover:bg-brand-accent/20 text-brand-accent text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
        title="Post Announcement"
      >
        <Megaphone className="w-3.5 h-3.5" />
        <span>Post Announcement</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs animate-in fade-in duration-200">
          {isPending && <Loader text="Broadcasting announcement..." />}
          <div className="bg-background border border-neutral-border rounded-3xl p-6 shadow-2xl max-w-md w-full relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-subtext/10 text-neutral-subtext transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-accent/15 text-brand-accent flex items-center justify-center border border-brand-accent/25">
                <Megaphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-foreground">
                  Post Announcement
                </h3>
                <p className="text-[10px] text-neutral-subtext">
                  Post an update to all members in this group activity feed.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">
                  Announcement Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Next round payout scheduled this Friday! Please prepare your contribution proofs."
                  className="w-full text-xs p-3 rounded-2xl border border-neutral-border bg-neutral-table-stripe/50 focus:bg-background text-foreground focus:outline-none focus:border-brand-accent resize-none transition-all placeholder:text-neutral-subtext/60"
                  disabled={isPending}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-border/60">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-border text-xs font-semibold text-neutral-subtext hover:text-foreground hover:bg-neutral-subtext/5 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending || !message.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-brand-accent-foreground text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Announcement</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
