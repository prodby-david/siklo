"use client";

import SignupCard from "@/features/auth/signup/ui/SignupCard";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-table-stripe/50 px-4 py-12">
      <div className="relative z-10 w-full flex justify-center">
        <SignupCard />
      </div>
    </div>
  );
}
