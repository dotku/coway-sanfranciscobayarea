import { redirect } from "next/navigation";
import Link from "next/link";
import { auth0 } from "@/lib/auth0";
import { isAdmin } from "@/lib/admin";
import TeamView from "./TeamView";

export default async function TeamManagementPage() {
  const session = await auth0.getSession();

  if (!session?.user) {
    redirect("/auth/login?returnTo=/admin/team");
  }

  if (!isAdmin(session.user.email)) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-[#00A8E3] hover:text-[#0097CC] font-medium text-sm"
            >
              &larr; Dashboard
            </Link>
            <h1 className="text-xl font-bold text-[#005A7A]">
              Team Management
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{session.user.email}</span>
            <Link
              href="/"
              className="text-sm text-[#00A8E3] hover:text-[#0097CC] font-medium"
            >
              Back to Site
            </Link>
            <a
              href="/auth/logout"
              className="text-sm text-gray-500 hover:text-red-500 font-medium"
            >
              Logout
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <TeamView />
      </main>
    </div>
  );
}
