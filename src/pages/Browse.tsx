import { useState, useMemo } from "react"
import SearchBar from "../components/Browse/SearchBar"
import CategoryFilter from "../components/Browse/categoryFilter"
import ListingsGrid from "../components/Browse/listingsGrid"
import { type Listing } from "../components/Browse/listingCard"

const mockListings: Listing[] = [
  {
    id: 1,
    title: "Samsung Galaxy A54 5G - 128GB",
    price: "KSh 32,000",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80",
    seller: "TechHub Nairobi",
    rating: 4,
    reviews: 38,
    location: "Nairobi CBD",
    whatsapp: "254712345678",
    phone: "+254712345678",
    website: "https://techhub.co.ke",
  },
  {
    id: 2,
    title: "HP Laptop 15 - Core i5, 8GB RAM, 256GB SSD",
    price: "KSh 58,000",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    seller: "ComputerWorld KE",
    rating: 5,
    reviews: 62,
    location: "Westlands",
    whatsapp: "254722000001",
    phone: "+254722000001",
  },
  {
    id: 3,
    title: "Men's Formal Suit - Black, All Sizes",
    price: "KSh 4,500",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
    seller: "StyleKe Fashion",
    rating: 4,
    reviews: 21,
    location: "Gikomba Market",
    whatsapp: "254733000002",
  },
  {
    id: 4,
    title: "Sofa Set - 3+2+1 Seater Leather",
    price: "KSh 45,000",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    seller: "HomeDecor Plus",
    rating: 4,
    reviews: 15,
    location: "Industrial Area",
    whatsapp: "254744000003",
    phone: "+254744000003",
    website: "https://homedecorplus.co.ke",
  },
  {
    id: 5,
    title: "Car Engine Service & Repair",
    price: "From KSh 2,500",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&q=80",
    seller: "AutoFix Garage",
    rating: 5,
    reviews: 90,
    location: "South B",
    phone: "+254755000004",
    whatsapp: "254755000004",
  },
  {
    id: 6,
    title: "Organic Skincare Bundle - 5 Piece Set",
    price: "KSh 1,800",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80",
    seller: "GlowNatural KE",
    rating: 4,
    reviews: 44,
    location: "Karen",
    whatsapp: "254766000005",
    website: "https://glownatural.co.ke",
  },
  {
    id: 7,
    title: "Freshly Baked Cakes & Pastries - Custom Orders",
    price: "From KSh 800",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
    seller: "SweetBakes Nairobi",
    rating: 5,
    reviews: 110,
    location: "Kilimani",
    whatsapp: "254777000006",
    phone: "+254777000006",
  },
  {
    id: 8,
    title: "Office Desk & Chair Set",
    price: "KSh 12,000",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
    seller: "OfficePro Supplies",
    rating: 3,
    reviews: 9,
    location: "Thika Road",
    whatsapp: "254788000007",
    phone: "+254788000007",
  },
]

export default function Browse() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const filtered = useMemo(() => {
    return mockListings.filter((listing) => {
      const matchesSearch =
        search === "" ||
        listing.title.toLowerCase().includes(search.toLowerCase()) ||
        listing.seller.toLowerCase().includes(search.toLowerCase()) ||
        listing.location.toLowerCase().includes(search.toLowerCase())

      const matchesCategory = category === "All" // extend this once real categories are on listings

      return matchesSearch && matchesCategory
    })
  }, [search, category])

  return (
    <div className="space-y-6 w-full">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Browse Listings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Discover products and services from trusted sellers across Kenya
        </p>
      </div>

      {/* Search */}
      <SearchBar value={search} onChange={setSearch} />

      {/* Category Filter */}
      <CategoryFilter selected={category} onChange={setCategory} />

      {/* Results count */}
      <p className="text-sm text-gray-500">
        Showing <span className="font-medium text-gray-700">{filtered.length}</span> listings
      </p>

      {/* Listings Grid */}
      <ListingsGrid listings={filtered} />
    </div>
  )
}
