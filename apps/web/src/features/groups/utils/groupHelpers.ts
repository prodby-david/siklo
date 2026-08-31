export function getInitials(name: string): string {
  if (!name || name === "Unassigned Slot" || name === "Open Slot") return "SL";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}
