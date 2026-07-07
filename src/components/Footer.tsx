import { Link } from "react-router-dom";

export default function Footer() {
  const footerLinks = {
    Product: [
      { label: "Browse", href: "/browse" },
      { label: "Sell", href: "/register" },
      { label: "Pricing", href: "/" },
    ],
    Company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/" },
    ],
    Legal: [
      { label: "Terms", href: "/" },
      { label: "Privacy", href: "/" },
      { label: "Cookies", href: "/" },
    ],
  };

  return (
    <footer className="w-full bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                BizLink
              </div>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Connect businesses with opportunities. Buy, sell, and grow your business on BizLink.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { icon: "facebook", url: "#" },
                { icon: "twitter", url: "#" },
                { icon: "linkedin", url: "#" },
              ].map((social) => (
                <a key={social.icon} href={social.url} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-all">
                  <span className="text-sm font-bold">{social.icon.charAt(0).toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-gray-900 mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-600 hover:text-orange-600 transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-gray-600">
            &copy; 2026 BizLink. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-gray-600 hover:text-orange-600 transition-colors font-medium">
              Terms
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-xs text-gray-600 hover:text-orange-600 transition-colors font-medium">
              Privacy
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-xs text-gray-600 hover:text-orange-600 transition-colors font-medium">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

