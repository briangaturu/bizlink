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
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 1px solid rgba(229, 231, 235, 1);
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(234, 88, 12, 0.1), transparent);
          transition: left 0.5s ease;
          z-index: 0;
        }
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(234, 88, 12, 0.15);
          border-color: rgba(234, 88, 12, 0.3);
        }
        .feature-card:hover::before {
          left: 100%;
        }
        .feature-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(234, 88, 12, 0.1), rgba(251, 146, 60, 0.1));
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }
        .feature-card:hover .feature-icon {
          background: linear-gradient(135deg, rgba(234, 88, 12, 0.2), rgba(251, 146, 60, 0.2));
          transform: scale(1.1) rotate(5deg);
        }
      `}</style>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, i) => {
          const icons = [
            "🎁", "🔥", "⭐"
          ];
          return (
            <div
              key={feature.title}
              className="feature-card bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-md border relative"
              style={{
                opacity: visible ? 1 : 0,
                animation: visible
                  ? `card-rise 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.12}s both`
                  : "none",
              }}
            >
              <div className="feature-icon text-2xl">
                {icons[i]}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>

              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-orange-100/30 to-transparent rounded-tl-3xl" />
            </div>
          );
        })}
      </div>
    </>
  );
}