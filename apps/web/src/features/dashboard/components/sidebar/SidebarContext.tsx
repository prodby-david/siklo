"use client";

import { createContext, useContext, useState, useMemo, ReactNode } from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  const expandSidebar = () => setIsCollapsed(false);
  const collapseSidebar = () => setIsCollapsed(true);

  const value = useMemo(
    () => ({
      isCollapsed,
      toggleCollapse,
      expandSidebar,
      collapseSidebar,
    }),
    [isCollapsed]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebarContext(): SidebarContextType {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
}
