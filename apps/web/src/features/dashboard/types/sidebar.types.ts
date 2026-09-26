import { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

export interface SidebarSection {
  title: string;
  items: NavItem[];
}

export interface SidebarContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
}

export interface SidebarUnreadBadgeProps {
  unreadCount: number;
  isNotificationOpen: boolean;
}

export interface SidebarCollapsedDotProps {
  unreadCount: number;
}

export interface SidebarNavItemProps {
  item: NavItem;
  pathname: string;
  isCollapsed: boolean;
  unreadCount: number;
  isNotificationOpen: boolean;
  onOpenNotifications: () => void;
  onNavigate?: () => void;
}

export interface SidebarMobileDrawerProps {
  isOpen: boolean;
  pathname: string;
  unreadCount: number;
  onClose: () => void;
  onOpenNotifications: () => void;
  onSignOut: () => void;
}

export interface SidebarInviteItem {
  id: string;
  groupName: string;
  organizerName: string;
  type: "INVITE";
}

export interface SidebarRequestItem {
  id: string;
  groupName: string;
  status: "PENDING";
  type: "REQUEST";
}
