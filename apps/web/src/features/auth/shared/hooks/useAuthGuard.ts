"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/shared/lib/axios";

export function useAuthGuard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    api
      .get("/users/me")
      .then(() => setIsAuthenticated(true))
      .catch(() => router.push("/signin"));
  }, [router]);

  return { isAuthenticated };
}
