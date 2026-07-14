"use client";

import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { useSignOut } from "@/features/auth/signout/hooks/useSignOut";

export default function Sidebar() {
  const pathname = usePathname();
  const { mutateAsync: signOut } = useSignOut();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "group", label: "Groups", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col p-4 border-r border-neutral-border h-screen w-60 fixed inset-y-0 left-0 top-0 shrink-0 bg-background text-foreground">
      <div className="flex items-center justify-center gap-2 mb-6 px-2">
        <Image src={"/images/logo.svg"} width={70} height={70} alt="Logo" />
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive =
            pathname === `/${item.id}` ||
            pathname.startsWith(`/${item.id}/`) ||
            (item.id === "dashboard" && pathname === "/");
          return (
            <Link
              key={item.id}
              href={`/${item.id}`}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl font-medium transition-all duration-150 active:scale-95 cursor-pointer ${
                isActive
                  ? "bg-brand-accent text-white shadow-sm"
                  : "text-neutral-subtext hover:bg-neutral-subtext/5 hover:text-foreground"
              }`}
            >
              <IconComponent
                className={`w-5 h-5 ${isActive ? "text-white" : "text-neutral-subtext"}`}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <Button
        variant="outline"
        onClick={() => signOut()}
        className={
          "cursor-pointer hover:text-danger hover:bg-danger-bg hover:border-danger-border"
        }
      >
        <LogOut className="w-5 h-5" />
        <span className="text-xs font-medium">Sign out</span>
      </Button>
    </aside>
  );
}
