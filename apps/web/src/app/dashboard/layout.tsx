import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClientLayout from "@/features/dashboard/layout/DashboardClientLayout";

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

  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
