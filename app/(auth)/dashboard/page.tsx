"use client";

import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import AddressManager from "@/components/AddressManager";

interface DashboardData {
  member: {
    name: string;
    email: string;
    phone: string;
    referral_code: string;
    referred_by: string | null;
    created_at: string;
  };
  stats: {
    visits: number;
    signups: number;
  };
  recent_visits: { visited_at: string; ip: string }[];
  referred_members: { name: string; email: string; phone: string; created_at: string }[];
}

export default function DashboardPage() {
  const { user, isLoading: userLoading } = useUser();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (userLoading) return;
    if (!user) {
      window.location.href = "/auth/login?returnTo=/dashboard";
      return;
    }

    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((d) => {
        if (d.error) return;
        setData(d);
      })
      .finally(() => setLoading(false));
  }, [user, userLoading]);

  const referralLink = data
    ? `${window.location.origin}/r/${data.member.referral_code}`
    : "";

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading || userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">
            Please complete your profile first.
          </p>
          <Link
            href="/complete-profile"
            className="text-[#00A8E3] hover:text-[#0097CC] font-medium"
          >
            Complete Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="relative h-12 w-32 flex-shrink-0">
              <Image
                src="/images/products/coway-newlogo-web.png"
                alt="Coway Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/products"
                className="text-gray-700 hover:text-[#00A8E3] font-medium transition-colors"
              >
                Products 产品
              </Link>
              <Link
                href="/dashboard"
                className="text-[#00A8E3] font-medium transition-colors"
              >
                Dashboard
              </Link>
              <AuthButton />
            </nav>

            <Link
              href="/"
              className="md:hidden inline-flex items-center gap-2 text-[#00A8E3] font-medium"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#005A7A]">
            Welcome, {data.member.name}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Member since{" "}
            {new Date(data.member.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Referral Link Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold text-[#005A7A] mb-4">
            Your Referral Link 您的推荐链接
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-mono text-sm text-gray-700 break-all">
              {referralLink}
            </div>
            <button
              onClick={() => handleCopy(referralLink)}
              className="px-5 py-3 rounded-lg bg-[#00A8E3] text-white font-medium hover:bg-[#0097CC] transition-colors whitespace-nowrap"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
          <div className="mt-3 flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Referral Code 推荐码:
            </span>
            <span className="font-mono font-bold text-[#005A7A]">
              {data.member.referral_code}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <p className="text-3xl font-bold text-[#00A8E3]">
              {data.stats.visits}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Link Visits 链接访问
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <p className="text-3xl font-bold text-[#00A8E3]">
              {data.stats.signups}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Signups 注册人数
            </p>
          </div>
        </div>

        {/* Addresses */}
        <div className="mb-6">
          <AddressManager />
        </div>

        {/* Referred Members */}
        {data.referred_members.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-[#005A7A]">
                Referred Members 推荐成员
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {data.referred_members.map((m, i) => (
                <div
                  key={i}
                  className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <p className="font-medium text-gray-900">{m.name}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <a
                        href={`mailto:${m.email}`}
                        className="text-sm text-[#00A8E3] hover:text-[#0097CC]"
                      >
                        {m.email}
                      </a>
                      <a
                        href={`tel:${m.phone}`}
                        className="text-sm text-[#00A8E3] hover:text-[#0097CC]"
                      >
                        {m.phone}
                      </a>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {new Date(m.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Visits */}
        {data.recent_visits.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-[#005A7A]">
                Recent Visits 最近访问
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {data.recent_visits.map((v, i) => (
                <div
                  key={i}
                  className="px-6 py-3 flex items-center justify-between text-sm"
                >
                  <span className="text-gray-500">
                    {new Date(v.visited_at).toLocaleString()}
                  </span>
                  <span className="text-gray-400 font-mono text-xs">
                    {v.ip || "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
