import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F5]">
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
                href="#wechat"
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
            <button className="md:hidden p-2 text-gray-700">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E6F7FC] to-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#CCF0FA] px-4 py-2 text-sm font-medium text-[#00A8E3] mb-6 rounded-full">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Serving San Francisco Bay Area
              </div>

              <h1 className="text-4xl font-bold text-[#005A7A] lg:text-5xl leading-tight">
                Pure Air, Pure Water,
                <br />
                Pure Wellness
              </h1>

              <p className="mt-6 text-lg text-[#007A9C] leading-relaxed">
                Premium water filtration and air purification systems for your
                home or office. Rental & Purchase options available.
              </p>

              <p className="mt-3 text-base text-[#00A8E3]">
                为湾区家庭和办公室提供高级净水和空气净化系统 · 租赁和购买皆可
              </p>

              {/* Special Promotion Badge */}
              <div className="mt-8 inline-flex items-center gap-2 bg-[#00A8E3] px-6 py-3 text-white rounded-lg shadow-md">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">
                  Special Promotion - 免费送货安装
                </span>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 bg-[#00A8E3] px-8 py-4 text-base font-medium text-white hover:bg-[#0097CC] transition-colors rounded-lg shadow-md"
                >
                  Browse Products
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>

                <Link
                  href="/partnership"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#00A8E3] bg-white px-8 py-4 text-base font-medium text-[#00A8E3] hover:bg-[#E6F7FC] transition-colors rounded-lg"
                >
                  招商合作 Partnership
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-[#00A8E3]">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-[#00A8E3]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Free Installation
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-[#00A8E3]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Filter Service
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-[#00A8E3]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  NSF Certified
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-[#CCF0FA] p-8 rounded-2xl">
                <div className="aspect-square bg-white shadow-xl flex items-center justify-center rounded-xl overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/products/air_purifier.png"
                      alt="Coway Premium Wellness Products"
                      fill
                      className="object-contain p-8"
                    />
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 bg-white shadow-lg p-4 border border-[#00A8E3]/30 rounded-sm">
                <div className="text-xs font-semibold text-[#00A8E3] mb-1">
                  CES 2025
                </div>
                <div className="text-sm font-bold text-[#005A7A]">
                  Innovation Award
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white shadow-lg p-4 border border-[#00A8E3]/30 rounded-sm">
                <div className="text-xs font-semibold text-[#00A8E3] mb-1">
                  Bay Area
                </div>
                <div className="text-sm font-bold text-[#005A7A]">
                  Same Day Service
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#005A7A]">Our Products</h2>
            <p className="mt-3 text-lg text-[#00A8E3]">
              Complete home wellness solutions
            </p>
            <p className="mt-1 text-base text-[#00A8E3]/80">我们的产品系列</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Air Purifiers */}
            <a
              href="https://coway-usa.com/aircare"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="bg-[#E6F7FC] p-8 border-2 border-[#00A8E3]/30 hover:border-[#00A8E3] hover:shadow-lg transition-all h-full rounded-xl">
                <div className="relative w-full h-48 mb-6 bg-white rounded-lg overflow-hidden">
                  <Image
                    src="/images/products/air_purifier.png"
                    alt="Coway Air Purifier"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#005A7A] mb-2">
                  Air Purifiers
                </h3>
                <p className="text-sm text-[#00A8E3] mb-3">空气净化器</p>
                <p className="text-[#007A9C] mb-4 text-sm leading-relaxed">
                  Advanced filtration capturing 99.9% of ultrafine particles as
                  small as 0.01μm
                </p>
                <ul className="space-y-2 text-sm text-[#00A8E3]">
                  <li className="flex items-start gap-2">
                    <svg
                      className="h-4 w-4 text-[#00A8E3] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Multi-filter system
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="h-4 w-4 text-[#00A8E3] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Removes allergens & pet dander
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="h-4 w-4 text-[#00A8E3] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Smart air quality monitoring
                  </li>
                </ul>
                <div className="mt-6 flex items-center gap-2 text-[#00A8E3] font-medium text-sm group-hover:gap-3 transition-all">
                  Learn More
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </a>

            {/* Water Purifiers */}
            <a
              href="https://coway-usa.com/watercare"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="bg-[#E6F7FC] p-8 border-2 border-[#00A8E3]/30 hover:border-[#00A8E3] hover:shadow-lg transition-all h-full rounded-xl">
                <div className="relative w-full h-48 mb-6 bg-white rounded-lg overflow-hidden">
                  <Image
                    src="/images/products/water_purifier.png"
                    alt="Coway Water Purifier"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#005A7A] mb-2">
                  Water Purifiers
                </h3>
                <p className="text-sm text-[#00A8E3] mb-3">净水器</p>
                <p className="text-[#007A9C] mb-4 text-sm leading-relaxed">
                  Reverse osmosis technology removing harmful microorganisms
                  from tap water
                </p>
                <ul className="space-y-2 text-sm text-[#00A8E3]">
                  <li className="flex items-start gap-2">
                    <svg
                      className="h-4 w-4 text-[#00A8E3] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    RO filtration system
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="h-4 w-4 text-[#00A8E3] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Multiple temperature settings
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="h-4 w-4 text-[#00A8E3] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    NSF & WQA certified
                  </li>
                </ul>
                <div className="mt-6 flex items-center gap-2 text-[#00A8E3] font-medium text-sm group-hover:gap-3 transition-all">
                  Learn More
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </a>

            {/* Bidets */}
            <a
              href="https://coway-usa.com/bodycare"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="bg-[#E6F7FC] p-8 border-2 border-[#00A8E3]/30 hover:border-[#00A8E3] hover:shadow-lg transition-all h-full rounded-xl">
                <div className="relative w-full h-48 mb-6 bg-white rounded-lg overflow-hidden">
                  <Image
                    src="/images/products/bidets.png"
                    alt="Coway Smart Bidet"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#005A7A] mb-2">
                  Smart Bidets
                </h3>
                <p className="text-sm text-[#00A8E3] mb-3">智能马桶盖</p>
                <p className="text-[#007A9C] mb-4 text-sm leading-relaxed">
                  Premium bidet seats with advanced features for ultimate
                  comfort and hygiene
                </p>
                <ul className="space-y-2 text-sm text-[#00A8E3]">
                  <li className="flex items-start gap-2">
                    <svg
                      className="h-4 w-4 text-[#00A8E3] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Stainless steel nozzles
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="h-4 w-4 text-[#00A8E3] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Warm water & air dryer
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="h-4 w-4 text-[#00A8E3] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Energy-saving features
                  </li>
                </ul>
                <div className="mt-6 flex items-center gap-2 text-[#00A8E3] font-medium text-sm group-hover:gap-3 transition-all">
                  Learn More
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Rental vs Purchase */}
      <section className="py-20 bg-[#E6F7FC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#005A7A]">
              Choose Your Plan
            </h2>
            <p className="mt-3 text-lg text-[#00A8E3]">
              Flexible options to fit your needs
            </p>
            <p className="mt-1 text-base text-[#00A8E3]/80">选择适合您的方案</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Rental Option */}
            <div className="bg-white p-8 border-2 border-[#00A8E3]/30 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#005A7A] mb-2">
                  Rental Service
                </h3>
                <p className="text-sm text-[#00A8E3]">租赁服务</p>
              </div>

              <div className="mb-6">
                <div className="text-2xl font-bold text-[#005A7A] mb-1">
                  Starting from $29.99/month
                </div>
                <p className="text-[#00A8E3]">
                  Low monthly payment with full service included
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-[#00A8E3] flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium text-[#005A7A]">
                      Free Installation & Delivery
                    </h4>
                    <p className="text-sm text-[#00A8E3]">免费送货和安装</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-[#00A8E3] flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium text-[#005A7A]">
                      Coway Heart Service
                    </h4>
                    <p className="text-sm text-[#00A8E3]">
                      Regular filter replacement & maintenance included
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-[#00A8E3] flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium text-[#005A7A]">
                      No Long-Term Commitment
                    </h4>
                    <p className="text-sm text-[#00A8E3]">
                      Flexible rental terms
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="block w-full bg-[#00A8E3] px-8 py-3 text-center text-base font-medium text-white hover:bg-[#0097CC] transition-colors rounded-lg shadow-md"
              >
                Start Rental 开始租赁
              </Link>
            </div>

            {/* Purchase Option */}
            <div className="bg-white p-8 border-2 border-[#00A8E3]/30 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#005A7A] mb-2">
                  Purchase
                </h3>
                <p className="text-sm text-[#00A8E3]">购买</p>
              </div>

              <div className="mb-6">
                <div className="text-2xl font-bold text-[#005A7A] mb-1">
                  Special Pricing Available
                </div>
                <p className="text-[#00A8E3]">
                  Own your Coway product with exclusive Bay Area discounts
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-[#00A8E3] flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium text-[#005A7A]">
                      Free Installation
                    </h4>
                    <p className="text-sm text-[#00A8E3]">免费安装</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-[#00A8E3] flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium text-[#005A7A]">
                      Own Your Product
                    </h4>
                    <p className="text-sm text-[#00A8E3]">
                      One-time payment, lifetime ownership
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-[#00A8E3] flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium text-[#005A7A]">
                      Extended Warranty Available
                    </h4>
                    <p className="text-sm text-[#00A8E3]">
                      Additional protection options
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="block w-full bg-[#00A8E3] px-8 py-3 text-center text-base font-medium text-white hover:bg-[#0097CC] transition-colors rounded-lg shadow-md"
                >
                  Get Pricing 获取报价
                </Link>
                <a
                  href="https://cowaymega.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-base font-medium text-[#00A8E3] bg-white border-2 border-[#00A8E3]/50 hover:border-[#00A8E3] hover:bg-[#E6F7FC] transition-colors rounded-lg"
                >
                  Retail Purchase 零售购买
                </a>
              </div>
            </div>
          </div>

          {/* Additional Benefits Banner */}
          <div className="mt-8 bg-white border-2 border-[#00A8E3]/30 p-8 text-center rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-[#005A7A] mb-6">
              Limited Time Bay Area Promotion
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-3xl mb-2">🚚</div>
                <h4 className="font-semibold text-[#005A7A] mb-1">
                  Free Delivery
                </h4>
                <p className="text-sm text-[#00A8E3]">免费送货</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🔧</div>
                <h4 className="font-semibold text-[#005A7A] mb-1">
                  Free Installation
                </h4>
                <p className="text-sm text-[#00A8E3]">免费安装</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Coway */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose Coway
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              Trusted by millions worldwide
            </p>
            <p className="mt-1 text-base text-gray-600">为什么选择Coway</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 border border-gray-200 text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Award-Winning
              </h3>
              <p className="text-sm text-gray-600 mb-2">屡获殊荣</p>
              <p className="text-sm text-gray-600">
                CES 2025 Innovation Awards Honoree
              </p>
            </div>

            <div className="bg-white p-6 border border-gray-200 text-center">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Coway Heart Service
              </h3>
              <p className="text-sm text-gray-600 mb-2">全方位服务</p>
              <p className="text-sm text-gray-600">
                Regular maintenance & filter replacement included
              </p>
            </div>

            <div className="bg-white p-6 border border-gray-200 text-center">
              <div className="text-5xl mb-4">🔬</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Certified Quality
              </h3>
              <p className="text-sm text-gray-600 mb-2">认证品质</p>
              <p className="text-sm text-gray-600">
                NSF & WQA certified products
              </p>
            </div>

            <div className="bg-white p-6 border border-gray-200 text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Local Support
              </h3>
              <p className="text-sm text-gray-600 mb-2">本地支持</p>
              <p className="text-sm text-gray-600">
                Same-day service across the Bay Area
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us - WeChat */}
      <section id="wechat" className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Us</h2>
            <p className="text-base text-gray-600">联系我们</p>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Address 地址
                </h3>
                <p className="text-gray-800">200 Skyline Plaza, Daly City, CA 94015</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Contact 联系人
                </h3>
                <p className="text-gray-800">Jay Lin</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Phone 电话
              </h3>
              <p className="text-gray-800">415-370-2887</p>
            </div>
          </div>
            <div className="relative w-full h-72 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                title="Coway Bay Area Location Map"
                src="https://www.google.com/maps?q=200+Skyline+Plaza,+Daly+City,+CA+94015&output=embed"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-500">
              <div className="text-center mb-3">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Product Department</h3>
                <p className="text-sm text-gray-600">产品部门</p>
              </div>
              <div className="relative w-full max-w-xs mx-auto">
                <Image
                  src="/images/contact-us/wechat-usacoway.png"
                  alt="WeChat QR Code - Product Department"
                  width={300}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-500">
              <div className="text-center mb-3">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Sales Department</h3>
                <p className="text-sm text-gray-600">销售部门</p>
              </div>
              <div className="relative w-full max-w-xs mx-auto">
                <Image
                  src="/images/contact-us/wechat-weijingjaylin.jpg"
                  alt="WeChat QR Code - Sales Department"
                  width={300}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Follow Us on Social Media
          </h2>
          <p className="text-base text-gray-600 mb-8">关注我们的社交媒体</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.xiaohongshu.com/user/profile/5e4e0ed40000000001003fa8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white border-2 border-gray-300 hover:border-[#00A8E3] px-6 py-3 rounded-lg transition-colors group"
            >
              <div className="flex h-10 w-10 items-center justify-center bg-red-100 text-red-600 rounded-lg text-xl">
                📕
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 group-hover:text-[#00A8E3]">
                  小红书
                </div>
                <div className="text-xs text-gray-600">Xiaohongshu</div>
              </div>
            </a>
            <a
              href="https://www.tiktok.com/@cowayusa8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white border-2 border-gray-300 hover:border-[#00A8E3] px-6 py-3 rounded-lg transition-colors group"
            >
              <div className="flex h-10 w-10 items-center justify-center bg-gray-100 text-gray-900 rounded-lg text-xl">
                🎵
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 group-hover:text-[#00A8E3]">
                  抖音
                </div>
                <div className="text-xs text-gray-600">TikTok</div>
              </div>
            </a>
            <a
              href="https://www.youtube.com/@Coway-SanFranciscoBayArea"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white border-2 border-gray-300 hover:border-[#00A8E3] px-6 py-3 rounded-lg transition-colors group"
            >
              <div className="flex h-10 w-10 items-center justify-center bg-red-100 text-red-600 rounded-lg text-xl">
                ▶️
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 group-hover:text-[#00A8E3]">
                  YouTube
                </div>
                <div className="text-xs text-gray-600">Coway SF Bay Area</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 border-t border-gray-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Pure Wellness?
          </h2>
          <p className="text-lg text-gray-300 mb-3">
            准备体验纯净健康的生活了吗？
          </p>
          <p className="text-base text-gray-400 mb-8">
            Contact us today for a free consultation and special Bay Area
            promotion
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white px-8 py-3 text-base font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Contact Us 联系我们
            </Link>
            <Link
              href="/partnership"
              className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Partnership 招商合作
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
