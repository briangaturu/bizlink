"use client";

import { useEffect, useRef, useState } from "react";

function useVisible(threshold = 0.1) {
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

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const formSection = useVisible();
  const infoSection = useVisible();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = (name: string) =>
    `w-full px-4 py-2.5 rounded-lg border text-sm transition-all duration-200 outline-none
    ${focused === name
      ? "border-orange-400 ring-2 ring-orange-100 shadow-sm"
      : "border-gray-200 hover:border-gray-300"
    }`;

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
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes success-pop {
          0%   { opacity: 0; transform: scale(0.5); }
          70%  { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes check-draw {
          from { stroke-dashoffset: 40; }
          to   { stroke-dashoffset: 0; }
        }

        .info-item {
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .info-item:hover { transform: translateX(4px); }
        .info-item:hover .info-icon {
          background-color: #ea580c;
          color: white;
        }
        .info-icon {
          transition: background-color 0.25s ease, color 0.25s ease;
        }

        .submit-btn {
          position: relative; overflow: hidden;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.2s ease;
        }
        .submit-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.2s;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(234, 88, 12, 0.35);
        }
        .submit-btn:hover::before { opacity: 1; }
        .submit-btn:active { transform: scale(0.98); }

        .success-icon {
          animation: success-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .check-path {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          animation: check-draw 0.4s ease 0.3s forwards;
        }
      `}</style>

      <div className="space-y-10 w-full">

        {/* Header */}
        <div
          className="text-center"
          style={{
            opacity: mounted ? 1 : 0,
            animation: mounted ? "slide-up 0.6s ease both" : "none",
          }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
          <p
            className="text-gray-500 text-lg max-w-xl mx-auto"
            style={{ animation: mounted ? "slide-up 0.6s ease 0.1s both" : "none", opacity: mounted ? 1 : 0 }}
          >
            Have a question or need help? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Info */}
          <div
            ref={infoSection.ref}
            className="space-y-6"
            style={{
              opacity: infoSection.visible ? 1 : 0,
              animation: infoSection.visible ? "item-rise 0.6s ease both" : "none",
            }}
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 text-lg mb-4">Get in Touch</h2>
              <div className="space-y-4">

                {[
                  {
                    label: "Email", value: "support@bizlink.co.ke", delay: "0.05s",
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    bg: "bg-orange-50 text-orange-600",
                  },
                  {
                    label: "Phone", value: "+254 700 000 000", delay: "0.1s",
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                      </svg>
                    ),
                    bg: "bg-orange-50 text-orange-600",
                  },
                  {
                    label: "WhatsApp", value: "+254 700 000 000", delay: "0.15s",
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.534 5.876L0 24l6.332-1.51A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.36-.214-3.727.889.934-3.618-.235-.372A9.818 9.818 0 1112 21.818z" />
                      </svg>
                    ),
                    bg: "bg-green-50 text-green-600",
                  },
                  {
                    label: "Location", value: "Nairobi, Kenya", delay: "0.2s",
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    bg: "bg-orange-50 text-orange-600",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="info-item flex items-start gap-3"
                    style={{
                      opacity: infoSection.visible ? 1 : 0,
                      animation: infoSection.visible
                        ? `item-rise 0.5s ease ${item.delay} both`
                        : "none",
                    }}
                  >
                    <div className={`info-icon w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center shrink-0`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.value}</p>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={formSection.ref}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6"
            style={{
              opacity: formSection.visible ? 1 : 0,
              animation: formSection.visible ? "item-rise 0.6s ease 0.1s both" : "none",
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="success-icon w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path className="check-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold text-gray-900 mb-2"
                  style={{ animation: "slide-up 0.4s ease 0.2s both", opacity: 0 }}
                >
                  Message Sent!
                </h3>
                <p
                  className="text-gray-500"
                  style={{ animation: "slide-up 0.4s ease 0.3s both", opacity: 0 }}
                >
                  We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                  className="mt-6 text-sm text-orange-600 hover:underline transition-opacity hover:opacity-75"
                  style={{ animation: "fade-in 0.4s ease 0.4s both", opacity: 0 }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <h2 className="font-semibold text-gray-900 text-lg">Send a Message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClass("name")}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="john@example.com"
                      className={inputClass("email")}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+254 7XX XXX XXX"
                    className={inputClass("phone")}
                    onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                    className={`${inputClass("message")} resize-none`}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    required
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="submit-btn w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition text-sm"
                >
                  Send Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}