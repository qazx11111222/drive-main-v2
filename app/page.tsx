import Image from "next/image"
import Link from "next/link"

const featuredCars = [
  {
    id: 1,
    name: "トヨタ プリウス",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
    price: "¥5,500",
    passengers: 5,
    transmission: "AT",
    rating: 4.8,
    reviews: 24,
    available: 3,
  },
  {
    id: 2,
    name: "ホンダ フィット",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
    price: "¥4,800",
    passengers: 5,
    transmission: "AT",
    rating: 4.6,
    reviews: 18,
    available: 2,
  },
  {
    id: 3,
    name: "日産 セレナ",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
    price: "¥8,500",
    passengers: 8,
    transmission: "AT",
    rating: 4.9,
    reviews: 31,
    available: 1,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-yanbaru-sand">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yanbaru-emerald to-yanbaru-emerald/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              沖縄の美しい景色を
              <br />
              車で巡る
            </h1>
            <p className="text-xl mb-8">
              安心・安全なレンタカーで、思い出に残る旅を
            </p>
            <Link
              href="/cars"
              className="bg-white text-yanbaru-emerald px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              車両を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">おすすめ車両</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-yanbaru-emerald">
                      {car.price}
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{car.rating}</span>
                      <span className="text-gray-500 ml-2">({car.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>{car.passengers}人乗り</span>
                    <span>{car.transmission}</span>
                    <span>在庫: {car.available}台</span>
                  </div>
                  <Link
                    href={`/cars/${car.id}`}
                    className="block w-full bg-yanbaru-emerald text-white text-center py-2 rounded-lg hover:bg-yanbaru-emerald/90 transition-colors"
                  >
                    詳細を見る
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
