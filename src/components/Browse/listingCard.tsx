"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Listing {
  id: number;
  sellerId: string | number; // <-- added
  title: string;
  price: string;
  image: string;
  seller: string;
  rating: number;
  reviews: number;
  location: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
}

interface ListingCardProps {
  listing: Listing;
}

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1">({reviews})</span>
    </div>
  );
}

function ContactModal({
  listing,
  onClose,
}: {
  listing: Listing;
  onClose: () => void;
}) {
  return (
    <>
      <style>{`
        @keyframes backdrop-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        .modal-backdrop { animation: backdrop-in 0.2s ease both; }
        .modal-box { animation: modal-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .contact-link {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
        }
        .contact-link:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.1); }
        .contact-link:active { transform: scale(0.97); }
      `}</style>

      <div
        className="modal-backdrop fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="modal-box bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mb-5 pr-6">
            <p className="text-xs text-orange-600 font-medium uppercase tracking-wide mb-1">Contact Seller</p>
            <h3 className="font-semibold text-gray-900 text-base leading-snug line-clamp-2">
              {listing.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{listing.seller} · {listing.location}</p>
          </div>

          <div className="flex flex-col gap-3">
            {listing.whatsapp && (
              <a
                href={`https://wa.me/${listing.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 font-medium text-sm"
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
                className="contact-link flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-50 text-orange-700 hover:bg-orange-100 font-medium text-sm"
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
                className="contact-link flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium text-sm"
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
    </>
  );
}

export default function ListingCard({ listing }: ListingCardProps) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/profile/${listing.sellerId}`);
  };

  return (
    <>
      <style>{`
        @keyframes card-in {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .listing-card {
          animation: card-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          position: relative;
        }
        .listing-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        .listing-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 1rem;
          pointer-events: none;
        }
        .listing-card:hover::before {
          opacity: 0.3;
        }
        .image-container {
          position: relative;
          overflow: hidden;
        }
        .image-container img {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .listing-card:hover .image-container img {
          transform: scale(1.08);
        }
        .contact-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .contact-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .contact-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(234, 88, 12, 0.4);
        }
        .contact-btn:hover::before { opacity: 1; }
        .contact-btn:active { transform: scale(0.96); }
        .seller-link:hover { color: #ea6317; }
      `}</style>

      <div className="listing-card bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full">
        {/* Image Container with Badge */}
        <div className="image-container relative h-56 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg border border-white/50">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-bold text-gray-900">{listing.rating}.0</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Seller */}
          <button
            className="seller-link self-start flex items-center gap-2 mb-3 group"
            onClick={(e) => { e.stopPropagation(); goToProfile(); }}
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-md">
              {listing.seller.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-semibold text-orange-600 group-hover:text-orange-700 transition-colors">
              {listing.seller}
            </span>
          </button>

          {/* Title */}
          <h3 className="font-bold text-gray-900 text-base leading-snug mb-3 line-clamp-2 h-10">
            {listing.title}
          </h3>

          {/* Price */}
          <p className="text-orange-600 font-bold text-xl mb-3">{listing.price}</p>

          {/* Rating & Reviews */}
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
            <StarRating rating={listing.rating} reviews={listing.reviews} />
          </div>

          {/* Location */}
          <div className="text-sm text-gray-600 flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">{listing.location}</span>
          </div>

          {/* Contact Button */}
          <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowModal(true)}
              className="contact-btn w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white text-sm font-semibold px-4 py-3 rounded-xl transition-all shadow-md"
            >
              Contact Seller
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <ContactModal listing={listing} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}