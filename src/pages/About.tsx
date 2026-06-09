"use client";

import { useEffect, useRef, useState } from "react";

function useVisible(threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

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
];

export default function About() {
  const [mounted, setMounted] = useState(false);
  const valuesSection = useVisible();
  const ctaSection = useVisible();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes item-rise {
          from { opacity: 0; transform: translateY(36px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes cta-rise {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .value-card {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.3s ease;
        }
        .value-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(0,0,0,0.08);
        }
        .value-card:hover .value-icon {
          transform: scale(1.15) rotate(-6deg);
          background-color: #ea580c;
          color: white;
        }
        .value-icon {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      background-color 0.3s ease,
                      color 0.3s ease;
        }

        .cta-btn {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .cta-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .cta-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
        .cta-btn:hover::before { opacity: 1; }
        .cta-btn:active { transform: scale(0.97); }
      `}</style>

      <div className="space-y-16 w-full">

        {/* Mission */}
        <div
          className="bg-white rounded-2xl shadow-sm p-10 text-center"
          style={{
            opacity: mounted ? 1 : 0,
            animation: mounted ? "slide-up 0.6s ease both" : "none",
          }}
        >
          <span
            className="inline-block text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-4"
            style={{ animation: mounted ? "fade-in 0.5s ease 0.1s both" : "none", opacity: mounted ? 1 : 0 }}
          >
            Our Mission
          </span>
          <h1
            className="text-4xl font-bold text-gray-900 mb-6"
            style={{ animation: mounted ? "slide-up 0.6s ease 0.15s both" : "none", opacity: mounted ? 1 : 0 }}
          >
            Connecting Kenya's Businesses <br className="hidden md:block" /> with the Right People
          </h1>
          <p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ animation: mounted ? "slide-up 0.6s ease 0.25s both" : "none", opacity: mounted ? 1 : 0 }}
          >
            BizLink is a community-driven marketplace that makes it easy to discover, showcase,
            and connect with businesses, products, and services across Kenya — through direct
            communication channels like WhatsApp, phone, and social media, without handling
            payments or order processing.
          </p>
        </div>

        {/* Values */}
        <div ref={valuesSection.ref}>
          <h2
            className="text-2xl font-bold text-gray-900 text-center mb-8"
            style={{
              opacity: valuesSection.visible ? 1 : 0,
              animation: valuesSection.visible ? "slide-up 0.5s ease both" : "none",
            }}
          >
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="value-card bg-white rounded-xl shadow-sm p-6"
                style={{
                  opacity: valuesSection.visible ? 1 : 0,
                  animation: valuesSection.visible
                    ? `item-rise 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0.1 + i * 0.1}s both`
                    : "none",
                }}
              >
                <div className="value-icon w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          ref={ctaSection.ref}
          className="bg-orange-600 rounded-2xl p-10 text-center text-white"
          style={{
            opacity: ctaSection.visible ? 1 : 0,
            animation: ctaSection.visible ? "cta-rise 0.6s ease both" : "none",
          }}
        >
          <h2
            className="text-2xl font-bold mb-3"
            style={{ animation: ctaSection.visible ? "slide-up 0.5s ease 0.1s both" : "none", opacity: ctaSection.visible ? 1 : 0 }}
          >
            Ready to join BizLink?
          </h2>
          <p
            className="text-orange-100 mb-6"
            style={{ animation: ctaSection.visible ? "slide-up 0.5s ease 0.18s both" : "none", opacity: ctaSection.visible ? 1 : 0 }}
          >
            Whether you're a buyer or a seller, BizLink is the place for you.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: ctaSection.visible ? "slide-up 0.5s ease 0.26s both" : "none", opacity: ctaSection.visible ? 1 : 0 }}
          >
            <a href="/browse" className="cta-btn bg-white text-orange-600 font-medium px-6 py-3 rounded-lg hover:bg-orange-50 transition">
              Browse Listings
            </a>
            <a href="/register" className="cta-btn border border-white text-white font-medium px-6 py-3 rounded-lg hover:bg-orange-700 transition">
              Create Account
            </a>
          </div>
        </div>

      </div>
    </>
  );
}