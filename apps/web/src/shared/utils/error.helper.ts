import axios from "axios";

export function getApiErrorMessage(
  error: unknown,
  fallbackMessage = "An unexpected error occurred. Please try again.",
): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === "string") {
      return data;
    }
    if (data && typeof data === "object") {
      if (typeof data.message === "string") {
        return data.message;
      }
      if (Array.isArray(data.message) && data.message.length > 0) {
        return data.message.join(", ");
      }
      if (typeof data.error === "string") {
        return data.error;
      }
    }
    return error.message || fallbackMessage;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallbackMessage;
}
