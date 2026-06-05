import ListingCard, {type Listing } from "./listingCard"

interface ListingsGridProps {
  listings: Listing[]
}

export default function ListingsGrid({ listings }: ListingsGridProps) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow">
        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">No listings found</h3>
        <p className="text-gray-400 text-sm">Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}