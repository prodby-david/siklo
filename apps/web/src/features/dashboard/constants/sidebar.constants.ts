import {
  LayoutDashboard,
  Users,
  Bell,
  Settings,
  Mail,
} from "lucide-react";
import { NavItem } from "../types/sidebar.types";

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "group", label: "Groups", icon: Users },
  { id: "invites", label: "Invites", icon: Mail },
  { id: "notification", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];
