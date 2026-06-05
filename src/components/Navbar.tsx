import { Link, NavLink } from 'react-router-dom'

const isLoggedIn = false

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-primary-600 font-medium" : "text-gray-700 hover:text-gray-900"

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="font-semibold text-gray-900 shrink-0">
          BizLink
        </Link>

        {/* Center Links */}
        <div className="flex items-center gap-6 text-sm">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/browse" className={navLinkClass}>Browse</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 text-sm shrink-0">
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <Link
                to="/register"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}