const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Automotive",
  "Business Equipment",
  "Food & Drinks",
  "Services",
]

interface CategoryFilterProps {
  selected: string
  onChange: (category: string) => void
}

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition border
            ${
              selected === cat
                ? "bg-primary-600 text-white border-primary-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-primary-400 hover:text-primary-600"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}