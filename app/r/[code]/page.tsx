"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface ReferrerData {
  name: string;
  referral_code: string;
  member_since: string;
  visits: number;
  signups: number;
}

export default function ReferralPage() {
  const params = useParams();
  const code = params.code as string;
  const [data, setData] = useState<ReferrerData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/referral/${code}`)
      .then((res) => {
        if (!res.ok) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((d) => {
        if (d) {
          setData(d);
          // Save referral code to localStorage
          localStorage.setItem("ref_code", code);
        }
      })
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-400 mb-2">404</p>
          <p className="text-gray-500 mb-4">Referral code not found</p>
          <Link href="/" className="text-[#00A8E3] hover:text-[#0097CC] font-medium">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
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
            <nav className="flex items-center gap-6">
              <Link
                href="/products"
                className="text-gray-700 hover:text-[#00A8E3] font-medium transition-colors hidden sm:block"
              >
                Products 产品
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-[#00A8E3] font-medium transition-colors hidden sm:block"
              >
                Contact 联系我们
              </Link>
              <a
                href="/auth/login"
                className="text-gray-700 hover:text-[#00A8E3] font-medium transition-colors"
              >
                Login
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Profile Card */}
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="rounded-xl bg-white shadow-lg overflow-hidden">
          {/* Banner */}
          <div className="bg-gradient-to-r from-[#00A8E3] to-[#005A7A] px-8 py-10 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-white">
                {data.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white">{data.name}</h1>
            <p className="text-white/70 text-sm mt-1">Coway Bay Area Partner</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 border-b border-gray-100">
            <div className="p-6 text-center border-r border-gray-100">
              <p className="text-3xl font-bold text-[#00A8E3]">
                {data.visits}
              </p>
              <p className="text-sm text-gray-500 mt-1">Page Views 访问量</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-3xl font-bold text-[#00A8E3]">
                {data.signups}
              </p>
              <p className="text-sm text-gray-500 mt-1">Team Signups 团队注册</p>
            </div>
          </div>

          {/* Info */}
          <div className="px-8 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Referral Code 推荐码</span>
              <span className="font-mono font-bold text-[#005A7A]">
                {data.referral_code}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Member Since 加入时间
              </span>
              <span className="text-sm text-gray-700">
                {new Date(data.member_since).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="px-8 pb-8 space-y-3">
            <a
              href={`/auth/login?returnTo=/complete-profile`}
              className="block w-full text-center rounded-lg bg-[#00A8E3] px-6 py-3 text-white font-semibold hover:bg-[#0097CC] transition-colors"
            >
              Join the Team 加入团队
            </a>
            <Link
              href="/products"
              className="block w-full text-center rounded-lg border border-gray-200 px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              View Products 查看产品
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
