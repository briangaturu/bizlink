"use client";

import { useEffect, useRef, useState } from "react";

// Floating orb component
function Orb({ className, style }: { className: string; style?: React.CSSProperties }) {
  return <div className={`absolute rounded-full pointer-events-none ${className}`} style={style} />;
}

// Animated counter for stats
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const duration = 1400;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(step);
          else setCount(target);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);

    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouse);
    return () => {
      clearTimeout(t);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  const stats = [
    { value: 12400, suffix: "+", label: "Sellers" },
    { value: 85000, suffix: "+", label: "Listings" },
    { value: 47, suffix: "K+", label: "Buyers" },
  ];

  return (
    <>
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-18px) scale(1.04); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(3deg); }
          66% { transform: translateY(6px) rotate(-2deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .hero-shimmer-text {
          background: linear-gradient(
            90deg,
            #111827 0%, #111827 30%,
            #ea580c 45%,
            #111827 60%, #111827 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .btn-primary-hero {
          position: relative;
          overflow: hidden;
          background: #ea580c;
          color: white;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.2s ease,
                      background 0.2s ease;
        }
        .btn-primary-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .btn-primary-hero:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 30px rgba(234, 88, 12, 0.4);
          background: #c2410c;
        }
        .btn-primary-hero:hover::before { opacity: 1; }
        .btn-primary-hero:active { transform: translateY(0) scale(0.98); }

        .btn-outline-hero {
          position: relative;
          overflow: hidden;
          border: 1.5px solid #ea580c;
          color: #ea580c;
          background: transparent;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.2s ease,
                      background 0.2s ease,
                      color 0.2s ease;
        }
        .btn-outline-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #ea580c;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }
        .btn-outline-hero:hover {
          color: white;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 30px rgba(234, 88, 12, 0.2);
        }
        .btn-outline-hero:hover::after { transform: scaleX(1); }
        .btn-outline-hero:active { transform: translateY(0) scale(0.98); }

        .stat-card {
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(234, 88, 12, 0.12);
        }
      `}</style>

      <div
        ref={heroRef}
        className="relative text-center py-20 bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        {/* Background mesh gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 20% 50%, #ffedd5 0%, transparent 55%), " +
                "radial-gradient(ellipse at 80% 20%, #fff7ed 0%, transparent 50%), " +
                "radial-gradient(ellipse at 60% 90%, #ffedd5 0%, transparent 45%)",
            }}
          />

          {/* Animated orbs */}
          <Orb
            className="w-72 h-72 -top-24 -left-24 bg-orange-100 opacity-60"
            style={{
              animation: "float-slow 8s ease-in-out infinite",
              filter: "blur(40px)",
              transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`,
              transition: "transform 0.4s ease",
            } as React.CSSProperties}
          />
          <Orb
            className="w-56 h-56 -bottom-16 -right-16 bg-orange-200 opacity-40"
            style={{
              animation: "float-medium 10s ease-in-out infinite 2s",
              filter: "blur(30px)",
              transform: `translate(${mousePos.x * -6}px, ${mousePos.y * -6}px)`,
              transition: "transform 0.4s ease",
            } as React.CSSProperties}
          />
          <Orb
            className="w-32 h-32 top-1/2 right-1/4 bg-orange-100 opacity-50"
            style={{
              animation: "float-slow 12s ease-in-out infinite 4s",
              filter: "blur(20px)",
            }}
          />

          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle, #fdba74 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Live indicator */}
        <div
          className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-8 text-sm text-orange-700 font-medium"
          style={{
            opacity: mounted ? 1 : 0,
            animation: mounted ? "slide-up 0.5s ease both" : "none",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
          </span>
          Kenya's first B2B Marketplace
        </div>

        {/* Heading */}
        <h1
          className="text-4xl md:text-6xl font-bold mb-5 leading-tight"
          style={{
            opacity: mounted ? 1 : 0,
            animation: mounted ? "slide-up 0.6s ease 0.1s both" : "none",
          }}
        >
          Welcome to{" "}
          <span className="hero-shimmer-text">BizLink</span>
        </h1>

        {/* Subheading */}
        <p
          className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{
            opacity: mounted ? 1 : 0,
            animation: mounted ? "slide-up 0.6s ease 0.2s both" : "none",
          }}
        >
          Connect with trusted local sellers, discover quality products,
          and grow your business through Kenya's modern digital marketplace.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row justify-center gap-4 mb-14"
          style={{
            opacity: mounted ? 1 : 0,
            animation: mounted ? "slide-up 0.6s ease 0.3s both" : "none",
          }}
        >
          <button className="btn-primary-hero px-8 py-3.5 rounded-xl font-semibold text-base">
            Browse Listings
          </button>
          <button className="btn-outline-hero px-8 py-3.5 rounded-xl font-semibold text-base">
            Become a Seller
          </button>
        </div>

        {/* Divider */}
        <div
          className="w-px h-8 bg-gradient-to-b from-transparent via-orange-300 to-transparent mx-auto mb-10"
          style={{
            opacity: mounted ? 1 : 0,
            animation: mounted ? "fade-in 0.6s ease 0.5s both" : "none",
          }}
        />

        {/* Stats row */}
        <div
          className="flex flex-wrap justify-center gap-6 px-4"
          style={{
            opacity: mounted ? 1 : 0,
            animation: mounted ? "slide-up 0.6s ease 0.5s both" : "none",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card bg-white border border-gray-100 rounded-xl px-8 py-4 shadow-sm"
              style={{ animationDelay: `${0.55 + i * 0.08}s` }}
            >
              <div className="text-2xl font-bold text-gray-900">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-400 mt-0.5 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scrolling trust strip */}
        <div
          className="mt-12 overflow-hidden border-t border-gray-100 pt-6"
          style={{
            opacity: mounted ? 1 : 0,
            animation: mounted ? "fade-in 0.6s ease 0.7s both" : "none",
          }}
        >
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-medium">
            Trusted by businesses across Kenya
          </p>
          <div className="flex">
            <div
              className="flex gap-10 items-center"
              style={{ animation: "marquee 18s linear infinite", whiteSpace: "nowrap" }}
            >
              {[
                "Nairobi Traders", "Mombasa Mart", "Agri-Connect", "TechHub KE",
                "FashionPoa", "BuildSupply Co", "Jua Kali Hub", "Fresh Farms KE",
                "Nairobi Traders", "Mombasa Mart", "Agri-Connect", "TechHub KE",
                "FashionPoa", "BuildSupply Co", "Jua Kali Hub", "Fresh Farms KE",
              ].map((name, i) => (
                <span
                  key={i}
                  className="text-sm font-semibold text-gray-300 hover:text-orange-500 transition-colors cursor-default"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}