import type { UIMessage } from "ai";

export function getMessageText(message: UIMessage): string {
  if (message.parts && Array.isArray(message.parts)) {
    return message.parts
      .map((part) => (part.type === "text" ? part.text : ""))
      .join("");
  }
  return "";
}
