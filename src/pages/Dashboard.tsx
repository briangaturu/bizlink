import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store'

const quickStats = [
  { label: 'Active listings', value: '12', hint: 'Products and services' },
  { label: 'Profile views', value: '84', hint: 'This week' },
  { label: 'Messages', value: '6', hint: 'New enquiries' },
]

const recentActivity = [
  'Your listing “Brand new laptop” was viewed 18 times today.',
  'You received a new message from a potential buyer.',
  'Your profile verification is complete and live.',
]

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-r from-orange-500 to-amber-400 p-8 text-white shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-100">
          Welcome back
        </p>
        <h1 className="mt-2 text-3xl font-semibold">
          {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Business owner'}
        </h1>
        <p className="mt-3 max-w-2xl text-sm sm:text-base">
          Manage your BizLink presence, review enquiries, and keep your business profile growing.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        {quickStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-500">{stat.hint}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent activity</h2>
            <Link to="/browse" className="text-sm font-medium text-orange-600 hover:text-orange-700">
              Browse listings
            </Link>
          </div>

          <ul className="mt-4 space-y-3">
            {recentActivity.map((item) => (
              <li key={item} className="rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Quick actions</h2>
          <div className="mt-4 space-y-3">
            <Link
              to="/profile"
              className="flex items-center justify-center rounded-xl bg-orange-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-orange-700"
            >
              Update profile
            </Link>
            <Link
              to="/browse"
              className="flex items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Explore marketplace
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

