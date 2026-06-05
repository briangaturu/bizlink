const reasons = [
  {
    title: "Secure Transactions",
    description:
      "Buy and sell with confidence through a secure and reliable marketplace environment.",
  },
  {
    title: "Verified Businesses",
    description:
      "Connect with trusted sellers and businesses verified by our platform.",
  },
  {
    title: "Direct Messaging",
    description:
      "Communicate directly with sellers to negotiate prices, ask questions, and build trust.",
  },
]

export default function WhyChooseUs() {
  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Why Choose BizLink?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {reasons.map((reason) => (
          <div key={reason.title}>
            <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
            <p className="text-gray-600">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}