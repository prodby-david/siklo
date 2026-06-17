"use client";

import { useState } from "react";
import { User, Mail, Lock, Phone } from "lucide-react";
import useSignup from "../hooks/useSignup";
import Input from "./ui/Input";
import PasswordInput from "./ui/PasswordInput";
import ContactNumberInput from "./ui/ContactNumberInput";
import Submit from "./buttons/SubmitButton";

export default function SignupForm() {
  const { register, errors, isSubmitting, handleSubmit } = useSignup();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-1 flex-col gap-4">
        <Input
          label="name"
          labelText="Full Name"
          placeholder="Juan Dela Cruz"
          register={register}
          errors={errors}
          icon={<User className="h-4 w-4" />}
          type="text"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            label="email"
            labelText="Email"
            placeholder="example@email.com"
            register={register}
            errors={errors}
            icon={<Mail className="h-4 w-4" />}
            type="email"
          />

          <ContactNumberInput
            label="contactNumber"
            labelText="Contact Number"
            placeholder="09123456789"
            maxLength={11}
            register={register}
            errors={errors}
            icon={<Phone className="h-4 w-4" />}
            type="tel"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <PasswordInput
            label="password"
            labelText="Password"
            placeholder="••••••••"
            register={register}
            errors={errors}
            icon={<Lock className="h-4 w-4" />}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <PasswordInput
            label="confirmPassword"
            labelText="Confirm Password"
            placeholder="••••••••"
            register={register}
            errors={errors}
            icon={<Lock className="h-4 w-4" />}
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
          />
        </div>

        <Submit isSubmitting={isSubmitting} text="Create Account" />
      </div>
    </form>
  );
}
