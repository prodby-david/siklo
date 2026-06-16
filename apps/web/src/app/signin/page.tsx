"use client";

import SigninCard from "@/features/auth/signin/ui/SigninCard";

export default function SigninPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-table-stripe/50 px-4 relative overflow-hidden py-12">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />
      <div className="relative z-10 w-full flex justify-center">
        <SigninCard />
      </div>
    </div>
  );
}
