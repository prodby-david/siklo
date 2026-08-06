"use client";

import { User, Mail, Phone, Edit3 } from "lucide-react";
import useProfileSettings from "../hooks/useProfileSettings";
import ProfileEditSheet from "./ProfileEditSheet";
import { Button } from "@/shared/components/ui/button";

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
          className="bg-brand-accent text-white hover:bg-brand-accent-hover rounded-2xl flex items-center gap-2 text-xs font-bold px-4 py-2 cursor-pointer shadow-xs"
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
