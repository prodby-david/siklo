"use client";

import SignupInfoPanel from "../components/ui/SignupInfoPanel";
import SignUpForm from "../components/ui/SignupForm";

export default function SignupCard() {
  return (
    <div className="w-full max-w-4xl bg-background border border-neutral-border rounded-2xl shadow-sm flex flex-col md:flex-row overflow-hidden animate-fade-in">
      <SignupInfoPanel />
      <SignUpForm />
    </div>
  );
}
