import { formatDistanceToNow } from "date-fns";

export function formatRelativeDate(date: Date | string): string {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export default function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime12h(date: Date | string) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
