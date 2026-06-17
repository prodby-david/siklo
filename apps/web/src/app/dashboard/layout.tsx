import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-background">
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
      {children}
    </main>
  );
}
