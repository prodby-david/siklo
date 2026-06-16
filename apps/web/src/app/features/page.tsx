import React from "react";
import Navbar from "@/shared/components/nav/Navbar";
import FeaturesSection from "@/features/features/ui/FeaturesSection";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-table-stripe/20">
      <Navbar />
      <main className="flex-1 flex flex-col w-full items-center">
        <FeaturesSection />
      </main>
    </div>
  );
}
