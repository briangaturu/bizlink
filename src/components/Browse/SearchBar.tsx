interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full group">
      <style>{`
        @keyframes search-focus {
          from { box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
          to { box-shadow: 0 10px 25px rgba(234, 88, 12, 0.15); }
        }
        .search-input:focus-within {
          animation: search-focus 0.3s ease forwards;
        }
      `}</style>
      
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products, services, businesses..."
        className="search-input w-full pl-12 pr-5 py-3.5 rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-500 font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 shadow-sm hover:border-gray-300"
      />
    </div>
  )
}