"use client";

import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import DashboardSidebar from "@/features/dashboard/components/sidebar/DashboardSidebar";
import DashboardMobileHeader from "@/features/dashboard/components/sidebar/DashboardMobileHeader";
import { NotificationProvider } from "@/features/notifications/context/NotificationContext";
import { SidebarProvider, useSidebarContext } from "@/features/dashboard/components/sidebar/SidebarContext";

const inter = Inter({
  subsets: ["latin"],
});

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebarContext();

  return (
    <div className={`${inter.className} bg-background min-h-screen flex flex-col`}>
      <DashboardMobileHeader />
      <div className="flex flex-1 w-full">
        <DashboardSidebar />
        <div
          className={`flex-1 min-h-screen w-full pl-0 transition-all duration-300 ${
            isCollapsed ? "md:pl-16" : "md:pl-60"
          }`}
        >
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
    <NotificationProvider>
      <SidebarProvider>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
        <Toaster
          richColors
          toastOptions={{
            classNames: {
              toast: "bg-brand-accent text-foreground border-neutral-border",
              success: "text-success bg-success-bg border-success/20",
              error: "text-danger bg-danger-bg border-color-danger-border",
            },
          }}
          position="bottom-right"
        />
      </SidebarProvider>
    </NotificationProvider>
  );
}
