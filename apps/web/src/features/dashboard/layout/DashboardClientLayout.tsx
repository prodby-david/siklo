import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import DashboardSidebar from "@/features/dashboard/components/sidebar/DashboardSidebar";

const inter = Inter({
  subsets: ["latin"],
});

export default function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className={`${inter.className} bg-background`}>
        <div className="flex">
          <DashboardSidebar />
          <div className="flex-1 md:pl-60 min-h-screen">{children}</div>
        </div>
      </div>
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
    </div>
  );
}
