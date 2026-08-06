"use client";

import { Bell, CheckCheck, X } from "lucide-react";
import { NotificationFilter } from "../types/notification.types";
import { NOTIFICATION_FILTERS } from "../constants/notification.constants";

interface NotificationHeaderProps {
  unreadCount: number;
  filter: NotificationFilter;
  setFilter: (filter: NotificationFilter) => void;
  onMarkAllAsRead: () => void;
  onClose: () => void;
}

export default function NotificationHeader({
  unreadCount,
  filter,
  setFilter,
  onMarkAllAsRead,
  onClose,
}: NotificationHeaderProps) {
  return (
    <div className="flex flex-col gap-4 p-5 sm:p-6 border-b border-neutral-border/60 bg-background/95 sticky top-0 z-20 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-brand-accent/15 text-brand-accent flex items-center justify-center border border-brand-accent/20">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-foreground">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="rounded-full bg-brand-accent text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                  {unreadCount} New
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-subtext">
              Stay updated on your savings group activities
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-neutral-subtext text-foreground hover:text-brand-accent bg-neutral-subtext/10 transition-colors cursor-pointer"
            aria-label="Close notifications drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {NOTIFICATION_FILTERS.map((tab) => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-brand-accent text-white shadow-xs"
                  : "bg-neutral-table-stripe hover:bg-neutral-subtext/10 text-neutral-subtext hover:text-foreground border border-neutral-border/40"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
