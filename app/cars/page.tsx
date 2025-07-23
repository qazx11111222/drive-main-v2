"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Users, Star, Heart, Search, MapPin, SlidersHorizontal } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [transmissionFilter, setTransmissionFilter] = useState("all")
  const [passengersFilter, setPassengersFilter] = useState("all")
  const [sortBy, setSortBy] = useState("price-low")

  const cars = [
    {
      id: 1,
      name: "トヨタ プリウス",
      image: "/placeholder.svg?height=200&width=300",
      price: 5500,
      passengers: 5,
      transmission: "AT",
      rating: 4.8,
      reviews: 24,
      available: 3,
      features: ["ハイブリッド", "カーナビ", "ETC", "バックカメラ"],
      location: "名護店",
    },
    {
      id: 2,
      name: "ホンダ フィット",
      image: "/placeholder.svg?height=200&width=300",
      price: 4800,
      passengers: 5,
      transmission: "AT",
      rating: 4.6,
      reviews: 18,
      available: 2,
      features: ["コンパクト", "カーナビ", "ETC"],
      location: "名護店",
    },
    {
      id: 3,
      name: "日産 セレナ",
      image: "/placeholder.svg?height=200&width=300",
      price: 8500,
      passengers: 8,
      transmission: "AT",
      rating: 4.9,
      reviews: 31,
      available: 1,
      features: ["ファミリー向け", "カーナビ", "ETC", "両側スライドドア"],
      location: "本部店",
    },
    {
      id: 4,
      name: "スズキ ジムニー",
      image: "/placeholder.svg?height=200&width=300",
      price: 7200,
      passengers: 4,
      transmission: "MT",
      rating: 4.7,
      reviews: 15,
      available: 2,
      features: ["4WD", "オフロード", "カーナビ"],
      location: "名護店",
    },
    {
      id: 5,
      name: "トヨタ ヴォクシー",
      image: "/placeholder.svg?height=200&width=300",
      price: 9200,
      passengers: 8,
      transmission: "AT",
      rating: 4.5,
      reviews: 22,
      available: 1,
      features: ["ファミリー向け", "カーナビ", "ETC", "両側スライドドア", "バックカメラ"],
      location: "本部店",
    },
    {
      id: 6,
      name: "ホンダ ヴェゼル",
      image: "/placeholder.svg?height=200&width=300",
      price: 6800,
      passengers: 5,
      transmission: "AT",
      rating: 4.4,
      reviews: 19,
      available: 3,
      features: ["SUV", "ハイブリッド", "カーナビ", "ETC"],
      location: "名護店",
    },
  ]

  const filteredAndSortedCars = cars
    .filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTransmission = transmissionFilter === "all" || car.transmission === transmissionFilter
      const matchesPassengers =
        passengersFilter === "all" ||
        (passengersFilter === "4" && car.passengers <= 4) ||
        (passengersFilter === "5-7" && car.passengers >= 5 && car.passengers <= 7) ||
        (passengersFilter === "8+" && car.passengers >= 8)

      return matchesSearch && matchesTransmission && matchesPassengers
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "passengers":
          return b.passengers - a.passengers
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-yanbaru-sand">
      {/* Header */}
      {/* <header className="bg-yanbaru-emerald shadow-sm border-b border-yanbaru-emerald/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="やんばるドライブ ロゴ" width={32} height={32} className="rounded" />
              <h1 className="text-2xl font-bold text-white">やんばるドライブ</h1>
            </Link>
          </div>
        </div>
      </header> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-yanbaru-emerald/20">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
            <div className="flex-1 flex items-center gap-2">
              <Input
                placeholder="車種名で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-yanbaru-emerald hover:bg-gray-300 transition"
                      onClick={() => setShowAdvanced((v) => !v)}
                      aria-label="詳細検索を表示"
                      type="button"
                    >
                      <SlidersHorizontal className="w-5 h-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>詳細検索</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          {/* 詳細検索（フィルター類） */}
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-2">
              <div className="lg:col-span-2"></div>
              <Select value={transmissionFilter} onValueChange={setTransmissionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="ミッション" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="AT">AT（オートマ）</SelectItem>
                  <SelectItem value="MT">MT（マニュアル）</SelectItem>
                </SelectContent>
              </Select>
              <Select value={passengersFilter} onValueChange={setPassengersFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="乗車人数" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="4">4人以下</SelectItem>
                  <SelectItem value="5-7">5-7人</SelectItem>
                  <SelectItem value="8+">8人以上</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="並び替え" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">料金が安い順</SelectItem>
                  <SelectItem value="price-high">料金が高い順</SelectItem>
                  <SelectItem value="rating">評価が高い順</SelectItem>
                  <SelectItem value="passengers">乗車人数が多い順</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yanbaru-charcoal">車両一覧 ({filteredAndSortedCars.length}台)</h2>
        </div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCars.map((car) => (
            <Card
              key={car.id}
              className="overflow-hidden hover:shadow-lg transition-shadow bg-white border-yanbaru-emerald/20"
            >
              <div className="relative">
                <Image
                  src={car.image || "/placeholder.svg"}
                  alt={car.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge
                    variant={car.available > 0 ? "default" : "destructive"}
                    className={car.available > 0 ? "bg-yanbaru-emerald text-white" : ""}
                  >
                    {car.available > 0 ? `残り${car.available}台` : "満車"}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{car.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4" />
                      {car.location}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yanbaru-emerald">¥{car.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">/日</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {car.passengers}人乗り
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">{car.transmission}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yanbaru-sunset text-yanbaru-sunset" />
                    <span className="font-semibold">{car.rating}</span>
                    <span className="text-gray-500 text-sm">({car.reviews}件)</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {car.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {car.features.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{car.features.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link href={`/cars/${car.id}`} className="flex-1">
                      <Button
                        className="w-full bg-yanbaru-sunset hover:bg-yanbaru-sunset/90 text-white"
                        disabled={car.available === 0}
                      >
                        {car.available > 0 ? "詳細・予約" : "満車"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAndSortedCars.length === 0 && (
          <div className="text-center py-12">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">条件に合う車両が見つかりません</h3>
            <p className="text-gray-600">検索条件を変更してお試しください。</p>
          </div>
        )}
      </div>
    </div>
  )
}
