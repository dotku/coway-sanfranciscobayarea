"use client";

import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { usePathname } from "next/navigation";

export default function ProfileCheck() {
  const { user, isLoading } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading || !user) return;

    // Skip check on auth routes and profile completion page
    if (
      pathname.startsWith("/auth") ||
      pathname.startsWith("/complete-profile") ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/r/")
    ) {
      return;
    }

    fetch("/api/team/profile")
      .then((res) => res.json())
      .then((data) => {
        if (!data.exists) {
          window.location.href = "/complete-profile";
        }
      })
      .catch(() => {});
  }, [user, isLoading, pathname]);

  return null;
}
