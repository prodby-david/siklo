"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, X, Save } from "lucide-react";
import { Input, ContactNumberInput } from "@/shared/components/inputs";
import { Button } from "@/shared/components/ui/button";
import { ProfileEditSheetProps } from "../types/settings.types";

export default function profileEditSheet({
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
                  <h2 className="text-base font-extrabold text-foreground">
                    Edit Profile Details
                  </h2>
                  <p className="text-xs text-neutral-subtext">
                    Update your account name and contact number
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-neutral-subtext hover:text-foreground hover:bg-neutral-subtext/10 transition-colors cursor-pointer"
                aria-label="Close edit sheet"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={onSubmit}
              className="flex-1 flex flex-col justify-between p-5 sm:p-6 overflow-y-auto no-scrollbar"
            >
              <div className="space-y-4">
                <Input
                  label="name"
                  labelText="Full Name"
                  placeholder="Juan Dela Cruz"
                  icon={<User className="w-4 h-4 text-neutral-subtext" />}
                  {...register("name")}
                  errors={errors}
                  disabled={isSubmitting}
                />

                <Input
                  label="email"
                  labelText="Email Address"
                  placeholder="juan@example.com"
                  type="email"
                  icon={<Mail className="w-4 h-4 text-neutral-subtext" />}
                  {...register("email")}
                  errors={errors}
                  disabled={isSubmitting}
                />

                <ContactNumberInput
                  label="contactNumber"
                  labelText="Phone Number (Optional)"
                  placeholder="912 345 6789"
                  icon={<Phone className="w-4 h-4 text-neutral-subtext" />}
                  {...register("contactNumber")}
                  errors={errors}
                  disabled={isSubmitting}
                />
              </div>

              <div className="pt-6 border-t border-neutral-border/60 flex items-center justify-end gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="rounded-2xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-accent hover:bg-brand-accent-hover text-white rounded-2xl text-xs font-bold gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
