"use client";

import Link from "next/link";
import { NotificationItem } from "../types/notification.types";
import { CreditCard, TrendingUp, Megaphone, ShieldAlert, Check, Trash2 } from "lucide-react";

interface NotificationItemCardProps {
  item: NotificationItem;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onCloseDrawer: () => void;
}

export default function NotificationItemCard({
  item,
  onMarkAsRead,
  onDelete,
  onCloseDrawer,
}: NotificationItemCardProps) {
  const getCategoryConfig = (category: NotificationItem["category"]) => {
    switch (category) {
      case "PAYMENT":
        return {
          icon: CreditCard,
          iconBg: "bg-amber-500/15 text-amber-500 border-amber-500/20",
        };
      case "PAYOUT":
        return {
          icon: TrendingUp,
          iconBg: "bg-emerald-500/15 text-emerald-500 border-emerald-500/20",
        };
      case "ANNOUNCEMENT":
        return {
          icon: Megaphone,
          iconBg: "bg-blue-500/15 text-blue-500 border-blue-500/20",
        };
      case "SYSTEM":
      default:
        return {
          icon: ShieldAlert,
          iconBg: "bg-purple-500/15 text-purple-500 border-purple-500/20",
        };
    }
  };

  const config = getCategoryConfig(item.category);
  const Icon = config.icon;

  return (
    <div
      className={`group relative p-4 rounded-2xl border transition-all duration-200 ${
        item.isRead
          ? "bg-background/60 border-neutral-border/50 text-neutral-subtext"
          : "bg-brand-accent/5 border-brand-accent/30 text-foreground shadow-xs"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 border ${config.iconBg}`}
        >
          <Icon className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0 pr-6">
          <div className="flex items-center gap-2">
            <h4
              className={`text-xs sm:text-sm font-bold truncate ${
                item.isRead ? "text-foreground/80" : "text-foreground font-extrabold"
              }`}
            >
              {item.title}
            </h4>
            {!item.isRead && (
              <span className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse shrink-0 shadow-xs" />
            )}
          </div>

          <p className="text-xs text-neutral-subtext mt-1 leading-relaxed line-clamp-2">
            {item.message}
          </p>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-border/40">
            <span className="text-[10px] font-semibold text-neutral-subtext">{item.createdAt}</span>

            <div className="flex items-center gap-2">
              {item.actionUrl && (
                <Link
                  href={item.actionUrl}
                  onClick={() => {
                    onMarkAsRead(item.id);
                    onCloseDrawer();
                  }}
                  className="text-[11px] font-bold text-brand-accent hover:underline"
                >
                  {item.actionLabel || "View"}
                </Link>
              )}

              {!item.isRead && (
                <button
                  onClick={() => onMarkAsRead(item.id)}
                  className="p-1 text-neutral-subtext hover:text-brand-accent transition-colors cursor-pointer"
                  title="Mark as read"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={() => onDelete(item.id)}
                className="p-1 text-neutral-subtext hover:text-danger transition-colors cursor-pointer"
                title="Dismiss notification"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
