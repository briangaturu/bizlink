import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

// Mock data — replace with RTK Query later
const mockBusinesses: Record<string, any> = {
  "seller-001": {
  id: "seller-001",
  firstName: "Brian",
  lastName: "Gaturu",
  username: "briangaturu",
  bio: "Quality electronics & gadgets. Fast delivery across Nairobi. DM for bulk orders 📦",
  location: "Nairobi, Kenya",
  profileImage: "",
  isVerified: true,
  followers: 1240,
  following: 320,
  totalListings: 18,
  whatsapp: "254712345678",
  phone: "+254712345678",
  instagram: "briangaturu",
  facebook: "briangaturu",
  tiktok: "briangaturu",
  linkedin: "",
  website: "https://briangaturu.co.ke",
  },
};

const mockListings = [
  { id: 1, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80", title: "Samsung Galaxy A54", price: "KSh 32,000", whatsapp: "254712345678", phone: "+254712345678" },
  { id: 2, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80", title: "HP Laptop 15", price: "KSh 58,000", whatsapp: "254712345678" },
  { id: 3, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80", title: "Office Desk & Chair", price: "KSh 12,000", whatsapp: "254712345678", phone: "+254712345678" },
  { id: 4, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", title: "Sofa Set 3+2+1", price: "KSh 45,000", whatsapp: "254712345678" },
  { id: 5, image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80", title: "Skincare Bundle", price: "KSh 1,800", whatsapp: "254712345678", website: "https://briangaturu.co.ke" },
  { id: 6, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", title: "Custom Cakes", price: "From KSh 800", whatsapp: "254712345678", phone: "+254712345678" },
  { id: 7, image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&q=80", title: "Car Engine Service", price: "From KSh 2,500", whatsapp: "254712345678" },
  { id: 8, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80", title: "Men's Formal Suit", price: "KSh 4,500", whatsapp: "254712345678", phone: "+254712345678" },
  { id: 9, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80", title: "iPhone 13 Pro", price: "KSh 89,000", whatsapp: "254712345678" },
];

interface ListingModalProps {
  listing: typeof mockListings[0];
  seller: any;
  onClose: () => void;
}

function UpdateProfileModal({ onClose, profile }: { onClose: () => void; profile: any }) {
  const [formData, setFormData] = useState({
    bio: profile?.bio || "",
    location: profile?.location || "",
    whatsapp: profile?.whatsapp || "",
    phone: profile?.phone || "",
    website: profile?.website || "",
    instagram: profile?.instagram || "",
    facebook: profile?.facebook || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Update Business Profile</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell about your business"
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Nairobi CBD"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+254712345678"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="254712345678"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="username"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="username"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function ListingModal({ listing, seller, onClose }: ListingModalProps) {
  return (
    <>
      <style>{`
        @keyframes backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-up {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .listing-modal-backdrop { animation: backdrop-in 0.2s ease both; }
        .listing-modal-box { animation: modal-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .reach-link {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
        }
        .reach-link:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.1); }
        .reach-link:active { transform: scale(0.97); }
      `}</style>

      <div
        className="listing-modal-backdrop fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <div
          className="listing-modal-box bg-white w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative h-56 bg-gray-100">
            <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Info */}
          <div className="p-5">
            <h3 className="font-bold text-gray-900 text-lg leading-snug">{listing.title}</h3>
            <p className="text-orange-600 font-bold text-xl mt-1">{listing.price}</p>

            <div className="flex items-center gap-2 mt-3">
              <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <span className="text-orange-600 text-xs font-bold">
                  {seller.firstName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {seller.firstName} {seller.lastName}
                  {seller.isVerified && (
                    <svg className="w-3.5 h-3.5 text-orange-500 inline ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </p>
                <p className="text-xs text-gray-400">@{seller.username}</p>
              </div>
            </div>

            {/* Reach out links */}
            <div className="mt-4 flex flex-col gap-2.5">
              {listing.whatsapp && (
                <a
                  href={`https://wa.me/${listing.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reach-link flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 font-medium text-sm"
                >
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.534 5.876L0 24l6.332-1.51A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.36-.214-3.727.889.934-3.618-.235-.372A9.818 9.818 0 1112 21.818z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              )}
              {listing.phone && (
                <a
                  href={`tel:${listing.phone}`}
                  className="reach-link flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-50 text-orange-700 hover:bg-orange-100 font-medium text-sm"
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                  </svg>
                  Call Seller
                </a>
              )}
              {listing.website && (
                <a
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reach-link flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium text-sm"
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Profile() {
  const { id } = useParams();
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const [selectedListing, setSelectedListing] = useState<typeof mockListings[0] | null>(null);
  const [following, setFollowing] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const profile = useMemo(() => {
    return mockBusinesses[id || "seller-001"] || mockBusinesses["seller-001"];
  }, [id]);

  const listings = mockListings;
  const isOwnProfile = currentUser?.userId === id;
  const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();

  return (
    <>
      <style>{`
        .thumb {
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .thumb:hover { transform: scale(0.97); opacity: 0.88; }
        .thumb:active { transform: scale(0.94); }
        .follow-btn {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
        }
        .follow-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(234,88,12,0.3);
        }
        .follow-btn:active { transform: scale(0.97); }
        .social-icon {
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), color 0.2s ease;
        }
        .social-icon:hover { transform: scale(1.2); }
      `}</style>

      <div className="max-w-2xl mx-auto pb-16">

        {/* Profile Header */}
        <div className="flex flex-col items-center pt-8 pb-6 px-4">

          {/* Avatar */}
          <div className="relative mb-3">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt={profile.username}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-orange-100 border-4 border-white shadow-md flex items-center justify-center">
                <span className="text-orange-600 text-3xl font-bold">{initials}</span>
              </div>
            )}
            {profile.isVerified && (
              <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </div>

          {/* Name & username */}
          <h1 className="text-xl font-bold text-gray-900">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">@{profile.username}</p>

          {/* Location */}
          {profile.location && (
            <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {profile.location}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-8 mt-5">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">{profile.totalListings}</p>
              <p className="text-xs text-gray-500">Listings</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">{profile.followers.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">{profile.following.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Following</p>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="text-sm text-gray-600 text-center mt-4 max-w-xs leading-relaxed">
              {profile.bio}
            </p>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-2 mt-4">
            {isOwnProfile ? (
              <button
                onClick={() => setShowUpdateModal(true)}
                className="follow-btn px-8 py-2 rounded-full text-sm font-semibold bg-orange-600 text-white hover:bg-orange-700 transition"
              >
                Update Profile
              </button>
            ) : (
              <button
                onClick={() => setFollowing(!following)}
                className={`follow-btn px-8 py-2 rounded-full text-sm font-semibold transition ${
                  following
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-orange-600 text-white hover:bg-orange-700"
                }`}
              >
                {following ? "Following" : "Follow"}
              </button>
            )}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 mt-5">
            {profile.whatsapp && (
              <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="social-icon text-green-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.534 5.876L0 24l6.332-1.51A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.36-.214-3.727.889.934-3.618-.235-.372A9.818 9.818 0 1112 21.818z" />
                </svg>
              </a>
            )}
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="social-icon text-orange-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                </svg>
              </a>
            )}
            {profile.instagram && (
              <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noopener noreferrer"
                className="social-icon text-pink-500">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            )}
            {profile.facebook && (
              <a href={`https://facebook.com/${profile.facebook}`} target="_blank" rel="noopener noreferrer"
                className="social-icon text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            )}
            {profile.tiktok && (
              <a href={`https://tiktok.com/@${profile.tiktok}`} target="_blank" rel="noopener noreferrer"
                className="social-icon text-gray-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
                </svg>
              </a>
            )}
            {profile.website && (
              <a href={profile.website} target="_blank" rel="noopener noreferrer"
                className="social-icon text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mx-4" />

        {/* Listings grid */}
        <div className="grid grid-cols-3 gap-1 px-2">
          {listings.map((listing) => (
            <div key={listing.id} className="relative">
              <div className="thumb relative pt-[100%] bg-gray-100 rounded overflow-hidden" onClick={() => setSelectedListing(listing)}>
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {listings.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-sm">No listings yet</p>
          </div>
        )}
      </div>

      {/* Listing modal */}
      {selectedListing && (
        <ListingModal
          listing={selectedListing}
          seller={profile}
          onClose={() => setSelectedListing(null)}
        />
      )}

      {/* Update Profile Modal */}
      {showUpdateModal && (
        <UpdateProfileModal
          onClose={() => setShowUpdateModal(false)}
          profile={profile}
        />
      )}
    </>
  );
}
