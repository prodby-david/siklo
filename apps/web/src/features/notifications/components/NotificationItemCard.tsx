"use client";

import Link from "next/link";
import { Check, Trash2 } from "lucide-react";
import { NotificationItemCardProps } from "../types/notification.types";
import { getCategoryConfig } from "../utils/notification.helper";

export default function NotificationItemCard({
  item,
  onMarkAsRead,
  onDelete,
  onCloseDrawer,
}: NotificationItemCardProps) {
  const { icon: Icon, iconBg } = getCategoryConfig(item.category);

  return (
    <div
      className={`group relative flex items-start gap-3.5 p-4 rounded-2xl border transition-all duration-150 ${
        item.isRead
          ? "bg-background/60 border-neutral-border/50 opacity-75 hover:opacity-100 hover:bg-background"
          : "bg-neutral-table-stripe/80 dark:bg-neutral-table-stripe/40 border-brand-accent/30 shadow-xs"
      }`}
    >
      {!item.isRead && (
        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
      )}

      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 mt-0.5 ${iconBg}`}
      >
        <Icon className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between pr-4">
          <h4
            className={`text-xs font-bold truncate leading-snug ${
              item.isRead ? "text-foreground" : "text-foreground font-extrabold"
            }`}
          >
            {item.title}
          </h4>
        </div>

        <p className="text-[11px] text-neutral-subtext leading-relaxed line-clamp-2 font-normal">
          {item.message}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[10px] text-neutral-subtext font-medium">
            {item.createdAt}
          </span>

          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            {item.actionUrl && (
              <Link
                href={item.actionUrl}
                onClick={onCloseDrawer}
                className="text-[10px] font-bold text-brand-accent hover:underline px-2 py-0.5 rounded-md hover:bg-brand-accent/10 transition-colors mr-1"
              >
                {item.actionLabel || "View"}
              </Link>
            )}

            {!item.isRead && (
              <button
                type="button"
                onClick={() => onMarkAsRead(item.id)}
                className="p-1 rounded-lg hover:bg-neutral-subtext/10 text-neutral-subtext hover:text-brand-accent transition-colors cursor-pointer"
                title="Mark as read"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="p-1 rounded-lg hover:bg-danger/10 text-neutral-subtext hover:text-danger transition-colors cursor-pointer"
              title="Delete notification"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
