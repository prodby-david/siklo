import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  timeout: 30000,
  withCredentials: true,
});

const PROTECTED_ROUTE_PREFIXES = [
  "/chat",
  "/dashboard",
  "/group",
  "/settings",
];

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isProtectedRoute =
      typeof window !== "undefined" &&
      PROTECTED_ROUTE_PREFIXES.some((route) =>
        window.location.pathname === route ||
        window.location.pathname.startsWith(`${route}/`),
      );

    if (error.response?.status === 401 && isProtectedRoute) {
      window.location.replace("/signin");
    }

    return Promise.reject(error);
  },
);
