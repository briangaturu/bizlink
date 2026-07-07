"use client";

import { useEffect, useRef, useState } from "react";

const reasons = [
  {
    title: "Secure Transactions",
    description:
      "Buy and sell with confidence through a secure and reliable marketplace environment.",
    icon: "🔒",
  },
  {
    title: "Verified Businesses",
    description:
      "Connect with trusted sellers and businesses verified by our platform.",
    icon: "✅",
  },
  {
    title: "Direct Messaging",
    description:
      "Communicate directly with sellers to negotiate prices, ask questions, and build trust.",
    icon: "💬",
  },
];

export default function WhyChooseUs() {
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
        @keyframes section-rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes item-rise {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        .why-card {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 1px solid rgba(229, 231, 235, 1);
        }
        .why-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(234, 88, 12, 0.05), rgba(251, 146, 60, 0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        .why-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 40px rgba(234, 88, 12, 0.2);
          border-color: rgba(234, 88, 12, 0.3);
        }
        .why-card:hover::before {
          opacity: 1;
        }
        .why-icon {
          display: inline-block;
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(234, 88, 12, 0.1), rgba(251, 146, 60, 0.1));
          display: flex;
          align-items: center;
          justify-center;
          font-size: 28px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          margin-bottom: 16px;
        }
        .why-card:hover .why-icon {
          background: linear-gradient(135deg, rgba(234, 88, 12, 0.2), rgba(251, 146, 60, 0.2));
          transform: scale(1.15) rotate(8deg);
        }
      `}</style>

      <div
        ref={ref}
        className="bg-gradient-to-br from-white via-orange-50/30 to-white rounded-3xl shadow-lg border border-gray-100 p-12"
        style={{
          opacity: visible ? 1 : 0,
          animation: visible ? "section-rise 0.5s ease both" : "none",
        }}
      >
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4"
            style={{
              opacity: visible ? 1 : 0,
              animation: visible ? "section-rise 0.5s ease 0.1s both" : "none",
            }}
          >
            Why Choose BizLink?
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="why-card bg-white rounded-2xl p-7"
              style={{
                opacity: visible ? 1 : 0,
                animation: visible
                  ? `item-rise 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0.15 + i * 0.12}s both`
                  : "none",
              }}
            >
              {/* Icon */}
              <div className="why-icon">{reason.icon}</div>

              {/* Title */}
              <h3 className="font-bold text-lg text-gray-900 mb-3">{reason.title}</h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm">{reason.description}</p>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-orange-100/20 to-transparent rounded-tl-2xl" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}