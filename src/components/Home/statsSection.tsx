"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ raw }: { raw: string }) {
  const match = raw.match(/^([\d.]+)([KkMm%+]*)/);
  const numeric = match ? parseFloat(match[1]) * (match[2]?.toUpperCase().startsWith("K") ? 1000 : 1) : 0;
  const suffix = raw.replace(/[\d.]/g, "");

  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start: number | null = null;
        const duration = 1600;
        const step = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          setCount(Math.floor(eased * numeric));
          if (p < 1) requestAnimationFrame(step);
          else setCount(numeric);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numeric]);

  const display =
    numeric >= 1000
      ? (count / 1000).toFixed(0) + "K+"
      : count + suffix;

  return <span ref={ref}>{display}</span>;
}

const stats = [
  { value: "5K+", label: "Active Listings" },
  { value: "2K+", label: "Verified Sellers" },
  { value: "15K+", label: "Monthly Visitors" },
  { value: "98%", label: "Customer Satisfaction" },
];

export default function StatsSection() {
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
        @keyframes stat-rise {
          from { opacity: 0; transform: translateY(32px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .stat-card {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(234, 88, 12, 0.15);
        }
      `}</style>

      <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="stat-card bg-white p-6 rounded-xl shadow text-center"
            style={{
              opacity: visible ? 1 : 0,
              animation: visible
                ? `stat-rise 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.1}s both`
                : "none",
            }}
          >
            <h2 className="text-3xl font-bold text-orange-600">
              <AnimatedNumber raw={stat.value} />
            </h2>
            <p className="text-gray-600 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}