"use client";

import Image from "next/image";
import Link from "next/link";

export default function PartnershipPage() {
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
                href="/contact"
                className="text-gray-700 hover:text-[#00A8E3] font-medium transition-colors"
              >
                Contact 联系我们
              </Link>
              <a
                href="/#wechat"
                className="inline-flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium transition-colors"
                title="WeChat: WeijingJayLin"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
                </svg>
                WeChat 微信
              </a>
              <Link
                href="/partnership"
                className="inline-flex items-center gap-2 bg-[#00A8E3] px-6 py-2 text-white hover:bg-[#0097CC] font-medium transition-colors rounded-lg"
              >
                Partnership 招商加盟
              </Link>
            </nav>

            {/* Mobile menu button */}
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

      {/* Hero */}
      <div className="bg-[#00A8E3] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">
            Partnership Opportunities
          </h1>
          <p className="text-lg text-white/90">招商合作机会</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Why Partner */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Partner with Coway?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Join a global leader in wellness technology with award-winning
              products, strong marketing support, and dedicated local service.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                <div className="text-2xl">🏆</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Proven Brand</h3>
                  <p className="text-gray-600 text-sm">
                    CES 2025 Innovation Awards Honoree products
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                <div className="text-2xl">📦</div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Product Portfolio
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Air purifiers, water purifiers, bidets, and more
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                <div className="text-2xl">🤝</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Local Support</h3>
                  <p className="text-gray-600 text-sm">
                    Bay Area installation, service, and marketing enablement
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm mt-10">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Comprehensive Training
                  </h3>
                  <p className="text-gray-600">
                    Product training, sales support, and marketing materials in
                    English and Chinese
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm mt-4">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
                  <span className="text-2xl">🤝</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Dedicated Support
                  </h3>
                  <p className="text-gray-600">
                    Regional support team, installation services, and customer
                    service assistance
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm mt-4">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Marketing Support
                  </h3>
                  <p className="text-gray-600">
                    Co-op marketing programs, promotional materials, and digital
                    marketing resources
                  </p>
                </div>
              </div>
            </div>

            {/* Partnership Types */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Partnership Models 合作模式
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Authorized Dealer
                  </h4>
                  <p className="text-sm text-gray-700">授权经销商</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Retail & Installation
                  </p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Distributor</h4>
                  <p className="text-sm text-gray-700">批发经销</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Wholesale Distribution
                  </p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Service Partner
                  </h4>
                  <p className="text-sm text-gray-700">服务合作伙伴</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Installation & Maintenance
                  </p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Referral Partner
                  </h4>
                  <p className="text-sm text-gray-700">推荐合作伙伴</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Commission-based Referrals
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Contact */}
          <div>
            <div className="rounded-xl bg-white p-8 shadow-lg sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Our Team
                <span className="block text-lg font-normal text-gray-600 mt-2">
                  微信或邮件联系
                </span>
              </h2>

              <div className="space-y-5">
                <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    WeChat 微信
                  </h3>
                  <div className="relative w-full max-w-xs mx-auto text-center">
                    <Image
                      src="/images/contact-us/wechat-weijingjaylin.jpg"
                      alt="WeChat QR - Partnership"
                      width={260}
                      height={260}
                      className="w-full h-auto rounded-lg border border-gray-200 shadow-sm"
                    />
                  </div>
                </div>

                <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Email 邮件
                  </h3>
                  <a
                    href="mailto:jay.lin@jytech.us"
                    className="text-[#00A8E3] hover:text-[#0097CC] font-semibold"
                  >
                    jay.lin@jytech.us
                  </a>
                </div>

                <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    建议提供信息
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>公司名称与城市</li>
                    <li>业务类型与覆盖区域</li>
                    <li>合作需求（分销/安装/零售等）</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-[#00A8E3] py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-6">准备发展您的业务了吗？</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-lg font-semibold text-[#00A8E3] hover:bg-gray-100 transition-colors"
            >
              View Products 查看产品
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-3 text-lg font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Contact Us 联系我们
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
