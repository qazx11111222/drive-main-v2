"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  Star,
  Heart,
  MapPin,
  CalendarIcon,
  Shield,
  Wifi,
  Navigation,
  Camera,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { supabase } from "../../../lib/supabaseClient"

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [startTime, setStartTime] = useState("10:00")
  const [endTime, setEndTime] = useState("18:00")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [user, setUser] = useState(null)

  // Mock data - 実際のアプリではAPIから取得
  const car = {
    id: Number.parseInt(params.id),
    name: "トヨタ プリウス",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    price: 5500,
    passengers: 5,
    transmission: "AT",
    rating: 4.8,
    reviews: 24,
    available: 3,
    location: "名護店",
    description:
      "燃費性能に優れたハイブリッド車です。静かで快適な乗り心地で、沖縄の美しい景色をゆったりとお楽しみいただけます。",
    features: [
      { icon: <Wifi className="h-4 w-4" />, name: "カーナビ" },
      { icon: <Shield className="h-4 w-4" />, name: "ETC" },
      { icon: <Camera className="h-4 w-4" />, name: "バックカメラ" },
      { icon: <Navigation className="h-4 w-4" />, name: "ハイブリッド" },
    ],
    specifications: {
      fuel: "ハイブリッド",
      engine: "1.8L",
      doors: "5ドア",
      luggage: "大",
    },
  }

  const options = [
    { id: "child-seat", name: "チャイルドシート", price: 500 },
    { id: "insurance-upgrade", name: "免責補償アップグレード", price: 1000 },
    { id: "wifi-router", name: "Wi-Fiルーター", price: 300 },
    { id: "snow-chains", name: "スノーチェーン", price: 800 },
  ]

  const reviews = [
    {
      id: 1,
      user: "田中さん",
      rating: 5,
      date: "2024/01/10",
      comment: "とても綺麗な車で、燃費も良く快適でした。スタッフの対応も丁寧で満足です。",
    },
    {
      id: 2,
      user: "佐藤さん",
      rating: 4,
      date: "2024/01/05",
      comment: "カーナビが使いやすく、初めての沖縄旅行でも安心して運転できました。",
    },
    {
      id: 3,
      user: "山田さん",
      rating: 5,
      date: "2023/12/28",
      comment: "家族4人でちょうど良いサイズでした。また利用したいと思います。",
    },
  ]

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const basePrice = car.price * days
    const optionsPrice = selectedOptions.reduce((total, optionId) => {
      const option = options.find((opt) => opt.id === optionId)
      return total + (option ? option.price * days : 0)
    }, 0)

    return basePrice + optionsPrice
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)
  }

  const toggleOption = (optionId: string) => {
    setSelectedOptions((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]))
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from("reservations").insert([
      { user_id: user.id, car_id: car.id, start_date: startDate, end_date: endDate, status: "pending" }
    ])
    if (error) {
      console.error("予約に失敗しました: " + error.message)
    } else {
      console.log("予約が完了しました！")
      setStartDate(undefined)
      setEndDate(undefined)
    }
  }

  return (
    <div className="min-h-screen bg-yanbaru-sand">
      {/* Header */}
      <header className="bg-yanbaru-emerald shadow-sm border-b border-yanbaru-emerald/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="やんばるドライブ ロゴ" width={32} height={32} className="rounded" />
              <h1 className="text-2xl font-bold text-white">やんばるドライブ</h1>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/cars" className="text-white/80 hover:text-white transition-colors">
                車両一覧
              </Link>
              <Link href="/login" className="text-white/80 hover:text-white transition-colors">
                ログイン
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-yanbaru-charcoal/70 mb-6">
          <Link href="/" className="hover:text-yanbaru-charcoal">
            ホーム
          </Link>
          <span>/</span>
          <Link href="/cars" className="hover:text-yanbaru-charcoal">
            車両一覧
          </Link>
          <span>/</span>
          <span className="text-yanbaru-charcoal">{car.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Car Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Images */}
            <Card className="border-yanbaru-emerald/20 bg-white">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={car.images[currentImageIndex] || "/placeholder.svg"}
                    alt={car.name}
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover rounded-t-lg"
                  />
                  <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2 p-4">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-16 rounded overflow-hidden border-2 ${
                        index === currentImageIndex ? "border-blue-500" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${car.name} ${index + 1}`}
                        width={80}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Car Info */}
            <Card className="border-yanbaru-emerald/20 bg-white">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{car.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4" />
                      {car.location}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={car.available > 0 ? "default" : "destructive"}
                    className={car.available > 0 ? "bg-yanbaru-emerald text-white" : ""}
                  >
                    {car.available > 0 ? `残り${car.available}台` : "満車"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{car.description}</p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yanbaru-sunset text-yanbaru-sunset" />
                    <span className="font-semibold">{car.rating}</span>
                    <span className="text-gray-500">({car.reviews}件のレビュー)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{car.passengers}人乗り</span>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">{car.transmission}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {feature.icon}
                      <span>{feature.name}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">燃料</span>
                    <div className="font-semibold">{car.specifications.fuel}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">エンジン</span>
                    <div className="font-semibold">{car.specifications.engine}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">ドア数</span>
                    <div className="font-semibold">{car.specifications.doors}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">荷物</span>
                    <div className="font-semibold">{car.specifications.luggage}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="border-yanbaru-emerald/20 bg-white">
              <CardHeader>
                <CardTitle>レビュー ({reviews.length}件)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.user}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking */}
          <div className="space-y-6">
            <Card className="sticky top-4 border-yanbaru-emerald/20 bg-white">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>予約・料金</span>
                  <span className="text-2xl text-yanbaru-emerald">¥{car.price.toLocaleString()}/日</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>利用開始日</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "MM/dd", { locale: ja }) : "選択"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>返却日</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "MM/dd", { locale: ja }) : "選択"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => date < (startDate || new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>開始時間</Label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => {
                          const hour = i + 8
                          const time = `${hour.toString().padStart(2, "0")}:00`
                          return (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>返却時間</Label>
                    <Select value={endTime} onValueChange={setEndTime}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => {
                          const hour = i + 8
                          const time = `${hour.toString().padStart(2, "0")}:00`
                          return (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  <Label>オプション</Label>
                  <div className="space-y-2">
                    {options.map((option) => (
                      <div key={option.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={selectedOptions.includes(option.id)}
                            onCheckedChange={() => toggleOption(option.id)}
                          />
                          <Label htmlFor={option.id} className="text-sm cursor-pointer">
                            {option.name}
                          </Label>
                        </div>
                        <span className="text-sm text-gray-600">+¥{option.price}/日</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                {startDate && endDate && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        基本料金 × {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))}日
                      </span>
                      <span>
                        ¥
                        {(
                          car.price * Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
                        ).toLocaleString()}
                      </span>
                    </div>
                    {selectedOptions.length > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>オプション</span>
                        <span>
                          ¥
                          {selectedOptions
                            .reduce((total, optionId) => {
                              const option = options.find((opt) => opt.id === optionId)
                              const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
                              return total + (option ? option.price * days : 0)
                            }, 0)
                            .toLocaleString()}
                        </span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>合計</span>
                      <span className="text-yanbaru-emerald">¥{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Terms Agreement */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm cursor-pointer">
                    <Link href="/terms" className="text-yanbaru-emerald hover:underline">
                      利用規約
                    </Link>
                    および
                    <Link href="/insurance" className="text-yanbaru-emerald hover:underline">
                      保険・補償内容
                    </Link>
                    に同意します
                  </Label>
                </div>

                {/* Booking Button */}
                <Button
                  className="w-full bg-yanbaru-sunset hover:bg-yanbaru-sunset/90 text-white"
                  disabled={!startDate || !endDate || !agreedToTerms || car.available === 0}
                >
                  予約・決済へ進む
                </Button>

                <div className="text-center">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    店舗に問い合わせ
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reservation Section */}
            <ReservationSection carId={car.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ReservationForm({ carId, userId }) {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from("reservations").insert([
      { user_id: userId, car_id: carId, start_date: startDate, end_date: endDate, status: "pending" }
    ])
    if (error) {
      setMessage("予約に失敗しました: " + error.message)
    } else {
      setMessage("予約が完了しました！")
      setStartDate("")
      setEndDate("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>開始日</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
      </div>
      <div>
        <label>終了日</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
      </div>
      <button type="submit" className="bg-yanbaru-sunset text-white px-4 py-2 rounded">予約する</button>
      {message && <p>{message}</p>}
    </form>
  )
}

function ReservationSection({ carId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  if (!user) {
    return (
      <div>
        <p>予約にはログインが必要です。</p>
        <Link href="/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">ログインページへ</button>
        </Link>
      </div>
    )
  }
  return <ReservationForm carId={carId} userId={user.id} />
}
