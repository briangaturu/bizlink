const features = [
  {
    title: "Featured Products",
    description:
      "Explore hand-picked products from trusted sellers, including electronics, fashion, home essentials, and business equipment.",
  },
  {
    title: "Trending Categories",
    description:
      "Discover the most popular categories including smartphones, computers, furniture, beauty products, and automotive accessories.",
  },
  {
    title: "Top Sellers",
    description:
      "Connect with highly rated merchants known for quality products, fast response times, and excellent customer service.",
  },
]

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature) => (
        <div key={feature.title} className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}