"use client";

import { useRef, useState } from "react";

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Automotive",
  "Business Equipment",
  "Food & Drinks",
  "Services",
];

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const [ripple, setRipple] = useState<{ key: string; x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (cat: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ key: cat, x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 500);
    onChange(cat);
  };

  return (
    <>
      <style>{`
        @keyframes cat-in {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes ripple-out {
          from { transform: scale(0); opacity: 0.4; }
          to   { transform: scale(3); opacity: 0; }
        }
        .cat-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.2s ease,
                      background 0.2s ease,
                      color 0.2s ease,
                      border-color 0.2s ease;
          animation: cat-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .cat-btn:hover {
          transform: translateY(-2px);
        }
        .cat-btn:active {
          transform: scale(0.95);
        }
        .cat-btn.active {
          box-shadow: 0 4px 14px rgba(234, 88, 12, 0.35);
        }
        .ripple-circle {
          position: absolute;
          width: 40px; height: 40px;
          margin-left: -20px; margin-top: -20px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          pointer-events: none;
          animation: ripple-out 0.5s ease forwards;
        }
      `}</style>

      <div
        ref={containerRef}
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
      >
        {categories.map((cat, i) => {
          const isActive = selected === cat;
          return (
            <button
              key={cat}
              onClick={(e) => handleClick(cat, e)}
              className={`cat-btn whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border ${
                isActive
                  ? "active bg-orange-600 text-white border-orange-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-orange-400 hover:text-orange-600"
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Ripple */}
              {ripple?.key === cat && (
                <span
                  className="ripple-circle"
                  style={{ left: ripple.x, top: ripple.y }}
                />
              )}
              {cat}
            </button>
          );
        })}
      </div>
    </>
  );
}