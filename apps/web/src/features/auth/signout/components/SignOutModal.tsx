"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { LogOut, ShieldCheck } from "lucide-react";
import Loader from "@/shared/components/loader/Loader";
import type { SignOutModalProps } from "../types/signout.types";

export default function SignOutModal({
  isOpen,
  onClose,
  onConfirm,
  isSigningOut,
}: SignOutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isSigningOut && onClose()}>
      <DialogContent className="sm:max-w-md">
        {isSigningOut && <Loader />}
        <div className="space-y-4">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-danger-bg text-danger border border-danger/20">
                <LogOut className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-foreground">
                  Sign Out of Siklo
                </DialogTitle>
                <DialogDescription>
                  <span className="text-xs text-neutral-subtext block">
                    Are you sure you want to sign out of your account?
                  </span>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="flex items-start gap-3 rounded-2xl border border-neutral-border bg-card p-3.5">
            <ShieldCheck className="h-5 w-5 shrink-0 text-brand-accent mt-0.5" />
            <p className="text-xs text-neutral-subtext leading-relaxed">
              Your Paluwagan groups, turn schedules, and ledger entries remain safely saved. You can sign back in at any time.
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSigningOut}
              className="w-full sm:w-auto rounded-2xl py-2.5 border-neutral-border text-foreground hover:bg-neutral-subtext/5 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={() => onConfirm()}
              disabled={isSigningOut}
              className="w-full sm:w-auto cursor-pointer rounded-2xl bg-danger py-2.5 text-xs font-bold text-white shadow-sm hover:bg-danger/90 active:scale-95"
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              {isSigningOut ? "Signing out..." : "Sign Out"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
