import { Link } from 'react-router-dom'
import { useState } from 'react'
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
  const [businessProfile, setBusinessProfile] = useState({
    businessName: '',
    description: '',
    location: '',
    phone: '',
    whatsapp: '',
    website: '',
    email: '',
  })
  const [showEditForm, setShowEditForm] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBusinessProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveBusinessProfile = async () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setShowEditForm(false)
      // In a real app, you'd dispatch an action to save this to Redux/API
    }, 1000)
  }

  return (
    <div className="space-y-8 pb-8">
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stat-card {
          animation: fade-in-up 0.6s ease-out;
        }
        .stat-card:nth-child(2) { animation-delay: 0.1s; }
        .stat-card:nth-child(3) { animation-delay: 0.2s; }
      `}</style>

      {/* Welcome Header */}
      <section className="rounded-3xl bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-100 opacity-90">
            Dashboard
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Welcome back, {user?.firstName || 'Business owner'}
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-orange-50 leading-relaxed">
            Manage your BizLink presence, track enquiries, and grow your business with powerful insights.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {quickStats.map((stat, i) => (
          <div key={stat.label} className="stat-card group">
            <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-xl hover:border-orange-200 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full -mr-10 -mt-10" />
              <div className="relative z-10">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{stat.label}</p>
                <p className="mt-3 text-4xl font-bold text-gray-900">{stat.value}</p>
                <p className="mt-2 text-xs text-gray-500">{stat.hint}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Recent activity</h2>
                <p className="text-sm text-gray-500 mt-1">Stay updated on your business</p>
              </div>
              <Link to="/browse" className="text-xs font-semibold text-orange-600 hover:text-orange-700 uppercase tracking-wide">
                View all →
              </Link>
            </div>

            <ul className="space-y-3">
              {recentActivity.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-md hover:shadow-lg transition-shadow h-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick actions</h2>
            <div className="space-y-3 flex flex-col">
              <Link
                to="/profile"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:shadow-lg hover:from-orange-700 hover:to-orange-600 transform hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </Link>
              <Link
                to="/browse"
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-orange-200 px-4 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Business Profile Settings */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Business Profile</h2>
            <p className="text-sm text-gray-500 mt-2">Manage your business information and contact details</p>
          </div>
          <button
            onClick={() => setShowEditForm(!showEditForm)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white text-sm font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            {showEditForm ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {showEditForm ? (
          <div className="space-y-6">
            {/* Form Fields */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={businessProfile.businessName}
                onChange={handleBusinessChange}
                placeholder="Enter your business name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm bg-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Description</label>
              <textarea
                name="description"
                value={businessProfile.description}
                onChange={handleBusinessChange}
                placeholder="Describe your business and what you offer"
                rows={4}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm bg-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={businessProfile.location}
                  onChange={handleBusinessChange}
                  placeholder="e.g., Nairobi CBD"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm bg-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={businessProfile.email}
                  onChange={handleBusinessChange}
                  placeholder="business@example.com"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm bg-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={businessProfile.phone}
                  onChange={handleBusinessChange}
                  placeholder="+254712345678"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm bg-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">WhatsApp</label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={businessProfile.whatsapp}
                  onChange={handleBusinessChange}
                  placeholder="254712345678"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm bg-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Website</label>
              <input
                type="url"
                name="website"
                value={businessProfile.website}
                onChange={handleBusinessChange}
                placeholder="https://example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm bg-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSaveBusinessProfile}
                disabled={isSaving}
                className="flex-1 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-3 text-sm font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => setShowEditForm(false)}
                className="flex-1 rounded-xl border-2 border-gray-200 text-gray-700 px-4 py-3 text-sm font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Business Name</p>
              <p className="mt-1 text-gray-900 font-medium">{businessProfile.businessName || 'Not set'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Location</p>
              <p className="mt-1 text-gray-900 font-medium">{businessProfile.location || 'Not set'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</p>
              <p className="mt-1 text-gray-900 font-medium">{businessProfile.phone || 'Not set'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">WhatsApp</p>
              <p className="mt-1 text-gray-900 font-medium">{businessProfile.whatsapp || 'Not set'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Description</p>
              <p className="mt-1 text-gray-900 font-medium">{businessProfile.description || 'Not set'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

