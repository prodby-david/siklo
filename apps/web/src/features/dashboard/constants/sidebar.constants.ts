import {
  LayoutDashboard,
  Users,
  Mail,
  Bell,
  Settings,
} from "lucide-react";
import { NavItem } from "../types/sidebar.types";

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "group", label: "Groups", icon: Users },
  { id: "invites", label: "Invites & Requests", icon: Mail },
  { id: "notification", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];
