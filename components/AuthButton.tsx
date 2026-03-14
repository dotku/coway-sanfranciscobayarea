"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { isAdmin } from "@/lib/admin";

export default function AuthButton() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <span className="text-gray-400 text-sm font-medium w-[100px] text-center">
        ...
      </span>
    );
  }

  if (user) {
    const admin = isAdmin(user.email);
    return (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-[#E6F7FC] text-[#005A7A] flex items-center justify-center font-bold text-sm flex-shrink-0">
          {(user.name || user.email || "U").charAt(0).toUpperCase()}
        </div>
        <Link
          href="/dashboard"
          className="text-[#00A8E3] hover:text-[#0097CC] text-sm font-medium transition-colors"
        >
          Dashboard
        </Link>
        {admin && (
          <Link
            href="/admin"
            className="text-[#00A8E3] hover:text-[#0097CC] text-sm font-medium transition-colors"
          >
            Admin
          </Link>
        )}
        <a
          href="/auth/logout"
          className="text-gray-500 hover:text-red-500 text-sm font-medium transition-colors"
        >
          Logout
        </a>
      </div>
    );
  }

  return (
    <a
      href="/auth/login"
      className="text-gray-700 hover:text-[#00A8E3] font-medium transition-colors inline-block text-center"
    >
      Login
    </a>
  );
}
