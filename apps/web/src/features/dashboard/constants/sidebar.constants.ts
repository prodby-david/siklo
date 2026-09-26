import {
  LayoutDashboard,
  Users,
  Bell,
  Settings,
  Mail,
  LifeBuoy,
  MessageSquare,
} from "lucide-react";
import { NavItem, SidebarSection } from "../types/sidebar.types";

export const MAIN_NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "group", label: "Groups", icon: Users },
  { id: "invites", label: "Invites", icon: Mail },
];

export const CUSTOMER_SERVICE_NAV_ITEMS: NavItem[] = [
  { id: "assistance", label: "Assistance", icon: LifeBuoy },
  { id: "chat", label: "Chat with Siklo", icon: MessageSquare, badge: "PREMIUM" },
];

export const SYSTEM_NAV_ITEMS: NavItem[] = [
  { id: "notification", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: "Main",
    items: MAIN_NAV_ITEMS,
  },
  {
    title: "Customer Service",
    items: CUSTOMER_SERVICE_NAV_ITEMS,
  },
  {
    title: "Preferences",
    items: SYSTEM_NAV_ITEMS,
  },
];

export const NAV_ITEMS: NavItem[] = [
  ...MAIN_NAV_ITEMS,
  ...CUSTOMER_SERVICE_NAV_ITEMS,
  ...SYSTEM_NAV_ITEMS,
];
