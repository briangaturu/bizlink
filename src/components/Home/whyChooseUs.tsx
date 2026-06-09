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
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.3s ease;
        }
        .why-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
        }
        .why-card:hover .why-icon {
          transform: scale(1.2) rotate(-6deg);
        }
        .why-card:hover .why-underline {
          transform: scaleX(1);
        }
        .why-icon {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .why-underline {
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <div
        ref={ref}
        className="bg-white rounded-2xl shadow p-8"
        style={{
          opacity: visible ? 1 : 0,
          animation: visible ? "section-rise 0.5s ease both" : "none",
        }}
      >
        {/* Heading */}
        <h2
          className="text-2xl font-bold text-gray-900 mb-8 text-center"
          style={{
            opacity: visible ? 1 : 0,
            animation: visible ? "section-rise 0.5s ease 0.1s both" : "none",
          }}
        >
          Why Choose BizLink?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="why-card rounded-xl p-4"
              style={{
                opacity: visible ? 1 : 0,
                animation: visible
                  ? `item-rise 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0.15 + i * 0.12}s both`
                  : "none",
              }}
            >
              {/* Icon */}
              <div className="why-icon text-3xl mb-4">{reason.icon}</div>

              {/* Title + underline */}
              <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
              <div className="why-underline h-0.5 bg-gray-200 rounded-full mb-3" />

              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}