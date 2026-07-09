"use client";

import SigninCard from "@/features/auth/signin/ui/SigninCard";

export default function SigninPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-table-stripe/50 px-4 relative overflow-hidden py-12">
      <div className="relative z-10 w-full flex justify-center">
        <SigninCard />
      </div>
    </div>
  );
}
