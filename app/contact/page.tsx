import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
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
                className="text-gray-700 hover:text-[#00A8E3] font-medium transition-colors inline-block w-[150px] text-center"
              >
                Products 产品
              </Link>
              <Link
                href="/contact"
                className="text-[#00A8E3] font-semibold transition-colors inline-block w-[150px] text-center"
              >
                Contact 联系我们
              </Link>
              <a
                href="/#wechat"
                className="inline-flex items-center justify-center gap-2 text-gray-700 hover:text-green-600 font-medium transition-colors w-[150px]"
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

      {/* Header */}
      <div className="bg-[#00A8E3] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-lg text-white/90">联系我们</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Add WeChat to Learn More
          </h2>
          <p className="text-lg text-gray-600 mb-2">添加微信了解产品信息</p>
          <p className="text-base text-gray-500">
            Scan the QR code below to add us on WeChat and inquire about our
            products
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-10">
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

        {/* Policy FAQ */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-10">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Rental & Purchase Policy FAQ
            </h3>
            <p className="text-gray-600">购买/租赁政策常见问题</p>
          </div>
          <div className="space-y-4">
            <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                产品获取方式
              </h4>
              <p className="text-sm text-gray-700">
                产品可直接购买，或选择3/5/6年租赁方案（含安装与售后维护）。
              </p>
            </div>
            <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                5/6年租赁需要什么证件？
              </h4>
              <p className="text-sm text-gray-700">
                必须提供有效SSN；若没有SSN，再提供驾照。
              </p>
            </div>
            <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                不愿提供SSN可以租吗？
              </h4>
              <p className="text-sm text-gray-700">
                可以选择3年租赁并支付200美元首付款，只需提供驾照即可。
              </p>
            </div>
            <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                公司名义租赁条件
              </h4>
              <p className="text-sm text-gray-700">
                一般公司需用老板个人名义；年营收200万以上、成立10年以上、员工50人以上的大型/政府/上市公司，可提交资料走公司审批后以公司名义租赁。
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-green-500">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Product Department
              </h3>
              <p className="text-gray-600">产品部门</p>
            </div>
            <div className="relative w-full max-w-md mx-auto">
              <Image
                src="/images/contact-us/wechat-usacoway.png"
                alt="WeChat QR Code - Product Department"
                width={500}
                height={500}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-green-500">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Sales Department
              </h3>
              <p className="text-gray-600">销售部门</p>
            </div>
            <div className="relative w-full max-w-md mx-auto">
              <Image
                src="/images/contact-us/wechat-weijingjaylin.jpg"
                alt="WeChat QR Code - Sales Department"
                width={500}
                height={500}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>

        {/* Service Area Info */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Service Area
            </h3>
            <p className="text-gray-600">服务区域</p>
          </div>
          <p className="text-center text-gray-700 text-lg">
            San Francisco, San Jose, Oakland, and surrounding Bay Area cities
          </p>
        </div>

        {/* Partnership Link */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Looking for partnership opportunities?
          </p>
          <Link
            href="/partnership"
            className="inline-flex items-center gap-2 text-[#00A8E3] hover:text-[#0097CC] font-semibold text-lg"
          >
            Visit Partnership Page 访问招商合作页面
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
        </div>
      </div>
    </div>
  );
}
