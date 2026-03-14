"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";

export default function CompleteProfilePage() {
  const { user, isLoading: userLoading } = useUser();
  const [phone, setPhone] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [status, setStatus] = useState<
    "loading" | "form" | "submitting" | "done"
  >("loading");

  // Referral code validation state
  const [referrerName, setReferrerName] = useState("");
  const [codeStatus, setCodeStatus] = useState<
    "idle" | "checking" | "valid" | "invalid"
  >("idle");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load referral code from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ref_code");
    if (saved) {
      setReferredBy(saved);
    }
  }, []);

  // Debounced referral code validation
  const validateCode = useCallback((code: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!code || code.length < 4) {
      setCodeStatus("idle");
      setReferrerName("");
      return;
    }

    setCodeStatus("checking");

    debounceRef.current = setTimeout(() => {
      fetch(`/api/referral/validate?code=${encodeURIComponent(code)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setCodeStatus("valid");
            setReferrerName(data.name);
            // Save valid code to localStorage
            localStorage.setItem("ref_code", code);
          } else {
            setCodeStatus("invalid");
            setReferrerName("");
          }
        })
        .catch(() => {
          setCodeStatus("invalid");
          setReferrerName("");
        });
    }, 500);
  }, []);

  // Validate when referredBy changes (including from localStorage)
  useEffect(() => {
    if (referredBy) {
      validateCode(referredBy);
    }
  }, [referredBy, validateCode]);

  useEffect(() => {
    if (userLoading) return;
    if (!user) {
      window.location.href = "/auth/login?returnTo=/complete-profile";
      return;
    }

    fetch("/api/team/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.exists) {
          window.location.href = "/";
        } else {
          if (data.isAdmin) setIsAdminUser(true);
          setStatus("form");
        }
      })
      .catch(() => setStatus("form"));
  }, [user, userLoading]);

  function handleCodeChange(value: string) {
    const upper = value.toUpperCase();
    setReferredBy(upper);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isAdminUser && codeStatus !== "valid") {
      setErrorMsg("Please enter a valid referral code 请输入有效的推荐码");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/team/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, referred_by: referredBy }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Failed to save");
        setStatus("form");
        return;
      }
      setReferralCode(data.referral_code);
      setStatus("done");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("form");
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
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
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-md px-4 py-20">
        {status === "done" ? (
          <div className="rounded-xl bg-white p-8 shadow-lg text-center">
            <div className="text-5xl mb-4 text-green-500">&#10003;</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome, {user?.name}!
            </h2>
            <p className="text-gray-600 mb-4">
              Your profile is complete. 您的资料已完成。
            </p>

            {referralCode && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
                <p className="text-sm text-gray-500 mb-2">
                  Your Referral Code 您的推荐码
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl font-bold tracking-wider text-[#005A7A]">
                    {referralCode}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(referralCode);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-sm px-3 py-1 rounded-md bg-[#00A8E3] text-white hover:bg-[#0097CC] transition-colors"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Share this code with friends to refer them.
                  <br />
                  分享此推荐码给朋友。
                </p>
              </div>
            )}

            <Link
              href="/"
              className="inline-block rounded-lg bg-[#00A8E3] px-6 py-3 text-white font-semibold hover:bg-[#0097CC] transition-colors"
            >
              Go to Home 返回首页
            </Link>
          </div>
        ) : (
          <div className="rounded-xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Complete Your Profile
            </h2>
            <p className="text-gray-600 mb-6">
              Please provide your details to finish signing up.
              <br />
              请填写以下信息以完成注册。
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Name 姓名
                </label>
                <p className="text-gray-900 font-medium">{user?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email 邮箱
                </label>
                <p className="text-gray-900 font-medium">{user?.email}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone 电话 <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#00A8E3] focus:ring-2 focus:ring-[#00A8E3]/20 outline-none transition-colors"
                  placeholder="(408) 555-0123"
                />
              </div>

              {!isAdminUser && <div>
                <label
                  htmlFor="referredBy"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Referral Code 推荐码 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="referredBy"
                    type="text"
                    required
                    value={referredBy}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    className={`w-full rounded-lg border px-4 py-2.5 pr-10 text-gray-900 tracking-wider outline-none transition-colors ${
                      codeStatus === "valid"
                        ? "border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        : codeStatus === "invalid"
                          ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                          : "border-gray-300 focus:border-[#00A8E3] focus:ring-2 focus:ring-[#00A8E3]/20"
                    }`}
                    placeholder="e.g. JY111200"
                  />
                  {/* Status indicator */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {codeStatus === "checking" && (
                      <svg
                        className="h-5 w-5 text-gray-400 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    )}
                    {codeStatus === "valid" && (
                      <svg
                        className="h-5 w-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                    {codeStatus === "invalid" && (
                      <svg
                        className="h-5 w-5 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                {/* Validation feedback */}
                {codeStatus === "valid" && referrerName && (
                  <p className="text-xs text-green-600 mt-1">
                    Referred by: {referrerName} 推荐人: {referrerName}
                  </p>
                )}
                {codeStatus === "invalid" && (
                  <p className="text-xs text-red-500 mt-1">
                    Invalid referral code 推荐码无效
                  </p>
                )}
                {codeStatus === "idle" && (
                  <p className="text-xs text-gray-400 mt-1">
                    Enter the referral code from your inviter.
                    请输入邀请人的推荐码。
                  </p>
                )}
              </div>}

              {errorMsg && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting" || (!isAdminUser && codeStatus !== "valid")}
                className="w-full rounded-lg bg-[#00A8E3] px-6 py-3 text-white font-semibold hover:bg-[#0097CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting"
                  ? "Saving..."
                  : "Complete Registration 完成注册"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
