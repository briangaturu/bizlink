import { useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { id } = useParams()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Product Detail - {id}</h1>
      <p className="text-gray-600">Product details page coming soon...</p>
    </div>
  )
}
