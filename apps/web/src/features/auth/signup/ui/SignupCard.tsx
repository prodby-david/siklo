"use client";

import SignupInfoPanel from "../components/ui/SignupInfoPanel";
import SignUpForm from "../components/ui/SignupForm";

export default function SignupCard() {
  return (
    <div className="w-full max-w-4xl bg-background/90 backdrop-blur-xl border border-brand-accent/20 rounded-3xl shadow-xl shadow-brand-accent/5 flex flex-col md:flex-row overflow-hidden transition-all duration-300">
      <SignupInfoPanel />
      <SignUpForm />
    </div>
  );
}

