"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, X, Save } from "lucide-react";
import { Input, ContactNumberInput } from "@/shared/components/inputs";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UserProfileSettingDTO } from "@siklo/shared-schemas";
import { Button } from "@/shared/components/ui/button";

interface ProfileEditSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<UserProfileSettingDTO>;
  errors: FieldErrors<UserProfileSettingDTO>;
  isSubmitting: boolean;
}

export default function ProfileEditSheet({
  isOpen,
  onClose,
  onSubmit,
  register,
  errors,
  isSubmitting,
}: ProfileEditSheetProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="relative z-10 w-full sm:w-[460px] h-full bg-background border-l border-neutral-border shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-neutral-border/60 bg-background/95 sticky top-0 z-20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-accent/15 text-brand-accent flex items-center justify-center border border-brand-accent/20">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-foreground">Edit Profile</h3>
                  <p className="text-xs text-neutral-subtext">Update your personal account details</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-neutral-subtext hover:text-foreground hover:bg-neutral-subtext/10 transition-colors cursor-pointer"
                aria-label="Close edit drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="flex-1 flex flex-col justify-between p-5 sm:p-6 overflow-y-auto no-scrollbar space-y-6">
              <div className="space-y-4">
                <Input
                  id="name"
                  label="name"
                  errors={errors}
                  labelText="Full Name"
                  type="text"
                  {...register("name")}
                  icon={<User className="w-4 h-4" />}
                />

                <Input
                  id="email"
                  label="email"
                  errors={errors}
                  labelText="Email Address"
                  type="email"
                  {...register("email")}
                  icon={<Mail className="w-4 h-4" />}
                />

                <ContactNumberInput
                  id="contact"
                  label="contactNumber"
                  errors={errors}
                  labelText="Contact Number"
                  type="text"
                  {...register("contactNumber")}
                  icon={<Phone className="w-4 h-4" />}
                />
              </div>

              <div className="pt-4 border-t border-neutral-border/60 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="rounded-2xl cursor-pointer"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-accent text-white hover:bg-brand-accent-hover rounded-2xl flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmitting ? "Saving..." : "Save Changes"}</span>
                </Button>
              </div>
            </form>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
