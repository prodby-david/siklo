"use client";

import React, { useState } from "react";
import { Megaphone, X, Loader2, Send } from "lucide-react";
import { useSendAnnouncement } from "../../hooks/useSendAnnouncement";
import { toast } from "sonner";
import axios from "axios";

interface GroupAnnouncementDialogProps {
  groupId: string;
}

export default function GroupAnnouncementDialog({
  groupId,
}: GroupAnnouncementDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { mutateAsync: sendAnnouncement, isPending } =
    useSendAnnouncement(groupId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await sendAnnouncement(message.trim());
      toast.success("Announcement posted successfully!");
      setMessage("");
      setIsOpen(false);
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : err instanceof Error
        ? err.message
        : "Failed to post announcement";
      toast.error(msg);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs flex items-center justify-center gap-2 bg-brand-accent/10 hover:bg-brand-accent/20 text-brand-accent border border-brand-accent/30 px-3.5 py-2 rounded-2xl font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
      >
        <Megaphone className="w-4 h-4" /> Post Announcement
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background border border-neutral-border rounded-3xl p-6 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-neutral-border pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-brand-accent/10 text-brand-accent flex items-center justify-center border border-brand-accent/30">
                  <Megaphone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-foreground">
                    Post Group Announcement
                  </h4>
                  <p className="text-xs text-neutral-subtext">
                    Broadcast an official notice to all members live.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl border border-neutral-border hover:bg-neutral-subtext/10 text-neutral-subtext transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your official announcement here..."
                rows={4}
                required
                className="w-full p-3.5 text-xs rounded-2xl bg-neutral-table-stripe/60 border border-neutral-border focus:border-brand-accent focus:outline-none text-foreground placeholder:text-neutral-subtext resize-none"
              />

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-2xl border border-neutral-border text-neutral-subtext hover:bg-neutral-subtext/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending || !message.trim()}
                  className="px-4 py-2 text-xs font-bold rounded-2xl bg-brand-accent hover:bg-brand-accent-hover text-background flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Broadcasting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Broadcast
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
