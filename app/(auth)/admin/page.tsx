import { redirect } from "next/navigation";
import Link from "next/link";
import { auth0 } from "@/lib/auth0";
import { isAdmin } from "@/lib/admin";

export default async function AdminPage() {
  const session = await auth0.getSession();

  if (!session?.user) {
    redirect("/auth/login?returnTo=/admin");
  }

  if (!isAdmin(session.user.email)) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#005A7A]">
            Admin Dashboard
          </h1>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/team"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-[#00A8E3] transition-colors block"
          >
            <h2 className="text-lg font-semibold text-[#005A7A] mb-2">
              Team Management
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Manage team members and roles
            </p>
            <span className="text-sm text-[#00A8E3] font-medium">
              View Members &rarr;
            </span>
          </Link>

          <Link
            href="/admin/tree"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-[#00A8E3] transition-colors block"
          >
            <h2 className="text-lg font-semibold text-[#005A7A] mb-2">
              Referral Tree
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              View referral hierarchy and stats
            </p>
            <span className="text-sm text-[#00A8E3] font-medium">
              View Tree &rarr;
            </span>
          </Link>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-[#005A7A] mb-2">
              Orders
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              View and manage customer orders
            </p>
            <span className="text-xs text-gray-400">Coming soon</span>
          </div>
        </div>
      </main>
    </div>
  );
}
