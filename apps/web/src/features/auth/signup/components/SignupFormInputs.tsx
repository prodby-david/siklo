"use client";

import { User, Mail, Lock, Phone } from "lucide-react";
import useSignup from "../hooks/useSignup";
import { Input, PasswordInput, ContactNumberInput } from "@/shared/components/inputs";
import SubmitButton from "./buttons/SubmitButton";
import Loader from "@/shared/components/loader/Loader";

export default function SignupFormInputs() {
  const {
    register,
    errors,
    isSubmitting,
    handleSubmit,
    isRedirecting,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useSignup();

  return (
    <>
      {(isSubmitting || isRedirecting) && (
        <Loader text="Creating your account..." />
      )}
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

          <SubmitButton
            isSubmitting={isSubmitting}
            text="Create Account"
            isRedirecting={isRedirecting}
          />
        </div>
      </form>
    </>
  );
}
