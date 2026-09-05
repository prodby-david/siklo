"use client";

import { useState } from "react";
import { User, Mail, Phone, Edit3, Fingerprint, Copy, Check } from "lucide-react";
import useProfileSettings from "../hooks/useProfileSettings";
import ProfileEditSheet from "./ProfileEditSheet";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";

export default function ProfileSettings() {
  const {
    user,
    handleSubmit,
    register,
    errors,
    isSubmitting,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
  } = useProfileSettings();
  const [copiedId, setCopiedId] = useState(false);

  const handleCopyUserId = () => {
    if (!user?.id) return;
    navigator.clipboard.writeText(user.id);
    setCopiedId(true);
    toast.success("User ID copied to clipboard!");
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-foreground">
            Profile Information
          </h3>
          <p className="text-xs text-neutral-subtext">
            View and manage your personal account details.
          </p>
        </div>

        <Button
          onClick={openDrawer}
          className="flex cursor-pointer items-center gap-2 rounded-2xl bg-brand-accent px-4 py-2 text-xs font-bold text-brand-accent-foreground shadow-xs hover:bg-brand-accent-hover"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile</span>
        </Button>
      </div>

      <div className="p-5 sm:p-6 rounded-3xl border border-neutral-border/80 bg-background/80 backdrop-blur-xl space-y-4 shadow-xs">
        <div className="flex items-center gap-4 pb-4 border-b border-neutral-border/60">
          <div className="w-12 h-12 rounded-2xl bg-brand-accent/15 text-brand-accent flex items-center justify-center font-black text-lg border border-brand-accent/20">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-6 h-6" />}
          </div>
          <div>
            <h4 className="text-base font-extrabold text-foreground">{user?.name || "Account User"}</h4>
            <p className="text-xs text-neutral-subtext">Registered Siklo Member</p>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-2.5 text-neutral-subtext">
              <Fingerprint className="w-4 h-4 text-brand-accent" />
              <span className="font-semibold">User ID</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-foreground text-[11px] bg-neutral-table-stripe px-2 py-0.5 rounded-lg border border-neutral-border/60">
                {user?.id || "—"}
              </span>
              {user?.id && (
                <button
                  type="button"
                  onClick={handleCopyUserId}
                  className="text-neutral-subtext hover:text-brand-accent p-1 rounded-lg hover:bg-neutral-subtext/10 transition-colors cursor-pointer"
                  title="Copy User ID"
                >
                  {copiedId ? (
                    <Check className="h-3.5 w-3.5 text-success" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-2.5 text-neutral-subtext">
              <Mail className="w-4 h-4 text-brand-accent" />
              <span className="font-semibold">Email Address</span>
            </div>
            <span className="font-bold text-foreground">{user?.email || "—"}</span>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-2.5 text-neutral-subtext">
              <Phone className="w-4 h-4 text-brand-accent" />
              <span className="font-semibold">Contact Number</span>
            </div>
            <span className="font-bold text-foreground">{user?.contactNumber || "—"}</span>
          </div>
        </div>
      </div>

      <ProfileEditSheet
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onSubmit={handleSubmit}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
