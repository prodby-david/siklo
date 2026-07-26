"use client";

import { User, Mail, Phone } from "lucide-react";
import { Input, ContactNumberInput } from "@/shared/components/inputs";
import useProfileSettings from "../hooks/useProfileSettings";
import SaveButton from "./buttons/SaveButton";
import EditProfileButton from "./buttons/EditProfile";

export default function ProfileSettings() {
  const {
    handleSubmit,
    register,
    isSubmitting,
    isAbleToEdit,
    handleEdit,
    showSaveButton,
    handleCancel,
    errors,
  } = useProfileSettings();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-foreground">
          Profile Information
        </h3>
        <p className="text-xs text-neutral-subtext">
          Update your personal details and currency preferences.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <Input
          id="name"
          label="name"
          errors={errors}
          labelText="Full Name"
          type="text"
          {...register("name")}
          disabled={!isAbleToEdit}
          icon={<User className="w-4 h-4" />}
        />

        <Input
          id="email"
          label="email"
          errors={errors}
          labelText="Email Address"
          disabled={!isAbleToEdit}
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
          disabled={!isAbleToEdit}
          icon={<Phone className="w-4 h-4" />}
        />

        <div className="pt-2 flex items-center gap-3">
          {showSaveButton && (
            <SaveButton
              isSubmitting={isSubmitting}
              handleCancel={handleCancel}
            />
          )}

          {!isAbleToEdit && <EditProfileButton handleEdit={handleEdit} />}
        </div>
      </form>
    </div>
  );
}
