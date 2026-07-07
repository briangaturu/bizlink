"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import type { RootState } from "@/app/store";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-orange-600 font-medium" : "text-gray-700 hover:text-gray-900";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const isLoggedIn = Boolean(accessToken);

  useEffect(() => {
    setMounted(true);

    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes nav-slide-down {
          from { opacity: 0; transform: translateY(-100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nav-item-in {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nav-link-animated {
          position: relative;
        }
        .nav-link-animated::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 2px;
          background: currentColor;
          border-radius: 9999px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-link-animated:hover::after {
          transform: scaleX(1);
        }

        .nav-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.2s ease;
        }
        .nav-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .nav-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
        }
        .nav-btn:hover::before { opacity: 1; }
        .nav-btn:active { transform: translateY(0) scale(0.97); }
      `}</style>

      <nav
        className="w-full border-b border-gray-200 bg-white sticky top-0 z-50"
        style={{
          animation: mounted ? "nav-slide-down 0.5s cubic-bezier(0.16,1,0.3,1) both" : "none",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.07)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <div className="mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link
            to="/"
            className="font-semibold text-gray-900 shrink-0 transition-opacity hover:opacity-75"
            style={{
              opacity: mounted ? 1 : 0,
              animation: mounted ? "nav-item-in 0.4s ease 0.1s both" : "none",
            }}
          >
            BizLink
          </Link>

          {/* Center Links */}
          <div className="flex items-center gap-6 text-sm">
            {["/ ", "/browse", "/about", "/contact"].map((path, i) => {
              const labels: Record<string, string> = {
                "/ ": "Home",
                "/browse": "Browse",
                "/about": "About",
                "/contact": "Contact",
              };
              return (
                <NavLink
                  key={path}
                  to={path.trim()}
                  end={path.trim() === "/"}
                  className={({ isActive }) =>
                    `nav-link-animated ${navLinkClass({ isActive })}`
                  }
                  style={{
                    opacity: mounted ? 1 : 0,
                    animation: mounted
                      ? `nav-item-in 0.4s ease ${0.15 + i * 0.07}s both`
                      : "none",
                  }}
                >
                  {labels[path]}
                </NavLink>
              );
            })}
          </div>

          {/* Right Side */}
          <div
            className="flex items-center gap-3 text-sm shrink-0"
            style={{
              opacity: mounted ? 1 : 0,
              animation: mounted ? "nav-item-in 0.4s ease 0.45s both" : "none",
            }}
          >
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="nav-btn bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => `nav-link-animated ${navLinkClass({ isActive })}`}>
                  Login
                </NavLink>
                <Link
                  to="/register"
                  className="nav-btn bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>

        </div>
      </nav>
    </>
  );
}