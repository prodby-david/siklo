"use client";

import { useState } from "react";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { DeleteGroupDialogProps } from "@/features/groups/types/group.types";

export default function DeleteGroupDialog({
  isDeleting,
  isStarting = false,
  onDelete,
  groupName,
}: DeleteGroupDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    onDelete();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        disabled={isDeleting || isStarting}
        className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2.5 bg-danger/10 text-danger rounded-2xl cursor-pointer hover:bg-danger/20 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Delete Group</span>
      </button>

      <Dialog open={isOpen} onOpenChange={(open) => !isDeleting && setIsOpen(open)}>
        <DialogContent className="sm:max-w-md p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-danger/10 text-danger shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <DialogHeader className="space-y-1 text-left">
                <DialogTitle className="text-base font-bold text-foreground">
                  Delete {groupName ? `"${groupName}"` : "Group"}?
                </DialogTitle>
                <DialogDescription>
                  <span className="text-xs text-neutral-subtext leading-relaxed block">
                    This action cannot be undone. This will permanently delete the group,
                    assigned member slots, and all associated activity records.
                  </span>
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="flex gap-2 pt-2 border-t border-neutral-border/60 justify-end">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-xs font-bold rounded-2xl border border-neutral-border bg-background hover:bg-neutral-subtext/5 text-foreground cursor-pointer transition-all active:scale-95 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-danger px-4 py-2 text-xs font-bold text-brand-accent-foreground transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Yes, Delete Group</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
