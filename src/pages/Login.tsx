"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/api/authApi";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      await login({ email: form.email, password: form.password }).unwrap();
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.data?.message || "Invalid email or password.");
    }
  };

  const inputClass = (name: string) =>
    `w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200
    ${focused === name
      ? "border-orange-400 ring-2 ring-orange-100 shadow-sm"
      : "border-gray-200 hover:border-gray-300"
    }`;

  return (
    <>
      <style>{`
        @keyframes card-in {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-6px); }
          40%     { transform: translateX(6px); }
          60%     { transform: translateX(-4px); }
          80%     { transform: translateX(4px); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .login-card {
          animation: ${mounted ? "card-in 0.6s cubic-bezier(0.34,1.56,0.64,1) both" : "none"};
        }
        .error-shake { animation: shake 0.4s ease both; }
        .submit-btn {
          position: relative; overflow: hidden;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
        }
        .submit-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.2s;
        }
        .submit-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(234, 88, 12, 0.35);
        }
        .submit-btn:not(:disabled):hover::before { opacity: 1; }
        .submit-btn:not(:disabled):active { transform: scale(0.98); }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block; vertical-align: middle; margin-right: 8px;
        }
      `}</style>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-orange-50 relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

        <div
          className="login-card w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-10 relative z-10"
          style={{ opacity: mounted ? 1 : 0 }}
        >
          {/* Logo */}
          <div
            className="text-center mb-10"
            style={{ opacity: mounted ? 1 : 0, animation: mounted ? "slide-up 0.5s ease 0.15s both" : "none" }}
          >
            <Link to="/" className="inline-block">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent hover:opacity-75 transition-opacity">
                BizLink
              </div>
            </Link>
            <p className="text-gray-600 text-sm mt-3 font-medium">Welcome back to your business</p>
          </div>

          {/* Error */}
          {error && (
            <div className="error-shake bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6 flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          )}

          <div
            className="space-y-5"
            style={{ opacity: mounted ? 1 : 0, animation: mounted ? "slide-up 0.5s ease 0.25s both" : "none" }}
          >
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Email address</label>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="you@example.com"
                className={`${inputClass("email")} focus:ring-2 focus:ring-orange-500/30`}
                onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-800">Password</label>
                <Link to="/forgot-password" className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password" value={form.password}
                  onChange={handleChange} placeholder="••••••••"
                  className={`${inputClass("password")} pr-10 focus:ring-2 focus:ring-orange-500/30`}
                  onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors p-1 hover:bg-orange-50 rounded-lg"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="submit-btn w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all text-base disabled:opacity-60 flex items-center justify-center mt-8"
            >
              {isLoading && <span className="spinner" />}
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          <div
            className="text-center text-sm text-gray-600 mt-8 space-x-1"
            style={{ opacity: mounted ? 1 : 0, animation: mounted ? "fade-in 0.5s ease 0.4s both" : "none" }}
          >
            <span>Don't have an account?</span>
            <Link to="/register" className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}