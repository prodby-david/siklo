"use client";

import { Inter } from "next/font/google";
import DashboardSidebar from "@/features/dashboard/components/sidebar/DashboardSidebar";
import DashboardMobileHeader from "@/features/dashboard/components/sidebar/DashboardMobileHeader";
import { SidebarProvider } from "@/features/dashboard/components/sidebar/SidebarContext";

const inter = Inter({
  subsets: ["latin"],
});

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} bg-background min-h-screen flex flex-col`}>
      <DashboardMobileHeader />
      <div className="flex flex-1 w-full">
        <DashboardSidebar />
        <div className="flex-1 min-h-screen w-full pl-0 md:pl-60 transition-all duration-300">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}
