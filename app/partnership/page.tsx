'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    location: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        businessType: '',
        location: '',
        message: ''
      });
    }, 3000);
  };

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
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
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
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
          <p className="text-lg text-white/90">
            招商合作机会
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Why Partner */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Why Partner with Coway?
              <span className="block text-xl font-normal text-gray-600 mt-2">
                为什么与Coway合作？
              </span>
            </h2>

            <div className="space-y-6">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Award-Winning Products
                    </h3>
                    <p className="text-gray-600">
                      CES 2025 Innovation Awards Honoree with proven market demand and customer satisfaction
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Competitive Margins
                    </h3>
                    <p className="text-gray-600">
                      Attractive wholesale pricing and commission structures for authorized dealers
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Comprehensive Training
                    </h3>
                    <p className="text-gray-600">
                      Product training, sales support, and marketing materials in English and Chinese
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Dedicated Support
                    </h3>
                    <p className="text-gray-600">
                      Regional support team, installation services, and customer service assistance
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Marketing Support
                    </h3>
                    <p className="text-gray-600">
                      Co-op marketing programs, promotional materials, and digital marketing resources
                    </p>
                  </div>
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
                  <h4 className="font-bold text-gray-900 mb-2">Authorized Dealer</h4>
                  <p className="text-sm text-gray-700">授权经销商</p>
                  <p className="text-sm text-gray-600 mt-2">Retail & Installation</p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Distributor</h4>
                  <p className="text-sm text-gray-700">批发经销</p>
                  <p className="text-sm text-gray-600 mt-2">Wholesale Distribution</p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Service Partner</h4>
                  <p className="text-sm text-gray-700">服务合作伙伴</p>
                  <p className="text-sm text-gray-600 mt-2">Installation & Maintenance</p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Referral Partner</h4>
                  <p className="text-sm text-gray-700">推荐合作伙伴</p>
                  <p className="text-sm text-gray-600 mt-2">Commission-based Referrals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div>
            <div className="rounded-xl bg-white p-8 shadow-lg sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Partner Application
                <span className="block text-lg font-normal text-gray-600 mt-2">
                  合作申请
                </span>
              </h2>

              {submitted ? (
                <div className="rounded-lg bg-green-50 p-8 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    Application Received! 申请已收到！
                  </h3>
                  <p className="text-green-700 mb-4">
                    Thank you for your interest in partnering with Coway.
                  </p>
                  <p className="text-green-700">
                    Our partnership team will review your application and contact you within 2-3 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name * 公司名称
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#00A8E3] focus:outline-none focus:ring-2 focus:ring-[#00A8E3]"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name * 联系人
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#00A8E3] focus:outline-none focus:ring-2 focus:ring-[#00A8E3]"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email * 电子邮件
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#00A8E3] focus:outline-none focus:ring-2 focus:ring-[#00A8E3]"
                        placeholder="company@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone * 电话
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#00A8E3] focus:outline-none focus:ring-2 focus:ring-[#00A8E3]"
                        placeholder="(415) 555-1234"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Type * 业务类型
                    </label>
                    <select
                      id="businessType"
                      required
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#00A8E3] focus:outline-none focus:ring-2 focus:ring-[#00A8E3]"
                    >
                      <option value="">Select business type...</option>
                      <option value="retail">Retail Store 零售店</option>
                      <option value="distributor">Distributor 批发商</option>
                      <option value="installer">Installation Service 安装服务</option>
                      <option value="realestate">Real Estate 房地产</option>
                      <option value="other">Other 其他</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location * 所在地
                    </label>
                    <input
                      type="text"
                      id="location"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#00A8E3] focus:outline-none focus:ring-2 focus:ring-[#00A8E3]"
                      placeholder="City, State"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Tell us about your business 介绍您的业务
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#00A8E3] focus:outline-none focus:ring-2 focus:ring-[#00A8E3]"
                      placeholder="Years in business, target market, etc..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#00A8E3] px-8 py-4 text-lg font-semibold text-white hover:bg-[#0097CC] transition-all"
                  >
                    Submit Application 提交申请
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    All applications are reviewed on a case-by-case basis
                  </p>
                </form>
              )}
            </div>

            {/* Contact Alternative */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-2">
                Questions? Contact our partnership team:
              </p>
              <a href="mailto:partners@coway-bayarea.com" className="text-[#00A8E3] hover:text-[#0097CC] font-semibold">
                partners@coway-bayarea.com
              </a>
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
          <p className="text-xl text-white/90 mb-6">
            准备发展您的业务了吗？
          </p>
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
