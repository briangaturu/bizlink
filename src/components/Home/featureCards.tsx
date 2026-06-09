"use client";

import { useEffect, useRef, useState } from "react";

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
];

export default function FeatureCards() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes card-rise {
          from { opacity: 0; transform: translateY(36px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .feature-card {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.10);
        }
        .feature-card:hover .feature-underline {
          transform: scaleX(1);
        }
        .feature-underline {
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className="feature-card bg-white p-6 rounded-xl shadow"
            style={{
              opacity: visible ? 1 : 0,
              animation: visible
                ? `card-rise 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.12}s both`
                : "none",
            }}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              {feature.title}
            </h3>

            {/* Animated underline on hover */}
            <div className="feature-underline h-0.5 bg-gray-200 rounded-full mb-3" />

            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}