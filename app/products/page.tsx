import Link from 'next/link';
import Image from 'next/image';

export default function ProductsPage() {
  const products = [
    {
      category: 'Air Purifiers',
      chinese: '空气净化器',
      items: [
        { name: 'Airmega 400', features: ['Covers up to 1,560 sq. ft.', 'HyperCaptive™ filtration', 'Smart mode auto-adjust'] },
        { name: 'Airmega 300', features: ['Covers up to 1,256 sq. ft.', 'Dual filtration system', 'Real-time air quality monitoring'] },
        { name: 'Airmega 200M', features: ['Covers up to 361 sq. ft.', 'Compact design', 'Perfect for bedrooms'] },
      ]
    },
    {
      category: 'Water Purifiers',
      chinese: '净水器',
      items: [
        { name: 'Aquamega 100', features: ['6-stage filtration', 'Hot & cold water', 'NSF certified'] },
        { name: 'Aquamega 200', features: ['RO membrane filtration', 'Alkaline water option', 'LED display'] },
        { name: 'Aquamega Countertop', features: ['Space-saving design', '4-temperature settings', 'Easy installation'] },
      ]
    },
    {
      category: 'Smart Bidets',
      chinese: '智能马桶盖',
      items: [
        { name: 'Bidet BA-13', features: ['Heated seat', 'Warm air dryer', 'Self-cleaning nozzle'] },
        { name: 'Bidet BA-08', features: ['Eco mode', 'Soft-closing lid', 'Easy DIY installation'] },
        { name: 'Bidet BA-04', features: ['Adjustable water pressure', 'Energy-efficient', 'Deodorizer'] },
      ]
    }
  ];

  const faqs = [
    {
      question: 'Can I buy or rent Coway products? 产品可以购买还是租赁？',
      answer: 'You can purchase outright or select 3/5/6 year rental plans with installation and service included. 您可以直接购买，也可以选择3/5/6年租赁方案，包含安装与维护。'
    },
    {
      question: 'Renting for 5 or 6 years needs what ID? 五六年租赁需要什么证件？',
      answer: 'A valid SSN is required for 5- or 6-year rentals. Driver license is only used when SSN is not available. 五年或六年租赁必须提供SSN，如无SSN再提供驾照。'
    },
    {
      question: 'No SSN, can I still rent? 没有SSN可以租吗？',
      answer: 'Choose the 3-year rental, pay a $200 initial payment, and provide your driver license. 如果不愿提供SSN，可选择3年租赁并支付200美元首付款，提供驾照即可。'
    },
    {
      question: 'Can a company rent under the business name? 公司能用公司名义租赁吗？',
      answer: 'Typical small businesses use the owner’s name. Large organizations (e.g., government/public companies) with >$2M revenue, 10+ years in business, and 50+ employees may apply to rent under the company after approval. 一般公司需用老板个人名义；年营收200万以上、成立10年以上、50人以上的大型/政府/上市公司可提交资料走公司名义审核。'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
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
                className="text-[#00A8E3] font-semibold transition-colors inline-block w-[150px] text-center"
              >
                Products 产品
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-[#00A8E3] font-medium transition-colors inline-block w-[150px] text-center"
              >
                Contact 联系我们
              </Link>
              <a
                href="/#wechat"
                className="inline-flex items-center justify-center gap-2 text-gray-700 hover:text-green-600 font-medium transition-colors w-[150px]"
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

      {/* Header */}
      <div className="bg-[#00A8E3] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">
            Our Products
          </h1>
          <p className="text-lg text-white/90">
            我们的产品系列
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {products.map((category) => (
            <div key={category.category}>
              <div className="mb-8 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
                <p className="text-sm text-gray-600">{category.chinese}</p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.items.map((product) => (
                  <div key={product.name} className="bg-white p-6 border border-gray-200 hover:border-[#00A8E3] transition-colors">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{product.name}</h3>
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                          <svg className="h-4 w-4 text-[#00A8E3] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-[#00A8E3] px-6 py-2 text-sm font-medium text-white hover:bg-[#0097CC] transition-colors">
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acquisition & Policy FAQ */}
      <div className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">How to Get Coway Products?</h2>
            <p className="text-base text-gray-600">购买或租赁方式与政策常见问题</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-gray-50 border border-gray-200 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Interested in Our Products?
          </h2>
          <p className="text-base text-gray-600 mb-6">
            对我们的产品感兴趣？
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#00A8E3] px-6 py-3 text-base font-medium text-white hover:bg-[#0097CC] transition-colors"
            >
              Contact Us 联系我们
            </Link>
            <Link
              href="/partnership"
              className="inline-flex items-center justify-center border-2 border-[#00A8E3] px-6 py-3 text-base font-medium text-[#00A8E3] hover:bg-[#00A8E3] hover:text-white transition-colors"
            >
              Become a Partner 成为合作伙伴
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
