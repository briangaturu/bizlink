const values = [
  {
    title: "Trust",
    description: "We verify every seller on our platform to ensure you connect with legitimate businesses and individuals.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Community",
    description: "BizLink is built for Kenyan businesses and buyers — a platform that understands local needs and culture.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Transparency",
    description: "No hidden fees, no payment processing. We simply connect buyers and sellers directly through open communication channels.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: "Growth",
    description: "We empower small businesses and entrepreneurs to reach more customers and grow their presence digitally.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
]

export default function About() {
  return (
    <div className="space-y-16 w-full">

      {/* Mission */}
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
        <span className="inline-block text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-4">
          Our Mission
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Connecting Kenya's Businesses <br className="hidden md:block" /> with the Right People
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          BizLink is a community-driven marketplace that makes it easy to discover, showcase,
          and connect with businesses, products, and services across Kenya — through direct
          communication channels like WhatsApp, phone, and social media, without handling
          payments or order processing.
        </p>
      </div>

      {/* Values */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div key={value.title} className="bg-white rounded-xl shadow-sm p-6">
              <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{value.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-600 rounded-2xl p-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Ready to join BizLink?</h2>
        <p className="text-primary-100 mb-6">
          Whether you're a buyer or a seller, BizLink is the place for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/browse" className="bg-white text-primary-600 font-medium px-6 py-3 rounded-lg hover:bg-primary-50 transition">
            Browse Listings
          </a>
          <a href="/register" className="border border-white text-white font-medium px-6 py-3 rounded-lg hover:bg-primary-700 transition">
            Create Account
          </a>
        </div>
      </div>

    </div>
  )
}