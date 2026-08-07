"use client";

import SignupCard from "@/features/auth/signup/ui/SignupCard";
import Navbar from "@/shared/components/nav/Navbar";
import Footer from "@/shared/components/footer/Footer";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-clip">
      <Navbar />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#30363d_1px,transparent_1px)] [background-size:16px_16px] z-0" />
      <main className="flex-1 flex flex-col w-full items-center justify-center relative overflow-hidden py-4 px-4 sm:px-6 lg:px-8">

        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center my-auto">
          <SignupCard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
