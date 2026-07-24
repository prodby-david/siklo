"use client";

import SigninCard from "@/features/auth/signin/ui/SigninCard";
import Navbar from "@/shared/components/nav/Navbar";
import Footer from "@/shared/components/footer/Footer";
import AmbientGlow from "@/shared/components/ui/AmbientGlow";

export default function SigninPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-clip">
      <Navbar />
      <main className="flex-1 flex flex-col w-full items-center justify-center relative overflow-hidden py-4 px-4 sm:px-6 lg:px-8">
        <AmbientGlow />

        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center my-auto">
          <SigninCard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
